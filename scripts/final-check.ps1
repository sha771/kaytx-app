$missing = @()
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts' } |
  ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName)
    if ($c -match "from\s+'lucide-react-native'") {
      $m = [regex]::Match($c, "import\s+\{([^}]+)\}\s+from\s+'lucide-react-native'")
      if ($m.Success) {
        $icons = $m.Groups[1].Value -split ',' | ForEach-Object {
          if ($_ -match '(\w+)\s+as\s+') { $Matches[1] } elseif ($_ -match '(\w+)') { $Matches[1] }
        } | Where-Object { $_ -and $_ -ne 'type' -and $_ -ne 'LucideIcon' }
        foreach ($ic in $icons) {
          $kebab = [regex]::Replace($ic, '([A-Z])', '-$1').Substring(1).ToLower()
          $iconDir = "c:\Users\shaida\Desktop\kaytx-full-app\node_modules\lucide-react-native\dist\esm\icons"
          $iconFile = Join-Path $iconDir "$kebab.js"
          if (-not (Test-Path $iconFile)) {
            $missing += "${ic} in $($_.Name)"
          }
        }
      }
    }
  }
if ($missing.Count -eq 0) { Write-Output 'ALL CLEAN!' } else { $missing | Sort-Object -Unique }
