# Generate complete agent directory with all agents and their descriptions
$basePath = "app/ai-agent"
$outputFile = "COMPLETE_AGENT_DIRECTORY.md"
$departments = Get-ChildItem -Path $basePath -Directory

$output = "# COMPLETE AI AGENT DIRECTORY`r`n"
$output += "## All 6,521 Agent Names with Descriptions by Department`r`n`r`n"
$output += "**Generated:** June 24, 2026`r`n"
$output += "**Total Departments:** $($departments.Count)`r`n"
$output += "**Total Agents:** 6,521`r`n`r`n"
$output += "---`r`n`r`n"

# Create index of departments by letter
$letterGroups = @{}
foreach ($dept in $departments) {
    $firstLetter = $dept.Name.Substring(0,1).ToUpper()
    if (-not $letterGroups.ContainsKey($firstLetter)) {
        $letterGroups[$firstLetter] = @()
    }
    $letterGroups[$firstLetter] += $dept.Name
}

$sortedLetters = $letterGroups.Keys | Sort-Object
$output += "## INDEX OF DEPARTMENTS`r`n`r`n"
$output += ($sortedLetters -join " | ") + "`r`n`r`n"
$output += "---`r`n`r`n"

$grandTotal = 0

# Function to extract description from TSX file
function Get-AgentDescription {
    param($filePath)
    $content = Get-Content $filePath -ErrorAction SilentlyContinue | Out-String
    if ($content -match 'description:\s*[''"]([^''"]+)[''"]') {
        return $matches[1]
    }
    return "Description not available"
}

# Process each letter group
foreach ($letter in $sortedLetters) {
    $output += "## $letter`r`n`r`n"
    
    foreach ($dept in ($letterGroups[$letter] | Sort-Object)) {
        # Get all TSX files in this department (including subdirectories)
        $deptPath = Join-Path $basePath $dept
        $agentFiles = Get-ChildItem -Path $deptPath -Filter "*.tsx" -Recurse | Where-Object { 
            $_.Name -ne "index.tsx" -and 
            $_.Name -ne "[id].tsx" -and 
            $_.Name -ne "_layout.tsx" -and
            $_.Name -ne "[categoryId].tsx" -and
            $_.Name -ne "[agentId].tsx"
        }
        
        $count = $agentFiles.Count
        $grandTotal += $count
        
        $output += "### $($dept.ToUpper()) ($count agents)`r`n"
        
        foreach ($file in ($agentFiles | Sort-Object Name)) {
            $agentName = $file.Name -replace '.tsx', ''
            $description = Get-AgentDescription $file.FullName
            $output += "- **$agentName**: $description`r`n"
        }
        
        $output += "`r`n"
    }
}

$output += "---`r`n`r`n"
$output += "**GRAND TOTAL: $grandTotal AGENTS**`r`n"
$output += "**DEPARTMENTS: $($departments.Count)**"

$output | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Complete agent directory with descriptions generated to: $outputFile"
Write-Host "Total agents: $grandTotal"
Write-Host "Total departments: $($departments.Count)"