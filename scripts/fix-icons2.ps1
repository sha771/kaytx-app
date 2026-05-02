Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    # Fix Home -> House (only in lucide context, not route paths or strings)
    $content = $content -replace '(?<=<)Home(?=\s)', 'House'
    $content = $content -replace '(?<=import\s\{[^}]*)\bHome\b(?=[^}]*\}\sfrom\s[''"]lucide-react-native[''"])', 'House'
    # Fix Ship -> Boat (lucide icon)
    $content = $content -replace '\bShip\b', 'Boat'
    # Re-apply all other fixes in case they were missed
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
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Updated: $($_.Name)"
    }
  }
