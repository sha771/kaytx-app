import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { User, ArrowLeft, Crown, Users, UserCircle, Star, Activity, Award, TrendingUp, Target, Briefcase, Clock, Shield, Zap, ChevronRight, Phone, Mail, MapPin, Globe, Calendar, BarChart3, GitBranch, Layers, MessageSquare, FileText } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const MOCK_EMPLOYEE = {
  id: 'emp-001',
  name: 'AI Sales Representative Pro',
  title: 'Senior Sales Specialist',
  level: 'specialist',
  department: 'Sales',
  status: 'active',
  avatar: null,
  color: '#E65100',
  reportsTo: { id: 'mgr-001', name: 'Sarah Chen', title: 'Sales Manager', level: 'manager' },
  directReports: [],
  contact: {
    email: 'sales-rep@kaytx.ai',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
  },
  stats: {
    tasksCompleted: 1250,
    dealsClosed: 89,
    revenue: '$2.4M',
    responseTime: '1.2s',
    uptime: '99.98%',
    satisfaction: '4.8/5',
  },
  capabilities: ['Lead Qualification', 'Demo Scheduling', 'Proposal Generation', 'Contract Negotiation', 'CRM Updates'],
  projects: [
    { id: 1, name: 'Q4 Enterprise Push', status: 'active', progress: 75 },
    { id: 2, name: 'SMB Outreach', status: 'active', progress: 45 },
    { id: 3, name: 'Product Launch', status: 'completed', progress: 100 },
  ],
  recentActivity: [
    { id: 1, action: 'Closed deal', target: 'Acme Corp', value: '$150K', time: '2 hours ago' },
    { id: 2, action: 'Qualified lead', target: 'TechStart Inc', value: null, time: '4 hours ago' },
    { id: 3, action: 'Demo completed', target: 'Global Systems', value: null, time: '6 hours ago' },
  ],
};

const HIERARCHY_CHAIN = [
  { level: 'c-suite', name: 'Chief Revenue Officer', title: 'CRO', icon: Crown, color: '#FFD700' },
  { level: 'vp', name: 'VP of Sales', title: 'VP Sales', icon: Users, color: '#8B5CF6' },
  { level: 'manager', name: 'Sales Manager', title: 'Manager', icon: UserCircle, color: '#3B82F6' },
  { level: 'specialist', name: 'Sales Representative', title: 'Specialist', icon: User, color: '#F59E0B', current: true },
];

const TAB_OPTIONS = [
  { id: 'overview', name: 'Overview', icon: User },
  { id: 'performance', name: 'Performance', icon: BarChart3 },
  { id: 'activity', name: 'Activity', icon: Activity },
  { id: 'hierarchy', name: 'Hierarchy', icon: GitBranch },
  { id: 'settings', name: 'Settings', icon: Layers },
];

