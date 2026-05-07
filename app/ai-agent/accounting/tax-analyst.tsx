import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, User, Shield, FileText, Calculator } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function TaxAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoFiling, setAutoFiling] = useState(true);
  const [taxAlerts, setTaxAlerts] = useState(true);
  const [deductionTracking, setDeductionTracking] = useState(true);

  const stats = [{label:'Tasks/Day',value:'167',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'1.9s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.0%',icon:Target,color:'#0D47A1'}];
  const capabilities = ['Tax Analysis','Compliance Management','Tax Strategy Optimization'];
  const responsibilities = ['Financial statement preparation & analysis','Budget planning & variance monitoring','Audit coordination & compliance enforcement','Revenue recognition & tracking','Cost optimization & reduction initiatives','Regulatory & tax compliance reporting'];
  const activities = [{time:'3 min ago',text:'Analyzed Q1 tax obligations',icon: CircleCheckBig},{time:'15 min ago',text:'Reviewed deduction eligibility',icon:Clock},{time:'1 hour ago',text:'Generated tax report',icon:Zap}];

  const taxFilings = [
    { id: 'TAX-001', type: 'Federal Q1', amount: '$45,000', status: 'Filed', date: 'Apr 15, 2026' },
    { id: 'TAX-002', type: 'State Q1', amount: '$12,500', status: 'Filed', date: 'Apr 15, 2026' },
    { id: 'TAX-003', type: 'Federal Q4', amount: '$52,000', status: 'Pending', date: 'Jan 15, 2026' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0D47A120' }]}><User size={48} color="#0D47A1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Tax Analyst</Text>
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
        {['overview', 'filings', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Analyzes tax obligations, ensures compliance, and optimizes tax strategies.</Text></View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#0D47A1" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#0D47A115' }]}><act.icon size={14} color="#0D47A1" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
        </>
      )}

      {activeTab === 'filings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tax Filings</Text>
          {taxFilings.map((filing, i) => (
            <View key={i} style={styles.txnCard}>
              <View style={styles.txnHeader}>
                <Calculator size={18} color="#0D47A1" />
                <Text style={styles.txnId}>{filing.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: filing.status === 'Filed' ? '#34C75920' : '#FF950020' }]}>
                  <Text style={[styles.statusText, { color: filing.status === 'Filed' ? '#34C759' : '#FF9500' }]}>{filing.status}</Text>
                </View>
              </View>
              <Text style={styles.txnDesc}>{filing.type}</Text>
              <View style={styles.txnFooter}>
                <Text style={styles.txnDate}>{filing.date}</Text>
                <Text style={styles.txnAmount}>{filing.amount}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/tax-analyst', desc: 'Consult on tax matters' },
            { endpoint: '/tax-analyst/analyze', desc: 'Analyze tax obligations' },
            { endpoint: '/tax-analyst/calculate', desc: 'Calculate tax liability' },
            { endpoint: '/tax-analyst/optimize', desc: 'Optimize tax strategy' },
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
              <Text style={styles.featureToggleTitle}>Auto Filing</Text>
              <Text style={styles.featureToggleDesc}>Auto-file tax returns</Text>
            </View>
            <Switch value={autoFiling} onValueChange={setAutoFiling} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Tax Alerts</Text>
              <Text style={styles.featureToggleDesc}>Alert on tax deadlines</Text>
            </View>
            <Switch value={taxAlerts} onValueChange={setTaxAlerts} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Deduction Tracking</Text>
              <Text style={styles.featureToggleDesc}>Track deductions</Text>
            </View>
            <Switch value={deductionTracking} onValueChange={setDeductionTracking} trackColor={{ false: '#767577', true: '#0D47A1' }} />
          </View>
        </View>
      )}

      <AgentFeatures agentId="tax-analyst" agentName="AI Tax Analyst" />
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


