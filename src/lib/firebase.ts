import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInAnonymously, type Auth } from 'firebase/auth'

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
let auth: Auth | null = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    firestore = getFirestore(app)
    auth = getAuth(app)
  } catch (error) {
    console.warn('[firebase] initialization failed; sync disabled', error)
  }
}

export const db = firestore

let uidPromise: Promise<string | null> | null = null

/**
 * Resolves the current anonymous user's uid, signing in anonymously if needed.
 * Memoized so the whole app shares a single sign-in. The anonymous identity is
 * persisted by Firebase Auth, so the same uid is reused across reloads — which
 * is what lets each browser own its `profiles/{uid}` document. Returns null
 * when Firebase is not configured or sign-in fails (sync becomes a no-op).
 */
export function getCurrentUid(): Promise<string | null> {
  if (!auth) return Promise.resolve(null)
  const activeAuth = auth
  if (!uidPromise) {
    uidPromise = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(activeAuth, (user) => {
        if (user) {
          unsubscribe()
          resolve(user.uid)
        }
      })
      signInAnonymously(activeAuth).catch((error) => {
        unsubscribe()
        console.warn('[firebase] anonymous sign-in failed; sync disabled', error)
        resolve(null)
      })
    })
  }
  return uidPromise
}
