import type { ReactNode } from 'react'
import type { LanguageCode, UserProfile } from '@/types/domain'
import './AppShell.css'

interface Props {
  children: ReactNode
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  language: LanguageCode
  onChangeLanguage: (language: LanguageCode) => void
  profiles: UserProfile[]
  activeProfileId: string
  onSelectProfile: (profileId: string) => void
  onCreateProfile: () => void
  onRenameProfile: () => void
  onDeleteProfile: () => void
}

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  es: 'Espanol',
  en: 'English',
  fr: 'Francais',
}

export function AppShell({
  children,
  onToggleTheme,
  theme,
  language,
  onChangeLanguage,
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  onRenameProfile,
  onDeleteProfile,
}: Props) {
  return (
    <div className="shell">
      <header className="shell__header">
        <span className="shell__logo">tt</span>
        <div className="shell__controls">
          <label className="shell__language-label" htmlFor="profile-selector">
            Perfil
          </label>
          <select
            id="profile-selector"
            className="shell__language-select"
            value={activeProfileId}
            onChange={(e) => onSelectProfile(e.target.value)}
            aria-label="Seleccionar perfil"
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>

          <button
            className="shell__add-btn"
            onClick={onCreateProfile}
            aria-label="Crear perfil"
            title="Nuevo perfil"
          >
            +
          </button>
          <button
            className="shell__add-btn"
            onClick={onRenameProfile}
            aria-label="Editar nombre de perfil"
            title="Editar perfil"
          >
            Edit
          </button>
          <button
            className="shell__add-btn"
            onClick={onDeleteProfile}
            aria-label="Borrar perfil"
            title="Borrar perfil"
          >
            Del
          </button>

          <label className="shell__language-label" htmlFor="language-selector">
            Idioma
          </label>
          <select
            id="language-selector"
            className="shell__language-select"
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
            aria-label="Seleccionar idioma"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          <button
            className="shell__theme-btn"
            onClick={onToggleTheme}
            aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            title={`Tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <main className="shell__main">{children}</main>

      <footer className="shell__footer">
        <span>typing test · {LANGUAGE_LABELS[language]}</span>
      </footer>
    </div>
  )
}
