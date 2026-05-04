# Fix Filter icon - replace with Funnel in lucide-react-native imports and usage
$files = Get-ChildItem -Path "app", "components" -Recurse -Include "*.tsx", "*.ts" | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw -ErrorAction SilentlyContinue
    if ($content -match "Filter") {
        # Check if this file imports from lucide-react-native
        if ($content -match "from 'lucide-react-native'") {
            # Replace in imports: Filter, -> Funnel,
            $content = $content -replace '(?<=^\s*import\s*{[^}*])\bFilter\b(?=,|\s*})', 'Funnel'
            # Replace in imports: , Filter -> , Funnel
            $content = $content -replace '(?<=,\s*)\bFilter\b(?=\s*,|\s*})', 'Funnel'
            # Replace JSX usage: <Filter -> <Funnel
            $content = $content -replace '<Filter\b', '<Funnel'
            # Replace usage: {Filter} -> {Funnel}
            $content = $content -replace '{Filter}', '{Funnel}'
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "Fixed: $file"
        }
    }
}

Write-Host "Done! Filter -> Funnel replacements complete."
