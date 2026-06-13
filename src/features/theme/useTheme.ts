import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'tt-theme'

function getInitialTheme(): Theme {
  const stored = readStorage(STORAGE_KEY) as Theme | null
  if (stored === 'dark' || stored === 'light') return stored

  // Detect system preference, fallback to dark
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    writeStorage(STORAGE_KEY, theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle } as const
}
