# Connector & Adapter Strategy

## Capability model
Each adapter declares:
- read_communities
- read_conversations
- search
- read_comments
- publish
- reply
- identity
- rate_limit_info

Capabilities are discovered at runtime/configuration time where possible.

## Priority
1. Threads
2. Reddit
3. X
4. Meta/Facebook permitted surfaces
5. Telegram
6. Discord
7. Manual import

## API strategy
Use official APIs and granted permissions where available. Do not scrape private/restricted content or bypass platform controls.

When an API is unavailable, expensive, restricted or not approved, use:
- public/manual URL capture;
- copy/paste import;
- CSV/JSON import;
- browser-assisted human workflow;
- later connector upgrade.

## Engagement
MVP is human-in-the-loop:
Detect → draft → user reviews → user publishes.

Automatic posting is only added where platform rules and granted permissions support it.
