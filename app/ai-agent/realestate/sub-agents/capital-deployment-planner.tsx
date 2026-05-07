import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Calculator, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, RefreshCw, Download, BarChart3, Percent, Clock3, Wallet, PiggyBank } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CapitalDeploymentPlannerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('pipeline');
  const [autoSchedule, setAutoSchedule] = React.useState(true);

  const stats = [
    {label:'Available',value:'$200M',icon: Wallet,color:'#34C759'},
    {label:'Deployed',value:'$450M',icon: DollarSign,color:'#007AFF'},
    {label:'ROI',value:'18.2%',icon: TrendingUp,color:'#FF9500'},
    {label:'Draws',value:'12',icon: Clock3,color:'#558B2F'}
  ];

  const pipeline = [
    {name:'Harbor View Tower',type:'Development',amount:'$85M',roi:22.5,risk:'Medium',timeline:'24 months',priority:'high',status:'approved'},
    {name:'Industrial Portfolio',type:'Acquisition',amount:'$120M',roi:15.8,risk:'Low',timeline:'6 months',priority:'high',status:'due-diligence'},
    {name:'Office Renovation',type:'Value-Add',amount:'$45M',roi:28.2,risk:'High',timeline:'18 months',priority:'medium',status:'pending'},
    {name:'Mixed-Use Development',type:'Development',amount:'$95M',roi:19.5,risk:'Medium',timeline:'36 months',priority:'medium',status:'pending'}
  ];

  const deployments = [
    {date:'2026-01-15',project:'Harbor View Tower',amount:'$25M',type:'Equity',status:'deployed'},
    {date:'2026-02-01',project:'Industrial Portfolio',amount:'$40M',type:'Acquisition',status:'deployed'},
    {date:'2026-03-15',project:'Harbor View Tower',amount:'$20M',type:'Construction',status:'scheduled'},
    {date:'2026-04-01',project:'Office Renovation',amount:'$15M',type:'Renovation',status:'scheduled'},
    {date:'2026-06-01',project:'Mixed-Use Development',amount:'$30M',type:'Equity',status:'planned'}
  ];

  const drawSchedule = [
    {project:'Harbor View Tower',draws:6,total:'$85M',nextDraw:'$15M',nextDate:'2026-02-15',remaining:'$40M'},
    {project:'Industrial Portfolio',draws:3,total:'$120M',nextDraw:'$40M',nextDate:'2026-02-01',remaining:'$80M'},
    {project:'Office Renovation',draws:5,total:'$45M',nextDraw:'$10M',nextDate:'2026-04-01',remaining:'$30M'},
    {project:'Mixed-Use Development',draws:8,total:'$95M',nextDraw:'$12M',nextDate:'2026-06-01',remaining:'$83M'}
  ];

  const capabilities = ['Capital Allocation','Investment Planning','Fund Deployment','ROI Projection','Risk Assessment','Draw Scheduling'];
  const responsibilities = ['Capital allocation & deployment planning','Investment planning & prioritization','Fund deployment & draw scheduling','ROI projection & modeling','Capital risk assessment & mitigation','Draw schedule management & tracking'];
  const activities = [{time:'3 min ago',text:'Planned $200M capital deployment for Q3',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Scheduled 5 investment draws totaling $50M',icon:Clock3,color:'#007AFF'},{time:'30 min ago',text:'Projected 18% ROI on new deployments',icon:TrendingUp,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/capital/pipeline',description:'Investment pipeline',method:'GET'},
    {endpoint:'/capital/deploy',description:'Fund deployment',method:'POST'},
    {endpoint:'/capital/draws',description:'Draw schedule',method:'GET'},
    {endpoint:'/capital/roi',description:'ROI projections',method:'GET'}
  ];

  const renderPipeline = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Investment Pipeline</Text>
        {pipeline.map((item, index) => (
          <View key={index} style={styles.pipeCard}>
            <View style={styles.pipeHeader}>
              <View style={styles.pipeInfo}>
                <Text style={[styles.pipeName, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.pipeType, { color: theme.colors.textSecondary }]}>{item.type}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: item.priority === 'high' ? '#FF3B3022' : '#007AFF22' }]}>
                <Text style={[styles.priorityText, { color: item.priority === 'high' ? '#FF3B30' : '#007AFF' }]}>{item.priority}</Text>
              </View>
            </View>
            <View style={styles.pipeMetrics}>
              <View style={styles.pipeMetric}><Text style={[styles.pipeValue, { color: theme.colors.text }]}>{item.amount}</Text><Text style={[styles.pipeLabel, { color: theme.colors.textSecondary }]}>Amount</Text></View>
              <View style={styles.pipeMetric}><Text style={[styles.pipeValue, { color: '#34C759' }]}>{item.roi}%</Text><Text style={[styles.pipeLabel, { color: theme.colors.textSecondary }]}>ROI</Text></View>
              <View style={styles.pipeMetric}><Text style={[styles.pipeValue, { color: item.risk === 'Low' ? '#34C759' : item.risk === 'Medium' ? '#FF9500' : '#FF3B30' }]}>{item.risk}</Text><Text style={[styles.pipeLabel, { color: theme.colors.textSecondary }]}>Risk</Text></View>
              <View style={styles.pipeMetric}><Text style={[styles.pipeValue, { color: theme.colors.text }]}>{item.timeline}</Text><Text style={[styles.pipeLabel, { color: theme.colors.textSecondary }]}>Timeline</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderDeployments = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deployment History</Text>
        {deployments.map((dep, index) => (
          <View key={index} style={styles.depCard}>
            <View style={styles.depHeader}>
              <View style={styles.depInfo}>
                <Text style={[styles.depProject, { color: theme.colors.text }]}>{dep.project}</Text>
                <Text style={[styles.depDate, { color: theme.colors.textSecondary }]}>{dep.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: dep.status === 'deployed' ? '#34C75922' : dep.status === 'scheduled' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: dep.status === 'deployed' ? '#34C759' : dep.status === 'scheduled' ? '#007AFF' : '#FF9500' }]}>{dep.status}</Text>
              </View>
            </View>
            <View style={styles.depMetrics}>
              <View style={styles.depMetric}><Text style={[styles.depValue, { color: theme.colors.text }]}>{dep.amount}</Text><Text style={[styles.depLabel, { color: theme.colors.textSecondary }]}>Amount</Text></View>
              <View style={styles.depMetric}><Text style={[styles.depValue, { color: '#558B2F' }]}>{dep.type}</Text><Text style={[styles.depLabel, { color: theme.colors.textSecondary }]}>Type</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSchedule = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Draw Schedule</Text>
        {drawSchedule.map((draw, index) => (
          <View key={index} style={styles.drawCard}>
            <View style={styles.drawHeader}>
              <Text style={[styles.drawProject, { color: theme.colors.text }]}>{draw.project}</Text>
              <Text style={[styles.drawTotal, { color: theme.colors.textSecondary }]}>{draw.total}</Text>
            </View>
            <View style={styles.drawMetrics}>
              <View style={styles.drawMetric}><Text style={[styles.drawValue, { color: theme.colors.text }]}>{draw.draws}</Text><Text style={[styles.drawLabel, { color: theme.colors.textSecondary }]}>Draws</Text></View>
              <View style={styles.drawMetric}><Text style={[styles.drawValue, { color: '#007AFF' }]}>{draw.nextDraw}</Text><Text style={[styles.drawLabel, { color: theme.colors.textSecondary }]}>Next</Text></View>
              <View style={styles.drawMetric}><Text style={[styles.drawValue, { color: theme.colors.text }]}>{draw.nextDate}</Text><Text style={[styles.drawLabel, { color: theme.colors.textSecondary }]}>Due</Text></View>
              <View style={styles.drawMetric}><Text style={[styles.drawValue, { color: '#34C759' }]}>{draw.remaining}</Text><Text style={[styles.drawLabel, { color: theme.colors.textSecondary }]}>Remaining</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Schedule</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically schedule capital draws</Text></View><Switch value={autoSchedule} onValueChange={setAutoSchedule} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calculator size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Analysis</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><Calculator size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Capital Deployment Planner</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Chief Real Estate Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['pipeline','deployments','schedule','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'pipeline' && renderPipeline()}
      {activeTab === 'deployments' && renderDeployments()}
      {activeTab === 'schedule' && renderSchedule()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/creo')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Calculator size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Real Estate Officer</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="capital-deployment-planner" agentName="AI Capital Deployment Planner" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},pipeCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},pipeHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},pipeInfo:{flex:1},pipeName:{fontSize:15,fontWeight:'600'},pipeType:{fontSize:12,color:'#666',marginTop:2},priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},priorityText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},pipeMetrics:{flexDirection:'row',justifyContent:'space-between'},pipeMetric:{alignItems:'center'},pipeValue:{fontSize:14,fontWeight:'600'},pipeLabel:{fontSize:10,color:'#666'},depCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},depHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},depInfo:{flex:1},depProject:{fontSize:15,fontWeight:'600'},depDate:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},depMetrics:{flexDirection:'row',justifyContent:'space-between'},depMetric:{alignItems:'center'},depValue:{fontSize:14,fontWeight:'600'},depLabel:{fontSize:11,color:'#666'},drawCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},drawHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},drawProject:{fontSize:15,fontWeight:'600'},drawTotal:{fontSize:13,color:'#666'},drawMetrics:{flexDirection:'row',justifyContent:'space-between'},drawMetric:{alignItems:'center'},drawValue:{fontSize:14,fontWeight:'600'},drawLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
