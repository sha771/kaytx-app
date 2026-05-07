import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Radio, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, Wrench, AlertTriangle, Clock3, CheckCircle, Settings as SettingsIcon, RefreshCw, Download, MapPin, User } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function MaintenanceDispatcherPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('orders');
  const [autoDispatch, setAutoDispatch] = React.useState(true);

  const stats = [
    {label:'Dispatched',value:'120',icon: Wrench,color:'#34C759'},
    {label:'SLA',value:'95%',icon: CheckCircle,color:'#007AFF'},
    {label:'Emergencies',value:'3',icon: AlertTriangle,color:'#FF3B30'},
    {label:'Avg Time',value:'45m',icon: Clock3,color:'#FF9500'}
  ];

  const workOrders = [
    {id:'WO-1245',issue:'HVAC Repair',property:'Tech Campus',priority:'high',status:'in-progress',technician:'Mike Johnson',eta:'2:00 PM',created:'10:30 AM'},
    {id:'WO-1244',issue:'Leaking Faucet',property:'Harbor View',priority:'medium',status:'scheduled',technician:'Sarah Lee',eta:'3:30 PM',created:'9:15 AM'},
    {id:'WO-1243',issue:'Electrical Issue',property:'Metro Center',priority:'emergency',status:'in-progress',technician:'Tom Brown',eta:'11:30 AM',created:'10:00 AM'},
    {id:'WO-1242',issue:'Door Lock Repair',property:'Oakwood Plaza',priority:'low',status:'completed',technician:'Jane Doe',eta:'Completed',created:'8:00 AM'},
    {id:'WO-1241',issue:'Paint Touch-up',property:'Industrial Hub',priority:'low',status:'pending',technician:'Unassigned',eta:'TBD',created:'7:30 AM'}
  ];

  const technicians = [
    {name:'Mike Johnson',specialty:'HVAC',jobsToday:8,completed:5,avgTime:45,status:'available'},
    {name:'Sarah Lee',specialty:'Plumbing',jobsToday:6,completed:3,avgTime:38,status:'on-job'},
    {name:'Tom Brown',specialty:'Electrical',jobsToday:7,completed:4,avgTime:52,status:'on-job'},
    {name:'Jane Doe',specialty:'General',jobsToday:5,completed:5,avgTime:35,status:'available'}
  ];

  const slaMetrics = [
    {priority:'Emergency',target:'2 hours',actual:'1.5 hours',compliance:98},
    {priority:'High',target:'4 hours',actual:'3.5 hours',compliance:95},
    {priority:'Medium',target:'24 hours',actual:'18 hours',compliance:92},
    {priority:'Low',target:'72 hours',actual:'48 hours',compliance:88}
  ];

  const capabilities = ['Work Dispatch','Technician Assignment','Emergency Response','SLA Management','Priority Routing','Status Tracking'];
  const responsibilities = ['Maintenance work order dispatch','Technician assignment & scheduling','Emergency maintenance response coordination','SLA management & compliance tracking','Priority-based work order routing','Real-time status tracking & updates'];
  const activities = [{time:'3 min ago',text:'Dispatched 120 work orders today',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Achieved 95% SLA compliance rate',icon:CheckCircle,color:'#007AFF'},{time:'30 min ago',text:'Resolved 3 emergency calls within 30 minutes',icon:AlertTriangle,color:'#FF3B30'}];

  const a2aEndpoints = [
    {endpoint:'/dispatch/orders',description:'Work orders',method:'GET'},
    {endpoint:'/dispatch/technicians',description:'Technician data',method:'GET'},
    {endpoint:'/dispatch/sla',description:'SLA metrics',method:'GET'},
    {endpoint:'/dispatch/assign',description:'Assign technician',method:'POST'}
  ];

  const renderOrders = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Work Orders</Text>
        {workOrders.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={[styles.orderId, { color: theme.colors.text }]}>{order.id}</Text>
                <Text style={[styles.orderIssue, { color: theme.colors.textSecondary }]}>{order.issue}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: order.priority === 'emergency' ? '#FF3B3022' : order.priority === 'high' ? '#FF950022' : order.priority === 'medium' ? '#007AFF22' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: order.priority === 'emergency' ? '#FF3B30' : order.priority === 'high' ? '#FF9500' : order.priority === 'medium' ? '#007AFF' : '#34C759' }]}>{order.priority}</Text>
              </View>
            </View>
            <View style={styles.orderMetrics}>
              <View style={styles.orderMetric}><Text style={[styles.orderValue, { color: theme.colors.text }]}>{order.property}</Text><Text style={[styles.orderLabel, { color: theme.colors.textSecondary }]}>Property</Text></View>
              <View style={styles.orderMetric}><Text style={[styles.orderValue, { color: theme.colors.text }]}>{order.technician}</Text><Text style={[styles.orderLabel, { color: theme.colors.textSecondary }]}>Technician</Text></View>
              <View style={styles.orderMetric}><Text style={[styles.orderValue, { color: theme.colors.text }]}>{order.eta}</Text><Text style={[styles.orderLabel, { color: theme.colors.textSecondary }]}>ETA</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderTechnicians = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Technician Status</Text>
        {technicians.map((tech, index) => (
          <View key={index} style={styles.techCard}>
            <View style={styles.techHeader}>
              <View style={styles.techInfo}>
                <Text style={[styles.techName, { color: theme.colors.text }]}>{tech.name}</Text>
                <Text style={[styles.techSpecialty, { color: theme.colors.textSecondary }]}>{tech.specialty}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: tech.status === 'available' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: tech.status === 'available' ? '#34C759' : '#FF9500' }]}>{tech.status}</Text>
              </View>
            </View>
            <View style={styles.techMetrics}>
              <View style={styles.techMetric}><Text style={[styles.techValue, { color: theme.colors.text }]}>{tech.jobsToday}</Text><Text style={[styles.techLabel, { color: theme.colors.textSecondary }]}>Jobs Today</Text></View>
              <View style={styles.techMetric}><Text style={[styles.techValue, { color: '#34C759' }]}>{tech.completed}</Text><Text style={[styles.techLabel, { color: theme.colors.textSecondary }]}>Completed</Text></View>
              <View style={styles.techMetric}><Text style={[styles.techValue, { color: theme.colors.text }]}>{tech.avgTime}m</Text><Text style={[styles.techLabel, { color: theme.colors.textSecondary }]}>Avg Time</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSLA = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SLA Performance</Text>
        {slaMetrics.map((sla, index) => (
          <View key={index} style={styles.slaCard}>
            <View style={styles.slaHeader}>
              <Text style={[styles.slaPriority, { color: theme.colors.text }]}>{sla.priority}</Text>
              <View style={[styles.complianceBadge, { backgroundColor: sla.compliance > 95 ? '#34C75922' : sla.compliance > 90 ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.complianceText, { color: sla.compliance > 95 ? '#34C759' : sla.compliance > 90 ? '#FF9500' : '#FF3B30' }]}>{sla.compliance}%</Text>
              </View>
            </View>
            <View style={styles.slaMetrics}>
              <View style={styles.slaMetric}><Text style={[styles.slaValue, { color: theme.colors.text }]}>{sla.target}</Text><Text style={[styles.slaLabel, { color: theme.colors.textSecondary }]}>Target</Text></View>
              <View style={styles.slaMetric}><Text style={[styles.slaValue, { color: '#34C759' }]}>{sla.actual}</Text><Text style={[styles.slaLabel, { color: theme.colors.textSecondary }]}>Actual</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Dispatch</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically dispatch work orders</Text></View><Switch value={autoDispatch} onValueChange={setAutoDispatch} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Wrench size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>New Order</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><Radio size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Maintenance Dispatcher</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Property Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['orders','technicians','sla','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'technicians' && renderTechnicians()}
      {activeTab === 'sla' && renderSLA()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/property-manager')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Radio size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Property Manager</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="maintenance-dispatcher" agentName="AI Maintenance Dispatcher" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},orderCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},orderHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},orderInfo:{flex:1},orderId:{fontSize:15,fontWeight:'600'},orderIssue:{fontSize:12,color:'#666',marginTop:2},priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},priorityText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},orderMetrics:{flexDirection:'row',justifyContent:'space-between'},orderMetric:{alignItems:'center'},orderValue:{fontSize:14,fontWeight:'600'},orderLabel:{fontSize:10,color:'#666'},techCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},techHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},techInfo:{flex:1},techName:{fontSize:15,fontWeight:'600'},techSpecialty:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},techMetrics:{flexDirection:'row',justifyContent:'space-between'},techMetric:{alignItems:'center'},techValue:{fontSize:18,fontWeight:'600'},techLabel:{fontSize:11,color:'#666'},slaCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},slaHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},slaPriority:{fontSize:15,fontWeight:'600'},complianceBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},complianceText:{fontSize:12,fontWeight:'600'},slaMetrics:{flexDirection:'row',justifyContent:'space-between'},slaMetric:{alignItems:'center'},slaValue:{fontSize:14,fontWeight:'600'},slaLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
