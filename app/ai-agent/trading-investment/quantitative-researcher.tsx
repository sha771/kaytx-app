
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlaskConical, TrendingUp, Activity, ChartBar, Brain, Zap } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const strategies = [
  { name: 'Momentum Factor v3.2', type: 'Factor Model', sharpe: '2.14', returns: '+31.2% YTD', status: 'Live', maxDD: '-8.4%' },
  { name: 'Statistical Arbitrage SPX', type: 'Stat Arb', sharpe: '1.87', returns: '+18.6% YTD', status: 'Live', maxDD: '-4.1%' },
  { name: 'Vol Surface Arb', type: 'Options', sharpe: '3.22', returns: '+44.4% YTD', status: 'Testing', maxDD: '-6.8%' },
  { name: 'Crypto Cross-Exchange', type: 'Arbitrage', sharpe: '1.54', returns: '+22.1% YTD', status: 'Live', maxDD: '-11.2%' },
];

const researchQueue = [
  { title: 'Intraday momentum decay analysis', progress: 84, eta: '2 days' },
  { title: 'Alternative data: satellite imagery signals', progress: 42, eta: '5 days' },
  { title: 'NLP earnings call alpha extraction', progress: 92, eta: '1 day' },
  { title: 'Crypto order book microstructure study', progress: 17, eta: '10 days' },
];

export default function QuantitativeResearcherScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-quantitative-researcher')!, []);

  const researchTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#651FFF', '#4a148c']} style={styles.metricCard}>
          <FlaskConical size={20} color="#fff" />
          <Text style={styles.metricValue}>97.1%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Brain size={20} color="#fff" />
          <Text style={styles.metricValue}>500</Text>
          <Text style={styles.metricLabel}>Backtests/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>4</Text>
          <Text style={styles.metricLabel}>Live Strategies</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>$19K</Text>
          <Text style={styles.metricLabel}>Monthly Alpha</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Live Strategies</Text>
        {strategies.map((strat, i) => (
          <View key={i} style={[styles.stratCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
            <View style={styles.stratHeader}>
              <Text style={[styles.stratName, { color: theme.colors.text }]}>{strat.name}</Text>
              <View style={[styles.statusBadge, {
                backgroundColor: strat.status === 'Live' ? '#00C85318' : '#FF950018'
              }]}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: strat.status === 'Live' ? '#00C853' : '#FF9500' }}>
                  {strat.status}
                </Text>
              </View>
            </View>
            <View style={styles.stratMeta}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Type</Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{strat.type}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Sharpe</Text>
                <Text style={[styles.statValue, { color: '#00E676' }]}>{strat.sharpe}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Returns</Text>
                <Text style={[styles.statValue, { color: '#00C853' }]}>{strat.returns}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Max DD</Text>
                <Text style={[styles.statValue, { color: '#FF3B30' }]}>{strat.maxDD}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Research Pipeline</Text>
        {researchQueue.map((item, i) => (
          <View key={i} style={{ marginBottom: 16 }}>
            <View style={styles.researchHeader}>
              <Text style={[styles.researchTitle, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={[styles.researchEta, { color: theme.colors.secondaryText }]}>ETA: {item.eta}</Text>
            </View>
            <View style={[styles.progressBg, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.progressFill, { width: `${item.progress}%` as any }]} />
            </View>
            <Text style={[styles.progressPct, { color: '#651FFF' }]}>{item.progress}% complete</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'research', label: 'Research', icon: FlaskConical, component: researchTab },
    { id: 'backtests', label: 'Backtests', icon: ChartBar, component: <View /> },
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
  stratCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  stratHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  stratName: { flex: 1, fontSize: 14, fontWeight: '700', marginRight: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  stratMeta: { flexDirection: 'row', gap: 16 },
  statItem: { flex: 1 },
  statLabel: { fontSize: 10, textTransform: 'uppercase', marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: '700' },
  researchHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  researchTitle: { flex: 1, fontSize: 13, fontWeight: '500', marginRight: 10 },
  researchEta: { fontSize: 12 },
  progressBg: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', backgroundColor: '#651FFF', borderRadius: 4 },
  progressPct: { fontSize: 11, fontWeight: '600' },
});
