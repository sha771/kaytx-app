import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Calendar, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, DollarSign, Building2, Settings as SettingsIcon, BarChart3, FileText, Handshake, Brain, Home, Key, MapPin, PieChart, LineChart, CheckCircle, AlertTriangle, RefreshCw, Download, ChevronRight, Timer, ClipboardList, FileCheck, Calculator, Truck, HomeIcon, Percent, HardHat, Hammer, MapPinned, ClipboardCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import SubAgentLinks from '@/components/ai-agent/SubAgentLinks';

export default function DevelopmentCoordinatorPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState('projects');
  const [autoSchedule, setAutoSchedule] = React.useState(true);

  const stats = [
    {label:'Projects',value:'8',icon: HardHat,color:'#34C759'},
    {label:'Budget',value:'$300M',icon: DollarSign,color:'#007AFF'},
    {label:'On-Time',value:'95%',icon: CheckCircle,color:'#FF9500'},
    {label:'Contractors',value:'24',icon: Hammer,color:'#33691E'}
  ];

  const developmentProjects = [
    {name:'Harbor View Tower',type:'Mixed-Use',location:'San Francisco, CA',budget:'$85M',spent:'$52M',startDate:'2025-06',endDate:'2027-03',progress:62,status:'on-track',units:250},
    {name:'Tech Campus Phase II',type:'Office',location:'Austin, TX',budget:'$120M',spent:'$78M',startDate:'2025-03',endDate:'2026-12',progress:65,status:'on-track',units:450},
    {name:'Industrial Distribution',type:'Industrial',location:'Phoenix, AZ',budget:'$45M',spent:'$38M',startDate:'2025-09',endDate:'2026-06',progress:84,status:'ahead',units:12},
    {name:'Urban Lofts',type:'Multifamily',location:'Denver, CO',budget:'$50M',spent:'$12M',startDate:'2026-01',endDate:'2027-08',progress:24,status:'on-track',units:180}
  ];

  const milestones = [
    {project:'Harbor View Tower',milestone:'Foundation Complete',dueDate:'2026-02-15',status:'completed',daysAhead:3},
    {project:'Tech Campus Phase II',milestone:'Structural Topping Out',dueDate:'2026-03-01',status:'in-progress',daysAhead:12},
    {project:'Industrial Distribution',milestone:'Certificate of Occupancy',dueDate:'2026-05-15',status:'pending',daysAhead:45},
    {project:'Urban Lofts',milestone:'Permit Approval',dueDate:'2026-02-28',status:'in-progress',daysAhead:8}
  ];

  const contractorList = [
    {name:'BuildRight Construction',project:'Harbor View Tower',trade:'General',rating:4.8,contractValue:'$45M',status:'active',completedTasks:156},
    {name:'Skyline Electric',project:'Tech Campus Phase II',trade:'Electrical',rating:4.6,contractValue:'$18M',status:'active',completedTasks:89},
    {name:'Premier Plumbing',project:'Industrial Distribution',trade:'Plumbing',rating:4.9,contractValue:'$8M',status:'active',completedTasks:45},
    {name:'Foundation Experts',project:'Urban Lofts',trade:'Foundation',rating:4.5,contractValue:'$12M',status:'pending',completedTasks:0}
  ];

  const responsibilities = [
    'Development project coordination & management',
    'Project scheduling & milestone tracking',
    'Budget management & cost control',
    'Contractor oversight & coordination',
    'Timeline management & delivery assurance',
    'Quality assurance & compliance verification',
    'Permit & regulatory coordination'
  ];

  const capabilities = [
    'Development Coordination', 'Project Scheduling', 'Budget Management', 'Contractor Oversight',
    'Timeline Management', 'Quality Assurance', 'Permit Coordination', 'Risk Management',
    'Cost Control', 'Resource Allocation', 'Progress Tracking', 'Compliance'
  ];

  const recentActivity = [
    {time:'3 min ago',text:'Coordinated 8 development projects this quarter',icon: ClipboardCheck,color:'#34C759'},
    {time:'6 min ago',text:'Managed $300M in active development budgets',icon: DollarSign,color:'#007AFF'},
    {time:'9 min ago',text:'Ensured 95% on-time project delivery rate',icon: CheckCircle,color:'#FF9500'},
    {time:'15 min ago',text:'Completed contractor performance review',icon: Hammer,color:'#33691E'},
    {time:'22 min ago',text:'Updated project schedules for Q1',icon: Calendar,color:'#8B5CF6'}
  ];

  const a2aEndpoints = [
    {endpoint:'/development/projects',description:'Project management',method:'GET'},
    {endpoint:'/development/milestones',description:'Milestone tracking',method:'GET'},
    {endpoint:'/development/contractors',description:'Contractor management',method:'GET'},
    {endpoint:'/development/schedule',description:'Schedule updates',method:'POST'},
    {endpoint:'/development/budget',description:'Budget tracking',method:'GET'}
  ];

  const renderProjects = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Development Projects</Text>
        {developmentProjects.map((project, index) => (
          <TouchableOpacity key={index} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Text style={[styles.projectName, { color: theme.colors.text }]}>{project.name}</Text>
                <Text style={[styles.projectType, { color: theme.colors.textSecondary }]}>{project.type} • {project.location}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: project.status === 'ahead' ? '#34C75922' : project.status === 'on-track' ? '#007AFF22' : '#FF3B3022' }]}>
                <Text style={[styles.statusText, { color: project.status === 'ahead' ? '#34C759' : project.status === 'on-track' ? '#007AFF' : '#FF3B30' }]}>{project.status}</Text>
              </View>
            </View>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: project.progress > 60 ? '#34C759' : project.progress > 30 ? '#007AFF' : '#FF9500' }]} /></View>
            <View style={styles.projectMetrics}>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.budget}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Budget</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.spent}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Spent</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: '#34C759' }]}>{project.progress}%</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Progress</Text></View>
              <View style={styles.metricItem}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{project.units}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Units</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderMilestones = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Milestones</Text>
        {milestones.map((item, index) => (
          <View key={index} style={styles.milestoneCard}>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneProject, { color: theme.colors.text }]}>{item.project}</Text>
              <Text style={[styles.milestoneName, { color: theme.colors.textSecondary }]}>{item.milestone}</Text>
            </View>
            <View style={styles.milestoneRight}>
              <View style={[styles.milestoneStatus, { backgroundColor: item.status === 'completed' ? '#34C75922' : item.status === 'in-progress' ? '#007AFF22' : '#FF950022' }]}>
                <Text style={[styles.milestoneStatusText, { color: item.status === 'completed' ? '#34C759' : item.status === 'in-progress' ? '#007AFF' : '#FF9500' }]}>{item.status}</Text>
              </View>
              <Text style={[styles.milestoneDate, { color: theme.colors.textSecondary }]}>{item.dueDate}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );

  const renderContractors = () => (
    <>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contractor Performance</Text>
        {contractorList.map((contractor, index) => (
          <View key={index} style={styles.contractorCard}>
            <View style={styles.contractorHeader}>
              <View style={styles.contractorInfo}>
                <Text style={[styles.contractorName, { color: theme.colors.text }]}>{contractor.trade}</Text>
                <Text style={[styles.contractorCompany, { color: theme.colors.textSecondary }]}>{contractor.name}</Text>
              </View>
              <View style={[styles.ratingBadge, { backgroundColor: '#FFD70022' }]}>
                <Text style={[styles.ratingText, { color: '#FFD700' }]}>{contractor.rating}</Text>
              </View>
            </View>
            <View style={styles.contractorMetrics}>
              <View style={styles.contractorMetric}><Text style={[styles.contractorLabel, { color: theme.colors.textSecondary }]}>Project</Text><Text style={[styles.contractorValue, { color: theme.colors.text }]}>{contractor.project}</Text></View>
              <View style={styles.contractorMetric}><Text style={[styles.contractorLabel, { color: theme.colors.textSecondary }]}>Contract</Text><Text style={[styles.contractorValue, { color: '#33691E' }]}>{contractor.contractValue}</Text></View>
              <View style={styles.contractorMetric}><Text style={[styles.contractorLabel, { color: theme.colors.textSecondary }]}>Tasks</Text><Text style={[styles.contractorValue, { color: theme.colors.text }]}>{contractor.completedTasks}</Text></View>
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
        <View style={styles.settingRow}><View><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Schedule</Text><Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>Automatically update project schedules</Text></View><Switch value={autoSchedule} onValueChange={setAutoSchedule} trackColor={{true:'#33691E'}} /></View>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Calendar size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Development Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Development Project Management</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Coordinator</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FFD70022' }]}><SettingsIcon size={12} color="#FFD700" /><Text style={[styles.badgeText, { color: '#FFD700' }]}>Enterprise</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {['projects','milestones','contractors','settings'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && {borderBottomColor:'#33691E',borderBottomWidth:2}]}>
            <Text style={[styles.tabText, { color: activeTab === tab ? '#33691E' : theme.colors.textSecondary }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'milestones' && renderMilestones()}
      {activeTab === 'contractors' && renderContractors()}
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
        { id: 'timeline-manager', label: 'AI Timeline Manager' },
        { id: 'contractor-coordinator', label: 'AI Contractor Coordinator' },
        { id: 'budget-tracker', label: 'AI Budget Tracker' },
      ]} />

      <AgentFeatures agentId="development-coordinator" agentName="AI Development Coordinator" />
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
  projectHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  projectInfo:{flex:1},
  projectName:{fontSize:15,fontWeight:'600'},
  projectType:{fontSize:12,color:'#666',marginTop:2},
  statusBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  statusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  progressBar:{height:8,backgroundColor:'#E5E5EA',borderRadius:4,overflow:'hidden',marginBottom:12},
  progressFill:{height:'100%',borderRadius:4},
  projectMetrics:{flexDirection:'row',justifyContent:'space-between'},
  metricItem:{alignItems:'center'},
  metricValue:{fontSize:14,fontWeight:'bold'},
  metricLabel:{fontSize:10,marginTop:2},
  milestoneCard:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16,borderRadius:12,backgroundColor:'#F8F9FA',marginBottom:8},
  milestoneInfo:{flex:1},
  milestoneProject:{fontSize:14,fontWeight:'600'},
  milestoneName:{fontSize:12,color:'#666'},
  milestoneRight:{alignItems:'flex-end'},
  milestoneStatus:{paddingHorizontal:8,paddingVertical:4,borderRadius:8},
  milestoneStatusText:{fontSize:11,fontWeight:'600',textTransform:'capitalize'},
  milestoneDate:{fontSize:12,color:'#666',marginTop:4},
  contractorCard:{borderWidth:1,borderColor:'#E5E5EA',borderRadius:12,padding:16,marginBottom:12},
  contractorHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12},
  contractorInfo:{flex:1},
  contractorName:{fontSize:15,fontWeight:'600'},
  contractorCompany:{fontSize:12,color:'#666',marginTop:2},
  ratingBadge:{paddingHorizontal:10,paddingVertical:4,borderRadius:12},
  ratingText:{fontSize:14,fontWeight:'700'},
  contractorMetrics:{flexDirection:'row',justifyContent:'space-between'},
  contractorMetric:{alignItems:'center'},
  contractorLabel:{fontSize:11,color:'#666'},
  contractorValue:{fontSize:14,fontWeight:'600'},
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
