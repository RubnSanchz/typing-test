import { useState, useEffect, useCallback } from 'react'
import { readStorage, writeStorage, removeStorage } from '@/utils/storage'

const ZOOM_STORAGE_KEY = 'app-zoom-level'
const MIN_ZOOM = 0.8
const MAX_ZOOM = 1.5
const ZOOM_STEP = 0.1

const applyZoom = (level: number) => {
  const root = document.documentElement
  root.style.setProperty('--app-zoom-scale', `${level}`)
}

const initializeZoom = () => {
  const stored = readStorage(ZOOM_STORAGE_KEY)
  if (stored) {
    const parsed = parseFloat(stored)
    if (!isNaN(parsed) && parsed >= MIN_ZOOM && parsed <= MAX_ZOOM) {
      applyZoom(parsed)
      return parsed
    }
  }
  return 1
}

export function useZoom() {
  const [zoom, setZoom] = useState(initializeZoom)

  const updateZoom = useCallback((newZoom: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom))
    setZoom(clamped)
    writeStorage(ZOOM_STORAGE_KEY, clamped.toString())
    applyZoom(clamped)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return

      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        updateZoom(zoom + ZOOM_STEP)
      } else if (e.key === '-') {
        e.preventDefault()
        updateZoom(zoom - ZOOM_STEP)
      } else if (e.key === '0') {
        e.preventDefault()
        setZoom(1)
        removeStorage(ZOOM_STORAGE_KEY)
        applyZoom(1)
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      const direction = e.deltaY > 0 ? -1 : 1
      updateZoom(zoom + direction * ZOOM_STEP)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [zoom, updateZoom])

  return { zoom }
}
