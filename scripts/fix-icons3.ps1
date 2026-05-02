Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app' -Recurse -Include '*.tsx','*.ts' -Exclude '*.d.ts' |
  Where-Object { $_.FullName -notmatch 'node_modules|\.expo|dist|scripts\\fix|scripts\\check' } |
  ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    $original = $content
    # Fix additional renamed icons in lucide-react-native v0.575.0
    $content = $content -replace '\bFilter\b', 'ListFilter'
    $content = $content -replace '\bCode2\b', 'SquareCode'
    $content = $content -replace '\bPenSquare\b', 'SquarePen'
    $content = $content -replace '\bMoreVertical\b', 'EllipsisVertical'
    $content = $content -replace '\bEdit3\b', 'PenLine'
    $content = $content -replace '\bUserCircle\b', 'CircleUser'
    # Layout is tricky - only replace in lucide import context
    # Skip Layout for now as it's too generic
    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($_.FullName, $content)
      Write-Output "Updated: $($_.Name)"
    }
  }
