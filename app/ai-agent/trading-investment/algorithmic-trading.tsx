
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Zap, Activity, ChartBarBig, TrendingUp, TrendingDown, Clock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const recentTrades = [
  { asset: 'SPY', side: 'BUY', qty: 500, price: '$548.20', pnl: '+$1,240', time: '09:32 AM' },
  { asset: 'QQQ', side: 'SELL', qty: 200, price: '$465.80', pnl: '+$860', time: '09:45 AM' },
  { asset: 'NVDA', side: 'BUY', qty: 50, price: '$892.40', pnl: '-$320', time: '10:12 AM' },
  { asset: 'AAPL', side: 'BUY', qty: 300, price: '$182.50', pnl: '+$540', time: '10:38 AM' },
  { asset: 'MSFT', side: 'SELL', qty: 100, price: '$415.20', pnl: '+$1,050', time: '11:05 AM' },
];

const strategies = [
  { name: 'Momentum Breakout', status: 'Active', trades: 24, winRate: '79%' },
  { name: 'Mean Reversion', status: 'Active', trades: 18, winRate: '72%' },
  { name: 'Statistical Arbitrage', status: 'Standby', trades: 8, winRate: '85%' },
  { name: 'Market Making', status: 'Active', trades: 156, winRate: '68%' },
];

export default function AlgorithmicTradingScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-algorithmic-trading')!, []);

  const ordersTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#69F0AE', '#00b359']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>50K</Text>
          <Text style={styles.metricLabel}>Trades/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>0.01s</Text>
          <Text style={styles.metricLabel}>Execution Speed</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>76%</Text>
          <Text style={styles.metricLabel}>Win Rate</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <ChartBarBig size={20} color="#fff" />
          <Text style={styles.metricValue}>$18K</Text>
          <Text style={styles.metricLabel}>Monthly Alpha</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Executions</Text>
          <Clock size={18} color={theme.colors.secondaryText} />
        </View>
        {recentTrades.map((trade, i) => (
          <View key={i} style={[styles.tradeRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.sideTag, { backgroundColor: trade.side === 'BUY' ? '#00C85320' : '#FF3B3020' }]}>
              <Text style={{ color: trade.side === 'BUY' ? '#00C853' : '#FF3B30', fontSize: 11, fontWeight: '800' }}>
                {trade.side}
              </Text>
            </View>
            <View style={styles.tradeInfo}>
              <Text style={[styles.tradeAsset, { color: theme.colors.text }]}>{trade.asset} � {trade.qty}</Text>
              <Text style={[styles.tradeMeta, { color: theme.colors.secondaryText }]}>{trade.price} � {trade.time}</Text>
            </View>
            <Text style={[styles.tradePnl, { color: trade.pnl.startsWith('+') ? '#00C853' : '#FF3B30' }]}>
              {trade.pnl}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Active Strategies</Text>
        {strategies.map((strat, i) => (
          <View key={i} style={[styles.stratRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.stratLeft}>
              <Text style={[styles.stratName, { color: theme.colors.text }]}>{strat.name}</Text>
              <Text style={[styles.stratMeta, { color: theme.colors.secondaryText }]}>{strat.trades} trades today</Text>
            </View>
            <Text style={[styles.stratWin, { color: '#00E676' }]}>{strat.winRate} WR</Text>
            <View style={[styles.stratStatus, {
              backgroundColor: strat.status === 'Active' ? '#00C85320' : '#FF950020'
            }]}>
              <Text style={{ color: strat.status === 'Active' ? '#00C853' : '#FF9500', fontSize: 11, fontWeight: '700' }}>
                {strat.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'orders', label: 'Orders', icon: Zap, component: ordersTab },
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
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  tradeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  sideTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tradeInfo: { flex: 1 },
  tradeAsset: { fontSize: 14, fontWeight: '600' },
  tradeMeta: { fontSize: 12, marginTop: 2 },
  tradePnl: { fontSize: 14, fontWeight: '800' },
  stratRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  stratLeft: { flex: 1 },
  stratName: { fontSize: 14, fontWeight: '600' },
  stratMeta: { fontSize: 12, marginTop: 2 },
  stratWin: { fontSize: 14, fontWeight: '700', marginRight: 8 },
  stratStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
});
