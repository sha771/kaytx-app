import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, User, Shield, Users, Calendar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ResourcePlannerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoAllocate, setAutoAllocate] = useState(true);
  const [skillMatching, setSkillMatching] = useState(true);
  const [capacityPlanning, setCapacityPlanning] = useState(true);

  const stats = [{label:'Tasks/Day',value:'166',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'1.8s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.0%',icon:Target,color:'#4E342E'}];
  const capabilities = ['Resource Planning','Efficient Allocation','Project Management'];
  const responsibilities = ['Logistics coordination & optimization','Supply chain management & planning','Quality assurance & process control','Operational efficiency improvement','Vendor management & negotiations','Resource planning & allocation'];
  const activities = [{time:'3 min ago',text:'Allocated 12 resources',icon: CircleCheckBig},{time:'10 min ago',text:'Balanced team capacity',icon:Clock},{time:'25 min ago',text:'Generated allocation report',icon:Zap}];

  const allocations = [
    { id: 'RES-001', project: 'Project Alpha', resources: 8, utilization: '92%', status: 'Active', date: 'Today' },
    { id: 'RES-002', project: 'Project Beta', resources: 5, utilization: '78%', status: 'Active', date: 'Today' },
    { id: 'RES-003', project: 'Project Gamma', resources: 12, utilization: '95%', status: 'Critical', date: 'Yesterday' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#4E342E20' }]}><User size={48} color="#4E342E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Resource Planner</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Star size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>Agent</Text></View>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push('/ai-agent/operations')} style={[styles.parentCard, { backgroundColor: theme.colors.card || '#F2F2F7', marginHorizontal: 16, marginTop: 16 }]}>
        <Shield size={24} color="#4E342E" />
        <View style={styles.parentInfo}>
          <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Operations</Text>
          <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
        </View>
        <ArrowRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={styles.tabContainer}>
        {['overview', 'allocations', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Plans and allocates resources efficiently across projects and teams.</Text></View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#4E342E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#4E342E15' }]}><act.icon size={14} color="#4E342E" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
        </>
      )}

      {activeTab === 'allocations' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Allocations</Text>
          {allocations.map((alloc, i) => (
            <View key={i} style={styles.txnCard}>
              <View style={styles.txnHeader}>
                <Users size={18} color="#4E342E" />
                <Text style={styles.txnId}>{alloc.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: alloc.status === 'Critical' ? '#FF3B3020' : '#34C75920' }]}>
                  <Text style={[styles.statusText, { color: alloc.status === 'Critical' ? '#FF3B30' : '#34C759' }]}>{alloc.status}</Text>
                </View>
              </View>
              <Text style={styles.txnDesc}>{alloc.project}</Text>
              <View style={styles.txnFooter}>
                <Text style={styles.txnDate}>{alloc.date}</Text>
                <Text style={styles.txnAmount}>{alloc.resources} resources</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/resource', desc: 'Consult on resources' },
            { endpoint: '/resource/allocate', desc: 'Allocate resources' },
            { endpoint: '/resource/plan', desc: 'Plan resource usage' },
            { endpoint: '/resource/report', desc: 'Generate reports' },
          ].map((item, i) => (
            <View key={i} style={styles.endpointRow}>
              <Zap size={16} color="#4E342E" />
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
              <Text style={styles.featureToggleTitle}>Auto Allocate</Text>
              <Text style={styles.featureToggleDesc}>Auto-allocate resources</Text>
            </View>
            <Switch value={autoAllocate} onValueChange={setAutoAllocate} trackColor={{ false: '#767577', true: '#4E342E' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Skill Matching</Text>
              <Text style={styles.featureToggleDesc}>Match skills to tasks</Text>
            </View>
            <Switch value={skillMatching} onValueChange={setSkillMatching} trackColor={{ false: '#767577', true: '#4E342E' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Capacity Planning</Text>
              <Text style={styles.featureToggleDesc}>Plan capacity needs</Text>
            </View>
            <Switch value={capacityPlanning} onValueChange={setCapacityPlanning} trackColor={{ false: '#767577', true: '#4E342E' }} />
          </View>
        </View>
      )}

      <AgentFeatures agentId="resource-planner" agentName="AI Resource Planner" />
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
  activeTab: { backgroundColor: '#4E342E' },
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
  txnAmount: { fontSize: 14, fontWeight: '600', color: '#4E342E' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
