import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, UserCheck, UserPlus, FileSignature, ClockIcon, DollarSignIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function LeasingManagerPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('vacancies');
  const [autoFollowUp, setAutoFollowUp] = React.useState(true);

  const stats = [
    {label:'Vacancy Rate',value:'3.2%',icon: Percent,color:'#34C759'},
    {label:'Leases Signed',value:'48',icon: FileSignature,color:'#007AFF'},
    {label:'Avg Rent',value:'$2,450',icon: DollarSign,color:'#FF9500'},
    {label:'Conversion',value:'72%',icon: TrendingUp,color:'#33691E'}
  ];

  const vacancyAnalysis = [
    {property:'Riverside Apartments',total:245,vacant:8,vacancyRate:3.3,avgDays:18,rentLoss:'$19,600',priority:'high'},
    {property:'Oakwood Plaza',total:180,vacant:12,vacancyRate:6.7,avgDays:32,rentLoss:'$28,800',priority:'critical'},
    {property:'Metro Center',total:320,vacant:5,vacancyRate:1.6,avgDays:12,rentLoss:'$12,500',priority:'low'},
    {property:'Sunset Retail',total:95,vacant:18,vacancyRate:18.9,avgDays:45,rentLoss:'$54,000',priority:'critical'}
  ];

  const leaseNegotiations = [
    {tenant:'TechCorp Inc',sqft:25000,currentRent:'$62,500',proposedRent:'$68,750',increase:'10%',status:'negotiating',leverage:'strong'},
    {tenant:'Metro Health',sqft:18000,currentRent:'$45,000',proposedRent:'$47,250',increase:'5%',status:'pending',leverage:'moderate'},
    {tenant:'RetailMax',sqft:12000,currentRent:'$30,000',proposedRent:'$33,000',increase:'10%',status:'accepted',leverage:'strong'}
  ];

  const tenantPipeline = [
    {name:'John Smith',source:'Website',property:'Riverside',sqft:1200,rent:'$2,800',status:'qualified',score:92,moveIn:'2026-02-01'},
    {name:'Sarah Johnson',source:'Referral',property:'Metro Center',sqft:950,rent:'$2,200',status:'viewing',score:85,moveIn:'2026-02-15'},
    {name:'Mike Davis',source:'Zillow',property:'Oakwood',sqft:1500,rent:'$3,200',status:'application',score:78,moveIn:'2026-03-01'},
    {name:'Emily Chen',source:'Facebook',property:'Riverside',sqft:800,rent:'$1,900',status:'new',score:88,moveIn:'TBD'}
  ];

  const marketRates = [
    {propertyType:'1 Bedroom',marketAvg:'$2,200',ourRate:'$2,350',position:'above',competitors:8},
    {propertyType:'2 Bedroom',marketAvg:'$2,800',ourRate:'$2,900',position:'above',competitors:12},
    {propertyType:'3 Bedroom',marketAvg:'$3,400',ourRate:'$3,350',position:'below',competitors:6},
    {propertyType:'Studio',marketAvg:'$1,650',ourRate:'$1,750',position:'above',competitors:15}
  ];

  const responsibilities = [
    'Leasing strategy development & execution',
    'Vacancy management & minimization',
    'Lease negotiation & deal structuring',
    'Tenant qualification & screening',
    'Market analysis & rent optimization',
    'Revenue optimization & growth',
    'Lead generation & conversion management'
  ];

  const capabilities = [
    'Leasing Strategy', 'Vacancy Management', 'Lease Negotiation', 'Tenant Qualification',
    'Market Analysis', 'Revenue Optimization', 'Lead Management', 'Pricing Strategy',
    'Tenant Screening', 'Renewal Management', 'Market Research', 'Deal Structuring'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Leased 40 units this month at 98% of asking',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Reduced vacancy rate from 8% to 3%',icon: TrendingUp,color:'#007AFF'},
    {time:'9 min ago',text:'Negotiated 25 renewals with favorable terms',icon: Handshake,color:'#FF9500'},
    {time:'15 min ago',text:'Qualified 45 new tenant applications',icon: UserCheck,color:'#33691E'},
    {time:'22 min ago',text:'Updated pricing based on market analysis',icon: DollarSign,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/leasing/vacancies',description:'Vacancy management',method:'GET'},
    {endpoint:'/leasing/negotiate',description:'Lease negotiation',method:'POST'},
    {endpoint:'/leasing/qualify',description:'Tenant qualification',method:'POST'},
    {endpoint:'/leasing/pricing',description:'Rent pricing optimization',method:'GET'},
    {endpoint:'/leasing/pipeline',description:'Lead pipeline management',method:'GET'}
  ];

  const renderVacancies = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Vacancy Analysis</Text>
        {vacancyAnalysis.map((property, index) => (
          <TouchableOpacity key={index} style={styles.vacancyCard}>
            <View style={styles.vacancyHeader}>
              <View style={styles.vacancyInfo}>
                <Text style={[styles.vacancyName, { color: theme.colors.text }]}>{property.property}</Text>
                <Text style={[styles.vacancyDetails, { color: theme.colors.textSecondary }]}>{property.vacant} of {property.total} units vacant</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: property.priority === 'critical' ? '#FF3B3022' : property.priority === 'high' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: property.priority === 'critical' ? '#FF3B30' : property.priority === 'high' ? '#FF9500' : '#34C759' }]}>{property.priority}</Text>
              </View>
            </View>
            <View style={styles.vacancyMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.vacancyRate}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Rate</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{property.avgDays}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Avg Days</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#FF3B30' }]}>{property.rentLoss}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Rent Loss</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Pricing</Text>
        {marketRates.map((rate, index) => (
          <View key={index} style={styles.rateRow}>
            <Text style={[styles.rateType, { color: theme.colors.text }]}>{rate.propertyType}</Text>
            <View style={styles.rateMetrics}>
              <Text style={[styles.rateMarket, { color: theme.colors.textSecondary }]}>Market: {rate.marketAvg}</Text>
              <Text style={[styles.rateOur, { color: rate.position === 'above' ? '#FF9500' : '#34C759' }]}>Our: {rate.ourRate}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderNegotiations = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Negotiations</Text>
        {leaseNegotiations.map((lease, index) => (
          <View key={index} style={styles.negotiationCard}>
            <View style={styles.negHeader}>
              <View style={styles.negInfo}>
                <Text style={[styles.negTenant, { color: theme.colors.text }]}>{lease.sqft.toLocaleString()} SF - {lease.tenant}</Text>
                <Text style={[styles.negDetails, { color: theme.colors.textSecondary }]}>Current: {lease.currentRent}/mo</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: lease.status === 'accepted' ? '#34C75922' : lease.status === 'negotiating' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: lease.status === 'accepted' ? '#34C759' : lease.status === 'negotiating' ? '#007AFF' : '#FF9500' }]}>{lease.status}</Text>
              </View>
            </View>
            <View style={styles.negMetrics}>
              <View style={styles.negMetric}><Text style={[styles.negLabel, { color: theme.colors.textSecondary }]}>Proposed</Text><Text style={[styles.negValue, { color: '#34C759' }]}>{lease.proposedRent}</Text></View>
              <View style={styles.negMetric}><Text style={[styles.negLabel, { color: theme.colors.textSecondary }]}>Increase</Text><Text style={[styles.negValue, { color: '#007AFF' }]}>{lease.increase}</Text></View>
              <View style={styles.negMetric}><Text style={[styles.negLabel, { color: theme.colors.textSecondary }]}>Leverage</Text><Text style={[styles.negValue, { color: lease.leverage === 'strong' ? '#34C759' : '#FF9500' }]}>{lease.leverage}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderPipeline = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tenant Pipeline</Text>
        {tenantPipeline.map((lead, index) => (
          <View key={index} style={styles.leadCard}>
            <View style={styles.leadHeader}>
              <View style={styles.leadInfo}>
                <Text style={[styles.leadName, { color: theme.colors.text }]}>{lead.name}</Text>
                <Text style={[styles.leadDetails, { color: theme.colors.textSecondary }]}>{lead.property} • {lead.sqft} SF</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: lead.score > 85 ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.scoreText, { color: lead.score > 85 ? '#34C759' : '#FF9500' }]}>{lead.score}</Text>
              </View>
            </View>
            <View style={styles.leadMetrics}>
              <View style={styles.leadMetric}><Text style={[styles.leadLabel, { color: theme.colors.textSecondary }]}>Rent</Text><Text style={[styles.leadValue, { color: theme.colors.text }]}>{lead.rent}</Text></View>
              <View style={styles.leadMetric}><Text style={[styles.leadLabel, { color: theme.colors.textSecondary }]}>Source</Text><Text style={[styles.leadValue, { color: theme.colors.text }]}>{lead.source}</Text></View>
              <View style={[styles.leadStatus, { backgroundColor: lead.status === 'qualified' ? '#34C75922' : lead.status === 'viewing' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.leadStatusText, { color: lead.status === 'qualified' ? '#34C759' : lead.status === 'viewing' ? '#007AFF' : '#FF9500' }]}>{lead.status}</Text>
              </View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Follow-up</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically follow up with leads within 5 minutes</Text></View><Switch value={autoFollowUp} onValueChange={setAutoFollowUp} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Users size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Leasing Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Leasing Operations Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['vacancies','negotiations','pipeline','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'vacancies' && renderVacancies()}
      {activeTab === 'negotiations' && renderNegotiations()}
      {activeTab === 'pipeline' && renderPipeline()}
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
        { id: 'vacancy-minimizer', label: 'AI Vacancy Minimizer' },
        { id: 'lease-negotiator', label: 'AI Lease Negotiator' },
        { id: 'tenant-qualifier', label: 'AI Tenant Qualifier' },
      ]} />

      <AgentFeatures agentId="leasing-manager" agentName="AI Leasing Manager" />
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
  vacancyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  vacancyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  vacancyInfo:{flex:1},
  vacancyName:{fontSize:15,fontWeight:'600'},
  vacancyDetails:{fontSize:12,color:'#666'},
  priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  vacancyMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:15,fontWeight:'bold'},
  metricLabel:{fontSize:11,marginTop:2},
  rateRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  rateType:{fontSize:14,fontWeight:'600'},
  rateMetrics:{flexDirection:'row',gap:16},
  rateMarket:{fontSize:12,color:'#666'},
  rateOur:{fontSize:12,fontWeight:'600'},
  negotiationCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  negHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  negInfo:{flex:1},
  negTenant:{fontSize:15,fontWeight:'600'},
  negDetails:{fontSize:12,color:'#666'},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  negMetrics:{flexDirection:'row',justifyContent:'space-between'},
  negMetric:{alignItems:'center'},
  negLabel:{fontSize:11},
  negValue:{fontSize:14,fontWeight:'600'},
  leadCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  leadHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  leadInfo:{flex:1},
  leadName:{fontSize:15,fontWeight:'600'},
  leadDetails:{fontSize:12,color:'#666'},
  scoreBadge:{width:44,height:44,borderRadius:22,justifyContent:'center',alignItems:'center',backgroundColor:'#34C75922'},
  scoreText:{fontSize:16,fontWeight:'bold',color:'#34C759'},
  leadMetrics:{flexDirection:'row',alignItems:'center'},
  leadMetric:{marginRight:20},
  leadLabel:{fontSize:11},
  leadValue:{fontSize:14,fontWeight:'600'},
  leadStatus:{paddingHorizontal:10,paddingVertical:4,borderRadius:8},
  leadStatusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
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
