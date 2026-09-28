# Testing Strategy

## Unit
Normalization, content hashing, deduplication, classification schema validation, score calculation, capability checks and authorization rules.

## Integration
Adapter authentication, pagination/cursors, rate-limit handling, idempotent ingestion, D1 persistence and action approval workflow.

## Security
Secret leakage, prompt injection resistance, unauthorized publish attempts, user boundary checks and malformed external payloads.

## Acceptance scenario
1. Import one public conversation manually.
2. Detect a demand signal.
3. Generate an opportunity with source evidence.
4. Score it.
5. Draft a response.
6. Require approval.
7. Record the action.
8. Verify the outcome.

Every adapter must have mock fixtures so the core pipeline can be tested without live platform access.
