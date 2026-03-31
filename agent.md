# Project Agent Guide

This file is a tool-agnostic project brief for coding agents and assistants working in this repository.

It is not tied to one vendor-specific format. Some tools may not automatically load it, but it is written to be readable and useful for Claude, Codex-style tools, VS Code agents, and humans.

## Project Summary

This is a small shared world clock app for a distributed team.

- Goal: show the current local times for the time zones where teammates work.
- Users: a small internal audience, currently about 2-3 recurring GitHub Pages users.
- Product shape: a simple static dashboard, not a platform.
- Stack: Vite 5 + React 18.
- Deployment: GitHub Pages.

## Framework And Build Details

- Runtime UI stack: React 18 with `react-dom`.
- Build tool: Vite 5.
- React integration: `@vitejs/plugin-react`.
- Module format: ESM via `"type": "module"` in `package.json`.
- Mapping library: `react-simple-maps`.
- Geo projection support: `d3-geo`.
- Geography dataset: Natural Earth TopoJSON loaded from the `world-atlas` CDN.
- App entry point: `src/main.jsx`.
- Main app logic: `src/App.jsx`.
- Global styles: `src/index.css`.
- Vite config sets `base: './'`, which is important for GitHub Pages static hosting.
- Package scripts:
	- `npm run dev` starts Vite dev server.
	- `npm run build` creates the production build.
	- `npm run preview` serves the built app locally.

## Deployment Details

- Deployment target: GitHub Pages.
- CI workflow: `.github/workflows/deploy.yml`.
- GitHub Actions runtime: Node 20.
- CI install command: `npm ci`.
- Build output directory: `dist/`.
- Keep relative asset paths and static hosting compatibility intact unless deployment work is explicitly requested.

## What Matters Most

Prioritize work in this order:

1. Correct timezone behavior.
2. Reliability for existing users.
3. Readability and glanceable UX.
4. Mobile-friendly layout.
5. Minimal maintenance burden.

## Operating Principles

- Keep changes small and direct.
- Prefer simple code over clever abstractions.
- Preserve the static-site deployment model.
- Avoid introducing infrastructure, services, or auth.
- Do not add dependencies unless they meaningfully simplify the code.
- Preserve GitHub Pages compatibility.

## Timezone Rules

- Use canonical IANA timezone names such as `America/New_York` and `Asia/Kolkata`.
- Treat timezone identifiers as the source of truth.
- Prefer browser-native APIs like `Intl.DateTimeFormat` and `Date`.
- Avoid manual timezone offset math when runtime formatting can derive the result.
- Be careful around daylight saving time transitions.
- Keep each city's name, country, coordinates, and timezone together in one source of truth.
- The current app updates displayed times every second in React state; keep timer logic simple and lightweight.

## UI Rules

- The interface should be readable at a glance.
- Visual polish is welcome only if it does not hurt legibility.
- Keep desktop and mobile layouts usable.
- Treat hover-only behavior as incomplete unless there is a touch-friendly fallback.
- Preserve the current visual language unless the task is explicitly a redesign.

## Change Guidelines

- Favor edits in place over broad rewrites.
- Fix the root cause when practical.
- Do not refactor unrelated parts of the app.
- Update documentation only when behavior, setup, or deployment changes.
- After code changes, run a production build before considering the task complete.
- Preserve the current Vite and GitHub Pages deployment assumptions unless the task explicitly requires changing them.

## PR Standards

- Keep PRs small and single-purpose.
- Use a clear title in this style: `scope: short outcome` (example: `timezone: fix Chicago DST display`).
- Include a short summary with:
	- what changed
	- why it changed
	- user-visible impact
- Add a testing section with exact commands run (at minimum `npm run build` when code changes).
- If timezone logic changed, list affected cities and explicitly call out DST assumptions.
- Include before/after screenshots for UI changes.
- Do not mix unrelated refactors with feature or bug-fix work.
- Flag dependency changes and explain why they are needed.
- Keep commits and diffs reviewable; avoid broad file churn.
- Ensure PR descriptions are understandable by teammates who did not author the change.

### PR Checklist

- [ ] Scope is focused and relevant to the timezone dashboard.
- [ ] Build passes locally (`npm run build`) when code changed.
- [ ] Time displays were manually checked for affected cities.
- [ ] Mobile and desktop readability were verified for UI changes.
- [ ] Screenshots attached for visual changes.
- [ ] README/docs updated if behavior, setup, or deployment changed.
- [ ] No unnecessary dependencies or unrelated rewrites introduced.

## Good Changes

- Add or remove teammate cities.
- Fix incorrect timezone displays.
- Improve readability of cards, labels, or clocks.
- Improve responsive layout behavior.
- Simplify code or remove unnecessary dependencies.

## Avoid By Default

- New frameworks or routing.
- State-management libraries.
- Features unrelated to the timezone dashboard.
- Heavy redesigns without a clear request.
- Changes that make the app harder to maintain.

## Working Agreement For Agents

When handling a task in this repo:

1. Inspect existing code before changing it.
2. Make the smallest change that solves the request.
3. Keep behavior stable for current users.
4. Validate with a build when code changed.
5. Call out any timezone or DST assumptions explicitly.

## Definition Of Done

A task is complete when:

- The app still builds successfully.
- Time output is correct for affected cities.
- The UI remains readable on common laptop and phone widths.
- The change keeps the project easy to understand and maintain.