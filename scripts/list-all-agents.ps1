# List all agent names by department
$basePath = "c:/Users/shaida/Desktop/kaytx-full-app/app/ai-agent"
$departments = Get-ChildItem -Path $basePath -Directory

foreach ($dept in $departments) {
    $agentFiles = Get-ChildItem -Path $dept.FullName -Filter "*.tsx" | Where-Object { $_.Name -ne "index.tsx" }
    $count = $agentFiles.Count
    Write-Host "=== $dept.Name ($count agents) ==="
    foreach ($file in $agentFiles) {
        Write-Host "  - $($file.Name -replace '.tsx', '')"
    }
    Write-Host ""
}