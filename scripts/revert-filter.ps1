# Revert .ListFilter back to .filter in non-lucide contexts
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    # Revert .ListFilter( back to .filter( (method calls on arrays)
    $content = $content -replace '\.ListFilter\(', '.filter('
    # Revert variable names like "const ListFilter" back to "const filter"
    $content = $content -replace '\bListFilter\b(?=\s*[=:])', 'filter'
    # Revert parameter names like "ListFilter:" back to "filter:"
    $content = $content -replace '\bListFilter:', 'filter:'
    # Revert object property "ListFilter." back to "filter."
    $content = $content -replace '(?<=\.)ListFilter\b(?=\.)', 'filter'
    # Revert type annotations like "ListFilter:" in destructuring
    $content = $content -replace '\{\s*ListFilter:', '{ filter:'
    # Revert comments like "// ListFilter out" back to "// Filter out"
    $content = $content -replace '// ListFilter ', '// Filter '
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Reverted: $($_.Name)"
    }
  }
