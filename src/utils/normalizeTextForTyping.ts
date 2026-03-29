/**
 * Removes punctuation and symbols and normalizes text to lowercase.
 * Preserves letters with accents, numbers and spaces.
 */
export function normalizeTextForTyping(text: string): string {
  return text
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}
