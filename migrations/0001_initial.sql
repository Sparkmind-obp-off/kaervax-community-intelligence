PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS communities (
  id TEXT PRIMARY KEY, platform TEXT NOT NULL, external_id TEXT, name TEXT NOT NULL,
  url TEXT, category TEXT, geography TEXT, access_type TEXT,
  monitoring_status TEXT DEFAULT 'active', activity_score REAL DEFAULT 0,
  opportunity_score REAL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY, community_id TEXT NOT NULL REFERENCES communities(id),
  adapter TEXT NOT NULL, external_url TEXT, capability_snapshot TEXT,
  last_cursor TEXT, last_sync_at TEXT, status TEXT DEFAULT 'active'
);
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id),
  external_id TEXT, author_external_id TEXT, url TEXT, text TEXT NOT NULL,
  published_at TEXT, language TEXT, content_hash TEXT NOT NULL, raw_ref TEXT,
  created_at TEXT NOT NULL, UNIQUE(source_id, external_id), UNIQUE(content_hash)
);
CREATE TABLE IF NOT EXISTS signals (
  id TEXT PRIMARY KEY, conversation_id TEXT NOT NULL REFERENCES conversations(id),
  signal_type TEXT NOT NULL, topic TEXT, intent REAL, confidence REAL,
  evidence TEXT, extracted_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS demands (
  id TEXT PRIMARY KEY, signal_id TEXT NOT NULL REFERENCES signals(id),
  problem TEXT NOT NULL, requested_deliverable TEXT, buyer_type TEXT,
  urgency REAL, budget_signal TEXT, location TEXT, qualification_status TEXT DEFAULT 'new'
);
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY, demand_id TEXT NOT NULL REFERENCES demands(id),
  title TEXT NOT NULL, score REAL DEFAULT 0, fit_score REAL DEFAULT 0,
  urgency_score REAL DEFAULT 0, intent_score REAL DEFAULT 0,
  accessibility_score REAL DEFAULT 0, value_score REAL DEFAULT 0,
  competition_score REAL DEFAULT 0, status TEXT DEFAULT 'new',
  next_action TEXT, owner TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS actions (
  id TEXT PRIMARY KEY, opportunity_id TEXT NOT NULL REFERENCES opportunities(id),
  channel TEXT, action_type TEXT NOT NULL, draft TEXT,
  approval_status TEXT DEFAULT 'pending', execution_status TEXT DEFAULT 'not_executed',
  executed_at TEXT, result TEXT
);
CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY, actor TEXT, event_type TEXT NOT NULL,
  entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, metadata TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sources_community ON sources(community_id);
CREATE INDEX IF NOT EXISTS idx_conversations_source ON conversations(source_id);
CREATE INDEX IF NOT EXISTS idx_signals_conversation ON signals(conversation_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_status_score ON opportunities(status, score DESC);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_events(entity_type, entity_id);
