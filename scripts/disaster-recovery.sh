#!/bin/bash
# Disaster Recovery Script - Full Platform Restore
# Usage: ./disaster-recovery.sh <backup_file> <target_environment>

set -e

BACKUP_FILE="${1:?Backup file required}"
TARGET_ENV="${2:-staging}"

echo "🚨 Starting Disaster Recovery for environment: $TARGET_ENV"
echo "📦 Backup file: $BACKUP_FILE"
echo ""

# Verify backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if backup file is valid
echo "🔍 Verifying backup integrity..."
if ! gunzip -t "$BACKUP_FILE" 2>/dev/null; then
    echo "❌ Backup file is corrupted"
    exit 1
fi
echo "✅ Backup verified"

# Get database connection info
DB_NAME="${DB_NAME:-app_db}"
DB_USER="${DB_USER:-app_user}"
DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"

# Stop the application
echo ""
echo "🛑 Stopping application..."
if [ "$TARGET_ENV" = "production" ]; then
    kubectl scale deployment/app --replicas=0 -n production
    echo "✅ Application stopped"
else
    echo "⏭️  Skipping stop for non-production environment"
fi

# Drop existing database (with confirmation for production)
echo ""
if [ "$TARGET_ENV" = "production" ]; then
    read -p "⚠️  This will DROP the production database. Type 'yes' to continue: " confirmation
    if [ "$confirmation" != "yes" ]; then
        echo "❌ Restore cancelled"
        exit 1
    fi
fi

echo "🗑️  Dropping existing database..."
PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -c "DROP DATABASE IF EXISTS $DB_NAME;" || true

# Create fresh database
echo "📝 Creating new database..."
PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -c "CREATE DATABASE $DB_NAME ENCODING 'UTF8';"

# Restore from backup
echo "📥 Restoring from backup... (this may take a while)"
gunzip -c "$BACKUP_FILE" | PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -p "$DB_PORT"

if [ $? -ne 0 ]; then
    echo "❌ Restore failed!"
    exit 1
fi

echo "✅ Database restored successfully"

# Verify restoration
echo "🔍 Verifying restored database..."
TABLE_COUNT=$(PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -p "$DB_PORT" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';")
echo "✅ Found $TABLE_COUNT tables in restored database"

# Clear cache
echo ""
echo "🧹 Clearing Redis cache..."
redis-cli FLUSHALL || echo "⚠️  Redis not available or flush failed"

# Restart application
echo ""
echo "🚀 Restarting application..."
if [ "$TARGET_ENV" = "production" ]; then
    kubectl scale deployment/app --replicas=3 -n production
    echo "✅ Application restarted (3 replicas)"
elif [ "$TARGET_ENV" = "staging" ]; then
    kubectl scale deployment/app --replicas=2 -n staging
    echo "✅ Application restarted (2 replicas)"
fi

# Health check
echo ""
echo "🏥 Running health checks..."
sleep 10
HEALTH_URL="https://api-${TARGET_ENV}.example.com/health"
if curl -sf "$HEALTH_URL" > /dev/null; then
    echo "✅ Health check passed"
else
    echo "⚠️  Health check failed - please verify manually"
fi

echo ""
echo "🎉 Disaster recovery completed successfully!"
echo "⏰ Restore time: $(date)"
echo ""
echo "📋 Post-Restore Checklist:"
echo "  [ ] Verify application functionality"
echo "  [ ] Check data integrity"
echo "  [ ] Review audit logs"
echo "  [ ] Notify stakeholders"
