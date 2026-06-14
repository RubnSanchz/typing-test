/**
 * Safe localStorage access. Every call is guarded so that environments where
 * storage is unavailable or throws (private mode, quota, disabled cookies) keep
 * the in-memory app flow working instead of crashing.
 */
export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage write failures and keep the in-memory state working.
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage removal failures.
  }
}

// Keys preserved across sign-out: device-level UI prefs, not account data.
const KEEP_ON_SIGN_OUT = new Set(['tt-theme'])

/**
 * Remove account-scoped data (profiles, preferences, history) on sign-out so the
 * next user on this device starts clean. Device UI prefs (theme, zoom) are kept.
 */
export function clearLocalUserData(): void {
  try {
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('tt-') && !KEEP_ON_SIGN_OUT.has(key)) toRemove.push(key)
    }
    toRemove.forEach((key) => localStorage.removeItem(key))
  } catch {
    // Ignore storage failures.
  }
}
