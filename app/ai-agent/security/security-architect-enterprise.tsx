import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  LayoutDashboard, Shield, Target, MapPin, Grid3X3, CheckCircle, ChevronRight, Users, Star,
  Activity, Clock, AlertTriangle, BarChart3, Layers, Box, ShieldCheck, Eye, Lock,
  Settings, Filter, Download, Share2, Cpu, Network, Server, Cloud, Database
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SubAgentCard = ({ title, description, icon: Icon, status, onPress, color }: any) => (
  <TouchableOpacity style={[styles.subAgentCard, { backgroundColor: '#fff', borderLeftColor: color, borderLeftWidth: 4 }]} onPress={onPress}>
    <View style={styles.subAgentHeader}>
      <View style={[styles.subAgentIconWrap, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.subAgentStatus}>
        <View style={[styles.statusDot, { backgroundColor: status === 'active' ? '#34C759' : '#FF9500' }]} />
        <Text style={styles.statusText}>{status === 'active' ? 'Active' : 'Standby'}</Text>
      </View>
    </View>
    <Text style={styles.subAgentTitle}>{title}</Text>
    <Text style={styles.subAgentDesc} numberOfLines={2}>{description}</Text>
    <View style={styles.subAgentFooter}>
      <Text style={[styles.subAgentLink, { color }]}>Configure</Text>
      <ChevronRight size={16} color={color} />
    </View>
  </TouchableOpacity>
);

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <View style={[styles.metricCard, { backgroundColor: '#fff' }]}>
    <View style={[styles.metricIconWrap, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : change.startsWith('-') ? '#FF3B30' : '#666' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#C2185B' }} />
  </View>
);

export default function SecurityArchitectEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [designReview, setDesignReview] = useState(true);
  const [threatModeling, setThreatModeling] = useState(true);
  const [controlMapping, setControlMapping] = useState(true);
  const [securityPatterns, setSecurityPatterns] = useState(true);

  const stats = [
    { label: 'Designs Reviewed', value: '234', icon: LayoutDashboard, color: '#C2185B' },
    { label: 'Threat Models', value: '156', icon: Target, color: '#34C759' },
    { label: 'Controls Mapped', value: '892', icon: MapPin, color: '#007AFF' },
    { label: 'Patterns', value: '47', icon: Grid3X3, color: '#FF9500' },
  ];

  const metrics = [
    { title: 'Architecture Reviews', value: '12', change: '+3', icon: LayoutDashboard, color: '#C2185B' },
    { title: 'Design Approval', value: '87%', change: '+5%', icon: CheckCircle, color: '#34C759' },
    { title: 'Threat Scenarios', value: '456', change: '+23', icon: Target, color: '#FF3B30' },
    { title: 'Control Gaps', value: '8', change: '-4', icon: AlertTriangle, color: '#FF9500' },
  ];

  const subAgents = [
    { 
      title: 'AI Security Design Reviewer', 
      description: 'Reviews security architecture designs and provides recommendations',
      icon: LayoutDashboard, 
      status: 'active',
      color: '#C2185B',
      route: '/ai-agent/security/sub-agents/security-design-reviewer'
    },
    { 
      title: 'AI Threat Modeler', 
      description: 'Creates comprehensive threat models for systems and applications',
      icon: Target, 
      status: 'active',
      color: '#D81B60',
      route: '/ai-agent/security/sub-agents/threat-modeler'
    },
    { 
      title: 'AI Control Mapper', 
      description: 'Maps security controls to frameworks and compliance requirements',
      icon: MapPin, 
      status: 'active',
      color: '#E91E63',
      route: '/ai-agent/security/sub-agents/control-mapper'
    },
  ];

  const capabilities = [
    { name: 'Architecture Review', icon: LayoutDashboard, enabled: true },
    { name: 'Threat Modeling', icon: Target, enabled: true },
    { name: 'Control Design', icon: Shield, enabled: true },
    { name: 'Security Patterns', icon: Grid3X3, enabled: true },
    { name: 'Risk Assessment', icon: AlertTriangle, enabled: true },
    { name: 'Compliance Mapping', icon: CheckCircle, enabled: true },
    { name: 'Secure SDLC', icon: Layers, enabled: true },
    { name: 'Zero Trust Arch', icon: Lock, enabled: true },
  ];

  const designReviews = [
    { id: 1, project: 'Cloud Migration', type: 'Infrastructure', status: 'approved', date: '2024-03-15', reviewer: 'Security Team' },
    { id: 2, project: 'API Gateway', type: 'Application', status: 'review', date: '2024-03-20', reviewer: 'Architect Team' },
    { id: 3, project: 'Data Lake', type: 'Data', status: 'pending', date: '2024-03-25', reviewer: 'Data Team' },
    { id: 4, project: 'Identity Service', type: 'Security', status: 'approved', date: '2024-03-10', reviewer: 'IAM Team' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#C2185B' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C2185B' + '25' }]}>
          <LayoutDashboard size={48} color="#C2185B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Security Architect</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Enterprise Security Architecture & Design
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#C2185B' + '22' }]}>
            <Star size={12} color="#C2185B" />
            <Text style={[styles.badgeText, { color: '#C2185B' }]}>Senior</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['overview', 'sub-agents', 'reviews', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#C2185B' }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Metrics</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#C2185B' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#C2185B' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {/* Sub-Agents Tab */}
      {activeTab === 'sub-agents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Assigned Sub-Agents (3)</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            AI agents reporting to Security Architect
          </Text>
          <View style={styles.subAgentsGrid}>
            {subAgents.map((agent, index) => (
              <SubAgentCard
                key={index}
                {...agent}
                onPress={() => router.push(agent.route as any)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Design Reviews</Text>
          {designReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>{review.project}</Text>
                <View style={[styles.reviewStatusBadge, { backgroundColor: review.status === 'approved' ? '#34C75920' : review.status === 'review' ? '#007AFF20' : '#FF950020' }]}>
                  <Text style={[styles.reviewStatusText, { color: review.status === 'approved' ? '#34C759' : review.status === 'review' ? '#007AFF' : '#FF9500' }]}>{review.status}</Text>
                </View>
              </View>
              <Text style={styles.reviewType}>{review.type}</Text>
              <View style={styles.reviewFooter}>
                <Text style={styles.reviewMeta}>Date: {review.date}</Text>
                <Text style={styles.reviewMeta}>Reviewer: {review.reviewer}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <FeatureToggle
            title="Security Design Review"
            description="Automated security design reviews"
            enabled={designReview}
            onToggle={setDesignReview}
          />
          <FeatureToggle
            title="Threat Modeling"
            description="Enable automated threat modeling"
            enabled={threatModeling}
            onToggle={setThreatModeling}
          />
          <FeatureToggle
            title="Control Mapping"
            description="Map controls to frameworks automatically"
            enabled={controlMapping}
            onToggle={setControlMapping}
          />
          <FeatureToggle
            title="Security Patterns"
            description="Use verified security patterns library"
            enabled={securityPatterns}
            onToggle={setSecurityPatterns}
          />
        </View>
      )}

      <AgentFeatures agentId="security-architect" agentName="Security Architect" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500', textAlign: 'center' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#C2185B' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionSubtitle: { fontSize: 13, marginBottom: 16, marginTop: -10 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  metricIconWrap: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  metricTitle: { fontSize: 12, color: '#666', marginBottom: 4 },
  metricChange: { fontSize: 12, fontWeight: '600' },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  subAgentsGrid: { gap: 12 },
  subAgentCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  subAgentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  subAgentIconWrap: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  subAgentStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, color: '#666' },
  subAgentTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  subAgentDesc: { fontSize: 12, color: '#666', marginBottom: 12 },
  subAgentFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subAgentLink: { fontSize: 13, fontWeight: '600' },
  reviewCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reviewTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  reviewStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  reviewStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  reviewType: { fontSize: 12, color: '#666', marginBottom: 12 },
  reviewFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewMeta: { fontSize: 12, color: '#999' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
