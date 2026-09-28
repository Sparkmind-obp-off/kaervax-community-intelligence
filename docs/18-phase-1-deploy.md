# Phase 1 — Deployment

## Prerequisites
- Cloudflare account.
- Wrangler authenticated locally or through CI.
- Cloudflare D1 database.

## Setup
1. Create a D1 database named `kaervax-community-intelligence`.
2. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.toml`.
3. Apply the D1 migration.
4. Deploy the Worker.
5. Verify `/health`.

## Local
```bash
npm install
npx wrangler login
npx wrangler d1 migrations apply kaervax-community-intelligence --local
npm run dev
```

## Remote
```bash
npx wrangler d1 migrations apply kaervax-community-intelligence --remote
npm run deploy
```

## Production rule
Never put API tokens in source, wrangler.toml, D1, or client JavaScript. Use Cloudflare secrets when connectors are introduced.
