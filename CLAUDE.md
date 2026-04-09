# Design System

## Progress
- [x] Custom favicon — `app/favicon.ico`
- [x] Fonts configured — `app/layout.tsx`
- [x] Color tokens (dark + light) — `app/style/variables.scss`
- [x] Global base styles — `app/style/global.scss`
- [x] GSAP installed (`gsap` + `@gsap/react`)
- [x] Folder structure — `app/components/sections/`, `app/components/ui/`

## Roadmap
Build order:
- [ ] 1. Loading screen — fake preloader before main content reveals
- [ ] 2. Navbar — `app/components/ui/Navbar.tsx`
- [ ] 3. Home section — `app/components/sections/Home.tsx`, interactive background (mouse pointer follower or moving background)
- [ ] 4. Scroll transition — animation from Home into About section

## GSAP Rules
- All GSAP animations are written manually by the user — do not generate GSAP animation code unless explicitly asked
- Every component using GSAP must have `"use client"` at the top
- Register plugins at the module level: `gsap.registerPlugin(ScrollTrigger)`
- Always use `useGSAP` from `@gsap/react` (not `useEffect`) — handles cleanup automatically
- Always pass `{ scope: containerRef }` to `useGSAP` to scope selectors to the component
- No ScrollSmoother — not available without Club GSAP license

## Sass
Next.js has built-in Sass support. With `sass` installed, `.scss` files are automatically compiled — no config needed. `app/style/global.scss` is imported directly in `app/layout.tsx`, and uses `@use "variables"` to pull in `variables.scss` via Sass module syntax.

## Fonts
Defined in `app/layout.tsx` via `next/font/google`, injected as CSS variables on `<html>`:
- `--font-heading`: JetBrains Mono — h1–h6
- `--font-body`: DM Sans — body, p, nav, UI text
- `--font-subtext`: DM Mono — small, label, time, .subtext, figsubtext

## Color Tokens
All defined in `app/style/variables.scss`. Never hardcode values — always use these variables:

| Token | Purpose |
|---|---|
| `--bg-primary` | Page background |
| `--bg-alt` | Alternate background |
| `--bg-surface` | Card/surface background |
| `--bg-surface-deep` | Deeper surface layer |
| `--color-text-primary` | Main text |
| `--color-text-muted` | Secondary/muted text |
| `--color-text-subtle` | Tertiary/subtle text |
| `--color-border-primary` | Strong borders |
| `--color-border-soft` | Soft/subtle borders |
| `--color-accent-primary` | Accent fill |
| `--color-accent-text` | Text on accent |
| `--color-link-primary` | Link default |
| `--color-link-hover` | Link hover |
| `--font-size-h1/h2/h3` | Heading sizes (clamp-based fluid) |
| `--font-size-xs/sm/base/md/lg/xl` | Body sizes |
| `--font-weight-regular/medium/semibold/bold/extrabold` | Weights |
| `--border-radius-sm/md/lg/pill` | Radius scale |
| `--transition-fast/base/slow` | Transition durations |

## Theming
Dark mode is the default (`:root`). Light mode activates via:
- System preference: `@media (prefers-color-scheme: light)` with `:root:not(.dark)`
- Explicit class: `.light` / `.dark` on `<html>`, toggled via `useTheme` (next-themes)

Dark values: bg `#111009`, text `#F0EDE4`
Light values: bg `#F5F4F0`, text `#0E0D0B`
Warm palette — never pure white or black.
