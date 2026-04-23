
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart2, TrendingUp, TrendingDown, Activity, Zap, BarChart3 } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const activeSignals = [
  { asset: 'AAPL', pattern: 'Bull Flag Breakout', tf: '1H', strength: 'Strong', direction: 'UP', entry: '$183.20' },
  { asset: 'SPY', pattern: 'Ascending Triangle', tf: '4H', strength: 'Moderate', direction: 'UP', entry: '$548.60' },
  { asset: 'BTC', pattern: 'Death Cross (MA50/MA200)', tf: '1D', strength: 'Strong', direction: 'DOWN', entry: '$65,400' },
  { asset: 'EUR/USD', pattern: 'Head & Shoulders', tf: '4H', strength: 'Strong', direction: 'DOWN', entry: '1.0845' },
  { asset: 'NVDA', pattern: 'Cup & Handle', tf: '1W', strength: 'Very Strong', direction: 'UP', entry: '$878.00' },
];

const indicators = [
  { name: 'RSI (14)', value: '68.4', signal: 'Neutral-Overbought', color: '#FF9500' },
  { name: 'MACD', value: 'Bullish Cross', signal: 'Buy', color: '#00C853' },
  { name: 'Bollinger Bands', value: 'Upper Band Touch', signal: 'Caution', color: '#FF9500' },
  { name: 'Volume Profile', value: 'Above Avg', signal: 'Confirming', color: '#00C853' },
  { name: '50 SMA', value: 'Price Above', signal: 'Bullish', color: '#00C853' },
  { name: 'Stochastic', value: '78 / 82', signal: 'Overbought', color: '#FF3B30' },
];

export default function TechnicalAnalysisScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-technical-analysis')!, []);

  const chartsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#64FFDA', '#00BFA5']} style={styles.metricCard}>
          <BarChart2 size={20} color="#fff" />
          <Text style={styles.metricValue}>200+</Text>
          <Text style={styles.metricLabel}>Indicators</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>96.3%</Text>
          <Text style={styles.metricLabel}>Signal Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>2,000</Text>
          <Text style={styles.metricLabel}>Analyses/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>5</Text>
          <Text style={styles.metricLabel}>Timeframes</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Chart Patterns</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {activeSignals.map((sig, i) => (
          <View key={i} style={[styles.signalRow, { borderBottomColor: theme.colors.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {sig.direction === 'UP'
                ? <TrendingUp size={16} color="#00C853" />
                : <TrendingDown size={16} color="#FF3B30" />}
              <Text style={[styles.sigAsset, { color: theme.colors.text }]}>{sig.asset}</Text>
            </View>
            <View style={styles.sigCenter}>
              <Text style={[styles.sigPattern, { color: theme.colors.text }]}>{sig.pattern}</Text>
              <Text style={[styles.sigMeta, { color: theme.colors.secondaryText }]}>TF: {sig.tf} · Entry: {sig.entry}</Text>
            </View>
            <View style={[styles.strengthBadge, {
              backgroundColor: sig.strength === 'Very Strong' || sig.strength === 'Strong' ? '#00C85320' : '#FF950020'
            }]}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: sig.strength.includes('Strong') ? '#00C853' : '#FF9500' }}>
                {sig.strength}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Key Indicators</Text>
        {indicators.map((ind, i) => (
          <View key={i} style={[styles.indRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.indName, { color: theme.colors.secondaryText }]}>{ind.name}</Text>
            <Text style={[styles.indValue, { color: theme.colors.text }]}>{ind.value}</Text>
            <View style={[styles.indSignal, { backgroundColor: ind.color + '20' }]}>
              <Text style={[styles.indSignalText, { color: ind.color }]}>{ind.signal}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'charts', label: 'Charts', icon: BarChart2, component: chartsTab },
    { id: 'signals', label: 'Signals', icon: BarChart3, component: <View /> },
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
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FF3B3020', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#FF3B30' },
  liveText: { fontSize: 11, color: '#FF3B30', fontWeight: '700' },
  signalRow: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 6 },
  sigAsset: { fontSize: 15, fontWeight: '700' },
  sigCenter: { marginTop: 4 },
  sigPattern: { fontSize: 13, fontWeight: '500' },
  sigMeta: { fontSize: 11, marginTop: 2 },
  strengthBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginTop: 4 },
  indRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: StyleSheet.hairlineWidth },
  indName: { flex: 1, fontSize: 13 },
  indValue: { fontSize: 13, fontWeight: '600', marginRight: 10 },
  indSignal: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  indSignalText: { fontSize: 11, fontWeight: '700' },
});
