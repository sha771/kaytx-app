import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, AlertTriangle, FileText, CheckCircle, XCircle, Settings as SettingsIcon, RefreshCw, Download, Send, Ban } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function LeaseEnforcerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('violations');
  const [autoMonitor, setAutoMonitor] = React.useState(true);

  const stats = [
    {label:'Violations',value:'12',icon: AlertTriangle,color:'#FF3B30'},
    {label:'Cure Notices',value:'8',icon: FileText,color:'#FF9500'},
    {label:'Resolved',value:'15',icon: CheckCircle,color:'#34C759'},
    {label:'Defaults',value:'3',icon: Ban,color:'#558B2F'}
  ];

  const violations = [
    {tenant:'Acme Corp',property:'Tech Campus',type:'Late Payment',severity:'high',status:'pending',date:'2026-02-01',daysOpen:5},
    {tenant:'StartUp Inc',property:'Harbor View',type:'Unauthorized Use',severity:'medium',status:'under-review',date:'2026-01-28',daysOpen:8},
    {tenant:'Tech Solutions',property:'Metro Center',type:'Pet Violation',severity:'low',status:'cured',date:'2026-01-20',daysOpen:12},
    {tenant:'DataFlow LLC',property:'Industrial Hub',type:'Subletting',severity:'high',status:'pending',date:'2026-02-05',daysOpen:2},
    {tenant:'Cloud Nine',property:'Oakwood Plaza',type:'Noise Complaint',severity:'medium',status:'under-review',date:'2026-02-03',daysOpen:4}
  ];

  const enforcement = [
    {action:'Cure Notice',issued:8,pending:3,completed:5,avgDays:10},
    {action:'Lease Warning',issued:5,pending:2,completed:3,avgDays:7},
    {action:'Compliance Meeting',issued:3,pending:1,completed:2,avgDays:14},
    {action:'Legal Notice',issued:2,pending:2,completed:0,avgDays:5}
  ];

  const defaults = [
    {tenant:'Retail King',property:'Downtown Plaza',type:'Non-Payment',amount:'$45,000',status:'negotiating',timeline:'30 days',resolution:'Payment plan'},
    {tenant:'Food Court LLC',property:'Mall Center',type:'Repeated Violations',amount:'N/A',status:'legal',timeline:'60 days',resolution:'Lease termination'},
    {tenant:'Office Plus',property:'Business Park',type:'Insurance Lapse',amount:'$12,000',status:'cured',timeline:'15 days',resolution:'Compliance'}
  ];

  const capabilities = ['Lease Compliance','Violation Tracking','Enforcement Actions','Cure Notices','Default Management','Policy Enforcement'];
  const responsibilities = ['Lease compliance monitoring & enforcement','Violation tracking & documentation','Enforcement action management','Cure notice preparation & delivery','Default management & resolution','Policy enforcement & consistency'];
  const activities = [{time:'3 min ago',text:'Identified 12 lease violations this week',icon:AlertTriangle,color:'#FF3B30'},{time:'15 min ago',text:'Issued 8 cure notices for non-compliance',icon:FileText,color:'#FF9500'},{time:'30 min ago',text:'Resolved 5 default situations through negotiation',icon:CheckCircle,color:'#34C759'}];

  const a2aEndpoints = [
    {endpoint:'/lease/violations',description:'Violation data',method:'GET'},
    {endpoint:'/lease/enforcement',description:'Enforcement actions',method:'GET'},
    {endpoint:'/lease/defaults',description:'Default cases',method:'GET'},
    {endpoint:'/lease/notice',description:'Issue notice',method:'POST'}
  ];

  const renderViolations = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Violations</Text>
        {violations.map((v, index) => (
          <View key={index} style={styles.vioCard}>
            <View style={styles.vioHeader}>
              <View style={styles.vioInfo}>
                <Text style={[styles.vioTenant, { color: theme.colors.text }]}>{v.tenant}</Text>
                <Text style={[styles.vioProperty, { color: theme.colors.textSecondary }]}>{v.property}</Text>
              </View>
              <View style={[styles.severityBadge, { backgroundColor: v.severity === 'high' ? '#FF3B3022' : v.severity === 'medium' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.severityText, { color: v.severity === 'high' ? '#FF3B30' : v.severity === 'medium' ? '#FF9500' : '#34C759' }]}>{v.severity}</Text>
              </View>
            </View>
            <View style={styles.vioDetails}>
              <Text style={[styles.vioType, { color: theme.colors.text }]}>{v.type}</Text>
            </View>
            <View style={styles.vioMetrics}>
              <View style={styles.vioMetric}><Text style={[styles.vioValue, { color: theme.colors.text }]}>{v.date}</Text><Text style={[styles.vioLabel, { color: theme.colors.textSecondary }]}>Reported</Text></View>
              <View style={styles.vioMetric}><Text style={[styles.vioValue, { color: theme.colors.text }]}>{v.daysOpen} days</Text><Text style={[styles.vioLabel, { color: theme.colors.textSecondary }]}>Open</Text></View>
              <View style={[styles.vioMetric, { backgroundColor: v.status === 'cured' ? '#34C75922' : v.status === 'pending' ? '#FF950022' : '#007AFF22', paddingHorizontal:8, paddingVertical:4, borderRadius:8 }]}><Text style={[styles.vioValue, { color: v.status === 'cured' ? '#34C759' : v.status === 'pending' ? '#FF9500' : '#007AFF' }]}>{v.status}</Text><Text style={[styles.vioLabel, { color: theme.colors.textSecondary }]}>Status</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderEnforcement = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enforcement Actions</Text>
        {enforcement.map((e, index) => (
          <View key={index} style={styles.enfCard}>
            <View style={styles.enfHeader}>
              <Text style={[styles.enfAction, { color: theme.colors.text }]}>{e.action}</Text>
              <Text style={[styles.enfAvg, { color: theme.colors.textSecondary }]}>{e.avgDays} days avg</Text>
            </View>
            <View style={styles.enfMetrics}>
              <View style={styles.enfMetric}><Text style={[styles.enfValue, { color: theme.colors.text }]}>{e.issued}</Text><Text style={[styles.enfLabel, { color: theme.colors.textSecondary }]}>Issued</Text></View>
              <View style={styles.enfMetric}><Text style={[styles.enfValue, { color: '#FF9500' }]}>{e.pending}</Text><Text style={[styles.enfLabel, { color: theme.colors.textSecondary }]}>Pending</Text></View>
              <View style={styles.enfMetric}><Text style={[styles.enfValue, { color: '#34C759' }]}>{e.completed}</Text><Text style={[styles.enfLabel, { color: theme.colors.textSecondary }]}>Completed</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderDefaults = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Default Cases</Text>
        {defaults.map((d, index) => (
          <View key={index} style={styles.defCard}>
            <View style={styles.defHeader}>
              <View style={styles.defInfo}>
                <Text style={[styles.defTenant, { color: theme.colors.text }]}>{d.tenant}</Text>
                <Text style={[styles.defProperty, { color: theme.colors.textSecondary }]}>{d.property}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: d.status === 'cured' ? '#34C75922' : d.status === 'negotiating' ? '#007AFF22' : '#FF3B3022' }]}>
                <Text style={[styles.statusText, { color: d.status === 'cured' ? '#34C759' : d.status === 'negotiating' ? '#007AFF' : '#FF3B30' }]}>{d.status}</Text>
              </View>
            </View>
            <View style={styles.defDetails}>
              <Text style={[styles.defType, { color: theme.colors.text }]}>{d.type}</Text>
            </View>
            <View style={styles.defMetrics}>
              <View style={styles.defMetric}><Text style={[styles.defValue, { color: theme.colors.text }]}>{d.amount}</Text><Text style={[styles.defLabel, { color: theme.colors.textSecondary }]}>Amount</Text></View>
              <View style={styles.defMetric}><Text style={[styles.defValue, { color: theme.colors.text }]}>{d.timeline}</Text><Text style={[styles.defLabel, { color: theme.colors.textSecondary }]}>Timeline</Text></View>
              <View style={styles.defMetric}><Text style={[styles.defValue, { color: '#34C759' }]}>{d.resolution}</Text><Text style={[styles.defLabel, { color: theme.colors.textSecondary }]}>Resolution</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Monitor</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically monitor lease compliance</Text></View><Switch value={autoMonitor} onValueChange={setAutoMonitor} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Send size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Send Notice</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><Shield size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Lease Enforcer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Property Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['violations','enforcement','defaults','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'violations' && renderViolations()}
      {activeTab === 'enforcement' && renderEnforcement()}
      {activeTab === 'defaults' && renderDefaults()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/property-manager')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Shield size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Property Manager</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="lease-enforcer" agentName="AI Lease Enforcer" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},vioCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},vioHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8},vioInfo:{flex:1},vioTenant:{fontSize:15,fontWeight:'600'},vioProperty:{fontSize:12,color:'#666',marginTop:2},severityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},severityText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},vioDetails:{marginBottom:12},vioType:{fontSize:14,fontWeight:'500'},vioMetrics:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},vioMetric:{alignItems:'center'},vioValue:{fontSize:14,fontWeight:'600'},vioLabel:{fontSize:10,color:'#666'},enfCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},enfHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},enfAction:{fontSize:15,fontWeight:'600'},enfAvg:{fontSize:12,color:'#666'},enfMetrics:{flexDirection:'row',justifyContent:'space-between'},enfMetric:{alignItems:'center'},enfValue:{fontSize:18,fontWeight:'600'},enfLabel:{fontSize:11,color:'#666'},defCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},defHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8},defInfo:{flex:1},defTenant:{fontSize:15,fontWeight:'600'},defProperty:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},defDetails:{marginBottom:12},defType:{fontSize:14,fontWeight:'500'},defMetrics:{flexDirection:'row',justifyContent:'space-between'},defMetric:{alignItems:'center'},defValue:{fontSize:14,fontWeight:'600'},defLabel:{fontSize:10,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
