import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingDown, DollarSign, Building2, Calendar, Settings as SettingsIcon, RefreshCw, Download, BarChart3, LineChart, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function MarketCycleAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('cycles');
  const [autoMonitor, setAutoMonitor] = React.useState(true);

  const stats = [
    {label:'Cycles',value:'5',icon: LineChart,color:'#34C759'},
    {label:'Forecast',value:'5Y',icon: TrendingUp,color:'#007AFF'},
    {label:'Indicators',value:'12',icon: BarChart3,color:'#FF9500'},
    {label:'Accuracy',value:'97.9%',icon: Target,color:'#558B2F'}
  ];

  const marketCycles = [
    {sector:'Office',phase:'Expansion',position:65,duration:'24 months',rentGrowth:5.2,capRate:5.8,outlook:'Positive'},
    {sector:'Industrial',phase:'Peak',position:85,duration:'18 months',rentGrowth:8.5,capRate:4.2,outlook:'Caution'},
    {sector:'Retail',phase:'Recovery',position:35,duration:'12 months',rentGrowth:2.1,capRate:7.2,outlook:'Improving'},
    {sector:'Multifamily',phase:'Expansion',position:55,duration:'30 months',rentGrowth:4.8,capRate:5.0,outlook:'Stable'},
    {sector:'Mixed-Use',phase:'Recovery',position:40,duration:'15 months',rentGrowth:3.2,capRate:6.5,outlook:'Improving'}
  ];

  const indicators = [
    {name:'Employment Growth',signal:'Strong',value:3.2,threshold:2.0,trend:'up',impact:'Positive'},
    {name:'Vacancy Rate',signal:'Neutral',value:8.5,threshold:7.0,trend:'down',impact:'Neutral'},
    {name:'Construction Starts',signal:'High',value:125,threshold:100,trend:'up',impact:'Negative'},
    {name:'Absorption',signal:'Strong',value:450000,threshold:200000,trend:'up',impact:'Positive'},
    {name:'Rent Growth',signal:'Moderate',value:4.2,threshold:3.0,trend:'stable',impact:'Positive'},
    {name:'Cap Rate',signal:'Low',value:5.2,threshold:6.0,trend:'down',impact:'Negative'}
  ];

  const forecasts = [
    {sector:'Office',year1:3.5,year2:4.2,year3:5.1,year5:6.2,probability:72},
    {sector:'Industrial',year1:6.5,year2:4.2,year3:3.1,year5:4.5,probability:58},
    {sector:'Retail',year1:2.1,year3.5,year3:4.2,year5:5.5,probability:65},
    {sector:'Multifamily',year1:4.5,year2:4.8,year3:5.2,year5:5.8,probability:78}
  ];

  const capabilities = ['Cycle Detection','Market Timing','Trend Forecasting','Leading Indicators','Historical Analysis','Scenario Planning'];
  const responsibilities = ['Real estate market cycle detection & analysis','Market timing & entry/exit strategy','Trend forecasting & projection modeling','Leading economic indicator monitoring','Historical cycle pattern analysis','Scenario planning & stress testing'];
  const activities = [{time:'3 min ago',text:'Detected early expansion phase in office market',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Updated 5-year cycle forecast model',icon:LineChart,color:'#007AFF'},{time:'30 min ago',text:'Analyzed 30 years of historical cycle data',icon:BarChart3,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/cycle/markets',description:'Market cycle data',method:'GET'},
    {endpoint:'/cycle/indicators',description:'Leading indicators',method:'GET'},
    {endpoint:'/cycle/forecast',description:'Cycle forecasts',method:'GET'},
    {endpoint:'/cycle/alerts',description:'Cycle alerts',method:'POST'}
  ];

  const renderCycles = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Cycle Analysis</Text>
        {marketCycles.map((cycle, index) => (
          <View key={index} style={styles.cycleCard}>
            <View style={styles.cycleHeader}>
              <Text style={[styles.cycleSector, { color: theme.colors.text }]}>{cycle.sector}</Text>
              <View style={[styles.phaseBadge, { backgroundColor: cycle.phase === 'Peak' ? '#FF3B3022' : cycle.phase === 'Expansion' ? '#34C75922' : cycle.phase === 'Recovery' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.phaseText, { color: cycle.phase === 'Peak' ? '#FF3B30' : cycle.phase === 'Expansion' ? '#34C759' : cycle.phase === 'Recovery' ? '#007AFF' : '#FF9500' }]}>{cycle.phase}</Text>
              </View>
            </View>
            <View style={styles.cycleBar}><View style={[styles.cycleFill, { width: `${cycle.position}%`, backgroundColor: cycle.position > 70 ? '#FF3B30' : cycle.position > 40 ? '#34C759' : '#007AFF' }]} /></View>
            <View style={styles.cycleMetrics}>
              <View style={styles.cycleMetric}><Text style={[styles.cycleValue, { color: theme.colors.text }]}>{cycle.duration}</Text><Text style={[styles.cycleLabel, { color: theme.colors.textSecondary }]}>Duration</Text></View>
              <View style={styles.cycleMetric}><Text style={[styles.cycleValue, { color: '#34C759' }]}>{cycle.rentGrowth}%</Text><Text style={[styles.cycleLabel, { color: theme.colors.textSecondary }]}>Rent Growth</Text></View>
              <View style={styles.cycleMetric}><Text style={[styles.cycleValue, { color: '#558B2F' }]}>{cycle.capRate}%</Text><Text style={[styles.cycleLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text></View>
              <View style={styles.cycleMetric}><Text style={[styles.cycleValue, { color: cycle.outlook === 'Positive' ? '#34C759' : cycle.outlook === 'Caution' ? '#FF3B30' : '#007AFF' }]}>{cycle.outlook}</Text><Text style={[styles.cycleLabel, { color: theme.colors.textSecondary }]}>Outlook</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderIndicators = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Leading Indicators</Text>
        {indicators.map((ind, index) => (
          <View key={index} style={styles.indCard}>
            <View style={styles.indHeader}>
              <Text style={[styles.indName, { color: theme.colors.text }]}>{ind.name}</Text>
              <View style={[styles.signalBadge, { backgroundColor: ind.signal === 'Strong' ? '#34C75922' : ind.signal === 'Moderate' ? '#007AFF22' : ind.signal === 'High' ? '#FF3B3022' : '#FF950022' }]}>
                <Text style={[styles.signalText, { color: ind.signal === 'Strong' ? '#34C759' : ind.signal === 'Moderate' ? '#007AFF' : ind.signal === 'High' ? '#FF3B30' : '#FF9500' }]}>{ind.signal}</Text>
              </View>
            </View>
            <View style={styles.indMetrics}>
              <View style={styles.indMetric}><Text style={[styles.indValue, { color: theme.colors.text }]}>{typeof ind.value === 'number' && ind.value > 1000 ? (ind.value/1000).toFixed(0) + 'K' : ind.value}</Text><Text style={[styles.indLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
              <View style={styles.indMetric}><Text style={[styles.indValue, { color: theme.colors.text }]}>{ind.threshold}</Text><Text style={[styles.indLabel, { color: theme.colors.textSecondary }]}>Threshold</Text></View>
              <View style={styles.indMetric}>{ind.trend === 'up' ? <ArrowUpRight size={18} color="#34C759" /> : ind.trend === 'down' ? <ArrowDownRight size={18} color="#FF3B30" /> : <TrendingUp size={18} color="#007AFF" />}<Text style={[styles.indLabel, { color: theme.colors.textSecondary }]}>{ind.trend}</Text></View>
              <View style={styles.indMetric}><Text style={[styles.indValue, { color: ind.impact === 'Positive' ? '#34C759' : ind.impact === 'Negative' ? '#FF3B30' : '#007AFF' }]}>{ind.impact}</Text><Text style={[styles.indLabel, { color: theme.colors.textSecondary }]}>Impact</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderForecast = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>5-Year Forecast</Text>
        {forecasts.map((fc, index) => (
          <View key={index} style={styles.fcCard}>
            <View style={styles.fcHeader}>
              <Text style={[styles.fcSector, { color: theme.colors.text }]}>{fc.sector}</Text>
              <View style={[styles.probBadge, { backgroundColor: fc.probability > 70 ? '#34C75922' : fc.probability > 60 ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.probText, { color: fc.probability > 70 ? '#34C759' : fc.probability > 60 ? '#007AFF' : '#FF9500' }]}>{fc.probability}%</Text>
              </View>
            </View>
            <View style={styles.fcMetrics}>
              <View style={styles.fcMetric}><Text style={[styles.fcValue, { color: theme.colors.text }]}>{fc.year1}%</Text><Text style={[styles.fcLabel, { color: theme.colors.textSecondary }]}>Y1</Text></View>
              <View style={styles.fcMetric}><Text style={[styles.fcValue, { color: theme.colors.text }]}>{fc.year2}%</Text><Text style={[styles.fcLabel, { color: theme.colors.textSecondary }]}>Y2</Text></View>
              <View style={styles.fcMetric}><Text style={[styles.fcValue, { color: theme.colors.text }]}>{fc.year3}%</Text><Text style={[styles.fcLabel, { color: theme.colors.textSecondary }]}>Y3</Text></View>
              <View style={styles.fcMetric}><Text style={[styles.fcValue, { color: theme.colors.text }]}>{fc.year5}%</Text><Text style={[styles.fcLabel, { color: theme.colors.textSecondary }]}>Y5</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Monitor</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically monitor cycle indicators</Text></View><Switch value={autoMonitor} onValueChange={setAutoMonitor} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><LineChart size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Analysis</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><TrendingUp size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Market Cycle Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Chief Real Estate Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['cycles','indicators','forecast','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'cycles' && renderCycles()}
      {activeTab === 'indicators' && renderIndicators()}
      {activeTab === 'forecast' && renderForecast()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/creo')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><TrendingUp size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Real Estate Officer</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="market-cycle-analyst" agentName="AI Market Cycle Analyst" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},cycleCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},cycleHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},cycleSector:{fontSize:15,fontWeight:'600'},phaseBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},phaseText:{fontSize:12,fontWeight:'600'},cycleBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},cycleFill:{height:'100%',borderRadius:4},cycleMetrics:{flexDirection:'row',justifyContent:'space-between'},cycleMetric:{alignItems:'center'},cycleValue:{fontSize:13,fontWeight:'600'},cycleLabel:{fontSize:10,color:'#666'},indCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},indHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},indName:{fontSize:15,fontWeight:'600'},signalBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},signalText:{fontSize:12,fontWeight:'600'},indMetrics:{flexDirection:'row',justifyContent:'space-between'},indMetric:{alignItems:'center'},indValue:{fontSize:14,fontWeight:'600'},indLabel:{fontSize:10,color:'#666'},fcCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},fcHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},fcSector:{fontSize:15,fontWeight:'600'},probBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},probText:{fontSize:14,fontWeight:'700'},fcMetrics:{flexDirection:'row',justifyContent:'space-between'},fcMetric:{alignItems:'center'},fcValue:{fontSize:14,fontWeight:'600'},fcLabel:{fontSize:11,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
