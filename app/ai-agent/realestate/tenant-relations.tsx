import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Calendar, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, MessageSquare, Mail, Phone, UserCheck, ThumbsUp, ThumbsDown, StarIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function TenantRelationsPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('issues');
  const [autoRespond, setAutoRespond] = React.useState(true);

  const stats = [
    {label:'Open Issues',value:'24',icon: AlertTriangle,color:'#FF9500'},
    {label:'Resolved',value:'892',icon: CircleCheckBig,color:'#34C759'},
    {label:'Satisfaction',value:'4.6/5',icon: StarIcon,color:'#33691E'},
    {label:'Response',value:'1.1s',icon: Clock,color:'#007AFF'}
  ];

  const openIssues = [
    {id:1,tenant:'John Smith',unit:'Riverside 204',issue:'HVAC not cooling',status:'in-progress',priority:'high',daysOpen:3,property:'Riverside Apartments'},
    {id:2,tenant:'Sarah Johnson',unit:'Metro 508',issue:'Parking spot dispute',status:'pending',priority:'medium',daysOpen:1,property:'Metro Center'},
    {id:3,tenant:'Mike Davis',unit:'Oakwood 112',issue:'Noise complaint',status:'resolved',priority:'low',daysOpen:2,property:'Oakwood Plaza'},
    {id:4,tenant:'Emily Chen',unit:'Sunset 301',issue:'Water leak in bathroom',status:'in-progress',priority:'critical',daysOpen:0,property:'Sunset Retail'}
  ];

  const communicationLog = [
    {tenant:'TechCorp Inc',type:'email',subject:'Lease renewal',date:'2026-02-10',status:'sent',responseTime:'2h'},
    {tenant:'Metro Health',type:'call',subject:'Maintenance follow-up',date:'2026-02-09',status:'completed',responseTime:'15m'},
    {tenant:'RetailMax',type:'message',subject:'Move-out notice',date:'2026-02-08',status:'pending',responseTime:'N/A'},
    {tenant:'Office Solutions',type:'email',subject:'Rent payment inquiry',date:'2026-02-07',status:'replied',responseTime:'45m'}
  ];

  const surveyResults = [
    {period:'Q1 2026',responses:245,satisfaction:4.6,wouldRecommend:92,maintenance:4.2,communication:4.8,community:4.4},
    {period:'Q4 2025',responses:312,satisfaction:4.5,wouldRecommend:89,maintenance:4.1,communication:4.7,community:4.3},
    {period:'Q3 2025',responses:289,satisfaction:4.4,wouldRecommend:87,maintenance:4.0,communication:4.6,community:4.2}
  ];

  const responsibilities = [
    'Tenant communication & engagement',
    'Issue resolution & escalation',
    'Tenant retention program management',
    'Community building & events',
    'Tenant feedback analysis',
    'Service coordination & follow-up',
    'Lease renewal communication'
  ];

  const capabilities = [
    'Tenant Communication', 'Issue Resolution', 'Retention', 'Community Building',
    'Feedback Analysis', 'Service Coordination', 'Conflict Resolution', 'Escalation Management',
    'Survey Management', 'Relationship Building', 'Follow-up', 'Satisfaction Tracking'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Resolved 20 tenant inquiries',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Organized tenant appreciation event',icon: Users,color:'#007AFF'},
    {time:'9 min ago',text:'Improved tenant satisfaction by 8%',icon: TrendingUp,color:'#FF9500'},
    {time:'15 min ago',text:'Completed 15 wellness calls',icon: Phone,color:'#33691E'},
    {time:'22 min ago',text:'Sent renewal reminders to 45 tenants',icon: Mail,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/tenant/issues',description:'Issue tracking',method:'GET'},
    {endpoint:'/tenant/communicate',description:'Send communication',method:'POST'},
    {endpoint:'/tenant/survey',description:'Survey management',method:'GET'},
    {endpoint:'/tenant/retention',description:'Retention analytics',method:'GET'},
    {endpoint:'/tenant/feedback',description:'Feedback analysis',method:'POST'}
  ];

  const renderIssues = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Open Issues</Text>
        {openIssues.map((issue, index) => (
          <TouchableOpacity key={index} style={styles.issueCard}>
            <View style={styles.issueHeader}>
              <View style={styles.issueInfo}>
                <Text style={[styles.issueTenant, { color: theme.colors.text }]}>{issue.tenant}</Text>
                <Text style={[styles.issueUnit, { color: theme.colors.textSecondary }]}>{issue.unit} • {issue.property}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: issue.priority === 'critical' ? '#FF3B3022' : issue.priority === 'high' ? '#FF950022' : '#34C75922' }]}>
                <Text style={[styles.priorityText, { color: issue.priority === 'critical' ? '#FF3B30' : issue.priority === 'high' ? '#FF9500' : '#34C759' }]}>{issue.priority}</Text>
              </View>
            </View>
            <Text style={[styles.issueDesc, { color: theme.colors.text }]}>{issue.issue}</Text>
            <View style={styles.issueFooter}>
              <View style={[styles.statusBadge, { backgroundColor: issue.status === 'resolved' ? '#34C75922' : issue.status === 'in-progress' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.statusText, { color: issue.status === 'resolved' ? '#34C759' : issue.status === 'in-progress' ? '#007AFF' : '#FF9500' }]}>{issue.status.replace('-',' ')}</Text>
              </View>
              <Text style={[styles.daysText, { color: theme.colors.textSecondary }]}>{issue.daysOpen} days open</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderCommunication = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Communication Log</Text>
        {communicationLog.map((item, index) => (
          <View key={index} style={styles.commCard}>
            <View style={styles.commHeader}>
              <View style={styles.commInfo}>
                <Text style={[styles.commTenant, { color: theme.colors.text }]}>{item.tenant}</Text>
                <Text style={[styles.commSubject, { color: theme.colors.textSecondary }]}>{item.subject}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: item.type === 'email' ? '#007AFF22' : item.type === 'call' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.typeText, { color: item.type === 'email' ? '#007AFF' : item.type === 'call' ? '#34C759' : '#FF9500' }]}>{item.type}</Text>
              </View>
            </View>
            <View style={styles.commFooter}>
              <Text style={[styles.commDate, { color: theme.colors.textSecondary }]}>{item.date}</Text>
              <Text style={[styles.commResponse, { color: item.responseTime === 'N/A' ? theme.colors.textSecondary : '#34C759' }]}>{item.responseTime}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderSurveys = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Satisfaction Trends</Text>
        {surveyResults.map((survey, index) => (
          <View key={index} style={styles.surveyCard}>
            <View style={styles.surveyHeader}>
              <Text style={[styles.surveyPeriod, { color: theme.colors.text }]}>{survey.period}</Text>
              <View style={styles.surveyScore}>
                <StarIcon size={16} color="#FFD700" fill="#FFD700" />
                <Text style={[styles.satisfactionScore, { color: theme.colors.text }]}>{survey.satisfaction}</Text>
              </View>
            </View>
            <Text style={[styles.surveyResponses, { color: theme.colors.textSecondary }]}>{survey.responses} responses</Text>
            <View style={styles.surveyMetrics}>
              <View style={styles.surveyMetric}><ThumbsUp size={14} color="#34C759" /><Text style={[styles.surveyMetricText, { color: theme.colors.text }]}>{survey.wouldRecommend}%</Text></View>
              <View style={styles.surveyMetric}><Wrench size={14} color="#FF9500" /><Text style={[styles.surveyMetricText, { color: theme.colors.text }]}>{survey.maintenance}</Text></View>
              <View style={styles.surveyMetric}><MessageSquare size={14} color="#007AFF" /><Text style={[styles.surveyMetricText, { color: theme.colors.text }]}>{survey.communication}</Text></View>
              <View style={styles.surveyMetric}><Users size={14} color="#33691E" /><Text style={[styles.surveyMetricText, { color: theme.colors.text }]}>{survey.community}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Response</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically respond to tenant inquiries</Text></View><Switch value={autoRespond} onValueChange={setAutoRespond} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Users size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Tenant Relations Specialist</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Tenant Services & Communication</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['issues','communication','surveys','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'issues' && renderIssues()}
      {activeTab === 'communication' && renderCommunication()}
      {activeTab === 'surveys' && renderSurveys()}
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
        { id: 'issue-resolver', label: 'AI Issue Resolver' },
        { id: 'communication-coordinator', label: 'AI Communication Coordinator' },
        { id: 'satisfaction-surveyor', label: 'AI Satisfaction Surveyor' },
      ]} />

      <AgentFeatures agentId="tenant-relations" agentName="AI Tenant Relations Specialist" />
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
  issueCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  issueHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8},
  issueInfo:{flex:1},
  issueTenant:{fontSize:15,fontWeight:'600'},
  issueUnit:{fontSize:12,color:'#666',marginTop:2},
  priorityBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  priorityText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  issueDesc:{fontSize:14,color:'#333',marginBottom:12},
  issueFooter:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  daysText:{fontSize:11,color:'#666'},
  commCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  commHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8},
  commInfo:{flex:1},
  commTenant:{fontSize:15,fontWeight:'600'},
  commSubject:{fontSize:12,color:'#666',marginTop:2},
  typeBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  typeText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  commFooter:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  commDate:{fontSize:12,color:'#666'},
  commResponse:{fontSize:12,fontWeight:'600'},
  surveyCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  surveyHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:4},
  surveyPeriod:{fontSize:15,fontWeight:'600'},
  surveyScore:{flexDirection:'row',alignItems:'center',gap:4},
  satisfactionScore:{fontSize:15,fontWeight:'600',marginLeft:4},
  surveyResponses:{fontSize:12,color:'#666',marginBottom:12},
  surveyMetrics:{flexDirection:'row',justifyContent:'space-between'},
  surveyMetric:{flexDirection:'row',alignItems:'center',gap:4},
  surveyMetricText:{fontSize:13,fontWeight:'600'},
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
