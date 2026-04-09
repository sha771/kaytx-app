# Platform Cleanup Script
# Removes duplicate files, old reports, and unnecessary artifacts
# Run with: .\scripts\platform-cleanup.ps1 -DryRun (to preview)
# Run with: .\scripts\platform-cleanup.ps1 -Execute (to actually delete)

param(
    [switch]$DryRun = $true,
    [switch]$Execute = $false
)

$ErrorActionPreference = "Stop"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Platform Cleanup Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun -and -not $Execute) {
    Write-Host "DRY RUN MODE - No files will be deleted" -ForegroundColor Yellow
    Write-Host "Run with -Execute to actually delete files" -ForegroundColor Yellow
    Write-Host ""
}

$totalSaved = 0
$filesDeleted = 0

function Get-DirectorySize {
    param([string]$Path)
    if (Test-Path $Path) {
        try {
            $size = (Get-ChildItem -Path $Path -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
            return [math]::Round($size / 1MB, 2)
        } catch {
            return 0
        }
    }
    return 0
}

function Remove-ItemSafely {
    param(
        [string]$Path,
        [string]$Description
    )
    
    if (Test-Path $Path) {
        $size = Get-DirectorySize $Path
        
        if ($Execute) {
            Write-Host "  [DELETE] $Description" -ForegroundColor Red
            Remove-Item -Path $Path -Recurse -Force
            $script:totalSaved += $size
            $script:filesDeleted++
        } else {
            Write-Host "  [WOULD DELETE] $Description ($size MB)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [SKIP] $Description (not found)" -ForegroundColor Gray
    }
}

# 1. Remove duplicate Kubernetes directory
Write-Host "1. Removing duplicate Kubernetes configs..." -ForegroundColor Cyan
Remove-ItemSafely -Path "k8s" -Description "k8s/ directory (keeping kubernetes/)"

# 2. Remove duplicate OpenAPI specs
Write-Host ""
Write-Host "2. Removing duplicate OpenAPI specs..." -ForegroundColor Cyan
Remove-ItemSafely -Path "openapi-complete.yaml" -Description "openapi-complete.yaml"
Remove-ItemSafely -Path "openapi-comprehensive.yaml" -Description "openapi-comprehensive.yaml"
Remove-ItemSafely -Path "openapi-enhanced.yaml" -Description "openapi-enhanced.yaml"
Remove-ItemSafely -Path "docs/OPENAPI_ENHANCED.yaml" -Description "docs/OPENAPI_ENHANCED.yaml"

# 3. Remove old compliance reports
Write-Host ""
Write-Host "3. Removing old compliance reports..." -ForegroundColor Cyan
if (Test-Path "reports") {
    $reports = Get-ChildItem -Path "reports" -Filter "compliance_report_*"
    foreach ($report in $reports) {
        Remove-ItemSafely -Path $report.FullName -Description "reports/$($report.Name)"
    }
}

# 4. Remove generated directories (if in git)
Write-Host ""
Write-Host "4. Checking generated directories..." -ForegroundColor Cyan
if (Test-Path "coverage") {
    $coverageSize = Get-DirectorySize "coverage"
    Write-Host "  [INFO] coverage/ exists ($coverageSize MB) - should be in .gitignore" -ForegroundColor Yellow
}
if (Test-Path "dist") {
    $distSize = Get-DirectorySize "dist"
    Write-Host "  [INFO] dist/ exists ($distSize MB) - should be in .gitignore" -ForegroundColor Yellow
}

# 5. Check for sensitive files
Write-Host ""
Write-Host "5. Checking for sensitive files..." -ForegroundColor Cyan
$sensitiveFiles = @(".env", ".env.local", ".env.production")
foreach ($file in $sensitiveFiles) {
    if (Test-Path $file) {
        Write-Host "  [WARNING] $file exists - SHOULD NOT BE IN GIT!" -ForegroundColor Red
        Write-Host "    Run: git rm --cached $file" -ForegroundColor Yellow
        Write-Host "    Then add to .gitignore" -ForegroundColor Yellow
    }
}

# 6. Remove duplicate service files
Write-Host ""
Write-Host "6. Checking duplicate service files..." -ForegroundColor Cyan
$duplicates = @(
    @{Path="backend/services/gdpr-service-simple.ts"; Keep="backend/services/gdpr-service.ts"},
    @{Path="backend/services/compliance-reporting.ts"; Keep="backend/services/compliance-reporting-service.ts"},
    @{Path="backend/services/campaign-analytics.ts"; Keep="backend/services/campaign-analytics-service.ts"}
)

foreach ($dup in $duplicates) {
    if ((Test-Path $dup.Path) -and (Test-Path $dup.Keep)) {
        Write-Host "  [INFO] Found duplicate: $($dup.Path)" -ForegroundColor Yellow
        Write-Host "    Consider merging with: $($dup.Keep)" -ForegroundColor Yellow
    }
}

# 7. Remove test scripts from root
Write-Host ""
Write-Host "7. Removing manual test scripts from root..." -ForegroundColor Cyan
$testScripts = @(
    "test-email.js",
    "test-email-simple.js",
    "test-emails.js",
    "test-memorydb.js"
)

foreach ($script in $testScripts) {
    Remove-ItemSafely -Path $script -Description $script
}

# 8. Archive old documentation
Write-Host ""
Write-Host "8. Checking old documentation files..." -ForegroundColor Cyan
$oldDocs = @(
    "AUDIT_SUMMARY.txt",
    "ENTERPRISE_AUDIT_REPORT.md",
    "QUICK_START_FIXES.md",
    "README_AUDIT.md",
    "START_HERE.md"
)

# Create archive directory if needed
if ($Execute -and -not (Test-Path ".kiro/archive")) {
    New-Item -Path ".kiro/archive" -ItemType Directory -Force | Out-Null
    Write-Host "  [CREATE] .kiro/archive/ directory" -ForegroundColor Green
}

foreach ($doc in $oldDocs) {
    if (Test-Path $doc) {
        if ($Execute) {
            Write-Host "  [MOVE] $doc to .kiro/archive/" -ForegroundColor Yellow
            Move-Item -Path $doc -Destination ".kiro/archive/" -Force
        } else {
            Write-Host "  [WOULD MOVE] $doc to .kiro/archive/" -ForegroundColor Yellow
        }
    }
}

# 9. Update .gitignore
Write-Host ""
Write-Host "9. Checking .gitignore..." -ForegroundColor Cyan

$gitignoreEntries = @(
    "# Environment files",
    ".env",
    ".env.local",
    ".env.production",
    "",
    "# Generated directories",
    "coverage/",
    "dist/",
    "",
    "# Old reports",
    "reports/compliance_report_*"
)

if (Test-Path ".gitignore") {
    $currentGitignore = Get-Content ".gitignore" -Raw
    $needsUpdate = $false
    
    foreach ($entry in $gitignoreEntries) {
        if ($entry -ne "" -and -not $entry.StartsWith("#") -and -not $currentGitignore.Contains($entry)) {
            $needsUpdate = $true
            break
        }
    }
    
    if ($needsUpdate) {
        if ($Execute) {
            Write-Host "  [UPDATE] .gitignore with missing entries" -ForegroundColor Green
            Add-Content -Path ".gitignore" -Value "`n# Added by cleanup script"
            foreach ($entry in $gitignoreEntries) {
                Add-Content -Path ".gitignore" -Value $entry
            }
        } else {
            Write-Host "  [WOULD UPDATE] .gitignore with missing entries" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [OK] .gitignore is up to date" -ForegroundColor Green
    }
}

# Summary
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Cleanup Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

if ($Execute) {
    Write-Host "Files deleted: $filesDeleted" -ForegroundColor Green
    Write-Host "Disk space saved: $totalSaved MB" -ForegroundColor Green
} else {
    Write-Host "This was a DRY RUN - no files were deleted" -ForegroundColor Yellow
    Write-Host "Run with -Execute to actually delete files" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the changes above" -ForegroundColor White
Write-Host "2. Run with -Execute to apply changes" -ForegroundColor White
Write-Host "3. Commit changes to git" -ForegroundColor White
Write-Host "4. Remove sensitive files from git history if needed:" -ForegroundColor White
Write-Host "   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env .env.local .env.production' --prune-empty --tag-name-filter cat -- --all" -ForegroundColor Gray
Write-Host ""
