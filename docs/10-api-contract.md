# API Contract

## Communities
GET /api/communities
POST /api/communities
GET /api/communities/:id
PATCH /api/communities/:id

## Ingestion
POST /api/sources/:id/sync
POST /api/import
GET /api/sources/:id/status

## Intelligence
GET /api/signals
GET /api/demands
POST /api/demands/:id/qualify

## Opportunities
GET /api/opportunities
GET /api/opportunities/:id
PATCH /api/opportunities/:id

## Actions
POST /api/opportunities/:id/actions
POST /api/actions/:id/approve
POST /api/actions/:id/reject
GET /api/actions

All write endpoints require authorization and produce an audit event.

## Error codes
UNAUTHORIZED, FORBIDDEN, NOT_FOUND, VALIDATION_ERROR, CONNECTOR_ERROR, RATE_LIMITED, CAPABILITY_UNAVAILABLE, DUPLICATE, INTERNAL_ERROR.
