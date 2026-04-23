#!/bin/bash
# Restore verification script
# Restores a .sql.gz backup into a temporary database and runs basic verification queries.
# Usage: ./verify-restore-postgres.sh <backup_file>

set -euo pipefail

BACKUP_FILE="${1:?Backup file required (.sql.gz)}"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  exit 1
fi

if ! gunzip -t "$BACKUP_FILE" >/dev/null 2>&1; then
  echo "❌ Backup file is corrupted: $BACKUP_FILE"
  exit 1
fi

auto_suffix="$(date +%Y%m%d_%H%M%S)"
VERIFY_DB_NAME="${VERIFY_DB_NAME:-app_db_verify_${auto_suffix}}"
DB_NAME="${DB_NAME:-app_db}"
DB_USER="${DB_USER:-app_user}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

if [ -z "${DB_PASSWORD:-}" ]; then
  echo "❌ DB_PASSWORD is required for restore verification"
  exit 1
fi

echo "🔍 Starting restore verification"
echo "- Backup: $BACKUP_FILE"
echo "- Verify DB: $VERIFY_DB_NAME"

cleanup() {
  echo "🧹 Cleaning up verification DB: $VERIFY_DB_NAME"
  PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS \"$VERIFY_DB_NAME\";" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# Create verification database
PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"$VERIFY_DB_NAME\" ENCODING 'UTF8';" >/dev/null

# Restore
echo "📥 Restoring into verification DB..."
gunzip -c "$BACKUP_FILE" | PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -v ON_ERROR_STOP=1 >/dev/null

echo "✅ Restore completed"

# Verify basics
TABLE_COUNT=$(PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -t -A -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';")
if [ -z "$TABLE_COUNT" ]; then
  echo "❌ Verification failed: could not count tables"
  exit 1
fi

echo "✅ Verification: public table count = $TABLE_COUNT"

if [ "$TABLE_COUNT" -lt 5 ]; then
  echo "❌ Verification failed: too few tables ($TABLE_COUNT)"
  exit 1
fi

# Optional per-table row checks (non-fatal if table missing)
for t in users organizations sessions audit_logs; do
  COUNT=$(PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -t -A -c "SELECT to_regclass('public.$t') IS NOT NULL;")
  if [ "$COUNT" = "t" ]; then
    ROWS=$(PGPASSWORD="${DB_PASSWORD}" psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$VERIFY_DB_NAME" -t -A -c "SELECT COUNT(*) FROM \"$t\";")
    echo "- Row check: $t = $ROWS"
  fi
done

echo "🎉 Restore verification succeeded"
