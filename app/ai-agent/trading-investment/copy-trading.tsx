
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Users, TrendingUp, TrendingDown, Activity, ChartBar, Star, Shield } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const topTraders = [
  { rank: 1, name: 'AlphaWolf_88', returns: '+142.4%', winRate: '78%', followers: '24.2K', drawdown: '-12.4%', risk: 'Med', copying: true },
  { rank: 2, name: 'QuantKing_Pro', returns: '+98.6%', winRate: '82%', followers: '18.7K', drawdown: '-8.1%', risk: 'Low', copying: true },
  { rank: 3, name: 'CryptoSage_X', returns: '+224.1%', winRate: '64%', followers: '31.5K', drawdown: '-28.6%', risk: 'High', copying: false },
  { rank: 4, name: 'FX_Maverick', returns: '+76.2%', winRate: '74%', followers: '9.8K', drawdown: '-6.8%', risk: 'Low', copying: true },
  { rank: 5, name: 'ValueHunter', returns: '+54.8%', winRate: '88%', followers: '6.2K', drawdown: '-4.2%', risk: 'Low', copying: false },
];

const copyStats = [
  { label: 'Traders Being Copied', value: '3' },
  { label: 'Avg Win Rate', value: '78%' },
  { label: 'Copy Portfolio Return', value: '+87.4%' },
  { label: 'Risk Score', value: 'Medium' },
];

const riskColors: Record<string, string> = { Low: '#00C853', Med: '#FF9500', High: '#FF3B30' };

export default function CopyTradingScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-copy-trading')!, []);

  const copyTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#B388FF', '#7c4dff']} style={styles.metricCard}>
          <Users size={20} color="#fff" />
          <Text style={styles.metricValue}>3K</Text>
          <Text style={styles.metricLabel}>Trades/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>92.4%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Star size={20} color="#fff" />
          <Text style={styles.metricValue}>5,000+</Text>
          <Text style={styles.metricLabel}>Traders Scored</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Shield size={20} color="#fff" />
          <Text style={styles.metricValue}>$9K</Text>
          <Text style={styles.metricLabel}>Monthly Alpha</Text>
        </LinearGradient>
      </View>

      {/* Copy Summary */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Copy Portfolio Summary</Text>
        <View style={styles.statsGrid}>
          {copyStats.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top Traders */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Ranked Traders</Text>
          <View style={[styles.liveTag, { backgroundColor: '#00C85318' }]}>
            <Text style={{ color: '#00C853', fontSize: 11, fontWeight: '700' }}>AI Scored</Text>
          </View>
        </View>
        {topTraders.map((trader, i) => (
          <View key={i} style={[styles.traderCard, {
            backgroundColor: trader.copying ? '#00C85508' : theme.colors.background,
            borderColor: trader.copying ? '#00C85330' : theme.colors.border
          }]}>
            <View style={styles.traderHeader}>
              <View style={[styles.rankBadge, { backgroundColor: '#B388FF20' }]}>
                <Text style={[styles.rankText, { color: '#B388FF' }]}>#{trader.rank}</Text>
              </View>
              <Text style={[styles.traderName, { color: theme.colors.text }]}>{trader.name}</Text>
              {trader.copying && (
                <View style={[styles.copyingBadge, { backgroundColor: '#00C85318' }]}>
                  <Text style={{ color: '#00C853', fontSize: 10, fontWeight: '700' }}>COPYING</Text>
                </View>
              )}
            </View>
            <View style={styles.traderStats}>
              <View style={styles.tStat}>
                <Text style={[styles.tStatLabel, { color: theme.colors.secondaryText }]}>Returns</Text>
                <Text style={[styles.tStatValue, { color: '#00C853' }]}>{trader.returns}</Text>
              </View>
              <View style={styles.tStat}>
                <Text style={[styles.tStatLabel, { color: theme.colors.secondaryText }]}>Win Rate</Text>
                <Text style={[styles.tStatValue, { color: theme.colors.text }]}>{trader.winRate}</Text>
              </View>
              <View style={styles.tStat}>
                <Text style={[styles.tStatLabel, { color: theme.colors.secondaryText }]}>Max DD</Text>
                <Text style={[styles.tStatValue, { color: '#FF3B30' }]}>{trader.drawdown}</Text>
              </View>
              <View style={styles.tStat}>
                <Text style={[styles.tStatLabel, { color: theme.colors.secondaryText }]}>Risk</Text>
                <Text style={[styles.tStatValue, { color: riskColors[trader.risk] }]}>{trader.risk}</Text>
              </View>
            </View>
            <Text style={[styles.followers, { color: theme.colors.secondaryText }]}>{trader.followers} followers</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'copy', label: 'Copy Trading', icon: Users, component: copyTab },
    { id: 'analytics', label: 'Analytics', icon: ChartBar, component: <View /> },
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
  liveTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 14, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 11, textAlign: 'center' },
  traderCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10 },
  traderHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  rankBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  rankText: { fontSize: 12, fontWeight: '800' },
  traderName: { flex: 1, fontSize: 15, fontWeight: '700' },
  copyingBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  traderStats: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  tStat: { flex: 1 },
  tStatLabel: { fontSize: 10, textTransform: 'uppercase', marginBottom: 3 },
  tStatValue: { fontSize: 13, fontWeight: '700' },
  followers: { fontSize: 12 },
});
