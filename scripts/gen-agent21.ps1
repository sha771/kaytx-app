$base = 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent'
$subBase = "$base\sales\sub-agents"

# Helper: generate enterprise sub-agent page
function Write-SubAgent($name, $parentId, $parentName, $parentRoute, $color, $desc, $capabilities, $endpoints) {
  $id = $name.ToLower() -replace ' ', '-'
  $file = "$subBase\$id.tsx"
  $caps = ($capabilities | ForEach-Object { "'$_'" }) -join ','
  $eps = ($endpoints | ForEach-Object { "'$_'" }) -join ','
  $iconMap = @{
    'discovery-questioner' = 'Target'; 'demo-coordinator' = 'Eye'; 'objection-handler' = 'Shield'
    'deal-structurer' = 'Handshake'; 'stakeholder-mapper' = 'Users'; 'closing-strategist' = 'Target'
    'contact-updater' = 'UserCheck'; 'activity-logger' = 'ClipboardList'; 'pipeline-organizer' = 'TrendingUp'
    'template-selector' = 'FileText'; 'pricing-calculator' = 'DollarSign'; 'proposal-reviewer' = 'CheckCircle'
    'term-analyzer' = 'Search'; 'concession-tracker' = 'GitBranch'; 'batna-calculator' = 'Calculator'
  }
  $icon = $iconMap[$id] -replace ' ', ''
  if (-not $icon) { $icon = 'Activity' }

  $content = @"
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Activity, TrendingUp, Target, Zap, ArrowRight, Briefcase, Settings, $icon } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function $($name -replace ' ', '')Page() {
  const { theme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}20' }]}>
          <$icon size={56} color="${color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>$name</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of $parentName</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}><Briefcase size={12} color="${color}" /><Text style={[styles.badgeText, { color: '${color}' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Status',value:'Active',icon: Activity, color: '#34C759'},
          {label:'Level',value:'Specialist',icon: Briefcase, color: '${color}'},
          {label:'Efficiency',value:'20x',icon: Target, color: '${color}'},
          {label:'Parent',value:'${parentId}',icon: TrendingUp, color: '#007AFF'}
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
          $desc. Sub-agent supporting $parentName. Part of the Kaytx AI Workforce hierarchy providing automated enterprise capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {[$caps].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '${color}18' }]}>
              <Text style={[styles.tagText, { color: '${color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
        <View style={styles.configRow}>
          <Text style={[styles.configLabel, { color: theme.colors.text }]}>Active</Text>
          <Switch value={active} onValueChange={setActive} trackColor={{ false: '#ccc', true: '#34C759' }} />
        </View>
        <View style={styles.configRow}>
          <Text style={[styles.configLabel, { color: theme.colors.text }]}>Auto Mode</Text>
          <Switch value={autoMode} onValueChange={setAutoMode} trackColor={{ false: '#ccc', true: '${color}' }} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {[$eps].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('$parentRoute')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <TrendingUp size={24} color="${color}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>$parentName</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="$id" agentName="$name" />
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
  configRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  configLabel: { fontSize: 15, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
"@
  Set-Content -Path $file -Encoding UTF8 -Value $content
  Write-Host "Done: $id.tsx"
}

# ============================================================
# AGENT 21: AI Sales Rep - Sub-Agents
# ============================================================
Write-SubAgent 'AI Discovery Questioner' 'sales-rep' 'AI Sales Rep' '/ai-agent/ai-sales-rep' '#FF9500' 'Automated discovery & qualification question flows for sales prospects' @('Discovery Questions','Lead Qualification','AI-Powered','Real-time','Analytics','Automation') @('/consult/discovery-questioner','/discovery-questioner/execute','/discovery-questioner/analyze')

Write-SubAgent 'AI Demo Coordinator' 'sales-rep' 'AI Sales Rep' '/ai-agent/ai-sales-rep' '#5856D6' 'Schedule and coordinate product demonstrations with prospects' @('Demo Scheduling','Presentation AI','Real-time','Analytics','Integration','Automation') @('/consult/demo-coordinator','/demo-coordinator/execute','/demo-coordinator/analyze')

Write-SubAgent 'AI Objection Handler' 'sales-rep' 'AI Sales Rep' '/ai-agent/ai-sales-rep' '#34C759' 'Real-time objection handling and response coaching for sales reps' @('Objection Handling','Response Coaching','AI-Powered','Real-time','Analytics','Automation') @('/consult/objection-handler','/objection-handler/execute','/objection-handler/analyze')

# ============================================================
# AGENT 22: AI Sales Executive - Sub-Agents
# ============================================================
Write-SubAgent 'AI Deal Structurer' 'sales-executive' 'AI Sales Executive' '/ai-agent/ai-sales-executive' '#007AFF' 'Structure complex deal terms, pricing models and contract frameworks' @('Deal Structuring','Pricing Models','AI-Powered','Real-time','Analytics','Automation') @('/consult/deal-structurer','/deal-structurer/execute','/deal-structurer/analyze')

Write-SubAgent 'AI Stakeholder Mapper' 'sales-executive' 'AI Sales Executive' '/ai-agent/ai-sales-executive' '#FF9500' 'Map decision-makers, influencers and champions in target accounts' @('Stakeholder Mapping','Org Charts','AI-Powered','Real-time','Analytics','Automation') @('/consult/stakeholder-mapper','/stakeholder-mapper/execute','/stakeholder-mapper/analyze')

Write-SubAgent 'AI Closing Strategist' 'sales-executive' 'AI Sales Executive' '/ai-agent/ai-sales-executive' '#34C759' 'Optimize closing strategies, timing and negotiation tactics' @('Closing Strategy','Win Plans','AI-Powered','Real-time','Analytics','Automation') @('/consult/closing-strategist','/closing-strategist/execute','/closing-strategist/analyze')

# ============================================================
# AGENT 23: AI CRM Assistant - Sub-Agents
# ============================================================
Write-SubAgent 'AI Contact Updater' 'crm-assistant' 'AI CRM Assistant' '/ai-agent/ai-crm-assistant' '#007AFF' 'Automatically update contact records with latest information' @('Contact Updates','Data Sync','AI-Powered','Real-time','Analytics','Automation') @('/consult/contact-updater','/contact-updater/execute','/contact-updater/analyze')

Write-SubAgent 'AI Activity Logger' 'crm-assistant' 'AI CRM Assistant' '/ai-agent/ai-crm-assistant' '#FF9500' 'Log all customer interactions and activities automatically' @('Activity Logging','Interaction Tracking','AI-Powered','Real-time','Analytics','Automation') @('/consult/activity-logger','/activity-logger/execute','/activity-logger/analyze')

Write-SubAgent 'AI Pipeline Organizer' 'crm-assistant' 'AI CRM Assistant' '/ai-agent/ai-crm-assistant' '#34C759' 'Organize and optimize sales pipeline stages and deal flow' @('Pipeline Organization','Deal Flow','AI-Powered','Real-time','Analytics','Automation') @('/consult/pipeline-organizer','/pipeline-organizer/execute','/pipeline-organizer/analyze')

# ============================================================
# AGENT 24: AI Proposal Generator - Sub-Agents
# ============================================================
Write-SubAgent 'AI Template Selector' 'proposal-generator' 'AI Proposal Generator' '/ai-agent/sales/ai-proposal-generator' '#8B5CF6' 'Select and customize the best proposal templates for each deal' @('Template Selection','Customization','AI-Powered','Real-time','Analytics','Automation') @('/consult/template-selector','/template-selector/execute','/template-selector/analyze')

Write-SubAgent 'AI Pricing Calculator' 'proposal-generator' 'AI Proposal Generator' '/ai-agent/sales/ai-proposal-generator' '#F59E0B' 'Calculate optimal pricing based on deal parameters and market data' @('Pricing Calculation','Margin Analysis','AI-Powered','Real-time','Analytics','Automation') @('/consult/pricing-calculator','/pricing-calculator/execute','/pricing-calculator/analyze')

Write-SubAgent 'AI Proposal Reviewer' 'proposal-generator' 'AI Proposal Generator' '/ai-agent/sales/ai-proposal-generator' '#10B981' 'Review proposals for completeness, accuracy and persuasiveness' @('Proposal Review','Quality Check','AI-Powered','Real-time','Analytics','Automation') @('/consult/proposal-reviewer','/proposal-reviewer/execute','/proposal-reviewer/analyze')

# ============================================================
# AGENT 25: AI Negotiator - Sub-Agents
# ============================================================
Write-SubAgent 'AI Term Analyzer' 'negotiator' 'AI Negotiator' '/ai-agent/ai-negotiator' '#6366F1' 'Analyze contract terms and clauses for risks and opportunities' @('Term Analysis','Risk Detection','AI-Powered','Real-time','Analytics','Automation') @('/consult/term-analyzer','/term-analyzer/execute','/term-analyzer/analyze')

Write-SubAgent 'AI Concession Tracker' 'negotiator' 'AI Negotiator' '/ai-agent/ai-negotiator' '#EC4899' 'Track concessions made and received across negotiation rounds' @('Concession Tracking','Trade-offs','AI-Powered','Real-time','Analytics','Automation') @('/consult/concession-tracker','/concession-tracker/execute','/concession-tracker/analyze')

Write-SubAgent 'AI BATNA Calculator' 'negotiator' 'AI Negotiator' '/ai-agent/ai-negotiator' '#14B8A6' 'Calculate Best Alternative to Negotiated Agreement for leverage analysis' @('BATNA Calculation','Leverage Analysis','AI-Powered','Real-time','Analytics','Automation') @('/consult/batna-calculator','/batna-calculator/execute','/batna-calculator/analyze')

Write-Host "`nAll 15 sub-agent pages generated!"
