# 🌍 World Clock

A live world clock dashboard showing local time for **Mumbai, Chicago, Edinburgh, Lisbon, Manila, and Boston** — built with React + Vite + [react-simple-maps](https://www.react-simple-maps.io/).

## Features

- Interactive Natural Earth projection map (scroll to zoom, drag to pan)
- Hover city pins to see live local time tooltips
- Analog + digital clocks updating every second
- UTC reference bar

## Local Development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to your repo → **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` will build and publish automatically ✅

Your site will be live at:
```
https://<your-username>.github.io/<your-repo-name>/
```

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [react-simple-maps](https://www.react-simple-maps.io/)
- [world-atlas](https://github.com/topojson/world-atlas) — TopoJSON country data (via CDN)
