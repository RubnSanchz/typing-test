import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { HistoryStats, UserProfile } from '@/types/domain'

const COLLECTION = 'profiles'

/**
 * Fire-and-forget sync of user (profile) metadata + stats to Cloud Firestore.
 * Every function is a no-op when Firebase is not configured and never throws —
 * the app is local-first and must keep working offline or on network failure.
 */

/** Upsert a profile's metadata. Pass isNew=true on creation to stamp createdAt. */
export async function syncProfileMetadata(
  profile: UserProfile,
  options: { isNew?: boolean } = {},
): Promise<void> {
  if (!db) return
  try {
    await setDoc(
      doc(db, COLLECTION, profile.id),
      {
        id: profile.id,
        name: profile.name,
        updatedAt: serverTimestamp(),
        ...(options.isNew ? { createdAt: serverTimestamp() } : {}),
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
  if (!db) return
  try {
    await setDoc(
      doc(db, COLLECTION, profileId),
      {
        id: profileId,
        stats: modes,
        lastResultAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  } catch (error) {
    console.warn('[firebase] syncProfileStats failed', error)
  }
}

/** Remove a profile document when the profile is deleted locally. */
export async function deleteProfileFromCloud(profileId: string): Promise<void> {
  if (!db) return
  try {
    await deleteDoc(doc(db, COLLECTION, profileId))
  } catch (error) {
    console.warn('[firebase] deleteProfileFromCloud failed', error)
  }
}
