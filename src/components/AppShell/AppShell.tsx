import { useState, type ReactNode } from 'react'
import type { AuthCopy, DonateCopy, ShellCopy } from '@/data/uiCopy'
import type { LanguageCode, UserProfile } from '@/types/domain'
import { AuthBadge } from '@/components/AuthBadge/AuthBadge'
import { DonateButton } from '@/components/DonateButton/DonateButton'
import { profileDisplayName } from '@/features/settings/useProfiles'
import './AppShell.css'

interface Props {
  children: ReactNode
  isFocusMode: boolean
  onToggleTheme: () => void
  theme: 'dark' | 'light'
  language: LanguageCode
  onChangeLanguage: (language: LanguageCode) => void
  profiles: UserProfile[]
  activeProfileId: string
  onSelectProfile: (profileId: string) => void
  onCreateProfile: (name: string) => boolean
  onRenameProfile: (profileId: string, name: string) => boolean
  onDeleteProfile: () => void
  copy: ShellCopy
  authCopy: AuthCopy
  donateCopy: DonateCopy
}

type ProfileEditorMode = 'create' | 'rename' | null

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function AppShell({
  children,
  isFocusMode,
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
  authCopy,
  donateCopy,
}: Props) {
  const nextThemeName = theme === 'dark' ? copy.themeNameLight : copy.themeNameDark
  const [editorMode, setEditorMode] = useState<ProfileEditorMode>(null)
  const [draftName, setDraftName] = useState('')

  const openCreateEditor = () => {
    setEditorMode('create')
    setDraftName('')
  }

  const openRenameEditor = () => {
    const currentProfile = profiles.find((profile) => profile.id === activeProfileId)
    setEditorMode('rename')
    setDraftName(currentProfile?.name ?? '')
  }

  const closeEditor = () => {
    setEditorMode(null)
    setDraftName('')
  }

  const submitEditor = () => {
    const trimmed = draftName.trim()
    if (!trimmed) return

    const success =
      editorMode === 'create'
        ? onCreateProfile(trimmed)
        : onRenameProfile(activeProfileId, trimmed)

    if (success) {
      closeEditor()
    }
  }

  const editorTitle = editorMode === 'create' ? copy.createProfileTitle : copy.renameProfileTitle

  return (
    <div className="shell">
      {!isFocusMode && (
        <header className="shell__header">
          <img
            className="shell__logo"
            src={`${import.meta.env.BASE_URL}typing-test-icon.png`}
            alt={copy.footerTitle}
          />
          <div className="shell__controls">
            <div className="shell__controls-group shell__controls-group--profile">
              <label className="shell__language-label" htmlFor="profile-selector">
                {copy.profileLabel}
              </label>
              <select
                id="profile-selector"
                className="shell__language-select"
                value={activeProfileId}
                onChange={(e) => {
                  onSelectProfile(e.target.value)
                  closeEditor()
                }}
                aria-label={copy.profileSelectorAria}
              >
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profileDisplayName(profile, copy.defaultProfileName)}
                  </option>
                ))}
              </select>

              <div className="shell__profile-actions">
                <button
                  className="shell__icon-btn"
                  onClick={openCreateEditor}
                  aria-label={copy.createProfileAria}
                  title={copy.createProfileTitle}
                >
                  +
                </button>
                <button
                  className="shell__icon-btn"
                  onClick={openRenameEditor}
                  aria-label={copy.renameProfileAria}
                  title={copy.renameProfileTitle}
                >
                  ✎
                </button>
                <button
                  className="shell__icon-btn"
                  onClick={onDeleteProfile}
                  aria-label={copy.deleteProfileAria}
                  title={copy.deleteProfileTitle}
                  disabled={profiles.length <= 1}
                >
                  ×
                </button>
              </div>
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
            </div>

            <div className="shell__controls-group shell__controls-group--theme">
              <button
                className={`shell__theme-btn ${theme === 'dark' ? 'shell__theme-btn--sun' : 'shell__theme-btn--moon'}`}
                onClick={onToggleTheme}
                aria-label={copy.themeSwitchAria(nextThemeName)}
                title={copy.themeSwitchTitle(nextThemeName)}
              >
                {theme === 'dark' ? '☀' : <MoonIcon />}
              </button>
            </div>
          </div>
        </header>
      )}

      {editorMode ? (
        <div
          className="shell__profile-modal-overlay"
          onClick={closeEditor}
          role="presentation"
        >
          <div
            className="shell__profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label={editorTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shell__profile-modal-header">
              <h3 className="shell__profile-modal-title">{editorTitle}</h3>
            </div>

            <input
              className="shell__profile-input"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value.slice(0, 32))}
              placeholder={copy.profileNamePlaceholder}
              aria-label={copy.profileNamePlaceholder}
              maxLength={32}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitEditor()
                }
                if (e.key === 'Escape') {
                  closeEditor()
                }
              }}
              autoFocus
            />

            <div className="shell__profile-modal-actions">
              <button className="shell__add-btn shell__add-btn--primary" onClick={submitEditor}>
                {copy.saveProfileText}
              </button>
              <button className="shell__add-btn" onClick={closeEditor}>
                {copy.cancelProfileText}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <main className={`shell__main ${isFocusMode ? 'shell__main--focus' : ''}`}>{children}</main>

      {!isFocusMode && (
        <footer className="shell__footer">
          <AuthBadge copy={authCopy} />
          <span className="shell__footer-text">
            {copy.footerTitle} ·{' '}
            <a
              className="shell__repo-link"
              href="https://github.com/RubnSanchz/typing-test"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RubnSanchz on GitHub"
            >
              <GithubIcon />
              RubnSanchz
            </a>{' '}
            · {copy.languageOptions[language]}
          </span>
          <DonateButton copy={donateCopy} />
        </footer>
      )}
    </div>
  )
}
