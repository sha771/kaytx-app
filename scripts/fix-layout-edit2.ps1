# Fix Layout and Edit2 icons in lucide-react-native import contexts
$replacements = @{
  'Layout' = 'LayoutDashboard'
  'Edit2' = 'PenLine'
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
        $importPattern = "(import\s+\{[^}]*?)\b$oldName\b([^}]*?\}\s+from\s+'lucide-react-native')"
        $content = [regex]::Replace($content, $importPattern, {
          param($m)
          $before = $m.Groups[1].Value
          $after = $m.Groups[2].Value
          return "${before}$newName${after}"
        })
        
        # If the new name is now in the import, replace usage too
        if ($content -match "\b$newName\b" -and $content -match "from\s+'lucide-react-native'") {
          $content = $content -replace "<$oldName\s", "<$newName "
          $content = $content -replace "<$oldName>", "<$newName>"
          $content = $content -replace "<$oldName/", "<$newName/"
          $content = $content -replace "\bicon:\s*$oldName\b", "icon: $newName"
          $content = $content -replace "\b$oldName\b(?=\s*[,}\)])", $newName
          $content = $content -replace "return\s+$oldName\b", "return $newName"
        }
      }
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
