# Data Model

## communities
id, platform, external_id, name, url, description, geography, category, audience, access_type, monitoring_status, activity_score, opportunity_score, created_at, updated_at.

## sources
id, community_id, adapter, external_url, capability_snapshot, last_cursor, last_sync_at, status.

## conversations
id, source_id, external_id, author_external_id, url, text, published_at, language, content_hash, raw_ref, created_at.

## signals
id, conversation_id, signal_type, topic, intent, confidence, evidence, extracted_at.

## demands
id, signal_id, problem, requested_deliverable, buyer_type, urgency, budget_signal, location, qualification_status.

## opportunities
id, demand_id, title, score, fit_score, urgency_score, intent_score, accessibility_score, value_score, competition_score, status, next_action, owner, created_at, updated_at.

## actions
id, opportunity_id, channel, action_type, draft, approval_status, execution_status, executed_at, result.

## audit_events
id, actor, event_type, entity_type, entity_id, metadata, created_at.

## Relationships
Community 1→N Source; Source 1→N Conversation; Conversation 1→N Signal; Signal 1→N Demand; Demand 1→N Opportunity; Opportunity 1→N Action.

Never store access tokens in these tables.
