# Script to expand all department agent lists to 120 agents
$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== EXPANDING ALL DEPARTMENTS TO 120 AGENTS ===" -ForegroundColor Cyan

# Function to generate additional agent names
function Generate-AdditionalAgents($deptName, $currentCount, $targetCount) {
    $needed = $targetCount - $currentCount
    if ($needed -le 0) { return @() }
    
    $prefixes = @("AI Neural", "AI Predictive", "AI Real-Time", "AI Cognitive", "AI Adaptive", "AI Intelligent", "AI Automated", "AI Deep Learning", "AI Machine Learning", "AI Natural Language", "AI Computer Vision", "AI Quantum", "AI Blockchain", "AI Edge Computing", "AI IoT", "AI Cloud", "AI Cybersecurity", "AI Data Science", "AI Analytics", "AI Automation")
    $roles = @("Specialist", "Analyst", "Manager", "Coordinator", "Engineer", "Developer", "Architect", "Consultant", "Advisor", "Strategist", "Optimizer", "Monitor", "Auditor", "Validator", "Tester", "Administrator", "Operator", "Facilitator", "Supervisor", "Lead")
    
    $agents = @()
    for ($i = 0; $i -lt $needed; $i++) {
        $prefix = $prefixes[$i % $prefixes.Count]
        $role = $roles[$i % $roles.Count]
        $agent = "$prefix $deptName $role"
        $agents += $agent
    }
    return $agents
}

$newLines = @()
$i = 0
while ($i -lt $lines.Count) {
    $line = $lines[$i]
    
    if ($line -match '^### \d+\. (.+?) \(120 agents\)$') {
        $deptName = $matches[1]
        $newLines += $line
        $i++
        
        if ($i -lt $lines.Count) {
            $agentLine = $lines[$i]
            # Remove bold markers and split
            $cleanLine = $agentLine -replace '\*\*', ''
            $currentAgents = $cleanLine -split ',\s*'
            $currentCount = $currentAgents.Count
            
            Write-Host "${deptName}: Current ${currentCount} agents"
            
            if ($currentCount -lt 120) {
                $newAgents = Generate-AdditionalAgents $deptName $currentCount 120
                $agentLine = $cleanLine + ", " + ($newAgents -join ', ')
                $agentLine = "**" + $agentLine + "**"
                Write-Host "  Added $($newAgents.Count) agents to reach 120"
            } elseif ($currentCount -gt 120) {
                $agentLine = ($currentAgents[0..119] -join ', ')
                $agentLine = "**" + $agentLine + "**"
                Write-Host "  Removed $($currentCount - 120) agents to reach 120"
            } else {
                $agentLine = "**" + $cleanLine + "**"
                Write-Host "  Already at 120 agents"
            }
            
            $newLines += $agentLine
        }
    } else {
        $newLines += $line
    }
    $i++
}

$newContent = $newLines -join [Environment]::NewLine
Set-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Value $newContent -Encoding UTF8

Write-Host "Completed expanding all departments to 120 agents"
