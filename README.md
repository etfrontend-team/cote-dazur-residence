# html-setup

Static HTML/CSS/JS boilerplate. Tailwind CSS v4. Deploys to Netlify.

> **Note:** `.claude/`, `CLAUDE.md`, and `.vscode/` are local reference files only. Do **not** push them to the repository.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [New Project Setup](#new-project-setup)
- [Commands](#commands)
- [Local Reference Files](#local-reference-files-do-not-push)

---

## Project Structure

```
html-setup/
├── assets/
│   ├── css/
│   │   ├── style.css        # Entry — imports all layers + @theme config
│   │   ├── base.css         # Headings, paragraphs, containers, general-padding
│   │   ├── component.css    # Buttons, inputs, selects, reusable components
│   │   ├── layout.css       # Header and footer styles only
│   │   └── utilities.css    # Section-specific and helper classes
│   ├── images/              # Image assets (WebP, AVIF)
│   ├── videos/              # Video assets
│   └── js/
│       └── app.js           # JS entry point — imports only, DOMContentLoaded here
├── dist/
│   └── style.css            # Tailwind build output (gitignored)
├── pages/
│   └── index.html           # Main HTML page
├── .husky/
│   ├── pre-commit           # Heading check → asset size check → lint-staged
│   ├── pre-push             # Asset size check on all tracked files
│   └── scripts/
│       ├── check-headings.mjs   # Validates heading hierarchy in staged HTML
│       └── check-assets.sh      # Validates image/video file sizes
├── eslint.config.mjs
├── .prettierrc
└── package.json
```

---

## Getting Started

```bash
npm install
npm run build
```

Open `pages/index.html` in browser or use a local server (e.g. Live Server in VS Code).

---

## New Project Setup

Steps to configure this boilerplate for a new project.

### 1. `package.json`

| Field | Update to |
| --- | --- |
| `"name"` | project slug e.g. `"client-name-web"` |



## Commands

| Command                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `npm run build`          | Tailwind watch: `assets/css/style.css` → `dist/style.css` |
| `npx eslint .`           | Run ESLint across all JS and HTML files                   |
| `npx prettier --write .` | Format all files with Prettier                            |
| `npm run lint:fix`       | Auto-fix ESLint errors + format with Prettier             |

---

## Local Reference Files (Do Not Push)

| Path        | Purpose                                                              |
| ----------- | -------------------------------------------------------------------- |
| `.claude/`  | Claude Code agents, skills, and commands for AI-assisted development |
| `CLAUDE.md` | Claude Code project instructions and architecture reference          |
| `.vscode/`  | Editor settings for VS Code                                          |

These files are local tooling aids. They must not be committed or pushed to the repository.
