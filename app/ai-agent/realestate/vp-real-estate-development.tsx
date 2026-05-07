import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building2, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Users, Calendar, Settings, BarChart3, FileText, Handshake, Brain, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Wrench, Timer, ClipboardList, FileCheck, Calculator, Truck, MapPinned, Hammer, Home, Factory, Building, Gauge, HardHat, ClipboardCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function VPRealEstateDevelopmentPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('pipeline');
  const [autoPermit, setAutoPermit] = React.useState(true);

  const stats = [
    {label:'Pipeline Value',value:'$524M',icon: DollarSign,color:'#34C759'},
    {label:'Active Projects',icon: HardHat,color:'#007AFF',value:'12'},
    {label:'Completion',value:'68%',icon: TrendingUp,color:'#FF9500'},
    {label:'Budget',value:'$412M',icon: ChartBarBig,color:'#33691E'}
  ];

  const developmentPipeline = [
    {name:'Metro Tower Complex',type:'Mixed-Use',value:'$125M',location:'Downtown',stage:'Construction',completion:72,startDate:'2024-03',endDate:'2026-09',budget:'$118M',spent:'$85M',status:'on-track'},
    {name:'Harbor View Residences',type:'Multifamily',value:'$89M',location:'Waterfront',stage:'Construction',completion:45,startDate:'2024-08',endDate:'2026-12',budget:'$82M',spent:'$37M',status:'on-track'},
    {name:'Tech Campus Alpha',type:'Office',value:'$156M',location:'Innovation Park',stage:'Planning',completion:15,startDate:'2025-02',endDate:'2027-06',budget:'$148M',spent:'$22M',status:'delayed'},
    {name:'Retail Pavilion',type:'Retail',value:'$45M',location:'Suburban',stage:'Permitting',completion:8,startDate:'2025-06',endDate:'2026-12',budget:'$42M',spent:'$4M',status:'on-track'},
    {name:'Industrial Hub West',type:'Industrial',value:'$109M',location:'Industrial Zone',stage:'Design',completion:25,startDate:'2025-04',endDate:'2027-03',budget:'$98M',spent:'$25M',status:'on-track'}
  ];

  const feasibilityProjects = [
    {name:'Downtown Mixed-Use',value:'$85M',irr:'16.2%',capRate:'6.8%',cashOnCash:'14.5%',score:92,risks:['Zoning approval','Market timing']},
    {name:'Suburban Multifamily',value:'$62M',irr:'14.8%',capRate:'7.2%',cashOnCash:'13.2%',score:85,risks:['Competition','Interest rates']},
    {name:'Medical Office Building',value:'$48M',irr:'15.5%',capRate:'7.5%',cashOnCash:'14.1%',score:88,risks:['Tenant commitment']}
  ];

  const permitTracking = [
    {project:'Metro Tower Complex',permits:[
      {name:'Building Permit',status:'approved',date:'2024-02-15'},
      {name:'Zoning Approval',status:'approved',date:'2024-03-01'},
      {name:'Environmental',status:'approved',date:'2024-04-10'},
      {name:'Fire Marshal',status:'pending',date:'2025-01-15'}
    ]},
    {project:'Tech Campus Alpha',permits:[
      {name:'Site Plan Approval',status:'approved',date:'2024-11-20'},
      {name:'Building Permit',status:'pending',date:'2025-02-01'},
      {name:'Environmental',status:'in-review',date:'2025-01-10'},
      {name:'Traffic Study',status:'pending',date:'2025-02-15'}
    ]}
  ];

  const budgetOverview = [
    {category:'Land Acquisition',budget:'$85M',spent:'$82M',remaining:'$3M'},
    {category:'Construction',budget:'$245M',spent:'$156M',remaining:'$89M'},
    {category:'Design & Engineering',budget:'$32M',spent:'$28M',remaining:'$4M'},
    {category:'Permits & Fees',budget:'$18M',spent:'$12M',remaining:'$6M'},
    {category:'Contingency',budget:'$32M',spent:'$8M',remaining:'$24M'}
  ];

  const responsibilities = [
    'Real estate development strategy & organizational vision',
    'Development pipeline management & project prioritization',
    'Capital deployment & investment decisions',
    'Development risk assessment & mitigation',
    'Stakeholder & community relations management',
    'Major project oversight & governance',
    'Design & construction vendor management'
  ];

  const capabilities = [
    'Development Strategy', 'Pipeline Mgmt', 'Capital Deployment', 'Risk Assessment',
    'Stakeholder Mgmt', 'Project Oversight', 'Feasibility Analysis', 'Permit Management',
    'Budget Management', 'Vendor Coordination', 'Zoning & Entitlements', 'Construction Mgmt'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Reviewed development pipeline of $500M',icon: CircleCheckBig,color:'#34C759'},
    {time:'6 min ago',text:'Approved 2 new development projects',icon: CheckCircle,color:'#007AFF'},
    {time:'9 min ago',text:'Managed stakeholder communications',icon: Zap,color:'#FF9500'},
    {time:'15 min ago',text:'Approved $12M design contract',icon: DollarSign,color:'#33691E'},
    {time:'22 min ago',text:'Reviewed feasibility for Tech Campus',icon: Brain,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/development/pipeline',description:'Development pipeline overview',method:'GET'},
    {endpoint:'/development/feasibility',description:'Feasibility analysis',method:'POST'},
    {endpoint:'/permits/track',description:'Permit tracking & status',method:'GET'},
    {endpoint:'/budget/development',description:'Development budget management',method:'GET'},
    {endpoint:'/coordinate/contractors',description:'Contractor coordination',method:'POST'}
  ];

  const renderPipeline = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Development Pipeline</Text>
        {developmentPipeline.map((project, index) => (
          <TouchableOpacity key={index} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Text style={[styles.projectName, { color: theme.colors.text }]}>{project.name}</Text>
                <Text style={[styles.projectType, { color: theme.colors.textSecondary }]}>{project.type} • {project.location}</Text>
              </View>
              <View style={[styles.stageBadge, { backgroundColor: project.status === 'on-track' ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.stageText, { color: project.status === 'on-track' ? '#34C759' : '#FF9500' }]}>{project.stage}</Text>
              </View>
            </View>
            <View style={styles.projectMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Value</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.completion}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Complete</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.budget}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
            </View>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${project.completion}%`, backgroundColor: project.status === 'on-track' ? '#34C759' : '#FF9500' }]} /></View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Budget Overview</Text>
        {budgetOverview.map((item, index) => (
          <View key={index} style={styles.budgetRow}>
            <Text style={[styles.budgetLabel, { color: theme.colors.text }]}>{item.category}</Text>
            <View style={styles.budgetValues}>
              <Text style={[styles.budgetSpent, { color: theme.colors.textSecondary }]}>Spent: {item.spent}</Text>
              <Text style={[styles.budgetRemaining, { color: '#34C759' }]}>Remaining: {item.remaining}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderFeasibility = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feasibility Analysis</Text>
        {feasibilityProjects.map((project, index) => (
          <View key={index} style={styles.feasibilityCard}>
            <View style={styles.feasibilityHeader}>
              <View style={styles.feasibilityInfo}>
                <Text style={[styles.feasibilityName, { color: theme.colors.text }]}>{project.name}</Text>
                <Text style={[styles.feasibilityValue, { color: theme.colors.textSecondary }]}>{project.value}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: project.score > 85 ? '#34C75922' : '#FF950022' }]}>
                <Text style={[styles.scoreText, { color: project.score > 85 ? '#34C759' : '#FF9500' }]}>{project.score}</Text>
              </View>
            </View>
            <View style={styles.feasibilityMetrics}>
              <View style={styles.feasMetric}><Text style={[styles.feasLabel, { color: theme.colors.textSecondary }]}>IRR</Text><Text style={[styles.feasValue, { color: '#34C759' }]}>{project.irr}</Text></View>
              <View style={styles.feasMetric}><Text style={[styles.feasLabel, { color: theme.colors.textSecondary }]}>Cap Rate</Text><Text style={[styles.feasValue, { color: '#007AFF' }]}>{project.capRate}</Text></View>
              <View style={styles.feasMetric}><Text style={[styles.feasLabel, { color: theme.colors.textSecondary }]}>CoC</Text><Text style={[styles.feasValue, { color: '#FF9500' }]}>{project.cashOnCash}</Text></View>
            </View>
            <View style={styles.riskList}>
              {project.risks.map((risk, i) => (
                <View key={i} style={styles.riskItem}><AlertTriangle size={12} color="#FF9500" /><Text style={[styles.riskText, { color: theme.colors.textSecondary }]}>{risk}</Text></View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderPermits = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Permit Tracking</Text>
        {permitTracking.map((project, index) => (
          <View key={index} style={styles.permitProject}>
            <Text style={[styles.permitProjectName, { color: theme.colors.text }]}>{project.project}</Text>
            {project.permits.map((permit, i) => (
              <View key={i} style={styles.permitRow}>
                <View style={[styles.permitStatusDot, { backgroundColor: permit.status === 'approved' ? '#34C759' : permit.status === 'pending' ? '#FF9500' : '#007AFF' }]} />
                <Text style={[styles.permitName, { color: theme.colors.text }]}>{permit.name}</Text>
                <Text style={[styles.permitDate, { color: theme.colors.textSecondary }]}>{permit.date}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </>
  );

  const renderSettings = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Permit Tracking</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically track permit status and deadlines</Text></View><Switch value={autoPermit} onValueChange={setAutoPermit} trackColor={{true:'#33691E'}} /></View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}><Download size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Export Report</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><RefreshCw size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Sync Data</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Calendar size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Schedule</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Settings size={22} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>Configure</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><HardHat size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Real Estate Development</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Development Division Leadership</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><Gauge size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['pipeline','feasibility','permits','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'pipeline' && renderPipeline()}
      {activeTab === 'feasibility' && renderFeasibility()}
      {activeTab === 'permits' && renderPermits()}
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
        { id: 'development-pipeline-manager', label: 'AI Development Pipeline Manager' },
        { id: 'feasibility-analyst', label: 'AI Feasibility Analyst' },
        { id: 'permit-tracker', label: 'AI Permit Tracker' },
      ]} />

      <AgentFeatures agentId="vp-real-estate-development" agentName="AI VP Real Estate Development" />
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
  projectCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  projectHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  projectInfo:{flex:1},
  projectName:{fontSize:15,fontWeight:'600'},
  projectType:{fontSize:12,color:'#666',marginTop:2},
  stageBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  stageText:{fontSize:11,fontWeight:'600'},
  projectMetrics:{flexDirection:'row',justifyContent:'space-between',marginBottom:12},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:15,fontWeight:'bold'},
  metricLabel:{fontSize:11,marginTop:2},
  progressBar:{height:6,backgroundColor:'#E5E5EA',borderRadius:3,overflow:'hidden'},
  progressFill:{height:'100%',borderRadius:3},
  budgetRow:{paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},
  budgetLabel:{fontSize:14,fontWeight:'600',marginBottom:4},
  budgetValues:{flexDirection:'row',justifyContent:'space-between'},
  budgetSpent:{fontSize:12},
  budgetRemaining:{fontSize:12,fontWeight:'600'},
  feasibilityCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  feasibilityHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  feasibilityInfo:{flex:1},
  feasibilityName:{fontSize:15,fontWeight:'600'},
  feasibilityValue:{fontSize:13,color:'#666'},
  scoreBadge:{width:44,height:44,borderRadius:22,justifyContent:'center',alignItems:'center',backgroundColor:'#34C75922'},
  scoreText:{fontSize:16,fontWeight:'bold',color:'#34C759'},
  feasibilityMetrics:{flexDirection:'row',marginBottom:12},
  feasMetric:{marginRight:24},
  feasLabel:{fontSize:11},
  feasValue:{fontSize:14,fontWeight:'600'},
  riskList:{borderTopWidth:1,borderTopColor:'#E5E5EA',paddingTop:12},
  riskItem:{flexDirection:'row',alignItems:'center',gap:6,marginBottom:4},
  riskText:{fontSize:12},
  permitProject:{marginBottom:16},
  permitProjectName:{fontSize:15,fontWeight:'600',marginBottom:12},
  permitRow:{flexDirection:'row',alignItems:'center',gap:10,marginBottom:8},
  permitStatusDot:{width:8,height:8,borderRadius:4},
  permitName:{fontSize:13,flex:1},
  permitDate:{fontSize:12,color:'#666'},
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
