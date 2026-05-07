# Scan all .tsx files in app/ai-agent
$baseDir = "c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent"
$allFiles = Get-ChildItem -Path $baseDir -Recurse -Filter "*.tsx" | Select-Object -ExpandProperty FullName

# Create a normalized lookup set
$fileLookup = @()
foreach ($file in $allFiles) {
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($file)
    $fileLookup += $fileName.ToLower()
}

# Read the agent table
$agentFile = "c:\Users\shaida\Desktop\kaytx-full-app\shaida the agents lib by shaida\ai agents 1108"
$content = Get-Content $agentFile -Raw
$lines = $content -split "`n"
$result = @()

# Function to normalize agent name to file name
function Get-FileNameFromAgent($agentName) {
    # Remove "AI " prefix
    $name = $agentName -replace '^AI\s+', ''
    # Convert to lowercase
    $name = $name.ToLower()
    # Replace special characters
    $name = $name -replace '[&/\\]', ''
    # Replace spaces and special chars with hyphens
    $name = $name -replace '[\s,().''\""]+', '-'
    # Remove multiple consecutive hyphens
    $name = $name -replace '-+', '-'
    # Trim hyphens from ends
    $name = $name.Trim('-')
    return $name
}

foreach ($line in $lines) {
    $trimmed = $line.TrimEnd()
    
    # Keep non-data lines as-is
    if ($trimmed -notmatch '^\|.*\|$' -or $trimmed -match '^\|[-]') {
        $result += $trimmed
        continue
    }
    
    # Extract agent name from the line
    # Pattern: | No. | Agent Name | Main Agent | Sub Agents | Status |
    if ($trimmed -match '^\|\s*\d+\s*\|\s*([^|]+)\|') {
        $agentName = $matches[1].Trim()
        $fileName = Get-FileNameFromAgent $agentName
        
        # Check if file exists
        $hasFile = $fileLookup -contains $fileName
        
        # Determine the status marker
        if ($hasFile) {
            $status = "✅"
        } else {
            $status = "❌"
        }
        
        # Update the line - replace any existing status with new one
        # Pattern: ends with | N/A | ✅ | or | N/A | ❌ | or just add status
        if ($trimmed -match '\|\s*N/A\s*\|\s*[✅❌✓]?\s*\|$') {
            # Sub-agent line with N/A
            $trimmed = $trimmed -replace '\|\s*N/A\s*\|\s*[✅❌✓]?\s*\|$', "| N/A | $status |"
        }
        elseif ($trimmed -match '\|\s*[✅❌✓]\s*\|$') {
            # Line with existing status marker
            $trimmed = $trimmed -replace '\|\s*[✅❌✓]\s*\|$', "| $status |"
        }
        else {
            # Line without status - add it
            $trimmed = $trimmed + " $status |"
        }
    }
    
    $result += $trimmed
}

# Write back
$result -join "`n" | Set-Content $agentFile -NoNewline

Write-Host "Scan complete! Agents marked with:"
Write-Host "  ✅ = Full page exists"
Write-Host "  ❌ = Full page NOT found"
Write-Host ""
Write-Host "Total files scanned: $($fileLookup.Count)"
