import type { ReactNode } from 'react'
import type { ShellCopy } from '@/data/uiCopy'
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
  copy: ShellCopy
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
  copy,
}: Props) {
  const nextThemeName = theme === 'dark' ? copy.themeNameLight : copy.themeNameDark

  return (
    <div className="shell">
      <header className="shell__header">
        <span className="shell__logo">tt</span>
        <div className="shell__controls">
          <div className="shell__controls-group shell__controls-group--profile">
            <label className="shell__language-label" htmlFor="profile-selector">
              {copy.profileLabel}
            </label>
            <select
              id="profile-selector"
              className="shell__language-select"
              value={activeProfileId}
              onChange={(e) => onSelectProfile(e.target.value)}
              aria-label={copy.profileSelectorAria}
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
              aria-label={copy.createProfileAria}
              title={copy.createProfileTitle}
            >
              +
            </button>
            <button
              className="shell__add-btn"
              onClick={onRenameProfile}
              aria-label={copy.renameProfileAria}
              title={copy.renameProfileTitle}
            >
              {copy.renameProfileText}
            </button>
            <button
              className="shell__add-btn"
              onClick={onDeleteProfile}
              aria-label={copy.deleteProfileAria}
              title={copy.deleteProfileTitle}
            >
              {copy.deleteProfileText}
            </button>
          </div>

          <div className="shell__controls-group shell__controls-group--language">
            <label className="shell__language-label" htmlFor="language-selector">
              {copy.languageLabel}
            </label>
            <select
              id="language-selector"
              className="shell__language-select"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
              aria-label={copy.languageSelectorAria}
            >
              <option value="es">{copy.languageOptions.es}</option>
              <option value="en">{copy.languageOptions.en}</option>
              <option value="fr">{copy.languageOptions.fr}</option>
            </select>

            <button
              className="shell__theme-btn"
              onClick={onToggleTheme}
              aria-label={copy.themeSwitchAria(nextThemeName)}
              title={copy.themeSwitchTitle(nextThemeName)}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </div>
      </header>

      <main className="shell__main">{children}</main>

      <footer className="shell__footer">
        <span>{copy.footerTitle} · {copy.languageOptions[language]}</span>
      </footer>
    </div>
  )
}
