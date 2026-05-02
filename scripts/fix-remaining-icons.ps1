# Fix remaining broken lucide icons - ONLY in lucide-react-native import contexts
$replacements = @{
  'CheckCircle2' = 'CircleCheckBig'
  'CheckCircle' = 'CircleCheck'
  'PenSquare' = 'SquarePen'
  'MoreVertical' = 'EllipsisVertical'
  'Edit3' = 'PenLine'
  'UserCircle' = 'CircleUser'
  'Code2' = 'SquareCode'
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
        
        # If the new name is now in the import, replace JSX/component usage too
        if ($content -match "\b$newName\b" -and $content -match "from\s+'lucide-react-native'") {
          # Replace JSX: <OldName -> <NewName
          $content = $content -replace "<$oldName\s", "<$newName "
          $content = $content -replace "<$oldName>", "<$newName>"
          $content = $content -replace "<$oldName/", "<$newName/"
          # Replace icon: OldName -> icon: NewName
          $content = $content -replace "\bicon:\s*$oldName\b", "icon: $newName"
          # Replace in object: OldName, -> NewName,
          $content = $content -replace "\b$oldName\b(?=\s*[,}\)])", $newName
          # Replace in ternary/conditional: OldName : -> NewName :
          $content = $content -replace "\b$oldName\b(?=\s*:)", $newName
          # Replace return OldName -> return NewName
          $content = $content -replace "return\s+$oldName\b", "return $newName"
          # Replace as alias target: as OldName -> as NewName (but only if it's the source)
          # Actually skip this - aliases like "CheckCircle as SquareCheck" need different handling
        }
      }
    }
    
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Fixed: $($_.Name)"
    }
  }
