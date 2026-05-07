$subBase = 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\sales\sub-agents'

$mapping = @{
  'ai-discovery-questioner.tsx' = 'discovery-questioner.tsx'
  'ai-demo-coordinator.tsx' = 'demo-coordinator.tsx'
  'ai-objection-handler.tsx' = 'objection-handler.tsx'
  'ai-deal-structurer.tsx' = 'deal-structurer.tsx'
  'ai-stakeholder-mapper.tsx' = 'stakeholder-mapper.tsx'
  'ai-closing-strategist.tsx' = 'closing-strategist.tsx'
  'ai-contact-updater.tsx' = 'contact-updater.tsx'
  'ai-activity-logger.tsx' = 'activity-logger.tsx'
  'ai-pipeline-organizer.tsx' = 'pipeline-organizer.tsx'
  'ai-template-selector.tsx' = 'template-selector.tsx'
  'ai-pricing-calculator.tsx' = 'pricing-calculator.tsx'
  'ai-proposal-reviewer.tsx' = 'proposal-reviewer.tsx'
  'ai-term-analyzer.tsx' = 'term-analyzer.tsx'
  'ai-concession-tracker.tsx' = 'concession-tracker.tsx'
  'ai-batna-calculator.tsx' = 'batna-calculator.tsx'
}

foreach ($key in $mapping.Keys) {
  $srcPath = Join-Path $subBase $key
  $dstPath = Join-Path $subBase $mapping[$key]
  if (Test-Path $srcPath) {
    Copy-Item -Path $srcPath -Destination $dstPath -Force
    Write-Host "Copied: $key -> $($mapping[$key])"
    Remove-Item -Path $srcPath -Force
    Write-Host "Removed: $key"
  } else {
    Write-Host "Not found: $key"
  }
}
Write-Host "Done: Enterprise sub-agents copied to correct filenames"
