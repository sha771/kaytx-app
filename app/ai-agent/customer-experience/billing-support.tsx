import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, ChartBarBig, CircleCheck, Zap, ChevronLeft, ArrowRight, Users, CreditCard, FileText, Scale } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '#007AFF';
const AGENT_NAME = 'AI Billing Support';
const AGENT_TITLE = 'Financial Operations & Billing AI';
const AGENT_DESC = 'Processes payments, explains complex invoices, and resolves billing disputes with full audit trails. Ensures accurate financial transactions, compliance, and customer satisfaction across all billing touchpoints.';
const PARENT_NAME = 'Customer Experience AI';

const METRICS = [
  { label: 'Tasks Today', value: '2.1k', color: ACCENT },
  { label: 'Success Rate', value: '97.8%', color: '#00C853' },
  { label: 'Avg Speed', value: '0.4s', color: '#007AFF' },
  { label: 'Dispute Win', value: '92%', color: '#5856D6' },
];

const RECENT_TASKS = [
  { action: 'Processed $2,450 enterprise payment for Acme Corp', time: '1m ago' },
  { action: 'Explained pro-rated invoice charge to customer #7821', time: '5m ago' },
  { action: 'Resolved subscription tier dispute — issued $89 credit', time: '12m ago' },
  { action: 'Updated payment method for 15 subscriptions', time: '25m ago' },
  { action: 'Sent dunning notice for 3 failed payments', time: '45m ago' },
  { action: 'Generated monthly billing reconciliation report', time: '1h ago' },
  { action: 'Auto-categorized 120 invoice line items', time: '2h ago' },
];

const CAPABILITIES = [
  'Payment Processing & Reconciliation',
  'Invoice Generation & Explanation',
  'Dispute Resolution & Mediation',
  'Refund & Credit Management',
  'Dunning & Collection Automation',
  'Subscription Tier Management',
  'Tax Calculation & Compliance',
  'Multi-Currency Support',
  'Audit Trail & Financial Logging',
  'Revenue Recognition Automation',
];

const PERFORMANCE_BARS = [
  { label: 'Payment Accuracy', value: 99, color: '#00C853' },
  { label: 'Dispute Resolution', value: 92, color: ACCENT },
  { label: 'Invoice Clarity Score', value: 95, color: '#007AFF' },
  { label: 'Processing Speed', value: 97, color: '#5856D6' },
  { label: 'Compliance Rate', value: 100, color: '#FF9500' },
];

const SUB_AGENTS = [
  { id: 'payment-processor', name: 'AI Payment Processor', desc: 'Processes payments, reconciles transactions, and manages multi-currency billing operations', icon: CreditCard, route: '/ai-agent/customer/sub-agents/payment-processor' },
  { id: 'invoice-explainer', name: 'AI Invoice Explainer', desc: 'Generates, explains, and breaks down complex invoices with line-item clarity for customers', icon: FileText, route: '/ai-agent/customer/sub-agents/invoice-explainer' },
  { id: 'dispute-resolver', name: 'AI Dispute Resolver', desc: 'Mediates billing disputes, issues credits, and ensures fair resolution with full audit trails', icon: Scale, route: '/ai-agent/customer/sub-agents/dispute-resolver' },
];

const A2A_ENDPOINTS = [
  '/consult/ai-billing-support',
  '/billing/process-payment',
  '/billing/explain-invoice',
  '/billing/resolve-dispute',
  '/billing/issue-refund',
  '/billing/reconcile',
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
  countBadge: { backgroundColor: '#007AFF22', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  countText: { fontSize: 12, fontWeight: '700', color: '#007AFF' },
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
  endpointDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#007AFF' },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
});

