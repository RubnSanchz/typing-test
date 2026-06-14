import { useCallback, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { getAuthInstance, isFirebaseConfigured } from '@/lib/firebase'
import { clearLocalUserData } from '@/utils/storage'

export type AuthStatus = 'loading' | 'anonymous' | 'google' | 'password'

export interface Account {
  status: AuthStatus
  displayName: string | null
  email: string | null
  photoURL: string | null
}

function deriveAccount(user: User | null): Account {
  if (!user || user.isAnonymous) {
    return { status: 'anonymous', displayName: null, email: null, photoURL: null }
  }
  const providerId = user.providerData[0]?.providerId
  const status: AuthStatus = providerId === 'google.com' ? 'google' : 'password'
  return {
    status,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setReady(true)
      return
    }
    let unsubscribe = () => {}
    let cancelled = false
    void (async () => {
      const auth = await getAuthInstance()
      if (cancelled || !auth) {
        setReady(true)
        return
      }
      const { onAuthStateChanged } = await import('firebase/auth')
      if (cancelled) return
      unsubscribe = onAuthStateChanged(auth, (next) => {
        setUser(next)
        setReady(true)
      })
    })()
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  const run = useCallback(async (action: () => Promise<unknown>) => {
    if (!isFirebaseConfigured) return false
    setBusy(true)
    setError(null)
    try {
      await action()
      return true
    } catch (e) {
      const code = (e as { code?: string }).code ?? ''
      setError(code || (e as Error).message)
      return false
    } finally {
      setBusy(false)
    }
  }, [])

  const signInWithGoogle = useCallback(
    () =>
      run(async () => {
        const auth = await getAuthInstance()
        if (!auth) return
        const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth')
        await signInWithPopup(auth, new GoogleAuthProvider())
      }),
    [run],
  )
  const signInWithEmail = useCallback(
    (email: string, password: string) =>
      run(async () => {
        const auth = await getAuthInstance()
        if (!auth) return
        const { signInWithEmailAndPassword } = await import('firebase/auth')
        await signInWithEmailAndPassword(auth, email, password)
      }),
    [run],
  )
  const registerWithEmail = useCallback(
    (email: string, password: string) =>
      run(async () => {
        const auth = await getAuthInstance()
        if (!auth) return
        const { createUserWithEmailAndPassword } = await import('firebase/auth')
        await createUserWithEmailAndPassword(auth, email, password)
      }),
    [run],
  )
  const signOutUser = useCallback(
    () =>
      run(async () => {
        const auth = await getAuthInstance()
        if (!auth) return
        const { signOut } = await import('firebase/auth')
        await signOut(auth)
        // Clear this device's account data so the next user starts clean; the
        // data stays in the cloud and returns on the next sign-in. Reload to
        // fully reset in-memory state from the cleared storage.
        clearLocalUserData()
        window.location.reload()
      }),
    [run],
  )

  const clearError = useCallback(() => setError(null), [])

  // Treat the pre-auth window as "loading" so the badge does not flash signed-out.
  const account = deriveAccount(user)
  if (!ready) account.status = 'loading'

  return {
    available: isFirebaseConfigured,
    account,
    user,
    busy,
    error,
    clearError,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOutUser,
  } as const
}
