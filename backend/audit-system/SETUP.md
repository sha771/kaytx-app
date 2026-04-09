# Platform Audit and Cleanup System - Setup Guide

## Installation

### 1. Install Dependencies

The audit system requires the following dependencies:

```bash
# Install better-sqlite3 for database operations
npm install better-sqlite3 @types/better-sqlite3

# Verify fast-check is installed (for property-based testing)
npm list fast-check
```

### 2. Initialize Database

The database will be automatically initialized on first use. The schema is located at:
- `backend/audit-system/db/schema.sql`

Default database location:
- `backend/audit-system/db/audit.db`

To manually initialize:

```typescript
import { getDatabase } from './db/connection';

const db = getDatabase('./path/to/audit.db');
// Database is now initialized and ready to use
```

### 3. Configure Environment Variables

Create or update your `.env` file with the following variables:

```bash
# Database
AUDIT_DB_PATH=./backend/audit-system/db/audit.db

# Backup
AUDIT_BACKUP_PATH=./.audit-backups

# Reporting
AUDIT_REPORT_PATH=./reports

# Performance
AUDIT_MAX_WORKERS=4
AUDIT_MAX_FILE_SIZE=1048576  # 1MB in bytes

# Thresholds
AUDIT_DUPLICATE_THRESHOLD=0.7
AUDIT_COVERAGE_THRESHOLD=0.8
AUDIT_COMPLEXITY_THRESHOLD=20

# Execution
AUDIT_AUTO_EXECUTE=false
AUDIT_DRY_RUN=false
AUDIT_ROLLBACK_ON_FAILURE=true

# Retention
AUDIT_BACKUP_RETENTION_DAYS=30
```

All environment variables are optional and have sensible defaults.

### 4. Validate Configuration

```typescript
import { getValidatedEnvironmentVariables } from './config/schema';

try {
  const env = getValidatedEnvironmentVariables();
  console.log('Environment variables validated successfully');
} catch (error) {
  console.error('Environment validation failed:', error);
}
```

## Directory Structure

```
backend/audit-system/
├── scanner/           # Code scanning and AST parsing
├── analyzer/          # Static analysis and metrics
├── detector/          # Issue detection logic
├── executor/          # Safe remediation execution
├── reporter/          # Report generation and export
├── models/            # Data models and types
│   └── types.ts       # Core type definitions
├── utils/             # Shared utilities
├── config/            # Configuration and validation
│   └── schema.ts      # Zod schemas for validation
├── db/                # SQLite database
│   ├── schema.sql     # Database schema
│   ├── connection.ts  # Database connection
│   └── audit.db       # SQLite database file (created on first run)
├── __tests__/         # Test files
│   └── setup.ts       # Jest setup
├── index.ts           # Main entry point
├── package.json       # Package configuration
├── tsconfig.json      # TypeScript configuration
├── jest.config.js     # Jest configuration
├── README.md          # Main documentation
└── SETUP.md           # This file
```

## TypeScript Configuration

The audit system uses strict TypeScript configuration:

- `strict: true` - All strict type checking options enabled
- `noImplicitAny: true` - No implicit any types
- `strictNullChecks: true` - Strict null checking
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused parameters
- `noUncheckedIndexedAccess: true` - Strict index access checking

## Testing

### Run All Tests

```bash
cd backend/audit-system
npm test
```

### Run Property-Based Tests

```bash
npm run test:property
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

Coverage threshold is set to 80% minimum for all metrics (lines, branches, functions, statements).

## Building

```bash
cd backend/audit-system
npm run build
```

Compiled output will be in the `dist/` directory.

## Usage Example

```typescript
import {
  AuditDatabase,
  getDatabase,
  validateConfig,
  DEFAULT_AUDIT_CONFIG,
} from './backend/audit-system';

// Initialize database
const db = getDatabase();

// Validate configuration
const config = validateConfig({
  ...DEFAULT_AUDIT_CONFIG,
  scanning: {
    ...DEFAULT_AUDIT_CONFIG.scanning,
    includePatterns: ['backend/**/*.ts'],
  },
});

console.log('Audit system initialized successfully');
```

## Troubleshooting

### Database Locked Error

If you encounter "database is locked" errors:

1. Ensure no other processes are accessing the database
2. Check that WAL mode is enabled (automatic in connection.ts)
3. Close database connections properly using `closeDatabase()`

### TypeScript Compilation Errors

If you encounter TypeScript errors:

1. Ensure you're using TypeScript 5.9.2 or higher
2. Run `npm install` to ensure all dependencies are installed
3. Check that `tsconfig.json` extends the root configuration

### Test Failures

If tests fail:

1. Ensure all dependencies are installed: `npm install`
2. Check that the database is not locked
3. Run tests with verbose output: `npm test -- --verbose`

## Next Steps

After completing the infrastructure setup (Task 1), the next tasks are:

1. **Task 2**: Implement Code Scanner
2. **Task 3**: Implement Static Analyzer
3. **Task 4**: Checkpoint - Ensure scanner and analyzer tests pass
4. **Task 5**: Implement Issue Detectors

See `.kiro/specs/platform-audit-and-cleanup/tasks.md` for the complete implementation plan.

## Support

For issues or questions, refer to:
- Requirements: `.kiro/specs/platform-audit-and-cleanup/requirements.md`
- Design: `.kiro/specs/platform-audit-and-cleanup/design.md`
- Tasks: `.kiro/specs/platform-audit-and-cleanup/tasks.md`
