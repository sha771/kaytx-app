
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart3, TrendingUp, TrendingDown, Activity, Globe, Zap } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const commodityPrices = [
  { name: 'Crude Oil (WTI)', ticker: 'CL', price: '$78.42', change: '-1.12%', signal: 'SELL', unit: '/bbl', up: false },
  { name: 'Natural Gas', ticker: 'NG', price: '$1.84', change: '+2.40%', signal: 'BUY', unit: '/MMBtu', up: true },
  { name: 'Gold', ticker: 'GC', price: '$2,342', change: '+0.65%', signal: 'BUY', unit: '/oz', up: true },
  { name: 'Silver', ticker: 'SI', price: '$27.84', change: '+1.22%', signal: 'BUY', unit: '/oz', up: true },
  { name: 'Copper', ticker: 'HG', price: '$4.38', change: '-0.64%', signal: 'HOLD', unit: '/lb', up: false },
  { name: 'Wheat', ticker: 'ZW', price: '$562', change: '+0.88%', signal: 'BUY', unit: '/bu', up: true },
  { name: 'Corn', ticker: 'ZC', price: '$448', change: '-0.40%', signal: 'HOLD', unit: '/bu', up: false },
];

const supplyEvents = [
  { event: 'OPEC+ meeting – potential cut', impact: 'Bullish Oil', date: 'Apr 15', priority: 'High', color: '#00C853' },
  { event: 'US Wheat crop report', impact: 'Bearish Wheat', date: 'Apr 12', priority: 'Medium', color: '#FF9500' },
  { event: 'China copper demand data', impact: 'Bullish Copper', date: 'Apr 18', priority: 'High', color: '#00C853' },
  { event: 'CFTC COT Report release', impact: 'Mixed Signals', date: 'Apr 19', priority: 'Low', color: '#007AFF' },
];

export default function CommoditiesScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-commodities')!, []);

  const commoditiesTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#FF6D00', '#e65100']} style={styles.metricCard}>
          <BarChart3 size={20} color="#fff" />
          <Text style={styles.metricValue}>7</Text>
          <Text style={styles.metricLabel}>Markets Traded</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>93.2%</Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>2,000</Text>
          <Text style={styles.metricLabel}>Analyses/Day</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>$11K</Text>
          <Text style={styles.metricLabel}>Monthly Alpha</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Commodity Prices</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {commodityPrices.map((com, i) => (
          <View key={i} style={[styles.comRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.tickerBox, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.ticker, { color: theme.colors.text }]}>{com.ticker}</Text>
            </View>
            <View style={styles.comInfo}>
              <Text style={[styles.comName, { color: theme.colors.text }]}>{com.name}</Text>
              <Text style={[styles.comUnit, { color: theme.colors.secondaryText }]}>{com.unit}</Text>
            </View>
            <View style={styles.comRight}>
              <Text style={[styles.comPrice, { color: theme.colors.text }]}>{com.price}</Text>
              <Text style={[styles.comChange, { color: com.up ? '#00C853' : '#FF3B30' }]}>{com.change}</Text>
            </View>
            <View style={[styles.signalBadge, {
              backgroundColor: com.signal === 'BUY' ? '#00C85320' : com.signal === 'SELL' ? '#FF3B3020' : '#FF950020'
            }]}>
              <Text style={{
                fontSize: 10, fontWeight: '800',
                color: com.signal === 'BUY' ? '#00C853' : com.signal === 'SELL' ? '#FF3B30' : '#FF9500'
              }}>{com.signal}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Upcoming Supply Events</Text>
        {supplyEvents.map((ev, i) => (
          <View key={i} style={[styles.eventCard, { backgroundColor: ev.color + '0D', borderLeftColor: ev.color }]}>
            <View style={styles.eventRow}>
              <Text style={[styles.eventDate, { color: ev.color }]}>{ev.date}</Text>
              <View style={[styles.eventPriority, { backgroundColor: ev.color + '20' }]}>
                <Text style={{ color: ev.color, fontSize: 10, fontWeight: '700' }}>{ev.priority}</Text>
              </View>
            </View>
            <Text style={[styles.eventTitle, { color: theme.colors.text }]}>{ev.event}</Text>
            <Text style={[styles.eventImpact, { color: theme.colors.secondaryText }]}>Expected: {ev.impact}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'commodities', label: 'Markets', icon: BarChart3, component: commoditiesTab },
    { id: 'analytics', label: 'Analytics', icon: Activity, component: <View /> },
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
  comRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  tickerBox: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  ticker: { fontSize: 12, fontWeight: '800' },
  comInfo: { flex: 1 },
  comName: { fontSize: 13, fontWeight: '600' },
  comUnit: { fontSize: 11, marginTop: 1 },
  comRight: { alignItems: 'flex-end', marginRight: 8 },
  comPrice: { fontSize: 14, fontWeight: '700' },
  comChange: { fontSize: 12, marginTop: 2 },
  signalBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  eventCard: { borderLeftWidth: 3, borderRadius: 12, padding: 14, marginBottom: 10 },
  eventRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  eventDate: { fontSize: 12, fontWeight: '700' },
  eventPriority: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  eventTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  eventImpact: { fontSize: 12 },
});
