 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';

export default function AISalesExecutiveScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-sales-executive')!;
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ timeRange: '7d' });

  const revenue = '0';
  const committed = `$${(Number(revenue) * 0.6 / 1000).toFixed(0)}k`;
  const upside = `$${(Number(revenue) * 0.4 / 1000).toFixed(0)}k`;
  const gap = `$${(Number(revenue) * 0.05 / 1000).toFixed(0)}k`;

  const strategicDeals: { name: string; stage: string; value: string; probability: number }[] = [
    { name: 'Deal Review', stage: 'Negotiation', value: '—', probability: Math.round(analytics?.successRate ?? 0) },
    { name: 'Pipeline Cleanup', stage: 'Validating', value: '—', probability: Math.round(analytics?.successRate ?? 0) },
    { name: 'Contract Assist', stage: 'Contract', value: '—', probability: Math.round(analytics?.successRate ?? 0) },
  ];

  const renderDealDeskTab = (
    <View style={styles.tabContent}>
      <View style={[styles.kpiCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Quarterly Forecast</Text>
        <View style={styles.kpiGrid}>
          <View style={styles.kpiItem}>
            <Text style={styles.kpiLabel}>COMMITTED</Text>
            <Text style={[styles.kpiValue, { color: theme.colors.primary }]}>{committed}</Text>
          </View>
          <View style={styles.kpiDivider} />
          <View style={styles.kpiItem}>
            <Text style={styles.kpiLabel}>UPSIDE</Text>
            <Text style={[styles.kpiValue, { color: '#34C759' }]}>{upside}</Text>
          </View>
          <View style={styles.kpiDivider} />
          <View style={styles.kpiItem}>
            <Text style={styles.kpiLabel}>GAP TO Q</Text>
            <Text style={[styles.kpiValue, { color: '#FF3B30' }]}>{gap}</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Strategic Deals</Text>
      {strategicDeals.map((deal, i) => (
        <View key={i} style={[styles.dealCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.dealHeader}>
            <View style={styles.dealInfo}>
              <Text style={[styles.dealName, { color: theme.colors.text }]}>{deal.name}</Text>
              <Text style={[styles.dealStage, { color: theme.colors.secondaryText }]}>{deal.stage}</Text>
            </View>
            <View style={styles.dealValueBox}>
              <Text style={[styles.dealValue, { color: theme.colors.text }]}>{deal.value}</Text>
              <View style={[styles.probBadge, { backgroundColor: deal.probability > 80 ? '#34C75920' : deal.probability > 50 ? '#FF950020' : '#FF3B3020' }]}>
                <Text style={[styles.probText, { color: deal.probability > 80 ? '#34C759' : deal.probability > 50 ? '#FF9500' : '#FF3B30' }]}>{deal.probability}%</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'forecast', label: 'Forecast', icon: TrendingUp, component: renderDealDeskTab }
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  kpiCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  kpiGrid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kpiItem: { alignItems: 'center', flex: 1 },
  kpiLabel: { fontSize: 10, fontWeight: '700', opacity: 0.6, marginBottom: 4 },
  kpiValue: { fontSize: 22, fontWeight: '900' },
  kpiDivider: { width: 1, height: 30, backgroundColor: 'rgba(150,150,150,0.2)' },
  sectionHeader: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  dealCard: { padding: 18, borderRadius: 20, marginBottom: 12 },
  dealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dealInfo: { flex: 1 },
  dealName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  dealStage: { fontSize: 11, fontWeight: '600' },
  dealValueBox: { alignItems: 'flex-end' },
  dealValue: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  probBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5 },
  probText: { fontSize: 10, fontWeight: '800' }
});
