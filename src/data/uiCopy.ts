import type { LanguageCode } from '@/types/domain'

export interface ShellCopy {
  profileLabel: string
  profileSelectorAria: string
  createProfileAria: string
  createProfileTitle: string
  createProfileText: string
  renameProfileAria: string
  renameProfileTitle: string
  renameProfileText: string
  deleteProfileAria: string
  deleteProfileTitle: string
  deleteProfileText: string
  profileNamePlaceholder: string
  saveProfileText: string
  cancelProfileText: string
  languageLabel: string
  languageSelectorAria: string
  themeSwitchAria: (nextThemeName: string) => string
  themeSwitchTitle: (nextThemeName: string) => string
  themeNameLight: string
  themeNameDark: string
  footerTitle: string
  languageOptions: Record<LanguageCode, string>
}

interface AppCopy {
  promptNewProfile: string
  promptRenameProfile: string
  confirmDeleteProfile: (profileName: string) => string
}

interface TypingPageCopy {
  restartNow: string
  startHint: string
  textDisplayAria: string
}

export interface TypingInputCopy {
  ariaLabel: string
  placeholder: string
}

export interface TimerPanelCopy {
  durationGroupAria: string
  punctuationGroupAria: string
  punctuationOff: string
  punctuationOn: string
}

export interface StatsPanelCopy {
  ariaLive: string
  ariaResults: string
  wpmNetLabel: string
  wpmGrossLabel: string
  accuracyLabel: string
  errorsLabel: string
}

export interface HistoryPanelCopy {
  sectionAria: string
  title: string
  clear: string
  details: string
  detailsTitle: string
  detailsHint: string
  close: string
  modeLabel: string
  empty: string
  noData: string
  languageHeader: string
  testsLabel: string
  bestWpmLabel: string
  bestAccuracyLabel: string
  averageWpmLabel: string
  punctuationOffShort: string
  punctuationOnShort: string
  languageOptions: Record<LanguageCode, string>
}

interface ResultsModalCopy {
  dialogAria: string
  titleNewBest: string
  titleResults: string
  bestPrefix: string
  speedUnit: string
  retry: string
  shortcutHintPrefix: string
}

export interface UiCopy {
  app: AppCopy
  shell: ShellCopy
  typingPage: TypingPageCopy
  typingInput: TypingInputCopy
  timerPanel: TimerPanelCopy
  statsPanel: StatsPanelCopy
  historyPanel: HistoryPanelCopy
  resultsModal: ResultsModalCopy
}

