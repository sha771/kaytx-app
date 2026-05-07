import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, ChartBarBig, CircleCheck, Zap, ChevronLeft, ArrowRight, Users, ClipboardList, BarChart3, FileText } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '#5856D6';
const AGENT_NAME = 'AI Feedback & Survey';
const AGENT_TITLE = 'Voice of Customer Intelligence AI';
const AGENT_DESC = 'Designs contextual surveys, analyzes open-text responses with NLP, extracts actionable insights, and identifies product friction points to drive continuous improvement across the customer journey.';
const PARENT_NAME = 'Customer Experience AI';

const METRICS = [
  { label: 'Surveys Today', value: '2.4k', color: ACCENT },
  { label: 'Response Rate', value: '94%', color: '#00C853' },
  { label: 'Avg Speed', value: '0.2s', color: '#007AFF' },
  { label: 'Insight Accuracy', value: '98.8%', color: '#5856D6' },
];

const RECENT_TASKS = [
  { action: 'Categorized 50 NPS comments into 6 sentiment clusters', time: '2m ago' },
  { action: 'Triggered post-resolution CSAT survey for ticket #8821', time: '10m ago' },
  { action: 'Identified trending UX complaint in checkout flow', time: '25m ago' },
  { action: 'Auto-designed quarterly product feedback survey', time: '45m ago' },
  { action: 'Aggregated weekly feature requests from 3 channels', time: '1h ago' },
  { action: 'Flagged 5 at-risk promoters for immediate outreach', time: '2h ago' },
  { action: 'Generated executive insight report for Q4 feedback', time: '4h ago' },
];

const CAPABILITIES = [
  'Contextual Survey Design',
  'NLP Response Categorization',
  'Sentiment Trend Analysis',
  'CSAT/NPS Tracking & Benchmarking',
  'Churn Risk Detection from Feedback',
  'Actionable Insight Extraction',
  'Multi-Channel Survey Distribution',
  'Real-Time Response Dashboard',
  'Automated Follow-Up Triggers',
  'Executive Reporting & Dashboards',
];

const PERFORMANCE_BARS = [
  { label: 'Survey Completion Rate', value: 94, color: '#00C853' },
  { label: 'Categorization Accuracy', value: 97, color: ACCENT },
  { label: 'Insight Relevance', value: 92, color: '#007AFF' },
  { label: 'Response Speed', value: 98, color: '#5856D6' },
  { label: 'Actionability Score', value: 89, color: '#FF9500' },
];

const SUB_AGENTS = [
  { id: 'survey-designer', name: 'AI Survey Designer', desc: 'Designs contextual, high-response-rate surveys with smart question logic and branching', icon: ClipboardList, route: '/ai-agent/customer/sub-agents/survey-designer' },
  { id: 'response-analyzer', name: 'AI Response Analyzer', desc: 'Analyzes open-text responses with NLP, categorizes sentiment, and identifies patterns', icon: BarChart3, route: '/ai-agent/customer/sub-agents/response-analyzer' },
  { id: 'insight-reporter', name: 'AI Insight Reporter', desc: 'Generates executive-level insight reports, dashboards, and actionable recommendations', icon: FileText, route: '/ai-agent/customer/sub-agents/insight-reporter' },
];

const A2A_ENDPOINTS = [
  '/consult/ai-feedback-survey',
  '/feedback/design-survey',
  '/feedback/analyze-responses',
  '/feedback/generate-insights',
  '/feedback/track-nps',
  '/feedback/detect-churn-risk',
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
            <Text style={styles.statusText}>Online · Active · 3 Sub-Agents</Text>
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
            <Users size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sub-Agents</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>3</Text>
            </View>
          </View>
          {SUB_AGENTS.map((sub, i) => (
            <TouchableOpacity key={sub.id} onPress={() => router.push(sub.route)} style={[styles.subAgentCard, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
              <View style={[styles.subAgentIcon, { backgroundColor: ACCENT + '18' }]}>
                <sub.icon size={22} color={ACCENT} />
              </View>
              <View style={styles.subAgentInfo}>
                <Text style={[styles.subAgentName, { color: colors.text }]}>{sub.name}</Text>
                <Text style={[styles.subAgentDesc, { color: colors.text + '70' }]}>{sub.desc}</Text>
              </View>
              <ArrowRight size={18} color={colors.text + '50'} />
            </TouchableOpacity>
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
            <ChartBarBig size={18} color={ACCENT} />
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

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <Zap size={18} color={ACCENT} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
          </View>
          {A2A_ENDPOINTS.map((ep, i) => (
            <View key={i} style={styles.endpointRow}>
              <View style={styles.endpointDot} />
              <Text style={[styles.endpointText, { color: colors.text + '80' }]}>{ep}</Text>
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
  countBadge: { backgroundColor: '#5856D622', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  countText: { fontSize: 12, fontWeight: '700', color: '#5856D6' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 14, marginBottom: 8, borderBottomWidth: 1 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600', marginBottom: 3 },
  subAgentDesc: { fontSize: 12, lineHeight: 16 },
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
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#5856D6' },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
});

