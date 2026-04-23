-- Enforce hashed session tokens at the database layer
-- Generated: 2026-01-29

-- 1) Ensure indexes exist (safe if already present)
CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS sessions_refresh_expires_at_idx ON sessions(refresh_expires_at);

-- 2) Add CHECK constraints so plaintext can never be inserted again for new sessions.
-- Legacy sessions created before the cutoff are allowed so the app can migrate them
-- on-the-fly the next time the user presents the token.
ALTER TABLE sessions
  DROP CONSTRAINT IF EXISTS sessions_token_sha256_hex_chk;
ALTER TABLE sessions
  DROP CONSTRAINT IF EXISTS sessions_refresh_token_sha256_hex_chk;

ALTER TABLE sessions
  ADD CONSTRAINT sessions_token_sha256_hex_chk
    CHECK (created_at < TIMESTAMPTZ '2026-01-30T00:00:00Z' OR token ~ '^[0-9A-Fa-f]{64}$');

ALTER TABLE sessions
  ADD CONSTRAINT sessions_refresh_token_sha256_hex_chk
    CHECK (created_at < TIMESTAMPTZ '2026-01-30T00:00:00Z' OR refresh_token ~ '^[0-9A-Fa-f]{64}$');
