import type { Firestore } from 'firebase/firestore'
import type { Auth, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// The app is local-first and Firebase is loaded lazily (dynamic import), so the
// SDK stays out of the initial bundle. When the config is incomplete we never
// load it and every accessor resolves to null, leaving the app fully offline.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

// Live current user, kept in sync with auth state. Sync targets this user's uid,
// so it follows the user across anonymous → Google/email sign-in and back.
let currentUser: User | null = null
let resolveReady: (() => void) | null = null
const authReady = new Promise<void>((resolve) => {
  resolveReady = resolve
})
function markReady() {
  resolveReady?.()
  resolveReady = null
}

let firebasePromise: Promise<{ db: Firestore; auth: Auth } | null> | null = null

async function initFirebase(): Promise<{ db: Firestore; auth: Auth } | null> {
  try {
    const [{ initializeApp }, { getFirestore }, authMod] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
      import('firebase/auth'),
    ])
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const auth = authMod.getAuth(app)

    authMod.onAuthStateChanged(auth, (user) => {
      currentUser = user
      if (user) {
        markReady()
      } else {
        // Signed out / first load: keep an anonymous identity as the sync
        // baseline so the cloud backup works even without an explicit login.
        authMod.signInAnonymously(auth).catch((error) => {
          console.warn('[firebase] anonymous sign-in failed; sync disabled', error)
          markReady()
        })
      }
    })
    return { db, auth }
  } catch (error) {
    console.warn('[firebase] initialization failed; sync disabled', error)
    markReady()
    return null
  }
}

/** Lazily load + initialize Firebase once. Resolves null when not configured. */
export function getFirebase(): Promise<{ db: Firestore; auth: Auth } | null> {
  if (!isFirebaseConfigured) return Promise.resolve(null)
  if (!firebasePromise) firebasePromise = initFirebase()
  return firebasePromise
}

export async function getDb(): Promise<Firestore | null> {
  return (await getFirebase())?.db ?? null
}

export async function getAuthInstance(): Promise<Auth | null> {
  return (await getFirebase())?.auth ?? null
}

/**
 * Resolves the current user's uid (anonymous, Google or email/password),
 * waiting for the initial auth state. Returns null when Firebase is not
 * configured or sign-in failed, in which case sync becomes a no-op.
 */
export async function getCurrentUid(): Promise<string | null> {
  const fb = await getFirebase()
  if (!fb) return null
  await authReady
  return currentUser?.uid ?? null
}

/**
 * Subscribe to the signed-in uid. Fires on initial auth and whenever the user
 * changes (anonymous ⇄ Google/email). Returns an unsubscribe function.
 */
export function onUidChanged(callback: (uid: string | null) => void): () => void {
  let unsubscribe = () => {}
  let cancelled = false
  void getFirebase().then(async (fb) => {
    if (cancelled) return
    if (!fb) {
      callback(null)
      return
    }
    const { onAuthStateChanged } = await import('firebase/auth')
    if (cancelled) return
    unsubscribe = onAuthStateChanged(fb.auth, (user) => callback(user?.uid ?? null))
  })
  return () => {
    cancelled = true
    unsubscribe()
  }
}
