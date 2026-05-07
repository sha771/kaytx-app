import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Users, Calendar, MessageSquare, Settings, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, Play, Pause, RefreshCw, Download, Upload, Filter, Plus, X, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, Eye, Send, Bell, Search as SearchIcon, MoreVertical, Gauge, Percent, HomeIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function VPPropertyManagementPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('portfolio');
  const [autoNOI, setAutoNOI] = React.useState(true);
  const [retentionAlerts, setRetentionAlerts] = React.useState(true);

  const stats = [
    {label:'Properties',value:'200',icon: Building2,color:'#34C759'},
    {label:'Units',value:'12,450',icon: HomeIcon,color:'#007AFF'},
    {label:'Occupancy',value:'96.2%',icon: Percent,color:'#FF9500'},
    {label:'NOI',value:'$42.3M',icon: DollarSign,color:'#33691E'}
  ];

  const propertyPerformance = [
    {name:'Riverside Apartments',units:245,occupancy:97.2,noi:'$1.2M',status:'excellent',issues:0},
    {name:'Oakwood Plaza',units:180,occupancy:94.5,noi:'$890K',status:'good',issues:2},
    {name:'Metro Center',units:320,occupancy:98.1,noi:'$1.8M',status:'excellent',issues:0},
    {name:'Sunset Retail',units:95,occupancy:91.2,noi:'$620K',status:'fair',issues:5},
    {name:'Parkview Heights',units:156,occupancy:96.8,noi:'$980K',status:'excellent',issues:1}
  ];

  const noiOptimizations = [
    {property:'Riverside Apartments',currentNOI:'$1.2M',potentialNOI:'$1.35M',uplift:'12%',actions:['Rent escalation','Late fee optimization','Utility reimbursement']},
    {property:'Oakwood Plaza',currentNOI:'$890K',potentialNOI:'$970K',uplift:'9%',actions:['Occupancy improvement','Expense reduction','Parking revenue']},
    {property:'Metro Center',currentNOI:'$1.8M',potentialNOI:'$1.92M',uplift:'7%',actions:['CAM reconciliation','Tenant mix optimization']}
  ];

  const tenantRetention = [
    {tenant:'TechCorp Inc',sqft:25000,expiry:'2026-03-15',renewalProb:92,value:'$625K',actions:['Early renewal discussion','Build-out allowance','Parking expansion']},
    {tenant:'Metro Health',sqft:18000,expiry:'2026-06-30',renewalProb:85,value:'$450K',actions:['Space expansion offer','Sublease assistance']},
    {tenant:'RetailMax',sqft:12000,expiry:'2026-09-01',renewalProb:78,value:'$360K',actions:['Lease restructure','Co-tenancy adjustment']}
  ];

  const operationalMetrics = [
    {label:'Work Orders',value:'847',resolved:'812',pending:35,avgTime:'2.4 days'},
    {label:'Maintenance',value:'$245K',budget:'$280K',variance:'-12.5%'},
    {label:'Collections',value:'98.2%',target:'97%',status:'on-track'},
    {label:'Inspections',value:'156',passed:'148',failed:8}
  ];

  const responsibilities = [
    'Property management strategy & organizational direction',
    'Portfolio oversight & performance optimization',
    'Operational excellence programs & process improvement',
    'Property management talent development & coaching',
    'Client & owner relationship management',
    'Financial performance & budgeting oversight',
    'Vendor management & contract negotiation'
  ];

  const capabilities = [
    'PM Strategy', 'Portfolio Oversight', 'Operational Excellence', 'Talent Management',
    'Client Relations', 'Financial Performance', 'Vendor Management', 'Lease Administration',
    'NOI Optimization', 'Tenant Retention', 'Work Order Management', 'Budget Management'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Set Q3 property management goals',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Reviewed portfolio of 200 properties',icon: Building2,color:'#007AFF'},
    {time:'9 min ago',text:'Approved operational improvement plan',icon: Zap,color:'#FF9500'},
    {time:'15 min ago',text:'Approved $45K maintenance budget increase',icon: DollarSign,color:'#33691E'},
    {time:'22 min ago',text:'Signed tenant renewal with TechCorp',icon: Handshake,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/coordinate/property-managers',description:'Property manager coordination',method:'POST'},
    {endpoint:'/portfolio/performance',description:'Portfolio performance metrics',method:'GET'},
    {endpoint:'/noi/optimize',description:'NOI optimization recommendations',method:'POST'},
    {endpoint:'/tenant/retention',description:'Tenant retention analysis',method:'GET'},
    {endpoint:'/operations/work-orders',description:'Work order management',method:'GET'}
  ];

  const renderPortfolio = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Property Portfolio</Text>
        {propertyPerformance.map((property, index) => (
          <TouchableOpacity key={index} style={styles.propertyCard}>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyInfo}>
                <Text style={[styles.propertyName, { color: theme.colors.text }]}>{property.name}</Text>
                <Text style={[styles.propertyUnits, { color: theme.colors.textSecondary }]}>{property.units} units</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: property.status === 'excellent' ? '#34C75922' : property.status === 'good' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: property.status === 'excellent' ? '#34C759' : property.status === 'good' ? '#007AFF' : '#FF9500' }]}>{property.status}</Text>
              </View>
            </View>
            <View style={styles.propertyMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.occupancy}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Occupancy</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.noi}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>NOI</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: property.issues > 3 ? '#FF3B30' : '#34C759' }]}>{property.issues}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Issues</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operational Metrics</Text>
        <View style={styles.opsGrid}>
          {operationalMetrics.map((metric, index) => (
            <View key={index} style={styles.opsCard}>
              <Text style={[styles.opsLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
              <Text style={[styles.opsValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <Text style={[styles.opsDetail, { color: theme.colors.textSecondary }]}>{Object.values(metric).slice(2).join(' | ')}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  const renderNOI = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>NOI Optimization Opportunities</Text>
        {noiOptimizations.map((opt, index) => (
          <View key={index} style={styles.noiCard}>
            <View style={styles.noiHeader}>
              <Text style={[styles.noiProperty, { color: theme.colors.text }]}>{opt.property}</Text>
              <View style={[styles.upliftBadge, { backgroundColor: '#34C75922' }]}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={[styles.upliftText, { color: '#34C759' }]}>{opt.uplift}</Text>
              </View>
            </View>
            <View style={styles.noiRow}><Text style={[styles.noiLabel, { color: theme.colors.textSecondary }]}>Current NOI</Text><Text style={[styles.noiValue, { color: theme.colors.text }]}>{opt.currentNOI}</Text></View>
            <View style={styles.noiRow}><Text style={[styles.noiLabel, { color: theme.colors.textSecondary }]}>Potential NOI</Text><Text style={[styles.noiValue, { color: '#34C759' }]}>{opt.potentialNOI}</Text></View>
            <View style={styles.actionsList}>
              {opt.actions.map((action, i) => (
                <View key={i} style={styles.actionItem}><CheckCircle size={14} color="#33691E" /><Text style={[styles.actionText, { color: theme.colors.textSecondary }]}>{action}</Text></View>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity style={[styles.fullButton, {backgroundColor:'#33691E'}]}><Text style={styles.fullButtonText}>Apply All Optimizations</Text></TouchableOpacity>
      </View>
    </>
  );

  const renderTenants = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tenant Retention</Text>
        {tenantRetention.map((tenant, index) => (
          <View key={index} style={styles.tenantCard}>
            <View style={styles.tenantHeader}>
              <View style={styles.tenantInfo}>
                <Text style={[styles.tenantName, { color: theme.colors.text }]}>{tenant.tenant}</Text>
                <Text style={[styles.tenantDetails, { color: theme.colors.textSecondary }]}>{tenant.sqft.toLocaleString()} sqft • Expires {tenant.expiry}</Text>
              </View>
              <View style={[styles.probBadge, { backgroundColor: tenant.renewalProb > 85 ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.probText, { color: tenant.renewalProb > 85 ? '#34C759' : '#FF9500' }]}>{tenant.renewalProb}%</Text>
              </View>
            </View>
            <View style={styles.tenantValue}><Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>Annual Value</Text><Text style={[styles.valueAmount, { color: '#33691E' }]}>{tenant.value}</Text></View>
            <View style={styles.tenantActions}>
              {tenant.actions.map((action, i) => (
                <TouchableOpacity key={i} style={[styles.tenantAction, {backgroundColor:'#33691E12'}]}><Text style={[styles.tenantActionText, {color:'#33691E'}]}>{action}</Text></TouchableOpacity>
              ))}
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto NOI Optimization</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically identify and apply NOI optimization strategies</Text></View><Switch value={autoNOI} onValueChange={setAutoNOI} trackColor={{true:'#33691E'}} /></View>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Tenant Retention Alerts</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Alert when tenant renewal probability drops below threshold</Text></View><Switch value={retentionAlerts} onValueChange={setRetentionAlerts} trackColor={{true:'#33691E'}} /></View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calendar size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Schedule</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Settings size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Building size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Property Management</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Property Management Division Leadership</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><Gauge size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['portfolio','noi','tenants','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'portfolio' && renderPortfolio()}
      {activeTab === 'noi' && renderNOI()}
      {activeTab === 'tenants' && renderTenants()}
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
        { id: 'property-performance-monitor', label: 'AI Property Performance Monitor' },
        { id: 'noi-optimizer', label: 'AI NOI Optimizer' },
        { id: 'tenant-retention-strategist', label: 'AI Tenant Retention Strategist' },
      ]} />

      <AgentFeatures agentId="vp-property-management" agentName="AI VP Property Management" />
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
  propertyUnits:{fontSize:13,color:'#666'},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:12,fontWeight:'600'},
  propertyMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:16,fontWeight:'bold'},
  metricLabel:{fontSize:11,marginTop:2},
  opsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  opsCard:{flex:1,minWidth:'45%',backgroundColor:'#F8F9FA',padding:14,borderRadius:12},
  opsLabel:{fontSize:12,color:'#666'},
  opsValue:{fontSize:20,fontWeight:'bold',marginVertical:4},
  opsDetail:{fontSize:11},
  noiCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  noiHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  noiProperty:{fontSize:15,fontWeight:'600'},
  upliftBadge:{flexDirection:'row',alignItems:'center',paddingHorizontal:8,paddingVertical:4,borderRadius:12,gap:4},
  upliftText:{fontSize:12,fontWeight:'600'},
  noiRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:8},
  noiLabel:{fontSize:13},
  noiValue:{fontSize:14,fontWeight:'600'},
  actionsList:{marginTop:12,borderTopWidth:1,borderTopColor:'#E5E5EA',paddingTop:12},
  actionItem:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:6},
  actionText:{fontSize:13},
  fullButton:{paddingVertical:14,borderRadius:12,alignItems:'center',marginTop:8},
  fullButtonText:{color:'#fff',fontSize:15,fontWeight:'600'},
  tenantCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  tenantHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  tenantInfo:{flex:1},
  tenantName:{fontSize:15,fontWeight:'600'},
  tenantDetails:{fontSize:12,color:'#666',marginTop:2},
  probBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  probText:{fontSize:13,fontWeight:'700'},
  tenantValue:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  valueLabel:{fontSize:13},
  valueAmount:{fontSize:16,fontWeight:'700'},
  tenantActions:{flexDirection:'row',flexWrap:'wrap',gap:8},
  tenantAction:{paddingHorizontal:12,paddingVertical:6,borderRadius:8},
  tenantActionText:{fontSize:12,fontWeight:'600'},
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
