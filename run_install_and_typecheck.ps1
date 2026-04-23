Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Set-Location 'C:\Users\shaida\Desktop\kaytx-full-app'
Write-Output "---STEP 0: cwd ---"
Write-Output (Get-Location).Path

Write-Output "---STEP 1: Kill Node processes---"
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Output "(done)"

Write-Output "---STEP 2: Remove node_modules, .expo, package-lock.json---"
if (Test-Path node_modules) { Write-Output 'Removing node_modules...'; Remove-Item -Path node_modules -Recurse -Force; Write-Output 'node_modules removed' } else { Write-Output 'node_modules not present' }
if (Test-Path .expo) { Write-Output 'Removing .expo...'; Remove-Item -Path .expo -Recurse -Force; Write-Output '.expo removed' } else { Write-Output '.expo not present' }
if (Test-Path package-lock.json) { Write-Output 'Removing package-lock.json...'; Remove-Item -Path package-lock.json -Force; Write-Output 'package-lock.json removed' } else { Write-Output 'package-lock.json not present' }

Write-Output "---STEP 3: npm cache clean --force---"
try {
  npm cache clean --force 2>&1 | ForEach-Object { Write-Output $_ }
  Write-Output '(npm cache clean succeeded)'
} catch {
  Write-Output "(npm cache clean failed)"
  Write-Output $_.Exception.Message
  exit 1
}

$installFailed = $false
$installError = $null

Write-Output "---STEP 4: npm install typescript openai @anthropic-ai/sdk @google/generative-ai (legacy-peer-deps)---"
try {
  npm install typescript@latest openai@latest @anthropic-ai/sdk@latest @google/generative-ai@latest --save-dev --save --legacy-peer-deps --no-audit --no-fund 2>&1 | ForEach-Object { Write-Output $_ }
  if ($LASTEXITCODE -ne 0) { throw "npm install exited with code $LASTEXITCODE" }
  Write-Output '(npm install succeeded)'
} catch {
  $installFailed = $true
  $installError = $_.Exception.Message
  Write-Output "(npm install failed)"
  Write-Output $installError
  if ($installError -match 'EPERM') {
    Write-Output '---EPERM detected: printing latest npm debug log tail---'
    if (Test-Path "$env:LOCALAPPDATA\npm-cache\_logs") {
      $latest = Get-ChildItem "$env:LOCALAPPDATA\npm-cache\_logs" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
      Write-Output $latest.FullName
      Get-Content -Path $latest.FullName -Tail 200 | ForEach-Object { Write-Output $_ }
    } else {
      Write-Output 'NO_NPM_LOG_FOLDER'
    }
  }
  exit 1
}

Write-Output "---STEP 5: npm run typecheck---"
try {
  npm run typecheck 2>&1 | ForEach-Object { Write-Output $_ }
  if ($LASTEXITCODE -ne 0) { throw "typecheck exited with code $LASTEXITCODE" }
  Write-Output '(typecheck succeeded)'
} catch {
  Write-Output '(typecheck failed)'
  Write-Output $_.Exception.Message
  exit 1
}

Write-Output "---STEP 6: Node and npm versions---"
try { node -v 2>&1 | ForEach-Object { Write-Output "node: $_" } } catch { Write-Output 'node: not found' }
try { npm -v 2>&1 | ForEach-Object { Write-Output "npm: $_" } } catch { Write-Output 'npm: not found' }

Write-Output "---ALL DONE---"
