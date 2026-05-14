# PowerShell script to fix React component naming issues
# Changes function names from lowercase to uppercase

$subAgentsPath = "app\ai-agent\transportation\sub-agents"
$files = Get-ChildItem -Path $subAgentsPath -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Find the function declaration pattern
    if ($content -match 'export default function (\w+Page)\(\)') {
        $functionName = $matches[1]
        $newFunctionName = $functionName.Substring(0,1).ToUpper() + $functionName.Substring(1)
        
        Write-Host "Fixing $($file.Name): $functionName -> $newFunctionName"
        
        # Replace the function name
        $content = $content -replace "export default function $functionName\(\)", "export default function $newFunctionName()"
        
        # Write back to file
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "Done fixing React component names!"