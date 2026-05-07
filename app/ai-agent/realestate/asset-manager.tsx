import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Timer, ClipboardList, FileCheck, Calculator, Percent, TrendingDown, BuildingIcon, PieChartIcon, BarChart3Icon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function AssetManagerPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('portfolio');
  const [autoRebalance, setAutoRebalance] = React.useState(true);

  const stats = [
    {label:'Assets',value:'25',icon: Building2,color:'#34C759'},
    {label:'AUM',value:'$750M',icon: DollarSign,color:'#007AFF'},
    {label:'Return',value:'15.2%',icon: TrendingUp,color:'#FF9500'},
    {label:'Occupancy',value:'94%',icon: Percent,color:'#33691E'}
  ];

  const assetPortfolio = [
    {name:'Riverside Apartments',type:'Multifamily',value:'$125M',noi:'$6.2M',capRate:5.0,occupancy:96,location:'San Francisco, CA',performance:'outperform',trend:'up'},
    {name:'Metro Center',type:'Office',value:'$180M',noi:'$9.0M',capRate:5.0,occupancy:88,location:'Austin, TX',performance:'underperform',trend:'down'},
    {name:'Oakwood Plaza',type:'Retail',value:'$95M',noi:'$6.6M',capRate:7.0,occupancy:92,location:'Denver, CO',performance:'stable',trend:'stable'},
    {name:'Industrial Hub Phoenix',type:'Industrial',value:'$150M',noi:'$10.5M',capRate:7.0,occupancy:98,location:'Phoenix, AZ',performance:'outperform',trend:'up'}
  ];

  const performanceMetrics = [
    {asset:'Riverside Apartments',quarter:'Q4 2025',noiGrowth:8.2,valueChange:5.4,totalReturn:12.1,irr:18.5,ranking:1},
    {asset:'Metro Center',quarter:'Q4 2025',noiGrowth:-2.1,valueChange:-3.2,totalReturn:4.2,irr:8.2,ranking:4},
    {asset:'Oakwood Plaza',quarter:'Q4 2025',noiGrowth:1.5,valueChange:0.8,totalReturn:7.8,irr:12.4,ranking:3},
    {asset:'Industrial Hub',quarter:'Q4 2025',noiGrowth:12.4,valueChange:8.2,totalReturn:15.8,irr:22.1,ranking:1}
  ];

  const dispositionCandidates = [
    {asset:'Metro Center',value:'$180M',reason:'Underperforming',potentialGain:'-$5.2M',timeline:'Q2 2026',priority:'high',irr:'8.2%'},
    {asset:'Oakwood Plaza',value:'$95M',reason:'Market timing',potentialGain:'$8.5M',timeline:'Q3 2026',priority:'medium',irr:'12.4%'},
    {asset:'Suburban Office Park',value:'$45M',reason:'Declining market',potentialGain:'$2.1M',timeline:'Q4 2026',priority:'low',irr:'10.5%'}
  ];

  const responsibilities = [
    'Asset management & performance optimization',
    'Asset performance monitoring & reporting',
    'Disposition strategy & execution',
    'Return analysis & benchmarking',
    'Portfolio monitoring & rebalancing',
    'Value enhancement program management',
    'Investor reporting & communication'
  ];

  const capabilities = [
    'Asset Management', 'Performance Optimization', 'Disposition Strategy', 'Return Analysis',
    'Portfolio Monitoring', 'Value Enhancement', 'Benchmarking', 'Rebalancing',
    'Investment Analysis', 'Risk Assessment', 'Market Analysis', 'Reporting'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Managed 25 assets totaling $750M',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Identified 3 assets for disposition strategy',icon: TrendingDown,color:'#FF9500'},
    {time:'9 min ago',text:'Enhanced portfolio returns by 15% YoY',icon: TrendingUp,color:'#007AFF'},
    {time:'15 min ago',text:'Completed quarterly asset valuation',icon: Calculator,color:'#33691E'},
    {time:'22 min ago',text:'Generated investor performance report',icon: FileCheck,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/asset/portfolio',description:'Portfolio overview',method:'GET'},
    {endpoint:'/asset/performance',description:'Performance metrics',method:'GET'},
    {endpoint:'/asset/disposition',description:'Disposition candidates',method:'GET'},
    {endpoint:'/asset/returns',description:'Return analysis',method:'POST'},
    {endpoint:'/asset/rebalance',description:'Portfolio rebalancing',method:'POST'}
  ];

  const renderPortfolio = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Asset Portfolio</Text>
        {assetPortfolio.map((asset, index) => (
          <TouchableOpacity key={index} style={styles.assetCard}>
            <View style={styles.assetHeader}>
              <View style={styles.assetInfo}>
                <Text style={[styles.assetName, { color: theme.colors.text }]}>{asset.name}</Text>
                <Text style={[styles.assetType, { color: theme.colors.textSecondary }]}>{asset.type} • {asset.location}</Text>
              </View>
              <View style={[styles.perfBadge, { backgroundColor: asset.performance === 'outperform' ? '#34C75922' : asset.performance === 'underperform' ? '#FF3B3022' : '#FF950022' }]}>
                <Text style={[styles.perfText, { color: asset.performance === 'outperform' ? '#34C759' : asset.performance === 'underperform' ? '#FF3B30' : '#FF9500' }]}>{asset.performance}</Text>
              </View>
            </View>
            <View style={styles.assetMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{asset.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{asset.noi}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>NOI</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#34C759' }]}>{asset.capRate}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: asset.occupancy > 95 ? '#34C759' : '#FF9500' }]}>{asset.occupancy}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Occupancy</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderPerformance = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        {performanceMetrics.map((metric, index) => (
          <View key={index} style={styles.perfCard}>
            <View style={styles.perfHeader}>
              <Text style={[styles.perfAsset, { color: theme.colors.text }]}>{metric.asset}</Text>
              <View style={[styles.rankBadge, { backgroundColor: metric.ranking === 1 ? '#FFD70022' : '#E5E5EA' }]}>
                <Text style={[styles.rankText, { color: metric.ranking === 1 ? '#FFD700' : '#666' }]}>#{metric.ranking}</Text>
              </View>
            </View>
            <View style={styles.perfMetrics}>
              <View style={styles.perfMetric}><Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>NOI Growth</Text><Text style={[styles.perfValue, { color: metric.noiGrowth > 0 ? '#34C759' : '#FF3B30' }]}>{metric.noiGrowth > 0 ? '+' : ''}{metric.noiGrowth}%</Text></View>
              <View style={styles.perfMetric}><Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Value Change</Text><Text style={[styles.perfValue, { color: metric.valueChange > 0 ? '#34C759' : '#FF3B30' }]}>{metric.valueChange > 0 ? '+' : ''}{metric.valueChange}%</Text></View>
              <View style={styles.perfMetric}><Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>Total Return</Text><Text style={[styles.perfValue, { color: '#33691E' }]}>{metric.totalReturn}%</Text></View>
              <View style={styles.perfMetric}><Text style={[styles.perfLabel, { color: theme.colors.textSecondary }]}>IRR</Text><Text style={[styles.perfValue, { color: '#007AFF' }]}>{metric.irr}%</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderDisposition = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Disposition Candidates</Text>
        {dispositionCandidates.map((item, index) => (
          <View key={index} style={styles.dispCard}>
            <View style={styles.dispHeader}>
              <Text style={[styles.dispAsset, { color: theme.colors.text }]}>{item.asset}</Text>
              <View style={[styles.priorityBadge, { backgroundColor: item.priority === 'high' ? '#FF3B3022' : item.priority === 'medium' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: item.priority === 'high' ? '#FF3B30' : item.priority === 'medium' ? '#FF9500' : '#34C759' }]}>{item.priority}</Text>
              </View>
            </View>
            <Text style={[styles.dispReason, { color: theme.colors.textSecondary }]}>{item.reason}</Text>
            <View style={styles.dispMetrics}>
              <View style={styles.dispMetric}><Text style={[styles.dispLabel, { color: theme.colors.textSecondary }]}>Value</Text><Text style={[styles.dispValue, { color: theme.colors.text }]}>{item.value}</Text></View>
              <View style={styles.dispMetric}><Text style={[styles.dispLabel, { color: theme.colors.textSecondary }]}>Potential</Text><Text style={[styles.dispValue, { color: item.potentialGain.startsWith('-') ? '#FF3B30' : '#34C759' }]}>{item.potentialGain}</Text></View>
              <View style={styles.dispMetric}><Text style={[styles.dispLabel, { color: theme.colors.textSecondary }]}>Timeline</Text><Text style={[styles.dispValue, { color: theme.colors.text }]}>{item.timeline}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Rebalance</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically rebalance portfolio based on targets</Text></View><Switch value={autoRebalance} onValueChange={setAutoRebalance} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><TrendingUp size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Asset Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Asset Management & Optimization</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['portfolio','performance','disposition','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'portfolio' && renderPortfolio()}
      {activeTab === 'performance' && renderPerformance()}
      {activeTab === 'disposition' && renderDisposition()}
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
        { id: 'asset-performance-tracker', label: 'AI Asset Performance Tracker' },
        { id: 'disposition-advisor', label: 'AI Disposition Advisor' },
        { id: 'return-calculator', label: 'AI Return Calculator' },
      ]} />

      <AgentFeatures agentId="asset-manager" agentName="AI Asset Manager" />
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
  assetCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  assetHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  assetInfo:{flex:1},
  assetName:{fontSize:15,fontWeight:'600'},
  assetType:{fontSize:12,color:'#666',marginTop:2},
  perfBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  perfText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  assetMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:14,fontWeight:'bold'},
  metricLabel:{fontSize:10,marginTop:2},
  perfCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  perfHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  perfAsset:{fontSize:15,fontWeight:'600'},
  rankBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  rankText:{fontSize:14,fontWeight:'700'},
  perfMetrics:{flexDirection:'row',justifyContent:'space-between'},
  perfMetric:{alignItems:'center'},
  perfLabel:{fontSize:11,color:'#666'},
  perfValue:{fontSize:14,fontWeight:'600'},
  dispCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  dispHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},
  dispAsset:{fontSize:15,fontWeight:'600'},
  priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  dispReason:{fontSize:12,color:'#666',marginBottom:12},
  dispMetrics:{flexDirection:'row',justifyContent:'space-between'},
  dispMetric:{alignItems:'center'},
  dispLabel:{fontSize:11,color:'#666'},
  dispValue:{fontSize:14,fontWeight:'600'},
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
