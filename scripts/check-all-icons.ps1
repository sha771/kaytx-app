# Check all lucide-react-native imports and verify each icon exists
$dir = "c:\Users\shaida\Desktop\kaytx-full-app\node_modules\lucide-react-native\dist\esm\icons"
$found = $false

Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    # Extract all imports from lucide-react-native
    $matches = [regex]::Matches($content, "from\s+'lucide-react-native'")
    if ($matches.Count -gt 0) {
      # Find the import block
      $importMatch = [regex]::Match($content, "import\s+\{([^}]+)\}\s+from\s+'lucide-react-native'")
      if ($importMatch.Success) {
        $imports = $importMatch.Groups[1].Value
        # Split by comma and clean up
        $icons = $imports -split ',' | ForEach-Object {
          $icon = $_.Trim()
          # Handle aliases like "Plane as PlaneIcon" - get the source name
          if ($icon -match '(\w+)\s+as\s+\w+') {
            $icon = $Matches[1]
          }
          # Remove comments
          if ($icon -match '^(\w+)') {
            $icon = $Matches[1]
          }
          $icon
        } | Where-Object { $_ -and $_ -ne 'type' -and $_ -ne 'LucideIcon' -and $_ -notmatch '^\s*//' }

        foreach ($iconName in $icons) {
          if ($iconName -and $iconName -ne 'type' -and $iconName -ne 'LucideIcon') {
            # Convert PascalCase to kebab-case for file check
            $kebab = [regex]::Replace($iconName, '([A-Z])', '-$1').Substring(1).ToLower()
            $file = "$dir\$kebab.js"
            if (-not (Test-Path $file)) {
              Write-Output "MISSING: $iconName (tried $kebab) in $($_.Name)"
              $found = $true
            }
          }
        }
      }
    }
  }
if (-not $found) { Write-Output "All lucide-react-native imports are valid!" }
