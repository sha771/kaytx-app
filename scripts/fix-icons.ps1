Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist' } |
  ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $original = $content
    $content = $content -replace '\bBarChart3\b', 'ChartBarBig'
    $content = $content -replace '\bBarChart4\b', 'ChartBarBig'
    $content = $content -replace '\bBarChart2\b', 'ChartBar'
    $content = $content -replace '\bPieChart\b', 'ChartPie'
    $content = $content -replace '\bLineChart\b', 'ChartLine'
    $content = $content -replace '\bAlertTriangle\b', 'TriangleAlert'
    $content = $content -replace '\bAlertCircle\b', 'CircleAlert'
    $content = $content -replace '\bHelpCircle\b', 'LifeBuoy'
    $content = $content -replace '\bFileBarChart2\b', 'FileChartColumn'
    $content = $content -replace '\bCheckSquare\b', 'SquareCheck'
    if ($content -ne $original) {
      Set-Content $_.FullName -Value $content -NoNewline -Encoding UTF8
      Write-Output "Updated: $($_.FullName)"
    }
  }
