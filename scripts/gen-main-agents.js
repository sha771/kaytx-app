const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '..', 'app', 'ai-agent', 'marketing');

const sharedStyles = `const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:24,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',marginTop:16,gap:8,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},subAgentCard:{flexDirection:'row',alignItems:'center',padding:14,borderRadius:12,marginBottom:8,gap:12},subAgentIcon:{width:40,height:40,borderRadius:20,justifyContent:'center',alignItems:'center'},subAgentInfo:{flex:1},subAgentName:{fontSize:15,fontWeight:'600'},subAgentDesc:{fontSize:12,marginTop:2},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},actionText:{fontSize:13,fontWeight:'600',marginTop:8}});`;

// VP Digital
fs.writeFileSync(path.join(baseDir, 'vp-digital.tsx'), `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Monitor, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Users, Globe, Gauge, TrendingUp, MessageSquare, Wifi } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPDigitalPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Channels', value: '5,377', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '1.2s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.2%', icon: Target, color: '#1565C0' },
  ];
  const capabilities = ['Digital Optimization','Web Performance','Conversion Analytics','Channel Management','SEO/SEM','Paid Media','Web Analytics','UX Optimization'];
  const responsibilities = [
    'Optimize digital channel performance and spend allocation',
    'Track web performance metrics and page load times',
    'Analyze conversion funnels across digital touchpoints',
    'Manage paid media campaigns and budget distribution',
    'Oversee SEO and SEM strategy execution',
    'Monitor web analytics and user behavior patterns',
    'Coordinate UX improvements with product teams',
    'Report digital KPIs and channel attribution to CMO',
  ];
  const activities = [
    { time: '2 min ago', text: 'Optimized ad spend across 8 channels', icon: Globe },
    { time: '18 min ago', text: 'Detected page load regression on /pricing', icon: Gauge },
    { time: '1 hour ago', text: 'Analyzed conversion drop on mobile checkout', icon: TrendingUp },
    { time: '3 hours ago', text: 'Launched retargeting campaign for Q3', icon: Wifi },
  ];
  const quickActions = [
    { label: 'Channel Opt', icon: Globe },
    { label: 'Web Perf', icon: Gauge },
    { label: 'Conversions', icon: TrendingUp },
    { label: 'Team Chat', icon: MessageSquare },
  ];
  const subAgents = [
    { name: 'AI Digital Channel Optimizer', id: 'digital-channel-optimizer', icon: Globe, desc: 'Digital channel performance optimization' },
    { name: 'AI Web Performance Tracker', id: 'web-performance-tracker', icon: Gauge, desc: 'Web speed & performance monitoring' },
    { name: 'AI Conversion Analyst', id: 'conversion-analyst', icon: TrendingUp, desc: 'Conversion funnel analysis & insights' },
  ];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#1565C018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C025' }]}><Monitor size={48} color="#1565C0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Digital</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing & Growth Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Star size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI VP Digital leads digital channel optimization, web performance monitoring, and conversion analytics. It ensures every digital touchpoint performs at peak efficiency, manages paid media strategy, and drives data-informed UX improvements.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#1565C018'}]}><Text style={[styles.tagText,{color:'#1565C0'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#1565C0"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Sub-Agents</Text>{subAgents.map((a,i)=>(<TouchableOpacity key={i} onPress={()=>router.push(\`/ai-agent/marketing/sub-agents/\${a.id}\`)} style={[styles.subAgentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><View style={[styles.subAgentIcon,{backgroundColor:'#1565C015'}]}><a.icon size={20} color="#1565C0"/></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName,{color:theme.colors.text}]}>{a.name}</Text><Text style={[styles.subAgentDesc,{color:theme.colors.textSecondary}]}>{a.desc}</Text></View><ArrowRight size={18} color={theme.colors.textSecondary}/></TouchableOpacity>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#1565C015'}]}><a.icon size={14} color="#1565C0"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.actionsGrid}>{quickActions.map((a,i)=>(<TouchableOpacity key={i} style={[styles.actionButton,{backgroundColor:'#1565C012'}]}><a.icon size={24} color="#1565C0"/><Text style={[styles.actionText,{color:'#1565C0'}]}>{a.label}</Text></TouchableOpacity>))}</View></View>
      <AgentFeatures agentId="vp-digital" agentName="AI VP Digital" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
${sharedStyles}`);
console.log('Written: vp-digital.tsx');

