import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, CreditCard, AlertCircle, Calendar, Settings as SettingsIcon, RefreshCw, Download, Banknote, Users, Clock3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function RentCollectorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('collections');
  const [autoRemind, setAutoRemind] = React.useState(true);

  const stats = [
    {label:'Collected',value:'$2.5M',icon: Banknote,color:'#34C759'},
    {label:'Delinquency',value:'2%',icon: AlertCircle,color:'#FF3B30'},
    {label:'Payment Plans',value:'8',icon: Calendar,color:'#007AFF'},
    {label:'On-Time',value:'98%',icon: CircleCheckBig,color:'#558B2F'}
  ];

  const collections = [
    {tenant:'Acme Corp',property:'Tech Campus',amount:'$15,000',dueDate:'2026-02-01',status:'paid',daysLate:0,method:'ACH'},
    {tenant:'StartUp Inc',property:'Harbor View',amount:'$8,500',dueDate:'2026-02-01',status:'pending',daysLate:0,method:'Check'},
    {tenant:'Tech Solutions',property:'Metro Center',amount:'$12,000',dueDate:'2026-01-15',status:'late',daysLate:25,method:'ACH'},
    {tenant:'DataFlow LLC',property:'Industrial Hub',amount:'$6,200',dueDate:'2026-01-01',status:'delinquent',daysLate:40,method:'Credit Card'},
    {tenant:'Cloud Nine',property:'Oakwood Plaza',amount:'$9,800',dueDate:'2026-02-01',status:'paid',daysLate:0,method:'ACH'}
  ];

  const delinquency = [
    {range:'Current',count:185,amount:'$0',percent:74},
    {range:'1-30 Days',count:15,amount:'$45,000',percent:6},
    {range:'31-60 Days',count:8,amount:'$68,000',percent:3},
    {range:'60+ Days',count:5,amount:'$52,000',percent:2}
  ];

  const paymentMethods = [
    {method:'ACH Transfer',count:145,amount:'$1.8M',percent:72},
    {method:'Credit Card',count:35,amount:'$420K',percent:17},
    {method:'Check',count:25,amount:'$280K',percent:11},
    {method:'Cash',count:3,amount:'$15K',percent:1}
  ];

  const capabilities = ['Rent Collection','Payment Processing','Delinquency Tracking','Late Fee Management','Payment Plans','Collections Reporting'];
  const responsibilities = ['Rent collection & payment processing','Delinquency tracking & follow-up','Late fee calculation & management','Payment plan administration','Collections reporting & analytics','Automated payment reminders & notifications'];
  const activities = [{time:'3 min ago',text:'Collected $2.5M in rent this month',icon:CircleCheckBig,color:'#34C759'},{time:'15 min ago',text:'Reduced delinquency rate from 5% to 2%',icon:TrendingUp,color:'#007AFF'},{time:'30 min ago',text:'Set up 8 payment plans for struggling tenants',icon:Calendar,color:'#FF9500'}];

  const a2aEndpoints = [
    {endpoint:'/rent/collections',description:'Collection data',method:'GET'},
    {endpoint:'/rent/delinquency',description:'Delinquency tracking',method:'GET'},
    {endpoint:'/rent/payments',description:'Payment processing',method:'GET'},
    {endpoint:'/rent/process',description:'Process payment',method:'POST'}
  ];

  const renderCollections = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Collections</Text>
        {collections.map((col, index) => (
          <View key={index} style={styles.colCard}>
            <View style={styles.colHeader}>
              <View style={styles.colInfo}>
                <Text style={[styles.colTenant, { color: theme.colors.text }]}>{col.tenant}</Text>
                <Text style={[styles.colProperty, { color: theme.colors.textSecondary }]}>{col.property}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: col.status === 'paid' ? '#34C75922' : col.status === 'pending' ? '#007AFF22' : col.status === 'late' ? '#FF950022' : '#FF3B3022' }]}>
                <Text style={[styles.statusText, { color: col.status === 'paid' ? '#34C759' : col.status === 'pending' ? '#007AFF' : col.status === 'late' ? '#FF9500' : '#FF3B30' }]}>{col.status}</Text>
              </View>
            </View>
            <View style={styles.colMetrics}>
              <View style={styles.colMetric}><Text style={[styles.colValue, { color: theme.colors.text }]}>{col.amount}</Text><Text style={[styles.colLabel, { color: theme.colors.textSecondary }]}>Amount</Text></View>
              <View style={styles.colMetric}><Text style={[styles.colValue, { color: theme.colors.text }]}>{col.dueDate}</Text><Text style={[styles.colLabel, { color: theme.colors.textSecondary }]}>Due</Text></View>
              <View style={styles.colMetric}><Text style={[styles.colValue, { color: col.daysLate > 0 ? '#FF3B30' : '#34C759' }]}>{col.daysLate > 0 ? `${col.daysLate} days` : 'On Time'}</Text><Text style={[styles.colLabel, { color: theme.colors.textSecondary }]}>Status</Text></View>
              <View style={styles.colMetric}><Text style={[styles.colValue, { color: theme.colors.text }]}>{col.method}</Text><Text style={[styles.colLabel, { color: theme.colors.textSecondary }]}>Method</Text></View>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderDelinquency = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Delinquency Breakdown</Text>
        {delinquency.map((item, index) => (
          <View key={index} style={styles.delCard}>
            <View style={styles.delHeader}>
              <Text style={[styles.delRange, { color: theme.colors.text }]}>{item.range}</Text>
              <Text style={[styles.delAmount, { color: theme.colors.text }]}>{item.amount}</Text>
            </View>
            <View style={styles.delBar}><View style={[styles.delFill, { width: `${item.percent}%`, backgroundColor: index === 0 ? '#34C759' : index === 1 ? '#FF9500' : '#FF3B30' }]} /></View>
            <View style={styles.delMetrics}>
              <Text style={[styles.delCount, { color: theme.colors.text }]}>{item.count} tenants</Text>
              <Text style={[styles.delPercent, { color: theme.colors.textSecondary }]}>{item.percent}%</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderPayments = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Methods</Text>
        {paymentMethods.map((pm, index) => (
          <View key={index} style={styles.pmCard}>
            <View style={styles.pmHeader}>
              <Text style={[styles.pmMethod, { color: theme.colors.text }]}>{pm.method}</Text>
              <Text style={[styles.pmAmount, { color: theme.colors.text }]}>{pm.amount}</Text>
            </View>
            <View style={styles.pmBar}><View style={[styles.pmFill, { width: `${pm.percent}%`, backgroundColor: '#558B2F' }]} /></View>
            <View style={styles.pmMetrics}>
              <Text style={[styles.pmCount, { color: theme.colors.text }]}>{pm.count} payments</Text>
              <Text style={[styles.pmPercent, { color: theme.colors.textSecondary }]}>{pm.percent}%</Text>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Remind</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically send payment reminders</Text></View><Switch value={autoRemind} onValueChange={setAutoRemind} trackColor={{true:'#558B2F'}} /></View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Banknote size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Run Collection</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><SettingsIcon size={22} color="#558B2F" /><Text style={[styles.actionText, { color: '#558B2F' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#558B2F20' }]}><DollarSign size={56} color="#558B2F" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Rent Collector</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Property Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#558B2F22' }]}><Star size={12} color="#558B2F" /><Text style={[styles.badgeText, { color: '#558B2F' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['collections','delinquency','payments','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#558B2F',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#558B2F' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'collections' && renderCollections()}
      {activeTab === 'delinquency' && renderDelinquency()}
      {activeTab === 'payments' && renderPayments()}
      {activeTab === 'settings' && renderSettings()}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#558B2F18' }]}><Text style={[styles.tagText, { color: '#558B2F' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#558B2F" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{a2aEndpoints.map((ep, i) => (<View key={i} style={styles.endpointRow}><View style={[styles.methodBadge, { backgroundColor: ep.method === 'GET' ? '#007AFF22' : '#34C75922' }]}><Text style={[styles.methodText, { color: ep.method === 'GET' ? '#007AFF' : '#34C759' }]}>{ep.method}</Text></View><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep.endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.color + '15' }]}><act.icon size={14} color={act.color} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/realestate/property-manager')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><DollarSign size={24} color="#33691E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI Property Manager</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="rent-collector" agentName="AI Rent Collector" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},tabsContainer:{flexDirection:'row',marginHorizontal:16,marginTop:16,borderRadius:12,padding:4},tab:{flex:1,alignItems:'center',paddingVertical:10},tabText:{fontSize:13,fontWeight:'600'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},methodBadge:{paddingHorizontal:8,paddingVertical:4,borderRadius:4},methodText:{fontSize:11,fontWeight:'700'},endpointText:{fontSize:13,fontFamily:'monospace',flex:1},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},colCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},colHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},colInfo:{flex:1},colTenant:{fontSize:15,fontWeight:'600'},colProperty:{fontSize:12,color:'#666',marginTop:2},statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},statusText:{fontSize:12,fontWeight:'600',textTransform:'capitalize'},colMetrics:{flexDirection:'row',justifyContent:'space-between'},colMetric:{alignItems:'center'},colValue:{fontSize:14,fontWeight:'600'},colLabel:{fontSize:10,color:'#666'},delCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},delHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},delRange:{fontSize:15,fontWeight:'600'},delAmount:{fontSize:15,fontWeight:'600'},delBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},delFill:{height:'100%',borderRadius:4},delMetrics:{flexDirection:'row',justifyContent:'space-between'},delCount:{fontSize:14,fontWeight:'600'},delPercent:{fontSize:12,color:'#666'},pmCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},pmHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},pmMethod:{fontSize:15,fontWeight:'600'},pmAmount:{fontSize:15,fontWeight:'600'},pmBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:8},pmFill:{height:'100%',borderRadius:4},pmMetrics:{flexDirection:'row',justifyContent:'space-between'},pmCount:{fontSize:14,fontWeight:'600'},pmPercent:{fontSize:12,color:'#666'},settingRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},settingLabel:{fontSize:14,fontWeight:'600'},settingDesc:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#558B2F12'},actionText:{fontSize:13,fontWeight:'600',marginTop:8,color:'#558B2F'}});
