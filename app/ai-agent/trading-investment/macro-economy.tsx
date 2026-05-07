
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Globe, TrendingUp, TrendingDown, Activity, ChartBarBig, TriangleAlert, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const macroIndicators = [
  { indicator: 'US GDP Growth (QoQ)', value: '+2.8%', trend: 'UP', outlook: 'Expanding', color: '#00C853' },
  { indicator: 'US CPI Inflation (YoY)', value: '+3.2%', trend: 'DOWN', outlook: 'Cooling', color: '#00C853' },
  { indicator: 'Fed Funds Rate', value: '5.25-5.50%', trend: 'FLAT', outlook: 'Pause', color: '#FF9500' },
  { indicator: 'Unemployment Rate', value: '3.9%', trend: 'UP', outlook: 'Softening', color: '#FF9500' },
  { indicator: 'US Dollar Index (DXY)', value: '104.42', trend: 'UP', outlook: 'Strong USD', color: '#007AFF' },
  { indicator: '10Y Treasury Yield', value: '4.48%', trend: 'DOWN', outlook: 'Rally Bond', color: '#00C853' },
];

const geopoliticalRisks = [
  { region: 'Middle East', risk: 'Oil Supply Disruption', severity: 'High', impact: 'Energy Prices ?', color: '#FF3B30' },
  { region: 'Asia-Pacific', risk: 'Taiwan Strait Tensions', severity: 'Medium', impact: 'Tech Supply Chain', color: '#FF9500' },
  { region: 'Europe', risk: 'Russia-Ukraine Conflict', severity: 'High', impact: 'European Growth ?', color: '#FF3B30' },
  { region: 'Americas', risk: 'US Election Uncertainty', severity: 'Medium', impact: 'USD Volatility', color: '#FF9500' },
];

const regimeAllocation = [
  { regime: 'Growth Stocks', allocation: 35, rationale: 'Soft landing scenario', color: '#00C853' },
  { regime: 'Value / Cyclicals', allocation: 25, rationale: 'Rate cut benefit', color: '#007AFF' },
  { regime: 'Gold / Hard Assets', allocation: 20, rationale: 'Inflation hedge', color: '#FFCC00' },
  { regime: 'Bonds (10Y+)', allocation: 20, rationale: 'Duration play on cuts', color: '#5856D6' },
];

export default function MacroEconomyScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-macro-economy')!, []);

  const macroTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#8C9EFF', '#3d5afe']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>95.4%</Text>
          <Text style={styles.metricLabel}>Forecast Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>800</Text>
          <Text style={styles.metricLabel}>Reports/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <TriangleAlert size={20} color="#fff" />
          <Text style={styles.metricValue}>4</Text>
          <Text style={styles.metricLabel}>Geo-Risk Flags</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>$14.5K</Text>
          <Text style={styles.metricLabel}>Monthly Savings</Text>
        </LinearGradient>
      </View>

      {/* Macro Indicators */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Macro Indicators</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {macroIndicators.map((ind, i) => (
          <View key={i} style={[styles.macroRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.macroLeft}>
              <Text style={[styles.macroName, { color: theme.colors.text }]}>{ind.indicator}</Text>
              <View style={[styles.outlookBadge, { backgroundColor: ind.color + '18' }]}>
                <Text style={[styles.outlookText, { color: ind.color }]}>{ind.outlook}</Text>
              </View>
            </View>
            <View style={styles.macroRight}>
              <Text style={[styles.macroValue, { color: theme.colors.text }]}>{ind.value}</Text>
              <View style={styles.trendRow}>
                {ind.trend === 'UP' && <TrendingUp size={14} color="#00C853" />}
                {ind.trend === 'DOWN' && <TrendingDown size={14} color="#FF3B30" />}
                {ind.trend === 'FLAT' && <Activity size={14} color="#FF9500" />}
                <Text style={{ fontSize: 11, color: theme.colors.secondaryText }}>{ind.trend}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Strategic Allocation */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Macro-Driven Allocation</Text>
        {regimeAllocation.map((item, i) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <View style={styles.allocHeader}>
              <Text style={[styles.allocLabel, { color: theme.colors.text }]}>{item.regime}</Text>
              <Text style={[styles.allocPct, { color: item.color }]}>{item.allocation}%</Text>
            </View>
            <View style={[styles.allocBarBg, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.allocBarFill, { width: `${item.allocation * 2}%` as any, backgroundColor: item.color }]} />
            </View>
            <Text style={[styles.allocRationale, { color: theme.colors.secondaryText }]}>{item.rationale}</Text>
          </View>
        ))}
      </View>

      {/* Geopolitical Risks */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Geopolitical Risk Monitor</Text>
        {geopoliticalRisks.map((risk, i) => (
          <View key={i} style={[styles.riskCard, { backgroundColor: risk.color + '0C', borderLeftColor: risk.color }]}>
            <View style={styles.riskHeader}>
              <Text style={[styles.riskRegion, { color: risk.color }]}>{risk.region}</Text>
              <View style={[styles.severityBadge, { backgroundColor: risk.color + '20' }]}>
                <Text style={[styles.severityText, { color: risk.color }]}>{risk.severity}</Text>
              </View>
            </View>
            <Text style={[styles.riskTitle, { color: theme.colors.text }]}>{risk.risk}</Text>
            <Text style={[styles.riskImpact, { color: theme.colors.secondaryText }]}>Market Impact: {risk.impact}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'macro', label: 'Macro', icon: Globe, component: macroTab },
    { id: 'scenarios', label: 'Scenarios', icon: ChartBarBig, component: <View /> },
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
  macroRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  macroLeft: { flex: 1, gap: 5 },
  macroName: { fontSize: 13, fontWeight: '600' },
  outlookBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  outlookText: { fontSize: 10, fontWeight: '700' },
  macroRight: { alignItems: 'flex-end', gap: 4 },
  macroValue: { fontSize: 15, fontWeight: '800' },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  allocHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  allocLabel: { fontSize: 14, fontWeight: '600' },
  allocPct: { fontSize: 14, fontWeight: '800' },
  allocBarBg: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  allocBarFill: { height: '100%', borderRadius: 4 },
  allocRationale: { fontSize: 11 },
  riskCard: { borderLeftWidth: 3, borderRadius: 12, padding: 14, marginBottom: 10 },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  riskRegion: { fontSize: 12, fontWeight: '700' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  severityText: { fontSize: 10, fontWeight: '700' },
  riskTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  riskImpact: { fontSize: 12 },
});
