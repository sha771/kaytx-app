# Fix remaining broken lucide icons - batch 3
$replacements = @{
  'Boat' = 'Sailboat'
  'Compare' = 'ArrowLeftRight'
  'Edit' = 'Pencil'
  'FileJson' = 'FileCode'
  'GitCommit' = 'GitCommitHorizontal'
  'Grid' = 'LayoutGrid'
  'HeadphonesIcon' = 'Headphones as HeadphonesIcon'
  'Loader2' = 'LoaderCircle'
  'CheckCircle' = 'CircleCheck'
}

Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    $hasLucideImport = $content -match "from\s+'lucide-react-native'"
    
    if ($hasLucideImport) {
      foreach ($oldName in $replacements.Keys) {
        $newName = $replacements[$oldName]
        $escapedOld = [regex]::Escape($oldName)
        
        # Replace in import statement
        $importPattern = "(import\s+\{[^}]*?)$escapedOld([^}]*?\}\s+from\s+'lucide-react-native')"
        $content = [regex]::Replace($content, $importPattern, {
          param($m)
          $before = $m.Groups[1].Value
          $after = $m.Groups[2].Value
          return "${before}$newName${after}"
        })
        
        # Component name (strip " as X" alias)
        $componentName = $newName -replace ' as .*$', ''
        
        # Replace JSX and usage (but keep aliased names like HeadphonesIcon in icon: context)
        if ($content -match "\b$componentName\b" -and $content -match "from\s+'lucide-react-native'") {
          $content = $content -replace "<$escapedOld\s", "<$componentName "
          $content = $content -replace "<$escapedOld>", "<$componentName>"
          $content = $content -replace "<$escapedOld/", "<$componentName/"
          if ($oldName -ne 'HeadphonesIcon') {
            $content = $content -replace "\bicon:\s*$escapedOld\b", "icon: $componentName"
            $content = $content -replace "return\s+$escapedOld\b", "return $componentName"
            $content = $content -replace "\b$escapedOld\b(?=\s*[,}\)])", $componentName
          }
        }
      }
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
