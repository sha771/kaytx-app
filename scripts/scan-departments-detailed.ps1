# Script to scan all departments and count actual agents
$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== DETAILED DEPARTMENT ANALYSIS ===" -ForegroundColor Cyan
Write-Host ""

# Department sections start at line 68 (index 67)
# Each department has a header line followed by agent line
$deptStartIndex = 67
$departments = @()

for ($i = $deptStartIndex; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^## (.+?) \((\d+) agents\)$') {
        $deptName = $matches[1]
        $targetCount = [int]$matches[2]
        $agentLineIndex = $i + 1
        
        if ($agentLineIndex -lt $lines.Count) {
            $agentLine = $lines[$agentLineIndex]
            $actualCount = ($agentLine -split ',').Count
            $diff = 120 - $actualCount
            $status = if ($diff -gt 0) { "Need +$diff agents" } elseif ($diff -lt 0) { "Remove $($diff) agents" } else { "OK" }
            
            $departments += @{
                Name = $deptName
                Target = $targetCount
                Actual = $actualCount
                Diff = $diff
                LineIndex = $i
                AgentLineIndex = $agentLineIndex
            }
            
            Write-Host "$($deptName): Target $targetCount, Actual $actualCount, Max 120 - $status"
        }
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Yellow
Write-Host "Total departments found: $($departments.Count)"
$needAgents = $departments | Where-Object { $_.Diff -gt 0 }
$removeAgents = $departments | Where-Object { $_.Diff -lt 0 }
$okDepts = $departments | Where-Object { $_.Diff -eq 0 }

Write-Host "Departments needing agents: $($needAgents.Count)"
Write-Host "Departments with excess agents: $($removeAgents.Count)"
Write-Host "Departments at target (120): $($okDepts.Count)"

$totalNeeded = ($needAgents | Measure-Object -Property Diff -Sum).Sum
$totalRemove = -($removeAgents | Measure-Object -Property Diff -Sum).Sum
Write-Host "Total agents to add: $totalNeeded"
Write-Host "Total agents to remove: $totalRemove"
