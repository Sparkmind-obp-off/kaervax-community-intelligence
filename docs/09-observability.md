# Observability

## Metrics
Communities monitored, active sources, ingestion runs, conversations ingested, duplicate rate, extraction success, demand signals, opportunities created, qualification rate, approval rate, action success, connector errors, API calls, rate-limit events, AI/token cost estimates and time from signal to review.

## Logs
Use structured JSON logs with timestamp, request_id, adapter, operation, entity_id, status, duration_ms and error_code.

Never log secrets, access tokens or full sensitive payloads.

## Alerts
Repeated adapter failures, authentication expiry, volume spikes, unauthorized action attempts, queue backlog, extraction failures and D1/R2 errors.

Business actions and permission-sensitive events must be retained separately from debug logs.
