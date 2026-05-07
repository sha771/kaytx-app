import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  DollarSign, TrendingUp, BarChart3, PieChart, AlertTriangle,
  Calculator, FileText, CheckCircle
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CyberRiskQuantifierPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoQuantification, setAutoQuantification] = useState(true);
  const [faIRIntegration, setFaIRIntegration] = useState(true);
  const [riskReporting, setRiskReporting] = useState(true);

  const stats = [
    { label: 'Risk Assessments', value: '847', icon: Calculator, color: '#EF4444' },
    { label: 'Total Exposure', value: '$4.2M', icon: DollarSign, color: '#F59E0B' },
    { label: 'Risk Reduction', value: '32%', icon: TrendingUp, color: '#10B981' },
    { label: 'ROI Calculated', value: '285%', icon: BarChart3, color: '#8B5CF6' },
  ];

  const riskAreas = [
    { area: 'Data Breach', exposure: '$1.2M', likelihood: '15%', rating: 'high' },
    { area: 'Ransomware', exposure: '$850K', likelihood: '12%', rating: 'high' },
    { area: 'Insider Threat', exposure: '$420K', likelihood: '8%', rating: 'medium' },
    { area: 'Supply Chain', exposure: '$380K', likelihood: '6%', rating: 'medium' },
  ];

  const capabilities = [
    { name: 'FAIR Model Analysis', icon: Calculator, enabled: true },
    { name: 'Financial Impact Assessment', icon: DollarSign, enabled: true },
    { name: 'Risk Probability Calculation', icon: PieChart, enabled: true },
    { name: 'ROI Analysis', icon: BarChart3, enabled: true },
    { name: 'Scenario Modeling', icon: Target, enabled: true },
    { name: 'Control Effectiveness', icon: Shield, enabled: true },
    { name: 'Risk Trending', icon: TrendingUp, enabled: true },
    { name: 'Executive Reporting', icon: FileText, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}>
          <Calculator size={56} color="#F59E0B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Cyber Risk Quantifier</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Cybersecurity</Text>
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
            <DollarSign size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>$4.2M Exposure</Text>
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
        {['overview', 'risks', 'capabilities', 'settings'].map((tab) => (
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
              AI Cyber Risk Quantifier calculates financial exposure from cyber threats using FAIR methodology, 
              enabling data-driven security investment decisions and risk prioritization.
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

      {activeTab === 'risks' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Exposure Analysis</Text>
          {riskAreas.map((risk, index) => (
            <View key={index} style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskName}>{risk.area}</Text>
                <View style={[styles.ratingBadge, { backgroundColor: risk.rating === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                  <Text style={[styles.ratingText, { color: risk.rating === 'high' ? '#EF4444' : '#F59E0B' }]}>{risk.rating}</Text>
                </View>
              </View>
              <View style={styles.riskFooter}>
                <View style={styles.riskMetric}>
                  <DollarSign size={14} color="#666" />
                  <Text style={styles.riskValue}>{risk.exposure}</Text>
                </View>
                <View style={styles.riskMetric}>
                  <TrendingUp size={14} color="#666" />
                  <Text style={styles.riskValue}>{risk.likelihood}</Text>
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
            { endpoint: '/consult/cyber-risk-quantifier', desc: 'Consult on risk quantification' },
            { endpoint: '/cyber-risk-quantifier/analyze', desc: 'Analyze cyber risk exposure' },
            { endpoint: '/cyber-risk-quantifier/calculate', desc: 'Calculate financial impact' },
            { endpoint: '/cyber-risk-quantifier/report', desc: 'Generate risk reports' },
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Quantification</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically quantify new risks</Text>
            </View>
            <Switch value={autoQuantification} onValueChange={setAutoQuantification} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>FAIR Integration</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Use FAIR methodology</Text>
            </View>
            <Switch value={faIRIntegration} onValueChange={setFaIRIntegration} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Risk Reporting</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Generate executive reports</Text>
            </View>
            <Switch value={riskReporting} onValueChange={setRiskReporting} trackColor={{ false: '#767577', true: '#F59E0B' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-cybersecurity-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F59E0B" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Cybersecurity</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (132)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="cyber-risk-quantifier" agentName="AI Cyber Risk Quantifier" />
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
  riskCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  riskName: { fontSize: 14, fontWeight: '600', flex: 1 },
  ratingBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  ratingText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  riskFooter: { flexDirection: 'row', gap: 20 },
  riskMetric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  riskValue: { fontSize: 13, color: '#666' },
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
