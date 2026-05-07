$hrDir='c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\hr'
$hrSub="$hrDir\sub-agents"
$legDir='c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\legal'
$legSub="$legDir\sub-agents"
Write-Host "--- HR Parent Pages ---"
$hrParents = @('vp-culture','vp-compensation','recruiting-manager','ai-recruiter','ai-hr-ops-specialist','ai-learning-specialist','ai-compensation-analyst')
foreach($n in $hrParents){if(Test-Path "$hrDir\$n.tsx"){Write-Host "EXISTS: $n"}else{Write-Host "MISSING: $n"}}
Write-Host "--- HR Sub-Agent Pages ---"
$hrSubs = @('culture-survey-analyst','engagement-booster','values-alignment-checker','market-compensation-researcher','pay-equity-auditor','incentive-plan-designer','requisition-prioritizer','recruiter-performance-tracker','hiring-budget-manager','candidate-sourcer','interview-scheduler','reference-checker','benefits-administrator','policy-update-communicator','hr-ticket-resolver','course-catalog-curator','certification-tracker','mentorship-matcher','salary-benchmarking-agent','bonus-calculator','equity-plan-administrator')
foreach($n in $hrSubs){if(Test-Path "$hrSub\$n.tsx"){Write-Host "EXISTS: $n"}else{Write-Host "MISSING: $n"}}
Write-Host "--- Legal Parent Pages ---"
$legParents = @('clo','vp-legal','vp-compliance','vp-contracts')
foreach($n in $legParents){if(Test-Path "$legDir\$n.tsx"){Write-Host "EXISTS: $n"}else{Write-Host "MISSING: $n"}}
Write-Host "--- Legal Sub-Agent Pages ---"
$legSubs = @('legal-strategy-advisor','regulatory-change-monitor','litigation-risk-assessor','case-portfolio-manager','outside-counsel-coordinator','legal-spend-analyst','compliance-program-designer','regulatory-scanner','compliance-training-coordinator','contract-lifecycle-manager','template-librarian','obligation-tracker')
foreach($n in $legSubs){if(Test-Path "$legSub\$n.tsx"){Write-Host "EXISTS: $n"}else{Write-Host "MISSING: $n"}}
