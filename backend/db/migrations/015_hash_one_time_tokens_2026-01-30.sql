BEGIN;

UPDATE users
SET email_verification_token = NULL
WHERE email_verification_token IS NOT NULL
  AND email_verification_token !~ '^[0-9a-f]{64}$';

UPDATE users
SET password_reset_token = NULL,
    password_reset_expires = NULL
WHERE password_reset_token IS NOT NULL
  AND password_reset_token !~ '^[0-9a-f]{64}$';

ALTER TABLE users
  ADD CONSTRAINT users_email_verification_token_hashed_chk
  CHECK (email_verification_token IS NULL OR email_verification_token ~ '^[0-9a-f]{64}$');

ALTER TABLE users
  ADD CONSTRAINT users_password_reset_token_hashed_chk
  CHECK (password_reset_token IS NULL OR password_reset_token ~ '^[0-9a-f]{64}$');

COMMIT;
