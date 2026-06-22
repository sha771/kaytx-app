$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== Agent Count Analysis ==="
Write-Host "Line 69 (CUSTOMER EXPERIENCE):" $lines[68].Split(',').Count "agents (target: 176)"
Write-Host "Line 75 (MARKETING):" $lines[74].Split(',').Count "agents (target: 215)"
Write-Host "Line 84 (TECHNOLOGY):" $lines[83].Split(',').Count "agents (target: 140)"
Write-Host "Line 87 (ENGINEERING):" $lines[86].Split(',').Count "agents (target: 90)"
Write-Host "Line 102 (SECURITY):" $lines[101].Split(',').Count "agents (target: 190)"
Write-Host "Line 105 (RESEARCH):" $lines[104].Split(',').Count "agents (target: 144)"
