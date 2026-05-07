import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  PieChart, TrendingUp, AlertTriangle, CheckCircle, BarChart3,
  Gauge, Bell, Scale, FileText
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function RiskAppetiteMonitorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [breachAlerts, setBreachAlerts] = useState(true);
  const [trendAnalysis, setTrendAnalysis] = useState(true);
  const [executiveDashboard, setExecutiveDashboard] = useState(true);

  const stats = [
    { label: 'Risk Appetite', value: 'Medium', icon: Gauge, color: '#F59E0B' },
    { label: 'Current Risk', value: '72%', icon: PieChart, color: '#EF4444' },
    { label: 'Breaches', value: '2', icon: AlertTriangle, color: '#DC2626' },
    { label: 'Within Limits', value: '89%', icon: CheckCircle, color: '#10B981' },
  ];

  const categories = [
    { name: 'Operational Risk', current: 65, appetite: 70, status: 'within' },
    { name: 'Cyber Risk', current: 78, appetite: 75, status: 'breach' },
    { name: 'Compliance Risk', current: 45, appetite: 60, status: 'within' },
    { name: 'Financial Risk', current: 52, appetite: 65, status: 'within' },
    { name: 'Strategic Risk', current: 68, appetite: 70, status: 'within' },
    { name: 'Reputational Risk', current: 82, appetite: 80, status: 'breach' },
  ];

  const capabilities = [
    { name: 'Appetite Definition', icon: Scale, enabled: true },
    { name: 'Real-time Monitoring', icon: Activity, enabled: true },
    { name: 'Breach Detection', icon: AlertTriangle, enabled: true },
    { name: 'Trend Analysis', icon: TrendingUp, enabled: true },
    { name: 'Executive Reporting', icon: FileText, enabled: true },
    { name: 'Category Tracking', icon: BarChart3, enabled: true },
    { name: 'Alert Management', icon: Bell, enabled: true },
    { name: 'Threshold Management', icon: Gauge, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}>
          <Gauge size={56} color="#F59E0B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Risk Appetite Monitor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Governance & Risk</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <Briefcase size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}>
            <AlertTriangle size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>2 Breaches</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabContainer}>
        {['overview', 'categories', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              AI Risk Appetite Monitor continuously monitors risk exposure across all categories, ensuring 
              organizational risk remains within defined appetite thresholds and alerting on potential breaches.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F59E0B10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F59E0B' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'categories' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Categories</Text>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: cat.status === 'breach' ? '#DC262620' : '#10B98120' }]}>
                  <Text style={[styles.statusText, { color: cat.status === 'breach' ? '#DC2626' : '#10B981' }]}>{cat.status}</Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabel}>Current: {cat.current}%</Text>
                  <Text style={styles.progressLabel}>Appetite: {cat.appetite}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${cat.current}%`, backgroundColor: cat.status === 'breach' ? '#EF4444' : '#10B981' }]} />
                  <View style={[styles.appetiteMarker, { left: `${cat.appetite}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/risk-appetite-monitor', desc: 'Consult on risk appetite' },
            { endpoint: '/risk-appetite-monitor/check', desc: 'Check current risk exposure' },
            { endpoint: '/risk-appetite-monitor/report', desc: 'Generate appetite report' },
            { endpoint: '/risk-appetite-monitor/thresholds', desc: 'Manage risk thresholds' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#F59E0B" />
              <View style={styles.endpointInfo}>
                <Text style={[styles.endpointText, { color: theme.colors.text }]}>{item.endpoint}</Text>
                <Text style={[styles.endpointDesc, { color: theme.colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Breach Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Alert when risk appetite is breached</Text>
            </View>
            <Switch value={breachAlerts} onValueChange={setBreachAlerts} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Trend Analysis</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Analyze risk exposure trends</Text>
            </View>
            <Switch value={trendAnalysis} onValueChange={setTrendAnalysis} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Executive Dashboard</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Show risk appetite in executive view</Text>
            </View>
            <Switch value={executiveDashboard} onValueChange={setExecutiveDashboard} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-governance-risk-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F59E0B" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Governance & Risk</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (133)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="risk-appetite-monitor" agentName="AI Risk Appetite Monitor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#F59E0B' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  categoryCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  categoryName: { fontSize: 14, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  progressContainer: { marginTop: 8 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 12, color: '#666' },
  progressBarContainer: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, position: 'relative' },
  progressBar: { height: '100%', borderRadius: 4 },
  appetiteMarker: { position: 'absolute', top: -2, width: 2, height: 12, backgroundColor: '#F59E0B' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
