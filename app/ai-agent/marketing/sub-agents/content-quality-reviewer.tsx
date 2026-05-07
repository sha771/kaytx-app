import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, CheckCircle, Clock, Target, Zap, ArrowRight, Briefcase, Calendar, RefreshCw } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ContentQualityReviewerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon:Activity,color:'#34C759'},
    {label:'Level',value:'Specialist',icon:Briefcase,color:'#00897B'},
    {label:'Efficiency',value:'20x',icon:Target,color:'#FF9500'},
    {label:'Parent',value:'vp-content',icon:CheckCircle,color:'#007AFF'}
  ];
  const capabilities = ["Quality Assurance","Brand Voice","Grammar/Style","SEO Compliance","Readability","Content Scoring"];
  const responsibilities = ["Review content for quality and brand voice consistency","Check grammar, style, and readability standards","Validate SEO compliance in all content pieces","Score content against quality benchmarks","Flag content that falls below quality thresholds","Ensure factual accuracy and source verification","Maintain style guide and quality standards documentation","Report quality metrics and improvement areas to VP Content"];
  const activities = [{time:"3 min ago",text:"Approved 10 articles, rejected 2 for voice drift",icon:CheckCircle},{time:"15 min ago",text:"Updated style guide with new terminology",icon:Target},{time:"1 hour ago",text:"Scored 25 content pieces (avg: 8.7/10)",icon:Zap},{time:"2 hours ago",text:"Flagged 3 SEO compliance issues",icon:Activity}];
  const endpoints = ["/consult/content-quality-reviewer","/content-quality-reviewer/execute","/content-quality-reviewer/analyze"];
  const quickActions = [{label:"Review Content",icon:CheckCircle},{label:"Quality Score",icon:Target},{label:"Style Guide",icon:Zap},{label:"SEO Check",icon:Activity}];
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <View style={[styles.hero,{backgroundColor:'#00897B18'}]}>
        <View style={[styles.heroIconWrap,{backgroundColor:'#00897B25'}]}><CheckCircle size={56} color="#00897B"/></View>
        <Text style={[styles.heroTitle,{color:theme.colors.text}]}>AI Content Quality Reviewer</Text>
        <Text style={[styles.heroSubtitle,{color:theme.colors.textSecondary}]}>Sub-Agent of AI VP Content</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge,{backgroundColor:'#34C75922'}]}><Activity size={12} color="#34C759"/><Text style={[styles.badgeText,{color:'#34C759'}]}>Active</Text></View>
          <View style={[styles.badge,{backgroundColor:'#00897B22'}]}><Briefcase size={12} color="#00897B"/><Text style={[styles.badgeText,{color:'#00897B'}]}>Specialist</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>Reviews all content for quality, brand voice consistency, grammar, SEO compliance, and readability, ensuring every piece meets enterprise standards before publication.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#00897B18'}]}><Text style={[styles.tagText,{color:'#00897B'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#00897B"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>A2A Endpoints</Text>{endpoints.map((e,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText,{color:theme.colors.textSecondary}]}>{e}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a2,i)=>(<View key={i} style={{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12}}><View style={{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center',backgroundColor:'#00897B15'}}><a2.icon size={14} color="#00897B"/></View><View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'500',color:theme.colors.text}}>{a2.text}</Text><Text style={{fontSize:12,marginTop:2,color:theme.colors.textSecondary}}>{a2.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.quickActionsGrid}>{quickActions.map((qa,i)=>(<TouchableOpacity key={i} style={[styles.quickActionButton,{backgroundColor:'#00897B12'}]}><qa.icon size={22} color="#00897B"/><Text style={[styles.quickActionText,{color:'#00897B'}]}>{qa.label}</Text></TouchableOpacity>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text><TouchableOpacity onPress={()=>router.push('/ai-agent/marketing/vp-content')} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><CheckCircle size={24} color="#00897B"/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>AI VP Content</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity></View>
      <AgentFeatures agentId="content-quality-reviewer" agentName="AI Content Quality Reviewer" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});