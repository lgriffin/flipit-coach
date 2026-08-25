# FlipIT Coach

A coaching facilitation webapp built on the [ICA FlipIT framework](https://icacoach.com/flipit/) — a 4-step process for shifting perspectives using the 8 Coaching Power Tools.

## What it does

**Card Explorer** — Browse all 8 Power Tool pairs with 3D flip animations. Each card shows a disempowering perspective on one side and its empowering counterpart on the other.

**Guided Coaching Session** — Walk through the full FlipIT process with a client:

1. **Find It** — 30 photo cards are laid out, half face-up and half face-down. The client picks one of each, then both are revealed. The images surface the challenge or issue to explore.
2. **Feel It** — Based on the photos, identify which of the 8 stuck perspectives resonates. Coaching prompts guide the conversation.
3. **Frame It** — Present the duality (e.g. Blame → Responsibility) and help the client see the shift available to them.
4. **Flip It** — Action-oriented prompts lead to a concrete commitment. A full session summary captures notes from every stage.

## The 8 Power Tools

| Stuck | Empowered |
|-------|-----------|
| Blame | Responsibility |
| Delay | Action |
| Doubt | Trust |
| Fraud | Truth |
| Invalidation | Respect |
| Reacting | Responding |
| Significance | Lightness |
| Trying | Commitment |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (includes `npm`)

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

This starts the Vite dev server with hot module reloading. Open the printed URL (defaults to http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Type-checks the project and outputs an optimized bundle to `dist/`.

### Preview the production build

```bash
npm run preview
```

Serves the contents of `dist/` locally so you can verify the production build.

### Lint

```bash
npm run lint
```

Runs [oxlint](https://oxc.rs/docs/guide/usage/linter) over the source.

## Tech stack

- React + TypeScript
- Vite
- CSS (no UI library)
