
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartPie, TrendingUp, Shield, ChartBarBig, DollarSign, Activity } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const holdings = [
  { ticker: 'AAPL', name: 'Apple Inc.', allocation: 12, value: '$288K', return: '+24.5%', color: '#007AFF' },
  { ticker: 'MSFT', name: 'Microsoft', allocation: 11, value: '$264K', return: '+31.2%', color: '#00C853' },
  { ticker: 'NVDA', name: 'NVIDIA', allocation: 9, value: '$216K', return: '+82.4%', color: '#69F0AE' },
  { ticker: 'BTC', name: 'Bitcoin', allocation: 8, value: '$192K', return: '+56.8%', color: '#FF9500' },
  { ticker: 'GLD', name: 'Gold ETF', allocation: 7, value: '$168K', return: '+8.3%', color: '#FFCC00' },
  { ticker: 'AMZN', name: 'Amazon', allocation: 6, value: '$144K', return: '+19.7%', color: '#FF6D00' },
];

export default function PortfolioManagerScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-portfolio-manager')!, []);

  const portfolioTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>$2.4M</Text>
          <Text style={styles.metricLabel}>Portfolio Value</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>+18.4%</Text>
          <Text style={styles.metricLabel}>YTD Return</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>1.87</Text>
          <Text style={styles.metricLabel}>Sharpe Ratio</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF3B30', '#cc2f26']} style={styles.metricCard}>
          <Shield size={20} color="#fff" />
          <Text style={styles.metricValue}>-4.2%</Text>
          <Text style={styles.metricLabel}>Max Drawdown</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Portfolio Holdings</Text>
        {holdings.map((h, i) => (
          <View key={i} style={[styles.holdingRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.tickerBadge, { backgroundColor: h.color + '25' }]}>
              <Text style={[styles.ticker, { color: h.color }]}>{h.ticker}</Text>
            </View>
            <View style={styles.holdingInfo}>
              <Text style={[styles.holdingName, { color: theme.colors.text }]}>{h.name}</Text>
              <View style={styles.allocationBar}>
                <View style={[styles.allocationFill, { width: `${h.allocation * 4}%` as any, backgroundColor: h.color }]} />
              </View>
            </View>
            <View style={styles.holdingRight}>
              <Text style={[styles.holdingValue, { color: theme.colors.text }]}>{h.value}</Text>
              <Text style={[styles.holdingReturn, { color: '#00C853' }]}>{h.return}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Rebalancing Actions</Text>
        {[
          { action: 'Increase NVDA allocation by 2%', priority: 'High', color: '#FF3B30' },
          { action: 'Trim BTC position - profit taking', priority: 'Medium', color: '#FF9500' },
          { action: 'Add Fixed Income exposure', priority: 'Low', color: '#00C853' },
          { action: 'Harvest AMZN tax losses', priority: 'Scheduled', color: '#007AFF' },
        ].map((action, i) => (
          <View key={i} style={[styles.actionRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.priorityDot, { backgroundColor: action.color }]} />
            <Text style={[styles.actionText, { color: theme.colors.text }]}>{action.action}</Text>
            <Text style={[styles.priorityLabel, { color: action.color }]}>{action.priority}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'portfolio', label: 'Portfolio', icon: ChartPie, component: portfolioTab },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: <View /> },
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
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  holdingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  tickerBadge: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  ticker: { fontSize: 13, fontWeight: '800' },
  holdingInfo: { flex: 1 },
  holdingName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  allocationBar: { height: 4, backgroundColor: '#E5E5EA', borderRadius: 2, overflow: 'hidden', width: '100%' },
  allocationFill: { height: '100%', borderRadius: 2 },
  holdingRight: { alignItems: 'flex-end' },
  holdingValue: { fontSize: 14, fontWeight: '700' },
  holdingReturn: { fontSize: 12, marginTop: 2 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  priorityDot: { width: 9, height: 9, borderRadius: 5 },
  actionText: { flex: 1, fontSize: 14 },
  priorityLabel: { fontSize: 12, fontWeight: '700' },
});
