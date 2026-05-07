import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, User, Shield, FileText, DollarSign } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ExpenseManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCategorize, setAutoCategorize] = useState(true);
  const [approvalWorkflow, setApprovalWorkflow] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const stats = [{label:'Tasks/Day',value:'177',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'1.4s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.6%',icon:Target,color:'#0D47A1'}];
  const capabilities = ['Expense Tracking','Intelligent Categorization','Cost Optimization'];
  const responsibilities = ['Financial statement preparation & analysis','Budget planning & variance monitoring','Audit coordination & compliance enforcement','Revenue recognition & tracking','Cost optimization & reduction initiatives','Regulatory & tax compliance reporting'];
  const activities = [{time:'3 min ago',text:'Reconciled 45 financial statements',icon: CircleCheckBig},{time:'6 min ago',text:'Updated quarterly budget forecasts',icon:Clock},{time:'9 min ago',text:'Processed 120 invoice approvals',icon:Zap}];

  const expenses = [
    { id: 'EXP-001', category: 'Travel', amount: '$2,450', status: 'Approved', date: 'Today' },
    { id: 'EXP-002', category: 'Office Supplies', amount: '$340', status: 'Pending', date: 'Today' },
    { id: 'EXP-003', category: 'Software', amount: '$1,200', status: 'Approved', date: 'Yesterday' },
    { id: 'EXP-004', category: 'Meals', amount: '$89', status: 'Rejected', date: 'Yesterday' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0D47A120' }]}><User size={48} color="#0D47A1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Expense Manager</Text>
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
        {['overview', 'expenses', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Tracks, categorizes, and optimizes business expenses with intelligent analysis.</Text></View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#0D47A1" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#0D47A115' }]}><act.icon size={14} color="#0D47A1" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
        </>
      )}

      {activeTab === 'expenses' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Expenses</Text>
          {expenses.map((exp, i) => (
            <View key={i} style={styles.txnCard}>
              <View style={styles.txnHeader}>
                <DollarSign size={18} color="#0D47A1" />
                <Text style={styles.txnId}>{exp.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: exp.status === 'Approved' ? '#34C75920' : exp.status === 'Rejected' ? '#FF3B3020' : '#FF950020' }]}>
                  <Text style={[styles.statusText, { color: exp.status === 'Approved' ? '#34C759' : exp.status === 'Rejected' ? '#FF3B30' : '#FF9500' }]}>{exp.status}</Text>
                </View>
              </View>
              <Text style={styles.txnDesc}>{exp.category}</Text>
              <View style={styles.txnFooter}>
                <Text style={styles.txnDate}>{exp.date}</Text>
                <Text style={styles.txnAmount}>{exp.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/expense-manager', desc: 'Consult on expense matters' },
            { endpoint: '/expense-manager/process', desc: 'Process expense report' },
            { endpoint: '/expense-manager/categorize', desc: 'Categorize expenses' },
            { endpoint: '/expense-manager/reports', desc: 'Generate expense reports' },
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
              <Text style={styles.featureToggleTitle}>Auto Categorize</Text>
              <Text style={styles.featureToggleDesc}>Automatically categorize expenses</Text>
            </View>
            <Switch value={autoCategorize} onValueChange={setAutoCategorize} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Approval Workflow</Text>
              <Text style={styles.featureToggleDesc}>Enable approval process</Text>
            </View>
            <Switch value={approvalWorkflow} onValueChange={setApprovalWorkflow} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Budget Alerts</Text>
              <Text style={styles.featureToggleDesc}>Alert when budget exceeded</Text>
            </View>
            <Switch value={budgetAlerts} onValueChange={setBudgetAlerts} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
        </View>
      )}

      <AgentFeatures agentId="expense-manager" agentName="AI Expense Manager" />
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
  txnCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  txnHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  txnId: { flex: 1, fontSize: 14, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  txnDesc: { fontSize: 13, marginBottom: 8 },
  txnFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  txnDate: { fontSize: 12, color: '#666' },
  txnAmount: { fontSize: 14, fontWeight: '600', color: '#0D47A1' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});


