-- Agent Consulting Sessions persistence
-- Stores a JSON snapshot of counseling sessions so they survive restarts

CREATE TABLE IF NOT EXISTS agent_consulting_sessions (
  id uuid PRIMARY KEY,
  correlation_id uuid NOT NULL,
  status varchar(50) NOT NULL,
  initiator_id text NOT NULL,
  participants jsonb NOT NULL DEFAULT '[]'::jsonb,
  session jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_consulting_sessions_status_idx ON agent_consulting_sessions(status);
CREATE INDEX IF NOT EXISTS agent_consulting_sessions_correlation_idx ON agent_consulting_sessions(correlation_id);
