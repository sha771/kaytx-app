import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, UserCircle, 
  Users, CheckCircle, Layers, BarChart3, FileText, Settings, PenTool,
  ShieldCheck, UserCheck, UserX
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function RoleModelerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [roleMining, setRoleMining] = useState(true);
  const [autoProvisioning, setAutoProvisioning] = useState(true);
  const [segregationOfDuties, setSegregationOfDuties] = useState(true);

  const stats = [
    { label: 'Roles Modeled', value: '156', icon: UserCircle, color: '#F8BBD9' },
    { label: 'Active', value: '89%', icon: CheckCircle, color: '#34C759' },
    { label: 'SoD Violations', value: '3', icon: UserX, color: '#FF3B30' },
    { label: 'Pending', value: '12', icon: Clock, color: '#FF9500' },
  ];

  const roleModels = [
    { name: 'Senior Developer', entitlements: 23, users: 45, risk: 'medium' },
    { name: 'Financial Analyst', entitlements: 18, users: 12, risk: 'high' },
    { name: 'HR Manager', entitlements: 31, users: 8, risk: 'medium' },
    { name: 'Sales Rep', entitlements: 15, users: 67, risk: 'low' },
  ];

  const capabilities = [
    { name: 'Role Mining', icon: BarChart3, enabled: true },
    { name: 'Role Design', icon: PenTool, enabled: true },
    { name: 'SoD Analysis', icon: ShieldCheck, enabled: true },
    { name: 'Auto Provisioning', icon: UserCheck, enabled: true },
    { name: 'Role Lifecycle', icon: Layers, enabled: true },
    { name: 'Entitlements', icon: FileText, enabled: true },
    { name: 'Policy Engine', icon: Settings, enabled: true },
    { name: 'Analytics', icon: BarChart3, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F8BBD920' }]}>
          <UserCircle size={56} color="#F8BBD9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Role Modeler</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Identity Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F8BBD922' }]}>
            <Briefcase size={12} color="#F8BBD9" />
            <Text style={[styles.badgeText, { color: '#F8BBD9' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <CheckCircle size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>156 Roles</Text>
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
        {['overview', 'roles', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F8BBD9' }]]}
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
              AI Role Modeler designs, optimizes, and maintains role definitions across the organization. 
              Uses AI-driven role mining to discover optimal role structures and ensures Segregation of Duties (SoD) compliance.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F8BBD9' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F8BBD9' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'roles' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Role Models</Text>
          {roleModels.map((role, index) => (
            <View key={index} style={styles.roleCard}>
              <View style={styles.roleHeader}>
                <Text style={styles.roleName}>{role.name}</Text>
                <View style={[styles.roleRiskBadge, { backgroundColor: role.risk === 'high' ? '#FF3B3020' : role.risk === 'medium' ? '#FF950020' : '#34C75920' }]}>
                  <Text style={[styles.roleRiskText, { color: role.risk === 'high' ? '#FF3B30' : role.risk === 'medium' ? '#FF9500' : '#34C759' }]}>{role.risk}</Text>
                </View>
              </View>
              <View style={styles.roleFooter}>
                <Text style={styles.roleMeta}>{role.entitlements} entitlements</Text>
                <Text style={styles.roleMeta}>{role.users} users</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/role-modeler', desc: 'Consult on role modeling strategies' },
            { endpoint: '/role-modeler/execute', desc: 'Execute role modeling operations' },
            { endpoint: '/role-modeler/analyze', desc: 'Analyze role structures and patterns' },
            { endpoint: '/role-modeler/discover', desc: 'Discover roles from user activity' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#F8BBD9" />
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
              <Text style={styles.featureToggleTitle}>Role Mining</Text>
              <Text style={styles.featureToggleDesc}>Auto-discover optimal role structures</Text>
            </View>
            <Switch value={roleMining} onValueChange={setRoleMining} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Auto Provisioning</Text>
              <Text style={styles.featureToggleDesc}>Automatically provision based on role assignments</Text>
            </View>
            <Switch value={autoProvisioning} onValueChange={setAutoProvisioning} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>SoD Enforcement</Text>
              <Text style={styles.featureToggleDesc}>Enforce segregation of duties policies</Text>
            </View>
            <Switch value={segregationOfDuties} onValueChange={setSegregationOfDuties} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/identity-manager-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F8BBD9" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Identity Manager</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (141)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="role-modeler" agentName="AI Role Modeler" />
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
  activeTab: { backgroundColor: '#F8BBD9' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  roleCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  roleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  roleName: { fontSize: 16, fontWeight: '600', flex: 1 },
  roleRiskBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  roleRiskText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  roleFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  roleMeta: { fontSize: 12, color: '#666' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
