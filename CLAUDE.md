# CLAUDE.md — World Clock (mutli-tz)

Instructions for Claude Code working in this repository.

> **Read [`AGENTS.md`](AGENTS.md) first.** It is the authoritative, tool-agnostic
> project brief. This file adds the Claude-specific bits and repeats only the
> rules that are easy to get wrong.

---

## Project overview

A shared world clock dashboard for a small distributed team — live local times for
Mumbai, Chicago, Edinburgh, Lisbon, Manila, and Boston, shown as an interactive
Natural Earth map with analog and digital clocks and a UTC reference bar.

- **Audience:** a handful of recurring users on GitHub Pages. It is a dashboard,
  not a platform.
- **Stack:** React 18 + Vite 5 (`@vitejs/plugin-react`), ESM, `react-simple-maps`
  + `d3-geo`, Natural Earth TopoJSON from the `world-atlas` CDN.
- **Entry points:** `src/main.jsx` boots, `src/App.jsx` holds the logic,
  `src/index.css` holds global styles.
- **Deploy:** GitHub Pages via `.github/workflows/deploy.yml` (Node 20, `npm ci`,
  output `dist/`). `vite.config.js` sets `base: './'` — keep relative asset paths.

```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build — run this before calling a code change done
npm run preview   # serve the built app
```

### Non-negotiables

- Use canonical IANA timezone names (`America/Chicago`, `Asia/Kolkata`) as the
  source of truth, and prefer `Intl.DateTimeFormat` / `Date` over manual offset
  math. Be explicit about DST assumptions.
- Keep each city's name, country, coordinates, and timezone together in one place.
- Preserve the static GitHub Pages deployment model — no backend, no auth, no
  routing, no state-management library.
- Don't add dependencies unless they meaningfully simplify the code.
- Hover-only behaviour is incomplete without a touch fallback; check phone and
  laptop widths.
- **Never hand-edit `CHANGELOG.md`** — it is CI-managed by `deploy.yml`.

---

## Commit conventions

**Every commit must follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).**

```
<type>(<optional scope>): <imperative description>

<optional body explaining why>

<optional footers — Refs: #12, BREAKING CHANGE: ...>
```

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
  `ci`, `chore`, `revert`.
- Scopes used here: `timezone`, `cities`, `map`, `clock`, `ui`, `layout`, `build`,
  `pages`, `deps`, `changelog`.
- Imperative mood, no trailing period, subject ≤ 72 chars.
- Breaking = a removed city, a changed deployment path, or a changed published
  URL. Use `type(scope)!:` and/or a `BREAKING CHANGE:` footer.
- One logical change per commit; PR titles use the same format so squash merges
  stay valid.
- CI writes `docs(changelog): ...` commits — leave those and Dependabot's
  generated titles alone.

```
feat(cities): add Sydney to the dashboard
fix(timezone): correct Chicago DST display
build(deps): bump vite to 5.4.11
```

Full type table and more examples: [`AGENTS.md`](AGENTS.md#commit-conventions).

---

## Skills to use

| Skill pack | Install (Claude Code) | Use it for |
|---|---|---|
| [ponytail](https://github.com/DietrichGebert/ponytail) | `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail` (two separate prompts) | Default posture for all code work — it mirrors this repo's "smallest change, no new deps" rule. `/ponytail-review` the diff before every PR. |
| [marketing skills](https://github.com/coreyhaines31/marketingskills) | `/plugin marketplace add coreyhaines31/marketingskills` then `/plugin install marketing-skills` — or `npx skills add coreyhaines31/marketingskills` | Labels, tooltips, empty states, README wording. Use `copywriting` / `copy-editing`; the SEO, ads, and funnel skills don't apply to a private dashboard. |
| [business analysis skills](https://github.com/45ck/business-analysis-skills) | `git clone https://github.com/45ck/business-analysis-skills.git && cd business-analysis-skills && bash install.sh` | Framing vague requests ("the times are confusing"), deciding whether a city belongs, and logging timezone/DST assumptions. Keep it proportional to a six-city dashboard. |

Order of operations: **frame** (business analysis) → **draft wording** (marketing)
→ **build** (ponytail) → **`npm run build`** → **commit** (Conventional Commits).

Handy commands: `/ponytail-review`, `/ponytail-audit`, `/business-problem-framing`,
`/acceptance-criteria-writer`, `/assumptions-constraints-log`.

Details, non-Claude install paths, and per-skill guidance: [`AGENTS.md`](AGENTS.md#skills-to-use).
