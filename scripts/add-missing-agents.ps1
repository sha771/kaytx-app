# Script to add missing agents to all departments to reach 120 agents
$content = Get-Content 'c:\Users\shaida\Desktop\kaytx-full-app\ULTIMATE_DEPARTMENTS_AGENTS.md' -Raw -Encoding UTF8
$lines = $content.Split([Environment]::NewLine)

Write-Host "=== ADDING MISSING AGENTS TO ALL DEPARTMENTS ===" -ForegroundColor Cyan

# Function to generate agent names based on department
function Generate-AgentNames($deptName, $count) {
    $prefixes = @("AI Neural", "AI Predictive", "AI Real-Time", "AI Cognitive", "AI Adaptive", "AI Intelligent", "AI Automated", "AI Deep Learning", "AI Machine Learning", "AI Natural Language", "AI Computer Vision", "AI Quantum", "AI Blockchain", "AI Edge Computing", "AI IoT", "AI Cloud", "AI Cybersecurity", "AI Data Science", "AI Analytics", "AI Automation")
    $roles = @("Specialist", "Analyst", "Manager", "Coordinator", "Engineer", "Developer", "Architect", "Consultant", "Advisor", "Strategist", "Optimizer", "Monitor", "Auditor", "Validator", "Tester", "Administrator", "Operator", "Facilitator", "Coordinator", "Supervisor")
    
    $agents = @()
    for ($i = 0; $i -lt $count; $i++) {
        $prefix = $prefixes[$i % $prefixes.Count]
        $role = $roles[$i % $roles.Count]
        $agent = "$prefix $deptName $role $i"
        $agents += $agent
    }
    return $agents
}

# Process each department
$newLines = @()
$i = 0
while ($i -lt $lines.Count) {
    $line = $lines[$i]
    
    if ($line -match '^## (.+?) \(120 agents\)$') {
        $deptName = $matches[1]
        $newLines += $line
        $i++
        
        if ($i -lt $lines.Count) {
            $agentLine = $lines[$i]
            $currentAgents = $agentLine -split ',\s*'
            $currentCount = $currentAgents.Count
            $needed = 120 - $currentCount
            
            if ($needed -gt 0) {
                Write-Host "${deptName}: Current ${currentCount}, Adding ${needed} agents"
                $newAgents = Generate-AgentNames $deptName $needed
                $agentLine = $agentLine + ", " + ($newAgents -join ', ')
            } elseif ($needed -lt 0) {
                Write-Host "${deptName}: Current ${currentCount}, Removing $(-$needed) agents"
                $agentLine = ($currentAgents[0..119] -join ', ')
            } else {
                Write-Host "${deptName}: Current ${currentCount}, OK"
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

Write-Host "Completed adding/removing agents to reach 120 per department"
