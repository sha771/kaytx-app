import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, 
  Globe, AlertTriangle, TrendingUp, BarChart3, CheckCircle,
  Eye, RefreshCw, Radio, Layers
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ThreatLandscapeMonitorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [threatIntelligence, setThreatIntelligence] = useState(true);
  const [autoAlerts, setAutoAlerts] = useState(true);

  const stats = [
    { label: 'Threats Tracked', value: '1.2K', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Active Campaigns', value: '47', icon: Globe, color: '#F59E0B' },
    { label: 'Intel Sources', value: '89', icon: Radio, color: '#10B981' },
    { label: 'Risk Score', value: '72/100', icon: Target, color: '#8B5CF6' },
  ];

  const threats = [
    { name: 'APT29 - Cozy Bear', severity: 'critical', sector: 'Government', trend: 'increasing' },
    { name: 'RansomCartel', severity: 'high', sector: 'Healthcare', trend: 'stable' },
    { name: 'Emotet Botnet', severity: 'high', sector: 'Finance', trend: 'decreasing' },
    { name: 'Supply Chain Attack', severity: 'medium', sector: 'Technology', trend: 'increasing' },
  ];

  const capabilities = [
    { name: 'Threat Intelligence Aggregation', icon: Globe, enabled: true },
    { name: 'Attack Pattern Analysis', icon: Target, enabled: true },
    { name: 'Campaign Tracking', icon: Layers, enabled: true },
    { name: 'Risk Scoring', icon: BarChart3, enabled: true },
    { name: 'Sector Monitoring', icon: Eye, enabled: true },
    { name: 'Trend Analysis', icon: TrendingUp, enabled: true },
    { name: 'Real-time Alerts', icon: Activity, enabled: true },
    { name: 'Intel Integration', icon: Zap, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EF444420' }]}>
          <Globe size={56} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Threat Landscape Monitor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Cybersecurity</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}>
            <Briefcase size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Globe size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>1.2K Threats</Text>
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
        {['overview', 'threats', 'capabilities', 'settings'].map((tab) => (
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
              AI Threat Landscape Monitor continuously tracks global cyber threats, monitors attack campaigns, 
              and provides real-time intelligence on emerging risks across all sectors.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#EF444410' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#EF4444' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'threats' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Threats</Text>
          {threats.map((threat, index) => (
            <View key={index} style={styles.threatCard}>
              <View style={styles.threatHeader}>
                <Text style={styles.threatName}>{threat.name}</Text>
                <View style={[styles.severityBadge, { backgroundColor: threat.severity === 'critical' ? '#DC262620' : threat.severity === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                  <Text style={[styles.severityText, { color: threat.severity === 'critical' ? '#DC2626' : threat.severity === 'high' ? '#EF4444' : '#F59E0B' }]}>{threat.severity}</Text>
                </View>
              </View>
              <View style={styles.threatFooter}>
                <Text style={styles.threatMeta}>Sector: {threat.sector}</Text>
                <View style={styles.trendIndicator}>
                  <TrendingUp size={12} color={threat.trend === 'increasing' ? '#EF4444' : threat.trend === 'decreasing' ? '#10B981' : '#F59E0B'} />
                  <Text style={[styles.trendText, { color: threat.trend === 'increasing' ? '#EF4444' : threat.trend === 'decreasing' ? '#10B981' : '#F59E0B' }]}>{threat.trend}</Text>
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
            { endpoint: '/consult/threat-landscape-monitor', desc: 'Consult on threat landscape analysis' },
            { endpoint: '/threat-landscape-monitor/analyze', desc: 'Analyze current threat landscape' },
            { endpoint: '/threat-landscape-monitor/track', desc: 'Track specific threat campaigns' },
            { endpoint: '/threat-landscape-monitor/alerts', desc: 'Get real-time threat alerts' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#EF4444" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Real-time Monitoring</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Monitor threats in real-time</Text>
            </View>
            <Switch value={realTimeMonitoring} onValueChange={setRealTimeMonitoring} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Threat Intelligence</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Integrate with intel feeds</Text>
            </View>
            <Switch value={threatIntelligence} onValueChange={setThreatIntelligence} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatic threat alerts</Text>
            </View>
            <Switch value={autoAlerts} onValueChange={setAutoAlerts} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-cybersecurity-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#EF4444" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Cybersecurity</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (132)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="threat-landscape-monitor" agentName="AI Threat Landscape Monitor" />
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
  activeTab: { backgroundColor: '#EF4444' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  threatCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  threatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  threatName: { fontSize: 14, fontWeight: '600', flex: 1 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  severityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  threatFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  threatMeta: { fontSize: 12, color: '#666' },
  trendIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
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
