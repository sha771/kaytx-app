# Reorganize CSV file by department number (1-80)
$csvPath = 'C:\Users\shaida\Desktop\kaytx-full-app\work-and-uses-of-ai-agents.csv'
$content = Get-Content $csvPath -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine) | Where-Object { $_.Trim() -ne '' }

# Separate header and data
$header = $lines[0]
$dataLines = $lines[1..($lines.Length - 1)]

# Parse department number and agent name from each line
$parsedLines = @()
foreach ($line in $dataLines) {
    if ($line -match '^DEPT (\d+) - (.+?),([^,]+),') {
        $deptNum = [int]$Matches[1]
        $deptName = $Matches[2]
        $agentName = $Matches[3]
        $parsedLines += [PSCustomObject]@{
            DeptNum = $deptNum
            DeptName = $deptName
            AgentName = $agentName
            FullLine = $line
        }
    }
}

# Remove duplicates within same department (keep first occurrence)
$uniqueLines = @()
$seen = @{}
foreach ($parsed in $parsedLines) {
    $key = "$($parsed.DeptNum)-$($parsed.AgentName)"
    if (-not $seen.ContainsKey($key)) {
        $seen[$key] = $true
        $uniqueLines += $parsed
    }
}

# Sort by department number (1-80), then by agent name
$sortedLines = $uniqueLines | Where-Object { $_.DeptNum -ge 1 -and $_.DeptNum -le 80 } | Sort-Object { $_.DeptNum }, { $_.AgentName }

# Build output
$output = @()
$output += $header
foreach ($sorted in $sortedLines) {
    $output += $sorted.FullLine
}

# Write output
$output -join [Environment]::NewLine | Set-Content $csvPath -Encoding UTF8 -NoNewline

Write-Host "Done! Total lines: $($output.Count) (1 header + $($output.Count - 1) agents)"
Write-Host "Departments covered: $(($sortedLines | Select-Object -ExpandProperty DeptNum -Unique | Measure-Object).Count)"
