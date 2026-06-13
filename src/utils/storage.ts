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
