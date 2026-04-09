#!/bin/bash

# Log Retention Policy Setup Script
# Configures 90-day log retention policy with automated cleanup

set -e

echo "🔧 Setting up Log Retention Policy (90 days)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Get project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

print_status "Project root: $PROJECT_ROOT"
print_status "Backend directory: $BACKEND_DIR"

# Check if backend directory exists
if [[ ! -d "$BACKEND_DIR" ]]; then
    print_error "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

# 1. Install dependencies
print_status "Installing dependencies..."
cd "$BACKEND_DIR"
npm install --production

# 2. Build the project
print_status "Building project..."
npm run build

# 3. Set up systemd service (Linux)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    print_status "Setting up systemd service..."
    
    # Copy systemd files
    sudo cp "$PROJECT_ROOT/scripts/systemd/kaytx-log-cleanup.service" /etc/systemd/system/
    sudo cp "$PROJECT_ROOT/scripts/systemd/kaytx-log-cleanup.timer" /etc/systemd/system/
    
    # Reload systemd
    sudo systemctl daemon-reload
    
    # Enable and start the timer
    sudo systemctl enable kaytx-log-cleanup.timer
    sudo systemctl start kaytx-log-cleanup.timer
    
    print_status "Systemd timer enabled and started"
fi

# 4. Set up cron job (fallback)
print_status "Setting up cron job..."
(crontab -l 2>/dev/null; echo "0 2 * * * cd $BACKEND_DIR && /usr/bin/node scripts/cleanup-logs.js") | crontab -

print_status "Cron job added to run daily at 2 AM"

# 5. Create log directories
print_status "Creating log directories..."
mkdir -p /var/log/kaytx
mkdir -p "$BACKEND_DIR/logs"

# 6. Set permissions
print_status "Setting permissions..."
chmod +x "$BACKEND_DIR/scripts/cleanup-logs.js"
chmod 755 /var/log/kaytx

# 7. Test the cleanup script
print_status "Testing cleanup script (dry run)..."
cd "$BACKEND_DIR"
node scripts/cleanup-logs.js --dry-run

# 8. Verify configuration
print_status "Verifying configuration..."

# Check if script exists
if [[ ! -f "$BACKEND_DIR/scripts/cleanup-logs.js" ]]; then
    print_error "Cleanup script not found"
    exit 1
fi

# Check if TypeScript compilation worked
if [[ ! -f "$BACKEND_DIR/scripts/cleanup-logs.js" ]]; then
    print_warning "TypeScript compilation may be needed"
    print_status "Running TypeScript compilation..."
    npx tsc scripts/cleanup-logs.ts --outDir dist --target es2020 --module commonjs
    cp dist/scripts/cleanup-logs.js scripts/cleanup-logs.js
fi

# 9. Create environment file
print_status "Creating environment configuration..."
cat > "$BACKEND_DIR/.env.cleanup" << EOF
# Log Cleanup Configuration
NODE_ENV=production
LOG_LEVEL=info
CLEANUP_ENABLED=true
CLEANUP_SCHEDULE="0 2 * * *"
AUDIT_RETENTION_DAYS=90
SYSTEM_RETENTION_DAYS=30
ERROR_RETENTION_DAYS=30
ENABLE_MONITORING=true
ENABLE_ALERTING=true
EOF

print_status "Environment configuration created"

# 10. Kubernetes setup (if kubectl is available)
if command -v kubectl &> /dev/null; then
    print_status "Kubernetes detected - setting up CronJob..."
    
    # Apply the CronJob
    kubectl apply -f "$PROJECT_ROOT/kubernetes/log-cleanup-cronjob.yaml"
    
    print_status "Kubernetes CronJob applied"
fi

# 11. Docker setup (if Docker is available)
if command -v docker &> /dev/null; then
    print_status "Docker detected - creating cleanup container..."
    
    # Create a Dockerfile for the cleanup script
    cat > "$BACKEND_DIR/Dockerfile.cleanup" << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create cleanup script
COPY scripts/cleanup-logs.js .

# Command to run cleanup
CMD ["node", "scripts/cleanup-logs.js"]
EOF

    print_status "Docker cleanup configuration created"
fi

# 12. Create monitoring dashboard
print_status "Creating monitoring configuration..."
cat > "$PROJECT_ROOT/monitoring/log-cleanup-dashboard.json" << 'EOF'
{
  "dashboard": {
    "title": "Log Retention Dashboard",
    "panels": [
      {
        "title": "Log Volume",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(log_volume_total)",
            "legendFormat": "Total Logs"
          }
        ]
      },
      {
        "title": "Retention Compliance",
        "type": "gauge",
        "targets": [
          {
            "expr": "retention_compliance_ratio",
            "legendFormat": "Compliance %"
          }
        ]
      },
      {
        "title": "Cleanup Status",
        "type": "table",
        "targets": [
          {
            "expr": "cleanup_status",
            "format": "table"
          }
        ]
      }
    ]
  }
}
EOF

