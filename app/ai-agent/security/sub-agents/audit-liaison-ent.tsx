import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  MessageSquare, Users, Calendar, FileText, CheckCircle2,
  Phone, Mail, Video, FileCheck, BarChart3
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AuditLiaisonPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoScheduling, setAutoScheduling] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [documentPrep, setDocumentPrep] = useState(true);

  const stats = [
    { label: 'Audits Coordinated', value: '34', change: '+8', icon: FileCheck, color: '#EF4444', trend: 'up' },
    { label: 'Findings Resolved', value: '89%', change: '+12%', icon: CheckCircle2, color: '#10B981', trend: 'up' },
    { label: 'Response Time', value: '2.3 days', change: '-0.5 days', icon: Clock, color: '#F59E0B', trend: 'down' },
    { label: 'Auditor Satisfaction', value: '4.8/5', change: '+0.3', icon: Users, color: '#3B82F6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Audit Success Rate', value: '100%', target: '95%', status: 'exceeding', icon: FileCheck },
    { label: 'Finding Closure', value: '89%', target: '85%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Response Time', value: '2.3 days', target: '5 days', status: 'exceeding', icon: Clock },
    { label: 'Prep Efficiency', value: '94%', target: '90%', status: 'exceeding', icon: BarChart3 },
  ];

  const audits = [
    { name: 'SOC 2 Type II', auditor: 'Deloitte', status: 'in-progress', findings: 3, due: '2024-04-15' },
    { name: 'ISO 27001', auditor: 'BSI', status: 'scheduled', findings: 0, due: '2024-05-01' },
    { name: 'PCI DSS', auditor: 'QSA Inc', status: 'completed', findings: 5, due: '2024-03-01' },
    { name: 'HIPAA', auditor: 'KPMG', status: 'in-progress', findings: 2, due: '2024-04-30' },
  ];

  const capabilities = [
    'Audit Coordination', 'Finding Management', 'Schedule Management', 'Auditor Communication',
    'Document Preparation', 'Evidence Coordination', 'Remediation Tracking', 'Status Reporting',
    'Meeting Scheduling', 'Interview Coordination', 'Opening/Closing Meetings', 'Finding Response',
    'Corrective Action Plans', 'Audit Report Review', 'Follow-up Coordination'
  ];

  const responsibilities = [
    'Coordinate audit activities with external auditors and assessors',
    'Schedule and facilitate audit meetings and interviews',
    'Prepare and organize evidence for audit review',
    'Track and manage audit findings and remediation',
    'Serve as primary point of contact for auditors',
    'Coordinate finding responses and corrective actions',
    'Schedule opening and closing meetings',
    'Track audit timelines and milestones',
    'Prepare audit status reports for stakeholders',
    'Review audit reports for accuracy',
    'Coordinate remediation activities',
    'Ensure timely response to auditor requests',
    'Maintain audit documentation and records',
    'Facilitate communication between auditors and internal teams',
    'Track finding closure and verification'
  ];

  const activities = [
    { action: 'Coordinated audit', target: 'SOC 2 - Week 3', time: '1 hour ago', icon: FileCheck },
    { action: 'Scheduled meeting', target: 'Opening meeting - ISO', time: '2 hours ago', icon: Calendar },
    { action: 'Prepared evidence', target: 'Access control docs', time: '4 hours ago', icon: FileText },
    { action: 'Resolved finding', target: 'Finding #12 closed', time: '6 hours ago', icon: CheckCircle2 },
    { action: 'Sent response', target: 'Remediation plan', time: '1 day ago', icon: Mail },
    { action: 'Coordinated interview', target: 'Security team - 3 interviews', time: '2 days ago', icon: Users },
  ];

  const quickActions = [
    { label: 'Schedule Audit', icon: Calendar, color: '#EF4444' },
    { label: 'Prepare Evidence', icon: FileText, color: '#F59E0B' },
    { label: 'Track Findings', icon: FileCheck, color: '#10B981' },
    { label: 'Contact Auditor', icon: MessageSquare, color: '#3B82F6' },
    { label: 'View Reports', icon: BarChart3, color: '#8B5CF6' },
    { label: 'Reminders', icon: Clock, color: '#EC4899' },
    { label: 'Meetings', icon: Video, color: '#6366F1' },
    { label: 'Contacts', icon: Users, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <MessageSquare size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Audit Liaison</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Audit coordination and auditor communication specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444420' }]}>
            <Crown size={14} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-compliance-specialist-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Compliance Specialist</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'audits', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTabTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (<>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: stat.trend === 'up' ? '#34C75915' : '#FF3B3015' }]}>
                {stat.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                <Text style={[styles.changeText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* KPIs Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <View style={[styles.kpiIcon, { backgroundColor: '#EF444415' }]}>
                  <kpi.icon size={16} color="#EF4444" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75915' : kpi.status === 'meeting' ? '#007AFF15' : '#FF950015' }]}>
                  <Text style={[styles.statusText, { color: kpi.status === 'exceeding' ? '#34C759' : kpi.status === 'meeting' ? '#007AFF' : '#FF9500' }]}>
                    {kpi.status === 'exceeding' ? 'Exceeding' : kpi.status === 'meeting' ? 'On Track' : 'At Risk'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Audit Liaison coordinates audit activities, manages auditor communications, tracks findings, 
          and ensures smooth collaboration between internal teams and external auditors.
        </Text>
      </View>
      </>)}

      {activeTab === 'audits' && (<>
      {/* Audits */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Audits</Text>
        {audits.map((audit, index) => (
          <View key={index} style={styles.auditCard}>
            <View style={styles.auditHeader}>
              <View style={[styles.auditIcon, { backgroundColor: '#EF444415' }]}>
                <FileCheck size={20} color="#EF4444" />
              </View>
              <View style={styles.auditInfo}>
                <Text style={[styles.auditName, { color: colors.text }]}>{audit.name}</Text>
                <Text style={[styles.auditAuditor, { color: colors.textSecondary }]}>{audit.auditor}</Text>
              </View>
              <View style={[styles.statusBadge2, { backgroundColor: audit.status === 'completed' ? '#34C75915' : audit.status === 'in-progress' ? '#F59E0B15' : '#3B82F615' }]}>
                <Text style={[styles.statusText2, { color: audit.status === 'completed' ? '#34C759' : audit.status === 'in-progress' ? '#F59E0B' : '#3B82F6' }]}>{audit.status}</Text>
              </View>
            </View>
            <View style={styles.auditMeta}>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>Findings: {audit.findings}</Text>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>Due: {audit.due}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#EF444415' }]}>
              <activity.icon size={16} color="#EF4444" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.color + '10' }]}>
              <action.icon size={20} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </>)}

      {activeTab === 'capabilities' && (<>
      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#EF444415' }]}>
              <Text style={[styles.tagText, { color: '#EF4444' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
        {[
          { endpoint: '/consult/audit-liaison', desc: 'Consult on audit coordination' },
          { endpoint: '/audit-liaison/schedule', desc: 'Schedule audit activity' },
          { endpoint: '/audit-liaison/track', desc: 'Track audit findings' },
          { endpoint: '/audit-liaison/communicate', desc: 'Communicate with auditors' },
        ].map((item, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={16} color="#EF4444" />
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
      </>)}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Scheduling</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically schedule audits</Text>
            </View>
            <Switch value={autoScheduling} onValueChange={setAutoScheduling} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Reminders</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Send audit reminders</Text>
            </View>
            <Switch value={reminders} onValueChange={setReminders} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Document Prep</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Auto-prepare documents</Text>
            </View>
            <Switch value={documentPrep} onValueChange={setDocumentPrep} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="audit-liaison" agentName="AI Audit Liaison" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTabTab: { backgroundColor: '#EF4444' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabTabText: { color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 12, borderRadius: 10, backgroundColor: '#F9FAFB', marginBottom: 8 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  kpiValue: { fontSize: 18, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 2 },
  kpiTarget: { fontSize: 11, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  auditCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  auditHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  auditIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  auditInfo: { flex: 1 },
  auditName: { fontSize: 16, fontWeight: '600' },
  auditAuditor: { fontSize: 12, marginTop: 2 },
  statusBadge2: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText2: { fontSize: 12, fontWeight: '600' },
  auditMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 13, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '500' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
