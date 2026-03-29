import type { ReactNode } from 'react'
import './AppShell.css'

interface Props {
  children: ReactNode
  onToggleTheme: () => void
  theme: 'dark' | 'light'
}

export function AppShell({ children, onToggleTheme, theme }: Props) {
  return (
    <div className="shell">
      <header className="shell__header">
        <span className="shell__logo">tt</span>
        <button
          className="shell__theme-btn"
          onClick={onToggleTheme}
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          title={`Tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      <main className="shell__main">{children}</main>

      <footer className="shell__footer">
        <span>typing test · español</span>
      </footer>
    </div>
  )
}
