
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileText, TrendingUp, ChartBarBig, DollarSign, Activity, Search } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const stockReports = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', rating: 'Strong Buy', fairValue: '$980', current: '$892', upside: '+9.9%', pe: '42x' },
  { ticker: 'MSFT', name: 'Microsoft', rating: 'Buy', fairValue: '$445', current: '$415', upside: '+7.2%', pe: '34x' },
  { ticker: 'GOOGL', name: 'Alphabet Inc', rating: 'Buy', fairValue: '$200', current: '$171', upside: '+16.9%', pe: '24x' },
  { ticker: 'AMZN', name: 'Amazon', rating: 'Buy', fairValue: '$225', current: '$192', upside: '+17.2%', pe: '44x' },
  { ticker: 'META', name: 'Meta Platforms', rating: 'Hold', fairValue: '$485', current: '$510', upside: '-4.9%', pe: '27x' },
];

const keyRatios = [
  { label: 'Avg P/E (Portfolio)', value: '34x', benchmark: '22x S&P', color: '#FF9500' },
  { label: 'Avg EV/EBITDA', value: '18x', benchmark: '14x Sector', color: '#FF9500' },
  { label: 'Avg Revenue Growth', value: '+24.6%', benchmark: '+8% Market', color: '#00C853' },
  { label: 'Avg Net Margin', value: '22.4%', benchmark: '11% Sector', color: '#00C853' },
  { label: 'Avg Debt/Equity', value: '0.42', benchmark: '0.85 Avg', color: '#00C853' },
];

export default function FundamentalAnalysisScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-fundamental-analysis')!, []);

  const researchTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#18FFFF', '#00B0C8']} style={styles.metricCard}>
          <FileText size={20} color="#fff" />
          <Text style={styles.metricValue}>300</Text>
          <Text style={styles.metricLabel}>Reports/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Search size={20} color="#fff" />
          <Text style={styles.metricValue}>5,000+</Text>
          <Text style={styles.metricLabel}>Stocks Covered</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>95.8%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>DCF+</Text>
          <Text style={styles.metricLabel}>Valuation Model</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Research Reports</Text>
        {stockReports.map((stock, i) => (
          <View key={i} style={[styles.stockRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.tickerBox, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.ticker, { color: theme.colors.text }]}>{stock.ticker}</Text>
            </View>
            <View style={styles.stockInfo}>
              <Text style={[styles.stockName, { color: theme.colors.text }]}>{stock.name}</Text>
              <Text style={[styles.stockMeta, { color: theme.colors.secondaryText }]}>
                Current: {stock.current} · P/E: {stock.pe}
              </Text>
            </View>
            <View style={styles.stockRight}>
              <Text style={[styles.fairValue, { color: theme.colors.secondaryText }]}>FV: {stock.fairValue}</Text>
              <Text style={[
                styles.upside,
                { color: stock.upside.startsWith('+') ? '#00C853' : '#FF3B30' }
              ]}>{stock.upside}</Text>
              <View style={[styles.ratingBadge, {
                backgroundColor: stock.rating === 'Strong Buy' || stock.rating === 'Buy' ? '#00C85318' : '#FF950018'
              }]}>
                <Text style={{
                  fontSize: 10, fontWeight: '800',
                  color: stock.rating.includes('Buy') ? '#00C853' : '#FF9500'
                }}>{stock.rating}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Key Financial Ratios</Text>
        {keyRatios.map((ratio, i) => (
          <View key={i} style={[styles.ratioRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.ratioLabel, { color: theme.colors.secondaryText }]}>{ratio.label}</Text>
            <Text style={[styles.ratioValue, { color: theme.colors.text }]}>{ratio.value}</Text>
            <Text style={[styles.ratioBenchmark, { color: ratio.color }]}>{ratio.benchmark}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'research', label: 'Research', icon: FileText, component: researchTab },
    { id: 'valuation', label: 'Valuation', icon: ChartBarBig, component: <View /> },
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
  stockRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  tickerBox: { width: 52, height: 52, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  ticker: { fontSize: 13, fontWeight: '800' },
  stockInfo: { flex: 1 },
  stockName: { fontSize: 14, fontWeight: '600' },
  stockMeta: { fontSize: 12, marginTop: 2 },
  stockRight: { alignItems: 'flex-end', gap: 3 },
  fairValue: { fontSize: 11 },
  upside: { fontSize: 14, fontWeight: '800' },
  ratingBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  ratioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  ratioLabel: { flex: 1, fontSize: 13 },
  ratioValue: { fontSize: 14, fontWeight: '700', marginRight: 12 },
  ratioBenchmark: { fontSize: 12, fontWeight: '600' },
});
