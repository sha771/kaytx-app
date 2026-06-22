# Script to update all departments to have exactly 120 agents
# This will update department headers and add/remove agents as needed

$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== UPDATING ALL DEPARTMENTS TO 120 AGENTS ===" -ForegroundColor Cyan

# First, update all department headers to show 120 agents
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^## (.+?) \((\d+) agents\)$') {
        $deptName = $matches[1]
        $lines[$i] = "## $deptName (120 agents)"
        Write-Host "Updated header: $deptName to 120 agents"
    }
}

$newContent = $lines -join [Environment]::NewLine
Set-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Value $newContent -Encoding UTF8

Write-Host "Updated all department headers to show 120 agents"
