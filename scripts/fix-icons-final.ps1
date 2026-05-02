# Fix remaining broken lucide icons
$replacements = @{
  'Sliders' = 'SlidersHorizontal'
  'StopCircle' = 'CircleStop'
  'Technology' = 'Microchip'
  'Trading' = 'TrendingUp'
  'Unlock' = 'LockOpen'
  'Wand2' = 'Wand'
  'XCircle' = 'CircleX'
  'TruckIcon' = 'Truck as TruckIcon'
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
        
        # Replace in import statement
        $importPattern = "(import\s+\{[^}]*?)\b$([regex]::Escape($oldName))\b([^}]*?\}\s+from\s+'lucide-react-native')"
        $content = [regex]::Replace($content, $importPattern, {
          param($m)
          $before = $m.Groups[1].Value
          $after = $m.Groups[2].Value
          return "${before}$newName${after}"
        })
        
        # Determine the component name for JSX replacement (strip " as X" part)
        $componentName = $newName -replace ' as .*$', ''
        
        # If the new name is now in the import, replace JSX/component usage
        if ($content -match "\b$componentName\b" -and $content -match "from\s+'lucide-react-native'") {
          # Replace JSX: <OldName -> <NewComponent
          $content = $content -replace "<$([regex]::Escape($oldName))\s", "<$componentName "
          $content = $content -replace "<$([regex]::Escape($oldName))>", "<$componentName>"
          $content = $content -replace "<$([regex]::Escape($oldName))/", "<$componentName/"
          # Replace icon: OldName -> icon: NewComponent (but keep TruckIcon as alias)
          if ($oldName -ne 'TruckIcon') {
            $content = $content -replace "\bicon:\s*$([regex]::Escape($oldName))\b", "icon: $componentName"
          }
          # Replace in object/return context
          if ($oldName -ne 'TruckIcon') {
            $content = $content -replace "\b$([regex]::Escape($oldName))\b(?=\s*[,}\)])", $componentName
            $content = $content -replace "return\s+$([regex]::Escape($oldName))\b", "return $componentName"
          }
        }
      }
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
