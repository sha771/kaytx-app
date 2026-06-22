# Core 37 departments analysis for 120 agent maximum
$coreDepartments = @{
    "executive" = 89
    "accounting" = 163
    "engineering" = 74
    "marketing" = 215
    "sales" = 182
    "customer-experience" = 13
    "operations" = 218
    "hr" = 179
    "legal" = 236
    "data-intelligence" = 61
    "data" = 187
    "product" = 176
    "security" = 130
    "research" = 144
    "administrative" = 145
    "trading-investments" = 66
    "real-estate" = 307
    "real-estate-development" = 120
    "insurance" = 188
    "healthcare" = 172
    "manufacturing" = 173
    "transportation" = 172
    "government" = 130
    "logistics-warehousing" = 250
    "architecture-design" = 192
    "analytics-insights" = 178
    "consulting-advisory" = 120
    "ai-management-governance" = 61
    "technology" = 247
    "finance" = 120
    "professional-services" = 120
    "ai-governance" = 150
    "banking-finance" = 120
    "energy-utilities" = 120
    "human-resources" = 61
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