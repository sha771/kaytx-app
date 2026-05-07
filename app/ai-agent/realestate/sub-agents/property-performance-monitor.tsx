import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, TrendingDown, Building2, DollarSign, Settings as SettingsIcon, RefreshCw, Download, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function PropertyPerformanceMonitorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('properties');
  const [autoAlert, setAutoAlert] = React.useState(true);

  const stats = [
    {label:'Properties',value:'200',icon: Building2,color:'#34C759'},
    {label:'Avg NOI',value:'$2.4M',icon: DollarSign,color:'#007AFF'},
    {label:'Variance',value:'-2.1%',icon: TrendingDown,color:'#FF3B30'},
    {label:'Alerts',value:'8',icon: AlertTriangle,color:'#FF9500'}
  ];

  const propertyPerformance = [
    {name:'Harbor View Tower',type:'Multifamily',noi:'$3.2M',target:'$3.5M',variance:-8.6,occupancy:94,status:'below'},
    {name:'Tech Campus',type:'Office',noi:'$4.1M',target:'$4.0M',variance:2.5,occupancy:98,status:'above'},
    {name:'Industrial Hub',type:'Industrial',noi:'$2.8M',target:'$2.6M',variance:7.7,occupancy:99,status:'above'},
    {name:'Oakwood Plaza',type:'Retail',noi:'$1.5M',target:'$1.8M',variance:-16.7,occupancy:82,status:'critical'},
    {name:'Metro Center',type:'Office',noi:'$2.2M',target:'$2.1M',variance:4.8,occupancy:91,status:'above'}
  ];

  const kpiMetrics = [
    {kpi:'Occupancy Rate',current:94.2,target:95,unit:'%',status:'warning',trend:'stable'},
    {kpi:'NOI Margin',current:68.5,target:70,unit:'%',status:'warning',trend:'down'},
    {kpi:'DSCR',current:1.45,target:1.5,unit:'x',status:'warning',trend:'stable'},
    {kpi:'Cap Rate',current:5.8,target:5.5,unit:'%',status:'good',trend:'up'},
    {kpi:'Collection Rate',current:98.2,target:99,unit:'%',status:'warning',trend:'stable'},
    {kpi:'Expense Ratio',current:31.5,target:30,unit:'%',status:'warning',trend:'up'}
  ];

  const alerts = [
    {id:1,property:'Oakwood Plaza',issue:'NOI 16.7% below target',severity:'critical',date:'2026-02-10',action:'Review required'},
    {id:2,property:'Harbor View Tower',issue:'Occupancy dropped 4%',severity:'high',date:'2026-02-09',action:'Investigate'},
    {id:3,property:'Retail Center',issue:'Expense ratio above threshold',severity:'medium',date:'2026-02-08',action:'Analyze'},
    {id:4,property:'Tech Campus',issue:'Lease expiring in 90 days',severity:'low',date:'2026-02-07',action:'Monitor'}
  ];

  const capabilities = ['Performance Tracking','KPI Monitoring','Variance Analysis','Benchmarking','Dashboard Reporting','Alert Management'];
  const responsibilities = ['Property performance tracking & monitoring','KPI monitoring & threshold alerting','Variance analysis & root cause identification','Performance benchmarking across portfolio','Dashboard reporting & visualization','Automated alert management & escalation'];
  const activities = [{time:'3 min ago',text:'Monitored 200 properties performance metrics',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Identified 8 properties below NOI targets',icon:AlertTriangle,color:'#FF9500'},{time:'30 min ago',text:'Generated monthly performance dashboard',icon:BarChart3,color:'#007AFF'}];

  const a2aEndpoints = [
    {endpoint:'/performance/properties',description:'Property performance',method:'GET'},
    {endpoint:'/performance/kpi',description:'KPI metrics',method:'GET'},
    {endpoint:'/performance/alerts',description:'Alert management',method:'GET'},
    {endpoint:'/performance/benchmark',description:'Benchmark data',method:'GET'}
  ];

  const renderProperties = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property Performance</Text>
        {propertyPerformance.map((prop, index) => (
          <View key={index} style={styles.propCard}>
            <View style={styles.propHeader}>
              <View style={styles.propInfo}>
                <Text style={[styles.propName, { color: theme.colors.text }]}>{prop.name}</Text>
                <Text style={[styles.propType, { color: theme.colors.textSecondary }]}>{prop.type}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: prop.status === 'above' ? '#34C75922' : prop.status === 'below' ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.statusText, { color: prop.status === 'above' ? '#34C759' : prop.status === 'below' ? '#FF9500' : '#FF3B30' }]}>{prop.status}</Text>
              </View>
            </View>
            <View style={styles.propMetrics}>
              <View style={styles.propMetric}><Text style={[styles.propValue, { color: theme.colors.text }]}>{prop.noi}</Text><Text style={[styles.propLabel, { color: theme.colors.textSecondary }]}>NOI</Text></View>
              <View style={styles.propMetric}><Text style={[styles.propValue, { color: theme.colors.text }]}>{prop.target}</Text><Text style={[styles.propLabel, { color: theme.colors.textSecondary }]}>Target</Text></View>
              <View style={styles.propMetric}><Text style={[styles.propValue, { color: prop.variance > 0 ? '#34C759' : '#FF3B30' }]}>{prop.variance > 0 ? '+' : ''}{prop.variance}%</Text><Text style={[styles.propLabel, { color: theme.colors.textSecondary }]}>Variance</Text></View>
              <View style={styles.propMetric}><Text style={[styles.propValue, { color: theme.colors.text }]}>{prop.occupancy}%</Text><Text style={[styles.propLabel, { color: theme.colors.textSecondary }]}>Occupancy</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderKPI = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>KPI Metrics</Text>
        {kpiMetrics.map((kpi, index) => (
          <View key={index} style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={[styles.kpiName, { color: theme.colors.text }]}>{kpi.kpi}</Text>
              <View style={[styles.kpiStatus, { backgroundColor: kpi.status === 'good' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.kpiStatusText, { color: kpi.status === 'good' ? '#34C759' : '#FF9500' }]}>{kpi.status}</Text>
              </View>
            </View>
            <View style={styles.kpiBar}><View style={[styles.kpiFill, { width: `${Math.min((kpi.current/kpi.target)*100,100)}%`, backgroundColor: kpi.status === 'good' ? '#34C759' : '#FF9500' }]} /></View>
            <View style={styles.kpiMetrics}>
              <Text style={[styles.kpiCurrent, { color: theme.colors.text }]}>{kpi.current}{kpi.unit}</Text>
              <Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>Target: {kpi.target}{kpi.unit}</Text>
              {kpi.trend === 'up' ? <TrendingUp size={16} color="#34C759" /> : kpi.trend === 'down' ? <TrendingDown size={16} color="#FF3B30" /> : <Activity size={16} color="#007AFF" />}
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderAlerts = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Alerts</Text>
        {alerts.map((alert, index) => (
          <View key={index} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <View style={[styles.severityBadge, { backgroundColor: alert.severity === 'critical' ? '#FF3B3022' : alert.severity === 'high' ? '#FF950022' : alert.severity === 'medium' ? '#007AFF22' : '#34C75922' }]}>
                <Text style={[styles.severityText, { color: alert.severity === 'critical' ? '#FF3B30' : alert.severity === 'high' ? '#FF9500' : alert.severity === 'medium' ? '#007AFF' : '#34C759' }]}>{alert.severity}</Text>
              </View>
              <Text style={[styles.alertDate, { color: theme.colors.textSecondary }]}>{alert.date}</Text>
            </View>
            <Text style={[styles.alertProperty, { color: theme.colors.text }]}>{alert.property}</Text>
            <Text style={[styles.alertIssue, { color: theme.colors.textSecondary }]}>{alert.issue}</Text>
            <Text style={[styles.alertAction, { color: '#558B2F' }]}>Action: {alert.action}</Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Alert</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically alert on threshold breaches</Text></View><Switch value={autoAlert} onValueChange={setAutoAlert} trackColor={{true:'#558B2F'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><Activity size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Property Performance Monitor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Property Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['properties','kpi','alerts','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'properties' && renderProperties()}
      {activeTab === 'kpi' && renderKPI()}
      {activeTab === 'alerts' && renderAlerts()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-property-management')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Activity size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Property Management</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="property-performance-monitor" agentName="AI Property Performance Monitor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},propCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},propHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},propInfo:{flex:1},propName:{fontSize:15,fontWeight:'600'},propType:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},propMetrics:{flexDirection:'row',justifyContent:'space-between'},propMetric:{alignItems:'center'},propValue:{fontSize:14,fontWeight:'600'},propLabel:{fontSize:10,color:'#666'},kpiCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},kpiHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},kpiName:{fontSize:15,fontWeight:'600'},kpiStatus:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},kpiStatusText:{fontSize:12,fontWeight:'600'},kpiBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},kpiFill:{height:'100%',borderRadius:4},kpiMetrics:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},kpiCurrent:{fontSize:14,fontWeight:'600'},kpiTarget:{fontSize:12,color:'#666'},alertCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},alertHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},severityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},severityText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},alertDate:{fontSize:12,color:'#666'},alertProperty:{fontSize:15,fontWeight:'600',marginBottom:4},alertIssue:{fontSize:13,color:'#666',marginBottom:4},alertAction:{fontSize:12,fontWeight:'600'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
