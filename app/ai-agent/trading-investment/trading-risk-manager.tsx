
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Shield, TriangleAlert, Activity, ChartBarBig, TrendingDown, CircleCheck } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const riskAlerts = [
  { type: 'Concentration Risk', detail: 'Tech sector exposure at 48% — limit is 40%', severity: 'High', color: '#FF3B30' },
  { type: 'Drawdown Limit', detail: 'Portfolio at -3.8% vs -5% max threshold', severity: 'Medium', color: '#FF9500' },
  { type: 'Correlation Spike', detail: 'BTC & NASDAQ correlation jumped to 0.89', severity: 'Medium', color: '#FF9500' },
  { type: 'VaR Breach Risk', detail: 'Daily VaR approaching $45K limit', severity: 'Low', color: '#00C853' },
];

const positions = [
  { asset: 'AAPL', size: '$288K', var: '$4,200', beta: '1.12', stopLoss: '$172.50', status: 'Safe' },
  { asset: 'NVDA', size: '$216K', var: '$8,640', beta: '1.78', stopLoss: '$820.00', status: 'Monitor' },
  { asset: 'BTC', size: '$192K', var: '$19,200', beta: '2.14', stopLoss: '$58,000', status: 'Monitor' },
  { asset: 'SPY', size: '$144K', var: '$2,160', beta: '1.00', stopLoss: '$520.00', status: 'Safe' },
];

export default function TradingRiskManagerScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-trading-risk-manager')!, []);

  const riskTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#FF5252', '#c62828']} style={styles.metricCard}>
          <Shield size={20} color="#fff" />
          <Text style={styles.metricValue}>LOW</Text>
          <Text style={styles.metricLabel}>Risk Level</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <TrendingDown size={20} color="#fff" />
          <Text style={styles.metricValue}>-4.2%</Text>
          <Text style={styles.metricLabel}>Current Drawdown</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>$32K</Text>
          <Text style={styles.metricLabel}>Daily VaR (95%)</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <CircleCheck size={20} color="#fff" />
          <Text style={styles.metricValue}>8,000</Text>
          <Text style={styles.metricLabel}>Checks/Day</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Alerts</Text>
          <TriangleAlert size={18} color="#FF9500" />
        </View>
        {riskAlerts.map((alert, i) => (
          <View key={i} style={[styles.alertCard, { backgroundColor: alert.color + '0D', borderLeftColor: alert.color }]}>
            <View style={styles.alertHeader}>
              <Text style={[styles.alertType, { color: alert.color }]}>{alert.type}</Text>
              <View style={[styles.severityBadge, { backgroundColor: alert.color + '20' }]}>
                <Text style={[styles.severityText, { color: alert.color }]}>{alert.severity}</Text>
              </View>
            </View>
            <Text style={[styles.alertDetail, { color: theme.colors.secondaryText }]}>{alert.detail}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Position Risk Monitor</Text>
        {positions.map((pos, i) => (
          <View key={i} style={[styles.posRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.posLeft}>
              <Text style={[styles.posAsset, { color: theme.colors.text }]}>{pos.asset}</Text>
              <Text style={[styles.posMeta, { color: theme.colors.secondaryText }]}>Stop: {pos.stopLoss} · β: {pos.beta}</Text>
            </View>
            <View style={styles.posCenter}>
              <Text style={[styles.posSize, { color: theme.colors.secondaryText }]}>{pos.size}</Text>
              <Text style={[styles.posVar, { color: '#FF9500' }]}>VaR: {pos.var}</Text>
            </View>
            <View style={[styles.statusBadge, {
              backgroundColor: pos.status === 'Safe' ? '#00C85318' : '#FF950018'
            }]}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: pos.status === 'Safe' ? '#00C853' : '#FF9500' }}>
                {pos.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'risk', label: 'Risk Monitor', icon: Shield, component: riskTab },
    { id: 'reports', label: 'Reports', icon: ChartBarBig, component: <View /> },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  alertCard: { borderLeftWidth: 3, borderRadius: 12, padding: 14, marginBottom: 10 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  alertType: { fontSize: 14, fontWeight: '700' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  severityText: { fontSize: 11, fontWeight: '700' },
  alertDetail: { fontSize: 13, lineHeight: 18 },
  posRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  posLeft: { flex: 1 },
  posAsset: { fontSize: 15, fontWeight: '700' },
  posMeta: { fontSize: 12, marginTop: 2 },
  posCenter: { alignItems: 'flex-end', marginRight: 10 },
  posSize: { fontSize: 13, fontWeight: '500' },
  posVar: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
});
