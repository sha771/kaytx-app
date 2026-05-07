import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { GitBranch, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, RefreshCw, Download, BarChart3, Users, CheckCircle, Clock3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function DevelopmentPipelineManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('pipeline');
  const [autoTrack, setAutoTrack] = React.useState(true);

  const stats = [
    {label:'Projects',value:'15',icon: Building2,color:'#34C759'},
    {label:'Pipeline',value:'$800M',icon: DollarSign,color:'#007AFF'},
    {label:'In Progress',value:'8',icon: Clock3,color:'#FF9500'},
    {label:'Completed',value:'7',icon: CheckCircle,color:'#558B2F'}
  ];

  const projects = [
    {name:'Harbor View Tower',stage:'Construction',budget:'$125M',spent:'$75M',progress:60,start:'2025-06',end:'2027-06',priority:'high',status:'on-track'},
    {name:'Tech Campus Phase 2',stage:'Design',budget:'$95M',spent:'$12M',progress:15,start:'2025-09',end:'2027-12',priority:'high',status:'on-track'},
    {name:'Mixed-Use Development',stage:'Entitlement',budget:'$180M',spent:'$8M',progress:8,start:'2026-01',end:'2028-06',priority:'medium',status:'delayed'},
    {name:'Retail Center Expansion',stage:'Feasibility',budget:'$65M',spent:'$2M',progress:5,start:'2026-03',end:'2027-09',priority:'low',status:'on-track'},
    {name:'Industrial Facility',stage:'Construction',budget:'$85M',spent:'$55M',progress:65,start:'2025-08',end:'2026-12',priority:'high',status:'on-track'}
  ];

  const stageGates = [
    {stage:'Acquisition',projects:2,completed:2,pending:0,avgDays:45},
    {stage:'Entitlement',projects:3,completed:1,pending:2,avgDays:120},
    {stage:'Design',projects:4,completed:2,pending:2,avgDays:90},
    {stage:'Construction',projects:5,completed:3,pending:2,avgDays:365},
    {stage:'Lease-Up',projects:1,completed:0,pending:1,avgDays:180}
  ];

  const resources = [
    {role:'Project Managers',allocated:8,available:2,utilization:80},
    {role:'Architects',allocated:5,available:1,utilization:83},
    {role:'Construction Mgrs',allocated:6,available:3,utilization:67},
    {role:'Analysts',allocated:4,available:1,utilization:80},
    {role:'Legal',allocated:3,available:1,utilization:75}
  ];

  const capabilities = ['Pipeline Management','Stage Gate Tracking','Resource Allocation','Priority Ranking','Pipeline Analytics','Deal Flow'];
  const responsibilities = ['Development pipeline management & tracking','Stage gate process management','Resource allocation & optimization','Project priority ranking & scheduling','Pipeline analytics & reporting','Deal flow management & tracking'];
  const activities = [{time:'3 min ago',text:'Managed pipeline of 15 development projects',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Advanced 3 projects through stage gate review',icon:CheckCircle,color:'#007AFF'},{time:'30 min ago',text:'Allocated resources across $800M pipeline',icon:Users,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/pipeline/projects',description:'Project pipeline',method:'GET'},
    {endpoint:'/pipeline/stages',description:'Stage gate data',method:'GET'},
    {endpoint:'/pipeline/resources',description:'Resource allocation',method:'GET'},
    {endpoint:'/pipeline/advance',description:'Advance project stage',method:'POST'}
  ];

  const renderPipeline = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Development Pipeline</Text>
        {projects.map((proj, index) => (
          <View key={index} style={styles.projCard}>
            <View style={styles.projHeader}>
              <View style={styles.projInfo}>
                <Text style={[styles.projName, { color: theme.colors.text }]}>{proj.name}</Text>
                <Text style={[styles.projStage, { color: theme.colors.textSecondary }]}>{proj.stage}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: proj.status === 'on-track' ? '#34C75922' : '#FF3B3022' }]}>
                <Text style={[styles.statusText, { color: proj.status === 'on-track' ? '#34C759' : '#FF3B30' }]}>{proj.status}</Text>
              </View>
            </View>
            <View style={styles.projBar}><View style={[styles.projFill, { width: `${proj.progress}%`, backgroundColor: proj.progress > 50 ? '#34C759' : proj.progress > 25 ? '#007AFF' : '#FF9500' }]} /></View>
            <View style={styles.projMetrics}>
              <View style={styles.projMetric}><Text style={[styles.projValue, { color: theme.colors.text }]}>{proj.budget}</Text><Text style={[styles.projLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
              <View style={styles.projMetric}><Text style={[styles.projValue, { color: theme.colors.text }]}>{proj.spent}</Text><Text style={[styles.projLabel, { color: theme.colors.textSecondary }]}>Spent</Text></View>
              <View style={styles.projMetric}><Text style={[styles.projValue, { color: theme.colors.text }]}>{proj.progress}%</Text><Text style={[styles.projLabel, { color: theme.colors.textSecondary }]}>Progress</Text></View>
              <View style={styles.projMetric}><Text style={[styles.projValue, { color: theme.colors.text }]}>{proj.end}</Text><Text style={[styles.projLabel, { color: theme.colors.textSecondary }]}>End Date</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderStages = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Stage Gate Overview</Text>
        {stageGates.map((gate, index) => (
          <View key={index} style={styles.gateCard}>
            <View style={styles.gateHeader}>
              <Text style={[styles.gateStage, { color: theme.colors.text }]}>{gate.stage}</Text>
              <Text style={[styles.gateAvg, { color: theme.colors.textSecondary }]}>{gate.avgDays} days avg</Text>
            </View>
            <View style={styles.gateMetrics}>
              <View style={styles.gateMetric}><Text style={[styles.gateValue, { color: theme.colors.text }]}>{gate.projects}</Text><Text style={[styles.gateLabel, { color: theme.colors.textSecondary }]}>Total</Text></View>
              <View style={styles.gateMetric}><Text style={[styles.gateValue, { color: '#34C759' }]}>{gate.completed}</Text><Text style={[styles.gateLabel, { color: theme.colors.textSecondary }]}>Completed</Text></View>
              <View style={styles.gateMetric}><Text style={[styles.gateValue, { color: '#FF9500' }]}>{gate.pending}</Text><Text style={[styles.gateLabel, { color: theme.colors.textSecondary }]}>Pending</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderResources = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Allocation</Text>
        {resources.map((res, index) => (
          <View key={index} style={styles.resCard}>
            <View style={styles.resHeader}>
              <Text style={[styles.resRole, { color: theme.colors.text }]}>{res.role}</Text>
              <View style={[styles.utilBadge, { backgroundColor: res.utilization > 80 ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.utilText, { color: res.utilization > 80 ? '#FF9500' : '#34C759' }]}>{res.utilization}%</Text>
              </View>
            </View>
            <View style={styles.resBar}><View style={[styles.resFill, { width: `${res.utilization}%`, backgroundColor: res.utilization > 80 ? '#FF9500' : '#34C759' }]} /></View>
            <View style={styles.resMetrics}>
              <View style={styles.resMetric}><Text style={[styles.resValue, { color: theme.colors.text }]}>{res.allocated}</Text><Text style={[styles.resLabel, { color: theme.colors.textSecondary }]}>Allocated</Text></View>
              <View style={styles.resMetric}><Text style={[styles.resValue, { color: '#34C759' }]}>{res.available}</Text><Text style={[styles.resLabel, { color: theme.colors.textSecondary }]}>Available</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Track</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically track project progress</Text></View><Switch value={autoTrack} onValueChange={setAutoTrack} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><BarChart3 size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Analysis</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><GitBranch size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Development Pipeline Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Real Estate Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['pipeline','stages','resources','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'pipeline' && renderPipeline()}
      {activeTab === 'stages' && renderStages()}
      {activeTab === 'resources' && renderResources()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-real-estate-development')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><GitBranch size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Real Estate Development</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="development-pipeline-manager" agentName="AI Development Pipeline Manager" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},projCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},projHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},projInfo:{flex:1},projName:{fontSize:15,fontWeight:'600'},projStage:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},projBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:12},projFill:{height:'100%',borderRadius:4},projMetrics:{flexDirection:'row',justifyContent:'space-between'},projMetric:{alignItems:'center'},projValue:{fontSize:14,fontWeight:'600'},projLabel:{fontSize:10,color:'#666'},gateCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},gateHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},gateStage:{fontSize:15,fontWeight:'600'},gateAvg:{fontSize:12,color:'#666'},gateMetrics:{flexDirection:'row',justifyContent:'space-between'},gateMetric:{alignItems:'center'},gateValue:{fontSize:18,fontWeight:'600'},gateLabel:{fontSize:11,color:'#666'},resCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},resHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},resRole:{fontSize:15,fontWeight:'600'},utilBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},utilText:{fontSize:12,fontWeight:'600'},resBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:12},resFill:{height:'100%',borderRadius:4},resMetrics:{flexDirection:'row',justifyContent:'space-between'},resMetric:{alignItems:'center'},resValue:{fontSize:14,fontWeight:'600'},resLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
