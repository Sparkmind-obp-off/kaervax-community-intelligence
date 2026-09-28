# Product Specification

## Problem
Relevant business demand is fragmented across communities. Manually checking every Facebook group, Threads feed, Reddit community, X search, Telegram group, Discord server and local business ecosystem is slow and inconsistent.

## Outcome
Create one operating surface for finding communities, understanding them, monitoring meaningful conversations, detecting demand, identifying people/businesses/partners, scoring opportunities and preparing the next action.

## Core objects
Community: monitored or manually registered source.
Conversation: post, thread, comment chain, discussion or imported content.
Signal: normalized observation extracted from a conversation.
Demand: concrete need, problem, request or buying intent.
Opportunity: qualified demand signal that may produce business value.
Action: proposed or executed next step, respecting platform permissions.

## Core loop
Discover → Ingest → Normalize → Classify → Detect demand → Score → Review → Act → Verify → Learn.

## MVP acceptance criteria
- Community can be registered manually.
- Content can be imported through an API adapter and manual fallback.
- Duplicate content is detected.
- Every signal links to its source.
- AI extraction produces structured demand fields.
- Opportunities can be scored and filtered.
- User can approve/reject/dismiss an action.
- Every action has an audit record.
- Secrets never enter source control.
