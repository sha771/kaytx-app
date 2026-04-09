param(
  [string]$RepoRoot = "",
  [string]$TaskName = "Unifiedze Postgres Backup",
  [string]$Time = "02:00",
  [switch]$Verify
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot ".."))
}

$backupScriptLinuxPath = "/mnt/" + ($RepoRoot -replace '^([A-Za-z]):', '$1' -replace '\\', '/' | ForEach-Object { $_.ToLower() }) + "/scripts/backup-postgres.sh"

$verifyArg = if ($Verify) { " --verify" } else { "" }
$wslCommand = "bash -lc '" + $backupScriptLinuxPath + $verifyArg + "'"

$action = New-ScheduledTaskAction -Execute "wsl.exe" -Argument $wslCommand
$trigger = New-ScheduledTaskTrigger -Daily -At ([datetime]::Parse($Time))

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Force | Out-Null

Write-Host "Created/updated Scheduled Task: $TaskName"
Write-Host "RepoRoot: $RepoRoot"
Write-Host "Runs: wsl.exe $wslCommand"
