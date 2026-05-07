import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, Eye, Image as ImageIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function BrandGuidelinesEnforcerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    {label:'Status',value:'Active',icon:Activity,color:'#34C759'},
    {label:'Level',value:'Specialist',icon:Briefcase,color:'#9C27B0'},
    {label:'Efficiency',value:'20x',icon:Target,color:'#FF9500'},
    {label:'Parent',value:'vp-brand',icon:Shield,color:'#007AFF'}
  ];
  const capabilities = ["Guideline Compliance","Asset Validation","Brand Police","Template Enforcement","Color/Typography","Logo Usage"];
  const responsibilities = ["Validate marketing assets against brand guidelines","Enforce logo usage and placement rules","Check color palette compliance in all materials","Verify typography standards across documents","Flag guideline violations and suggest corrections","Maintain brand template library","Audit external partner materials for compliance","Generate compliance reports for VP Brand"];
  const activities = [{time:"5 min ago",text:"Flagged 3 color violations in campaign assets",icon:Shield},{time:"30 min ago",text:"Approved 12 assets for brand compliance",icon:Target},{time:"1 hour ago",text:"Updated brand template library v4.2",icon:Zap},{time:"2 hours ago",text:"Rejected partner asset for logo misuse",icon:Activity}];
  const endpoints = ["/consult/brand-guidelines-enforcer","/brand-guidelines-enforcer/execute","/brand-guidelines-enforcer/analyze"];
  const quickActions = [{label:"Validate Asset",icon:Shield},{label:"Compliance Report",icon:Target},{label:"Templates",icon:Zap},{label:"Violations",icon:Activity}];
  return (
    <ScrollView style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <View style={[styles.hero,{backgroundColor:'#9C27B018'}]}>
        <View style={[styles.heroIconWrap,{backgroundColor:'#9C27B025'}]}><Shield size={56} color="#9C27B0"/></View>
        <Text style={[styles.heroTitle,{color:theme.colors.text}]}>AI Brand Guidelines Enforcer</Text>
        <Text style={[styles.heroSubtitle,{color:theme.colors.textSecondary}]}>Sub-Agent of AI VP Brand</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge,{backgroundColor:'#34C75922'}]}><Activity size={12} color="#34C759"/><Text style={[styles.badgeText,{color:'#34C759'}]}>Active</Text></View>
          <View style={[styles.badge,{backgroundColor:'#9C27B022'}]}><Briefcase size={12} color="#9C27B0"/><Text style={[styles.badgeText,{color:'#9C27B0'}]}>Specialist</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>Automatically validates all marketing assets against brand guidelines, ensuring consistent use of logos, colors, typography, and messaging across every touchpoint.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#9C27B018'}]}><Text style={[styles.tagText,{color:'#9C27B0'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#9C27B0"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>A2A Endpoints</Text>{endpoints.map((e,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText,{color:theme.colors.textSecondary}]}>{e}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>{activities.map((a2,i)=>(<View key={i} style={{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12}}><View style={{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center',backgroundColor:'#9C27B015'}}><a2.icon size={14} color="#9C27B0"/></View><View style={{flex:1}}><Text style={{fontSize:14,fontWeight:'500',color:theme.colors.text}}>{a2.text}</Text><Text style={{fontSize:12,marginTop:2,color:theme.colors.textSecondary}}>{a2.time}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.quickActionsGrid}>{quickActions.map((qa,i)=>(<TouchableOpacity key={i} style={[styles.quickActionButton,{backgroundColor:'#9C27B012'}]}><qa.icon size={22} color="#9C27B0"/><Text style={[styles.quickActionText,{color:'#9C27B0'}]}>{qa.label}</Text></TouchableOpacity>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text><TouchableOpacity onPress={()=>router.push('/ai-agent/marketing/vp-brand')} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><Shield size={24} color="#9C27B0"/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>AI VP Brand</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Main Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity></View>
      <AgentFeatures agentId="brand-guidelines-enforcer" agentName="AI Brand Guidelines Enforcer" />
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:36,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:100,height:100,borderRadius:50,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:15,marginTop:6,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:6,borderRadius:20,gap:5},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:14,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4,textAlign:'center'},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},quickActionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},quickActionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:14,borderRadius:12},quickActionText:{fontSize:12,fontWeight:'600',marginTop:6}});