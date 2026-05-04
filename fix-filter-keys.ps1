# Fix incorrectly replaced key={Funnel} back to key={filter}
$files = Get-ChildItem -Path "app", "components" -Recurse -Include "*.tsx", "*.ts" | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    $content = Get-Content -Path $file -ErrorAction SilentlyContinue
    $original = $content
    # Fix key={Funnel} -> key={filter} (when Funnel is used as a variable key)
    $content = $content -replace 'key={Funnel}(?!\s*size|\s*color)', 'key={filter}'
    # Fix {Funnel} inside Text components that should be {filter}
    $content = $content -replace '(?<=<Text[^>]*>\s*){Funnel}(?=\s*</Text>)', '{filter}'
    if ($content -ne $original) {
        Set-Content -Path $file -Value $content
        Write-Host "Fixed keys in: $file"
    }
}

Write-Host "Done! Fixed filter key replacements."
