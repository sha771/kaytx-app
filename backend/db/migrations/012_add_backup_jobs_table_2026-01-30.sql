-- Create backup_jobs table for enterprise backup functionality
CREATE TABLE IF NOT EXISTS backup_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    database VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'full', 'incremental', 'differential'
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    size VARCHAR(50),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    duration VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS backup_jobs_org_created_idx ON backup_jobs(organization_id, created_at);

-- RLS policies (optional, enable if using row-level security)
-- ALTER TABLE backup_jobs ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY org_isolation ON backup_jobs FOR ALL TO authenticated_user USING (organization_id = current_setting('app.current_organization_id')::UUID);
