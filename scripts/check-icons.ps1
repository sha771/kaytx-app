$brokenIcons = @(
  @{Old='Home'; New='House'},
  @{Old='AlertTriangle'; New='TriangleAlert'},
  @{Old='AlertCircle'; New='CircleAlert'},
  @{Old='HelpCircle'; New='LifeBuoy'},
  @{Old='BarChart3'; New='ChartBarBig'},
  @{Old='BarChart4'; New='ChartBarBig'},
  @{Old='BarChart2'; New='ChartBar'},
  @{Old='BarChart'; New='ChartBar'},
  @{Old='PieChart'; New='ChartPie'},
  @{Old='LineChart'; New='ChartLine'},
  @{Old='Fingerprint'; New='FingerprintPattern'},
  @{Old='Ship'; New='Boat'},
  @{Old='FileBarChart2'; New='FileChartColumn'},
  @{Old='CheckSquare'; New='SquareCheck'},
  @{Old='AlertOctagon'; New='OctagonAlert'},
  @{Old='FileEdit'; New='FilePen'},
  @{Old='AtomIcon'; New='Atom'},
  @{Old='TargetIcon'; New='Target as TargetIcon'}
)

$found = $false
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    foreach ($icon in $brokenIcons) {
      $pattern = '\b' + $icon.Old + '\b'
      if ($icon.Old -eq 'Home' -or $icon.Old -eq 'Ship' -or $icon.Old -eq 'BarChart' -or $icon.Old -eq 'Fingerprint' -or $icon.Old -eq 'TargetIcon') {
        # Skip these as they may appear in non-lucide contexts
        continue
      }
      if ($content -match $pattern) {
        Write-Output "STILL FOUND: $($icon.Old) in $($_.Name)"
        $found = $true
      }
    }
  }
if (-not $found) { Write-Output "All checked icons are clean!" }
