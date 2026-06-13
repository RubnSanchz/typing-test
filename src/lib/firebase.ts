import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInAnonymously, type Auth, type User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// The app is local-first: Firestore sync is optional. When the config is
// incomplete (no .env.local, CI without secrets, etc.) we skip initialization
// entirely so the rest of the app keeps working offline.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

let app: FirebaseApp | null = null
let firestore: Firestore | null = null
let authInstance: Auth | null = null

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

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    firestore = getFirestore(app)
    authInstance = getAuth(app)

    onAuthStateChanged(authInstance, (user) => {
      currentUser = user
      if (user) {
        markReady()
      } else if (authInstance) {
        // Signed out (or first load): keep an anonymous identity as the sync
        // baseline so the cloud backup works even without an explicit login.
        signInAnonymously(authInstance).catch((error) => {
          console.warn('[firebase] anonymous sign-in failed; sync disabled', error)
          markReady()
        })
      }
    })
  } catch (error) {
    console.warn('[firebase] initialization failed; sync disabled', error)
    markReady()
  }
} else {
  markReady()
}

export const db = firestore
export const auth = authInstance

/**
 * Resolves the current user's uid (anonymous, Google or email/password),
 * waiting for the initial auth state. Returns null when Firebase is not
 * configured or sign-in failed, in which case sync becomes a no-op.
 */
export async function getCurrentUid(): Promise<string | null> {
  if (!authInstance) return null
  await authReady
  return currentUser?.uid ?? null
}

/**
 * Subscribe to the signed-in uid. Fires on initial auth and whenever the user
 * changes (anonymous ⇄ Google/email). Returns an unsubscribe function.
 */
export function onUidChanged(callback: (uid: string | null) => void): () => void {
  if (!authInstance) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(authInstance, (user) => callback(user?.uid ?? null))
}
