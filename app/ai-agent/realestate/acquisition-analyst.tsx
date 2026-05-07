import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Activity, Star, CircleCheckBig, Clock, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, Search, FileSearch, Scale, TrendingDown, Award, Briefcase, SearchIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function AcquisitionAnalystPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('pipeline');
  const [autoScore, setAutoScore] = React.useState(true);

  const stats = [
    {label:'Deals Analyzed',value:'156',icon: SearchIcon,color:'#34C759'},
    {label:'Underwritten',value:'$485M',icon: DollarSign,color:'#007AFF'},
    {label:'IRR Target',value:'16%+',icon: TrendingUp,color:'#FF9500'},
    {label:'Deals Closed',value:'12',icon: Briefcase,color:'#33691E'}
  ];

  const acquisitionPipeline = [
    {name:'Harbor View Apartments',type:'Multifamily',value:'$85M',location:'San Francisco, CA',capRate:'5.2%',irr:18.5,equity:'$28M',status:'underwriting',score:92,daysInPipeline:12},
    {name:'Tech Campus Portfolio',type:'Office',value:'$125M',location:'Austin, TX',capRate:'6.8%',irr:15.2,equity:'$45M',status:'due-diligence',score:85,daysInPipeline:28},
    {name:'Industrial Distribution Hub',type:'Industrial',value:'$62M',location:'Phoenix, AZ',capRate:'7.2%',irr:19.8,equity:'$22M',status:'term-sheet',score:88,daysInPipeline:8},
    {name:'Retail Power Center',type:'Retail',value:'$48M',location:'Denver, CO',capRate:'7.8%',irr:14.2,equity:'$18M',status:'screening',score:72,daysInPipeline:5}
  ];

  const underwritingDeals = [
    {property:'Harbor View Apartments',purchasePrice:'$85M',noi:'$4.42M',capRate:5.2,valueAdd:'Renovation',targetIRR:18.5,equityReq:'$28M',exitValue:'$112M',exitCap:5.5},
    {property:'Industrial Distribution Hub',purchasePrice:'$62M',noi:'$4.46M',capRate:7.2,valueAdd:'Lease-up',targetIRR:19.8,equityReq:'$22M',exitValue:'$78M',exitCap:6.2}
  ];

  const marketComps = [
    {property:'Riverside Commons',salePrice:'$92M',capRate:5.0,pricePSF:'$425',noi:'$4.6M',date:'2025-12'},
    {property:'Metro Tower',salePrice:'$78M',capRate:5.4,pricePSF:'$398',noi:'$4.2M',date:'2025-11'},
    {property:'Oakwood Portfolio',salePrice:'$145M',capRate:5.8,pricePSF:'$385',noi:'$8.4M',date:'2025-10'}
  ];

  const responsibilities = [
    'Acquisition opportunity analysis & evaluation',
    'Deal underwriting & financial modeling',
    'Market research & comparable analysis',
    'Investment scoring & ranking',
    'Due diligence coordination',
    'Acquisition pipeline management',
    'Investment committee presentation'
  ];

  const capabilities = [
    'Acquisition Analysis', 'Deal Underwriting', 'Market Research', 'Financial Modeling',
    'Due Diligence', 'Investment Scoring', 'Valuation', 'Risk Analysis',
    'Comparable Analysis', 'Term Sheet Negotiation', 'Cap Rate Analysis', 'IRR Modeling'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Analyzed 30 acquisition opportunities this quarter',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Underwrote 5 deals totaling $150M',icon: Calculator,color:'#007AFF'},
    {time:'9 min ago',text:'Scored 50 deals using investment criteria model',icon: Scale,color:'#FF9500'},
    {time:'15 min ago',text:'Completed due diligence on Tech Campus',icon: FileSearch,color:'#33691E'},
    {time:'22 min ago',text:'Presented 3 deals to investment committee',icon: Briefcase,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/acquisition/analyze',description:'Acquisition opportunity analysis',method:'POST'},
    {endpoint:'/acquisition/underwrite',description:'Deal underwriting',method:'POST'},
    {endpoint:'/acquisition/score',description:'Investment scoring',method:'POST'},
    {endpoint:'/acquisition/comps',description:'Comparable analysis',method:'GET'},
    {endpoint:'/acquisition/pipeline',description:'Pipeline management',method:'GET'}
  ];

  const renderPipeline = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Acquisition Pipeline</Text>
        {acquisitionPipeline.map((deal, index) => (
          <TouchableOpacity key={index} style={styles.dealCard}>
            <View style={styles.dealHeader}>
              <View style={styles.dealInfo}>
                <Text style={[styles.dealName, { color: theme.colors.text }]}>{deal.name}</Text>
                <Text style={[styles.dealType, { color: theme.colors.textSecondary }]}>{deal.type} • {deal.location}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: deal.score > 85 ? '#34C75922' : deal.score > 70 ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.scoreText, { color: deal.score > 85 ? '#34C759' : deal.score > 70 ? '#FF9500' : '#FF3B30' }]}>{deal.score}</Text>
              </View>
            </View>
            <View style={styles.dealMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{deal.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{deal.capRate}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#34C759' }]}>{deal.irr}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>IRR</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{deal.equity}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Equity</Text></View>
            </View>
            <View style={styles.dealFooter}>
              <View style={[styles.statusBadge, { backgroundColor: deal.status === 'underwriting' ? '#007AFF22' : deal.status === 'due-diligence' ? '#FF950022' : deal.status === 'term-sheet' ? '#34C75922' : '#E5E5EA' }]}>
                <Text style={[styles.statusText, { color: deal.status === 'underwriting' ? '#007AFF' : deal.status === 'due-diligence' ? '#FF9500' : deal.status === 'term-sheet' ? '#34C759' : '#666' }]}>{deal.status.replace('-',' ')}</Text>
              </View>
              <Text style={[styles.daysText, { color: theme.colors.textSecondary }]}>{deal.daysInPipeline} days</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderUnderwriting = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Underwriting Models</Text>
        {underwritingDeals.map((deal, index) => (
          <View key={index} style={styles.underwriteCard}>
            <Text style={[styles.underwriteName, { color: theme.colors.text }]}>{deal.property}</Text>
            <View style={styles.underwriteGrid}>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>Purchase</Text><Text style={[styles.underwriteValue, { color: theme.colors.text }]}>{deal.purchasePrice}</Text></View>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>NOI</Text><Text style={[styles.underwriteValue, { color: theme.colors.text }]}>{deal.noi}</Text></View>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text><Text style={[styles.underwriteValue, { color: '#34C759' }]}>{deal.capRate}</Text></View>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>Target IRR</Text><Text style={[styles.underwriteValue, { color: '#007AFF' }]}>{deal.targetIRR}%</Text></View>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>Equity</Text><Text style={[styles.underwriteValue, { color: theme.colors.text }]}>{deal.equityReq}</Text></View>
              <View style={styles.underwriteItem}><Text style={[styles.underwriteLabel, { color: theme.colors.textSecondary }]}>Exit Value</Text><Text style={[styles.underwriteValue, { color: '#33691E' }]}>{deal.exitValue}</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderComps = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Comparables</Text>
        {marketComps.map((comp, index) => (
          <View key={index} style={styles.compCard}>
            <View style={styles.compHeader}>
              <Text style={[styles.compName, { color: theme.colors.text }]}>{comp.salePrice}</Text>
              <Text style={[styles.compDate, { color: theme.colors.textSecondary }]}>{comp.date}</Text>
            </View>
            <View style={styles.compMetrics}>
              <View style={styles.compMetric}><Text style={[styles.compLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text><Text style={[styles.compValue, { color: theme.colors.text }]}>{comp.capRate}</Text></View>
              <View style={styles.compMetric}><Text style={[styles.compLabel, { color: theme.colors.textSecondary }]}>Price/SF</Text><Text style={[styles.compValue, { color: theme.colors.text }]}>{comp.pricePSF}</Text></View>
              <View style={styles.compMetric}><Text style={[styles.compLabel, { color: theme.colors.textSecondary }]}>NOI</Text><Text style={[styles.compValue, { color: theme.colors.text }]}>{comp.noi}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Deal Scoring</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically score deals based on investment criteria</Text></View><Switch value={autoScore} onValueChange={setAutoScore} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Target size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Acquisition Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Investment Analysis & Underwriting</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Analyst</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['pipeline','underwriting','comps','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'pipeline' && renderPipeline()}
      {activeTab === 'underwriting' && renderUnderwriting()}
      {activeTab === 'comps' && renderComps()}
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
        { id: 'deal-screener', label: 'AI Deal Screener' },
        { id: 'due-diligence-coordinator', label: 'AI Due Diligence Coordinator' },
        { id: 'underwriting-assistant', label: 'AI Underwriting Assistant' },
      ]} />

      <AgentFeatures agentId="acquisition-analyst" agentName="AI Acquisition Analyst" />
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
  dealCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  dealHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  dealInfo:{flex:1},
  dealName:{fontSize:15,fontWeight:'600'},
  dealType:{fontSize:12,color:'#666',marginTop:2},
  scoreBadge:{width:44,height:44,borderRadius:22,justifyContent:'center',alignItems:'center',backgroundColor:'#34C75922'},
  scoreText:{fontSize:16,fontWeight:'bold',color:'#34C759'},
  dealMetrics:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:14,fontWeight:'bold'},
  metricLabel:{fontSize:10,marginTop:2},
  dealFooter:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  daysText:{fontSize:11,color:'#666'},
  underwriteCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  underwriteName:{fontSize:15,fontWeight:'600',marginBottom:12},
  underwriteGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  underwriteItem:{minWidth:'30%'},
  underwriteLabel:{fontSize:11,color:'#666'},
  underwriteValue:{fontSize:14,fontWeight:'600'},
  compCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  compHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  compName:{fontSize:15,fontWeight:'600'},
  compDate:{fontSize:12,color:'#666'},
  compMetrics:{flexDirection:'row',justifyContent:'space-between'},
  compMetric:{alignItems:'center'},
  compLabel:{fontSize:11,color:'#666'},
  compValue:{fontSize:14,fontWeight:'600'},
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
