$subBase = 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\sales\sub-agents'

# Fix duplicate Activity import and add correct icon for each sub-agent
$fixes = @{
  'discovery-questioner' = @{ icon = 'Target'; color = '#FF9500'; parentName = 'AI Sales Rep'; parentRoute = '/ai-agent/ai-sales-rep'; desc = 'Automated discovery & qualification question flows for sales prospects' }
  'demo-coordinator' = @{ icon = 'Eye'; color = '#5856D6'; parentName = 'AI Sales Rep'; parentRoute = '/ai-agent/ai-sales-rep'; desc = 'Schedule and coordinate product demonstrations with prospects' }
  'objection-handler' = @{ icon = 'Shield'; color = '#34C759'; parentName = 'AI Sales Rep'; parentRoute = '/ai-agent/ai-sales-rep'; desc = 'Real-time objection handling and response coaching for sales reps' }
  'deal-structurer' = @{ icon = 'Handshake'; color = '#007AFF'; parentName = 'AI Sales Executive'; parentRoute = '/ai-agent/ai-sales-executive'; desc = 'Structure complex deal terms, pricing models and contract frameworks' }
  'stakeholder-mapper' = @{ icon = 'Users'; color = '#FF9500'; parentName = 'AI Sales Executive'; parentRoute = '/ai-agent/ai-sales-executive'; desc = 'Map decision-makers, influencers and champions in target accounts' }
  'closing-strategist' = @{ icon = 'Target'; color = '#34C759'; parentName = 'AI Sales Executive'; parentRoute = '/ai-agent/ai-sales-executive'; desc = 'Optimize closing strategies, timing and negotiation tactics' }
  'contact-updater' = @{ icon = 'UserCheck'; color = '#007AFF'; parentName = 'AI CRM Assistant'; parentRoute = '/ai-agent/ai-crm-assistant'; desc = 'Automatically update contact records with latest information' }
  'activity-logger' = @{ icon = 'ClipboardList'; color = '#FF9500'; parentName = 'AI CRM Assistant'; parentRoute = '/ai-agent/ai-crm-assistant'; desc = 'Log all customer interactions and activities automatically' }
  'pipeline-organizer' = @{ icon = 'TrendingUp'; color = '#34C759'; parentName = 'AI CRM Assistant'; parentRoute = '/ai-agent/ai-crm-assistant'; desc = 'Organize and optimize sales pipeline stages and deal flow' }
  'template-selector' = @{ icon = 'FileText'; color = '#8B5CF6'; parentName = 'AI Proposal Generator'; parentRoute = '/ai-agent/sales/ai-proposal-generator'; desc = 'Select and customize the best proposal templates for each deal' }
  'pricing-calculator' = @{ icon = 'DollarSign'; color = '#F59E0B'; parentName = 'AI Proposal Generator'; parentRoute = '/ai-agent/sales/ai-proposal-generator'; desc = 'Calculate optimal pricing based on deal parameters and market data' }
  'proposal-reviewer' = @{ icon = 'CheckCircle'; color = '#10B981'; parentName = 'AI Proposal Generator'; parentRoute = '/ai-agent/sales/ai-proposal-generator'; desc = 'Review proposals for completeness, accuracy and persuasiveness' }
  'term-analyzer' = @{ icon = 'Search'; color = '#6366F1'; parentName = 'AI Negotiator'; parentRoute = '/ai-agent/ai-negotiator'; desc = 'Analyze contract terms and clauses for risks and opportunities' }
  'concession-tracker' = @{ icon = 'GitBranch'; color = '#EC4899'; parentName = 'AI Negotiator'; parentRoute = '/ai-agent/ai-negotiator'; desc = 'Track concessions made and received across negotiation rounds' }
  'batna-calculator' = @{ icon = 'Calculator'; color = '#14B8A6'; parentName = 'AI Negotiator'; parentRoute = '/ai-agent/ai-negotiator'; desc = 'Calculate Best Alternative to Negotiated Agreement for leverage analysis' }
}

foreach ($id in $fixes.Keys) {
  $fix = $fixes[$id]
  $file = Join-Path $subBase "$id.tsx"
  $iconName = $fix.icon
  $color = $fix.color
  $parentName = $fix.parentName
  $parentRoute = $fix.parentRoute
  $desc = $fix.desc
  $parentId = $id -replace '-.*$', ''
  $funcName = ($id -split '-' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
  
  # Build unique import list
  $allIcons = @('Activity', 'TrendingUp', 'Target', 'Zap', 'ArrowRight', 'Briefcase', 'Settings', $iconName) | Select-Object -Unique
  $iconImport = $allIcons -join ', '

  $caps = @("'Discovery Questions','Lead Qualification','AI-Powered','Real-time','Analytics','Automation'")
  $eps = @("'/consult/$id', '/$id/execute', '/$id/analyze'")
  $capsStr = $caps -replace "'", '' -split ',' | ForEach-Object { "'$($_.Trim())'" } | Join-String -Separator ','
  $epsStr = $eps -replace "'", '' -split ',' | ForEach-Object { "'$($_.Trim())'" } | Join-String -Separator ','

  $content = @"
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { $iconImport } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AI${funcName}Page() {
  const { theme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${color}20' }]}>
          <$iconName size={56} color="${color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI ${funcName}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of ${parentName}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${color}22' }]}><Briefcase size={12} color="${color}" /><Text style={[styles.badgeText, { color: '${color}' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Activity size={22} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>Active</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Status</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Briefcase size={22} color="${color}" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>Specialist</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Level</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Target size={22} color="${color}" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>20x</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <TrendingUp size={22} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>${parentId}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Parent</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          ${desc}. Sub-agent supporting ${parentName}. Part of the Kaytx AI Workforce hierarchy providing automated enterprise capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>AI-Powered</Text></View>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>Real-time</Text></View>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>Analytics</Text></View>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>Automation</Text></View>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>Enterprise</Text></View>
          <View style={[styles.tag, { backgroundColor: '${color}18' }]}><Text style={[styles.tagText, { color: '${color}' }]}>Integration</Text></View>
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
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/consult/${id}</Text>
        </View>
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/${id}/execute</Text>
        </View>
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/${id}/analyze</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('${parentRoute}')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <TrendingUp size={24} color="${color}" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>${parentName}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="${id}" agentName="AI ${funcName}" />
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
  Write-Host "Fixed: $id.tsx"
}
Write-Host "`nAll 15 sub-agent files fixed with correct icons and imports!"
