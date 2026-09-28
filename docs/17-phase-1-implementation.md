# Phase 1 — Community Radar Implementation

## Goal
Turn the product foundation into a deployable first operating surface.

## Delivered
- Cloudflare Worker application.
- D1-backed community registry.
- Community creation with automatic manual source registration.
- Search and platform filtering.
- Radar metrics.
- Health endpoint.
- Responsive operator UI.
- Audit event on community creation.
- Manual-first connector path; no external platform permission is required.

## Phase 1 API
- GET /api/communities
- POST /api/communities
- GET /health
- GET /

## Acceptance
1. Operator can open the dashboard.
2. Operator can add a community.
3. Community receives a manual source automatically.
4. Dashboard can filter by platform and search.
5. Radar counts are visible.
6. Creation is audited.
7. No API tokens are required.
8. No external posting is performed.

## Boundary
Phase 1 does not claim automatic access to Facebook/Threads/Reddit/X content. Connector implementation starts after the registry and ingestion surface are stable.
