# Script to remove 5 department sections from ULTIMATE_DEPARTMENTS_AGENTS.md
# Departments to remove: CONSULTING & ADVISORY, REAL ESTATE DEVELOPMENT, LOGISTICS & WAREHOUSING

$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

$departmentsToRemove = @(
    "CONSULTING & ADVISORY",
    "REAL ESTATE DEVELOPMENT", 
    "LOGISTICS & WAREHOUSING"
)

$newLines = @()
$skipNext = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $shouldSkip = $false
    
    foreach ($dept in $departmentsToRemove) {
        if ($line -match "^## $dept") {
            $shouldSkip = $true
            $skipNext = $true
            Write-Host "Found department to remove: $dept at line $i"
            break
        }
    }
    
    if (-not $shouldSkip -and -not $skipNext) {
        $newLines += $line
    }
    
    if ($skipNext) {
        $skipNext = $false
    }
}

$newContent = $newLines -join [Environment]::NewLine
Set-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Value $newContent -Encoding UTF8

Write-Host "Removed 3 department sections from file"
