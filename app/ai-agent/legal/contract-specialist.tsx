import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, BookOpen, AlertTriangle, PenTool } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Contracts',value:'2,847',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.5s',icon:Clock,color:'#FF9500'},{label:'Risk',value:'Low',icon:Target,color:'#4E342E'}];
  const capabilities = ['Contract Drafting','Clause Analysis','Risk Assessment','Amendment Management','Template Library','Negotiation Support','Obligation Tracking','Contract Lifecycle'];
  const responsibilities = ['Draft and review commercial contracts and agreements','Analyze contract clauses for risk and compliance','Manage contract templates and clause library','Draft amendments and contract modifications','Track contractual obligations and deadlines','Support contract negotiations with legal insights','Monitor contract lifecycle from draft to execution','Ensure contract compliance with company policies'];
  const subAgents = [
    {name:'AI Clause Librarian',route:'/ai-agent/legal/sub-agents/clause-librarian',icon:BookOpen},
    {name:'AI Risk Spotter',route:'/ai-agent/legal/sub-agents/risk-spotter',icon:AlertTriangle},
    {name:'AI Amendment Drafter',route:'/ai-agent/legal/sub-agents/amendment-drafter',icon:PenTool},
  ];
  const activities = [{time:'3 min ago',text:'Reviewed SaaS agreement with 47 custom clauses',icon:CircleCheckBig},{time:'12 min ago',text:'Flagged 3 high-risk indemnification clauses',icon:Clock},{time:'31 min ago',text:'Drafted amendment for master service agreement',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#4E342E20' }]}><FileText size={48} color="#4E342E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Contract Specialist</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Legal & Governance • Specialist Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Star size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><FileText size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Contract Specialist drafts, reviews, and analyzes commercial agreements with advanced risk assessment capabilities. This specialist-level agent manages the contract lifecycle, maintains clause libraries, and ensures all agreements align with legal standards and business requirements.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#4E342E18' }]}><Text style={[styles.tagText, { color: '#4E342E' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#4E342E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sub,i)=>(<TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><sub.icon size={24} color="#4E342E" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{sub.name}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/contract-specialist','/contract-specialist/execute','/contract-specialist/analyze','/contract-specialist/draft','/contract-specialist/review'].map((endpoint,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#4E342E15' }]}><act.icon size={14} color="#4E342E" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <AgentFeatures agentId="contract-specialist" agentName="AI Contract Specialist" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12,marginBottom:8},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});
