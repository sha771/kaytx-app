# Fix only the lucide-react-native Filter import - replace with ListFilter
# Only in import statements from lucide-react-native
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    
    # Only replace Filter with ListFilter when it's in a lucide-react-native import block
    # Pattern: inside import { ... } from 'lucide-react-native'
    if ($content -match "from\s+'lucide-react-native'") {
      # Find the import block and replace Filter only within it
      $pattern = '(?s)(import\s+\{[^}]*?)\bFilter\b([^}]*?\}\s+from\s+''lucide-react-native'')'
      $content = [regex]::Replace($content, $pattern, {
        param($m)
        $before = $m.Groups[1].Value
        $after = $m.Groups[2].Value
        return "${before}ListFilter${after}"
      })
      
      # Also fix Filter used as JSX component or icon reference that was imported from lucide
      # Only if ListFilter is now imported (meaning it was a lucide Filter)
      if ($content -match 'ListFilter' -and $content -match "from\s+'lucide-react-native'") {
        # Replace <Filter  with <ListFilter  (JSX usage)
        $content = $content -replace '<Filter\s', '<ListFilter '
        $content = $content -replace '<Filter>', '<ListFilter>'
        # Replace icon: Filter, with icon: ListFilter,
        $content = $content -replace '\bicon:\s*Filter\b', 'icon: ListFilter'
        # Replace case 'filter': return Filter with case 'filter': return ListFilter
        $content = $content -replace "return\s+Filter\b(?!ed)", "return ListFilter"
      }
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed Filter: $($_.Name)"
    }
  }
