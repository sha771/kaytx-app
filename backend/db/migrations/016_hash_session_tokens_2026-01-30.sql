BEGIN;

-- Create new columns for hashed tokens
ALTER TABLE sessions 
ADD COLUMN token_hashed varchar(255),
ADD COLUMN refresh_token_hashed varchar(255);

-- Hash existing tokens and populate new columns
UPDATE sessions 
SET 
  token_hashed = encode(sha256(token::bytea), 'hex'),
  refresh_token_hashed = encode(sha256(refresh_token::bytea), 'hex')
WHERE token IS NOT NULL AND refresh_token IS NOT NULL;

-- Drop old columns
ALTER TABLE sessions 
DROP COLUMN token,
DROP COLUMN refresh_token;

-- Rename hashed columns to original names
ALTER TABLE sessions 
RENAME COLUMN token_hashed TO token,
RENAME COLUMN refresh_token_hashed TO refresh_token;

-- Add NOT NULL constraints
ALTER TABLE sessions 
ALTER COLUMN token SET NOT NULL,
ALTER COLUMN refresh_token SET NOT NULL;

-- Recreate indexes
CREATE UNIQUE INDEX sessions_token_idx ON sessions(token);
CREATE UNIQUE INDEX sessions_refresh_token_idx ON sessions(refresh_token);

COMMIT;
