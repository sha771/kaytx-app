# Script to update all department headers to 120 agents
$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8

# Replace all agent counts with 120
$content = $content -replace '\(\d+ agents\)', '(120 agents)'

Set-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Value $content -Encoding UTF8

Write-Host "Updated all department headers to show 120 agents"
