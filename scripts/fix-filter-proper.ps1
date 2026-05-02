# Comprehensive fix: revert ALL non-lucide ListFilter back to Filter
# Then properly fix only lucide Filter imports
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    
    # Step 1: Revert ALL ListFilter back to Filter first
    $content = $content -replace '\bListFilter\b', 'Filter'
    
    # Step 2: Now properly fix ONLY lucide Filter imports
    # Find import blocks from lucide-react-native that contain Filter
    if ($content -match "from\s+'lucide-react-native'" -and $content -match '\bFilter\b') {
      # Replace Filter with ListFilter ONLY in the import statement
      $content = [regex]::Replace($content, "(import\s+\{[^}]*?)\bFilter\b([^}]*?\}\s+from\s+'lucide-react-native')", {
        param($m)
        $before = $m.Groups[1].Value
        $after = $m.Groups[2].Value
        return "${before}ListFilter${after}"
      })
      
      # Replace JSX usage <Filter with <ListFilter
      $content = $content -replace '<Filter\s', '<ListFilter '
      $content = $content -replace '<Filter>', '<ListFilter>'
      $content = $content -replace '<Filter/', '<ListFilter/'
      # Replace icon: Filter with icon: ListFilter
      $content = $content -replace '\bicon:\s*Filter\b', 'icon: ListFilter'
      # Replace Filter used as icon component reference (e.g., case 'filter': return Filter)
      $content = $content -replace "(case\s+'filter':\s*return\s+)\bFilter\b", '$1ListFilter'
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
