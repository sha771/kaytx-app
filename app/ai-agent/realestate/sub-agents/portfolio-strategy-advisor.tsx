import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, RefreshCw, Download, PieChart, BarChart3, Calculator, Percent, Layers, GitBranch, AlertTriangle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function PortfolioStrategyAdvisorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('allocation');
  const [autoRebalance, setAutoRebalance] = React.useState(true);

  const stats = [
    {label:'Portfolio',value:'$500M',icon: DollarSign,color:'#34C759'},
    {label:'Assets',value:'25',icon: Building2,color:'#007AFF'},
    {label:'Return',value:'12.4%',icon: TrendingUp,color:'#FF9500'},
    {label:'Risk',value:'Medium',icon: AlertTriangle,color:'#558B2F'}
  ];

  const allocations = [
    {sector:'Multifamily',current:35,target:30,variance:5,value:'$175M',properties:8},
    {sector:'Office',current:25,target:25,variance:0,value:'$125M',properties:5},
    {sector:'Industrial',current:20,target:25,variance:-5,value:'$100M',properties:6},
    {sector:'Retail',current:12,target:15,variance:-3,value:'$60M',properties:4},
    {sector:'Mixed-Use',current:8,target:5,variance:3,value:'$40M',properties:2}
  ];

  const recommendations = [
    {id:1,action:'Reduce',asset:'Riverside Apartments',amount:'$25M',reason:'Overweight vs target',priority:'high',timeline:'Q2 2026'},
    {id:2,action:'Increase',asset:'Industrial Hub Phoenix',amount:'$30M',reason:'Underweight vs target',priority:'high',timeline:'Q2 2026'},
    {id:3,action:'Hold',asset:'Metro Center',amount:'$125M',reason:'On target allocation',priority:'medium',timeline:'Q3 2026'},
    {id:4,action:'Review',asset:'Oakwood Plaza',amount:'$60M',reason:'Declining market conditions',priority:'low',timeline:'Q4 2026'}
  ];

  const benchmarks = [
    {index:'NCREIF ODCE',return:8.2,alpha:4.2,ranking:1,quarter:'Q4 2025'},
    {index:'NCREIF Property',return:6.8,alpha:5.6,ranking:1,quarter:'Q4 2025'},
    {index:'FTSE NAREIT',return:5.4,alpha:7.0,ranking:1,quarter:'Q4 2025'},
    {index:'Bonds (Agg)',return:4.1,alpha:8.3,ranking:1,quarter:'Q4 2025'}
  ];

  const capabilities = ['Portfolio Optimization','Asset Allocation','Diversification Strategy','Performance Benchmarking','Risk-Return Analysis','Rebalancing'];
  const responsibilities = ['Portfolio optimization & strategic allocation','Asset diversification strategy development','Performance benchmarking & comparison','Risk-return analysis & trade-off evaluation','Portfolio rebalancing & adjustment','Strategic investment recommendations'];
  const activities = [{time:'2 min ago',text:'Rebalanced $500M portfolio for Q3 targets',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Benchmarked 12 assets against industry indices',icon:BarChart3,color:'#007AFF'},{time:'30 min ago',text:'Identified 3 underperforming assets for review',icon:AlertTriangle,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/portfolio/allocation',description:'Asset allocation data',method:'GET'},
    {endpoint:'/portfolio/rebalance',description:'Portfolio rebalancing',method:'POST'},
    {endpoint:'/portfolio/benchmark',description:'Performance benchmarks',method:'GET'},
    {endpoint:'/portfolio/recommend',description:'Strategic recommendations',method:'GET'}
  ];

  const renderAllocation = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Current Allocation</Text>
        {allocations.map((item, index) => (
          <View key={index} style={styles.allocCard}>
            <View style={styles.allocHeader}>
              <Text style={[styles.allocSector, { color: theme.colors.text }]}>{item.sector}</Text>
              <View style={[styles.varianceBadge, { backgroundColor: item.variance > 0 ? '#FF3B3022' : item.variance < 0 ? '#34C75922' : '#E5E5EA' }]}>
                <Text style={[styles.varianceText, { color: item.variance > 0 ? '#FF3B30' : item.variance < 0 ? '#34C759' : '#666' }]}>{item.variance > 0 ? '+' : ''}{item.variance}%</Text>
              </View>
            </View>
            <View style={styles.allocBar}><View style={[styles.allocFill, { width: `${item.current}%`, backgroundColor: '#558B2F' }]} /></View>
            <View style={styles.allocMetrics}>
              <Text style={[styles.allocValue, { color: theme.colors.text }]}>{item.value}</Text>
              <Text style={[styles.allocProps, { color: theme.colors.textSecondary }]}>{item.properties} properties</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderRecommendations = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Recommendations</Text>
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.recCard}>
            <View style={styles.recHeader}>
              <View style={[styles.actionBadge, { backgroundColor: rec.action === 'Reduce' ? '#FF3B3022' : rec.action === 'Increase' ? '#34C75922' : rec.action === 'Hold' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.actionText, { color: rec.action === 'Reduce' ? '#FF3B30' : rec.action === 'Increase' ? '#34C759' : rec.action === 'Hold' ? '#007AFF' : '#FF9500' }]}>{rec.action}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: rec.priority === 'high' ? '#FF3B3022' : rec.priority === 'medium' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: rec.priority === 'high' ? '#FF3B30' : rec.priority === 'medium' ? '#FF9500' : '#34C759' }]}>{rec.priority}</Text>
              </View>
            </View>
            <Text style={[styles.recAsset, { color: theme.colors.text }]}>{rec.asset}</Text>
            <Text style={[styles.recAmount, { color: theme.colors.textSecondary }]}>{rec.amount} • {rec.reason}</Text>
            <Text style={[styles.recTimeline, { color: '#558B2F' }]}>Timeline: {rec.timeline}</Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderBenchmarks = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance vs Benchmarks</Text>
        {benchmarks.map((bench, index) => (
          <View key={index} style={styles.benchCard}>
            <View style={styles.benchHeader}>
              <Text style={[styles.benchIndex, { color: theme.colors.text }]}>{bench.index}</Text>
              <View style={[styles.rankBadge, { backgroundColor: '#FFD70022' }]}>
                <Text style={[styles.rankText, { color: '#FFD700' }]}>#{bench.ranking}</Text>
              </View>
            </View>
            <View style={styles.benchMetrics}>
              <View style={styles.benchMetric}><Text style={[styles.benchValue, { color: theme.colors.text }]}>{bench.return}%</Text><Text style={[styles.benchLabel, { color: theme.colors.textSecondary }]}>Return</Text></View>
              <View style={styles.benchMetric}><Text style={[styles.benchValue, { color: '#34C759' }]}>+{bench.alpha}%</Text><Text style={[styles.benchLabel, { color: theme.colors.textSecondary }]}>Alpha</Text></View>
              <View style={styles.benchMetric}><Text style={[styles.benchValue, { color: theme.colors.text }]}>{bench.quarter}</Text><Text style={[styles.benchLabel, { color: theme.colors.textSecondary }]}>Quarter</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Rebalance</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically rebalance based on targets</Text></View><Switch value={autoRebalance} onValueChange={setAutoRebalance} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calculator size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Analysis</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}>
          <Briefcase size={56} color="#558B2F" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Portfolio Strategy Advisor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Chief Real Estate Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['allocation','recommendations','benchmarks','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'allocation' && renderAllocation()}
      {activeTab === 'recommendations' && renderRecommendations()}
      {activeTab === 'benchmarks' && renderBenchmarks()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/creo')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Briefcase size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Real Estate Officer</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>

      <AgentFeatures agentId="portfolio-strategy-advisor" agentName="AI Portfolio Strategy Advisor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},allocCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},allocHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},allocSector:{fontSize:15,fontWeight:'600'},varianceBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},varianceText:{fontSize:12,fontWeight:'600'},allocBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},allocFill:{height:'100%',borderRadius:4},allocMetrics:{flexDirection:'row',justifyContent:'space-between'},allocValue:{fontSize:14,fontWeight:'600'},allocProps:{fontSize:12,color:'#666'},recCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},recHeader:{flexDirection:'row',justifyContent:'space-between',marginBottom:8},actionBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},actionText:{fontSize:12,fontWeight:'600'},priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},recAsset:{fontSize:15,fontWeight:'600',marginBottom:4},recAmount:{fontSize:13,color:'#666',marginBottom:4},recTimeline:{fontSize:12,fontWeight:'600'},benchCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},benchHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},benchIndex:{fontSize:15,fontWeight:'600'},rankBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},rankText:{fontSize:14,fontWeight:'700'},benchMetrics:{flexDirection:'row',justifyContent:'space-between'},benchMetric:{alignItems:'center'},benchValue:{fontSize:14,fontWeight:'600'},benchLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
