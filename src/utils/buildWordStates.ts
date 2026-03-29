import type { WordState, CharState } from '@/types/domain'

/** Splits a passage into WordState array ready for the reducer. */
export function buildWordStates(text: string): WordState[] {
  const words = text.split(' ')
  return words.map((word, wi) => ({
    status: wi === 0 ? 'active' : 'pending',
    chars: word.split('').map(
      (char): CharState => ({
        char,
        status: wi === 0 ? 'current' : 'pending',
      }),
    ),
  }))
}
