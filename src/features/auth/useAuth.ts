import { useCallback, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

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
    if (!auth) {
      setReady(true)
      return
    }
    return onAuthStateChanged(auth, (next) => {
      setUser(next)
      setReady(true)
    })
  }, [])

  const run = useCallback(async (action: () => Promise<unknown>) => {
    if (!auth) return false
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
    () => run(() => signInWithPopup(auth!, new GoogleAuthProvider())),
    [run],
  )
  const signInWithEmail = useCallback(
    (email: string, password: string) => run(() => signInWithEmailAndPassword(auth!, email, password)),
    [run],
  )
  const registerWithEmail = useCallback(
    (email: string, password: string) => run(() => createUserWithEmailAndPassword(auth!, email, password)),
    [run],
  )
  const signOutUser = useCallback(() => run(() => signOut(auth!)), [run])

  const clearError = useCallback(() => setError(null), [])

  // Treat the pre-auth window as "loading" so the badge does not flash signed-out.
  const account = deriveAccount(user)
  if (!ready) account.status = 'loading'

  return {
    available: Boolean(auth),
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
