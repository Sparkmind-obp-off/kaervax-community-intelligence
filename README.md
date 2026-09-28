# Kaervax Community Intelligence

Community Intelligence & Opportunity Engine for Kaervax.

## Purpose
Turn community conversations into structured intelligence and actionable business opportunities:

Community → Conversation → Signal → Demand → Opportunity → Qualification → Action → Outcome.

## Product principle
Monitor first. Understand second. Decide third. Act with approval.

The system is adapter-based and must not depend on one platform or one paid API. Every connector has an API path where legitimately available and a manual/import fallback.

## Initial platforms
- Threads
- Facebook / Meta surfaces where permitted
- Reddit
- X
- Telegram
- Discord
- Manual URL / CSV / JSON / pasted-content import

## MVP
1. Community registry
2. Source/adapter registry
3. Ingestion and normalization
4. Community profiles
5. Conversation and demand-signal extraction
6. Opportunity scoring
7. Opportunity database
8. Human approval/action queue
9. Audit trail
10. Cost/rate-limit visibility

## Non-goals
- Uncontrolled mass posting
- Spam or automated outreach
- Circumventing platform restrictions
- Dependence on expensive/approval-heavy APIs
- Generic social-media scheduling

## Architecture
Cloudflare-first, adapter-based, API-optional:
UI → API/Workers → ingestion adapters → normalized events → intelligence pipeline → D1 opportunity store → action queue.

See docs/ for the product, architecture, data model, security, roadmap, testing, observability and API strategy.

## Phase 1 — Community Radar

The repository now contains an executable Cloudflare Worker + D1 implementation of the first operating surface.

- `GET /` — operator radar UI
- `GET /health` — health check
- `GET /api/communities` — registry/search/filter
- `POST /api/communities` — create a community and manual source
- D1 migration under `migrations/`
- Phase 1 deployment/UI/definition-of-done docs under `docs/17-20`

Phase 1 is intentionally manual-first. Platform connectors and live conversation ingestion are Phase 2 and must use only authorized platform capabilities.
