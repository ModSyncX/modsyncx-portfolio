# Handoff — ModSyncX Portfolio-Website

## Worum es hier geht

Portfolio-/Marketing-Website für **ModSyncX** (FiveM Developer & Discord Bot Developer). Zeigt Skills, ein reales Projekt (Discord Ticket-Bot), erklärt FiveM-Frameworks (ESX/QBCore/Qbox) und hat einen interaktiven Lua-Lernbereich mit Code-Prüfung. Läuft komplett statisch auf GitHub Pages, kein eigener Server.

**Live:** https://modsyncx.github.io/modsyncx-portfolio/
**Repo:** https://github.com/ModSyncX/modsyncx-portfolio (öffentlich, Branch `main`)

Wichtig: Es gibt noch ein **anderes** Repo `ModSyncX/ModSyncX.github.io` mit einer älteren, komplett separaten Webseite (reines HTML/JS). Das ist bewusst unangetastet gelassen worden — **nicht verwechseln oder überschreiben.**

## Tech-Stack

- React 18 + TypeScript + Vite 6
- React Router (`BrowserRouter`, `basename="/modsyncx-portfolio"` — das Projekt läuft unter einem Unterpfad, nicht an der Domain-Wurzel)
- react-i18next für 6 Sprachen: DE, EN, FR, ES, TR, NL (Fallback: EN)
- Kein CSS-Framework — handgeschriebenes CSS mit CSS-Variablen für Dark/Light-Theme
- Deployment: GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages, triggert automatisch bei Push auf `main`

## Design-System

- Fonts: **Fraunces** (Display/Serif, große Headlines), **Work Sans** (Fließtext), **JetBrains Mono** (Labels, Terminal-Elemente, Code)
- Ein Akzentton (Lime/Oliv, `--accent` in `src/index.css`), kein Regenbogen-Gradient, kein Neon/Cyberpunk
- Ästhetik: "Editorial-Terminal" — Terminal-Fenster-Optik (`.terminal`, `.code-window`), nummerierte Sections (`01 /`, `02 /` …), Scroll-Reveal-Animationen (`Reveal.tsx` + `useInView.ts`), Marquee-Ticker
- Dark ist Default-Theme, Umschalter im Header (`ThemeContext.tsx`, persistiert in `localStorage`)

## Seitenstruktur (React Router)

| Route | Datei | Inhalt |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Hero, Skills, Projects (Ticket-Bot), Frameworks-Teaser, Contact (+ Formular) |
| `/lua` | `src/pages/LearnLua.tsx` | Lua-Grundlagen (6 Lektionen) + interaktiver Code-Playground (5 Challenges) |
| `/frameworks` | `src/pages/Frameworks.tsx` | ESX/QBCore/Qbox erklärt + Vergleichstabelle |
| `*` | `src/pages/NotFound.tsx` | Eigene 404-Seite im Site-Design |

`Header`, `TickerStrip` (Marquee) und `Footer` (inkl. Mini-Terminal) sind in `App.tsx` **außerhalb** der `<Routes>` gerendert — sie sind auf jeder Seite sichtbar und bleiben beim Navigieren erhalten.

## Wichtige Dateien

- `src/data/luaLessons.ts` / `src/data/luaChallenges.ts` — Lua-Code-Beispiele und Übungs-Validatoren (Regex-basiert, **kein echter Lua-Interpreter** — reine Muster-Prüfung, siehe Kommentar dazu im Chat-Verlauf)
- `src/components/MiniTerminal.tsx` — Easter-Egg-Terminal im Footer (`help`, `lua`, `frameworks`, `theme`, `lang <code>`, `sudo`, `clear` …)
- `src/components/ContactForm.tsx` — Kontaktformular, sendet an Formspree-Endpoint (`FORMSPREE_ENDPOINT`-Konstante, aktuell **live verknüpft**: `https://formspree.io/f/xqergnpe`)
- `src/i18n/locales/*.json` — alle Texte, strikt parallel strukturiert über alle 6 Sprachen. **Wenn ein Text geändert/ergänzt wird, IMMER in allen 6 Dateien gleichzeitig anpassen**, sonst bricht `returnObjects`-basiertes Rendering (Arrays wie `skills.items`, `lua.sections.items` etc. müssen in allen Sprachen gleich viele Einträge in gleicher Reihenfolge haben)
- `vite.config.ts` — `base: '/modsyncx-portfolio/'` (Projekt-Page, nicht Root-Domain!)
- `public/404.html` + Script in `index.html` — GitHub-Pages-SPA-Redirect-Trick (rafrex/spa-github-pages-Pattern), NICHT die sichtbare 404-Seite (das ist `src/pages/NotFound.tsx`)

## Offene TODOs / bekannte Platzhalter

- `src/components/Contact.tsx`: `DISCORD_URL = '#'` — echter Discord-Link fehlt noch, Paul muss ihn nachtragen
- Keine echten Screenshots vom Ticket-Bot-Projekt (nur Text-Beschreibung in `projects.ticketbot` in den i18n-Dateien)

## Wie man Änderungen live bringt

Paul hat ein Push-Skript im Repo-Root: `push.ps1` / `push.bat` (baut lokal zur Sicherheit, committet, pusht). Einfach nutzen lassen, oder normal mit `git add/commit/push` — jeder Push auf `main` deployed automatisch über GitHub Actions (dauert ca. 30–60s).

**Vor jedem Push:** `npm run build` lokal laufen lassen (TypeScript-Check + Vite-Build), bevor gepusht wird.

## Ideen für den weiteren Ausbau (noch nicht umgesetzt)

- Echte Screenshots vom Ticket-Bot einbauen
- Privacy-freundliche Analytics (Plausible/GoatCounter)
- Weiteres reales Projekt in der Projects-Sektion
- Discord-Link eintragen, sobald vorhanden

## Kontext für den nächsten Agenten

Der Code ist bewusst ohne UI-Framework (kein Tailwind/MUI) und ohne schwere Zusatz-Libraries gehalten — Syntax-Highlighting, Scroll-Reveal, Marquee etc. sind alle selbst geschrieben (siehe `src/utils/highlightLua.ts`, `src/hooks/useInView.ts`). Bitte diesen Stil beibehalten, nicht plötzlich Tailwind oder eine UI-Kit-Library einführen, ohne das mit Paul abzusprechen. Bei neuen Texten/Sections immer an alle 6 Sprachdateien denken — das wird sonst leicht vergessen und fällt erst zur Laufzeit auf (falsche Array-Länge → `undefined`-Zugriff).
