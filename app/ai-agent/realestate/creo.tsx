import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Users, Calendar, MessageSquare, Settings, BarChart3, FileText, Handshake, Globe, Brain, Search, Shield, Wrench, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, Play, Pause, RefreshCw, Download, Upload, Filter, Plus, X, ChevronRight, ChevronDown, Building, MapPinned, Timer, ClipboardList, FileCheck, Calculator, Truck, WrenchIcon, ImageIcon, Eye, Send, Bell, Search as SearchIcon, MoreVertical } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';
import { useRouter } from 'expo-router';

export default function CREOPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [portfolioFilter, setPortfolioFilter] = React.useState('all');
  const [autoOptimize, setAutoOptimize] = React.useState(true);
  const [riskAlerts, setRiskAlerts] = React.useState(true);

  const stats = [
    {label:'Portfolio Value',value:'$2.4B',icon: DollarSign,color:'#34C759'},
    {label:'Properties',value:'847',icon: Building2,color:'#007AFF'},
    {label:'Occupancy',value:'96.2%',icon: TrendingUp,color:'#FF9500'},
    {label:'NOI',value:'$156M',icon: ChartBarBig,color:'#33691E'}
  ];

  const portfolioMetrics = [
    {category:'Office',value:'$892M',properties:312,occupancy:'94.1%',noi:'$58.2M',change:'+2.3%'},
    {category:'Retail',value:'$634M',properties:245,occupancy:'92.8%',noi:'$41.8M',change:'+1.1%'},
    {category:'Industrial',value:'$521M',properties:178,occupancy:'98.4%',noi:'$35.6M',change:'+4.7%'},
    {category:'Multifamily',value:'$353M',properties:112,occupancy:'97.2%',noi:'$20.4M',change:'+3.2%'}
  ];

  const marketInsights = [
    {type:'positive',title:'Market Uptick Detected',desc:'Office sector showing 3.2% rental growth in Q3',time:'2h ago'},
    {type:'warning',title:'Interest Rate Impact',desc:'Fed rate decision may affect acquisition costs',time:'4h ago'},
    {type:'info',title:'New Development Zone',desc:'3 new opportunity zones identified in metro areas',time:'6h ago'}
  ];

  const investmentOpportunities = [
    {property:'Riverside Office Park',value:'$45M',capRate:'6.8%',irr:'14.2%',score:92},
    {property:'Westfield Retail Center',value:'$32M',capRate:'7.2%',irr:'15.1%',score:88},
    {property:'Logistics Hub Alpha',value:'$28M',capRate:'6.5%',irr:'13.8%',score:85}
  ];

  const responsibilities = [
    'Real estate strategy & organizational vision',
    'Portfolio oversight & performance optimization',
    'Capital allocation & investment decisions',
    'Market analysis & trend identification',
    'Stakeholder relationship management',
    'Real estate risk management & compliance',
    'Executive team leadership & development'
  ];

  const capabilities = [
    'RE Strategy', 'Portfolio Oversight', 'Capital Allocation', 'Market Analysis',
    'Stakeholder Mgmt', 'Risk Management', 'Investment Analysis', 'Lease Negotiation',
    'Asset Optimization', 'Market Forecasting', 'Due Diligence', 'Portfolio Rebalancing'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Approved $100M acquisition pipeline',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Presented portfolio performance to board',icon: ChartBarBig,color:'#007AFF'},
    {time:'9 min ago',text:'Reviewed market outlook for Q3',icon: Zap,color:'#FF9500'},
    {time:'15 min ago',text:'Approved 3 new development projects',icon: Building2,color:'#33691E'},
    {time:'22 min ago',text:'Signed $25M retail acquisition',icon: Handshake,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/consult/creo/strategy',description:'Strategic planning consultation',method:'POST'},
    {endpoint:'/portfolio/analysis',description:'Portfolio performance analysis',method:'GET'},
    {endpoint:'/invest/evaluate',description:'Investment opportunity evaluation',method:'POST'},
    {endpoint:'/market/insights',description:'Real-time market intelligence',method:'GET'},
    {endpoint:'/coordinate/vp-property',description:'VP Property Management coordination',method:'POST'}
  ];

  const renderOverview = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The CREO AI provides executive-level strategic oversight, drives organizational alignment, and ensures operational excellence across the Real Estate division. Manages a $2.4B portfolio across 847 properties with 96.2% occupancy.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Portfolio Performance</Text>
        {portfolioMetrics.map((metric, index) => (
          <TouchableOpacity key={index} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={[styles.metricCategory, { color: theme.colors.text }]}>{metric.category}</Text>
              <View style={[styles.changeBadge, { backgroundColor: metric.change.startsWith('+') ? '#34C75922' : '#FF3B3022' }]}>
                <TrendingUp size={12} color={metric.change.startsWith('+') ? '#34C759' : '#FF3B30'} />
                <Text style={[styles.changeText, { color: metric.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{metric.change}</Text>
              </View>
            </View>
            <View style={styles.metricDetails}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.properties}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Properties</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.occupancy}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Occupancy</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.noi}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>NOI</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Intelligence</Text>
        {marketInsights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: insight.type === 'positive' ? '#34C75922' : insight.type === 'warning' ? '#FF950022' : '#007AFF22' }]}>
              {insight.type === 'positive' ? <CheckCircle size={18} color="#34C759" /> : insight.type === 'warning' ? <AlertTriangle size={18} color="#FF9500" /> : <Brain size={18} color="#007AFF" />}
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
              <Text style={[styles.insightDesc, { color: theme.colors.textSecondary }]}>{insight.desc}</Text>
              <Text style={[styles.insightTime, { color: theme.colors.textSecondary }]}>{insight.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderInvestments = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Investment Pipeline</Text>
        <View style={styles.pipelineFilters}>
          {['All','Office','Retail','Industrial','Multifamily','Mixed-Use'].map((filter,i) => (
            <TouchableOpacity key={i} onPress={() => setPortfolioFilter(filter.toLowerCase())} style={[styles.filterChip, portfolioFilter === filter.toLowerCase() && {backgroundColor:'#33691E22'}]}>
              <Text style={[styles.filterChipText, {color: portfolioFilter === filter.toLowerCase() ? '#33691E' : theme.colors.textSecondary}]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {investmentOpportunities.map((opp, index) => (
          <TouchableOpacity key={index} style={styles.opportunityCard}>
            <View style={styles.oppHeader}>
              <View style={styles.oppScore}><Text style={styles.oppScoreText}>{opp.score}</Text></View>
              <View style={styles.oppInfo}>
                <Text style={[styles.oppName, { color: theme.colors.text }]}>{opp.property}</Text>
                <Text style={[styles.oppValue, { color: theme.colors.textSecondary }]}>{opp.value}</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.oppMetrics}>
              <View style={styles.oppMetric}><Text style={[styles.oppMetricLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text><Text style={[styles.oppMetricValue, { color: '#34C759' }]}>{opp.capRate}</Text></View>
              <View style={styles.oppMetric}><Text style={[styles.oppMetricLabel, { color: theme.colors.textSecondary }]}>IRR</Text><Text style={[styles.oppMetricValue, { color: '#007AFF' }]}>{opp.irr}</Text></View>
              <TouchableOpacity style={[styles.oppAction, {backgroundColor:'#33691E'}]}><Text style={styles.oppActionText}>Evaluate</Text></TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capital Deployment</Text>
        <View style={styles.capitalRow}><Text style={[styles.capitalLabel, { color: theme.colors.textSecondary }]}>Q3 Allocation</Text><Text style={[styles.capitalValue, { color: '#34C759' }]}>$125M</Text></View>
        <View style={styles.capitalRow}><Text style={[styles.capitalLabel, { color: theme.colors.textSecondary }]}>Q4 Projection</Text><Text style={[styles.capitalValue, { color: '#007AFF' }]}>$150M</Text></View>
        <View style={styles.capitalRow}><Text style={[styles.capitalLabel, { color: theme.colors.textSecondary }]}>Available Capital</Text><Text style={[styles.capitalValue, { color: '#FF9500' }]}>$75M</Text></View>
        <TouchableOpacity style={[styles.fullButton, {backgroundColor:'#33691E'}]}><Text style={styles.fullButtonText}>Deploy Capital</Text></TouchableOpacity>
      </View>
    </>
  );

  const renderAnalytics = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Analytics</Text>
        <View style={styles.chartPlaceholder}><LineChart size={48} color="#33691E" /><Text style={[styles.chartPlaceholderText, { color: theme.colors.textSecondary }]}>Portfolio Performance Chart</Text></View>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticsCard}><Text style={[styles.analyticsValue, { color: '#34C759' }]}>+12.4%</Text><Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>YoY Return</Text></View>
          <View style={styles.analyticsCard}><Text style={[styles.analyticsValue, { color: '#007AFF' }]}>1.42x</Text><Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Equity Multiple</Text></View>
          <View style={styles.analyticsCard}><Text style={[styles.analyticsValue, { color: '#FF9500' }]}>8.2 yrs</Text><Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>Avg Hold Period</Text></View>
          <View style={styles.analyticsCard}><Text style={[styles.analyticsValue, { color: '#33691E' }]}>$2.4B</Text><Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>AUM</Text></View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Metrics</Text>
        <View style={styles.riskRow}><View style={[styles.riskDot, {backgroundColor:'#34C759'}]} /><Text style={[styles.riskLabel, { color: theme.colors.text }]}>Low Risk</Text><Text style={[styles.riskValue, { color: theme.colors.textSecondary }]}>72% of portfolio</Text></View>
        <View style={styles.riskRow}><View style={[styles.riskDot, {backgroundColor:'#FF9500'}]} /><Text style={[styles.riskLabel, { color: theme.colors.text }]}>Medium Risk</Text><Text style={[styles.riskValue, { color: theme.colors.textSecondary }]}>21% of portfolio</Text></View>
        <View style={styles.riskRow}><View style={[styles.riskDot, {backgroundColor:'#FF3B30'}]} /><Text style={[styles.riskLabel, { color: theme.colors.text }]}>High Risk</Text><Text style={[styles.riskValue, { color: theme.colors.textSecondary }]}>7% of portfolio</Text></View>
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Portfolio Optimization</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically rebalance portfolio based on market conditions</Text></View><Switch value={autoOptimize} onValueChange={setAutoOptimize} trackColor={{true:'#33691E'}} /></View>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Risk Alert Notifications</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Receive alerts for portfolio risk changes</Text></Text><Switch value={riskAlerts} onValueChange={setRiskAlerts} trackColor={{true:'#33691E'}} /></View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Upload size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Import Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Sync Portfolio</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Settings size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Briefcase size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Real Estate Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>CREO - Executive Real Estate Leadership</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>C-Suite</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><Crown size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['overview','investments','analytics','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'investments' && renderInvestments()}
      {activeTab === 'analytics' && renderAnalytics()}
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
        { id: 'portfolio-strategy-advisor', label: 'AI Portfolio Strategy Advisor' },
        { id: 'market-cycle-analyst', label: 'AI Market Cycle Analyst' },
        { id: 'capital-deployment-planner', label: 'AI Capital Deployment Planner' },
      ]} />

      <AgentFeatures agentId="creo" agentName="AI Chief Real Estate Officer" />
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
  metricCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  metricHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  metricCategory:{fontSize:16,fontWeight:'700'},
  changeBadge:{flexDirection:'row',alignItems:'center',paddingHorizontal:8,paddingVertical:4,borderRadius:12,gap:4},
  changeText:{fontSize:12,fontWeight:'600'},
  metricDetails:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:16,fontWeight:'bold'},
  metricLabel:{fontSize:11,marginTop:2},
  insightCard:{flexDirection:'row',marginBottom:12,gap:12},
  insightIcon:{width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center'},
  insightContent:{flex:1},
  insightTitle:{fontSize:14,fontWeight:'600',marginBottom:2},
  insightDesc:{fontSize:13,lineHeight:18},
  insightTime:{fontSize:11,marginTop:4},
  pipelineFilters:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:16},
  filterChip:{paddingHorizontal:14,paddingVertical:8,borderRadius:20,borderWidth:1,borderColor:'#E5E5EA'},
  filterChipText:{fontSize:12,fontWeight:'600'},
  opportunityCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  oppHeader:{flexDirection:'row',alignItems:'center',marginBottom:12},
  oppScore:{width:44,height:44,borderRadius:22,backgroundColor:'#33691E',justifyContent:'center',alignItems:'center'},
  oppScoreText:{color:'#fff',fontSize:16,fontWeight:'bold'},
  oppInfo:{flex:1,marginLeft:12},
  oppName:{fontSize:15,fontWeight:'600'},
  oppValue:{fontSize:13,color:'#666'},
  oppMetrics:{flexDirection:'row',alignItems:'center'},
  oppMetric:{marginRight:20},
  oppMetricLabel:{fontSize:11},
  oppMetricValue:{fontSize:14,fontWeight:'600'},
  oppAction:{paddingHorizontal:16,paddingVertical:8,borderRadius:8},
  oppActionText:{color:'#fff',fontSize:12,fontWeight:'600'},
  capitalRow:{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  capitalLabel:{fontSize:14},
  capitalValue:{fontSize:14,fontWeight:'700'},
  fullButton:{paddingVertical:14,borderRadius:12,alignItems:'center',marginTop:16},
  fullButtonText:{color:'#fff',fontSize:15,fontWeight:'600'},
  chartPlaceholder:{height:150,justifyContent:'center',alignItems:'center',backgroundColor:'#F8F9FA',borderRadius:12,marginBottom:16},
  chartPlaceholderText:{marginTop:8,fontSize:13},
  analyticsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  analyticsCard:{flex:1,minWidth:'45%',backgroundColor:'#F8F9FA',padding:16,borderRadius:12,alignItems:'center'},
  analyticsValue:{fontSize:22,fontWeight:'bold'},
  analyticsLabel:{fontSize:12,marginTop:4},
  riskRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:10},
  riskDot:{width:12,height:12,borderRadius:6},
  riskLabel:{fontSize:14,fontWeight:'600',flex:1},
  riskValue:{fontSize:13},
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
