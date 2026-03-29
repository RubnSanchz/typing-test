import { useTheme } from '@/features/theme/useTheme'
import { AppShell } from '@/components/AppShell/AppShell'
import { TypingTestPage } from './TypingTestPage'

export function App() {
  const { theme, toggle } = useTheme()

  return (
    <AppShell theme={theme} onToggleTheme={toggle}>
      <TypingTestPage />
    </AppShell>
  )
}
