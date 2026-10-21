# remixer-web

A React and Vite starter with file-based routing, lazy loading, a head component and a set of build optimizations.

**Status:** Starter. Its own README describes it as a starter, and the committed code is a Vite configuration plus reusable route and layout components. It has no application-specific features.

## The problem

Setting up a React app with routing, lazy loading and production build tooling takes time. This starter provides that setup, with a Next.js-like routing style, so a new project starts with the pieces already in place.

## What it does

- File-based routing, with nested and lazy-loaded routes, as the README describes.
- Exports reusable helper components from `remixed/`: `Head`, `Link`, `NavLink`, `Loop`, `Condition` and `SuspenseAfterInitialRender`.
- Builds with Vite, with plugins for chunk splitting, gzip and brotli compression, image optimization, a PWA manifest, and downloading web fonts.
- Supports SCSS imports for styles.

## How it's built

- React 18 with React Router 6 and `react-helmet` for the document head.
- Vite 5 configured in `vite.config.ts`, with a separate `remix.config.js` and `export.config.ts` for the helper exports.
- The `remixer` CLI clones this repository as its starter template, so the template is the source for new projects.

## Running it locally

```bash
pnpm install
pnpm dev
```

The package.json scripts are `dev`, `build` and `preview`. The README uses `yarn` commands, but the repo ships a `pnpm-lock.yaml`.

## What's left

- The README's only open contribution item is documentation.
- There are no tests.
- The README's routing and lazy-loading claims are not described with examples.
