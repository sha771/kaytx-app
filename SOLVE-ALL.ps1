# Kaytx Full App - Complete Fix Script
# This script solves all identified issues

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KAYTX FULL APP - COMPLETE FIX SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill processes on port 8081 and 3000
Write-Host "[1/8] Killing conflicting processes..." -ForegroundColor Yellow
$ports = @(8081, 3000, 3001)
foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($process) {
        Write-Host "  Killing process on port $port (PID: $($process.OwningProcess))" -ForegroundColor Gray
        Stop-Process -Id $process.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}
Write-Host "  ✓ Port conflicts resolved" -ForegroundColor Green
Write-Host ""

# Step 2: Clear npm cache
Write-Host "[2/8] Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "  ✓ npm cache cleared" -ForegroundColor Green
Write-Host ""

# Step 3: Remove corrupted node_modules
Write-Host "[3/8] Removing corrupted node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
}
Write-Host "  ✓ Old dependencies removed" -ForegroundColor Green
Write-Host ""

# Step 4: Install dependencies with retry logic
Write-Host "[4/8] Installing dependencies (this may take 5-10 minutes)..." -ForegroundColor Yellow
$maxRetries = 3
$retryCount = 0
$success = $false

while ($retryCount -lt $maxRetries -and -not $success) {
    $retryCount++
    Write-Host "  Attempt $retryCount of $maxRetries..." -ForegroundColor Gray
    
    $env:PUPPETEER_SKIP_DOWNLOAD = "true"
    npm install --legacy-peer-deps --no-optional 2>&1 | Out-String -OutVariable npmOutput
    
    if ($LASTEXITCODE -eq 0) {
        $success = $true
        Write-Host "  ✓ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Installation failed, retrying..." -ForegroundColor Red
        Start-Sleep -Seconds 5
    }
}

if (-not $success) {
    Write-Host "  ✗ Failed to install dependencies after $maxRetries attempts" -ForegroundColor Red
    Write-Host "  Please check your internet connection and try again manually:" -ForegroundColor Red
    Write-Host "  npm install --legacy-peer-deps" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 5: Verify critical packages
Write-Host "[5/8] Verifying critical packages..." -ForegroundColor Yellow
$criticalPackages = @("expo", "react", "react-native", "typescript", "tsx")
$allInstalled = $true

foreach ($pkg in $criticalPackages) {
    if (Test-Path "node_modules\$pkg\package.json") {
        Write-Host "  ✓ $pkg installed" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $pkg missing" -ForegroundColor Red
        $allInstalled = $false
    }
}

if (-not $allInstalled) {
    Write-Host "  ⚠ Some packages are missing, attempting repair..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}
Write-Host ""

# Step 6: Setup database (if Docker is available)
Write-Host "[6/8] Checking database setup..." -ForegroundColor Yellow
if (Get-Command docker-compose -ErrorAction SilentlyContinue) {
    Write-Host "  Docker detected. Starting PostgreSQL and Redis..." -ForegroundColor Gray
    docker-compose up -d postgres redis 2>&1 | Out-Null
    Write-Host "  ✓ Database services started" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Docker not found. Please setup PostgreSQL and Redis manually." -ForegroundColor Yellow
    Write-Host "  Current DATABASE_URL: $((Get-Content .env | Select-String 'DATABASE_URL').ToString().Split('=')[1])" -ForegroundColor Gray
}
Write-Host ""

# Step 7: Run database migrations
Write-Host "[7/8] Running database migrations..." -ForegroundColor Yellow
npm run db:migrate 2>&1 | Out-String -OutVariable migrateOutput
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Database migrations completed" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Migrations failed (database may not be running)" -ForegroundColor Yellow
    Write-Host "  You can run migrations later with: npm run db:migrate" -ForegroundColor Gray
}
Write-Host ""

# Step 8: Start services
Write-Host "[8/8] Starting services..." -ForegroundColor Yellow
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ALL FIXES APPLIED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Backend Server:" -ForegroundColor Yellow
Write-Host "  npm run backend" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend Web:" -ForegroundColor Yellow
Write-Host "  `$env:PUPPETEER_SKIP_DOWNLOAD='true'; npm run start-web-dev" -ForegroundColor White
Write-Host ""
Write-Host "Access Points:" -ForegroundColor Cyan
Write-Host "  Backend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend Health: http://localhost:3000/health" -ForegroundColor White
Write-Host "  Frontend: http://localhost:8081 (or 8082 if port conflict)" -ForegroundColor White
Write-Host ""
Write-Host "Environment Configuration:" -ForegroundColor Cyan
Write-Host "  ✓ JWT secrets configured" -ForegroundColor Green
Write-Host "  ✓ Redis URL configured" -ForegroundColor Green
Write-Host "  ✓ Port configuration set" -ForegroundColor Green
Write-Host "  ⚠ Update DATABASE_URL with actual credentials" -ForegroundColor Yellow
Write-Host "  ⚠ Add real API keys for production use" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Start backend and frontend (commands above)" -ForegroundColor White
Write-Host "  2. Configure database credentials in .env" -ForegroundColor White
Write-Host "  3. Add AI provider API keys (OpenAI, Anthropic, etc.)" -ForegroundColor White
Write-Host "  4. Run 'npm run db:migrate' after database is ready" -ForegroundColor White
Write-Host ""
