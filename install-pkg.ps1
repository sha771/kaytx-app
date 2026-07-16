param([string[]]$pkgs)
$tmpdir = Join-Path $env:TEMP ([System.Guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $tmpdir -Force > $null
Set-Content -Path "$tmpdir\package.json" -Value '{ "name": "tmp", "version": "1.0.0" }'
$output = & npm install --prefix $tmpdir @pkgs --no-audit --no-fund --strict-ssl false 2>&1
if ($LASTEXITCODE -eq 0) {
  foreach ($item in $pkgs) {
    $src = "$tmpdir\node_modules\$item"
    $dst = "node_modules\$item"
    if (Test-Path $src) {
      Copy-Item $src $dst -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
  Write-Output "OK: $($pkgs -join ' ')"
} else {
  Write-Output "FAIL: $($pkgs -join ' ')"
  Write-Output ($output | Out-String)
}
Remove-Item $tmpdir -Recurse -Force
