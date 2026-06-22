# Generate complete agent names list to file
$basePath = "c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent"
$outputFile = "c:/Users/shaida/Desktop/kaytx-full-app/COMPLETE_AGENT_NAMES.txt"
$departments = Get-ChildItem -Path $basePath -Directory

$output = "COMPLETE AI AGENT NAMES LIST`r`n"
$output += "Total Departments: $($departments.Count)`r`n"
$output += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`r`n"
$output += "========================================`r`n`r`n"

$grandTotal = 0

foreach ($dept in $departments) {
    $agentFiles = Get-ChildItem -Path $dept.FullName -Filter "*.tsx" | Where-Object { $_.Name -ne "index.tsx" }
    $count = $agentFiles.Count
    $grandTotal += $count
    $output += "## $($dept.Name.ToUpper()) ($count agents)`r`n"
    foreach ($file in $agentFiles) {
        $agentName = $file.Name -replace '.tsx', ''
        $output += "  - $agentName`r`n"
    }
    $output += "`r`n"
}

$output += "========================================`r`n"
$output += "GRAND TOTAL: $grandTotal AGENTS`r`n"
$output += "DEPARTMENTS: $($departments.Count)`r`n"

$output | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Complete agent list generated to: $outputFile"
Write-Host "Total agents: $grandTotal"
Write-Host "Total departments: $($departments.Count)"