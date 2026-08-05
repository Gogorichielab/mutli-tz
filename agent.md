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
- Never manually modify `CHANGELOG.md`; it is CI-managed by `.github/workflows/deploy.yml`.
- After code changes, run a production build before considering the task complete.
- Preserve the current Vite and GitHub Pages deployment assumptions unless the task explicitly requires changing them.

## Commit Conventions

Every commit in this repository must follow the
[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
specification. This applies to agents and humans alike, and to every branch.

### Format

```
<type>(<optional scope>): <description>

<optional body>

<optional footer(s)>
```

- Type is required and lowercase.
- Scope is optional, lowercase, and names the area touched.
- Description is a short imperative summary — "add", not "added"/"adds" — with no
	trailing period and a subject line of about 72 characters or fewer.
- Body explains why, separated by a blank line, wrapped at about 72 columns.
- Footers carry metadata: `Refs: #12`, `Closes: #12`, `BREAKING CHANGE: ...`.

### Allowed Types

| Type | Use for |
|---|---|
| `feat` | New user-facing capability, including adding a city |
| `fix` | Bug fix, including wrong times and DST errors |
| `docs` | README, this file, or other documentation |
| `style` | Formatting or visual polish with no behaviour change |
| `refactor` | Restructuring with no behaviour change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Vite config, build output, or dependency changes |
| `ci` | `.github/workflows/**` changes |
| `chore` | Housekeeping that doesn't fit above |
| `revert` | Reverting a previous commit |

### Suggested Scopes

`timezone`, `cities`, `map`, `clock`, `ui`, `layout`, `build`, `pages`, `deps`,
`changelog`

### Breaking Changes

Mark with a `!` after the type/scope, a `BREAKING CHANGE:` footer, or both. Here
"breaking" means a removed city, a changed deployment path, or anything that
changes the published URL.

```
feat(pages)!: serve the dashboard from a subpath

BREAKING CHANGE: `base` is no longer './'; existing bookmarks to the site root
will 404 until Pages settings are updated.
```

### Examples

```
feat(cities): add Sydney to the dashboard
fix(timezone): correct Chicago DST display
style(clock): increase digital clock contrast on mobile
refactor(map): extract pin rendering from App
build(deps): bump vite to 5.4.11
ci(pages): pin actions/deploy-pages to v5
docs(agent): document conventional commit requirements
```

### Rules Of Thumb

- One logical change per commit; do not mix a dependency bump with a fix.
- If a commit description needs "and", it should probably be two commits.
- PR titles use the same format, so a squash merge produces a valid conventional
	commit.
- `CHANGELOG.md` commits are written by CI (`docs(changelog): ...`) — never hand-edit
	that file or its commits.
- Leave Dependabot's generated commit and PR titles alone.

## PR Standards

- Keep PRs small and single-purpose.
- Title the PR as a Conventional Commit subject, for example
	`fix(timezone): correct Chicago DST display`.
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

- [ ] Commit subjects and PR title follow Conventional Commits.
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

## Skills To Use

This project expects agents to work with the following skill packs. Install them
once, then invoke them by name or slash command as the task warrants.

### 1. ponytail — Write The Least Code That Works

<https://github.com/DietrichGebert/ponytail>

Claude Code (send as two separate prompts):

```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

Other agents: copy the matching rules file from that repo — `.cursor/rules/`,
`.windsurf/rules/`, `.clinerules/`, `.github/copilot-instructions.md`,
`.kiro/steering/ponytail.md`, or its `AGENTS.md` for everything else.

Commands: `/ponytail [lite|full|ultra|off]`, `/ponytail-review`,
`/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`.

Use it here: ponytail's decision ladder matches this repo's operating principles
almost exactly — prefer `Intl.DateTimeFormat` and other native APIs over new
dependencies, and prefer editing `App.jsx` over introducing structure. Run
`/ponytail-review` on the diff before opening a PR; treat a suggested state
library, router, or abstraction layer as a signal to stop.

### 2. marketing skills — Copy And Presentation

<https://github.com/coreyhaines31/marketingskills>

```bash
npx skills add coreyhaines31/marketingskills
# or a subset:
npx skills add coreyhaines31/marketingskills --skill copywriting copy-editing
```

Claude Code plugin:

```
/plugin marketplace add coreyhaines31/marketingskills
/plugin install marketing-skills
```

Use it here: this is an internal tool, so the marketing surface is small — labels,
tooltips, empty states, the README, and any screenshot or announcement when the
dashboard changes. Use `copywriting` and `copy-editing` for wording; skip the
paid, SEO, and funnel skills, which do not apply to a private dashboard.

### 3. business analysis skills — Framing Before Building

<https://github.com/45ck/business-analysis-skills>

```bash
git clone https://github.com/45ck/business-analysis-skills.git
cd business-analysis-skills
bash install.sh          # installs to ~/.claude/skills/ and ~/.agents/skills/
```

Project-level instead: `cp -R .claude .agents /path/to/this-repo/`.

Useful entry points: `/business-problem-framing`, `/stakeholder-analysis`,
`/acceptance-criteria-writer`, `/moscow-prioritisation`,
`/assumptions-constraints-log`, `/requirements-quality-check`.

Use it here: keep it proportional — this is a dashboard for a handful of people,
not a programme of work. Reach for these skills when a request is vague ("the
times are confusing"), when deciding whether a city belongs on the map, or to
log timezone and DST assumptions explicitly, which this repo already requires.

### How They Fit Together

1. Frame with business-analysis skills — what problem, whose, done when?
2. Draft any user-visible wording with the marketing skills.
3. Build under ponytail — the smallest change that ships it.
4. Validate with `npm run build`.
5. Commit using Conventional Commits, one logical change at a time.

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
