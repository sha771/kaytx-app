import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, User, Shield, FileText, Settings } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AuditorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoAudit, setAutoAudit] = useState(true);
  const [complianceCheck, setComplianceCheck] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const stats = [{label:'Tasks/Day',value:'120',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.99%',icon:Activity,color:'#007AFF'},{label:'Response',value:'<1 second',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.2%',icon:Target,color:'#0D47A1'}];
  const capabilities = ['Financial Auditing','Discrepancy Detection','Standards Compliance','Risk Assessment','Internal Controls','Regulatory Reporting'];
  const responsibilities = ['Financial statement preparation & analysis','Budget planning & variance monitoring','Audit coordination & compliance enforcement','Revenue recognition & tracking','Cost optimization & reduction initiatives','Regulatory & tax compliance reporting'];
  const activities = [{time:'3 min ago',text:'Analyzing journal entries for discrepancies',icon: CircleCheckBig},{time:'6 min ago',text:'Running compliance check on expense reports',icon:Clock},{time:'9 min ago',text:'Generating audit trail for Q2 transactions',icon:Zap}];

  const auditResults = [
    { task: 'Monthly Compliance Audit', result: 'No Violations', status: 'Success', date: '2 hours ago' },
    { task: 'Expense Reconciliation', result: 'Discrepancies Resolved', status: 'Success', date: '5 hours ago' },
    { task: 'Internal Control Review', result: '98% Coverage', status: 'Success', date: '1 day ago' },
    { task: 'Q3 Financial Statement', result: 'Pending Review', status: 'In Progress', date: '2 days ago' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0D47A120' }]}><User size={48} color="#0D47A1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Auditor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Accounting & Finance</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0D47A122' }]}><Star size={12} color="#0D47A1" /><Text style={[styles.badgeText, { color: '#0D47A1' }]}>Agent</Text></View>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push('/ai-agent/accounting')} style={[styles.parentCard, { backgroundColor: theme.colors.card || '#F2F2F7', marginHorizontal: 16, marginTop: 16 }]}>
        <Shield size={24} color="#0D47A1" />
        <View style={styles.parentInfo}>
          <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Accounting</Text>
          <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
        </View>
        <ArrowRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={styles.tabContainer}>
        {['overview', 'audits', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Conducts financial audits, identifies discrepancies, and ensures compliance with accounting standards.</Text></View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#0D47A1" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#0D47A115' }]}><act.icon size={14} color="#0D47A1" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
        </>
      )}

      {activeTab === 'audits' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audit Results</Text>
          {auditResults.map((audit, i) => (
            <View key={i} style={styles.auditCard}>
              <View style={styles.auditHeader}>
                <FileText size={18} color="#0D47A1" />
                <Text style={styles.auditTask}>{audit.task}</Text>
                <View style={[styles.statusBadge, { backgroundColor: audit.status === 'Success' ? '#34C75920' : '#FF950020' }]}>
                  <Text style={[styles.statusText, { color: audit.status === 'Success' ? '#34C759' : '#FF9500' }]}>{audit.status}</Text>
                </View>
              </View>
              <Text style={styles.auditResult}>{audit.result}</Text>
              <Text style={styles.auditDate}>{audit.date}</Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/auditor', desc: 'Consult on audit matters' },
            { endpoint: '/auditor/execute', desc: 'Execute audit process' },
            { endpoint: '/auditor/compliance', desc: 'Check compliance status' },
            { endpoint: '/auditor/results', desc: 'Get audit results' },
          ].map((item, i) => (
            <View key={i} style={styles.endpointRow}>
              <Zap size={16} color="#0D47A1" />
              <View style={styles.endpointInfo}>
                <Text style={styles.endpointText}>{item.endpoint}</Text>
                <Text style={styles.endpointDesc}>{item.desc}</Text>
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
              <Text style={styles.featureToggleTitle}>Auto Audit</Text>
              <Text style={styles.featureToggleDesc}>Run automated periodic audits</Text>
            </View>
            <Switch value={autoAudit} onValueChange={setAutoAudit} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Compliance Check</Text>
              <Text style={styles.featureToggleDesc}>Enable compliance verification</Text>
            </View>
            <Switch value={complianceCheck} onValueChange={setComplianceCheck} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Real-time Monitoring</Text>
              <Text style={styles.featureToggleDesc}>Monitor transactions in real-time</Text>
            </View>
            <Switch value={realTimeMonitoring} onValueChange={setRealTimeMonitoring} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
        </View>
      )}

      <AgentFeatures agentId="auditor" agentName="AI Auditor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#0D47A1' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  auditCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  auditHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  auditTask: { flex: 1, fontSize: 14, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  auditResult: { fontSize: 13, marginBottom: 4 },
  auditDate: { fontSize: 12, color: '#666' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});


