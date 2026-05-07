import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Gavel, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, ClipboardList, ClipboardCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Meetings',value:'847',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.8s',icon:Clock,color:'#FF9500'},{label:'Policies',value:'156',icon:Target,color:'#5D4037'}];
  const capabilities = ['Board Coordination','Policy Framework Design','Governance Auditing','ESG Compliance','Risk Governance','Ethical AI Oversight','Stakeholder Management','Regulatory Mapping'];
  const responsibilities = ['Coordinate board meetings and governance workflows','Design and maintain enterprise policy frameworks','Conduct governance audits and compliance assessments','Oversee ESG (Environmental, Social, Governance) initiatives','Ensure ethical AI deployment and oversight','Map regulatory requirements to governance controls','Manage stakeholder communications and disclosures','Drive corporate governance best practices'];
  const subAgents = [
    {name:'AI Board Meeting Coordinator',route:'/ai-agent/legal/sub-agents/board-meeting-coordinator',icon:Users},
    {name:'AI Policy Framework Designer',route:'/ai-agent/legal/sub-agents/policy-framework-designer',icon:ClipboardList},
    {name:'AI Governance Auditor',route:'/ai-agent/legal/sub-agents/governance-auditor',icon:ClipboardCheck},
  ];
  const activities = [{time:'3 min ago',text:'Scheduled Q4 board meeting with 12 agenda items',icon:CircleCheckBig},{time:'12 min ago',text:'Published updated ESG policy framework v2.4',icon:Clock},{time:'28 min ago',text:'Completed governance audit for APAC subsidiaries',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5D403720' }]}><Gavel size={48} color="#5D4037" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>VP Governance</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Legal & Governance • VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Star size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Gavel size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI VP Governance orchestrates enterprise governance, board coordination, and policy framework design. This VP-level agent ensures ESG compliance, ethical AI oversight, and corporate governance best practices across global operations.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#5D403718' }]}><Text style={[styles.tagText, { color: '#5D4037' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#5D4037" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sub,i)=>(<TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><sub.icon size={24} color="#5D4037" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{sub.name}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/vp-governance','/vp-governance/execute','/vp-governance/audit','/vp-governance/policy','/vp-governance/board'].map((endpoint,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#5D403715' }]}><act.icon size={14} color="#5D4037" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <AgentFeatures agentId="vp-governance" agentName="VP Governance" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12,marginBottom:8},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});
