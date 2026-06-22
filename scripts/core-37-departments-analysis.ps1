# Core 37 departments analysis for 120 agent maximum
$coreDepartments = @{
    "executive" = 64
    "accounting" = 30
    "engineering" = 59
    "marketing" = 154
    "sales" = 121
    "customer-experience" = 108
    "operations" = 158
    "hr" = 77
    "legal" = 176
    "data-intelligence" = 60
    "data" = 126
    "product" = 116
    "security" = 130
    "research" = 81
    "administrative" = 113
    "trading-investments" = 65
    "real-estate" = 59
    "real-estate-development" = 107
    "insurance" = 128
    "healthcare" = 112
    "manufacturing" = 110
    "transportation" = 109
    "government" = 67
    "logistics-warehousing" = 249
    "architecture-design" = 192
    "analytics-insights" = 178
    "consulting-advisory" = 115
    "ai-management-governance" = 60
    "technology" = 108
    "finance" = 120
    "professional-services" = 119
    "ai-governance" = 115
    "banking-finance" = 120
    "energy-utilities" = 120
    "human-resources" = 85
    "agriculture" = 120
}

Write-Host "CORE 37 DEPARTMENTS - 120 AGENT MAXIMUM ANALYSIS" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

$departmentsNeedingAgents = @{}
$totalNeeded = 0
$totalExcess = 0

foreach ($dept in $coreDepartments.Keys) {
    $current = $coreDepartments[$dept]
    if ($current -lt 120) {
        $needed = 120 - $current
        $departmentsNeedingAgents[$dept] = $needed
        $totalNeeded += $needed
        Write-Host "$dept : $current/120 (needs $needed more)" -ForegroundColor Yellow
    } elseif ($current -gt 120) {
        $excess = $current - 120
        $totalExcess += $excess
        Write-Host "$dept : $current/120 (excess of $excess)" -ForegroundColor Cyan
    } else {
        Write-Host "$dept : $current/120 (perfect)" -ForegroundColor Green
    }
}

Write-Host "`nSUMMARY:" -ForegroundColor Magenta
Write-Host "Departments needing agents: $($departmentsNeedingAgents.Count)" -ForegroundColor Yellow
Write-Host "Total agents needed: $totalNeeded" -ForegroundColor Yellow
Write-Host "Total excess agents: $totalExcess" -ForegroundColor Cyan
$currentTotal = ($coreDepartments.Values | Measure-Object -Sum).Sum
Write-Host "Current total agents: $currentTotal" -ForegroundColor White
Write-Host "Target total agents (37 * 120): $((37 * 120))" -ForegroundColor Green

# Export departments needing agents
$departmentsNeedingAgents.GetEnumerator() | ForEach-Object {
    [PSCustomObject]@{
        Department = $_.Key
        CurrentCount = $coreDepartments[$_.Key]
        Needed = $_.Value
    }
} | Export-Csv -Path "c:/Users/shaida/Desktop/kaytx-full-app/scripts/departments-needing-agents-detailed.csv" -NoTypeInformation

Write-Host "Detailed analysis exported to scripts/departments-needing-agents-detailed.csv" -ForegroundColor Cyan