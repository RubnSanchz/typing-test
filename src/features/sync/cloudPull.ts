import { getDb } from '@/lib/firebase'
import { readStorage, writeStorage } from '@/utils/storage'
import { profileHistoryKey } from '@/features/stats/useHistory'
import { prefsStorageKey } from '@/features/settings/useSettings'
import type { HistoryStats, UserPreferences, UserProfile } from '@/types/domain'

interface CloudProfile {
  id?: string
  name?: string
  stats?: Record<string, HistoryStats>
  prefs?: UserPreferences
}

/**
 * Download the user's Firestore document and merge its per-profile stats into
 * local storage, so a fresh browser (same Google/email account → same uid)
 * shows tests done elsewhere. Returns the cloud profile list (id + name) so the
 * caller can union it into the local profile list. No-op (null) when Firebase
 * is unavailable, the doc is missing, or on error — the app stays local-first.
 */
export async function pullCloudProfiles(uid: string): Promise<UserProfile[] | null> {
  const db = await getDb()
  if (!db) return null
  try {
    const { doc, getDocFromServer } = await import('firebase/firestore')
    // Read straight from the server: getDoc would layer the concurrent metadata
    // upload's pending write (which lacks `stats`) over the not-yet-fetched doc.
    const snap = await getDocFromServer(doc(db, 'profiles', uid))
    if (!snap.exists()) return null
    const data = snap.data() as { profiles?: Record<string, CloudProfile> }
    const cloudProfiles = data.profiles ?? {}

    const list: UserProfile[] = []
    for (const [id, profile] of Object.entries(cloudProfiles)) {
      if (profile?.name) list.push({ id, name: profile.name })
      mergeStatsIntoLocal(id, profile?.stats)
      if (profile?.prefs) writeStorage(prefsStorageKey(id), JSON.stringify(profile.prefs))
    }
    return list
  } catch (error) {
    console.warn('[firebase] pullCloudProfiles failed', error)
    return null
  }
}

function mergeStatsIntoLocal(profileId: string, cloudStats?: Record<string, HistoryStats>) {
  if (!cloudStats || Object.keys(cloudStats).length === 0) return

  const key = profileHistoryKey(profileId)
  let modes: Record<string, HistoryStats> = {}
  const raw = readStorage(key)
  if (raw) {
    try {
      modes = (JSON.parse(raw) as { modes?: Record<string, HistoryStats> }).modes ?? {}
    } catch {
      modes = {}
    }
  }

  for (const [modeKey, cloud] of Object.entries(cloudStats)) {
    const local = modes[modeKey]
    // Keep whichever record has more tests — the more complete history.
    if (!local || cloud.totalTests > local.totalTests) modes[modeKey] = cloud
  }

  writeStorage(key, JSON.stringify({ version: 2, modes }))
}
