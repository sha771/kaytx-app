import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, ChartBar, CircleCheck, Zap, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '#FF2D55';
const AGENT_NAME = 'AI Audience Targeting';
const AGENT_TITLE = 'Precise Segmentation AI';
const AGENT_DESC = 'Creates hyper-targeted audience segments using intent data, behavior, and predictive modeling.';
const PARENT_NAME = 'Marketing & Growth AI';

const METRICS = [
  { label: 'Tasks Today', value: '89', color: ACCENT },
  { label: 'Success Rate', value: '92%', color: '#00C853' },
  { label: 'Avg Speed', value: '1.5s', color: '#007AFF' },
  { label: 'Accuracy', value: '93.1%', color: '#5856D6' },
];

const RECENT_TASKS = [
    {
        "action": "Updated retargeting audience lists",
        "time": "5m ago"
    },
    {
        "action": "Identified 5k high-intent lookalikes",
        "time": "25m ago"
    },
    {
        "action": "Segmented Q2 webinar attendees",
        "time": "1h ago"
    },
    {
        "action": "Refined ICP based on won deals",
        "time": "3h ago"
    },
    {
        "action": "Synced audiences to ad platforms",
        "time": "4h ago"
    }
];

const CAPABILITIES = [
    "Intent Scoring",
    "Lookalike Modeling",
    "Predictive Segmentation",
    "Cross-channel Sync",
    "LTV Prediction",
    "Churn Propensity"
];

const PERFORMANCE_BARS = [
  { label: 'Task Completion Rate', value: 96, color: '#00C853' },
  { label: 'Quality Score', value: 94, color: ACCENT },
  { label: 'Speed Efficiency', value: 98, color: '#007AFF' },
  { label: 'Learning Progress', value: 88, color: '#5856D6' },
];

export default function AgentScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{AGENT_NAME}</Text>
          <Text style={[styles.headerSub, { color: colors.text + '70' }]}>{PARENT_NAME}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[ACCENT, ACCENT + 'BB']} style={styles.hero}>
          <View style={styles.heroIcon}>
            <Activity size={32} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>{AGENT_NAME}</Text>
          <Text style={styles.heroSub}>{AGENT_TITLE}</Text>
          <Text style={styles.heroDesc}>{AGENT_DESC}</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Online · Active</Text>
          </View>
        </LinearGradient>

        <View style={styles.metricsGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.metricValue, { color: m.color }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: colors.text + '70' }]}>{m.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Activity size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Activity</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          {RECENT_TASKS.map((task, i) => (
            <View key={i} style={[styles.taskRow, { borderBottomColor: colors.border }]}>
              <CircleCheck size={16} color="#00C853" />
              <Text style={[styles.taskText, { color: colors.text }]}>{task.action}</Text>
              <Text style={[styles.taskTime, { color: colors.text + '60' }]}>{task.time}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Zap size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Capabilities</Text>
          </View>
          <View style={styles.capGrid}>
            {CAPABILITIES.map((cap, i) => (
              <View key={i} style={[styles.capChip, { backgroundColor: ACCENT + '18', borderColor: ACCENT + '40' }]}>
                <Text style={[styles.capText, { color: ACCENT }]}>{cap}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <ChartBar size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance</Text>
          </View>
          {PERFORMANCE_BARS.map((bar, i) => (
            <View key={i} style={{ marginBottom: 14 }}>
              <View style={styles.barLabelRow}>
                <Text style={[styles.barLabel, { color: colors.text }]}>{bar.label}</Text>
                <Text style={[styles.barPct, { color: bar.color }]}>{bar.value}%</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.border }]}>
                <View style={[styles.barFill, { width: bar.value + '%', backgroundColor: bar.color }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  backButton: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  headerSub: { fontSize: 11, marginTop: 1 },
  headerRight: { width: 40 },
  content: { flex: 1 },
  hero: { margin: 16, borderRadius: 24, padding: 24, alignItems: 'center' },
  heroIcon: { width: 72, height: 72, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  heroDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 18, marginBottom: 14 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00FF88' },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16, alignItems: 'center' },
  metricValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  metricLabel: { fontSize: 11, textTransform: 'uppercase', textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 14, padding: 18, borderRadius: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionTitle: { flex: 1, fontSize: 16, fontWeight: '700' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FF3B3018', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF3B30' },
  liveText: { fontSize: 10, color: '#FF3B30', fontWeight: '700' },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  taskText: { flex: 1, fontSize: 13 },
  taskTime: { fontSize: 11 },
  capGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  capText: { fontSize: 12, fontWeight: '600' },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontSize: 13, fontWeight: '500' },
  barPct: { fontSize: 13, fontWeight: '700' },
  barBg: { height: 7, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
});

