$path = 'C:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\kaytxx-workforce.tsx'
$origLines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Check if file has been partially processed (CircleDot without ' as' after it)
$needsRestore = $false
for ($i = 2312; $i -lt [Math]::Min(2400, $origLines.Count); $i++) {
    if ($origLines[$i] -match 'CircleDot' -and $origLines[$i] -notmatch 'CircleDot as ') {
        $needsRestore = $true
        break
    }
}

if ($needsRestore) {
    Write-Output "File was partially processed. Need to restore from git or original."
    # Check if the original patterns still exist
    $hasOriginalPattern = $false
    for ($i = 2312; $i -lt [Math]::Min(2400, $origLines.Count); $i++) {
        if ($origLines[$i] -match 'CircleDot as ') {
            $hasOriginalPattern = $true
            break
        }
    }
    Write-Output "Has original 'CircleDot as' patterns: $hasOriginalPattern"
    Write-Output "Has residual 'CircleDot' patterns: $needsRestore"
} else {
    Write-Output "File appears clean or has original patterns"
}
