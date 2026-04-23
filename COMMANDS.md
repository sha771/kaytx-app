# 📖 Command Reference - Kaydex Full App

## Essential Commands

### 🚀 Running the Project

```bash
# Install dependencies (one time)
npm install --legacy-peer-deps

# Clean install if stuck
npm clean-install --legacy-peer-deps

# Start backend mock server (Terminal 1)
npm run backend

# Start web development server (Terminal 2)
npm run start-web:local

# Start local development without tunnel
npm run start-web:local

# Or use helper script (recommended)
node run.js backend
node run.js web
```

### 🧪 Testing & Validation

```bash
# Run all tests
npm test

# Run tests with coverage
npm test:coverage

# Run a specific test file
npm test -- performance.test.ts

# Run tests in watch mode
npm test -- --watch
```

### 🔍 Code Quality

```bash
# TypeScript type checking
npm run typecheck

# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### 📱 Mobile Development

```bash
# Build and run on Android
npm run android

# Build and run on iOS
npm run ios
```

### 🗄️ Database

```bash
# Run database migrations
npm run db:migrate

# Seed database (if available)
npm run db:seed

# Verify database connection
node test-db-verify.ts
```

---

## Helper Script Commands

Use `node run.js` for optimized runs with memory management:

```bash
# Show help
node run.js help

# Run backend with memory optimization
node run.js backend

# Run frontend with memory optimization
node run.js web

# Run TypeScript checking
node run.js typecheck

# Run tests with memory optimization
node run.js test
```

---

## npm Scripts (Full List)

```bash
npm run start              # Start with tunnel (for production)
npm run start:local        # Start local without tunnel
npm run start-web          # Start web with offline mode
npm run start-web:local    # Start web local (RECOMMENDED)
npm run start-web-dev      # Start web dev mode
npm run backend            # Start mock backend
npm run typecheck          # TypeScript type checking
npm run test               # Run all tests
npm run test:all           # Run complete test suite
npm run test:coverage      # Run tests with coverage
npm run lint               # Lint code
npm run db:migrate         # Run database migrations
npm run cleanup:week1      # Week 1 cleanup check
npm run cleanup:week1:apply # Apply week 1 cleanup
npm run android            # Build for Android
npm run ios                # Build for iOS
npm run openapi:lint       # Validate OpenAPI spec
```

---

## Common Workflows

### 1. Start Development Session

```bash
# Terminal 1: Backend
npm install --legacy-peer-deps  # First time only
npm run backend

# Terminal 2: Frontend
npm run start-web:local




### 2. Check Code Quality

```bash
npm run typecheck   # Check types
npm run lint        # Check style
npm test            # Run tests
```

### 3. Debug TypeScript Errors

```bash
npm run typecheck 2>&1 | head -20  # See first 20 errors
npm run typecheck -- --listFiles   # List files being checked
```

### 4. Clear Cache & Reinstall

```bash
# PowerShell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Or one command
npm install --force --legacy-peer-deps
```

### 5. Run Specific Test

```bash
npm test -- performance.tsx         # Test by filename
npm test -- --testNamePattern="AI"  # Test by name
npm test -- --coverage              # With coverage
```

---

## Environment Variables

Key variables in `.env`:

```bash
# API Configuration
EXPO_PUBLIC_RORK_API_BASE_URL=http://localhost:3000
PORT=3000
NODE_ENV=development

# Database (optional)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enterprise_db

# Secrets
JWT_SECRET=your_jwt_secret_at_least_32_characters_long

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

Override at runtime:
```bash
PORT=3001 npm run backend
NODE_ENV=production npm run start-web:local
```

---

## Port Configuration


Change ports:
```bash
# Set backend port
PORT=3001 npm run backend

# Expo ports are configured in scripts:
EXPO_METRO_PORT=8083 EXPO_WEB_PORT=19008 npm run start-web:local
```

---

## PowerShell Commands

For Windows PowerShell:

```powershell
# Navigation
cd c:\Users\shaida\Desktop\kaydex-full-app

# Run the project
npm install --legacy-peer-deps
npm run backend
npm run start-web:local

# Kill process on port
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Set environment variable
$env:NODE_ENV = "development"

# View Node version
node --version
npm --version
```

---

## Debugging Commands

```bash
# Show all npm scripts
npm run

# Show npm packages
npm list

# Show outdated packages
npm outdated

# Show npm config
npm config list

# Verbose output
npm install --verbose
npm run backend --verbose

# Debug Metro bundler
METRO_LOG_LEVEL=debug npm run start-web:local

# Debug Node.js
node --inspect-brk ./node_modules/tsx/dist/cli.mjs backend/server-mock.ts
```

---

## Performance Optimization

```bash
# Set Node memory limit
set NODE_OPTIONS=--max-old-space-size=4096
npm install --legacy-peer-deps

# For TypeScript compilation
node --max-old-space-size=8192 ./node_modules/typescript/lib/tsc.js -p tsconfig.json

# Force single-threaded
npm install --no-package-lock
```

---

## CI/CD Commands

```bash
# For GitHub Actions or CI
npm ci --legacy-peer-deps  # Clean install from lock file
npm run typecheck          # Type check
npm run lint              # Lint
npm test -- --coverage    # Test with coverage
```

---

## Metadata Commands

```bash
# Show project version
npm pkg get version

# Show project name
npm pkg get name

# Show all metadata
npm pkg get

# Update version
npm version major  # 2.5.8 -> 3.0.0
npm version minor  # 2.5.8 -> 2.6.0
npm version patch  # 2.5.8 -> 2.5.9
```

---

## Help & Documentation

```bash
# Help for npm
npm help
npm help install
npm help run

# Help for npx
npx --help

# Version info
npm --version
node --version

# Package info
npm info react
npm info typescript

# List scripts
npm run  # Lists all available scripts
```

---

## Troubleshooting Commands

```bash
# Test backend health
curl http://localhost:3000/health

# Test if port is in use
netstat -ano | findstr :3000

# Find and kill process on port
taskkill /PID <PID> /F

# Check Node installation
where node
where npm

# Verify npm cache
npm cache verify

# Clear everything
npm cache clean --force
npm install --force

# Update npm itself
npm install -g npm@latest
```

---

## Advanced Commands

```bash
# Create production bundle
expo export -p web

# Build for all platforms
expo run:android && expo run:ios

# Run load tests (if configured)
npm run load-tests

# Generate OpenAPI docs
npm run openapi:lint

# Database verification
node test-db-verify.ts

# Type generation from supabase (if using)
npx supabase gen types
```

---

## Quick Reference CheatSheet

| Task | Command |
|------|---------|
| **Install** | `npm install --legacy-peer-deps` |
| **Backend** | `npm run backend` |
| **Frontend** | `npm run start-web:local` |
| **Type Check** | `npm run typecheck` |
| **Test** | `npm test` |
| **Lint** | `npm run lint` |
| **All Scripts** | `npm run` |
| **Help** | `npm help` |

---

## Tips & Tricks

### Faster Installation
```bash
# Use npm ci instead of install
npm ci --legacy-peer-deps
```

### Faster Linting
```bash
# Lint only changed files
npm run lint -- --diff
```

### Watch Mode Testing
```bash
npm test -- --watch
```

### Rebuild Native Modules
```bash
npm rebuild
```

### Check for Security Issues
```bash
npm audit
npm audit fix
```

---

## MacOS/Linux Equivalents

Most commands work the same, but:

```bash
# Kill process on port (macOS/Linux)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Clear cache
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

---

**Last Updated**: March 13, 2026
**Version**: 2.5.8
**Status**: Complete reference ✅
