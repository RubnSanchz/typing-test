import type { TypingSession, WordState, CharState, LanguageCode } from '@/types/domain'
import { buildWordStates } from '@/utils/buildWordStates'
import { getRandomPassageByLanguage } from '@/data/texts'
import { normalizeTextForTyping } from '@/utils/normalizeTextForTyping'

// ─── Actions ──────────────────────────────────────────────────────────────────

export type TypingAction =
  | { type: 'INPUT_CHANGE'; payload: string }
  | { type: 'WORD_SUBMIT' }
  | { type: 'FINISH' }
  | {
      type: 'RESET'
      payload?: { duration?: number; ignorePunctuation?: boolean; language?: LanguageCode }
    }

// ─── Initial state ────────────────────────────────────────────────────────────

export function createInitialSession(config: {
  duration: number
  ignorePunctuation: boolean
  language: LanguageCode
}): TypingSession {
  const { duration, ignorePunctuation, language } = config
  const passage = getRandomPassageByLanguage(language)
  const normalizedPassage = {
    ...passage,
    text: ignorePunctuation ? normalizeTextForTyping(passage.text) : passage.text,
  }

  return {
    status: 'idle',
    passage: normalizedPassage,
    words: buildWordStates(normalizedPassage.text),
    currentWordIndex: 0,
    currentInput: '',
    startTime: null,
    endTime: null,
    keystrokeStats: { totalTyped: 0, correct: 0, errors: 0 },
    duration,
    ignorePunctuation,
  }
}

// ─── Helper: update char highlights for the active word ───────────────────────

function applyInputToWord(word: WordState, input: string): WordState {
  const chars: CharState[] = word.chars.map((c, i) => {
    if (i < input.length) {
      return { char: c.char, status: input[i] === c.char ? 'correct' : 'incorrect' }
    }
    if (i === input.length) {
      return { char: c.char, status: 'current' }
    }
    return { char: c.char, status: 'pending' }
  })

  return { ...word, chars }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

export function typingReducer(state: TypingSession, action: TypingAction): TypingSession {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      if (state.status === 'finished') return state

      const input = action.payload
      const now = performance.now()

      // Start session on first real keystroke
      const isFirstKeystroke = state.status === 'idle' && input.length > 0
      const startTime = isFirstKeystroke ? now : state.startTime
      const status = isFirstKeystroke ? 'running' : state.status

      // Update char highlights in current word
      const words = state.words.map((w, i) =>
        i === state.currentWordIndex ? applyInputToWord(w, input) : w,
      )

      // Track keystrokes: only count additions (not deletions)
      const prevLen = state.currentInput.length
      const newLen = input.length
      const isAddition = newLen > prevLen

      let { totalTyped, correct, errors } = state.keystrokeStats
      if (isAddition) {
        const typedChar = input[newLen - 1]
        const targetChar = state.words[state.currentWordIndex]?.chars[newLen - 1]?.char
        totalTyped++
        if (typedChar === targetChar) {
          correct++
        } else {
          errors++
        }
      }

      return {
        ...state,
        status,
        startTime,
        currentInput: input,
        words,
        keystrokeStats: { totalTyped, correct, errors },
      }
    }

    case 'WORD_SUBMIT': {
      if (state.status !== 'running') return state

      const { currentWordIndex, words } = state
      const targetWord = words[currentWordIndex]
      const input = state.currentInput

      // Mark current word as completed or error
      const wordCorrect = input === targetWord.chars.map((c) => c.char).join('')
      const completedWord: WordState = {
        ...targetWord,
        status: wordCorrect ? 'completed' : 'error',
        chars: targetWord.chars.map((c, i) => ({
          char: c.char,
          status:
            i < input.length
              ? input[i] === c.char
                ? 'correct'
                : 'incorrect'
              : 'incorrect', // untouched chars at end = incorrect
        })),
      }

      const isLastWord = currentWordIndex === words.length - 1

      if (isLastWord) {
        // All words typed → finish
        return {
          ...state,
          words: words.map((w, i) => (i === currentWordIndex ? completedWord : w)),
          currentInput: '',
          currentWordIndex: currentWordIndex + 1,
          status: 'finished',
          endTime: performance.now(),
        }
      }

      // Advance to next word: reset first char of next word to 'current'
      const nextIndex = currentWordIndex + 1
      const nextWord: WordState = {
        ...words[nextIndex],
        status: 'active',
        chars: words[nextIndex].chars.map((c, i) => ({
          ...c,
          status: i === 0 ? 'current' : 'pending',
        })),
      }

      const updatedWords = words.map((w, i) => {
        if (i === currentWordIndex) return completedWord
        if (i === nextIndex) return nextWord
        return w
      })

      return {
        ...state,
        words: updatedWords,
        currentWordIndex: nextIndex,
        currentInput: '',
      }
    }

    case 'FINISH': {
      if (state.status !== 'running') return state
      return { ...state, status: 'finished', endTime: performance.now() }
    }

    case 'RESET': {
      return createInitialSession({
        duration: action.payload?.duration ?? state.duration,
        ignorePunctuation: action.payload?.ignorePunctuation ?? state.ignorePunctuation,
        language: action.payload?.language ?? state.passage.lang,
      })
    }

    default:
      return state
  }
}
