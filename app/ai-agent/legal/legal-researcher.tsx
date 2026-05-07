import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Search, BookOpen, Scale } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Cases/Day',value:'156',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'1.2s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'98.7%',icon:Target,color:'#0D47A1'}];
  const capabilities = ['Case Law Research','Statute Analysis','Precedent Discovery','Regulatory Research','Brief Drafting','Legal Memo Writing','Multi-jurisdiction Analysis','Citation Verification'];
  const responsibilities = ['Conduct comprehensive legal research across jurisdictions','Analyze case law and identify relevant precedents','Draft legal memos and research briefs','Verify citations and legal authorities','Research statutory and regulatory frameworks','Provide litigation support through research','Track legislative developments and changes','Support contract and policy drafting with research'];
  const subAgents = [
    {name:'AI Precedent Finder',route:'/ai-agent/legal/sub-agents/precedent-finder',icon:Search},
    {name:'AI Statute Analyzer',route:'/ai-agent/legal/sub-agents/statute-analyzer',icon:Scale},
    {name:'AI Case Law Summarizer',route:'/ai-agent/legal/sub-agents/case-law-summarizer',icon:BookOpen},
  ];
  const activities = [{time:'4 min ago',text:'Summarized 12 case law precedents for litigation support',icon:CircleCheckBig},{time:'18 min ago',text:'Analyzed new GDPR regulation amendments for compliance',icon:Clock},{time:'42 min ago',text:'Drafted legal memo on IP infringement defenses',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0D47A120' }]}><Search size={48} color="#0D47A1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Legal Researcher</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Legal & Governance • Specialist Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0D47A122' }]}><Star size={12} color="#0D47A1" /><Text style={[styles.badgeText, { color: '#0D47A1' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Search size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Legal Researcher conducts comprehensive legal research, analyzes case law across jurisdictions, and provides actionable legal insights. This specialist-level agent supports litigation, compliance, and corporate legal strategy through advanced legal research capabilities.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#0D47A118' }]}><Text style={[styles.tagText, { color: '#0D47A1' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#0D47A1" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sub,i)=>(<TouchableOpacity key={i} onPress={() => router.push(sub.route as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><sub.icon size={24} color="#0D47A1" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{sub.name}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/legal-researcher','/legal-researcher/execute','/legal-researcher/analyze','/legal-researcher/precedent','/legal-researcher/statute'].map((endpoint,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#0D47A115' }]}><act.icon size={14} color="#0D47A1" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <AgentFeatures agentId="legal-researcher" agentName="AI Legal Researcher" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12,marginBottom:8},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});
