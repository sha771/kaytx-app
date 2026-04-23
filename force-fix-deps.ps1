# Force fix for corrupted dependencies
$ErrorActionPreference = "Stop"

Write-Host "=== KayTX Dependency Force Fix ===" -ForegroundColor Cyan

# Step 1: Kill any running npm/node processes that might be locking files
Write-Host "`n[1/6] Stopping conflicting processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "npm" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 2: Clean npm cache forcefully
Write-Host "`n[2/6] Cleaning npm cache..." -ForegroundColor Yellow
try {
    npm cache clean --force 2>&1 | Out-Null
    Write-Host "✓ npm cache cleaned" -ForegroundColor Green
} catch {
    Write-Host "⚠ npm cache clean failed, continuing anyway" -ForegroundColor Yellow
}

# Step 3: Remove corrupted node_modules
Write-Host "`n[3/6] Removing corrupted node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    # If that fails, use rimraf
    if (Test-Path "node_modules") {
        npx rimraf node_modules 2>&1 | Out-Null
    }
    Write-Host "✓ node_modules removed" -ForegroundColor Green
}

# Step 4: Remove lock files
Write-Host "`n[4/6] Removing lock files..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force
    Write-Host "✓ package-lock.json removed" -ForegroundColor Green
}
if (Test-Path ".eslintcache") {
    Remove-Item -Path ".eslintcache" -Force
    Write-Host "✓ .eslintcache removed" -ForegroundColor Green
}

# Step 5: Try installing with different registry mirror
Write-Host "`n[5/6] Installing dependencies (this may take a while)..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--max-old-space-size=8192"
$env:npm_config_cache = "$env:TEMP\npm-cache-fix"

# Try normal install first
$installSuccess = $false
try {
    npm install --no-optional --prefer-offline 2>&1 | Out-Host
    $installSuccess = $true
} catch {
    Write-Host "⚠ First install attempt failed, retrying..." -ForegroundColor Yellow
}

if (-not $installSuccess) {
    try {
        npm install --legacy-peer-deps 2>&1 | Out-Host
        $installSuccess = $true
    } catch {
        Write-Host "✗ All install attempts failed" -ForegroundColor Red
    }
}

if ($installSuccess) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
}

# Step 6: Verify critical packages
Write-Host "`n[6/6] Verifying critical packages..." -ForegroundColor Yellow
$criticalPackages = @("mime-db", "es-abstract", "drizzle-orm", "express")
$allGood = $true

foreach ($pkg in $criticalPackages) {
    $pkgPath = "node_modules\$pkg"
    if (Test-Path $pkgPath) {
        Write-Host "  ✓ $pkg" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $pkg (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

if ($allGood) {
    Write-Host "`n=== ALL FIXES COMPLETED SUCCESSFULLY ===" -ForegroundColor Green
    Write-Host "You can now run: npm run backend" -ForegroundColor Cyan
} else {
    Write-Host "`n=== SOME PACKAGES STILL MISSING ===" -ForegroundColor Yellow
    Write-Host "Try running: npm install --force" -ForegroundColor Cyan
}
