-- Migration: Add design_customizations table for Design Agent feature
-- Description: Stores user-specific page design customizations

CREATE TABLE IF NOT EXISTS design_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  page_path VARCHAR(500) NOT NULL,
  page_name VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  changes JSONB NOT NULL DEFAULT '{}',
  applied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS design_customizations_user_idx ON design_customizations(user_id);
CREATE INDEX IF NOT EXISTS design_customizations_page_path_idx ON design_customizations(page_path);
CREATE INDEX IF NOT EXISTS design_customizations_user_page_idx ON design_customizations(user_id, page_path);
CREATE INDEX IF NOT EXISTS design_customizations_created_at_idx ON design_customizations(created_at);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_design_customizations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_design_customizations_updated_at ON design_customizations;
CREATE TRIGGER trigger_design_customizations_updated_at
  BEFORE UPDATE ON design_customizations
  FOR EACH ROW
  EXECUTE FUNCTION update_design_customizations_updated_at();