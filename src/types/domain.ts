// Session lifecycle
export type SessionStatus = 'idle' | 'running' | 'finished'

// Per-character rendering state
export type CharStatus = 'pending' | 'correct' | 'incorrect' | 'current'

// Per-word rendering state
export type WordStatus = 'pending' | 'active' | 'completed' | 'error'

export interface CharState {
  char: string
  status: CharStatus
}

export interface WordState {
  chars: CharState[]
  status: WordStatus
}

// A text passage from the data catalogue
export interface TextPassage {
  id: string
  lang: LanguageCode
  text: string
}

export type LanguageCode = 'es' | 'en' | 'fr'

export interface UserProfile {
  id: string
  name: string
}

// Accumulated keystroke tracking
export interface KeystrokeStats {
  totalTyped: number   // every keystroke including backspace-corrected ones
  correct: number      // chars that matched target at the moment of typing
  errors: number       // chars that did NOT match (counted on space / word completion)
}

// Core session state managed by the reducer
export interface TypingSession {
  status: SessionStatus
  passage: TextPassage
  words: WordState[]
  currentWordIndex: number
  currentInput: string          // what the user has typed for the current word
  startTime: number | null      // performance.now() timestamp
  endTime: number | null
  keystrokeStats: KeystrokeStats
  duration: number              // test duration in seconds
  ignorePunctuation: boolean
}

// Computed metrics (derived, not stored in reducer)
export interface TypingMetrics {
  wpmGross: number
  wpmNet: number
  accuracy: number
  errors: number
  elapsedSeconds: number
}

// Persisted in LocalStorage
export interface BestResult {
  wpmNet: number
  accuracy: number
  duration: number
  date: string
}

export interface HistoryStats {
  totalTests: number
  averageWpm: number
  averageAccuracy: number
  maxAccuracy: number
  best: BestResult | null
}

export interface UserPreferences {
  duration: number   // seconds
  ignorePunctuation: boolean
  language: LanguageCode
}
