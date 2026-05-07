
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingDown, Activity, ChartBarBig, Zap, DollarSign, Shield } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const activePositions = [
  { symbol: 'SPY 550C 04/18', type: 'Call', delta: '+0.62', theta: '-0.18', premium: '$4.20', pnl: '+$840', status: 'Profit' },
  { symbol: 'QQQ 460P 04/25', type: 'Put', delta: '-0.38', theta: '-0.22', premium: '$3.80', pnl: '-$260', status: 'Loss' },
  { symbol: 'AAPL 185C 05/02', type: 'Call', delta: '+0.44', theta: '-0.14', premium: '$2.95', pnl: '+$1,180', status: 'Profit' },
  { symbol: 'ES Jun 2024', type: 'Future', delta: '+1.00', theta: 'N/A', premium: '$5,400', pnl: '+$2,400', status: 'Profit' },
  { symbol: 'NQ Iron Condor', type: 'Spread', delta: '+0.04', theta: '+0.42', premium: '$8.60', pnl: '+$320', status: 'Profit' },
];

const greeksSummary = [
  { greek: 'Net Delta', value: '+0.72', desc: 'Bullish bias' },
  { greek: 'Net Gamma', value: '+0.14', desc: 'Positive convexity' },
  { greek: 'Net Theta', value: '-$124/day', desc: 'Time decay cost' },
  { greek: 'Net Vega', value: '+$890', desc: 'Volatility exposure' },
];

export default function FuturesOptionsScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-futures-options')!, []);

  const positionsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#FF4081', '#c51162']} style={styles.metricCard}>
          <TrendingDown size={20} color="#fff" />
          <Text style={styles.metricValue}>1,500</Text>
          <Text style={styles.metricLabel}>Contracts/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>95.2%</Text>
          <Text style={styles.metricLabel}>Win Rate</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>0.1s</Text>
          <Text style={styles.metricLabel}>Execution</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>$16K</Text>
          <Text style={styles.metricLabel}>Monthly P&L</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Open Positions</Text>
        {activePositions.map((pos, i) => (
          <View key={i} style={[styles.posCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
            <View style={styles.posHeader}>
              <Text style={[styles.posSymbol, { color: theme.colors.text }]}>{pos.symbol}</Text>
              <View style={[styles.typeBadge, { backgroundColor: '#5856D618' }]}>
                <Text style={{ color: '#5856D6', fontSize: 11, fontWeight: '700' }}>{pos.type}</Text>
              </View>
              <Text style={[styles.posPnl, { color: pos.pnl.startsWith('+') ? '#00C853' : '#FF3B30' }]}>{pos.pnl}</Text>
            </View>
            <View style={styles.posGreeks}>
              <Text style={[styles.greekItem, { color: theme.colors.secondaryText }]}>Δ {pos.delta}</Text>
              <Text style={[styles.greekItem, { color: theme.colors.secondaryText }]}>Θ {pos.theta}</Text>
              <Text style={[styles.greekItem, { color: theme.colors.secondaryText }]}>Premium: {pos.premium}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Portfolio Greeks</Text>
        {greeksSummary.map((g, i) => (
          <View key={i} style={[styles.greekRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.greekName, { color: theme.colors.secondaryText }]}>{g.greek}</Text>
            <Text style={[styles.greekValue, { color: theme.colors.text }]}>{g.value}</Text>
            <Text style={[styles.greekDesc, { color: '#5856D6' }]}>{g.desc}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'positions', label: 'Positions', icon: TrendingDown, component: positionsTab },
    { id: 'strategies', label: 'Strategies', icon: ChartBarBig, component: <View /> },
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
  posCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10 },
  posHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  posSymbol: { flex: 1, fontSize: 14, fontWeight: '700' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  posPnl: { fontSize: 14, fontWeight: '800' },
  posGreeks: { flexDirection: 'row', gap: 16 },
  greekItem: { fontSize: 12 },
  greekRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  greekName: { flex: 1, fontSize: 13 },
  greekValue: { fontSize: 14, fontWeight: '700', marginRight: 10 },
  greekDesc: { fontSize: 12, fontWeight: '500' },
});
