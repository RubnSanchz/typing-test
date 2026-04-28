import { useState, type ReactNode } from 'react'
import type { ShellCopy } from '@/data/uiCopy'
import type { LanguageCode, UserProfile } from '@/types/domain'
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
}

type ProfileEditorMode = 'create' | 'rename' | null

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
                onChange={(e) => {
                  onSelectProfile(e.target.value)
                  closeEditor()
                }}
                aria-label={copy.profileSelectorAria}
              >
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
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
          <span>{copy.footerTitle} · RubnSanchz · {copy.languageOptions[language]}</span>
        </footer>
      )}
    </div>
  )
}
