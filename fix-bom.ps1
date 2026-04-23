# Fix BOM issues in all AI agent files
Get-ChildItem -Path "app/ai-agent" -Recurse -Filter "*.tsx" | ForEach-Object { 
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    # Check for UTF-8 BOM (EF BB BF)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        # Remove BOM
        [System.IO.File]::WriteAllBytes($_.FullName, $bytes[3..($bytes.Length-1)])
        Write-Host "Fixed BOM: $($_.FullName)"
    }
}
Write-Host "All BOM issues fixed!"
