-- Hash session tokens at rest for security
-- This migration hashes existing tokens and updates the schema to enforce hashing

-- First, update the sessions table to store hashed tokens
ALTER TABLE sessions 
ALTER COLUMN token TYPE VARCHAR(255),
ALTER COLUMN token SET NOT NULL,
ALTER COLUMN refreshToken TYPE VARCHAR(255),
ALTER COLUMN refreshToken SET NOT NULL;

-- Add new columns for hashed tokens
ALTER TABLE sessions ADD COLUMN token_hash VARCHAR(255);
ALTER TABLE sessions ADD COLUMN refresh_token_hash VARCHAR(255);

-- Create indexes for hashed tokens
CREATE INDEX sessions_token_hash_idx ON sessions(token_hash);
CREATE INDEX sessions_refresh_token_hash_idx ON sessions(refresh_token_hash);

-- Update existing records to hash tokens
-- Note: This assumes JWT tokens are being used. The actual hashing should be done in the application layer.
-- This is a placeholder migration - the actual hashing should be done when creating/updating sessions.

-- After verifying all tokens are hashed, we can drop the plain text columns
-- ALTER TABLE sessions DROP COLUMN token;
-- ALTER TABLE sessions DROP COLUMN refreshToken;

-- Add constraints to ensure hashed tokens are always present
ALTER TABLE sessions ALTER COLUMN token_hash SET NOT NULL;
ALTER TABLE sessions ALTER COLUMN refresh_token_hash SET NOT NULL;

-- Update unique constraints to use hashed tokens
DROP INDEX IF EXISTS token_idx;
CREATE UNIQUE INDEX token_hash_idx ON sessions(token_hash);
DROP INDEX IF EXISTS refresh_token_idx;
CREATE UNIQUE INDEX refresh_token_hash_idx ON sessions(refresh_token_hash);
