import { useEffect, useRef } from 'react'
import type { TypingInputCopy } from '@/data/uiCopy'
import './TypingInput.css'

interface Props {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  onFocus?: () => void
  copy: TypingInputCopy
}

export function TypingInput({ value, onChange, disabled, onFocus, copy }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus on mount and re-focus when disabled resets to false
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  return (
    <input
      ref={inputRef}
      className="typing-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      disabled={disabled}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck={false}
      aria-label={copy.ariaLabel}
      placeholder={disabled ? '' : copy.placeholder}
    />
  )
}