print_status "Monitoring dashboard configuration created"

# 13. Create documentation
print_status "Creating documentation..."
cat > "$PROJECT_ROOT/docs/LOG_RETENTION_SETUP.md" << EOF
# Log Retention Policy Setup

## Overview
This document describes the setup and configuration of the 90-day log retention policy.

## Configuration

### Retention Periods
- **Audit Logs**: 90 days (GDPR, HIPAA, SOX compliance)
- **System Logs**: 30 days (operational efficiency)
- **Error Logs**: 30 days (debugging and monitoring)

### Automated Cleanup
- **Schedule**: Daily at 2:00 AM UTC
- **Method**: Node.js script with database cleanup
- **Monitoring**: Real-time compliance checking

## Components

### 1. Cleanup Script
- **Location**: \`backend/scripts/cleanup-logs.js\`
- **Usage**: \`node scripts/cleanup-logs.js\`
- **Options**: \`--dry-run\`, \`--audit\`, \`--system\`, \`--error\`

### 2. Monitoring Service
- **Location**: \`backend/lib/log-cleanup-monitor.ts\`
- **Features**: Real-time compliance checking, storage estimation
- **API**: \`/api/log-cleanup/*\` endpoints

### 3. API Endpoints
- \`GET /api/log-cleanup/status\` - Current cleanup status
- \`GET /api/log-cleanup/report\` - Comprehensive cleanup report
- \`POST /api/log-cleanup/cleanup\` - Trigger manual cleanup
- \`GET /api/log-cleanup/compliance\` - Retention compliance check

## Deployment

### Systemd (Linux)
\`\`\`bash
sudo systemctl enable kaytx-log-cleanup.timer
sudo systemctl start kaytx-log-cleanup.timer
\`\`\`

### Kubernetes
\`\`\`bash
kubectl apply -f kubernetes/log-cleanup-cronjob.yaml
\`\`\`

### Cron Job
\`\`\`bash
# Edit crontab
crontab -e

# Add daily cleanup
0 2 * * * cd /path/to/backend && node scripts/cleanup-logs.js
\`\`\`

## Monitoring

### Health Check
\`\`\`bash
curl -H "Authorization: Bearer <token>" \\
  http://localhost:3001/api/log-cleanup/status
\`\`\`

### Compliance Report
\`\`\`bash
curl -H "Authorization: Bearer <token>" \\
  http://localhost:3001/api/log-cleanup/compliance
\`\`\`

## Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL environment variable
2. **Permissions**: Ensure script has database delete permissions
3. **Schedule**: Verify cron/systemd timer is running
4. **Memory**: Monitor cleanup script memory usage

### Logs
- **System Logs**: \`/var/log/kaytx/cleanup.log\`
- **Error Logs**: \`/var/log/kaytx/cleanup.error.log\`
- **Application Logs**: Check application log viewer

## Security Considerations
- Script runs with minimal required permissions
- Database connections use encrypted connections
- Cleanup operations are logged for audit
- PII data is handled according to retention policies

## Compliance
- **GDPR**: 90-day retention for audit logs
- **HIPAA**: Extended retention for healthcare data
- **SOX**: 7-year retention for financial records
- **PCI-DSS**: 1-year retention for cardholder data

Last updated: $(date)
EOF

print_status "Documentation created"

# Summary
echo ""
print_status "✅ Log Retention Policy Setup Complete!"
echo ""
echo "📋 Summary:"
echo "   • 90-day retention for audit logs"
echo "   • 30-day retention for system/error logs"
echo "   • Daily automated cleanup at 2 AM UTC"
echo "   • Real-time monitoring and alerting"
echo "   • API endpoints for management"
echo ""
echo "🔗 Next Steps:"
echo "   1. Verify DATABASE_URL is set"
echo "   2. Test the cleanup script: node scripts/cleanup-logs.js --dry-run"
echo "   3. Monitor the first automated cleanup"
echo "   4. Set up alerting for cleanup failures"
echo ""
echo "📊 Monitoring:"
echo "   • API: http://localhost:3001/api/log-cleanup/status"
echo "   • Logs: /var/log/kaytx/cleanup.log"
echo "   • Docs: $PROJECT_ROOT/docs/LOG_RETENTION_SETUP.md"
echo ""
print_status "Setup completed successfully! 🎉"
