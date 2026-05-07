 #!/bin/bash
# Automated PostgreSQL Backup Script
# Run via cron: 0 2 * * * /scripts/backup-postgres.sh

set -euo pipefail

VERIFY_RESTORE=false
if [ "${1:-}" = "--verify" ]; then
  VERIFY_RESTORE=true
fi

BACKUP_DIR="${BACKUP_DIR:-/backups/postgres}"
DB_NAME="${DB_NAME:-app_db}"
DB_USER="${DB_USER:-app_user}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_PASSWORD="${DB_PASSWORD:-}"
RETENTION_DAYS=30
AWS_S3_BUCKET="${AWS_S3_BUCKET:-app-backups}"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_${TIMESTAMP}.sql.gz"
BACKUP_LOG="$BACKUP_DIR/backup_${TIMESTAMP}.log"

echo "Starting PostgreSQL backup at $(date)" > "$BACKUP_LOG"

# Create backup
if [ -n "${DB_PASSWORD:-}" ]; then
    export PGPASSWORD="${DB_PASSWORD}"
fi

PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -p "$DB_PORT" 2>>"$BACKUP_LOG" | \
  gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully" >> "$BACKUP_LOG"
    echo "📊 Backup size: $(du -h "$BACKUP_FILE" | cut -f1)" >> "$BACKUP_LOG"

    echo "🔍 Verifying backup integrity..." >> "$BACKUP_LOG"
    if gunzip -t "$BACKUP_FILE" 2>>"$BACKUP_LOG"; then
        echo "✅ Backup integrity verified" >> "$BACKUP_LOG"
    else
        echo "❌ Backup integrity check failed!" >> "$BACKUP_LOG"
        exit 1
    fi
    
    # Upload to S3
    if command -v aws &> /dev/null; then
        echo "📤 Uploading to S3 bucket: $AWS_S3_BUCKET" >> "$BACKUP_LOG"
        aws s3 cp "$BACKUP_FILE" "s3://$AWS_S3_BUCKET/postgres/$(date +%Y/%m/%d)/" --storage-class GLACIER
        echo "✅ S3 upload completed" >> "$BACKUP_LOG"
    fi
    
    # Cleanup old backups (local)
    echo "🧹 Cleaning up backups older than $RETENTION_DAYS days" >> "$BACKUP_LOG"
    find "$BACKUP_DIR" -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    if [ "$VERIFY_RESTORE" = true ]; then
        echo "🔁 Running restore verification..." >> "$BACKUP_LOG"
        VERIFY_DB_NAME="${VERIFY_DB_NAME:-${DB_NAME}_verify_${TIMESTAMP}}"

        echo "📝 Creating verify database: $VERIFY_DB_NAME" >> "$BACKUP_LOG"
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -v ON_ERROR_STOP=1 \
          -c "DROP DATABASE IF EXISTS \"$VERIFY_DB_NAME\";" 2>>"$BACKUP_LOG" || true
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -v ON_ERROR_STOP=1 \
          -c "CREATE DATABASE \"$VERIFY_DB_NAME\" ENCODING 'UTF8';" 2>>"$BACKUP_LOG"

        echo "📥 Restoring into verify database..." >> "$BACKUP_LOG"
        gunzip -c "$BACKUP_FILE" | PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -v ON_ERROR_STOP=1 2>>"$BACKUP_LOG"

        echo "🔍 Verifying restored database (SELECT 1)..." >> "$BACKUP_LOG"
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -v ON_ERROR_STOP=1 \
          -c "SELECT 1;" 2>>"$BACKUP_LOG" >/dev/null

        echo "🧹 Dropping verify database: $VERIFY_DB_NAME" >> "$BACKUP_LOG"
        PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -v ON_ERROR_STOP=1 \
          -c "DROP DATABASE IF EXISTS \"$VERIFY_DB_NAME\";" 2>>"$BACKUP_LOG" || true

        echo "✅ Restore verification completed" >> "$BACKUP_LOG"
    fi
else
    echo "❌ Backup failed!" >> "$BACKUP_LOG"
    exit 1
fi

cat "$BACKUP_LOG"
