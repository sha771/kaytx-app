import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, TrendingUp, Clock, Target, Zap, ArrowRight, Briefcase, Globe, Gauge } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ConversionAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon:Activity,color:'#34C759'},
    {label:'Level',value:'Specialist',icon:Briefcase,color:'#1565C0'},
    {label:'Efficiency',value:'20x',icon:Target,color:'#FF9500'},
    {label:'Parent',value:'vp-digital',icon:TrendingUp,color:'#007AFF'}
  ];
  const capabilities = ["Conversion Analysis","Funnel Insights","A/B Recommendations","User Behavior","Heatmap Analysis","CRO Strategy"];
  const responsibilities = ["Analyze conversion rates across all digital touchpoints","Identify conversion optimization opportunities","Interpret user behavior data and heatmaps","Recommend CRO strategies based on data insights","Evaluate A/B test results for conversion impact","Track conversion rate trends by segment and channel","Prioritize CRO initiatives by expected impact","Report conversion insights and CRO results to VP Digital"];
  const activities = [{time:"2 min ago",text:"Identified 18% conversion lift opportunity on /signup",icon:TrendingUp},{time:"20 min ago",text:"Analyzed heatmap data for checkout page",icon:Target},{time:"1 hour ago",text:"Recommended 3 CRO initiatives for Q3",icon:Zap},{time:"3 hours ago",text:"Generated conversion rate trend report",icon:Activity}];
  const endpoints = ["/consult/conversion-analyst","/conversion-analyst/execute","/conversion-analyst/analyze"];
  const quickActions = [{label:"Conversion Report",icon:TrendingUp},{label:"Heatmap",icon:Target},{label:"CRO Plan",icon:Zap},{label:"Funnel Data",icon:Activity}];
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <View style={[styles.hero,{backgroundColor:'#1565C018'}]}>
        <View style={[styles.heroIconWrap,{backgroundColor:'#1565C025'}]}><TrendingUp size={56} color="#1565C0"/></View>
        <Text style={[styles.heroTitle,{color:theme.colors.text}]}>AI Conversion Analyst</Text>
        <Text style={[styles.heroSubtitle,{color:theme.colors.textSecondary}]}>Sub-Agent of AI VP Digital</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge,{backgroundColor:'#34C75922'}]}><Activity size={12} color="#34C759"/><Text style={[styles.badgeText,{color:'#34C759'}]}>Active</Text></View>
          <View style={[styles.badge,{backgroundColor:'#1565C022'}]}><Briefcase size={12} color="#1565C0"/><Text style={[styles.badgeText,{color:'#1565C0'}]}>Specialist</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>Analyzes conversion patterns across digital touchpoints, identifying optimization opportunities and providing data-driven CRO recommendations to increase conversion rates.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#1565C018'}]}><Text style={[styles.tagText,{color:'#1565C0'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#1565C0"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>A2A Endpoints</Text>{endpoints.map((e,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText,{color:theme.colors.textSecondary}]}>{e}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a2,i)=>(<View key={i} style={{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12}}><View style={{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center',backgroundColor:'#1565C015'}}><a2.icon size={14} color="#1565C0"/></View><View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'500',color:theme.colors.text}}>{a2.text}</Text><Text style={{fontSize:12,marginTop:2,color:theme.colors.textSecondary}}>{a2.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.quickActionsGrid}>{quickActions.map((qa,i)=>(<TouchableOpacity key={i} style={[styles.quickActionButton,{backgroundColor:'#1565C012'}]}><qa.icon size={22} color="#1565C0"/><Text style={[styles.quickActionText,{color:'#1565C0'}]}>{qa.label}</Text></TouchableOpacity>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text><TouchableOpacity onPress={()=>router.push('/ai-agent/marketing/vp-digital')} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><TrendingUp size={24} color="#1565C0"/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>AI VP Digital</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity></View>
      <AgentFeatures agentId="conversion-analyst" agentName="AI Conversion Analyst" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});