// Marketing Manager
fs.writeFileSync(path.join(baseDir, 'marketing-manager.tsx'), `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ClipboardList, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Users, UserPlus, Timer, DollarSign, MessageSquare, ListChecks } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function MarketingManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Tasks', value: '1,431', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.6s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.1%', icon: Target, color: '#E65100' },
  ];
  const capabilities = ['Task Management','Deadline Tracking','Spend Monitoring','Team Coordination','Workflow Automation','Resource Allocation','Progress Reporting','Quality Assurance'];
  const responsibilities = [
    'Assign and track marketing tasks across teams',
    'Monitor deadlines and escalate at-risk deliverables',
    'Track marketing spend against budget allocations',
    'Coordinate cross-functional marketing workflows',
    'Automate repetitive marketing processes',
    'Allocate resources based on priority and capacity',
    'Generate progress reports for VP-level leadership',
    'Ensure quality standards across all deliverables',
  ];
  const activities = [
    { time: '1 min ago', text: 'Assigned 5 tasks to content team', icon: UserPlus },
    { time: '10 min ago', text: 'Flagged 2 deadlines at risk', icon: Timer },
    { time: '45 min ago', text: 'Spend at 78% of monthly budget', icon: DollarSign },
    { time: '2 hours ago', text: 'Completed weekly progress report', icon: ListChecks },
  ];
  const quickActions = [
    { label: 'Assign Task', icon: UserPlus },
    { label: 'Deadlines', icon: Timer },
    { label: 'Spend Report', icon: DollarSign },
    { label: 'Team Chat', icon: MessageSquare },
  ];
  const subAgents = [
    { name: 'AI Task Assigner', id: 'task-assigner', icon: UserPlus, desc: 'Intelligent task assignment & workload balancing' },
    { name: 'AI Deadline Tracker', id: 'deadline-tracker', icon: Timer, desc: 'Deadline monitoring & risk escalation' },
    { name: 'AI Marketing Spend Monitor', id: 'marketing-spend-monitor', icon: DollarSign, desc: 'Budget tracking & spend optimization' },
  ];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E6510018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510025' }]}><ClipboardList size={48} color="#E65100" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Marketing Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing & Growth Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}><Star size={12} color="#E65100" /><Text style={[styles.badgeText, { color: '#E65100' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI Marketing Manager coordinates day-to-day marketing operations, manages task assignments, tracks deadlines, and monitors spend. It bridges VP-level strategy with team-level execution, ensuring every initiative is delivered on time and within budget.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#E6510018'}]}><Text style={[styles.tagText,{color:'#E65100'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#E65100"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Sub-Agents</Text>{subAgents.map((a,i)=>(<TouchableOpacity key={i} onPress={()=>router.push(\`/ai-agent/marketing/sub-agents/\${a.id}\`)} style={[styles.subAgentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><View style={[styles.subAgentIcon,{backgroundColor:'#E6510015'}]}><a.icon size={20} color="#E65100"/></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName,{color:theme.colors.text}]}>{a.name}</Text><Text style={[styles.subAgentDesc,{color:theme.colors.textSecondary}]}>{a.desc}</Text></View><ArrowRight size={18} color={theme.colors.textSecondary}/></TouchableOpacity>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#E6510015'}]}><a.icon size={14} color="#E65100"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.actionsGrid}>{quickActions.map((a,i)=>(<TouchableOpacity key={i} style={[styles.actionButton,{backgroundColor:'#E6510012'}]}><a.icon size={24} color="#E65100"/><Text style={[styles.actionText,{color:'#E65100'}]}>{a.label}</Text></TouchableOpacity>))}</View></View>
      <AgentFeatures agentId="marketing-manager" agentName="AI Marketing Manager" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
${sharedStyles}`);
console.log('Written: marketing-manager.tsx');

console.log('Main agents done!');
