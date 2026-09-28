# Opportunity Scoring

Scoring is a prioritization aid, not an automatic decision.

## Components
- Intent: explicitness of the request.
- Urgency: time sensitivity.
- Fit: match with Kaervax capabilities.
- Value: plausible commercial value.
- Accessibility: ability to engage legitimately.
- Evidence: strength and freshness of source evidence.
- Competition: observable crowding.

## Suggested formula
score = 0.25 intent + 0.20 fit + 0.15 urgency + 0.15 value + 0.10 accessibility + 0.10 evidence + 0.05 competition

Normalize every component to 0–100.

## States
NEW → REVIEW → QUALIFIED → ACTION_READY → CONTACTED → CONVERTED / LOST / DISMISSED.

## Rules
- Explicit buyer request beats generic discussion.
- Fresh evidence beats stale evidence.
- Source URL is mandatory for qualified opportunities.
- Low-confidence extraction remains reviewable.
- Score changes are auditable.

The score helps the operator decide what to inspect next; it must not trigger unsolicited mass outreach.
