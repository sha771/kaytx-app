import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Wrench, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, TruckIcon, ClipboardCheck, Hammer, ClockIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function MaintenanceCoordinatorPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('orders');
  const [autoDispatch, setAutoDispatch] = React.useState(true);

  const stats = [
    {label:'Open Orders',value:'42',icon: ClipboardCheck,color:'#FF9500'},
    {label:'Completed',value:'487',icon: CircleCheckBig,color:'#34C759'},
    {label:'SLA Compliance',value:'97%',icon: CheckCircle,color:'#33691E'},
    {label:'Avg Cost',value:'$285',icon: DollarSign,color:'#007AFF'}
  ];

  const workOrders = [
    {id:'WO-2026-001',unit:'Riverside 204',issue:'HVAC repair',priority:'critical',status:'in-progress',assignedTo:'ABC HVAC',created:'2026-02-08',due:'2026-02-09',estCost:'$450'},
    {id:'WO-2026-002',unit:'Metro 508',issue:'Plumbing leak',priority:'high',status:'scheduled',assignedTo:'Quick Fix Plumbing',created:'2026-02-07',due:'2026-02-10',estCost:'$320'},
    {id:'WO-2026-003',unit:'Oakwood 112',issue:'Electrical outlet',priority:'medium',status:'pending',assignedTo:'Unassigned',created:'2026-02-06',due:'2026-02-12',estCost:'$150'},
    {id:'WO-2026-004',unit:'Sunset 301',issue:'Appliance repair',priority:'low',status:'completed',assignedTo:'Appliance Pro',created:'2026-02-05',due:'2026-02-08',estCost:'$275'}
  ];

  const vendors = [
    {name:'ABC HVAC Services',specialty:'HVAC',rating:4.8,jobsCompleted:156,avgResponse:'2h',contractStatus:'active',hourlyRate:'$125'},
    {name:'Quick Fix Plumbing',specialty:'Plumbing',rating:4.6,jobsCompleted:203,avgResponse:'3h',contractStatus:'active',hourlyRate:'$95'},
    {name:'Electric Pro Inc',specialty:'Electrical',rating:4.9,jobsCompleted:89,avgResponse:'4h',contractStatus:'active',hourlyRate:'$110'},
    {name:'Appliance Pro',specialty:'Appliances',rating:4.5,jobsCompleted:178,avgResponse:'2h',contractStatus:'pending',hourlyRate:'$85'}
  ];

  const budgetOverview = [
    {category:'HVAC',budget:'$120,000',spent:'$85,400',remaining:'$34,600',variance:'-8%'},
    {category:'Plumbing',budget:'$80,000',spent:'$52,300',remaining:'$27,700',variance:'-5%'},
    {category:'Electrical',budget:'$60,000',spent:'$38,900',remaining:'$21,100',variance:'-2%'},
    {category:'General',budget:'$40,000',spent:'$28,500',remaining:'$11,500',variance:'+3%'}
  ];

  const responsibilities = [
    'Maintenance coordination & scheduling',
    'Work order management & prioritization',
    'Vendor management & dispatch',
    'Cost estimation & budget tracking',
    'Preventive maintenance program management',
    'SLA management & compliance tracking',
    'Emergency response coordination'
  ];

  const capabilities = [
    'Maintenance Coordination', 'Work Order Management', 'Vendor Management', 'Cost Estimation',
    'Preventive Programs', 'SLA Management', 'Emergency Response', 'Budget Tracking',
    'Vendor Dispatch', 'Contract Management', 'Performance Analysis', 'Scheduling'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Coordinated 500 work orders this month',icon: ClipboardCheck,color:'#34C759'},
    {time:'6 min ago',text:'Maintained 97% SLA compliance rate',icon: CheckCircle,color:'#007AFF'},
    {time:'9 min ago',text:'Reduced maintenance costs by 12% YoY',icon: TrendingUp,color:'#FF9500'},
    {time:'15 min ago',text:'Dispatched 12 emergency requests',icon: AlertTriangle,color:'#33691E'},
    {time:'22 min ago',text:'Completed vendor performance review',icon: Calculator,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/maintenance/orders',description:'Work order management',method:'GET'},
    {endpoint:'/maintenance/dispatch',description:'Vendor dispatch',method:'POST'},
    {endpoint:'/maintenance/vendors',description:'Vendor management',method:'GET'},
    {endpoint:'/maintenance/estimate',description:'Cost estimation',method:'POST'},
    {endpoint:'/maintenance/budget',description:'Budget tracking',method:'GET'}
  ];

  const renderOrders = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Work Orders</Text>
        {workOrders.map((order, index) => (
          <TouchableOpacity key={index} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderInfo}>
                <Text style={[styles.orderId, { color: theme.colors.text }]}>{order.id}</Text>
                <Text style={[styles.orderUnit, { color: theme.colors.textSecondary }]}>{order.unit} • {order.issue}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: order.priority === 'critical' ? '#FF3B3022' : order.priority === 'high' ? '#FF950022' : order.priority === 'medium' ? '#007AFF22' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: order.priority === 'critical' ? '#FF3B30' : order.priority === 'high' ? '#FF9500' : order.priority === 'medium' ? '#007AFF' : '#34C759' }]}>{order.priority}</Text>
              </View>
            </View>
            <View style={styles.orderMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{order.assignedTo}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Assigned</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{order.due}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Due</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#34C759' }]}>{order.estCost}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Est Cost</Text></View>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: order.status === 'completed' ? '#34C75922' : order.status === 'in-progress' ? '#007AFF22' : order.status === 'scheduled' ? '#FF950022' : '#E5E5EA' }]}>
              <Text style={[styles.statusText, { color: order.status === 'completed' ? '#34C759' : order.status === 'in-progress' ? '#007AFF' : order.status === 'scheduled' ? '#FF9500' : '#666' }]}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderVendors = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Vendor Performance</Text>
        {vendors.map((vendor, index) => (
          <View key={index} style={styles.vendorCard}>
            <View style={styles.vendorHeader}>
              <View style={styles.vendorInfo}>
                <Text style={[styles.vendorName, { color: theme.colors.text }]}>{vendor.specialty}</Text>
                <Text style={[styles.vendorSpec, { color: theme.colors.textSecondary }]}>{vendor.name}</Text>
              </View>
              <View style={[styles.ratingBadge, { backgroundColor: '#FFD70022' }]}>
                <Text style={[styles.ratingText, { color: '#FFD700' }]}>{vendor.rating}</Text>
              </View>
            </View>
            <View style={styles.vendorMetrics}>
              <View style={styles.vendorMetric}><Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>Jobs</Text><Text style={[styles.vendorValue, { color: theme.colors.text }]}>{vendor.jobsCompleted}</Text></View>
              <View style={styles.vendorMetric}><Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>Response</Text><Text style={[styles.vendorValue, { color: theme.colors.text }]}>{vendor.avgResponse}</Text></View>
              <View style={styles.vendorMetric}><Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>Rate</Text><Text style={[styles.vendorValue, { color: '#33691E' }]}>{vendor.hourlyRate}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderBudget = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Budget Overview</Text>
        {budgetOverview.map((item, index) => (
          <View key={index} style={styles.budgetCard}>
            <View style={styles.budgetHeader}>
              <Text style={[styles.budgetCategory, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.budgetVariance, { color: item.variance.startsWith('-') ? '#FF3B30' : '#34C759' }]}>{item.variance}</Text>
            </View>
            <View style={styles.budgetBar}><View style={[styles.budgetFill, { width: `${(parseFloat(item.spent.replace(/[^0-9.]/g,'')) / parseFloat(item.budget.replace(/[^0-9.]/g,'')) * 100)}%`, backgroundColor: parseFloat(item.variance.replace(/[^0-9.-]/g,'')) < 0 ? '#FF3B30' : '#34C759' }]} /></View>
            <View style={styles.budgetMetrics}>
              <Text style={[styles.budgetSpent, { color: theme.colors.textSecondary }]}>Spent: {item.spent}</Text>
              <Text style={[styles.budgetRemaining, { color: '#34C759' }]}>Remaining: {item.remaining}</Text>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Dispatch</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically dispatch vendors based on specialty</Text></View><Switch value={autoDispatch} onValueChange={setAutoDispatch} trackColor={{true:'#33691E'}} /></View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calendar size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Schedule</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Wrench size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Maintenance Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Maintenance Operations Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Coordinator</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['orders','vendors','budget','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'vendors' && renderVendors()}
      {activeTab === 'budget' && renderBudget()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#33691E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#33691E18' }]}><Text style={[styles.tagText, { color: '#33691E' }]}>{cap}</Text></View>))}</View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {a2aEndpoints.map((ep, i) => (
          <View key={i} style={styles.endpointRow}>
            <View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View>
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {recentActivity.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}
      </View>

      <SubAgentLinks subAgents={[
        { id: 'work-order-prioritizer', label: 'AI Work Order Prioritizer' },
        { id: 'vendor-dispatcher', label: 'AI Vendor Dispatcher' },
        { id: 'cost-estimator', label: 'AI Cost Estimator' },
      ]} />

      <AgentFeatures agentId="maintenance-coordinator" agentName="AI Maintenance Coordinator" />
      <View style={{height:40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},
  tab:{flex:1,alignItems:'center',paddingVertical:10},
  tabText:{fontSize:13,fontWeight:'600'},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},
  tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},
  tagText:{fontSize:12,fontWeight:'600'},
  responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},
  responsibilityText:{fontSize:14,flex:1,lineHeight:20},
  orderCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  orderHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  orderInfo:{flex:1},
  orderId:{fontSize:15,fontWeight:'600'},
  orderUnit:{fontSize:12,color:'#666',marginTop:2},
  priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  orderMetrics:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:13,fontWeight:'600'},
  metricLabel:{fontSize:10,marginTop:2},
  statusBadge:{alignSelf:'flex-start',paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  vendorCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  vendorHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  vendorInfo:{flex:1},
  vendorName:{fontSize:15,fontWeight:'600'},
  vendorSpec:{fontSize:12,color:'#666',marginTop:2},
  ratingBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  ratingText:{fontSize:14,fontWeight:'700'},
  vendorMetrics:{flexDirection:'row',justifyContent:'space-between'},
  vendorMetric:{alignItems:'center'},
  vendorLabel:{fontSize:11,color:'#666'},
  vendorValue:{fontSize:14,fontWeight:'600'},
  budgetCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  budgetHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  budgetCategory:{fontSize:15,fontWeight:'600'},
  budgetVariance:{fontSize:14,fontWeight:'700'},
  budgetBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:12},
  budgetFill:{height:'100%',borderRadius:4},
  budgetMetrics:{flexDirection:'row',justifyContent:'space-between'},
  budgetSpent:{fontSize:12},
  budgetRemaining:{fontSize:12,fontWeight:'600'},
  settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  settingLabel:{fontSize:14,fontWeight:'600'},
  settingDesc:{fontSize:12,marginTop:2},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#33691E12'},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#33691E'},
  endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},
  methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},
  methodText:{fontSize:11,fontWeight:'700'},
  endpointText:{fontSize:13,fontFamily:'monospace',flex:1},
  activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},
  activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},
  activityContent:{flex:1},
  activityText:{fontSize:14,fontWeight:'500'},
  activityTime:{fontSize:12,marginTop:2}
});
