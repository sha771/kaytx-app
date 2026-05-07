import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ChartBarBig, Activity, Shield, CircleCheckBig, Clock, Target, ArrowRight, Zap, FolderKanban, ListChecks, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Projects',value:'34',i:FolderKanban,color:'#34C759'},{label:'Uptime',value:'99.6%',i:Activity,color:'#007AFF'},{label:'Response',value:'1.1s',i:Clock,color:'#FF9500'},{label:'On-Time',value:'92%',i:Target,color:'#E91E63'}];
  const capabilities = ['Project Coordination','Priority Planning','Quality Review','Analytics Delivery','Team Management','Stakeholder Reporting'];
  const responsibilities = ['Coordinate analytics projects across teams','Plan and prioritize analytics workload','Review analytics deliverables for quality','Ensure timely analytics delivery','Manage analytics team assignments','Report analytics progress to stakeholders'];
  const activities = [{t:'4 min ago',x:'Kicked off Q4 analytics sprint',i:FolderKanban},{t:'12 min ago',x:'Prioritized 8 analytics requests',i:ListChecks},{t:'30 min ago',x:'Approved data quality review report',i:CheckCircle}];
  const subAgents = [
    {n:'AI Analytics Project Coordinator',i:FolderKanban,r:'/ai-agent/data/sub-agents/analytics-project-coordinator',c:'#E91E63'},
    {n:'AI Priority Planner',i:ListChecks,r:'/ai-agent/data/sub-agents/priority-planner',c:'#007AFF'},
    {n:'AI Quality Reviewer',i:CheckCircle,r:'/ai-agent/data/sub-agents/quality-reviewer',c:'#FF9500'},
  ];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6320' }]}><ChartBarBig size={48} color="#E91E63" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Analytics Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Analytics Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Shield size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>Manager</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.i size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Analytics Manager coordinates analytics projects across teams, plans priorities, reviews quality, and reports progress to stakeholders. Ensures timely delivery of high-quality analytics solutions.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#E91E6318' }]}><Text style={[styles.tagText, { color: '#E91E63' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#E91E63" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/analytics-manager','/analytics/projects','/analytics/priorities','/analytics/quality'].map((ep,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sa,i)=>(<TouchableOpacity key={i} onPress={()=>router.push(sa.r)} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7',marginTop:i>0?8:0}]}><sa.i size={24} color={sa.c}/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>{sa.n}</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#E91E6315' }]}><a.i size={14} color="#E91E63" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{a.x}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{a.t}</Text></View></View>))}</View>
      <AgentFeatures agentId="analytics-manager" agentName="AI Analytics Manager" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});



