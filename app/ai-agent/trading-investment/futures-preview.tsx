
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, TrendingUp, TrendingDown, Activity, ChartBar, Globe, Calendar } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const globalFutures = [
  { index: 'S&P 500 Futures', value: '5,448.50', change: '+0.34%', up: true, session: 'US Pre-Market' },
  { index: 'NASDAQ Futures', value: '19,124.00', change: '+0.42%', up: true, session: 'US Pre-Market' },
  { index: 'DAX Futures', value: '18,284.00', change: '+0.18%', up: true, session: 'European' },
  { index: 'Nikkei 225', value: '38,942.00', change: '-0.24%', up: false, session: 'Asian' },
  { index: 'Hang Seng Futures', value: '16,812.00', change: '-0.88%', up: false, session: 'Asian' },
  { index: 'FTSE 100 Futures', value: '7,944.00', change: '+0.12%', up: true, session: 'European' },
];

const economicCalendar = [
  { time: '08:30 AM', event: 'US CPI (MoM)', forecast: '+0.3%', previous: '+0.4%', impact: 'High', color: '#FF3B30' },
  { time: '10:00 AM', event: 'US Retail Sales', forecast: '+0.4%', previous: '+0.6%', impact: 'High', color: '#FF3B30' },
  { time: '02:00 PM', event: 'Fed Minutes Release', forecast: 'N/A', previous: 'Hawkish', impact: 'High', color: '#FF3B30' },
  { time: '08:30 AM', event: 'Jobless Claims', forecast: '215K', previous: '218K', impact: 'Medium', color: '#FF9500' },
];

const openingScenarios = [
  { scenario: 'Gap Up Open', probability: 62, thesis: 'Overnight futures +0.34% on strong tech earnings' },
  { scenario: 'Flat Open', probability: 28, thesis: 'Mixed signals from Asia; market digesting CPI' },
  { scenario: 'Gap Down Open', probability: 10, thesis: 'Low probability given positive futures trend' },
];

export default function FuturesPreviewScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'ai-futures-preview')!, []);

  const previewTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#7C4DFF', '#4527a0']} style={styles.metricCard}>
          <Clock size={20} color="#fff" />
          <Text style={styles.metricValue}>Pre-Mkt</Text>
          <Text style={styles.metricLabel}>Session Active</Text>
        </LinearGradient>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>+0.34%</Text>
          <Text style={styles.metricLabel}>SPX Futures</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Globe size={20} color="#fff" />
          <Text style={styles.metricValue}>6</Text>
          <Text style={styles.metricLabel}>Global Markets</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <Calendar size={20} color="#fff" />
          <Text style={styles.metricValue}>3</Text>
          <Text style={styles.metricLabel}>High Impact Events</Text>
        </LinearGradient>
      </View>

      {/* Opening Scenarios */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Today&apos;s Open Scenarios</Text>
        {openingScenarios.map((scen, i) => (
          <View key={i} style={[styles.scenCard, {
            backgroundColor: scen.scenario === 'Gap Up Open' ? '#00C85310' :
              scen.scenario === 'Gap Down Open' ? '#FF3B3010' : theme.colors.background,
            borderColor: scen.scenario === 'Gap Up Open' ? '#00C85330' :
              scen.scenario === 'Gap Down Open' ? '#FF3B3030' : theme.colors.border
          }]}>
            <View style={styles.scenHeader}>
              <Text style={[styles.scenName, { color: theme.colors.text }]}>{scen.scenario}</Text>
              <Text style={[styles.scenProb, {
                color: scen.scenario === 'Gap Up Open' ? '#00C853' : scen.scenario === 'Gap Down Open' ? '#FF3B30' : '#FF9500'
              }]}>{scen.probability}%</Text>
            </View>
            <View style={[styles.probBarBg, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.probBarFill, {
                width: `${scen.probability}%` as any,
                backgroundColor: scen.scenario === 'Gap Up Open' ? '#00C853' : scen.scenario === 'Gap Down Open' ? '#FF3B30' : '#FF9500'
              }]} />
            </View>
            <Text style={[styles.scenThesis, { color: theme.colors.secondaryText }]}>{scen.thesis}</Text>
          </View>
        ))}
      </View>

      {/* Global Futures */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global Futures Overview</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {globalFutures.map((fut, i) => (
          <View key={i} style={[styles.futRow, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.futLeft}>
              <Text style={[styles.futIndex, { color: theme.colors.text }]}>{fut.index}</Text>
              <Text style={[styles.futSession, { color: theme.colors.secondaryText }]}>{fut.session}</Text>
            </View>
            <Text style={[styles.futValue, { color: theme.colors.text }]}>{fut.value}</Text>
            <View style={[styles.changeTag, { backgroundColor: fut.up ? '#00C85320' : '#FF3B3020' }]}>
              {fut.up ? <TrendingUp size={12} color="#00C853" /> : <TrendingDown size={12} color="#FF3B30" />}
              <Text style={{ color: fut.up ? '#00C853' : '#FF3B30', fontSize: 12, fontWeight: '700' }}>{fut.change}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Economic Calendar */}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Today&apos;s Economic Calendar</Text>
        {economicCalendar.map((ev, i) => (
          <View key={i} style={[styles.calRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.calTime, { color: theme.colors.secondaryText }]}>{ev.time}</Text>
            <View style={styles.calInfo}>
              <Text style={[styles.calEvent, { color: theme.colors.text }]}>{ev.event}</Text>
              <Text style={[styles.calMeta, { color: theme.colors.secondaryText }]}>
                Forecast: {ev.forecast} · Prev: {ev.previous}
              </Text>
            </View>
            <View style={[styles.impactBadge, { backgroundColor: ev.color + '20' }]}>
              <Text style={[styles.impactText, { color: ev.color }]}>{ev.impact}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'preview', label: 'Pre-Market', icon: Clock, component: previewTab },
    { id: 'calendar', label: 'Calendar', icon: Calendar, component: <View /> },
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
  scenCard: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10 },
  scenHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  scenName: { fontSize: 15, fontWeight: '700' },
  scenProb: { fontSize: 20, fontWeight: '800' },
  probBarBg: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  probBarFill: { height: '100%', borderRadius: 3 },
  scenThesis: { fontSize: 12, lineHeight: 17 },
  futRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  futLeft: { flex: 1 },
  futIndex: { fontSize: 14, fontWeight: '600' },
  futSession: { fontSize: 11, marginTop: 2 },
  futValue: { fontSize: 14, fontWeight: '700', marginRight: 10 },
  changeTag: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  calRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  calTime: { width: 75, fontSize: 11 },
  calInfo: { flex: 1 },
  calEvent: { fontSize: 13, fontWeight: '600' },
  calMeta: { fontSize: 11, marginTop: 2 },
  impactBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  impactText: { fontSize: 11, fontWeight: '700' },
});