export default function EmployeeDetailPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  const employee = MOCK_EMPLOYEE; // In real app, fetch by params.id

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Grid */}
            <View style={styles.statsContainer}>
              {Object.entries(employee.stats).slice(0, 4).map(([key, value], i) => (
                <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
                  <Text style={[styles.statValue, { color: employee.color }]}>{value}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                </View>
              ))}
            </View>

            {/* Capabilities */}
            <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
              <View style={styles.capabilitiesList}>
                {employee.capabilities.map((cap, i) => (
                  <View key={i} style={[styles.capabilityChip, { backgroundColor: employee.color + '15' }]}>
                    <Zap size={14} color={employee.color} />
                    <Text style={[styles.capabilityText, { color: employee.color }]}>{cap}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Contact Info */}
            <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contact Information</Text>
              <View style={styles.contactList}>
                <View style={styles.contactItem}>
                  <Mail size={18} color={theme.colors.textSecondary} />
                  <Text style={[styles.contactText, { color: theme.colors.text }]}>{employee.contact.email}</Text>
                </View>
                <View style={styles.contactItem}>
                  <MapPin size={18} color={theme.colors.textSecondary} />
                  <Text style={[styles.contactText, { color: theme.colors.text }]}>{employee.contact.location}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Globe size={18} color={theme.colors.textSecondary} />
                  <Text style={[styles.contactText, { color: theme.colors.text }]}>{employee.contact.timezone}</Text>
                </View>
              </View>
            </View>
          </>
        );

      case 'performance':
        return (
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
            {Object.entries(employee.stats).map(([key, value], i) => (
              <View key={i} style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Text>
                <View style={styles.metricBar}>
                  <View style={[styles.metricFill, { backgroundColor: employee.color, width: `${Math.min(100, (i + 1) * 20)}%` }]} />
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>{value}</Text>
              </View>
            ))}
          </View>
        );

      case 'activity':
        return (
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
            {employee.recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: employee.color + '20' }]}>
                  <Activity size={16} color={employee.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityAction, { color: theme.colors.text }]}>{activity.action}</Text>
                  <Text style={[styles.activityTarget, { color: theme.colors.textSecondary }]}>{activity.target}</Text>
                  {activity.value && (
                    <Text style={[styles.activityValue, { color: employee.color }]}>{activity.value}</Text>
                  )}
                </View>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.time}</Text>
              </View>
            ))}
          </View>
        );

      case 'hierarchy':
        return (
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reporting Chain</Text>
            <View style={styles.hierarchyChain}>
              {HIERARCHY_CHAIN.map((level, index) => (
                <View key={level.level} style={styles.hierarchyItem}>
                  <View style={[styles.hierarchyIcon, { backgroundColor: level.color + '20' }]}>
                    <level.icon size={20} color={level.color} />
                  </View>
                  <View style={styles.hierarchyContent}>
                    <Text style={[styles.hierarchyName, { color: theme.colors.text }]}>{level.name}</Text>
                    <Text style={[styles.hierarchyTitle, { color: theme.colors.textSecondary }]}>{level.title}</Text>
                  </View>
                  {level.current && (
                    <View style={[styles.currentBadge, { backgroundColor: employee.color }]}>
                      <Text style={styles.currentText}>You</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Direct Reports</Text>
            <View style={styles.emptyState}>
              <Users size={40} color={theme.colors.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No direct reports at this level
              </Text>
            </View>
          </View>
        );

      case 'settings':
        return (
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Settings</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Zap size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.settingName, { color: theme.colors.text }]}>Capabilities</Text>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Layers size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.settingName, { color: theme.colors.text }]}>Preferences</Text>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Activity size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.settingName, { color: theme.colors.text }]}>Activation</Text>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Shield size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.settingName, { color: theme.colors.text }]}>Permissions</Text>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: employee.color + '10' }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <MessageSquare size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <FileText size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: employee.color + '30' }]}>
            <User size={48} color={employee.color} />
          </View>
          <Text style={[styles.name, { color: theme.colors.text }]}>{employee.name}</Text>
          <Text style={[styles.title, { color: theme.colors.textSecondary }]}>{employee.title}</Text>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: employee.color + '20' }]}>
              <Briefcase size={12} color={employee.color} />
              <Text style={[styles.badgeText, { color: employee.color }]}>{employee.department}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#10B98120' }]}>
              <Activity size={12} color="#10B981" />
              <Text style={[styles.badgeText, { color: '#10B981' }]}>{employee.status}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
          {TAB_OPTIONS.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tab, activeTab === tab.id && { backgroundColor: employee.color + '30' }]}
            >
              <tab.icon size={16} color={activeTab === tab.id ? employee.color : theme.colors.textSecondary} />
              <Text style={[styles.tabText, { color: activeTab === tab.id ? employee.color : theme.colors.textSecondary }]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderTabContent()}
        <AgentFeatures agentId={`employee-${employee.id}`} agentName={employee.name} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 50, paddingBottom: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerAction: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  profileHeader: { alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
  title: { fontSize: 16, marginTop: 4 },
  badges: { flexDirection: 'row', gap: 8, marginTop: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  tabs: { marginTop: 20, paddingHorizontal: 16 },
  tab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, gap: 6 },
  tabText: { fontSize: 13, fontWeight: '500' },
  content: { flex: 1, paddingTop: 16 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 16, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 11, marginTop: 4 },
  capabilitiesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 5 },
  capabilityText: { fontSize: 12, fontWeight: '600' },
  contactList: { gap: 12 },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  contactText: { fontSize: 14 },
  metricRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  metricLabel: { width: 100, fontSize: 13 },
  metricBar: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, marginHorizontal: 12 },
  metricFill: { height: '100%', borderRadius: 4 },
  metricValue: { width: 70, fontSize: 14, fontWeight: '600', textAlign: 'right' },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 14, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 1 },
  activityValue: { fontSize: 12, marginTop: 1, fontWeight: '600' },
  activityTime: { fontSize: 11 },
  hierarchyChain: { gap: 12 },
  hierarchyItem: { flexDirection: 'row', alignItems: 'center' },
  hierarchyIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  hierarchyContent: { flex: 1 },
  hierarchyName: { fontSize: 15, fontWeight: '500' },
  hierarchyTitle: { fontSize: 12, marginTop: 1 },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  currentText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  emptyState: { alignItems: 'center', padding: 30 },
  emptyText: { fontSize: 14, marginTop: 12 },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  settingName: { flex: 1, marginLeft: 12, fontSize: 15 },
});
