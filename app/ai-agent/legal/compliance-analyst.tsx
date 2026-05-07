import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Search, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Scale, Gauge, ClipboardList } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Analyses',value:'1,580',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.6s',icon:Clock,color:'#FF9500'},{label:'Gaps',value:'94%',icon:Target,color:'#E65100'}];
  const capabilities = ['Regulation Interpretation','Gap Assessment','Evidence Collection','Risk Analysis','Control Testing','Compliance Mapping','Audit Preparation','Remediation Planning'];
  const responsibilities = ['Interpret complex regulations and compliance requirements','Assess organizational gaps against regulatory standards','Collect and organize compliance evidence and documentation','Analyze compliance risks and control effectiveness','Map controls to regulatory requirements','Prepare audit evidence packages','Develop remediation plans for findings','Track compliance metrics and KPIs'];
  const subAgents = [
    {name:'AI Regulation Interpreter',route:'/ai-agent/legal/sub-agents/regulation-interpreter',icon:Scale},
    {name:'AI Gap Assessor',route:'/ai-agent/legal/sub-agents/gap-assessor',icon:Gauge},
    {name:'AI Evidence Collector',route:'/ai-agent/legal/sub-agents/evidence-collector',icon:ClipboardList},
  ];
  const activities = [{time:'6 min ago',text:'Interpreted new SEC disclosure requirements',icon:CircleCheckBig},{time:'19 min ago',text:'Completed gap assessment for ISO 27001',icon:Clock},{time:'44 min ago',text:'Collected evidence package for SOX audit',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510020' }]}><Search size={48} color="#E65100" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Compliance Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Legal & Governance • Analyst Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}><Star size={12} color="#E65100" /><Text style={[styles.badgeText, { color: '#E65100' }]}>Analyst</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Search size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Compliance Analyst interprets complex regulations, assesses organizational compliance gaps, and manages evidence collection for audits. This analyst-level agent provides deep regulatory analysis, control testing, and compliance mapping to ensure regulatory adherence across all operations.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#E6510018' }]}><Text style={[styles.tagText, { color: '#E65100' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#E65100" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sub,i)=>(<TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><sub.icon size={24} color="#E65100" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{sub.name}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/compliance-analyst','/compliance-analyst/execute','/compliance-analyst/analyze','/compliance-analyst/gap','/compliance-analyst/evidence'].map((endpoint,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#E6510015' }]}><act.icon size={14} color="#E65100" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <AgentFeatures agentId="compliance-analyst" agentName="AI Compliance Analyst" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12,marginBottom:8},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});
