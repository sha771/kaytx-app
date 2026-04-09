
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Globe, TrendingUp, TrendingDown, Activity, BarChart3, Zap } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const forexPairs = [
  { pair: 'EUR/USD', price: '1.0842', change: '-0.42%', bid: '1.0841', ask: '1.0843', signal: 'SELL', up: false },
  { pair: 'GBP/USD', price: '1.2634', change: '+0.28%', bid: '1.2633', ask: '1.2635', signal: 'BUY', up: true },
  { pair: 'USD/JPY', price: '151.84', change: '+0.64%', bid: '151.82', ask: '151.86', signal: 'BUY', up: true },
  { pair: 'AUD/USD', price: '0.6482', change: '-0.18%', bid: '0.6481', ask: '0.6483', signal: 'HOLD', up: false },
  { pair: 'USD/CAD', price: '1.3612', change: '+0.22%', bid: '1.3611', ask: '1.3613', signal: 'BUY', up: true },
  { pair: 'XAU/USD', price: '2,342.50', change: '+0.65%', bid: '2342.20', ask: '2342.80', signal: 'BUY', up: true },
];

const cbPolicies = [
  { bank: 'Federal Reserve (Fed)', rate: '5.25-5.50%', stance: 'Hawkish', color: '#FF3B30' },
  { bank: 'European Central Bank', rate: '4.50%', stance: 'Neutral', color: '#FF9500' },
  { bank: 'Bank of England', rate: '5.25%', stance: 'Neutral', color: '#FF9500' },
  { bank: 'Bank of Japan', rate: '0.10%', stance: 'Dovish', color: '#00C853' },
];

export default function ForexTradingScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-forex-trading')!, []);

  const forexTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#D500F9', '#a000ba']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>60+</Text>
          <Text style={styles.metricLabel}>Currency Pairs</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>0.05s</Text>
          <Text style={styles.metricLabel}>Execution Speed</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>30K</Text>
          <Text style={styles.metricLabel}>Trades/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>94.5%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live FX Rates</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {forexPairs.map((pair, i) => (
          <View key={i} style={[styles.pairRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.pairLeft}>
              <Text style={[styles.pairName, { color: theme.colors.text }]}>{pair.pair}</Text>
              <Text style={[styles.pairBidAsk, { color: theme.colors.secondaryText }]}>
                Bid: {pair.bid} · Ask: {pair.ask}
              </Text>
            </View>
            <View style={styles.pairRight}>
              <Text style={[styles.pairPrice, { color: theme.colors.text }]}>{pair.price}</Text>
              <Text style={[styles.pairChange, { color: pair.up ? '#00C853' : '#FF3B30' }]}>{pair.change}</Text>
            </View>
            <View style={[styles.signalBadge, {
              backgroundColor: pair.signal === 'BUY' ? '#00C85320' : pair.signal === 'SELL' ? '#FF3B3020' : '#FF950020'
            }]}>
              <Text style={{
                fontSize: 10, fontWeight: '800',
                color: pair.signal === 'BUY' ? '#00C853' : pair.signal === 'SELL' ? '#FF3B30' : '#FF9500'
              }}>{pair.signal}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Central Bank Policies</Text>
        {cbPolicies.map((cb, i) => (
          <View key={i} style={[styles.cbRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.cbLeft}>
              <Text style={[styles.cbBank, { color: theme.colors.text }]}>{cb.bank}</Text>
              <Text style={[styles.cbRate, { color: theme.colors.secondaryText }]}>Rate: {cb.rate}</Text>
            </View>
            <View style={[styles.stanceBadge, { backgroundColor: cb.color + '20' }]}>
              <Text style={[styles.stanceText, { color: cb.color }]}>{cb.stance}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'forex', label: 'FX Rates', icon: Globe, component: forexTab },
    { id: 'analysis', label: 'Analysis', icon: BarChart3, component: <View /> },
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
  pairRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  pairLeft: { flex: 1 },
  pairName: { fontSize: 15, fontWeight: '700' },
  pairBidAsk: { fontSize: 11, marginTop: 2 },
  pairRight: { alignItems: 'flex-end', marginRight: 10 },
  pairPrice: { fontSize: 14, fontWeight: '700' },
  pairChange: { fontSize: 12, marginTop: 2 },
  signalBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  cbRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  cbLeft: { flex: 1 },
  cbBank: { fontSize: 14, fontWeight: '600' },
  cbRate: { fontSize: 12, marginTop: 2 },
  stanceBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  stanceText: { fontSize: 13, fontWeight: '700' },
});
