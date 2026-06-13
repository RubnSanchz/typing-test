import { doc, setDoc, updateDoc, deleteField, serverTimestamp, type DocumentReference } from 'firebase/firestore'
import { db, getCurrentUid } from '@/lib/firebase'
import type { HistoryStats, UserProfile } from '@/types/domain'

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
 *     profiles: { [localId]: { id, name, createdAt, updatedAt, stats, lastResultAt } }
 *   }
 *
 * Every function is a no-op when Firebase is not configured / sign-in failed,
 * and never throws — the app is local-first and must keep working offline.
 */

async function userDoc(): Promise<DocumentReference | null> {
  if (!db) return null
  const uid = await getCurrentUid()
  if (!uid) return null
  return doc(db, COLLECTION, uid)
}

/** Upsert a profile's metadata. Pass isNew=true on creation to stamp createdAt. */
export async function syncProfileMetadata(
  profile: UserProfile,
  options: { isNew?: boolean } = {},
): Promise<void> {
  const ref = await userDoc()
  if (!ref) return
  try {
    await setDoc(
      ref,
      {
        uid: ref.id,
        updatedAt: serverTimestamp(),
        profiles: {
          [profile.id]: {
            id: profile.id,
            name: profile.name,
            updatedAt: serverTimestamp(),
            ...(options.isNew ? { createdAt: serverTimestamp() } : {}),
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
  const ref = await userDoc()
  if (!ref) return
  try {
    await setDoc(
      ref,
      {
        uid: ref.id,
        updatedAt: serverTimestamp(),
        profiles: {
          [profileId]: {
            id: profileId,
            stats: modes,
            lastResultAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
        },
      },
      { merge: true },
    )
  } catch (error) {
    console.warn('[firebase] syncProfileStats failed', error)
  }
}

/** Remove a single profile from the user's document when deleted locally. */
export async function deleteProfileFromCloud(profileId: string): Promise<void> {
  const ref = await userDoc()
  if (!ref) return
  try {
    await updateDoc(ref, {
      [`profiles.${profileId}`]: deleteField(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.warn('[firebase] deleteProfileFromCloud failed', error)
  }
}
