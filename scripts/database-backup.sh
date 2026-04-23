#!/bin/bash

# Database Backup Script for Kaytx
# This script creates automated backups of the PostgreSQL database
# with retention policies and compression

set -euo pipefail

# Configuration
BACKUP_DIR="${BACKUP_DIR:-/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-kaytx}"
DB_USER="${DB_USER:-postgres}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/kaytx_backup_${TIMESTAMP}.sql"
COMPRESSED_FILE="${BACKUP_FILE}.gz"
LOG_FILE="${BACKUP_DIR}/backup.log"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "${LOG_FILE}"
}

# Function to cleanup old backups
cleanup_old_backups() {
    log "Cleaning up backups older than ${RETENTION_DAYS} days"
    find "${BACKUP_DIR}" -name "kaytx_backup_*.sql.gz" -mtime +${RETENTION_DAYS} -delete
    log "Cleanup completed"
}

# Function to verify backup
verify_backup() {
    local file="$1"
    if [[ -f "${file}" ]]; then
        local size=$(stat -f%z "${file}" 2>/dev/null || stat -c%s "${file}" 2>/dev/null)
        if [[ ${size} -gt 1000 ]]; then
            log "Backup verification passed: ${file} (${size} bytes)"
            return 0
        else
            log "Backup verification failed: ${file} is too small (${size} bytes)"
            return 1
        fi
    else
        log "Backup verification failed: ${file} does not exist"
        return 1
    fi
}

# Function to upload to cloud storage (optional)
upload_to_cloud() {
    local file="$1"
    
    # AWS S3 upload (if AWS credentials are available)
    if [[ -n "${AWS_S3_BUCKET:-}" && -n "${AWS_ACCESS_KEY_ID:-}" ]]; then
        log "Uploading backup to AWS S3: ${AWS_S3_BUCKET}"
        aws s3 cp "${file}" "s3://${AWS_S3_BUCKET}/backups/$(basename "${file}")" \
            --storage-class GLACIER \
            --server-side-encryption AES256 || log "S3 upload failed"
    fi
    
    # Google Cloud Storage upload (if GCS credentials are available)
    if [[ -n "${GCS_BUCKET:-}" && -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ]]; then
        log "Uploading backup to Google Cloud Storage: ${GCS_BUCKET}"
        gsutil cp "${file}" "gs://${GCS_BUCKET}/backups/$(basename "${file}")" || log "GCS upload failed"
    fi
    
    # Azure Blob Storage upload (if Azure credentials are available)
    if [[ -n "${AZURE_STORAGE_ACCOUNT:-}" && -n "${AZURE_STORAGE_KEY:-}" ]]; then
        log "Uploading backup to Azure Blob Storage"
        az storage blob upload \
            --file "${file}" \
            --container-name backups \
            --name "$(basename "${file}")" \
            --account-name "${AZURE_STORAGE_ACCOUNT}" \
            --account-key "${AZURE_STORAGE_KEY}" || log "Azure upload failed"
    fi
}

# Function to send notification
send_notification() {
    local status="$1"
    local message="$2"
    
    # Slack notification (if webhook URL is available)
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        local color="good"
        [[ "${status}" == "ERROR" ]] && color="danger"
        
        curl -X POST "${SLACK_WEBHOOK_URL}" \
            -H 'Content-type: application/json' \
            --data "{\"attachments\":[{\"color\":\"${color}\",\"text\":\"${message}\"}]}" \
            || log "Slack notification failed"
    fi
    
    # Email notification (if mail command is available and email is set)
    if [[ -n "${BACKUP_NOTIFICATION_EMAIL:-}" ]] && command -v mail >/dev/null 2>&1; then
        echo "${message}" | mail -s "Database Backup ${status}" "${BACKUP_NOTIFICATION_EMAIL}" \
            || log "Email notification failed"
    fi
}

