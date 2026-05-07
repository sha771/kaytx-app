import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, Gauge, Thermometer, ZapIcon, Lightbulb, Droplets, Wind, Flame, GaugeIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function FacilitiesManagerPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('systems');
  const [autoMaintenance, setAutoMaintenance] = React.useState(true);

  const stats = [
    {label:'Buildings',value:'50',icon: Building2,color:'#34C759'},
    {label:'Systems',value:'847',icon: GaugeIcon,color:'#007AFF'},
    {label:'Uptime',value:'99.7%',icon: TrendingUp,color:'#FF9500'},
    {label:'Savings',value:'$1.2M',icon: DollarSign,color:'#33691E'}
  ];

  const buildingSystems = [
    {building:'Riverside Apartments',hvac:'operational',electrical:'operational',plumbing:'operational',security:'operational',alerts:0,lastInspection:'2026-01-15'},
    {building:'Oakwood Plaza',hvac:'warning',electrical:'operational',plumbing:'operational',security:'operational',alerts:2,lastInspection:'2026-01-10'},
    {building:'Metro Center',hvac:'operational',electrical:'operational',plumbing:'warning',security:'operational',alerts:1,lastInspection:'2026-01-18'},
    {building:'Sunset Retail',hvac:'critical',electrical:'operational',plumbing:'operational',security:'warning',alerts:4,lastInspection:'2026-01-05'}
  ];

  const maintenanceSchedule = [
    {system:'HVAC - RTU-001',building:'Riverside',type:'Preventive',dueDate:'2026-02-01',status:'scheduled',priority:'high',estCost:'$2,500'},
    {system:'Elevator - ELV-003',building:'Metro Center',type:'Inspection',dueDate:'2026-02-05',status:'scheduled',priority:'critical',estCost:'$1,200'},
    {system:'Boiler - BLR-002',building:'Oakwood',type:'Preventive',dueDate:'2026-02-10',status:'pending',priority:'medium',estCost:'$3,800'},
    {system:'Fire Suppression',building:'Sunset Retail',type:'Inspection',dueDate:'2026-02-15',status:'scheduled',priority:'high',estCost:'$850'}
  ];

  const energyMetrics = [
    {building:'Riverside Apartments',electricity:'245,000 kWh',water:'12,500 gal',gas:'18,200 therms',cost:'$42,500',eui:0.92,trend:'down'},
    {building:'Oakwood Plaza',electricity:'180,000 kWh',water:'8,200 gal',gas:'12,400 therms',cost:'$31,200',eui:1.05,trend:'stable'},
    {building:'Metro Center',electricity:'320,000 kWh',water:'15,800 gal',gas:'22,100 therms',cost:'$56,800',eui:0.88,trend:'down'},
    {building:'Sunset Retail',electricity:'95,000 kWh',water:'4,200 gal',gas:'6,800 therms',cost:'$18,400',eui:1.12,trend:'up'}
  ];

  const spaceUtilization = [
    {building:'Riverside Apartments',total:245000,occupied:228000,available:17000,utilization:93,optimization:'Consider 2,500 SF sublease'},
    {building:'Oakwood Plaza',total:180000,occupied:162000,available:18000,utilization:90,optimization:'Available'},
    {building:'Metro Center',total:320000,completed:305000,available:15000,utilization:95,optimization:'At capacity'},
    {building:'Sunset Retail',total:95000,completed:78000,available:17000,utilization:82,optimization:'Rebrand for better fit'}
  ];

  const responsibilities = [
    'Facilities operations management & oversight',
    'Building systems management & monitoring',
    'Preventive maintenance program management',
    'Energy management & sustainability',
    'Space planning & optimization',
    'Safety compliance & regulatory adherence',
    'Vendor management & contract negotiation'
  ];

  const capabilities = [
    'Facilities Operations', 'Building Management', 'Preventive Maintenance', 'Energy Management',
    'Space Planning', 'Safety Compliance', 'Vendor Management', 'System Monitoring',
    'Budget Management', 'Regulatory Compliance', 'Sustainability', 'Asset Management'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Managed 50 building facilities operations',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Implemented preventive maintenance for 200 systems',icon: Wrench,color:'#007AFF'},
    {time:'9 min ago',text:'Reduced energy costs by 18% across portfolio',icon: ZapIcon,color:'#FF9500'},
    {time:'15 min ago',text:'Completed fire safety inspection for Metro Center',icon: CheckCircle,color:'#33691E'},
    {time:'22 min ago',text:'Approved $45K HVAC replacement budget',icon: DollarSign,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/facilities/systems',description:'Building systems monitoring',method:'GET'},
    {endpoint:'/facilities/maintenance',description:'Maintenance scheduling',method:'POST'},
    {endpoint:'/facilities/energy',description:'Energy metrics & optimization',method:'GET'},
    {endpoint:'/facilities/space',description:'Space utilization analysis',method:'GET'},
    {endpoint:'/facilities/compliance',description:'Safety compliance tracking',method:'GET'}
  ];

  const renderSystems = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Building Systems Status</Text>
        {buildingSystems.map((building, index) => (
          <TouchableOpacity key={index} style={styles.systemCard}>
            <View style={styles.systemHeader}>
              <Text style={[styles.systemName, { color: theme.colors.text }]}>{building.hvac}</Text>
              <View style={[styles.alertBadge, { backgroundColor: building.alerts > 2 ? '#FF3B3022' : building.alerts > 0 ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.alertText, { color: building.alerts > 2 ? '#FF3B30' : building.alerts > 0 ? '#FF9500' : '#34C759' }]}>{building.alerts} alerts</Text>
              </View>
            </View>
            <Text style={[styles.systemBuilding, { color: theme.colors.textSecondary }]}>{building.building}</Text>
            <View style={styles.systemMetrics}>
              <View style={styles.sysMetric}><Thermometer size={14} color={building.hvac === 'operational' ? '#34C759' : building.hvac === 'warning' ? '#FF9500' : '#FF3B30'} /><Text style={[styles.sysLabel, { color: theme.colors.textSecondary }]}>HVAC</Text></View>
              <View style={styles.sysMetric}><ZapIcon size={14} color={building.electrical === 'operational' ? '#34C759' : '#FF9500'} /><Text style={[styles.sysLabel, { color: theme.colors.textSecondary }]}>Electrical</Text></View>
              <View style={styles.sysMetric}><Droplets size={14} color={building.plumbing === 'operational' ? '#34C759' : '#FF9500'} /><Text style={[styles.sysLabel, { color: theme.colors.textSecondary }]}>Plumbing</Text></View>
              <View style={styles.sysMetric}><Shield size={14} color={building.security === 'operational' ? '#34C759' : '#FF9500'} /><Text style={[styles.sysLabel, { color: theme.colors.textSecondary }]}>Security</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Maintenance Schedule</Text>
        {maintenanceSchedule.map((item, index) => (
          <View key={index} style={styles.maintCard}>
            <View style={styles.maintInfo}>
              <Text style={[styles.maintSystem, { color: theme.colors.text }]}>{item.system}</Text>
              <Text style={[styles.maintBuilding, { color: theme.colors.textSecondary }]}>{item.building} • {item.type}</Text>
            </View>
            <View style={styles.maintDetails}>
              <Text style={[styles.maintDate, { color: theme.colors.text }]}>{item.dueDate}</Text>
              <View style={[styles.priorityBadge, { backgroundColor: item.priority === 'critical' ? '#FF3B3022' : item.priority === 'high' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: item.priority === 'critical' ? '#FF3B30' : item.priority === 'high' ? '#FF9500' : '#34C759' }]}>{item.priority}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderEnergy = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Energy Consumption</Text>
        {energyMetrics.map((building, index) => (
          <View key={index} style={styles.energyCard}>
            <View style={styles.energyHeader}>
              <Text style={[styles.energyName, { color: theme.colors.text }]}>{building.building}</Text>
              <View style={[styles.trendBadge, { backgroundColor: building.trend === 'down' ? '#34C75922' : building.trend === 'up' ? '#FF3B3022' : '#FF950022' }]}>
                <TrendingUp size={12} color={building.trend === 'down' ? '#34C759' : building.trend === 'up' ? '#FF3B30' : '#FF9500'} />
                <Text style={[styles.trendText, { color: building.trend === 'down' ? '#34C759' : building.trend === 'up' ? '#FF3B30' : '#FF9500' }]}>{building.trend}</Text>
              </View>
            </View>
            <View style={styles.energyMetrics}>
              <View style={styles.energyMetric}><ZapIcon size={14} color="#FF9500" /><Text style={[styles.energyValue, { color: theme.colors.text }]}>{building.electricity}</Text></View>
              <View style={styles.energyMetric}><Droplets size={14} color='#007AFF' /><Text style={[styles.energyValue, { color: theme.colors.text }]}>{building.water}</Text></View>
              <View style={styles.energyMetric}><Flame size={14} color='#FF3B30' /><Text style={[styles.energyValue, { color: theme.colors.text }]}>{building.gas}</Text></View>
            </View>
            <View style={styles.energyFooter}>
              <Text style={[styles.energyCost, { color: '#33691E' }]}>{building.cost}</Text>
              <Text style={[styles.energyEUI, { color: theme.colors.textSecondary }]}>EUI: {building.eui}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSpace = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Space Utilization</Text>
        {spaceUtilization.map((building, index) => (
          <View key={index} style={styles.spaceCard}>
            <View style={styles.spaceHeader}>
              <Text style={[styles.spaceName, { color: theme.colors.text }]}>{building.building}</Text>
              <View style={[styles.utilBadge, { backgroundColor: building.utilization > 90 ? '#34C75922' : building.utilization > 80 ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.utilText, { color: building.utilization > 90 ? '#34C759' : building.utilization > 80 ? '#FF9500' : '#FF3B30' }]}>{building.utilization}%</Text>
              </View>
            </View>
            <View style={styles.utilBar}><View style={[styles.utilFill, { width: `${building.utilization}%`, backgroundColor: building.utilization > 90 ? '#34C759' : building.utilization > 80 ? '#FF9500' : '#FF3B30' }]} /></View>
            <View style={styles.spaceDetails}>
              <Text style={[styles.spaceUsed, { color: theme.colors.textSecondary }]}>{building.completed.toLocaleString()} SF used</Text>
              <Text style={[styles.spaceAvail, { color: '#34C759' }]}>{building.available.toLocaleString()} SF available</Text>
            </View>
            <Text style={[styles.spaceOptimize, { color: theme.colors.textSecondary }]}>{building.optimization}</Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Maintenance Scheduling</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically schedule preventive maintenance</Text></View><Switch value={autoMaintenance} onValueChange={setAutoMaintenance} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Shield size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Facilities Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Facilities Operations Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['systems','energy','space','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'systems' && renderSystems()}
      {activeTab === 'energy' && renderEnergy()}
      {activeTab === 'space' && renderSpace()}
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
        { id: 'building-systems-monitor', label: 'AI Building Systems Monitor' },
        { id: 'energy-manager', label: 'AI Energy Manager' },
        { id: 'space-optimizer', label: 'AI Space Optimizer' },
      ]} />

      <AgentFeatures agentId="facilities-manager" agentName="AI Facilities Manager" />
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
  systemCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  systemHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:4},
  systemName:{fontSize:15,fontWeight:'600'},
  alertBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  alertText:{fontSize:11,fontWeight:'600'},
  systemBuilding:{fontSize:12,color:'#666',marginBottom:12},
  systemMetrics:{flexDirection:'row',justifyContent:'space-between'},
  sysMetric:{alignItems:'center',gap:4},
  sysLabel:{fontSize:11},
  maintCard:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#F8F9FA',marginBottom:8},
  maintInfo:{flex:1},
  maintSystem:{fontSize:14,fontWeight:'600'},
  maintBuilding:{fontSize:12,color:'#666'},
  maintDetails:{alignItems:'flex-end'},
  maintDate:{fontSize:13,fontWeight:'600'},
  priorityBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:8,marginTop:4},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  energyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  energyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  energyName:{fontSize:15,fontWeight:'600'},
  trendBadge:{flexDirection:'row',alignItems:'center',paddingHorizontal:8,paddingVertical:4,borderRadius:8,gap:4},
  trendText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  energyMetrics:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  energyMetric:{flexDirection:'row',alignItems:'center',gap:6},
  energyValue:{fontSize:13},
  energyFooter:{flexDirection:'row',justifyContent:'space-between',borderTopWidth:1,borderTopColor:'#E5E5EA',paddingTop:12},
  energyCost:{fontSize:15,fontWeight:'700'},
  energyEUI:{fontSize:12},
  spaceCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  spaceHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  spaceName:{fontSize:15,fontWeight:'600'},
  utilBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  utilText:{fontSize:13,fontWeight:'700'},
  utilBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:12},
  utilFill:{height:'100%',borderRadius:4},
  spaceDetails:{flexDirection:'row',justifyContent:'space-between',marginBottom:8},
  spaceUsed:{fontSize:12},
  spaceAvail:{fontSize:12,fontWeight:'600'},
  spaceOptimize:{fontSize:12,fontStyle:'italic'},
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
