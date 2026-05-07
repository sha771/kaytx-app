 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartBarBig, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';

export default function AISalesDataAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-sales-data-analyst')!;

  const renderInsightsTab = (
    <View style={styles.tabContent}>
      <View style={[styles.mainMetric, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>FORECAST ACCURACY</Text>
        <Text style={[styles.metricVal, { color: theme.colors.primary }]}>97.8%</Text>
        <Text style={[styles.metricSub, { color: theme.colors.secondaryText }]}>+2.1% vs last month</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Detected Trends</Text>
      {[
        { title: 'Mid-Market Velocity', desc: 'Deal cycle time reduced by 14% in MM segment.', impact: '+ $120k ARR' },
        { title: 'Churn Risk', desc: 'Usage drop detected in 12 enterprise accounts.', impact: 'Flagged' },
      ].map((trend, i) => (
        <View key={i} style={[styles.trendCard, { backgroundColor: theme.colors.cardBackground }]}>
          <TrendingUp size={20} color="#5AC8FA" style={{ marginBottom: 12 }} />
          <Text style={[styles.trendTitle, { color: theme.colors.text }]}>{trend.title}</Text>
          <Text style={[styles.trendDesc, { color: theme.colors.secondaryText }]}>{trend.desc}</Text>
          <View style={[styles.impactBox, { backgroundColor: '#5AC8FA15', marginTop: 12, alignSelf: 'flex-start' }]}>
            <Text style={[styles.impactText, { color: '#5AC8FA' }]}>{trend.impact}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'insights', label: 'Insights', icon: ChartBarBig, component: renderInsightsTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  mainMetric: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 25 },
  metricLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  metricVal: { fontSize: 48, fontWeight: '900', marginBottom: 4 },
  metricSub: { fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  trendCard: { padding: 20, borderRadius: 20, marginBottom: 15 },
  trendTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  trendDesc: { fontSize: 14, lineHeight: 20 },
  impactBox: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  impactText: { fontSize: 11, fontWeight: '800' }
});
