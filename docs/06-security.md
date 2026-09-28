# Security & Privacy

## Rules
- Never commit API keys, OAuth tokens, cookies or session data.
- Store secrets in deployment secret storage.
- Minimize collection of personal data.
- Preserve source URLs and provenance.
- Respect community privacy/access boundaries.
- Provide deletion/retention controls.
- Log security events without secret values.
- Use least-privilege credentials.
- Separate read and write capabilities.

## Threat model
Credential leakage → secret manager, environment validation, secret scanning.
Unauthorized publishing → capability checks, approval and audit.
Prompt injection → treat community text as untrusted data; it cannot override system instructions or authorize tools.
Duplicate ingestion → source IDs and content hashes.
Spam/abuse → rate limits, action quotas, approval gates and platform-specific checks.

Collect only what is required to identify the conversation, understand demand and execute an approved workflow.
