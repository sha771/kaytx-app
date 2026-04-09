 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield, FileText } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';

export default function AINegotiationSpecialistScreen() {
  const { theme } = useTheme();
  // Using specific ID from constants
  const agent = aiEmployees.find(e => e.id === 'ai-negotiation-specialist')!;
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ timeRange: '7d' });
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 20 });

  const contracts: { name: string; status: string; flag: string; risk: string }[] = (activityData?.activities ?? []).slice(0, 3).map((a: any, idx: number) => ({
    name: a.details?.contractName || a.action || `Contract ${idx + 1}`,
    status: a.status === 'success' ? 'Approved' : a.status === 'error' ? 'Redlining' : 'Review',
    flag: a.details?.flag || 'None',
    risk: a.status === 'error' ? 'Medium' : 'Low',
  }));

  const riskPercent = typeof analytics?.errorRate === 'string'
    ? Math.min(100, Math.max(0, Math.round(Number(analytics.errorRate.replace('%', '')))))
    : 12;

  const renderContractTab = (
    <View style={styles.tabContent}>
      <View style={[styles.riskCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Portfolio Risk</Text>
        <View style={styles.riskMeter}>
          <View style={[styles.riskFill, { width: `${riskPercent}%`, backgroundColor: riskPercent > 30 ? '#FF3B30' : riskPercent > 15 ? '#FF9500' : '#34C759' }]} />
        </View>
        <Text style={[styles.riskText, { color: theme.colors.secondaryText }]}>{riskPercent > 30 ? 'High Exposure' : riskPercent > 15 ? 'Medium Exposure' : 'Low Exposure'}</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contract Analysis</Text>
      {contracts.map((con, i) => (
        <View key={i} style={[styles.conCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.conIcon}>
            <FileText size={18} color={theme.colors.text} />
          </View>
          <View style={styles.conInfo}>
            <Text style={[styles.conName, { color: theme.colors.text }]}>{con.name}</Text>
            <Text style={[styles.conStatus, { color: theme.colors.secondaryText }]}>{con.status}</Text>
          </View>
          <View style={styles.conRisk}>
            <Text style={[styles.riskTag, { color: con.risk === 'Low' ? '#34C759' : '#FF9500' }]}>{con.risk} Risk</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'contracts', label: 'Contracts', icon: Shield, component: renderContractTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  riskCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 15 },
  riskMeter: { height: 10, backgroundColor: 'rgba(150,150,150,0.1)', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  riskFill: { height: '100%' },
  riskText: { fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  conCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 15 },
  conIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(150,150,150,0.1)', alignItems: 'center', justifyContent: 'center' },
  conInfo: { flex: 1 },
  conName: { fontSize: 15, fontWeight: '700' },
  conStatus: { fontSize: 12 },
  conRisk: { alignItems: 'flex-end' },
  riskTag: { fontSize: 11, fontWeight: '800' }
});
