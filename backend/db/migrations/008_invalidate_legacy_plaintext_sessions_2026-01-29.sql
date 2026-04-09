-- Invalidate legacy plaintext session tokens
-- Generated: 2026-01-29

-- After switching to HMAC-SHA256 hashed session tokens, any previously stored plaintext
-- tokens can no longer be validated securely. We invalidate them by deleting rows
-- whose token/refresh_token do not look like 64-char hex digests.

DELETE FROM sessions
WHERE token !~ '^[0-9A-Fa-f]{64}$'
   OR refresh_token !~ '^[0-9A-Fa-f]{64}$';
