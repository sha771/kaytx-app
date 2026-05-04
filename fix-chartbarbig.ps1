$fixed = 0
Get-ChildItem -Path 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent' -Recurse -Include '*.tsx' | ForEach-Object {
    $c = [System.IO.File]::ReadAllText($_.FullName)
    if ($c -match "from 'lucide-react-native'" -and $c -match 'icon:\s*ChartBarBig') {
        $m = [regex]::Match($c, "import\s+\{([^}]+)\}\s+from\s+'lucide-react-native'")
        if ($m.Success -and $m.Groups[1].Value -notmatch '\bChartBarBig\b') {
            # Add ChartBarBig to the import
            $newImport = $m.Value.Replace('} from', ', ChartBarBig } from')
            $c = $c.Replace($m.Value, $newImport)
            [System.IO.File]::WriteAllText($_.FullName, $c)
            Write-Output "FIXED: $($_.Name)"
            $fixed++
        }
    }
}
Write-Output "Total fixed: $fixed"
