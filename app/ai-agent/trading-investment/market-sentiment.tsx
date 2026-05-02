
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, TrendingUp, TrendingDown, MessageCircle, ChartBar, Globe } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const sentimentData = [
  { source: 'Twitter/X', asset: 'Bitcoin', sentiment: 82, trend: 'Bullish', color: '#00C853' },
  { source: 'Reddit', asset: 'Tesla', sentiment: 34, trend: 'Bearish', color: '#FF3B30' },
  { source: 'News NLP', asset: 'S&P 500', sentiment: 67, trend: 'Neutral-Bull', color: '#FF9500' },
  { source: 'Earnings Call', asset: 'NVDA', sentiment: 91, trend: 'Very Bullish', color: '#00C853' },
  { source: 'Options Flow', asset: 'SPY', sentiment: 58, trend: 'Neutral', color: '#007AFF' },
];

const fearGreed = [
  { label: 'Fear & Greed Index', value: 72, status: 'Greed', color: '#FF9500' },
  { label: 'Put/Call Ratio', value: 0.82, status: 'Moderate', color: '#007AFF' },
  { label: 'VIX Level', value: 14.2, status: 'Low Fear', color: '#00C853' },
];

export default function MarketSentimentScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-market-sentiment')!, []);

  const sentimentTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#76FF03', '#64DD17']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>68</Text>
          <Text style={styles.metricLabel}>Overall Score</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <MessageCircle size={20} color="#fff" />
          <Text style={styles.metricValue}>1.2M</Text>
          <Text style={styles.metricLabel}>Posts Scanned</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>94.7%</Text>
          <Text style={styles.metricLabel}>NLP Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>24/7</Text>
          <Text style={styles.metricLabel}>Monitoring</Text>
        </LinearGradient>
      </View>

      {/* Fear & Greed */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Market Indicators</Text>
        {fearGreed.map((item, i) => (
          <View key={i} style={[styles.fgRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.fgLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
            <Text style={[styles.fgValue, { color: theme.colors.text }]}>{item.value}</Text>
            <View style={[styles.fgBadge, { backgroundColor: item.color + '20' }]}>
              <Text style={[styles.fgStatus, { color: item.color }]}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Sentiment by Source */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sentiment Sources</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {sentimentData.map((item, i) => (
          <View key={i} style={[styles.sentRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.sentLeft}>
              <Text style={[styles.sentSource, { color: theme.colors.secondaryText }]}>{item.source}</Text>
              <Text style={[styles.sentAsset, { color: theme.colors.text }]}>{item.asset}</Text>
            </View>
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <View style={[styles.sentBarBg, { backgroundColor: theme.colors.border }]}>
                <View style={[styles.sentBarFill, { width: `${item.sentiment}%` as any, backgroundColor: item.color }]} />
              </View>
            </View>
            <Text style={[styles.sentTrend, { color: item.color }]}>{item.trend}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'sentiment', label: 'Sentiment', icon: Activity, component: sentimentTab },
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
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FF3B3020', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#FF3B30' },
  liveText: { fontSize: 11, color: '#FF3B30', fontWeight: '700' },
  fgRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  fgLabel: { flex: 1, fontSize: 13 },
  fgValue: { fontSize: 15, fontWeight: '700', marginRight: 12 },
  fgBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  fgStatus: { fontSize: 12, fontWeight: '700' },
  sentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  sentLeft: { width: 110 },
  sentSource: { fontSize: 11, marginBottom: 2 },
  sentAsset: { fontSize: 14, fontWeight: '700' },
  sentBarBg: { height: 6, borderRadius: 3, overflow: 'hidden' },
  sentBarFill: { height: '100%', borderRadius: 3 },
  sentTrend: { fontSize: 12, fontWeight: '700', width: 85, textAlign: 'right' },
});
