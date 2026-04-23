
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Coins, TrendingUp, TrendingDown, Activity, BarChart3, Zap, Globe } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const cryptoPrices = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$65,420', change: '+3.24%', mcap: '$1.28T', signal: 'BUY', up: true },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,184', change: '+2.18%', mcap: '$382B', signal: 'BUY', up: true },
  { symbol: 'SOL', name: 'Solana', price: '$142.80', change: '-1.44%', mcap: '$65B', signal: 'HOLD', up: false },
  { symbol: 'BNB', name: 'BNB Chain', price: '$562.40', change: '+0.88%', mcap: '$84B', signal: 'HOLD', up: true },
  { symbol: 'XRP', name: 'XRP', price: '$0.5820', change: '-2.10%', mcap: '$31B', signal: 'SELL', up: false },
];

const defiProtocols = [
  { protocol: 'Uniswap v3', apy: '12.4%', tvl: '$5.2B', chain: 'Ethereum', risk: 'Medium' },
  { protocol: 'AAVE', apy: '8.2%', tvl: '$12.1B', chain: 'Multi-chain', risk: 'Low' },
  { protocol: 'Curve Finance', apy: '15.6%', tvl: '$3.8B', chain: 'Ethereum', risk: 'Medium' },
  { protocol: 'Jupiter', apy: '22.8%', tvl: '$1.4B', chain: 'Solana', risk: 'High' },
];

export default function CryptoDefiScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-crypto-defi')!, []);

  const cryptoTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#F50057', '#b0003a']} style={styles.metricCard}>
          <Coins size={20} color="#fff" />
          <Text style={styles.metricValue}>500+</Text>
          <Text style={styles.metricLabel}>Tokens Tracked</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>93.8%</Text>
          <Text style={styles.metricLabel}>Signal Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>20K</Text>
          <Text style={styles.metricLabel}>On-Chain Scans/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>$14K</Text>
          <Text style={styles.metricLabel}>Monthly Alpha</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Crypto Prices</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {cryptoPrices.map((coin, i) => (
          <View key={i} style={[styles.coinRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.coinIcon, { backgroundColor: coin.up ? '#00C85320' : '#FF3B3020' }]}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: coin.up ? '#00C853' : '#FF3B30' }}>{coin.symbol}</Text>
            </View>
            <View style={styles.coinInfo}>
              <Text style={[styles.coinName, { color: theme.colors.text }]}>{coin.name}</Text>
              <Text style={[styles.coinMcap, { color: theme.colors.secondaryText }]}>MCap: {coin.mcap}</Text>
            </View>
            <View style={styles.coinRight}>
              <Text style={[styles.coinPrice, { color: theme.colors.text }]}>{coin.price}</Text>
              <Text style={[styles.coinChange, { color: coin.up ? '#00C853' : '#FF3B30' }]}>{coin.change}</Text>
            </View>
            <View style={[styles.signalBadge, {
              backgroundColor: coin.signal === 'BUY' ? '#00C85320' : coin.signal === 'SELL' ? '#FF3B3020' : '#FF950020'
            }]}>
              <Text style={{
                fontSize: 10, fontWeight: '800',
                color: coin.signal === 'BUY' ? '#00C853' : coin.signal === 'SELL' ? '#FF3B30' : '#FF9500'
              }}>{coin.signal}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>DeFi Yield Opportunities</Text>
        {defiProtocols.map((proto, i) => (
          <View key={i} style={[styles.defiCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
            <View style={styles.defiHeader}>
              <Text style={[styles.protoName, { color: theme.colors.text }]}>{proto.protocol}</Text>
              <Text style={[styles.protoApy, { color: '#00C853' }]}>{proto.apy} APY</Text>
            </View>
            <View style={styles.defiMeta}>
              <Text style={[styles.defiMetaItem, { color: theme.colors.secondaryText }]}>TVL: {proto.tvl}</Text>
              <Text style={[styles.defiMetaItem, { color: theme.colors.secondaryText }]}>Chain: {proto.chain}</Text>
              <View style={[styles.riskBadge, {
                backgroundColor: proto.risk === 'Low' ? '#00C85318' : proto.risk === 'High' ? '#FF3B3018' : '#FF950018'
              }]}>
                <Text style={{
                  fontSize: 10, fontWeight: '700',
                  color: proto.risk === 'Low' ? '#00C853' : proto.risk === 'High' ? '#FF3B30' : '#FF9500'
                }}>{proto.risk} Risk</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'crypto', label: 'Crypto', icon: Coins, component: cryptoTab },
    { id: 'defi', label: 'DeFi', icon: BarChart3, component: <View /> },
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
  coinRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  coinIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  coinInfo: { flex: 1 },
  coinName: { fontSize: 14, fontWeight: '600' },
  coinMcap: { fontSize: 12, marginTop: 2 },
  coinRight: { alignItems: 'flex-end', marginRight: 10 },
  coinPrice: { fontSize: 14, fontWeight: '700' },
  coinChange: { fontSize: 12, marginTop: 2 },
  signalBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  defiCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10 },
  defiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  protoName: { fontSize: 15, fontWeight: '700' },
  protoApy: { fontSize: 16, fontWeight: '800' },
  defiMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  defiMetaItem: { fontSize: 12 },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
});
