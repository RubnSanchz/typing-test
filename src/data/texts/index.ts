import type { LanguageCode, TextPassage } from '@/types/domain'
import esPassages from './es'
import enPassages from './en'
import frPassages from './fr'

const CATALOGUE: Record<LanguageCode, TextPassage[]> = {
  es: esPassages,
  en: enPassages,
  fr: frPassages,
}

export function getRandomPassageByLanguage(language: LanguageCode): TextPassage {
  const passages = CATALOGUE[language]
  const index = Math.floor(Math.random() * passages.length)
  return passages[index]
}
