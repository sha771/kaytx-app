import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  Search, Bug, Globe, Database
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function IocCollectorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCollection, setAutoCollection] = useState(true);
  const [threatFeeds, setThreatFeeds] = useState(true);
  const [enrichment, setEnrichment] = useState(true);

  const stats = [
    { label: 'IOCs Collected', value: '45.2K', icon: Database, color: '#8B5CF6' },
    { label: 'Threat Feeds', value: '28', icon: Globe, color: '#F59E0B' },
    { label: 'Enrichment Rate', value: '94%', icon: FileText, color: '#10B981' },
    { label: 'New IOCs', value: '1.2K', icon: Bug, color: '#EF4444' },
  ];

  const capabilities = [
    { name: 'IOC Extraction', icon: Search, enabled: true },
    { name: 'Threat Feeds', icon: Globe, enabled: true },
    { name: 'Data Enrichment', icon: FileText, enabled: true },
    { name: 'Malware Analysis', icon: Bug, enabled: true },
    { name: 'Reputation Check', icon: AlertTriangle, enabled: true },
    { name: 'IOC Correlation', icon: BarChart3, enabled: true },
    { name: 'Export/Import', icon: ArrowRight, enabled: true },
    { name: 'Trend Analysis', icon: Activity, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Search size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI IoC Collector</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Security Analyst</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Briefcase size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Collector</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>94% Enrich</Text>
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
        {['overview', 'iocs', 'capabilities', 'settings'].map((tab) => (
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
              AI IoC Collector aggregates threat intelligence from multiple sources, extracts Indicators of Compromise, 
              enriches data with context, and maintains a comprehensive IOC database for proactive defense.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#8B5CF610' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#8B5CF6' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'iocs' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>IOC Types Collected</Text>
          {[
            { type: 'IP Addresses', count: '12.4K', risk: 'High', color: '#EF4444' },
            { type: 'Domains', count: '8.7K', risk: 'Medium', color: '#F59E0B' },
            { type: 'Hashes (MD5/SHA)', count: '15.2K', risk: 'Critical', color: '#DC2626' },
            { type: 'URLs', count: '6.8K', risk: 'High', color: '#EF4444' },
            { type: 'Email Addresses', count: '2.1K', risk: 'Low', color: '#3B82F6' },
          ].map((ioc, index) => (
            <View key={index} style={styles.iocCard}>
              <View style={styles.iocHeader}>
                <View style={[styles.iocIcon, { backgroundColor: ioc.color + '20' }]}>
                  <Database size={16} color={ioc.color} />
                </View>
                <Text style={styles.iocType}>{ioc.type}</Text>
                <Text style={[styles.iocRisk, { color: ioc.color }]}>{ioc.risk}</Text>
              </View>
              <Text style={styles.iocCount}>{ioc.count} collected</Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/ioc-collector', desc: 'Consult on IOC collection' },
            { endpoint: '/ioc-collector/collect', desc: 'Collect IOCs from sources' },
            { endpoint: '/ioc-collector/enrich', desc: 'Enrich IOC data' },
            { endpoint: '/ioc-collector/export', desc: 'Export IOC database' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#8B5CF6" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Collection</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically collect IOCs</Text>
            </View>
            <Switch value={autoCollection} onValueChange={setAutoCollection} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Threat Feeds</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Integrate threat intelligence feeds</Text>
            </View>
            <Switch value={threatFeeds} onValueChange={setThreatFeeds} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Enrichment</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Enrich IOCs with threat data</Text>
            </View>
            <Switch value={enrichment} onValueChange={setEnrichment} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/security-analyst-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#8B5CF6" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Security Analyst</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (137)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="ioc-collector" agentName="AI IoC Collector" />
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
  activeTab: { backgroundColor: '#8B5CF6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  iocCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  iocHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  iocIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  iocType: { flex: 1, fontSize: 14, fontWeight: '600' },
  iocRisk: { fontSize: 13, fontWeight: '600' },
  iocCount: { fontSize: 12, color: '#666' },
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
