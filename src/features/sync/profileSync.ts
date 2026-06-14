import { getDb, getCurrentUid } from '@/lib/firebase'
import type { HistoryStats, UserPreferences, UserProfile } from '@/types/domain'

const COLLECTION = 'profiles'

/**
 * Fire-and-forget sync of the user's profiles + stats to Cloud Firestore.
 *
 * Security rules scope each anonymous user to a single document `profiles/{uid}`
 * (request.auth.uid == doc id), so every local profile for this browser is
 * stored under one document, nested in a `profiles` map keyed by local id:
 *
 *   profiles/{uid} = {
 *     uid, updatedAt,
 *     profiles: { [localId]: { id, name, createdAt, updatedAt, prefs, stats, lastResultAt } }
 *   }
 *
 * Every function is a no-op when Firebase is not configured / sign-in failed,
 * and never throws — the app is local-first and must keep working offline.
 * The Firestore SDK is imported dynamically so it stays out of the main bundle.
 */

async function syncContext() {
  const db = await getDb()
  if (!db) return null
  const uid = await getCurrentUid()
  if (!uid) return null
  const fs = await import('firebase/firestore')
  return { db, uid, fs }
}

/** Upsert a profile's metadata. Pass isNew=true on creation to stamp createdAt. */
export async function syncProfileMetadata(
  profile: UserProfile,
  options: { isNew?: boolean } = {},
): Promise<void> {
  const ctx = await syncContext()
  if (!ctx) return
  const { db, uid, fs } = ctx
  try {
    await fs.setDoc(
      fs.doc(db, COLLECTION, uid),
      {
        uid,
        updatedAt: fs.serverTimestamp(),
        profiles: {
          [profile.id]: {
            id: profile.id,
            name: profile.name,
            updatedAt: fs.serverTimestamp(),
            ...(options.isNew ? { createdAt: fs.serverTimestamp() } : {}),
          },
        },
      },
      { merge: true },
    )
  } catch (error) {
    console.warn('[firebase] syncProfileMetadata failed', error)
  }
}

/** Persist the per-mode stats map for a profile after a finished test. */
export async function syncProfileStats(
  profileId: string,
  modes: Record<string, HistoryStats>,
): Promise<void> {
  const ctx = await syncContext()
  if (!ctx) return
  const { db, uid, fs } = ctx
  try {
    await fs.setDoc(
      fs.doc(db, COLLECTION, uid),
      {
        uid,
        updatedAt: fs.serverTimestamp(),
        profiles: {
          [profileId]: {
            id: profileId,
            stats: modes,
            lastResultAt: fs.serverTimestamp(),
            updatedAt: fs.serverTimestamp(),
          },
        },
      },
      { merge: true },
    )
  } catch (error) {
    console.warn('[firebase] syncProfileStats failed', error)
  }
}

/** Persist a profile's preferences (duration, language, punctuation). */
export async function syncProfilePrefs(profileId: string, prefs: UserPreferences): Promise<void> {
  const ctx = await syncContext()
  if (!ctx) return
  const { db, uid, fs } = ctx
  try {
    await fs.setDoc(
      fs.doc(db, COLLECTION, uid),
      {
        uid,
        updatedAt: fs.serverTimestamp(),
        profiles: {
          [profileId]: {
            id: profileId,
            prefs,
            updatedAt: fs.serverTimestamp(),
          },
        },
      },
      { merge: true },
    )
  } catch (error) {
    console.warn('[firebase] syncProfilePrefs failed', error)
  }
}

/** Remove a single profile from the user's document when deleted locally. */
export async function deleteProfileFromCloud(profileId: string): Promise<void> {
  const ctx = await syncContext()
  if (!ctx) return
  const { db, uid, fs } = ctx
  try {
    await fs.updateDoc(fs.doc(db, COLLECTION, uid), {
      [`profiles.${profileId}`]: fs.deleteField(),
      updatedAt: fs.serverTimestamp(),
    })
  } catch (error) {
    console.warn('[firebase] deleteProfileFromCloud failed', error)
  }
}
