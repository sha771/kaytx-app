$dir = "c:\Users\shaida\Desktop\kaytx-full-app\node_modules\lucide-react-native\dist\esm\icons"
$results = @()
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts' } |
  ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName)
    $m = [regex]::Match($c, "import\s+\{([^}]+)\}\s+from\s+'lucide-react-native'")
    if ($m.Success) {
      $icons = $m.Groups[1].Value -split ',' | ForEach-Object {
        $t = $_.Trim()
        if ($t -match '^(\w+)\s+as\s+') { $Matches[1] } elseif ($t -match '^(\w+)$') { $Matches[1] }
      } | Where-Object { $_ -and $_ -notin @('type','LucideIcon','default') }
      foreach ($ic in $icons) {
        # Proper kebab: insert - before uppercase, handle digits
        $kebab = [regex]::Replace($ic, '([a-z])([A-Z])', '$1-$2')
        $kebab = [regex]::Replace($kebab, '([A-Z])([A-Z][a-z])', '$1-$2')
        $kebab = [regex]::Replace($kebab, '([a-zA-Z])(\d)', '$1-$2')
        $kebab = [regex]::Replace($kebab, '(\d)([a-zA-Z])', '$1-$2')
        $kebab = $kebab.ToLower()
        if (-not (Test-Path "$dir\$kebab.js")) {
          $results += "${ic} in $($_.Name)"
        }
      }
    }
  }
if ($results.Count -eq 0) { Write-Output 'ALL CLEAN!' } else { $results | Sort-Object -Unique }
