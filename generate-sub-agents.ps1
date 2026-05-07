# KAYTX Sub-Agent Page Generator
# Generates .tsx pages for all sub-agents across 22 departments
# Usage: powershell -ExecutionPolicy Bypass -File generate-sub-agents.ps1

$baseDir = "c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent"
$dataFile = "c:\Users\shaida\Desktop\kaytx-full-app\agents lib by shaida\KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS"
$totalGenerated = 0

# Read the sub-agents file and parse it
$content = Get-Content $dataFile -Raw

# Template for sub-agent page
function Generate-SubAgentPage {
    param($agentId, $agentName, $parentId, $parentName, $deptFolder, $color, $icon)
    
    $componentName = $agentId -replace '-',' ' -replace '\b(\w)',{$args[0].Groups[1].Value.ToUpper()} -replace ' ',''
    $pageName = $componentName + "Page"
    
    $capabilities = @($agentName -replace 'AI ','' -replace 'Agent','' -replace 'Specialist','' -replace 'Manager','' -replace 'Coordinator','' -replace 'Analyst','' -replace 'Optimizer','')
    $cap1 = if($capabilities[0] -match 'CX|Customer'){'Customer Experience'}elseif($capabilities[0] -match 'Sales|Revenue|Pipeline|Deal'){'Sales Automation'}elseif($capabilities[0] -match 'Marketing|Brand|Content|SEO|Social|Email|Ad|Growth'){'Marketing Automation'}elseif($capabilities[0] -match 'Finance|Budget|Tax|Audit|Treasury|Accounting'){'Financial Analysis'}elseif($capabilities[0] -match 'Tech|Engineering|Dev|QA|SRE|Data Eng|Security Eng'){'Technology'}elseif($capabilities[0] -match 'HR|Recruit|Learning|Compensation|Culture'){'Human Resources'}elseif($capabilities[0] -match 'Legal|Compliance|Contract|Governance|IP'){'Legal & Compliance'}elseif($capabilities[0] -match 'Data|Analytics|BI|ML|Scientist'){'Data Intelligence'}elseif($capabilities[0] -match 'Product|UX|Release'){'Product Management'}elseif($capabilities[0] -match 'Security|Incident|Penetration|Identity|SOC'){'Security & Risk'}elseif($capabilities[0] -match 'Research|Innovation|Prototype|Patent'){'Research & Development'}elseif($capabilities[0] -match 'Admin|Office|Executive|Facilities|Travel|Document'){'Administration'}elseif($capabilities[0] -match 'Trading|Investment|Portfolio|Equity|Forex|Crypto|Derivative|Quant|ESG|Macro|Algo|Settlement'){'Trading & Investments'}elseif($capabilities[0] -match 'Real Estate|Property|Lease|Tenant|Maintenance|Acquisition|Asset|Development'){'Real Estate'}elseif($capabilities[0] -match 'Insurance|Underwriting|Claims|Fraud|Actuary|Risk Model|Policy|Catastrophe|Reinsurance'){'Insurance & Risk'}elseif($capabilities[0] -match 'Healthcare|Patient|Medical|Billing|Care|Telehealth'){'Healthcare'}elseif($capabilities[0] -match 'Manufacturing|Production|Quality|Safety|Lean|Logistics'){'Manufacturing'}elseif($capabilities[0] -match 'Transportation|Fleet|Warehouse|Route|Dispatcher|Tracking|Last Mile|Freight|Customs'){'Transportation'}elseif($capabilities[0] -match 'Government|Policy|Regulatory|Public|Grants|Transparency'){'Government'}elseif($capabilities[0] -match 'Supply Chain|Procurement|Inventory|Demand|Supplier|Shipping|Fulfillment'){'Supply Chain'}elseif($capabilities[0] -match 'Automation|RPA|Workflow|Process Excellence'){'AI Management'}else{'Automation'}
    
    $capTags = @($cap1, 'AI-Powered', 'Real-time', 'Analytics', 'Integration', 'Automation') | Select-Object -Unique | Select-Object -First 6
    $capTagsStr = $capTags | ForEach-Object { "'$_'" } | Join-String ','
    
    $endpoints = @("/consult/$agentId", "/$agentId/execute", "/$agentId/analyze")
    $endpointsStr = $endpoints | ForEach-Object { "'$_'" } | Join-String ','

    $levelLabel = if($agentName -match 'Chief'){'C-Level'}elseif($agentName -match 'VP'){'VP/Director'}elseif($agentName -match 'Manager'){'Manager'}elseif($agentName -match 'Lead'){'Team Lead'}else{'Specialist'}
    $levelIcon = if($levelLabel -eq 'C-Level'){'Briefcase'}elseif($levelIcon -eq 'VP/Director'){'Users'}else{'Zap'}

return @"
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, $icon, Clock, Target, Zap, ArrowRight, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${pageName}() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}20' }]}>
          <${icon} size={56} color="${color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{${agentName}}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of {${parentName}}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}><Briefcase size={12} color="${color}" /><Text style={[styles.badgeText, { color: '${color}' }]}>${levelLabel}</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'${levelLabel}',icon: Briefcase, color: '${color}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Parent',value:'${parentId}',icon: ${icon}, color: '#007AFF'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${agentName} - Sub-agent supporting ${parentName}. Part of the Kaytx AI Workforce hierarchy providing automated capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {[$capTagsStr].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '${color}18' }]}>
              <Text style={[styles.tagText, { color: '${color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {[$endpointsStr].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptFolder}/${parentId}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <${icon} size={24} color="${color}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{${parentName}}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${agentId}" agentName="${agentName}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
"@
}

# Parse the data file to extract all agents and sub-agents
$lines = Get-Content $dataFile
$currentDept = ""
$currentMainAgent = ""
$currentMainAgentId = ""
$deptFolder = ""
$deptColor = ""
$deptIcon = ""
$agents = @()

foreach ($line in $lines) {
    # Detect department
    if ($line -match 'DEPT\s+\d+:\s+(.+?)\s+\(') {
        $currentDept = $Matches[1].Trim()
        # Map department to folder, color, icon
        switch ($currentDept) {
            "Customer Experience" { $deptFolder="customer"; $deptColor="#06B6D4"; $deptIcon="Headphones" }
            "Sales & Revenue" { $deptFolder="sales"; $deptColor="#FF9500"; $deptIcon="TrendingUp" }
            "Marketing & Growth" { $deptFolder="marketing"; $deptColor="#E91E63"; $deptIcon="Megaphone" }
            "Operations & Management" { $deptFolder="operations"; $deptColor="#607D8B"; $deptIcon="Settings" }
            "Finance & Accounting" { $deptFolder="finance"; $deptColor="#2E7D32"; $deptIcon="DollarSign" }
            "Technology & Engineering" { $deptFolder="tech"; $deptColor="#1565C0"; $deptIcon="Cpu" }
            "Human Resources" { $deptFolder="hr"; $deptColor="#9C27B0"; $deptIcon="Users" }
            "Legal & Compliance" { $deptFolder="legal"; $deptColor="#3F51B5"; $deptIcon="Scale" }
            "Data & Intelligence" { $deptFolder="data"; $deptColor="#6366F1"; $deptIcon="Database" }
            "Product Management" { $deptFolder="product"; $deptColor="#8B5CF6"; $deptIcon="Package" }
            "Security & Risk" { $deptFolder="security"; $deptColor="#F44336"; $deptIcon="Shield" }
            "Research & Development" { $deptFolder="research"; $deptColor="#10B981"; $deptIcon="Telescope" }
            "Administrative" { $deptFolder="admin"; $deptColor="#475569"; $deptIcon="Building" }
            "Trading & Investments" { $deptFolder="trading"; $deptColor="#10B981"; $deptIcon="TrendingUp" }
            "Real Estate & Property" { $deptFolder="realestate"; $deptColor="#8B5CF6"; $deptIcon="Building2" }
            "Insurance & Risk" { $deptFolder="insurance"; $deptColor="#F59E0B"; $deptIcon="Shield" }
            "Healthcare & Medical" { $deptFolder="healthcare"; $deptColor="#EF4444"; $deptIcon="Heart" }
            "Manufacturing & Production" { $deptFolder="manufacturing"; $deptColor="#6366F1"; $deptIcon="Factory" }
            "Transportation & Logistics" { $deptFolder="transportation"; $deptColor="#0EA5E9"; $deptIcon="Truck" }
            "Government & Public Sector" { $deptFolder="government"; $deptColor="#475569"; $deptIcon="Landmark" }
            "Supply Chain & Logistics" { $deptFolder="supply-chain"; $deptColor="#0EA5E9"; $deptIcon="Package" }
            "AI Management & Governance" { $deptFolder="ai-mgmt"; $deptColor="#8B5CF6"; $deptIcon="Bot" }
        }
    }
    
    # Detect main agent line (numbered, like "1. AI Chief Customer Officer")
    if ($line -match '^\s*(\d+)\.\s+(AI\s+.+?)\s*$') {
        $currentMainAgent = $Matches[2].Trim()
        # Generate ID from name
        $currentMainAgentId = $currentMainAgent -replace 'AI\s+','' -replace '\s+','-' -replace '[^a-zA-Z0-9-]','' -replace '--+','-' -replace '^-|-$',''
        $currentMainAgentId = $currentMainAgentId.ToLower()
    }
    
    # Detect sub-agent line (starts with →)
    if ($line -match '→\s+(AI\s+.+?)\s*$') {
        $subName = $Matches[1].Trim()
        # Generate ID from sub-agent name
        $subId = $subName -replace 'AI\s+','' -replace '\s+','-' -replace '[^a-zA-Z0-9-]','' -replace '--+','-' -replace '^-|-$',''
        $subId = $subId.ToLower()
        
        $agents += @{
            subId = $subId
            subName = $subName
            parentId = $currentMainAgentId
            parentName = $currentMainAgent
            deptFolder = $deptFolder
            deptColor = $deptColor
            deptIcon = $deptIcon
        }
    }
}

Write-Output "Found $($agents.Count) sub-agents to generate"

# Create sub-agent pages
foreach ($agent in $agents) {
    $subDir = Join-Path $baseDir $agent.deptFolder
    if (-not (Test-Path $subDir)) {
        New-Item -ItemType Directory -Path $subDir -Force | Out-Null
    }
    
    $subAgentsDir = Join-Path $subDir "sub-agents"
    if (-not (Test-Path $subAgentsDir)) {
        New-Item -ItemType Directory -Path $subAgentsDir -Force | Out-Null
    }
    
    $filePath = Join-Path $subAgentsDir "$($agent.subId).tsx"
    
    if (-not (Test-Path $filePath)) {
        $pageContent = Generate-SubAgentPage -agentId $agent.subId -agentName $agent.subName -parentId $agent.parentId -parentName $agent.parentName -deptFolder $agent.deptFolder -color $agent.deptColor -icon $agent.deptIcon
        
        # Fix escaped quotes for JSX
        $pageContent = $pageContent -replace '\{\\?`"', '"'
        
        Set-Content -Path $filePath -Value $pageContent -Encoding UTF8
        $totalGenerated++
        
        if ($totalGenerated % 50 -eq 0) {
            Write-Output "Generated $totalGenerated pages..."
        }
    }
}

Write-Output ""
Write-Output "DONE! Generated $totalGenerated sub-agent pages"
Write-Output "Files created in: $baseDir\{department}\sub-agents\"
