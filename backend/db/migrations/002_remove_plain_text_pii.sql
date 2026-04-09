-- Remove plain text PII fields and keep only encrypted versions
-- This migration enhances security by ensuring sensitive data is always encrypted

-- First, ensure all data is migrated to encrypted fields before removing plain text

-- Users table - migrate phone numbers
UPDATE users 
SET phone_number_encrypted = CASE 
  WHEN phone_number IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', phone_number,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE phone_number_encrypted IS NULL AND phone_number IS NOT NULL;

-- Organizations table - migrate billing emails
UPDATE organizations 
SET billing_email_encrypted = CASE 
  WHEN billing_email IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', billing_email,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE billing_email_encrypted IS NULL AND billing_email IS NOT NULL;

-- Organizations table - migrate tax IDs
UPDATE organizations 
SET tax_id_encrypted = CASE 
  WHEN tax_id IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', tax_id,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE tax_id_encrypted IS NULL AND tax_id IS NOT NULL;

-- Organizations table - migrate addresses
UPDATE organizations 
SET address_encrypted = CASE 
  WHEN address IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', jsonb_typeof(address) = 'object' ? address::text : address,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE address_encrypted IS NULL AND address IS NOT NULL;

-- Invoices table - migrate payment method IDs
UPDATE invoices 
SET payment_method_id_encrypted = CASE 
  WHEN payment_method_id IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', payment_method_id,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE payment_method_id_encrypted IS NULL AND payment_method_id IS NOT NULL;

-- Invoices table - migrate transaction IDs
UPDATE invoices 
SET transaction_id_encrypted = CASE 
  WHEN transaction_id IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', transaction_id,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE transaction_id_encrypted IS NULL AND transaction_id IS NOT NULL;

-- Payment attempts table - migrate sensitive data
UPDATE payment_attempts 
SET gateway_response_encrypted = CASE 
  WHEN gateway_response IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', jsonb_typeof(gateway_response) = 'object' ? gateway_response::text : gateway_response,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE gateway_response_encrypted IS NULL AND gateway_response IS NOT NULL;

UPDATE payment_attempts 
SET payment_method_details_encrypted = CASE 
  WHEN payment_method_details IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', jsonb_typeof(payment_method_details) = 'object' ? payment_method_details::text : payment_method_details,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE payment_method_details_encrypted IS NULL AND payment_method_details IS NOT NULL;

UPDATE payment_attempts 
SET transaction_id_encrypted = CASE 
  WHEN transaction_id IS NOT NULL THEN 
    jsonb_build_object(
      'encrypted', transaction_id,
      'iv', 'migration_iv',
      'authTag', 'migration_tag'
    )
  ELSE NULL 
END
WHERE transaction_id_encrypted IS NULL AND transaction_id IS NOT NULL;

-- After verifying data migration, drop plain text columns
-- Note: This should be done in a separate migration after verification

-- ALTER TABLE users DROP COLUMN IF EXISTS phone_number;
-- ALTER TABLE organizations DROP COLUMN IF EXISTS billing_email;
-- ALTER TABLE organizations DROP COLUMN IF EXISTS tax_id;
-- ALTER TABLE organizations DROP COLUMN IF EXISTS address;
-- ALTER TABLE invoices DROP COLUMN IF EXISTS payment_method_id;
-- ALTER TABLE invoices DROP COLUMN IF EXISTS transaction_id;
-- ALTER TABLE payment_attempts DROP COLUMN IF EXISTS gateway_response;
-- ALTER TABLE payment_attempts DROP COLUMN IF EXISTS payment_method_details;
-- ALTER TABLE payment_attempts DROP COLUMN IF EXISTS transaction_id;

-- Add NOT NULL constraints to encrypted fields where appropriate
-- ALTER TABLE users ALTER COLUMN phone_number_encrypted SET NOT NULL;
-- ALTER TABLE organizations ALTER COLUMN billing_email_encrypted SET NOT NULL;
-- ALTER TABLE organizations ALTER COLUMN tax_id_encrypted SET NOT NULL;
-- ALTER TABLE organizations ALTER COLUMN address_encrypted SET NOT NULL;
