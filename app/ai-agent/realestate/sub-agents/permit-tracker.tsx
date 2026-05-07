import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileCheck, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, Clock3, Building2, Calendar, Settings as SettingsIcon, RefreshCw, Download, FileText, CheckCircle, AlertCircle, Send } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function PermitTrackerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('applications');
  const [autoTrack, setAutoTrack] = React.useState(true);

  const stats = [
    {label:'Active',value:'45',icon: FileText,color:'#34C759'},
    {label:'Approved',value:'156',icon: CheckCircle,color:'#007AFF'},
    {label:'Pending',value:'12',icon: Clock3,color:'#FF9500'},
    {label:'At Risk',value:'3',icon: AlertCircle,color:'#FF3B30'}
  ];

  const applications = [
    {permit:'Building Permit',project:'Harbor View Tower',agency:'City Planning',submitted:'2026-01-15',status:'approved',dueDate:'2026-02-15',daysLeft:0},
    {permit:'Site Plan Approval',project:'Tech Campus Phase 2',agency:'County Zoning',submitted:'2026-01-20',status:'under-review',dueDate:'2026-03-01',daysLeft:30},
    {permit:'Environmental',project:'Mixed-Use Development',agency:'State EPA',submitted:'2026-02-01',status:'pending',dueDate:'2026-04-15',daysLeft:60},
    {permit:'Zoning Variance',project:'Retail Center',agency:'City Planning',submitted:'2026-02-10',status:'under-review',dueDate:'2026-03-10',daysLeft:15},
    {permit:'Foundation Permit',project:'Industrial Facility',agency:'County Building',submitted:'2026-01-05',status:'approved',dueDate:'2026-02-05',daysLeft:0}
  ];

  const milestones = [
    {phase:'Application Submitted',completed:45,total:45,avgDays:1},
    {phase:'Agency Review',completed:38,total:45,avgDays:15},
    {phase:'Comments Received',completed:32,total:45,avgDays:25},
    {phase:'Responses Submitted',completed:28,total:45,avgDays:32},
    {phase:'Permit Issued',completed:22,total:45,avgDays:45}
  ];

  const agencies = [
    {name:'City Planning',permits:18,avgDays:35,onTime:94},
    {name:'County Zoning',permits:12,avgDays:42,onTime:88},
    {name:'State EPA',permits:8,avgDays:60,onTime:75},
    {name:'County Building',permits:7,avgDays:28,onTime:96}
  ];

  const capabilities = ['Permit Tracking','Application Management','Compliance Monitoring','Timeline Tracking','Agency Liaison','Document Management'];
  const responsibilities = ['Permit application management & tracking','Compliance monitoring & requirement tracking','Timeline tracking & milestone management','Regulatory agency liaison & communication','Document management & submission tracking','Permit renewal & expiration management'];
  const activities = [{time:'3 min ago',text:'Tracked 45 active permit applications',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Obtained 8 permits ahead of schedule',icon:CheckCircle,color:'#007AFF'},{time:'30 min ago',text:'Managed 12 agency communications this week',icon:Send,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/permits/applications',description:'Permit applications',method:'GET'},
    {endpoint:'/permits/milestones',description:'Milestone tracking',method:'GET'},
    {endpoint:'/permits/agencies',description:'Agency data',method:'GET'},
    {endpoint:'/permits/submit',description:'Submit application',method:'POST'}
  ];

  const renderApplications = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Permit Applications</Text>
        {applications.map((app, index) => (
          <View key={index} style={styles.appCard}>
            <View style={styles.appHeader}>
              <View style={styles.appInfo}>
                <Text style={[styles.appPermit, { color: theme.colors.text }]}>{app.permit}</Text>
                <Text style={[styles.appProject, { color: theme.colors.textSecondary }]}>{app.project}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: app.status === 'approved' ? '#34C75922' : app.status === 'under-review' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: app.status === 'approved' ? '#34C759' : app.status === 'under-review' ? '#007AFF' : '#FF9500' }]}>{app.status}</Text>
              </View>
            </View>
            <View style={styles.appMetrics}>
              <View style={styles.appMetric}><Text style={[styles.appValue, { color: theme.colors.text }]}>{app.agency}</Text><Text style={[styles.appLabel, { color: theme.colors.textSecondary }]}>Agency</Text></View>
              <View style={styles.appMetric}><Text style={[styles.appValue, { color: theme.colors.text }]}>{app.submitted}</Text><Text style={[styles.appLabel, { color: theme.colors.textSecondary }]}>Submitted</Text></View>
              <View style={styles.appMetric}><Text style={[styles.appValue, { color: app.daysLeft <= 0 ? '#34C759' : app.daysLeft <= 15 ? '#FF9500' : '#FF3B30' }]}>{app.daysLeft <= 0 ? 'Complete' : `${app.daysLeft} days`}</Text><Text style={[styles.appLabel, { color: theme.colors.textSecondary }]}>Due</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderMilestones = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Process Milestones</Text>
        {milestones.map((milestone, index) => (
          <View key={index} style={styles.milestoneCard}>
            <View style={styles.milestoneHeader}>
              <Text style={[styles.milestonePhase, { color: theme.colors.text }]}>{milestone.phase}</Text>
              <Text style={[styles.milestoneAvg, { color: theme.colors.textSecondary }]}>{milestone.avgDays} days avg</Text>
            </View>
            <View style={styles.milestoneBar}><View style={[styles.milestoneFill, { width: `${(milestone.completed/milestone.total)*100}%`, backgroundColor: '#558B2F' }]} /></View>
            <View style={styles.milestoneMetrics}>
              <Text style={[styles.milestoneCount, { color: theme.colors.text }]}>{milestone.completed}/{milestone.total}</Text>
              <Text style={[styles.milestonePercent, { color: theme.colors.textSecondary }]}>{Math.round((milestone.completed/milestone.total)*100)}% complete</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderAgencies = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agency Performance</Text>
        {agencies.map((agency, index) => (
          <View key={index} style={styles.agencyCard}>
            <View style={styles.agencyHeader}>
              <Text style={[styles.agencyName, { color: theme.colors.text }]}>{agency.name}</Text>
              <View style={[styles.onTimeBadge, { backgroundColor: agency.onTime > 90 ? '#34C75922' : agency.onTime > 80 ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.onTimeText, { color: agency.onTime > 90 ? '#34C759' : agency.onTime > 80 ? '#FF9500' : '#FF3B30' }]}>{agency.onTime}% on-time</Text>
              </View>
            </View>
            <View style={styles.agencyMetrics}>
              <View style={styles.agencyMetric}><Text style={[styles.agencyValue, { color: theme.colors.text }]}>{agency.permits}</Text><Text style={[styles.agencyLabel, { color: theme.colors.textSecondary }]}>Permits</Text></View>
              <View style={styles.agencyMetric}><Text style={[styles.agencyValue, { color: theme.colors.text }]}>{agency.avgDays}</Text><Text style={[styles.agencyLabel, { color: theme.colors.textSecondary }]}>Avg Days</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Track</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically track permit status</Text></View><Switch value={autoTrack} onValueChange={setAutoTrack} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Send size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Submit New</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><FileCheck size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Permit Tracker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Real Estate Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['applications','milestones','agencies','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'applications' && renderApplications()}
      {activeTab === 'milestones' && renderMilestones()}
      {activeTab === 'agencies' && renderAgencies()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-real-estate-development')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><FileCheck size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Real Estate Development</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="permit-tracker" agentName="AI Permit Tracker" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},appCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},appHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},appInfo:{flex:1},appPermit:{fontSize:15,fontWeight:'600'},appProject:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},appMetrics:{flexDirection:'row',justifyContent:'space-between'},appMetric:{alignItems:'center'},appValue:{fontSize:14,fontWeight:'600'},appLabel:{fontSize:10,color:'#666'},milestoneCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},milestoneHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},milestonePhase:{fontSize:15,fontWeight:'600'},milestoneAvg:{fontSize:12,color:'#666'},milestoneBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},milestoneFill:{height:'100%',borderRadius:4},milestoneMetrics:{flexDirection:'row',justifyContent:'space-between'},milestoneCount:{fontSize:14,fontWeight:'600'},milestonePercent:{fontSize:12,color:'#666'},agencyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},agencyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},agencyName:{fontSize:15,fontWeight:'600'},onTimeBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},onTimeText:{fontSize:12,fontWeight:'600'},agencyMetrics:{flexDirection:'row',justifyContent:'space-between'},agencyMetric:{alignItems:'center'},agencyValue:{fontSize:18,fontWeight:'600'},agencyLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
