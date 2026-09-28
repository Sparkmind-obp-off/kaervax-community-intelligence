# Architecture

## Principles
1. Cloudflare-first.
2. Adapter isolation.
3. API optionality.
4. Human approval for external actions.
5. Source traceability.
6. Idempotent ingestion.
7. Cost-aware execution.
8. Fail closed when permissions are unclear.

## Layers
Source → Adapter → Intelligence → Persistence → Application.

### Source
Threads, Meta/Facebook permitted surfaces, Reddit, X, Telegram, Discord and manual imports.

### Adapter
Each adapter implements discovery, fetch/import, normalization, cursor/rate-limit handling, source URL preservation and capability declaration.

### Intelligence
Language detection, topic classification, intent classification, demand extraction, buyer/persona classification, urgency/budget signals, opportunity scoring and clustering.

### Persistence
Cloudflare D1 for relational records. R2 may hold larger raw/import artifacts. Secrets belong in Cloudflare secret storage.

### Application
Dashboard for Community Radar, Demand Inbox, Opportunity Queue, Community Profiles, Actions and Audit.

## Deployment
Cloudflare Pages for UI + Workers for API/jobs + D1 for structured data + R2 for raw artifacts where required.

No connector may bypass authorization checks.
