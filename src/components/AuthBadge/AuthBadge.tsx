import { useEffect, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { useAuth } from '@/features/auth/useAuth'
import type { AuthCopy } from '@/data/uiCopy'
import './AuthBadge.css'

interface Props {
  copy: AuthCopy
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6Z"
      />
    </svg>
  )
}

export function AuthBadge({ copy }: Props) {
  const {
    available,
    account,
    busy,
    error,
    clearError,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signOutUser,
  } = useAuth()

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'signin' | 'register'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Firebase not configured → no auth UI at all.
  if (!available) return null

  const isSignedIn = account.status === 'google' || account.status === 'password'

  const close = () => {
    setOpen(false)
    setEmail('')
    setPassword('')
    setMode('signin')
    clearError()
  }

  const handleGoogle = async () => {
    if (await signInWithGoogle()) close()
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return
    const ok =
      mode === 'signin'
        ? await signInWithEmail(email.trim(), password)
        : await registerWithEmail(email.trim(), password)
    if (ok) close()
  }

  const handleSignOut = async () => {
    await signOutUser()
    close()
  }

  return (
    <>
      <button
        type="button"
        className={clsx('auth-badge', `auth-badge--${account.status}`)}
        onClick={() => setOpen(true)}
        aria-label={isSignedIn ? copy.openMenuAria : copy.notSignedInLabel}
        title={isSignedIn ? account.displayName ?? account.email ?? copy.openMenuAria : copy.notSignedInLabel}
      >
        {account.status === 'google' && account.photoURL ? (
          <img className="auth-badge__avatar" src={account.photoURL} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span className="auth-badge__icon">
            <UserIcon />
          </span>
        )}
        {account.status === 'google' && account.displayName && (
          <span className="auth-badge__name">{account.displayName}</span>
        )}
        {account.status === 'password' && account.email && (
          <span className="auth-badge__name">{account.email}</span>
        )}
      </button>

      {open && (
        <div className="auth-modal-overlay" role="presentation" onClick={close}>
          <div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-label={isSignedIn ? copy.accountTitle : copy.signInTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-modal__header">
              <h3 className="auth-modal__title">{isSignedIn ? copy.accountTitle : copy.signInTitle}</h3>
              <button type="button" className="auth-modal__close" onClick={close} aria-label={copy.close}>
                ×
              </button>
            </div>

            {isSignedIn ? (
              <div className="auth-account">
                <div className="auth-account__identity">
                  {account.status === 'google' && account.photoURL ? (
                    <img className="auth-account__avatar" src={account.photoURL} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="auth-account__avatar auth-account__avatar--icon">
                      <UserIcon />
                    </span>
                  )}
                  <div className="auth-account__details">
                    <span className="auth-account__hint">{copy.signedInAs}</span>
                    <span className="auth-account__name">{account.displayName ?? account.email}</span>
                    {account.displayName && account.email && (
                      <span className="auth-account__email">{account.email}</span>
                    )}
                  </div>
                </div>
                <button type="button" className="auth-btn auth-btn--primary" onClick={handleSignOut} disabled={busy}>
                  {copy.signOutButton}
                </button>
              </div>
            ) : (
              <>
                <button type="button" className="auth-btn auth-btn--google" onClick={handleGoogle} disabled={busy}>
                  <span className="auth-btn__google-g" aria-hidden="true">G</span>
                  {copy.googleButton}
                </button>

                <div className="auth-divider"><span>{copy.orSeparator}</span></div>

                <form className="auth-form" onSubmit={handleEmailSubmit}>
                  <label className="auth-field">
                    <span>{copy.emailLabel}</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.emailPlaceholder}
                      required
                    />
                  </label>
                  <label className="auth-field">
                    <span>{copy.passwordLabel}</span>
                    <input
                      type="password"
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={copy.passwordPlaceholder}
                      minLength={6}
                      required
                    />
                  </label>

                  {error && <p className="auth-error">{copy.errorGeneric}</p>}

                  <button type="submit" className="auth-btn auth-btn--primary" disabled={busy}>
                    {mode === 'signin' ? copy.signInButton : copy.registerButton}
                  </button>
                </form>

                <button
                  type="button"
                  className="auth-toggle"
                  onClick={() => {
                    setMode((m) => (m === 'signin' ? 'register' : 'signin'))
                    clearError()
                  }}
                >
                  {mode === 'signin' ? copy.toggleToRegister : copy.toggleToSignIn}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
