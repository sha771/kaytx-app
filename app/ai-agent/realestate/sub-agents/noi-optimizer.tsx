import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, DollarSign, Building2, Settings as SettingsIcon, RefreshCw, Download, BarChart3, Percent, TrendingDown, Wallet, Calculator } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function NoiOptimizerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('opportunities');
  const [autoOptimize, setAutoOptimize] = React.useState(true);

  const stats = [
    {label:'NOI',value:'$48M',icon: DollarSign,color:'#34C759'},
    {label:'Growth',value:'12%',icon: TrendingUp,color:'#007AFF'},
    {label:'Opportunities',value:'15',icon: Calculator,color:'#FF9500'},
    {label:'Savings',value:'$2M',icon: Wallet,color:'#558B2F'}
  ];

  const opportunities = [
    {property:'Harbor View Tower',type:'Revenue',impact:'$450K',description:'Rent increase for 50 units at renewal',timeline:'Q2 2026',priority:'high',status:'analyzing'},
    {property:'Tech Campus',type:'Expense',impact:'$320K',description:'Energy efficiency upgrades',timeline:'Q3 2026',priority:'medium',status:'pending'},
    {property:'Industrial Hub',type:'CAM',impact:'$180K',description:'CAM expense reconciliation',timeline:'Q1 2026',priority:'high',status:'approved'},
    {property:'Oakwood Plaza',type:'Revenue',impact:'$250K',description:'Lease-up optimization',timeline:'Q2 2026',priority:'medium',status:'pending'},
    {property:'Metro Center',type:'Expense',impact:'$150K',description:'Vendor contract renegotiation',timeline:'Q2 2026',priority:'low',status:'analyzing'}
  ];

  const noiBreakdown = [
    {category:'Rental Income',actual:'$32M',budget:'$30M',variance:6.7,percent:67},
    {category:'CAM Recovery',actual:'$8M',budget:'$7.5M',variance:6.7,percent:17},
    {category:'Parking',actual:'$4M',budget:'$3.8M',variance:5.3,percent:8},
    {category:'Other Income',actual:'$4M',budget:'$3.7M',variance:8.1,percent:8}
  ];

  const expenseAnalysis = [
    {category:'Utilities',actual:'$6.2M',budget:'$6.5M',variance:-4.6,trend:'down',efficiency:'good'},
    {category:'Insurance',actual:'$3.8M',budget:'$3.5M',variance:8.6,trend:'up',efficiency:'warning'},
    {category:'Repairs',actual:'$4.1M',budget:'$3.8M',variance:7.9,trend:'up',efficiency:'warning'},
    {category:'Property Tax',actual:'$5.5M',budget:'$5.2M',variance:5.8,trend:'stable',efficiency:'ok'},
    {category:'Management Fee',actual:'$2.4M',budget:'$2.4M',variance:0,trend:'stable',efficiency:'good'}
  ];

  const capabilities = ['Revenue Optimization','Expense Reduction','NOI Modeling','Rent Optimization','CAM Recovery','Operating Efficiency'];
  const responsibilities = ['Net operating income optimization & modeling','Revenue enhancement strategy identification','Expense reduction opportunity analysis','Rent optimization & market adjustment','CAM recovery maximization','Operating efficiency improvement programs'];
  const activities = [{time:'3 min ago',text:'Increased portfolio NOI by 12% YoY',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Identified $2M in expense reduction opportunities',icon:Wallet,color:'#007AFF'},{time:'30 min ago',text:'Optimized rent schedules for 50 units',icon:TrendingUp,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/noi/opportunities',description:'Optimization opportunities',method:'GET'},
    {endpoint:'/noi/breakdown',description:'NOI breakdown',method:'GET'},
    {endpoint:'/noi/expenses',description:'Expense analysis',method:'GET'},
    {endpoint:'/noi/optimize',description:'Run optimization',method:'POST'}
  ];

  const renderOpportunities = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimization Opportunities</Text>
        {opportunities.map((opp, index) => (
          <View key={index} style={styles.oppCard}>
            <View style={styles.oppHeader}>
              <View style={styles.oppInfo}>
                <Text style={[styles.oppProperty, { color: theme.colors.text }]}>{opp.property}</Text>
                <Text style={[styles.oppDesc, { color: theme.colors.textSecondary }]}>{opp.description}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: opp.type === 'Revenue' ? '#34C75922' : '#007AFF22' }]}>
                <Text style={[styles.typeText, { color: opp.type === 'Revenue' ? '#34C759' : '#007AFF' }]}>{opp.type}</Text>
              </View>
            </View>
            <View style={styles.oppMetrics}>
              <View style={styles.oppMetric}><Text style={[styles.oppValue, { color: '#34C759' }]}>{opp.impact}</Text><Text style={[styles.oppLabel, { color: theme.colors.textSecondary }]}>Impact</Text></View>
              <View style={styles.oppMetric}><Text style={[styles.oppValue, { color: theme.colors.text }]}>{opp.timeline}</Text><Text style={[styles.oppLabel, { color: theme.colors.textSecondary }]}>Timeline</Text></View>
              <View style={styles.oppMetric}><Text style={[styles.oppValue, { color: opp.priority === 'high' ? '#FF3B30' : opp.priority === 'medium' ? '#FF9500' : '#34C759' }]}>{opp.priority}</Text><Text style={[styles.oppLabel, { color: theme.colors.textSecondary }]}>Priority</Text></View>
              <View style={styles.oppMetric}><Text style={[styles.oppValue, { color: theme.colors.text }]}>{opp.status}</Text><Text style={[styles.oppLabel, { color: theme.colors.textSecondary }]}>Status</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderBreakdown = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>NOI Breakdown</Text>
        {noiBreakdown.map((item, index) => (
          <View key={index} style={styles.breakCard}>
            <View style={styles.breakHeader}>
              <Text style={[styles.breakCategory, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.breakVariance, { color: item.variance > 0 ? '#34C759' : '#FF3B30' }]}>{item.variance > 0 ? '+' : ''}{item.variance}%</Text>
            </View>
            <View style={styles.breakBar}><View style={[styles.breakFill, { width: `${item.percent}%`, backgroundColor: '#558B2F' }]} /></View>
            <View style={styles.breakMetrics}>
              <Text style={[styles.breakActual, { color: theme.colors.text }]}>{item.actual}</Text>
              <Text style={[styles.breakBudget, { color: theme.colors.textSecondary }]}>Budget: {item.budget}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderExpenses = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Expense Analysis</Text>
        {expenseAnalysis.map((exp, index) => (
          <View key={index} style={styles.expCard}>
            <View style={styles.expHeader}>
              <Text style={[styles.expCategory, { color: theme.colors.text }]}>{exp.category}</Text>
              <View style={[styles.effBadge, { backgroundColor: exp.efficiency === 'good' ? '#34C75922' : exp.efficiency === 'warning' ? '#FF950022' : '#007AFF22' }]}>
                <Text style={[styles.effText, { color: exp.efficiency === 'good' ? '#34C759' : exp.efficiency === 'warning' ? '#FF9500' : '#007AFF' }]}>{exp.efficiency}</Text>
              </View>
            </View>
            <View style={styles.expMetrics}>
              <View style={styles.expMetric}><Text style={[styles.expValue, { color: theme.colors.text }]}>{exp.actual}</Text><Text style={[styles.expLabel, { color: theme.colors.textSecondary }]}>Actual</Text></View>
              <View style={styles.expMetric}><Text style={[styles.expValue, { color: theme.colors.text }]}>{exp.budget}</Text><Text style={[styles.expLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
              <View style={styles.expMetric}><Text style={[styles.expValue, { color: exp.variance > 0 ? '#FF3B30' : '#34C759' }]}>{exp.variance > 0 ? '+' : ''}{exp.variance}%</Text><Text style={[styles.expLabel, { color: theme.colors.textSecondary }]}>Variance</Text></View>
              <View style={styles.expMetric}>{exp.trend === 'up' ? <TrendingUp size={16} color="#FF3B30" /> : exp.trend === 'down' ? <TrendingDown size={16} color="#34C759" /> : <Activity size={16} color="#007AFF" />}<Text style={[styles.expLabel, { color: theme.colors.textSecondary }]}>{exp.trend}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Optimize</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically identify optimization opportunities</Text></View><Switch value={autoOptimize} onValueChange={setAutoOptimize} trackColor={{true:'#558B2F'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><TrendingUp size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI NOI Optimizer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Property Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['opportunities','breakdown','expenses','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'opportunities' && renderOpportunities()}
      {activeTab === 'breakdown' && renderBreakdown()}
      {activeTab === 'expenses' && renderExpenses()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-property-management')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><TrendingUp size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Property Management</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="noi-optimizer" agentName="AI NOI Optimizer" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},oppCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},oppHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},oppInfo:{flex:1},oppProperty:{fontSize:15,fontWeight:'600'},oppDesc:{fontSize:12,color:'#666',marginTop:2},typeBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},typeText:{fontSize:12,fontWeight:'600'},oppMetrics:{flexDirection:'row',justifyContent:'space-between'},oppMetric:{alignItems:'center'},oppValue:{fontSize:14,fontWeight:'600'},oppLabel:{fontSize:10,color:'#666'},breakCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},breakHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},breakCategory:{fontSize:15,fontWeight:'600'},breakVariance:{fontSize:14,fontWeight:'600'},breakBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},breakFill:{height:'100%',borderRadius:4},breakMetrics:{flexDirection:'row',justifyContent:'space-between'},breakActual:{fontSize:14,fontWeight:'600'},breakBudget:{fontSize:12,color:'#666'},expCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},expHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},expCategory:{fontSize:15,fontWeight:'600'},effBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},effText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},expMetrics:{flexDirection:'row',justifyContent:'space-between'},expMetric:{alignItems:'center'},expValue:{fontSize:14,fontWeight:'600'},expLabel:{fontSize:10,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
