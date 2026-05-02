# Comprehensive revert of ListFilter back to Filter in non-lucide contexts
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    
    # Check if this file has lucide-react-native import with ListFilter
    $hasLucideListFilter = $false
    if ($content -match "from\s+'lucide-react-native'") {
      $importMatch = [regex]::Match($content, "import\s+\{([^}]+)\}\s+from\s+'lucide-react-native'")
      if ($importMatch.Success -and $importMatch.Groups[1].Value -match '\bListFilter\b') {
        $hasLucideListFilter = $true
      }
    }
    
    # If no lucide ListFilter import, revert ALL ListFilter to Filter
    if (-not $hasLucideListFilter) {
      $content = $content -replace '\bListFilter\b', 'Filter'
    } else {
      # Has lucide ListFilter - only revert non-lucide usages
      # Revert in comments: "should ListFilter" -> "should Filter"
      $content = $content -replace "should ListFilter\b", "should Filter"
      $content = $content -replace "// ListFilter\b", "// Filter"
      $content = $content -replace "// SEARCH & ListFilter", "// SEARCH & Filter"
      # Revert in test descriptions
      $content = $content -replace "include \w+ ListFilter", { 
        param($m) $m.Value -replace 'ListFilter', 'Filter' 
      }
      # Revert property access like .ListFilter
      $content = $content -replace '\.ListFilter\b', '.Filter'
      # Revert parameter/variable names like ListFilter?: or ListFilter:
      $content = $content -replace '\bListFilter(\s*[?:])', 'Filter$1'
      # Revert in object properties like f.ListFilter
      $content = $content -replace '\bListFilter(?=\s*\})', 'Filter'
      # Revert string literals like 'ListFilter'
      $content = $content -replace "'ListFilter'", "'Filter'"
      # Revert in activity-log.tsx context: filter === ListFilter -> filter === Filter
      $content = $content -replace '===\s*ListFilter\b', '=== Filter'
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
