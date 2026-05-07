import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Heart, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, Users, Calendar, Settings as SettingsIcon, RefreshCw, Download, AlertTriangle, Award, UserCheck, Mail } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function TenantRetentionStrategistPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('at-risk');
  const [autoOutreach, setAutoOutreach] = React.useState(true);

  const stats = [
    {label:'Retention',value:'91%',icon: Heart,color:'#34C759'},
    {label:'At-Risk',value:'15',icon: AlertTriangle,color:'#FF3B30'},
    {label:'Renewals',value:'42',icon: UserCheck,color:'#007AFF'},
    {label:'Satisfaction',value:'4.5',icon: Award,color:'#FF9500'}
  ];

  const atRiskTenants = [
    {name:'Acme Corp',property:'Tech Campus',leaseEnd:'2026-03-15',risk:'high',reason:'Lease renewal pending - no response',contact:'John Smith',value:'$180K'},
    {name:'StartUp Inc',property:'Harbor View',leaseEnd:'2026-04-01',risk:'high',reason:'Complaint unresolved',contact:'Jane Doe',value:'$95K'},
    {name:'Tech Solutions',property:'Metro Center',leaseEnd:'2026-05-15',risk:'medium',reason:'Below target satisfaction score',contact:'Mike Johnson',value:'$120K'},
    {name:'DataFlow LLC',property:'Industrial Hub',leaseEnd:'2026-06-30',risk:'low',reason:'Market comparison - rent concern',contact:'Sarah Lee',value:'$85K'},
    {name:'Cloud Nine',property:'Oakwood Plaza',leaseEnd:'2026-07-15',risk:'medium',reason:'Space expansion needed',contact:'Tom Brown',value:'$150K'}
  ];

  const renewals = [
    {tenant:'Global Tech',property:'Tech Campus',currentRent:'$15K',proposedRent:'$16.2K',increase:8,status:'negotiating',timeline:'30 days',incentive:'2 months free'},
    {tenant:'Finance Plus',property:'Metro Center',currentRent:'$12K',proposedRent:'$12.6K',increase:5,status:'approved',timeline:'15 days',incentive:'Parking upgrade'},
    {tenant:'HealthCare Inc',property:'Harbor View',currentRent:'$18K',proposedRent:'$19.8K',increase:10,status:'pending',timeline:'45 days',incentive:'None'},
    {tenant:'Retail King',property:'Oakwood Plaza',currentRent:'$8K',proposedRent:'$8.4K',increase:5,status:'negotiating',timeline:'60 days',incentive:'Tenant improvement'}
  ];

  const satisfaction = [
    {category:'Overall',score:4.5,trend:'up',response:92},
    {category:'Maintenance',score:4.2,trend:'up',response:88},
    {category:'Communication',score:4.7,trend:'stable',response:95},
    {category:'Amenities',score:4.0,trend:'down',response:82},
    {category:'Location',score:4.8,trend:'stable',response:97}
  ];

  const capabilities = ['Retention Strategy','Churn Prediction','Renewal Negotiation','Satisfaction Analysis','Loyalty Programs','Engagement Tracking'];
  const responsibilities = ['Tenant retention strategy development','Churn prediction & early warning systems','Lease renewal negotiation & incentives','Tenant satisfaction analysis & improvement','Loyalty program design & management','Tenant engagement tracking & reporting'];
  const activities = [{time:'3 min ago',text:'Improved retention rate from 78% to 91%',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Predicted 15 at-risk tenants for outreach',icon:AlertTriangle,color:'#FF3B30'},{time:'30 min ago',text:'Designed loyalty program for top 20 tenants',icon:Award,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/retention/at-risk',description:'At-risk tenants',method:'GET'},
    {endpoint:'/retention/renewals',description:'Renewal data',method:'GET'},
    {endpoint:'/retention/satisfaction',description:'Satisfaction scores',method:'GET'},
    {endpoint:'/retention/outreach',description:'Send outreach',method:'POST'}
  ];

  const renderAtRisk = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Tenants</Text>
        {atRiskTenants.map((tenant, index) => (
          <View key={index} style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <View style={styles.riskInfo}>
                <Text style={[styles.riskName, { color: theme.colors.text }]}>{tenant.name}</Text>
                <Text style={[styles.riskProperty, { color: theme.colors.textSecondary }]}>{tenant.property}</Text>
              </View>
              <View style={[styles.riskBadge, { backgroundColor: tenant.risk === 'high' ? '#FF3B3022' : tenant.risk === 'medium' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.riskText, { color: tenant.risk === 'high' ? '#FF3B30' : tenant.risk === 'medium' ? '#FF9500' : '#34C759' }]}>{tenant.risk}</Text>
              </View>
            </View>
            <Text style={[styles.riskReason, { color: theme.colors.textSecondary }]}>{tenant.reason}</Text>
            <View style={styles.riskMetrics}>
              <View style={styles.riskMetric}><Text style={[styles.riskValue, { color: theme.colors.text }]}>{tenant.leaseEnd}</Text><Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Lease End</Text></View>
              <View style={styles.riskMetric}><Text style={[styles.riskValue, { color: theme.colors.text }]}>{tenant.contact}</Text><Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Contact</Text></View>
              <View style={styles.riskMetric}><Text style={[styles.riskValue, { color: '#34C759' }]}>{tenant.value}</Text><Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderRenewals = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Renewal Pipeline</Text>
        {renewals.map((renewal, index) => (
          <View key={index} style={styles.renewCard}>
            <View style={styles.renewHeader}>
              <View style={styles.renewInfo}>
                <Text style={[styles.renewTenant, { color: theme.colors.text }]}>{renewal.tenant}</Text>
                <Text style={[styles.renewProperty, { color: theme.colors.textSecondary }]}>{renewal.property}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: renewal.status === 'approved' ? '#34C75922' : renewal.status === 'negotiating' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: renewal.status === 'approved' ? '#34C759' : renewal.status === 'negotiating' ? '#007AFF' : '#FF9500' }]}>{renewal.status}</Text>
              </View>
            </View>
            <View style={styles.renewMetrics}>
              <View style={styles.renewMetric}><Text style={[styles.renewValue, { color: theme.colors.text }]}>{renewal.currentRent}</Text><Text style={[styles.renewLabel, { color: theme.colors.textSecondary }]}>Current</Text></View>
              <View style={styles.renewMetric}><Text style={[styles.renewValue, { color: '#34C759' }]}>{renewal.proposedRent}</Text><Text style={[styles.renewLabel, { color: theme.colors.textSecondary }]}>Proposed</Text></View>
              <View style={styles.renewMetric}><Text style={[styles.renewValue, { color: theme.colors.text }]}>{renewal.increase}%</Text><Text style={[styles.renewLabel, { color: theme.colors.textSecondary }]}>Increase</Text></View>
              <View style={styles.renewMetric}><Text style={[styles.renewValue, { color: theme.colors.text }]}>{renewal.timeline}</Text><Text style={[styles.renewLabel, { color: theme.colors.textSecondary }]}>Timeline</Text></View>
            </View>
            <View style={[styles.incentiveBadge, { backgroundColor: '#558B2F18' }]}>
              <Text style={[styles.incentiveText, { color: '#558B2F' }]}>Incentive: {renewal.incentive}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSatisfaction = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Satisfaction Scores</Text>
        {satisfaction.map((item, index) => (
          <View key={index} style={styles.satCard}>
            <View style={styles.satHeader}>
              <Text style={[styles.satCategory, { color: theme.colors.text }]}>{item.category}</Text>
              <View style={styles.satTrend}>{item.trend === 'up' ? <TrendingUp size={16} color="#34C759" /> : item.trend === 'down' ? <TrendingUp size={16} color="#FF3B30" style={{transform:[{rotate:'180deg'}]}} /> : <Activity size={16} color="#007AFF" />}</View>
            </View>
            <View style={styles.satBar}><View style={[styles.satFill, { width: `${(item.score/5)*100}%`, backgroundColor: item.score >= 4.5 ? '#34C759' : item.score >= 4 ? '#007AFF' : '#FF9500' }]} /></View>
            <View style={styles.satMetrics}>
              <Text style={[styles.satScore, { color: theme.colors.text }]}>{item.score}/5</Text>
              <Text style={[styles.satResponse, { color: theme.colors.textSecondary }]}>{item.response}% response</Text>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Outreach</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically outreach to at-risk tenants</Text></View><Switch value={autoOutreach} onValueChange={setAutoOutreach} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Mail size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Send Outreach</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><Heart size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Tenant Retention Strategist</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Property Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['at-risk','renewals','satisfaction','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'at-risk' && renderAtRisk()}
      {activeTab === 'renewals' && renderRenewals()}
      {activeTab === 'satisfaction' && renderSatisfaction()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/vp-property-management')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Heart size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Property Management</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="tenant-retention-strategist" agentName="AI Tenant Retention Strategist" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},riskCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},riskHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8},riskInfo:{flex:1},riskName:{fontSize:15,fontWeight:'600'},riskProperty:{fontSize:12,color:'#666',marginTop:2},riskBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},riskText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},riskReason:{fontSize:13,color:'#666',marginBottom:12},riskMetrics:{flexDirection:'row',justifyContent:'space-between'},riskMetric:{alignItems:'center'},riskValue:{fontSize:13,fontWeight:'600'},riskLabel:{fontSize:10,color:'#666'},renewCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},renewHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},renewInfo:{flex:1},renewTenant:{fontSize:15,fontWeight:'600'},renewProperty:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},renewMetrics:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},renewMetric:{alignItems:'center'},renewValue:{fontSize:14,fontWeight:'600'},renewLabel:{fontSize:10,color:'#666'},incentiveBadge:{paddingHorizontal:12,paddingVertical:8,borderRadius:8},incentiveText:{fontSize:12,fontWeight:'600'},satCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},satHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},satCategory:{fontSize:15,fontWeight:'600'},satTrend:{marginLeft:8},satBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},satFill:{height:'100%',borderRadius:4},satMetrics:{flexDirection:'row',justifyContent:'space-between'},satScore:{fontSize:14,fontWeight:'600'},satResponse:{fontSize:12,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
