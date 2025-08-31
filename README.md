# Zion Stryker Frontend (PWA-ready)

This PWA-ready React frontend expects the backend API base URL to be provided via `VITE_API_URL` environment variable.

## Run locally
1. npm install
2. npm run dev
3. npm run build

## Notes
- Service worker and manifest are included in `/public`.
- The scanner ON/OFF button sends POST `/api/scanner/toggle` to the backend.
- API base URL: `import.meta.env.VITE_API_URL`
