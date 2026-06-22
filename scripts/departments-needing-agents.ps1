# Departments that need agents to reach 120 maximum
$departmentsNeedingAgents = @{
    "executive" = 61        # Current: 59, Need: 61 more
    "accounting" = 95       # Current: 25, Need: 95 more
    "engineering" = 76      # Current: 44, Need: 76 more
    "customer-experience" = 12  # Current: 108, Need: 12 more
    "hr" = 47              # Current: 73, Need: 47 more
    "data-intelligence" = 60   # Current: 60, Need: 60 more
    "product" = 4          # Current: 116, Need: 4 more
    "research" = 39        # Current: 81, Need: 39 more
    "administrative" = 7    # Current: 113, Need: 7 more
    "trading-investments" = 55  # Current: 65, Need: 55 more
    "real-estate" = 61      # Current: 59, Need: 61 more
    "healthcare" = 8        # Current: 112, Need: 8 more
    "manufacturing" = 10    # Current: 110, Need: 10 more
    "transportation" = 11   # Current: 109, Need: 11 more
    "government" = 57      # Current: 63, Need: 57 more
    "ai-management-governance" = 60  # Current: 60, Need: 60 more
}

Write-Host "Departments needing additional agents:" -ForegroundColor Yellow
$totalNeeded = 0
foreach ($dept in $departmentsNeedingAgents.Keys) {
    $needed = $departmentsNeedingAgents[$dept]
    $totalNeeded += $needed
    Write-Host "$dept : needs $needed more agents"
}

Write-Host "`nTotal agents needed: $totalNeeded" -ForegroundColor Green
Write-Host "This will bring all departments to maximum 120 agents each."