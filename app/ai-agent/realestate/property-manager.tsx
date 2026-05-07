import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Users, Calendar, MessageSquare, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, AlertCircle, CreditCard, ClipboardCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function PropertyManagerPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('properties');
  const [autoCollect, setAutoCollect] = React.useState(true);

  const stats = [
    {label:'Properties',value:'150',icon: Building2,color:'#34C759'},
    {label:'Units',value:'8,250',icon: HomeIcon,color:'#007AFF'},
    {label:'Occupancy',value:'99.1%',icon: Percent,color:'#FF9500'},
    {label:'Collected',value:'$5.2M',icon: DollarSign,color:'#33691E'}
  ];

  const properties = [
    {name:'Riverside Apartments',units:245,occupied:243,occupancy:99.2,noi:'$1.2M',maintenance:12,delinquency:1.2},
    {name:'Oakwood Plaza',units:180,occupied:171,occupancy:95.0,noi:'$890K',maintenance:8,delinquency:3.5},
    {name:'Metro Center',units:320,occupied:318,occupancy:99.4,noi:'$1.8M',maintenance:15,delinquency:0.8},
    {name:'Sunset Retail',units:95,occupied:87,occupancy:91.6,noi:'$620K',maintenance:22,delinquency:5.2}
  ];

  const rentCollection = [
    {status:'Collected',amount:'$1.85M',count:812,percentage:98.2},
    {status:'Pending',amount:'$125K',count:45,percentage:2.8},
    {status:'Overdue',amount:'$42K',count:18,percentage:0.9}
  ];

  const maintenanceRequests = [
    {priority:'Emergency',count:8,avgTime:'1.2 hrs',properties:['Metro Center','Riverside Apts']},
    {priority:'High',count:24,avgTime:'4.5 hrs',properties:['Oakwood Plaza','Sunset Retail']},
    {priority:'Medium',count:67,avgTime:'1.2 days',properties:['Multiple']},
    {priority:'Low',count:156,avgTime:'2.8 days',properties:['Multiple']}
  ];

  const leaseExpirations = [
    {month:'Jan 2026',count:45,value:'$1.2M',renewalRate:92},
    {month:'Feb 2026',count:38,value:'$980K',renewalRate:88},
    {month:'Mar 2026',count:52,value:'$1.4M',renewalRate:85},
    {month:'Apr 2026',count:41,value:'$1.1M',renewalRate:90}
  ];

  const responsibilities = [
    'Property management & operations oversight',
    'Rent collection & financial management',
    'Maintenance dispatch & coordination',
    'Lease enforcement & compliance',
    'Tenant relations & service delivery',
    'Financial reporting & budget management',
    'Vendor coordination & contract management'
  ];

  const capabilities = [
    'Property Management', 'Rent Collection', 'Maintenance Dispatch', 'Lease Enforcement',
    'Tenant Relations', 'Financial Reporting', 'Vendor Management', 'Budget Management',
    'Occupancy Optimization', 'Delinquency Management', 'Inspection Management', 'Move-in/Move-out'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Managed 150 properties with 99% occupancy',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Collected $5M in rent with 2% delinquency',icon: DollarSign,color:'#007AFF'},
    {time:'9 min ago',text:'Dispatched 200 maintenance requests this week',icon: Wrench,color:'#FF9500'},
    {time:'15 min ago',text:'Processed 45 lease renewals',icon: ClipboardCheck,color:'#33691E'},
    {time:'22 min ago',text:'Completed 12 property inspections',icon: CheckCircle,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/property/manage',description:'Property management operations',method:'POST'},
    {endpoint:'/rent/collect',description:'Rent collection & tracking',method:'POST'},
    {endpoint:'/maintenance/dispatch',description:'Maintenance request dispatch',method:'POST'},
    {endpoint:'/lease/enforce',description:'Lease enforcement actions',method:'POST'},
    {endpoint:'/reports/financial',description:'Financial reporting',method:'GET'}
  ];

  const renderProperties = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property Portfolio</Text>
        {properties.map((property, index) => (
          <TouchableOpacity key={index} style={styles.propertyCard}>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyInfo}>
                <Text style={[styles.propertyName, { color: theme.colors.text }]}>{property.name}</Text>
                <Text style={[styles.propertyUnits, { color: theme.colors.textSecondary }]}>{property.units} units • {property.occupied} occupied</Text>
              </View>
              <View style={[styles.occupancyBadge, { backgroundColor: property.occupancy > 95 ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.occupancyText, { color: property.occupancy > 95 ? '#34C759' : '#FF9500' }]}>{property.occupancy}%</Text>
              </View>
            </View>
            <View style={styles.propertyMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.noi}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>NOI</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.maintenance}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Open WO</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: property.delinquency > 3 ? '#FF3B30' : '#34C759' }]}>{property.delinquency}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Delinquent</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lease Expirations</Text>
        {leaseExpirations.map((lease, index) => (
          <View key={index} style={styles.leaseRow}>
            <Text style={[styles.leaseMonth, { color: theme.colors.text }]}>{lease.month}</Text>
            <View style={styles.leaseMetrics}>
              <Text style={[styles.leaseCount, { color: theme.colors.textSecondary }]}>{lease.count} leases • {lease.value}</Text>
              <View style={[styles.renewalBadge, { backgroundColor: lease.renewalRate > 85 ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.renewalText, { color: lease.renewalRate > 85 ? '#34C759' : '#FF9500' }]}>{lease.renewalRate}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderRent = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Rent Collection</Text>
        {rentCollection.map((item, index) => (
          <View key={index} style={styles.rentCard}>
            <View style={[styles.rentStatusDot, { backgroundColor: item.status === 'Collected' ? '#34C759' : item.status === 'Pending' ? '#FF9500' : '#FF3B30' }]} />
            <View style={styles.rentInfo}>
              <Text style={[styles.rentStatus, { color: theme.colors.text }]}>{item.status}</Text>
              <Text style={[styles.rentDetails, { color: theme.colors.textSecondary }]}>{item.count} payments</Text>
            </View>
            <Text style={[styles.rentAmount, { color: item.status === 'Collected' ? '#34C759' : item.status === 'Pending' ? '#FF9500' : '#FF3B30' }]}>{item.amount}</Text>
          </View>
        ))}
        <TouchableOpacity style={[styles.fullButton, {backgroundColor:'#33691E'}]}><Text style={styles.fullButtonText}>Send Payment Reminders</Text></TouchableOpacity>
      </View>
    </>
  );

  const renderMaintenance = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Maintenance Requests</Text>
        {maintenanceRequests.map((req, index) => (
          <View key={index} style={styles.maintCard}>
            <View style={[styles.maintPriorityDot, { backgroundColor: req.priority === 'Emergency' ? '#FF3B30' : req.priority === 'High' ? '#FF9500' : req.priority === 'Medium' ? '#007AFF' : '#34C759' }]} />
            <View style={styles.maintInfo}>
              <Text style={[styles.maintPriority, { color: theme.colors.text }]}>{req.priority}</Text>
              <Text style={[styles.maintProperties, { color: theme.colors.textSecondary }]}>{req.properties.join(', ')}</Text>
            </View>
            <View style={styles.maintStats}>
              <Text style={[styles.maintCount, { color: theme.colors.text }]}>{req.count}</Text>
              <Text style={[styles.maintTime, { color: theme.colors.textSecondary }]}>{req.avgTime}</Text>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Rent Collection</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically process rent payments and reminders</Text></View><Switch value={autoCollect} onValueChange={setAutoCollect} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Settings size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Property Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Property Operations Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['properties','rent','maintenance','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'properties' && renderProperties()}
      {activeTab === 'rent' && renderRent()}
      {activeTab === 'maintenance' && renderMaintenance()}
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
        { id: 'rent-collector', label: 'AI Rent Collector' },
        { id: 'maintenance-dispatcher', label: 'AI Maintenance Dispatcher' },
        { id: 'lease-enforcer', label: 'AI Lease Enforcer' },
      ]} />

      <AgentFeatures agentId="property-manager" agentName="AI Property Manager" />
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
  propertyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  propertyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  propertyInfo:{flex:1},
  propertyName:{fontSize:15,fontWeight:'600'},
  propertyUnits:{fontSize:12,color:'#666'},
  occupancyBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  occupancyText:{fontSize:13,fontWeight:'700'},
  propertyMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:15,fontWeight:'bold'},
  metricLabel:{fontSize:11,marginTop:2},
  leaseRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  leaseMonth:{fontSize:14,fontWeight:'600'},
  leaseMetrics:{flexDirection:'row',alignItems:'center',gap:12},
  leaseCount:{fontSize:12,color:'#666'},
  renewalBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:8},
  renewalText:{fontSize:12,fontWeight:'600'},
  rentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#F8F9FA',marginBottom:8},
  rentStatusDot:{width:12,height:12,borderRadius:6},
  rentInfo:{flex:1,marginLeft:12},
  rentStatus:{fontSize:14,fontWeight:'600'},
  rentDetails:{fontSize:12,color:'#666'},
  rentAmount:{fontSize:16,fontWeight:'700'},
  fullButton:{paddingVertical:14,borderRadius:12,alignItems:'center',marginTop:8},
  fullButtonText:{color:'#fff',fontSize:15,fontWeight:'600'},
  maintCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#F8F9FA',marginBottom:8},
  maintPriorityDot:{width:12,height:12,borderRadius:6},
  maintInfo:{flex:1,marginLeft:12},
  maintPriority:{fontSize:14,fontWeight:'600'},
  maintProperties:{fontSize:12,color:'#666'},
  maintStats:{alignItems:'flex-end'},
  maintCount:{fontSize:16,fontWeight:'700'},
  maintTime:{fontSize:11,color:'#666'},
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
