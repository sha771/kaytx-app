import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  PenTool, CheckCircle, AlertTriangle, FileText, BarChart3,
  Layers, Eye, Code, Lock
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function SecurityDesignReviewerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoReview, setAutoReview] = useState(true);
  const [complianceCheck, setComplianceCheck] = useState(true);
  const [bestPractices, setBestPractices] = useState(true);

  const stats = [
    { label: 'Reviews Done', value: '142', icon: PenTool, color: '#7C3AED' },
    { label: 'Issues Found', value: '37', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Approved', value: '118', icon: CheckCircle, color: '#10B981' },
    { label: 'Pending', value: '5', icon: Clock, color: '#F59E0B' },
  ];

  const reviews = [
    { id: 'SDR-2024-018', project: 'Cloud Migration Architecture', severity: 'high', status: 'under_review', date: '2024-05-14' },
    { id: 'SDR-2024-017', project: 'API Gateway Redesign', severity: 'medium', status: 'approved', date: '2024-05-10' },
    { id: 'SDR-2024-015', project: 'Zero Trust Implementation', severity: 'high', status: 'approved', date: '2024-04-28' },
    { id: 'SDR-2024-013', project: 'Data Lake Security', severity: 'low', status: 'approved', date: '2024-04-15' },
  ];

  const capabilities = [
    { name: 'Architecture Review', icon: Layers, enabled: true },
    { name: 'Vulnerability Detection', icon: AlertTriangle, enabled: true },
    { name: 'Compliance Validation', icon: CheckCircle, enabled: true },
    { name: 'Best Practices', icon: Shield, enabled: true },
    { name: 'Code Analysis', icon: Code, enabled: true },
    { name: 'Security Patterns', icon: Lock, enabled: true },
    { name: 'Risk Assessment', icon: Eye, enabled: true },
    { name: 'Report Generation', icon: FileText, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#7C3AED20' }]}>
          <PenTool size={56} color="#7C3AED" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Security Design Reviewer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Security Architect</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#7C3AED22' }]}>
            <Briefcase size={12} color="#7C3AED" />
            <Text style={[styles.badgeText, { color: '#7C3AED' }]}>Reviewer</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>142 Reviews</Text>
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
        {['overview', 'reviews', 'capabilities', 'settings'].map((tab) => (
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
              AI Security Design Reviewer evaluates system architectures and designs for security flaws, 
              ensuring compliance with security standards and best practices before implementation.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#7C3AED10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#7C3AED' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'reviews' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Design Reviews</Text>
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewIdBadge}>
                  <Text style={styles.reviewId}>{review.id}</Text>
                </View>
                <Text style={styles.reviewTitle} numberOfLines={1}>{review.project}</Text>
                <View style={[styles.severityBadge, { backgroundColor: review.severity === 'high' ? '#DC262620' : review.severity === 'medium' ? '#F59E0B20' : '#10B98120' }]}>
                  <Text style={[styles.severityText, { color: review.severity === 'high' ? '#DC2626' : review.severity === 'medium' ? '#F59E0B' : '#10B981' }]}>{review.severity}</Text>
                </View>
              </View>
              <View style={styles.reviewFooter}>
                <View style={styles.reviewMeta}>
                  <Activity size={12} color="#666" />
                  <Text style={[styles.reviewStatus, { color: review.status === 'approved' ? '#10B981' : '#F59E0B' }]}>{review.status.replace('_', ' ')}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Clock size={12} color="#666" />
                  <Text style={styles.reviewMetaText}>{review.date}</Text>
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
            { endpoint: '/consult/security-design-reviewer', desc: 'Consult on design review' },
            { endpoint: '/security-design-reviewer/review', desc: 'Submit design for review' },
            { endpoint: '/security-design-reviewer/assess', desc: 'Assess security posture' },
            { endpoint: '/security-design-reviewer/report', desc: 'Generate review report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#7C3AED" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Review</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically review new designs</Text>
            </View>
            <Switch value={autoReview} onValueChange={setAutoReview} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Compliance Check</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Validate against compliance frameworks</Text>
            </View>
            <Switch value={complianceCheck} onValueChange={setComplianceCheck} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Best Practices</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Enforce security best practices</Text>
            </View>
            <Switch value={bestPractices} onValueChange={setBestPractices} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/security-architect-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#7C3AED" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Security Architect</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (135)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="security-design-reviewer" agentName="AI Security Design Reviewer" />
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
  activeTab: { backgroundColor: '#7C3AED' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  reviewCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  reviewIdBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  reviewId: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  reviewTitle: { flex: 1, fontSize: 14, fontWeight: '500' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  severityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  reviewFooter: { flexDirection: 'row', gap: 16 },
  reviewMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewStatus: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  reviewMetaText: { fontSize: 12, color: '#666' },
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
