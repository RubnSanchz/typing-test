/**
 * Removes punctuation and symbols to keep typing flow focused on words.
 * Preserves letters with accents, numbers and spaces.
 */
export function normalizeTextForTyping(text: string): string {
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}
