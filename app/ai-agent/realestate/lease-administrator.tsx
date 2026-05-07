import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileTextIcon, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, AlertCircle, CalendarDays, FileSignature, ClockIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function LeaseAdministratorPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('portfolio');
  const [autoAlerts, setAutoAlerts] = React.useState(true);

  const stats = [
    {label:'Total Leases',value:'1,247',icon: FileSignature,color:'#34C759'},
    {label:'Expiring 90d',value:'48',icon: AlertTriangle,color:'#FF9500'},
    {label:'Monthly Rent',value:'$4.2M',icon: DollarSign,color:'#007AFF'},
    {label:'Compliance',value:'99.8%',icon: CheckCircle,color:'#33691E'}
  ];

  const leasePortfolio = [
    {tenant:'TechCorp Inc',property:'Metro Center',sqft:25000,monthlyRent:'$62,500',leaseStart:'2023-03-01',leaseEnd:'2026-03-01',remaining:2,escalation:'3%',status:'active'},
    {tenant:'Metro Health',property:'Riverside',sqft:18000,monthlyRent:'$45,000',leaseStart:'2022-06-15',leaseEnd:'2027-06-14',remaining:25,escalation:'2.5%',status:'active'},
    {tenant:'RetailMax',property:'Sunset Retail',sqft:12000,monthlyRent:'$30,000',leaseStart:'2024-01-01',leaseEnd:'2026-12-31',remaining:19,escalation:'3%',status:'active'},
    {tenant:'Office Solutions',property:'Oakwood Plaza',sqft:8500,monthlyRent:'$21,250',leaseStart:'2025-03-01',leaseEnd:'2026-02-28',remaining:1,escalation:'0%',status:'expiring'}
  ];

  const criticalDates = [
    {date:'2026-02-15',tenant:'Office Solutions',event:'Renewal Notice',daysUntil:0,priority:'critical',property:'Oakwood Plaza'},
    {date:'2026-02-28',tenant:'TechCorp Inc',event:'Lease Expiration',daysUntil:13,priority:'critical',property:'Metro Center'},
    {date:'2026-03-01',tenant:'TechCorp Inc',event:'Rent Escalation',daysUntil:14,priority:'high',property:'Metro Center'},
    {date:'2026-03-15',tenant:'StartUp Labs',event:'Option Notice',daysUntil:28,priority:'medium',property:'Riverside'},
    {date:'2026-04-01',tenant:'Food Court LLC',event:'CAM Reconciliation',daysUntil:45,priority:'low',property:'Sunset Retail'}
  ];

  const rentEscalations = [
    {tenant:'TechCorp Inc',property:'Metro Center',currentRent:'$62,500',newRent:'$64,375',increase:'$1,875',effectiveDate:'2026-03-01',escalationRate:'3%'},
    {tenant:'RetailMax',property:'Sunset Retail',currentRent:'$30,000',newRent:'$30,900',increase:'$900',effectiveDate:'2026-01-01',escalationRate:'3%'},
    {tenant:'Metro Health',property:'Riverside',currentRent:'$45,000',newRent:'$46,125',increase:'$1,125',effectiveDate:'2026-06-15',escalationRate:'2.5%'}
  ];

  const responsibilities = [
    'Lease administration & management',
    'Lease abstraction & key term analysis',
    'Critical date tracking & notification',
    'Rent escalation calculation & management',
    'Lease compliance management',
    'Lease database management & maintenance',
    'Tenant communication & correspondence'
  ];

  const capabilities = [
    'Lease Administration', 'Abstraction & Analysis', 'Critical Date Tracking', 'Rent Escalation',
    'Compliance Management', 'Database Management', 'Document Management', 'Notification Systems',
    'Financial Tracking', 'Renewal Management', 'Option Tracking', 'CAM Reconciliation'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Administered 1,200 leases across portfolio',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Tracked 500 critical dates with zero misses',icon: CalendarDays,color:'#007AFF'},
    {time:'9 min ago',text:'Calculated rent escalations for 300 leases',icon: Calculator,color:'#FF9500'},
    {time:'15 min ago',text:'Generated compliance report for audit',icon: FileCheck,color:'#33691E'},
    {time:'22 min ago',text:'Sent renewal notices to 12 tenants',icon: AlertCircle,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/lease/portfolio',description:'Lease portfolio overview',method:'GET'},
    {endpoint:'/lease/abstract',description:'Lease abstraction',method:'POST'},
    {endpoint:'/lease/dates',description:'Critical date tracking',method:'GET'},
    {endpoint:'/lease/escalate',description:'Rent escalation calculation',method:'POST'},
    {endpoint:'/lease/compliance',description:'Compliance status',method:'GET'}
  ];

  const renderPortfolio = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lease Portfolio</Text>
        {leasePortfolio.map((lease, index) => (
          <TouchableOpacity key={index} style={styles.leaseCard}>
            <View style={styles.leaseHeader}>
              <View style={styles.leaseInfo}>
                <Text style={[styles.leaseTenant, { color: theme.colors.text }]}>{lease.tenant}</Text>
                <Text style={[styles.leaseProperty, { color: theme.colors.textSecondary }]}>{lease.property} • {lease.sqft.toLocaleString()} SF</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: lease.status === 'expiring' ? '#FF3B3022' : '#34C75922' }]}>
                <Text style={[styles.statusText, { color: lease.status === 'expiring' ? '#FF3B30' : '#34C759' }]}>{lease.status}</Text>
              </View>
            </View>
            <View style={styles.leaseMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{lease.monthlyRent}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Monthly</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{lease.leaseEnd}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Expires</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: lease.remaining <= 2 ? '#FF3B30' : '#34C759' }]}>{lease.remaining} mo</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Remaining</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#007AFF' }]}>{lease.escalation}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Escalation</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderDates = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Critical Dates</Text>
        {criticalDates.map((item, index) => (
          <View key={index} style={styles.dateCard}>
            <View style={styles.dateInfo}>
              <Text style={[styles.dateDate, { color: theme.colors.text }]}>{item.date}</Text>
              <Text style={[styles.dateTenant, { color: theme.colors.textSecondary }]}>{item.tenant} • {item.property}</Text>
              <Text style={[styles.dateEvent, { color: theme.colors.textSecondary }]}>{item.event}</Text>
            </View>
            <View style={styles.dateRight}>
              <View style={[styles.priorityBadge, { backgroundColor: item.priority === 'critical' ? '#FF3B3022' : item.priority === 'high' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: item.priority === 'critical' ? '#FF3B30' : item.priority === 'high' ? '#FF9500' : '#34C759' }]}>{item.priority}</Text>
              </View>
              <Text style={[styles.daysText, { color: item.daysUntil <= 7 ? '#FF3B30' : theme.colors.textSecondary }]}>{item.daysUntil} days</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderEscalations = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Rent Escalations</Text>
        {rentEscalations.map((item, index) => (
          <View key={index} style={styles.escalationCard}>
            <View style={styles.escalationHeader}>
              <Text style={[styles.escalationTenant, { color: theme.colors.text }]}>{item.tenant}</Text>
              <Text style={[styles.escalationDate, { color: theme.colors.textSecondary }]}>{item.effectiveDate}</Text>
            </View>
            <Text style={[styles.escalationProperty, { color: theme.colors.textSecondary }]}>{item.property}</Text>
            <View style={styles.escalationMetrics}>
              <View style={styles.escalationMetric}><Text style={[styles.escalationLabel, { color: theme.colors.textSecondary }]}>Current</Text><Text style={[styles.escalationValue, { color: theme.colors.text }]}>{item.currentRent}</Text></View>
              <View style={styles.escalationMetric}><Text style={[styles.escalationLabel, { color: theme.colors.textSecondary }]}>New</Text><Text style={[styles.escalationValue, { color: '#34C759' }]}>{item.newRent}</Text></View>
              <View style={styles.escalationMetric}><Text style={[styles.escalationLabel, { color: theme.colors.textSecondary }]}>Increase</Text><Text style={[styles.escalationValue, { color: '#007AFF' }]}>{item.increase}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Date Alerts</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically send alerts for critical dates</Text></View><Switch value={autoAlerts} onValueChange={setAutoAlerts} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><FileText size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Lease Administrator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Lease Administration & Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Administrator</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['portfolio','dates','escalations','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'portfolio' && renderPortfolio()}
      {activeTab === 'dates' && renderDates()}
      {activeTab === 'escalations' && renderEscalations()}
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
        { id: 'lease-abstractor', label: 'AI Lease Abstractor' },
        { id: 'critical-date-tracker', label: 'AI Critical Date Tracker' },
        { id: 'rent-escalation-calculator', label: 'AI Rent Escalation Calculator' },
      ]} />

      <AgentFeatures agentId="lease-administrator" agentName="AI Lease Administrator" />
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
  leaseCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  leaseHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  leaseInfo:{flex:1},
  leaseTenant:{fontSize:15,fontWeight:'600'},
  leaseProperty:{fontSize:12,color:'#666',marginTop:2},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  leaseMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:14,fontWeight:'bold'},
  metricLabel:{fontSize:10,marginTop:2},
  dateCard:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#F8F9FA',marginBottom:8},
  dateInfo:{flex:1},
  dateDate:{fontSize:14,fontWeight:'600'},
  dateTenant:{fontSize:12,color:'#666'},
  dateEvent:{fontSize:12,color:'#666'},
  dateRight:{alignItems:'flex-end'},
  priorityBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:8},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  daysText:{fontSize:12,marginTop:4},
  escalationCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  escalationHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:4},
  escalationTenant:{fontSize:15,fontWeight:'600'},
  escalationDate:{fontSize:12,color:'#666'},
  escalationProperty:{fontSize:12,color:'#666',marginBottom:12},
  escalationMetrics:{flexDirection:'row',justifyContent:'space-between'},
  escalationMetric:{alignItems:'center'},
  escalationLabel:{fontSize:11,color:'#666'},
  escalationValue:{fontSize:14,fontWeight:'600'},
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
