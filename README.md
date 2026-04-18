# Typing Test

A timed typing-speed trainer built with React, TypeScript, and Vite. Available as a public web app and as a desktop app via Electron.

## Public web app

https://rubnsanchz.github.io/typing-test/

## Features

- **Timed tests** — choose between 15 s, 30 s, or 60 s sessions.
- **Multilingual passages** — practice in Spanish, English, or French.
- **Real-time feedback** — each character is highlighted as correct, incorrect, or pending while you type.
- **Live metrics** — WPM (gross and net), accuracy, and error count are computed after every session.
- **Results modal** — a summary is shown at the end of each test.
- **Session history** — per-profile stats (total tests, average WPM, average accuracy, personal best) are persisted in `localStorage`.
- **Multiple profiles** — create, rename, and delete user profiles; each profile keeps its own settings and history.
- **Ignore-punctuation mode** — optionally strip punctuation from passages before the test.
- **Dark / light theme** — toggleable, with system-preference detection as the default.

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript |
| Bundler | Vite |
| Desktop shell | Electron |
| State | `useReducer` + custom hooks |
| Persistence | `localStorage` |
| Lint / format | ESLint, Prettier |

## Getting started

```bash
npm install
```

### Web (dev server)

```bash
npm run dev
```

### Desktop (Electron)

```bash
npm run desktop:start
```

## Building

| Command | Output |
|---|---|
| `npm run build` | Web build (for GitHub Pages at `/typing-test/`) |
| `npm run build:desktop` | Desktop build |
| `npm run dist:win` | Windows NSIS installer |
| `npm run dist:all` | Alias of the stable Windows installer build |

## Project structure

```
src/
  app/              # Root App component and main page
  components/       # UI components (AppShell, TextDisplay, TimerPanel, …)
  data/texts/       # Text passages per language (es, en, fr)
  features/
    typing-engine/  # Core reducer and session hook
    settings/       # User preferences and profile management
    stats/          # History persistence
    theme/          # Dark/light theme hook
  types/            # Shared TypeScript domain types
  utils/            # Metrics calculation, word-state builder, text normalizer
electron/           # Electron main process and preload script
```
