[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$base = "c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent"
$agentsFile = "c:\Users\shaida\Desktop\kaytx-full-app\shaida the agents lib by shaida\ai agents 1108"

$allFileNames = Get-ChildItem -Path $base -Filter "*.tsx" -Recurse | Select-Object -ExpandProperty Name
$allFileNames = $allFileNames | Sort-Object -Unique
Write-Host "Total unique .tsx file names: $($allFileNames.Count)"

$lines = [System.IO.File]::ReadAllLines($agentsFile, [System.Text.Encoding]::UTF8)
$results = @()
$mainFound = 0; $mainMissing = 0; $subFound = 0; $subMissing = 0

function Find-MatchingFile($name, $allFiles) {
    $clean = $name -replace '^AI ', ''
    $clean = $clean -replace '\s*\(sub\)', ''
    $clean = $clean -replace '\s*\(SDR\)', '-sdr'
    $clean = $clean -replace '\s*\(Gov\)', '-gov'
    $clean = $clean -replace '&', 'and'
    $clean = $clean -replace '/', '-'
    $clean = $clean -replace ',', ''
    $slug = ($clean -replace '\s+', '-').ToLower()
    
    $candidates = @("$slug.tsx", "ai-$slug.tsx", "$slug-1.tsx", "ai-$slug-1.tsx")
    
    $abbrMap = @{
        'chief-customer-officer'=@('cco');'chief-operating-officer'=@('coo');'chief-financial-officer'=@('cfo')
        'chief-technology-officer'=@('cto');'chief-human-resources-officer'=@('chro');'chief-legal-officer'=@('clo')
        'chief-information-security-officer'=@('ciso');'chief-medical-officer'=@('cmo-healthcare')
        'chief-production-officer'=@('cpo','cpo-production');'chief-logistics-officer'=@('clo-logistics')
        'chief-risk-officer'=@('cro','cro-risk');'chief-investment-officer'=@('cio')
        'chief-real-estate-officer'=@('creo','creo-advisor');'chief-administrative-officer'=@('cao','cao-admin')
        'chief-automation-officer'=@('cao-automation');'chief-data-and-ai-officer'=@('cdao','cdaio')
    }
    if ($slug -match '^chief-') {
        foreach ($key in $abbrMap.Keys) {
            if ($slug -eq $key) { foreach ($v in $abbrMap[$key]) { $candidates += "$v.tsx" } }
        }
    }
    
    $vpMap = @{
        'vp-customer-success'=@('vp-customer-success');'vp-support'=@('vp-support');'vp-experience'=@('vp-experience')
        'vp-retention'=@('vp-retention');'vp-loyalty'=@('vp-loyalty');'vp-sales'=@('vp-sales')
        'vp-revenue'=@('vp-revenue');'vp-business-development'=@('vp-business-development')
        'vp-channel-partners'=@('vp-channel-partners');'vp-marketing'=@('vp-marketing')
        'vp-brand'=@('vp-brand','marketing-brand');'vp-growth'=@('vp-growth','marketing-growth')
        'vp-content'=@('vp-content','marketing-content');'vp-digital'=@('vp-digital')
        'vp-operations'=@('vp-operations');'vp-supply-chain'=@('vp-supply-chain','vp-supply-chain-ops')
        'vp-quality'=@('vp-quality');'vp-facilities'=@('vp-facilities','vp-facilities-admin')
        'vp-project-management'=@('vp-project-management');'vp-finance'=@('vp-finance')
        'vp-accounting'=@('vp-accounting');'vp-treasury'=@('vp-treasury')
        'vp-investor-relations'=@('vp-investor-relations');'vp-engineering'=@('vp-engineering')
        'vp-infrastructure'=@('vp-infrastructure');'vp-ai-ml'=@('vp-ai-ml')
        'vp-security-technology'=@('vp-security-tech');'vp-talent'=@('vp-talent')
        'vp-hr-operations'=@('vp-hr-ops');'vp-learning'=@('vp-learning');'vp-culture'=@('vp-culture')
        'vp-compensation'=@('vp-compensation');'vp-legal'=@('vp-legal');'vp-compliance'=@('vp-compliance')
        'vp-contracts'=@('vp-contracts');'vp-intellectual-property'=@('vp-ip')
        'vp-governance'=@('vp-governance');'vp-data-science'=@('vp-data-science')
        'vp-data-engineering'=@('vp-data-engineering');'vp-analytics'=@('vp-analytics')
        'vp-business-intelligence'=@('vp-business-intelligence');'vp-product'=@('vp-product')
        'vp-product-strategy'=@('vp-product-strategy');'vp-product-operations'=@('vp-product-operations')
        'vp-security-operations'=@('vp-security-ops');'vp-cybersecurity'=@('vp-cybersecurity','vp-cyber')
        'vp-governance-and-risk'=@('vp-governance-risk');'vp-privacy'=@('vp-privacy')
        'vp-research'=@('vp-research');'vp-innovation'=@('vp-innovation')
        'vp-randd-operations'=@('vp-rd-operations')
        'vp-admin-operations'=@('vp-admin-ops','vp-admin-operations')
        'vp-trading'=@('vp-trading');'vp-investments'=@('vp-investments')
        'vp-property-management'=@('vp-property-management','vp-property-mgmt')
        'vp-real-estate-development'=@('vp-real-estate-development')
        'vp-underwriting'=@('vp-underwriting');'vp-claims'=@('vp-claims')
        'vp-risk-assessment'=@('vp-risk-assessment')
        'vp-healthcare-operations'=@('vp-healthcare-operations','vp-healthcare-ops')
        'vp-patient-experience'=@('vp-patient-experience');'vp-manufacturing'=@('vp-manufacturing')
        'vp-quality-assurance'=@('vp-quality-assurance');'vp-transportation'=@('vp-transportation')
        'vp-logistics-operations'=@('vp-logistics-ops','vp-logistics-operations')
        'vp-public-policy'=@('vp-public-policy');'vp-regulatory-affairs'=@('vp-regulatory-affairs')
        'vp-public-engagement'=@('vp-public-engagement')
        'vp-supply-chain-operations'=@('vp-supply-chain-ops')
        'vp-automation'=@('vp-automation');'vp-process-excellence'=@('vp-process-excellence')
    }
    if ($slug -match '^vp-') {
        foreach ($key in $vpMap.Keys) {
            if ($slug -eq $key) { foreach ($v in $vpMap[$key]) { $candidates += "$v.tsx" } }
        }
    }
    
    $specialMap = @{
        'receptionist'=@('ai-receptionist','cx-receptionist')
        'customer-support-agent'=@('cx-support','ai-customer-support')
        'ticket-resolution-agent'=@('cx-ticket-resolution')
        'complaint-handling-agent'=@('cx-complaint')
        'retention-specialist'=@('cx-retention','ai-retention-specialist')
        'loyalty-and-engagement-agent'=@('cx-loyalty')
        'feedback-and-survey-agent'=@('cx-feedback')
        'billing-support-agent'=@('cx-billing')
        'sales-operations-manager'=@('sales-ops-manager','ai-sales-ops-manager')
        'lead-development-rep--sdr-'=@('ai-sdr','sales-sdr','ai-lead-dev-rep')
        'sales-rep'=@('sales-rep','ai-sales-rep')
        'sales-executive'=@('sales-executive','ai-sales-executive')
        'crm-assistant'=@('sales-crm','ai-crm-assistant')
        'proposal-generator'=@('proposal-generator','ai-proposal-generator')
        'negotiator'=@('sales-negotiator','ai-negotiator')
        'pricing-analyst'=@('sales-pricing','ai-pricing-analyst')
        'sales-forecasting-agent'=@('sales-forecast','ai-sales-forecasting')
        'sales-enablement-agent'=@('sales-enablement','ai-sales-enablement')
        'operations-manager'=@('operations-manager','ai-operations-manager','ops-manager')
        'workflow-automation-agent'=@('workflow-automation','ai-workflow-automation')
        'task-coordinator'=@('task-coordinator','ai-task-coordinator')
        'process-optimization-agent'=@('process-optimization','ai-process-optimization')
        'resource-planner'=@('resource-planner','ai-resource-planner')
        'quality-assurance-agent'=@('quality-control','ai-quality-assurance')
        'financial-analyst'=@('financial-analyst','ai-financial-analyst')
        'recruiter'=@('recruiter','ai-recruiter')
        'hr-operations-specialist'=@('hr-ops-specialist','ai-hr-ops-specialist')
        'learning-specialist'=@('learning-specialist','ai-learning-specialist')
        'compensation-analyst'=@('compensation-analyst','ai-compensation-analyst')
        'legal-researcher'=@('legal-researcher','ai-legal-researcher')
        'contract-specialist'=@('contract-specialist','ai-contract-specialist')
        'compliance-analyst'=@('compliance-analyst','ai-compliance-analyst')
        'data-scientist'=@('data-scientist-1','ai-data-scientist')
        'data-analyst'=@('data-analyst','data-analyst-1','ai-data-analyst')
        'bi-developer'=@('bi-developer-1','ai-bi-developer')
        'ml-engineer'=@('ml-engineer-1','ai-ml-engineer')
        'data-steward'=@('data-steward-1','ai-data-steward')
        'analytics-specialist'=@('analytics-specialist','ai-analytics-specialist')
        'product-manager'=@('product-manager','product-manager-1','ai-product-manager')
        'product-owner'=@('product-owner','product-owner-1')
        'product-analyst'=@('feature-analyst','ai-product-analyst')
        'ux-researcher'=@('ux-researcher','ai-ux-researcher')
        'product-marketer'=@('ai-product-marketer')
        'release-manager'=@('ai-release-manager')
        'security-analyst'=@('security-analyst-1','ai-security-analyst')
        'incident-responder'=@('incident-responder-1','ai-incident-responder')
        'security-compliance-specialist'=@('compliance-security-1','ai-security-compliance')
        'penetration-tester'=@('penetration-tester-1','ai-penetration-tester')
        'identity-manager'=@('identity-manager-1','ai-identity-manager')
        'research-lead'=@('research-lead','research-lead-1')
        'prototype-engineer'=@('prototype-builder','ai-prototype-engineer')
        'trading-risk-manager'=@('risk-manager-trading','trading-risk-manager')
        'equity-trader'=@('equity-trader','ai-equity-trader')
        'forex-trader'=@('forex-trader','ai-forex-trader')
        'crypto-trader'=@('crypto-trader','ai-crypto-trader')
        'derivatives-specialist'=@('derivatives-specialist','ai-derivatives-specialist')
        'portfolio-analyst'=@('portfolio-analyst','ai-portfolio-analyst')
        'trading-risk-analyst'=@('risk-analyst-trading','ai-trading-risk-analyst')
        'trading-compliance'=@('compliance-trading','ai-trading-compliance')
        'quantitative-analyst'=@('quant-analyst-1','ai-quantitative-analyst')
        'esg-analyst'=@('esg-analyst','ai-esg-analyst')
        'macro-analyst'=@('macro-analyst','ai-macro-analyst')
        'algo-trading-developer'=@('algo-trading-dev','ai-algo-trading-developer')
        'settlement-specialist'=@('settlement-specialist','ai-settlement-specialist')
        'facilities-manager'=@('facilities-manager','facilities-manager-re')
        'property-analyst'=@('property-analyst','ai-property-analyst')
        'lease-administrator'=@('lease-administrator','ai-lease-administrator')
        'tenant-relations-specialist'=@('tenant-relations','ai-tenant-relations')
        'maintenance-coordinator'=@('maintenance-coordinator','ai-maintenance-coordinator')
        'acquisition-analyst'=@('acquisition-analyst','ai-acquisition-analyst')
        'asset-manager'=@('asset-manager','ai-asset-manager')
        'development-coordinator'=@('development-coordinator','ai-development-coordinator')
        'property-marketing'=@('property-marketing','ai-property-marketing')
        'underwriter'=@('underwriter-1','ai-underwriter')
        'claims-adjuster'=@('claims-adjuster','ai-claims-adjuster')
        'fraud-detection-agent'=@('fraud-detector','ai-fraud-detection')
        'actuary-analyst'=@('actuary-analyst','ai-actuary-analyst')
        'risk-modeler'=@('risk-modeler','ai-risk-modeler')
        'policy-administrator'=@('policy-admin','ai-policy-administrator')
        'customer-risk-analyst'=@('customer-risk-analyst','ai-customer-risk-analyst')
        'catastrophe-modeler'=@('catastrophe-modeler','ai-catastrophe-modeler')
        'reinsurance-specialist'=@('reinsurance-specialist','ai-reinsurance-specialist')
        'patient-coordinator'=@('patient-coordinator','ai-patient-coordinator')
        'medical-coder'=@('medical-coder','ai-medical-coder')
        'billing-specialist'=@('billing-specialist','ai-billing-specialist')
        'care-coordinator'=@('care-coordinator','ai-care-coordinator')
        'health-records-specialist'=@('health-records-specialist','ai-health-records')
        'telehealth-support'=@('telehealth-support','ai-telehealth-support')
        'healthcare-compliance'=@('compliance-healthcare','ai-healthcare-compliance')
        'quality-improvement-specialist'=@('quality-improvement','ai-quality-improvement')
        'production-planner'=@('production-planner','ai-production-planner')
        'quality-inspector'=@('quality-inspector','ai-quality-inspector')
        'supply-chain-coordinator'=@('supply-chain-coordinator','ai-supply-chain-coordinator')
        'maintenance-technician'=@('maintenance-technician','ai-maintenance-technician')
        'inventory-controller'=@('inventory-controller','ai-inventory-controller')
        'lean-specialist'=@('lean-specialist','ai-lean-specialist')
        'safety-inspector'=@('safety-inspector','ai-safety-inspector')
        'logistics-coordinator'=@('logistics-coordinator','ai-logistics-coordinator')
        'route-optimizer'=@('route-optimizer','ai-route-optimizer')
        'fleet-coordinator'=@('fleet-coordinator','ai-fleet-coordinator')
        'freight-broker'=@('freight-broker','ai-freight-broker')
        'customs-specialist'=@('ai-customs-specialist')
        'policy-analyst'=@('policy-analyst','ai-policy-analyst')
        'regulatory-specialist'=@('regulatory-specialist','ai-regulatory-specialist')
        'public-affairs-specialist'=@('public-affairs','ai-public-affairs')
        'grants-specialist'=@('grants-specialist','ai-grants-specialist')
        'government-compliance'=@('compliance-gov','ai-government-compliance')
        'transparency-officer'=@('transparency-officer','ai-transparency-officer')
        'procurement-buyer'=@('procurement-buyer','ai-procurement-buyer')
        'inventory-specialist'=@('inventory-specialist','ai-inventory-specialist')
        'demand-planner'=@('demand-planner','ai-demand-planner')
        'supplier-relations'=@('supplier-relations','ai-supplier-relations')
        'shipping-coordinator'=@('shipping-coordinator','ai-shipping-coordinator')
        'fulfillment-specialist'=@('fulfillment-specialist','ai-fulfillment-specialist')
        'automation-operations-director-lead'=@('aod-lead')
        'rpa-manager'=@('rpa-manager')
        'workflow-specialist'=@('workflow-specialist')
        'chief-administrative-officer-gov'=@('cao')
        'office-manager'=@('ai-office-manager')
        'executive-assistant'=@('ai-executive-assistant')
        'facilities-coordinator'=@('ai-facilities-coordinator')
        'travel-coordinator'=@('ai-travel-coordinator')
        'document-controller'=@('ai-document-controller')
        'admin-manager'=@('admin-manager')
        'marketing-manager'=@('marketing-manager')
        'content-marketing-agent'=@('content-generator','ai-content-marketing')
        'seo-specialist'=@('seo-agent','ai-seo-specialist')
        'social-media-manager'=@('ai-social-media-manager')
        'email-marketing-agent'=@('email-marketing','ai-email-marketing')
        'ad-campaign-manager'=@('ai-ad-campaign')
        'marketing-analytics-agent'=@('ai-marketing-analytics')
        'brand-manager'=@('ai-brand-manager')
        'growth-hacker'=@('ai-growth-hacker','growth-hacker')
        'chief-marketing-officer'=@('cmo','ai-cmo')
        'manager'=@('manager')
        'frontend-developer'=@('ai-frontend-developer')
        'backend-developer'=@('ai-backend-developer')
        'sre-engineer'=@('ai-sre-engineer')
        'qa-automation-engineer'=@('ai-qa-automation')
        'data-engineer'=@('ai-data-engineer')
        'security-engineer'=@('ai-security-engineer')
        'recruiting-manager'=@('recruiting-manager')
        'innovation-manager'=@('innovation-manager')
        'research-scientist'=@('ai-research-scientist')
        'innovation-analyst'=@('ai-innovation-analyst')
        'patent-researcher'=@('ai-patent-researcher')
        'trading-desk-manager'=@('trading-desk-manager')
        'portfolio-manager'=@('portfolio-manager')
        'property-manager'=@('property-manager')
        'leasing-manager'=@('leasing-manager')
        'underwriting-manager'=@('underwriting-manager')
        'claims-manager'=@('claims-manager')
        'policy-manager'=@('policy-manager')
        'patient-services-manager'=@('patient-services-manager')
        'medical-billing-manager'=@('medical-billing-manager')
        'scheduling-manager'=@('scheduling-manager')
        'production-manager'=@('production-manager')
        'quality-manager'=@('quality-manager')
        'safety-manager'=@('safety-manager')
        'fleet-manager'=@('fleet-manager')
        'warehouse-manager'=@('warehouse-manager')
        'distribution-manager'=@('distribution-manager')
        'dispatcher'=@('ai-dispatcher')
        'tracking-specialist'=@('ai-tracking-specialist')
        'last-mile-coordinator'=@('ai-last-mile-coordinator')
        'warehouse-operator'=@('ai-warehouse-operator')
        'warehouse-lead'=@('warehouse-lead')
        'procurement-manager'=@('procurement-manager')
        'logistics-manager'=@('logistics-manager')
        'controller'=@('controller')
        'finance-manager'=@('finance-manager')
        'accounting-manager'=@('accounting-manager')
        'budget-manager'=@('ai-budget-manager')
        'tax-specialist'=@('ai-tax-specialist')
        'audit-manager'=@('ai-audit-manager')
        'treasury-analyst'=@('ai-treasury-analyst')
        'lead-architect'=@('lead-architect')
        'devops-manager'=@('devops-manager')
        'frontend-lead'=@('frontend-lead')
        'backend-lead'=@('backend-lead')
        'sre-lead'=@('sre-lead')
        'security-architect'=@('security-architect')
        'soc-manager'=@('soc-manager')
        'data-manager'=@('data-manager')
        'analytics-manager'=@('analytics-manager')
        'compliance-manager'=@('compliance-manager')
        'policy-manager'=@('policy-manager')
        'grants-manager'=@('grants-manager')
    }
    foreach ($key in $specialMap.Keys) {
        if ($slug -eq $key) { foreach ($v in $specialMap[$key]) { $candidates += "$v.tsx" } }
    }
    
    $candidates = $candidates | Sort-Object -Unique
    foreach ($c in $candidates) {
        if ($allFiles -contains $c) { return $c }
    }
    
    # Fuzzy: strip ai- prefix and -1 suffix from file names
    foreach ($f in $allFiles) {
        $fBase = $f -replace '\.tsx$',''
        $fNorm = $fBase -replace '^ai-','' -replace '-1$',''
        if ($fNorm -eq $slug) { return $f }
    }
    return $null
}

foreach ($line in $lines) {
    $parts = $line -split '\|' | Where-Object { $_.Trim() -ne '' }
    if ($parts.Count -ge 5) {
        $num = $parts[0].Trim()
        if ($num -match '^\d+$') {
            $name = $parts[1].Trim()
            $subAgents = $parts[3].Trim()
            $isSubAgent = $subAgents -eq "N/A"
            
            $matchedFile = Find-MatchingFile $name $allFileNames
            $found = $null -ne $matchedFile
            
            if ($found) {
                if (-not $isSubAgent) { $mainFound++ } else { $subFound++ }
                $tick = "YES"
            } else {
                if (-not $isSubAgent) { $mainMissing++ } else { $subMissing++ }
                $tick = "NO"
            }
            
            $results += [PSCustomObject]@{
                Num = $num; Name = $name
                Type = if (-not $isSubAgent) { "MAIN" } else { "SUB" }
                Found = $found; MatchedFile = if ($matchedFile) { $matchedFile } else { "" }
                Tick = $tick
            }
        }
    }
}

Write-Host ""
Write-Host "============================================"
Write-Host "AGENT PAGE EXISTENCE CHECK RESULTS"
Write-Host "============================================"
Write-Host ""
Write-Host "MAIN AGENTS: $mainFound found / $mainMissing missing"
Write-Host "SUB-AGENTS:  $subFound found / $subMissing missing"
Write-Host "TOTAL:       $($mainFound + $subFound) found / $($mainMissing + $subMissing) missing out of $($results.Count)"
Write-Host ""

$missingMain = $results | Where-Object { $_.Type -eq "MAIN" -and -not $_.Found }
if ($missingMain.Count -gt 0) {
    Write-Host "=== MISSING MAIN AGENT PAGES ==="
    foreach ($m in $missingMain) { Write-Host "  X #$($m.Num) $($m.Name)" }
    Write-Host ""
}

$missingSub = $results | Where-Object { $_.Type -eq "SUB" -and -not $_.Found }
if ($missingSub.Count -gt 0) {
    Write-Host "=== MISSING SUB-AGENT PAGES ($($missingSub.Count) total, first 80) ==="
    $count = 0
    foreach ($m in $missingSub) {
        Write-Host "  X #$($m.Num) $($m.Name)"
        $count++; if ($count -ge 80) { Write-Host "  ... and $($missingSub.Count - 80) more"; break }
    }
    Write-Host ""
}

# Write full report
$reportPath = "c:\Users\shaida\Desktop\kaytx-full-app\agent-page-check-report.txt"
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("KAYTX AI WORKFORCE - PAGE EXISTENCE CHECK")
[void]$sb.AppendLine("========================================")
[void]$sb.AppendLine("Date: $(Get-Date)")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("MAIN AGENTS: $mainFound found / $mainMissing missing")
[void]$sb.AppendLine("SUB-AGENTS:  $subFound found / $subMissing missing")
[void]$sb.AppendLine("TOTAL:       $($mainFound + $subFound) found / $($mainMissing + $subMissing) missing out of $($results.Count)")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("=== ALL AGENTS WITH STATUS ===")
foreach ($r in $results) {
    $tick = if ($r.Found) { [char]0x2705 } else { [char]0x274C }
    $fileInfo = if ($r.MatchedFile) { " -> $($r.MatchedFile)" } else { " -> NO FILE" }
    [void]$sb.AppendLine("$tick #$($r.Num.PadLeft(4)) $($r.Type.PadRight(4)) $($r.Name)$fileInfo")
}
[System.IO.File]::WriteAllText($reportPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Report saved to: $reportPath"
