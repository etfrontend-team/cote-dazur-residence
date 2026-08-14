# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install               # install dependencies
npm run build             # Tailwind watch: assets/css/style.css → dist/style.css
npx eslint .              # lint JS + HTML
npx eslint . --fix        # auto-fix lint errors
npx prettier --write .    # format all files
npm run lint:fix          # eslint fix + prettier (both)
```

Open `pages/index.html` directly in browser or via VS Code Live Server. There is no dev server — Tailwind runs in watch mode only.

## Architecture

### Static site

Single HTML page at `pages/index.html`. No framework, no bundler. JS modules load via `<script type="module" src="/assets/js/app.js">` directly from `node_modules/` paths (no build step for JS).

### CSS pipeline

`assets/css/style.css` is the Tailwind entry. Import order:

```
tailwindcss → base.css → component.css → layout.css → utilities.css → custom.css
```

All design tokens (colors, font sizes, breakpoints, spacing, shadows, aspect ratios) live exclusively in the `@theme {}` block in `style.css`. Never define tokens elsewhere.

`fonts.css` exists but is **not imported** — it's a leftover from a prior project. Ignore it. Active `@font-face` rules are in `base.css`.

**Breakpoint naming convention:** `--breakpoint-1199: 1200px` creates a `max-1199:` prefix via Tailwind v4's `max-*` variant, which applies at `max-width: 1199px`. The variable value is always `+1px` of the name — this is intentional.

### JS architecture

`app.js` is the single entry point. All libraries are exposed on `window` for cross-module access:

```js
window.Lenis = Lenis
window.gsap = gsap
window.ScrollTrigger = ScrollTrigger
```

**Init order matters:** `initResidencesSlider()` must run before `initHorizontalScroll()` — the residences slider creates pin-spacer DOM that horizontal scroll's ScrollTrigger depends on for layout calculations.

### Preloader body state machine

The preloader transitions `<body>` through three classes:

| Class | Meaning |
|---|---|
| `is-preloading` | Scroll-driven intro playing; `overflow-y: auto` |
| `is-ready` | Page content visible, intro still running |
| `is-loaded` | Intro complete; `overflow-y: visible`, `.page-wrap` interactive |

`preloader.js` drives this. `is-preloading` is removed and `is-loaded` added on `ScrollTrigger` `onLeave`. `prefers-reduced-motion` skips straight to `is-ready is-loaded`.

### Horizontal scroll pattern

Requires this DOM structure under `.horizontal-section`:

```
.horizontal-section
  .hz-content      ← pinned scroll container (height = travel distance + viewport)
    .hz-frame      ← viewport window
      .hz-film     ← translates horizontally
        .hz-slide  ← individual slides
```

GSAP ScrollTrigger pins `.hz-content` and scrubs `.hz-film` x-translation. Image variants `.image-variant-1/2` get a scale parallax; `.image-variant-3/4` get an x-parallax counter-animation.

### Libraries

- **GSAP + ScrollTrigger** — all scroll-driven animations. Always `gsap.registerPlugin(ScrollTrigger)` per module, not globally.
- **Lenis** — smooth scroll. Initialized first so scroll events are consistent for GSAP.
- **Swiper** — residences slider only (`residencesSlider.js`).

### Pre-commit hooks (Husky)

`lint-staged` runs on every commit:
- `*.{js,jsx,ts,tsx,html}` → `eslint --fix`
- `*.{js,jsx,ts,tsx,html,css}` → `prettier --write`

ESLint enforces custom HTML rules: `<a>` requires `href`, `role="link"`, `aria-label`, `target`; `<button>` requires `type`, `aria-label`; `<img>` requires `width`, `height`, `loading="lazy"`; `<video>` requires `width`, `height`, `playsinline`, `preload`; every page must have `<main>`; no `javascript:` hrefs. These rules are in `eslint.config.mjs` and will block commits if violated.

## Code rules

Detailed HTML/CSS/JS rules are in `.claude/rules/html-css-js-rules.md`. Key constraints most likely to cause mistakes:

- All styling via `@apply` — no raw CSS values except `@font-face` and `clamp()` where unavoidable
- No `[]` arbitrary Tailwind values anywhere
- Section background color and Y-axis padding go directly on `<section>` as utility classes — never in CSS files
- Horizontal padding: reuse `.container-fluid` / `.container-fluid-md` / `.container-fluid-lg` exactly — never invent a per-section padding wrapper
- Icons: `<img>` tags only, never inline SVG (actual icon files in `assets/icons/` are `.svg`, used as `src`)
- `custom.css` is imported last and overrides anything — use sparingly