const UI_COPY: Record<LanguageCode, UiCopy> = {
  es: {
    app: {
      promptNewProfile: 'Nombre del nuevo perfil',
      promptRenameProfile: 'Nuevo nombre del perfil',
      confirmDeleteProfile: (profileName: string) => `Borrar perfil "${profileName}"?`,
    },
    shell: {
      profileLabel: 'Perfil',
      profileSelectorAria: 'Seleccionar perfil',
      createProfileAria: 'Crear perfil',
      createProfileTitle: 'Nuevo perfil',
      createProfileText: 'Nuevo',
      renameProfileAria: 'Editar nombre de perfil',
      renameProfileTitle: 'Editar perfil',
      renameProfileText: 'Editar',
      deleteProfileAria: 'Borrar perfil',
      deleteProfileTitle: 'Borrar perfil',
      deleteProfileText: 'Borrar',
      profileNamePlaceholder: 'Nombre del perfil',
      saveProfileText: 'Guardar',
      cancelProfileText: 'Cancelar',
      languageLabel: 'Idioma',
      languageSelectorAria: 'Seleccionar idioma',
      themeSwitchAria: (nextThemeName: string) => `Cambiar a tema ${nextThemeName}`,
      themeSwitchTitle: (nextThemeName: string) => `Tema ${nextThemeName}`,
      themeNameLight: 'claro',
      themeNameDark: 'oscuro',
      footerTitle: 'typing test',
      languageOptions: {
        es: 'Español',
        en: 'Inglés',
        fr: 'Francés',
      },
    },
    typingPage: {
      restartNow: 'Reiniciar ahora',
      startHint: 'Empieza a escribir para iniciar el test',
      textDisplayAria: 'Texto objetivo',
    },
    typingInput: {
      ariaLabel: 'Area de escritura',
      placeholder: 'Empieza a escribir...',
    },
    timerPanel: {
      durationGroupAria: 'Duracion del test',
      punctuationGroupAria: 'Signos de puntuacion',
      punctuationOff: 'Sin signos',
      punctuationOn: 'Con signos',
    },
    statsPanel: {
      ariaLive: 'Estadisticas en vivo',
      ariaResults: 'Resultados',
      wpmNetLabel: 'WPM',
      wpmGrossLabel: 'Bruto',
      accuracyLabel: 'Precision',
      errorsLabel: 'Errores',
    },
    historyPanel: {
      sectionAria: 'Historial local',
      title: 'Historial local',
      clear: 'Borrar',
      details: 'Más info',
      detailsTitle: 'Desglose por idioma y modo',
      detailsHint: 'Pulsa una celda para cambiar a ese modo.',
      close: 'Cerrar',
      modeLabel: 'Modo actual',
      empty: 'Aun no hay tests guardados para esta combinación.',
      noData: 'Sin datos',
      languageHeader: 'Idioma',
      testsLabel: 'Tests',
      bestWpmLabel: 'WPM max',
      bestAccuracyLabel: 'Precision max',
      averageWpmLabel: 'WPM medio',
      punctuationOffShort: 'Sin',
      punctuationOnShort: 'Con',
      languageOptions: {
        es: 'Español',
        en: 'Inglés',
        fr: 'Francés',
      },
    },
    resultsModal: {
      dialogAria: 'Resultados',
      titleNewBest: 'Nuevo record!',
      titleResults: 'Resultados',
      bestPrefix: 'Tu mejor:',
      speedUnit: 'WPM',
      retry: 'Volver a intentar',
      shortcutHintPrefix: 'o pulsa',
    },
  },
  en: {
    app: {
      promptNewProfile: 'New profile name',
      promptRenameProfile: 'New profile display name',
      confirmDeleteProfile: (profileName: string) => `Delete profile "${profileName}"?`,
    },
    shell: {
      profileLabel: 'Profile',
      profileSelectorAria: 'Select profile',
      createProfileAria: 'Create profile',
      createProfileTitle: 'New profile',
      createProfileText: 'New',
      renameProfileAria: 'Edit profile name',
      renameProfileTitle: 'Edit profile',
      renameProfileText: 'Edit',
      deleteProfileAria: 'Delete profile',
      deleteProfileTitle: 'Delete profile',
      deleteProfileText: 'Delete',
      profileNamePlaceholder: 'Profile name',
      saveProfileText: 'Save',
      cancelProfileText: 'Cancel',
      languageLabel: 'Language',
      languageSelectorAria: 'Select language',
      themeSwitchAria: (nextThemeName: string) => `Switch to ${nextThemeName} theme`,
      themeSwitchTitle: (nextThemeName: string) => `${nextThemeName} theme`,
      themeNameLight: 'light',
      themeNameDark: 'dark',
      footerTitle: 'typing test',
      languageOptions: {
        es: 'Spanish',
        en: 'English',
        fr: 'French',
      },
    },
    typingPage: {
      restartNow: 'Restart now',
      startHint: 'Start typing to begin the test',
      textDisplayAria: 'Target text',
    },
    typingInput: {
      ariaLabel: 'Typing area',
      placeholder: 'Start typing...',
    },
    timerPanel: {
      durationGroupAria: 'Test duration',
      punctuationGroupAria: 'Punctuation mode',
      punctuationOff: 'No punctuation',
      punctuationOn: 'With punctuation',
    },
    statsPanel: {
      ariaLive: 'Live stats',
      ariaResults: 'Results',
      wpmNetLabel: 'WPM',
      wpmGrossLabel: 'Gross',
      accuracyLabel: 'Accuracy',
      errorsLabel: 'Errors',
    },
    historyPanel: {
      sectionAria: 'Local history',
      title: 'Local history',
      clear: 'Clear',
      details: 'More info',
      detailsTitle: 'Breakdown by language and mode',
      detailsHint: 'Click any cell to switch to that mode.',
      close: 'Close',
      modeLabel: 'Current mode',
      empty: 'No saved tests yet for this combination.',
      noData: 'No data',
      languageHeader: 'Language',
      testsLabel: 'Tests',
      bestWpmLabel: 'Best WPM',
      bestAccuracyLabel: 'Best accuracy',
      averageWpmLabel: 'Average WPM',
      punctuationOffShort: 'Off',
      punctuationOnShort: 'On',
      languageOptions: {
        es: 'Spanish',
        en: 'English',
        fr: 'French',
      },
    },
    resultsModal: {
      dialogAria: 'Results',
      titleNewBest: 'New record!',
      titleResults: 'Results',
      bestPrefix: 'Your best:',
      speedUnit: 'WPM',
      retry: 'Try again',
      shortcutHintPrefix: 'or press',
    },
  },
  fr: {
    app: {
      promptNewProfile: 'Nom du nouveau profil',
      promptRenameProfile: 'Nouveau nom du profil',
      confirmDeleteProfile: (profileName: string) => `Supprimer le profil "${profileName}" ?`,
    },
    shell: {
      profileLabel: 'Profil',
      profileSelectorAria: 'Selectionner un profil',
      createProfileAria: 'Creer un profil',
      createProfileTitle: 'Nouveau profil',
      createProfileText: 'Nouveau',
      renameProfileAria: 'Modifier le nom du profil',
      renameProfileTitle: 'Modifier le profil',
      renameProfileText: 'Modifier',
      deleteProfileAria: 'Supprimer le profil',
      deleteProfileTitle: 'Supprimer le profil',
      deleteProfileText: 'Supprimer',
      profileNamePlaceholder: 'Nom du profil',
      saveProfileText: 'Enregistrer',
      cancelProfileText: 'Annuler',
      languageLabel: 'Langue',
      languageSelectorAria: 'Selectionner la langue',
      themeSwitchAria: (nextThemeName: string) => `Passer au theme ${nextThemeName}`,
      themeSwitchTitle: (nextThemeName: string) => `Theme ${nextThemeName}`,
      themeNameLight: 'clair',
      themeNameDark: 'sombre',
      footerTitle: 'typing test',
      languageOptions: {
        es: 'Espagnol',
        en: 'Anglais',
        fr: 'Francais',
      },
    },
    typingPage: {
      restartNow: 'Redemarrer',
      startHint: 'Commence a taper pour lancer le test',
      textDisplayAria: 'Texte cible',
    },
    typingInput: {
      ariaLabel: 'Zone de saisie',
      placeholder: 'Commence a taper...',
    },
    timerPanel: {
      durationGroupAria: 'Duree du test',
      punctuationGroupAria: 'Ponctuation',
      punctuationOff: 'Sans ponctuation',
      punctuationOn: 'Avec ponctuation',
    },
    statsPanel: {
      ariaLive: 'Statistiques en direct',
      ariaResults: 'Resultats',
      wpmNetLabel: 'MPM',
      wpmGrossLabel: 'Brut',
      accuracyLabel: 'Precision',
      errorsLabel: 'Erreurs',
    },
    historyPanel: {
      sectionAria: 'Historique local',
      title: 'Historique local',
      clear: 'Effacer',
      details: 'Plus d\'infos',
      detailsTitle: 'Detail par langue et mode',
      detailsHint: 'Clique sur une case pour changer de mode.',
      close: 'Fermer',
      modeLabel: 'Mode actuel',
      empty: 'Aucun test enregistre pour cette combinaison.',
      noData: 'Sans donnees',
      languageHeader: 'Langue',
      testsLabel: 'Tests',
      bestWpmLabel: 'MPM max',
      bestAccuracyLabel: 'Precision max',
      averageWpmLabel: 'MPM moyen',
      punctuationOffShort: 'Sans',
      punctuationOnShort: 'Avec',
      languageOptions: {
        es: 'Espagnol',
        en: 'Anglais',
        fr: 'Francais',
      },
    },
    resultsModal: {
      dialogAria: 'Resultats',
      titleNewBest: 'Nouveau record !',
      titleResults: 'Resultats',
      bestPrefix: 'Ton meilleur :',
      speedUnit: 'MPM',
      retry: 'Reessayer',
      shortcutHintPrefix: 'ou appuie sur',
    },
  },
}

export function getUiCopy(language: LanguageCode): UiCopy {
  return UI_COPY[language]
}
