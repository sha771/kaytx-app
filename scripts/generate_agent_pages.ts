import fs from 'fs';
import path from 'path';
import { aiEmployees } from '../constants/aiEmployees';
import {
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
  operationsManagementSubAgents,
  dataIntelligenceSubAgents,
  analysisInsightsPerformanceSubAgents,
  accountingFinanceSubAgents,
} from '../constants/aiAgentHierarchy';
import {
  executiveLeadershipSubAgents,
  productRndSubAgents,
  humanResourcesSubAgents,
  itTechnologySubAgents,
  legalComplianceSubAgents,
  engineeringDevelopmentSubAgents,
  aiPersonalAssistantSubAgents,
} from '../constants/aiAgentHierarchy_ext';

// Gather all agents from all hierarchies
const allAgents = [
  ...aiEmployees,
  ...(typeof customerExperienceSubAgents !== 'undefined' ? customerExperienceSubAgents : []),
  ...(typeof salesRevenueSubAgents !== 'undefined' ? salesRevenueSubAgents : []),
  ...(typeof marketingGrowthSubAgents !== 'undefined' ? marketingGrowthSubAgents : []),
  ...(typeof operationsManagementSubAgents !== 'undefined' ? operationsManagementSubAgents : []),
  ...(typeof dataIntelligenceSubAgents !== 'undefined' ? dataIntelligenceSubAgents : []),
  ...(typeof analysisInsightsPerformanceSubAgents !== 'undefined' ? analysisInsightsPerformanceSubAgents : []),
  ...(typeof accountingFinanceSubAgents !== 'undefined' ? accountingFinanceSubAgents : []),
  ...(typeof executiveLeadershipSubAgents !== 'undefined' ? executiveLeadershipSubAgents : []),
  ...(typeof productRndSubAgents !== 'undefined' ? productRndSubAgents : []),
  ...(typeof humanResourcesSubAgents !== 'undefined' ? humanResourcesSubAgents : []),
  ...(typeof itTechnologySubAgents !== 'undefined' ? itTechnologySubAgents : []),
  ...(typeof legalComplianceSubAgents !== 'undefined' ? legalComplianceSubAgents : []),
  ...(typeof engineeringDevelopmentSubAgents !== 'undefined' ? engineeringDevelopmentSubAgents : []),
  ...(typeof aiPersonalAssistantSubAgents !== 'undefined' ? aiPersonalAssistantSubAgents : []),
];

const generatedCount = { val: 0 };
const skippedCount = { val: 0 };
const errorCount = { val: 0 };

// Ensure a directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Extract base routing path from the route defined in the agent, assuming it starts with '/ai-agent/'
function generateFileForAgent(agent) {
  if (!agent.route) return;

  // e.g. "/ai-agent/ai-cmo" -> "app/ai-agent/ai-cmo.tsx"
  // e.g. "/ai-agent/category/operations-management" -> This is a category, skip.
  if (agent.route.includes('/category/')) {
    return;
  }

  // Remove leading slash and split
  let relativePath = agent.route.startsWith('/') ? agent.route.substring(1) : agent.route;
  
  // if the route doesn't go to ai-agent, ignore for now
  if (!relativePath.startsWith('ai-agent/')) {
      relativePath = `ai-agent/${relativePath}`;
  }

  const fullPath = path.join(process.cwd(), 'app', `${relativePath}.tsx`);

  // Ensure directory exists
  ensureDir(path.dirname(fullPath));

  // If file already exists, don't overwrite if it has substantial content
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    if (stats.size > 200) {
      skippedCount.val++;
      return;
    }
  }

  // Create a template based on the AgentShell
  const template = `
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Bot, Activity, ChartBar, TrendingUp, Clock, Zap, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

export default function ${agent.id.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase())}Screen() {
  const { theme } = useTheme();
  
  // Mock Agent object just in case it doesn't align correctly
  const agent = useMemo(() => ({
    id: '${agent.id}',
    name: '${agent.name.replace(/'/g, "\\'")}',
    title: '${agent.title.replace(/'/g, "\\'")}',
    description: '${(agent.description || 'AI Agent').replace(/'/g, "\\'")}',
    category: '${agent.category}',
    type: '${agent.type || 'subagent'}',
    status: '${agent.status || 'active'}',
    capabilities: ${JSON.stringify(agent.capabilities || ['Automation'])},
    performance: { successRate: 98, averageResponseTime: 1.2, customerSatisfaction: 4.8 },
  }), []);

  const dashboardTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#69F0AE', '#00b359']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>12.5k</Text>
          <Text style={styles.metricLabel}>Tasks Today</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>0.8s</Text>
          <Text style={styles.metricLabel}>Avg Response</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>98.5%</Text>
          <Text style={styles.metricLabel}>Success Rate</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
          <Clock size={18} color={theme.colors.secondaryText} />
        </View>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={[styles.tradeRow, { borderBottomColor: theme.colors.border }]}>
             <View style={[styles.sideTag, { backgroundColor: theme.colors.primary + '20' }]}>
               <Target size={14} color={theme.colors.primary} />
             </View>
             <View style={styles.tradeInfo}>
               <Text style={[styles.tradeAsset, { color: theme.colors.text }]}>Executed Operation #{Math.floor(Math.random() * 9000) + 1000}</Text>
               <Text style={[styles.tradeMeta, { color: theme.colors.secondaryText }]}>Status: Optimal</Text>
             </View>
             <Text style={[styles.tradePnl, { color: '#00C853' }]}>Success</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBar, component: dashboardTab },
  ];

  return <AgentShell agent={agent as any} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, minWidth: '30%', padding: 16, borderRadius: 20, gap: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  tradeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  sideTag: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  tradeInfo: { flex: 1 },
  tradeAsset: { fontSize: 14, fontWeight: '600' },
  tradeMeta: { fontSize: 12, marginTop: 2 },
  tradePnl: { fontSize: 14, fontWeight: '800' },
});
`;

  try {
    fs.writeFileSync(fullPath, template.trim());
    generatedCount.val++;
    console.log('[Generated]', fullPath);
  } catch (err) {
    console.error('Error generating', fullPath, err);
    errorCount.val++;
  }
}

// Deduplicate by route
const seenRoutes = new Set();
for (const agent of allAgents) {
  if (agent && agent.route) {
    if (!seenRoutes.has(agent.route)) {
        seenRoutes.add(agent.route);
        generateFileForAgent(agent);
    }
  }
}

console.log('--- Generation Complete ---');
console.log('Generated:', generatedCount.val);
console.log('Skipped (already exists):', skippedCount.val);
console.log('Errors:', errorCount.val);
