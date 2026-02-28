# mutli-tz

A React + Vite application deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

The deployment workflow:
1. Builds the Vite app
2. Uploads the build artifacts
3. Deploys to GitHub Pages

To enable GitHub Pages for this repository:
1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on push to main