import { useEffect, useRef } from 'react'
import './TypingInput.css'

interface Props {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  onFocus?: () => void
}

export function TypingInput({ value, onChange, disabled, onFocus }: Props) {
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
      aria-label="Área de escritura"
      placeholder={disabled ? '' : 'Empieza a escribir…'}
    />
  )
}
