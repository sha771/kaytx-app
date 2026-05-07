import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ChartBarBig, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, MapPin, Settings as SettingsIcon, RefreshCw, Download, BarChart3, CheckCircle, XCircle, AlertTriangle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function FeasibilityAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('studies');
  const [autoAnalyze, setAutoAnalyze] = React.useState(true);

  const stats = [
    {label:'Studies',value:'24',icon: BarChart3,color:'#34C759'},
    {label:'Approved',value:'18',icon: CheckCircle,color:'#007AFF'},
    {label:'Rejected',value:'6',icon: XCircle,color:'#FF3B30'},
    {label:'Value',value:'$2.4B',icon: DollarSign,color:'#FF9500'}
  ];

  const studies = [
    {project:'Harbor View Tower',type:'Mixed-Use',budget:'$125M',irr:18.5,capRate:6.2,goNoGo:'go',risk:'medium',status:'completed',date:'2026-01-15'},
    {project:'Tech Campus Phase 2',type:'Office',budget:'$95M',irr:15.2,capRate:5.8,goNoGo:'go',risk:'low',status:'completed',date:'2026-01-20'},
    {project:'Mixed-Use Development',type:'Mixed-Use',budget:'$180M',irr:12.1,capRate:5.1,goNoGo:'no-go',risk:'high',status:'completed',date:'2026-01-25'},
    {project:'Retail Center Expansion',type:'Retail',budget:'$65M',irr:14.8,capRate:6.5,goNoGo:'go',risk:'medium',status:'in-progress',date:'2026-02-01'},
    {project:'Industrial Facility',type:'Industrial',budget:'$85M',irr:19.2,capRate:7.1,goNoGo:'go',risk:'low',status:'completed',date:'2026-02-05'}
  ];

  const financials = [
    {category:'Acquisition',amount:'$45M',percent:18},
    {category:'Hard Costs',amount:'$165M',percent:66},
    {category:'Soft Costs',amount:'$25M',percent:10},
    {category:'Financing',amount:'$15M',percent:6}
  ];

  const sites = [
    {name:'Downtown Site A',location:'123 Main St',zoning:'Mixed-Use',acres:2.5,availability:'Available',entitlement:'Approved',risk:'low'},
    {name:'Suburban Site B',location:'456 Oak Ave',zoning:'Commercial',acres:5.0,availability:'Under Contract',entitlement:'Pending',risk:'medium'},
    {name:'Urban Site C',location:'789 Harbor Blvd',zoning:'Mixed-Use',acres:1.8,availability:'Available',entitlement:'In Review',risk:'high'},
    {name:'Industrial Site D',location:'321 Industrial Pkwy',zoning:'Industrial',acres:8.0,availability:'Available',entitlement:'Approved',risk:'low'}
  ];

  const capabilities = ['Feasibility Studies','Financial Modeling','Site Analysis','Regulatory Review','Risk Assessment','Go/No-Go Analysis'];
  const responsibilities = ['Development feasibility study execution','Financial modeling & pro forma development','Site analysis & due diligence','Regulatory & zoning review','Development risk assessment','Go/no-go recommendation & analysis'];
  const activities = [{time:'3 min ago',text:'Completed feasibility study for $100M mixed-use',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Analyzed zoning for 5 potential sites',icon:MapPin,color:'#007AFF'},{time:'30 min ago',text:'Recommended go decision on 3 of 5 projects',icon:CheckCircle,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/feasibility/studies',description:'Feasibility studies',method:'GET'},
    {endpoint:'/feasibility/financials',description:'Financial models',method:'GET'},
    {endpoint:'/feasibility/sites',description:'Site analysis',method:'GET'},
    {endpoint:'/feasibility/analyze',description:'Run analysis',method:'POST'}
  ];

  const renderStudies = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feasibility Studies</Text>
        {studies.map((study, index) => (
          <View key={index} style={styles.studyCard}>
            <View style={styles.studyHeader}>
              <View style={styles.studyInfo}>
                <Text style={[styles.studyName, { color: theme.colors.text }]}>{study.project}</Text>
                <Text style={[styles.studyType, { color: theme.colors.textSecondary }]}>{study.type}</Text>
              </View>
              <View style={[styles.decisionBadge, { backgroundColor: study.goNoGo === 'go' ? '#34C75922' : '#FF3B3022' }]}>
                <Text style={[styles.decisionText, { color: study.goNoGo === 'go' ? '#34C759' : '#FF3B30' }]}>{study.goNoGo}</Text>
              </View>
            </View>
            <View style={styles.studyMetrics}>
              <View style={styles.studyMetric}><Text style={[styles.studyValue, { color: theme.colors.text }]}>{study.budget}</Text><Text style={[styles.studyLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
              <View style={styles.studyMetric}><Text style={[styles.studyValue, { color: '#34C759' }]}>{study.irr}%</Text><Text style={[styles.studyLabel, { color: theme.colors.textSecondary }]}>IRR</Text></View>
              <View style={styles.studyMetric}><Text style={[styles.studyValue, { color: theme.colors.text }]}>{study.capRate}%</Text><Text style={[styles.studyLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text></View>
              <View style={styles.studyMetric}><Text style={[styles.studyValue, { color: study.risk === 'low' ? '#34C759' : study.risk === 'medium' ? '#FF9500' : '#FF3B30' }]}>{study.risk}</Text><Text style={[styles.studyLabel, { color: theme.colors.textSecondary }]}>Risk</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderFinancials = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cost Breakdown</Text>
        {financials.map((item, index) => (
          <View key={index} style={styles.costCard}>
            <View style={styles.costHeader}>
              <Text style={[styles.costCategory, { color: theme.colors.text }]}>{item.category}</Text>
              <Text style={[styles.costAmount, { color: theme.colors.text }]}>{item.amount}</Text>
            </View>
            <View style={styles.costBar}><View style={[styles.costFill, { width: `${item.percent}%`, backgroundColor: '#558B2F' }]} /></View>
            <Text style={[styles.costPercent, { color: theme.colors.textSecondary }]}>{item.percent}% of total</Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderSites = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Site Analysis</Text>
        {sites.map((site, index) => (
          <View key={index} style={styles.siteCard}>
            <View style={styles.siteHeader}>
              <View style={styles.siteInfo}>
                <Text style={[styles.siteName, { color: theme.colors.text }]}>{site.name}</Text>
                <Text style={[styles.siteLocation, { color: theme.colors.textSecondary }]}>{site.location}</Text>
              </View>
              <View style={[styles.riskBadge, { backgroundColor: site.risk === 'low' ? '#34C75922' : site.risk === 'medium' ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.riskText, { color: site.risk === 'low' ? '#34C759' : site.risk === 'medium' ? '#FF9500' : '#FF3B30' }]}>{site.risk}</Text>
              </View>
            </View>
            <View style={styles.siteMetrics}>
              <View style={styles.siteMetric}><Text style={[styles.siteValue, { color: theme.colors.text }]}>{site.zoning}</Text><Text style={[styles.siteLabel, { color: theme.colors.textSecondary }]}>Zoning</Text></View>
              <View style={styles.siteMetric}><Text style={[styles.siteValue, { color: theme.colors.text }]}>{site.acres} acres</Text><Text style={[styles.siteLabel, { color: theme.colors.textSecondary }]}>Size</Text></View>
              <View style={styles.siteMetric}><Text style={[styles.siteValue, { color: theme.colors.text }]}>{site.entitlement}</Text><Text style={[styles.siteLabel, { color: theme.colors.textSecondary }]}>Entitlement</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Analyze</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically run feasibility analysis</Text></View><Switch value={autoAnalyze} onValueChange={setAutoAnalyze} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><BarChart3 size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Analysis</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><ChartBarBig size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Feasibility Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Real Estate Development</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['studies','financials','sites','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'studies' && renderStudies()}
      {activeTab === 'financials' && renderFinancials()}
      {activeTab === 'sites' && renderSites()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-real-estate-development')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><ChartBarBig size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Real Estate Development</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="feasibility-analyst" agentName="AI Feasibility Analyst" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},studyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},studyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},studyInfo:{flex:1},studyName:{fontSize:15,fontWeight:'600'},studyType:{fontSize:12,color:'#666',marginTop:2},decisionBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},decisionText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},studyMetrics:{flexDirection:'row',justifyContent:'space-between'},studyMetric:{alignItems:'center'},studyValue:{fontSize:14,fontWeight:'600'},studyLabel:{fontSize:10,color:'#666'},costCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},costHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},costCategory:{fontSize:15,fontWeight:'600'},costAmount:{fontSize:15,fontWeight:'600'},costBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},costFill:{height:'100%',borderRadius:4},costPercent:{fontSize:12,color:'#666'},siteCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},siteHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},siteInfo:{flex:1},siteName:{fontSize:15,fontWeight:'600'},siteLocation:{fontSize:12,color:'#666',marginTop:2},riskBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},riskText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},siteMetrics:{flexDirection:'row',justifyContent:'space-between'},siteMetric:{alignItems:'center'},siteValue:{fontSize:14,fontWeight:'600'},siteLabel:{fontSize:10,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
