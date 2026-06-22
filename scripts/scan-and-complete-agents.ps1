# Script to scan all departments and complete agent lists to max 120 agents per department
# Target: 37 departments with max 120 agents each

$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== CURRENT DEPARTMENT ANALYSIS ===" -ForegroundColor Cyan
Write-Host "Total departments currently: 42"
Write-Host "Target departments: 37"
Write-Host "Target agents per department: 120"
Write-Host ""

$departments = @()
for ($i = 20; $i -le 63; $i++) {
    if ($lines[$i] -match '^(.+?) \((\d+) agents\)$') {
        $deptName = $matches[1]
        $targetCount = [int]$matches[2]
        $departments += @{
            Name = $deptName
            Target = $targetCount
            LineIndex = $i
        }
    }
}

Write-Host "=== DEPARTMENTS TO ANALYZE ===" -ForegroundColor Yellow
foreach ($dept in $departments) {
    $lineIndex = $dept.LineIndex + 48  # Adjust for section headers
    if ($lineIndex -lt $lines.Count) {
        $agentLine = $lines[$lineIndex]
        $actualCount = ($agentLine -split ',').Count
        $diff = 120 - $actualCount
        $status = if ($diff -gt 0) { "Need +$diff agents" } elseif ($diff -lt 0) { "Need $($diff) agents" } else { "OK" }
        Write-Host "$($dept.Name): Target $($dept.Target), Actual $actualCount, Max 120 - $status"
    }
}

Write-Host ""
Write-Host "=== DEPARTMENTS TO REMOVE (5 departments) ===" -ForegroundColor Red
Write-Host "Need to remove 5 departments to get from 42 to 37"
Write-Host "Suggested departments to remove (those with lowest strategic importance):"
Write-Host "- Cross-Department Integration (29 agents)"
Write-Host "- Predictive Analytics (92 agents)"
Write-Host "- Consulting & Advisory (100 agents)"
Write-Host "- Real Estate Development (105 agents)"
Write-Host "- Logistics & Warehousing (125 agents)"