# Main backup process
main() {
    log "Starting database backup process"
    
    # Check if database is accessible
    if ! pg_isready -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}"; then
        log "ERROR: Database is not accessible"
        send_notification "ERROR" "Database backup failed: Database not accessible"
        exit 1
    fi
    
    # Create backup
    log "Creating database backup: ${BACKUP_FILE}"
    
    if PGPASSWORD="${PGPASSWORD:-}" pg_dump \
        -h "${DB_HOST}" \
        -p "${DB_PORT}" \
        -U "${DB_USER}" \
        -d "${DB_NAME}" \
        --verbose \
        --clean \
        --if-exists \
        --create \
        --format=custom \
        --compress=9 \
        --file="${BACKUP_FILE}"; then
        
        log "Database backup created successfully"
        
        # Compress the backup
        log "Compressing backup file"
        gzip "${BACKUP_FILE}"
        
        # Verify the compressed backup
        if verify_backup "${COMPRESSED_FILE}"; then
            log "Backup verification successful"
            
            # Upload to cloud storage (if configured)
            upload_to_cloud "${COMPRESSED_FILE}"
            
            # Send success notification
            send_notification "SUCCESS" "Database backup completed successfully: $(basename "${COMPRESSED_FILE}")"
            
        else
            log "ERROR: Backup verification failed"
            send_notification "ERROR" "Database backup verification failed"
            exit 1
        fi
        
    else
        log "ERROR: Database backup failed"
        send_notification "ERROR" "Database backup failed during pg_dump"
        exit 1
    fi
    
    # Cleanup old backups
    cleanup_old_backups
    
    # Generate backup summary
    local backup_size=$(stat -f%z "${COMPRESSED_FILE}" 2>/dev/null || stat -c%s "${COMPRESSED_FILE}" 2>/dev/null)
    local backup_count=$(find "${BACKUP_DIR}" -name "kaytx_backup_*.sql.gz" | wc -l)
    
    log "Backup completed successfully"
    log "Backup size: ${backup_size} bytes"
    log "Total backups: ${backup_count}"
    log "Retention period: ${RETENTION_DAYS} days"
    
    log "Database backup process completed"
}

# Handle script arguments
case "${1:-}" in
    "cleanup")
        cleanup_old_backups
        ;;
    "verify")
        if [[ -n "${2:-}" ]]; then
            verify_backup "$2"
        else
            log "ERROR: Please provide backup file to verify"
            exit 1
        fi
        ;;
    "restore")
        if [[ -n "${2:-}" ]]; then
            RESTORE_FILE="$2"
            log "Restoring database from: ${RESTORE_FILE}"
            
            # Check if restore file exists
            if [[ ! -f "${RESTORE_FILE}" ]]; then
                log "ERROR: Restore file does not exist: ${RESTORE_FILE}"
                exit 1
            fi
            
            # Extract if compressed
            if [[ "${RESTORE_FILE}" == *.gz ]]; then
                log "Decompressing restore file"
                gunzip -c "${RESTORE_FILE}" > "/tmp/restore_$(date +%s).sql"
                RESTORE_FILE="/tmp/restore_$(date +%s).sql"
            fi
            
            # Perform restore
            if PGPASSWORD="${PGPASSWORD:-}" psql \
                -h "${DB_HOST}" \
                -p "${DB_PORT}" \
                -U "${DB_USER}" \
                -d "${DB_NAME}" \
                -f "${RESTORE_FILE}"; then
                
                log "Database restore completed successfully"
                send_notification "SUCCESS" "Database restore completed successfully"
            else
                log "ERROR: Database restore failed"
                send_notification "ERROR" "Database restore failed"
                exit 1
            fi
        else
            log "ERROR: Please provide backup file to restore"
            exit 1
        fi
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  (none)     Perform database backup"
        echo "  cleanup    Clean up old backups"
        echo "  verify     Verify backup file"
        echo "  restore    Restore database from backup"
        echo "  help       Show this help message"
        echo ""
        echo "Environment Variables:"
        echo "  BACKUP_DIR              Backup directory (default: /backups)"
        echo "  RETENTION_DAYS          Backup retention period in days (default: 30)"
        echo "  DB_HOST                 Database host (default: localhost)"
        echo "  DB_PORT                 Database port (default: 5432)"
        echo "  DB_NAME                 Database name (default: kaytx)"
        echo "  DB_USER                 Database user (default: postgres)"
        echo "  PGPASSWORD              Database password"
        echo "  AWS_S3_BUCKET           AWS S3 bucket for cloud storage"
        echo "  GCS_BUCKET              Google Cloud Storage bucket"
        echo "  AZURE_STORAGE_ACCOUNT   Azure Storage account name"
        echo "  AZURE_STORAGE_KEY       Azure Storage account key"
        echo "  SLACK_WEBHOOK_URL       Slack webhook URL for notifications"
        echo "  BACKUP_NOTIFICATION_EMAIL Email address for notifications"
        exit 0
        ;;
    *)
        main
        ;;
esac
