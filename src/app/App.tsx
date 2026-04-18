import { useTheme } from '@/features/theme/useTheme'
import { useProfiles } from '@/features/settings/useProfiles'
import { useSettings } from '@/features/settings/useSettings'
import { getUiCopy } from '@/data/uiCopy'
import { AppShell } from '@/components/AppShell/AppShell'
import { TypingTestPage } from './TypingTestPage'

export function App() {
  const { theme, toggle } = useTheme()
  const { profiles, activeProfile, selectProfile, createProfile, renameProfile, deleteProfile } = useProfiles()
  const { prefs, setDuration, setIgnorePunctuation, setLanguage, setPreferences, durationOptions } = useSettings(activeProfile.id)
  const ui = getUiCopy(prefs.language)

  const handleCreateProfile = (name: string) => createProfile(name)

  const handleRenameProfile = (profileId: string, name: string) => renameProfile(profileId, name)

  const handleDeleteProfile = () => {
    const confirmed = window.confirm(ui.app.confirmDeleteProfile(activeProfile.name))
    if (!confirmed) return
    deleteProfile(activeProfile.id)
  }

  return (
    <AppShell
      theme={theme}
      onToggleTheme={toggle}
      language={prefs.language}
      onChangeLanguage={setLanguage}
      profiles={profiles}
      activeProfileId={activeProfile.id}
      onSelectProfile={selectProfile}
      onCreateProfile={handleCreateProfile}
      onRenameProfile={handleRenameProfile}
      onDeleteProfile={handleDeleteProfile}
      copy={ui.shell}
    >
      <TypingTestPage
        profileId={activeProfile.id}
        profileName={activeProfile.name}
        prefs={prefs}
        setDuration={setDuration}
        setIgnorePunctuation={setIgnorePunctuation}
        setPreferences={setPreferences}
        durationOptions={durationOptions}
        ui={ui}
      />
    </AppShell>
  )
}
