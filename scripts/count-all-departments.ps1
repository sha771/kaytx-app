# Script to count agents in all departments
$basePath = "c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent"
$departments = Get-ChildItem -Path $basePath -Directory | Where-Object { $_.Name -ne 'components' -and $_.Name -notlike '*.md' -and $_.Name -notlike '*.tsx' }

Write-Host "Department Agent Count Report" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

$results = @()

foreach ($dept in $departments) {
    $agentCount = (Get-ChildItem -Path $dept.FullName -Filter "*.tsx" -Recurse -ErrorAction SilentlyContinue | Measure-Object).Count
    $results += [PSCustomObject]@{
        Department = $dept.Name
        AgentCount = $agentCount
    }
    Write-Host "$($dept.Name): $agentCount agents"
}

Write-Host "`nSummary:" -ForegroundColor Yellow
$totalAgents = ($results | Measure-Object -Property AgentCount -Sum).Sum
Write-Host "Total Departments: $($results.Count)"
Write-Host "Total Agents: $totalAgents"

# Export to CSV
$results | Export-Csv -Path "c:/Users/shaida/Desktop/kaytx-full-app/scripts/department-counts.csv" -NoTypeInformation
Write-Host "Results exported to scripts/department-counts.csv" -ForegroundColor Cyan