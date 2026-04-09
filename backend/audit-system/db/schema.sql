-- Platform Audit and Cleanup Database Schema
-- SQLite database for tracking issues, remediations, and metrics

-- ============================================================================
-- Issues Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS issues (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN (
    'duplicate_service',
    'incomplete_implementation',
    'unused_code',
    'configuration_issue',
    'security_issue',
    'documentation_gap',
    'test_coverage_gap',
    'complexity_issue',
    'dependency_cycle'
  )),
  severity TEXT NOT NULL CHECK(severity IN ('critical', 'high', 'medium', 'low')),
  status TEXT NOT NULL CHECK(status IN ('open', 'in_progress', 'resolved', 'wont_fix')) DEFAULT 'open',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_path TEXT NOT NULL,
  line_number INTEGER,
  detected_at TEXT NOT NULL, -- ISO 8601 datetime
  resolved_at TEXT,
  assigned_to TEXT,
  estimated_effort REAL NOT NULL DEFAULT 0, -- hours
  actual_effort REAL,
  auto_fixable INTEGER NOT NULL DEFAULT 0 CHECK(auto_fixable IN (0, 1)), -- boolean
  metadata TEXT NOT NULL DEFAULT '{}', -- JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_issues_type ON issues(type);
CREATE INDEX IF NOT EXISTS idx_issues_severity ON issues(severity);
CREATE INDEX IF NOT EXISTS idx_issues_status ON issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_file_path ON issues(file_path);
CREATE INDEX IF NOT EXISTS idx_issues_detected_at ON issues(detected_at);
CREATE INDEX IF NOT EXISTS idx_issues_auto_fixable ON issues(auto_fixable);

-- ============================================================================
-- Remediations Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS remediations (
  id TEXT PRIMARY KEY,
  issue_id TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK(action_type IN (
    'consolidate_services',
    'complete_implementation',
    'remove_unused_code',
    'consolidate_config',
    'fix_security_issue',
    'add_tests',
    'add_documentation',
    'refactor_complexity'
  )),
  status TEXT NOT NULL CHECK(status IN ('pending', 'executing', 'completed', 'failed', 'rolled_back')) DEFAULT 'pending',
  started_at TEXT,
  completed_at TEXT,
  backup_id TEXT,
  tests_passed INTEGER CHECK(tests_passed IN (0, 1)), -- boolean
  files_modified TEXT NOT NULL DEFAULT '[]', -- JSON array
  files_deleted TEXT NOT NULL DEFAULT '[]', -- JSON array
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_remediations_issue_id ON remediations(issue_id);
CREATE INDEX IF NOT EXISTS idx_remediations_status ON remediations(status);
CREATE INDEX IF NOT EXISTS idx_remediations_action_type ON remediations(action_type);
CREATE INDEX IF NOT EXISTS idx_remediations_backup_id ON remediations(backup_id);

-- ============================================================================
-- Metrics Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS metrics (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL, -- ISO 8601 datetime
  metric_type TEXT NOT NULL,
  value REAL NOT NULL,
  metadata TEXT NOT NULL DEFAULT '{}', -- JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_metrics_type ON metrics(metric_type);

-- ============================================================================
-- Backups Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS backups (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  action_id TEXT,
  reason TEXT NOT NULL,
  created_by TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array
  file_count INTEGER NOT NULL DEFAULT 0,
  total_size INTEGER NOT NULL DEFAULT 0, -- bytes
  backup_path TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_backups_timestamp ON backups(timestamp);
CREATE INDEX IF NOT EXISTS idx_backups_action_id ON backups(action_id);

-- ============================================================================
-- Backup Files Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS backup_files (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  original_path TEXT NOT NULL,
  backup_path TEXT NOT NULL,
  hash TEXT NOT NULL,
  size INTEGER NOT NULL, -- bytes
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (backup_id) REFERENCES backups(id) ON DELETE CASCADE
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_backup_files_backup_id ON backup_files(backup_id);
CREATE INDEX IF NOT EXISTS idx_backup_files_original_path ON backup_files(original_path);
CREATE INDEX IF NOT EXISTS idx_backup_files_hash ON backup_files(hash);

-- ============================================================================
-- Scan History Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS scan_history (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  total_files INTEGER NOT NULL,
  total_lines INTEGER NOT NULL,
  scan_duration REAL NOT NULL, -- seconds
  issues_found INTEGER NOT NULL,
  config TEXT NOT NULL, -- JSON
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_scan_history_timestamp ON scan_history(timestamp);

-- ============================================================================
-- Triggers for automatic timestamp updates
-- ============================================================================

CREATE TRIGGER IF NOT EXISTS update_issues_timestamp
AFTER UPDATE ON issues
FOR EACH ROW
BEGIN
  UPDATE issues SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_remediations_timestamp
AFTER UPDATE ON remediations
FOR EACH ROW
BEGIN
  UPDATE remediations SET updated_at = datetime('now') WHERE id = NEW.id;
END;

-- ============================================================================
-- Views for common queries
-- ============================================================================

-- Open issues by severity
CREATE VIEW IF NOT EXISTS v_open_issues_by_severity AS
SELECT 
  severity,
  COUNT(*) as count,
  SUM(estimated_effort) as total_effort
FROM issues
WHERE status = 'open'
GROUP BY severity
ORDER BY 
  CASE severity
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END;

-- Issues by type
CREATE VIEW IF NOT EXISTS v_issues_by_type AS
SELECT 
  type,
  COUNT(*) as count,
  SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) as open_count,
  SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved_count,
  SUM(estimated_effort) as total_effort
FROM issues
GROUP BY type;

-- Recent scan metrics
CREATE VIEW IF NOT EXISTS v_recent_scans AS
SELECT 
  timestamp,
  total_files,
  total_lines,
  scan_duration,
  issues_found,
  ROUND(issues_found * 1.0 / total_files, 2) as issues_per_file
FROM scan_history
ORDER BY timestamp DESC
LIMIT 10;

-- Remediation success rate
CREATE VIEW IF NOT EXISTS v_remediation_stats AS
SELECT 
  action_type,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
  SUM(CASE WHEN status = 'rolled_back' THEN 1 ELSE 0 END) as rolled_back,
  ROUND(SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as success_rate
FROM remediations
GROUP BY action_type;

-- ============================================================================
-- Initial data
-- ============================================================================

-- Insert initial metric types
INSERT OR IGNORE INTO metrics (id, timestamp, metric_type, value, metadata)
VALUES 
  ('init-coverage', datetime('now'), 'test_coverage', 0.0, '{"description": "Initial test coverage"}'),
  ('init-issues', datetime('now'), 'total_issues', 0, '{"description": "Initial issue count"}');
