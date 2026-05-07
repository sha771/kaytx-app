import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, Layers, ShieldCheck, Leaf, Key } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const METRICS = [{"label":"Report Count","value":"847","change":"+42","trend":"up"},{"label":"Compliance","value":"100%","change":"0%","trend":"up"},{"label":"Framework Support","value":"6","change":"+1","trend":"up"},{"label":"On-time","value":"100%","change":"0%","trend":"up"}];

export default function ImpactReporterPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Reports',value:'847',icon:FileText,color:'#34C759'},{label:'Frameworks',value:'6',icon:Layers,color:'#007AFF'},{label:'Compliance',value:'100%',icon:ShieldCheck,color:'#FF9500'},{label:'On-time',value:'100%',icon:Clock,color:'#AF52DE'}];
  const capabilities = ["TCFD Reporting","SFDR Classification","EU Taxonomy","GRI Standards","SASB Mapping","Green Bond Verification","Impact Metrics","Regulatory Filing"];
  const responsibilities = ["Produce TCFD-aligned climate risk and opportunity reports","Classify funds under SFDR Article 6/8/9 categories","Verify EU Taxonomy alignment for investments","Map disclosures to GRI and SASB frameworks","Verify green bond use-of-proceeds compliance","Generate impact metrics and regulatory filing documents"];
  const activities = [{time:'2 min ago',text:'Generated TCFD report for Q3',icon:FileText},{time:'6 min ago',text:'Classified 42 funds under SFDR',icon:Layers},{time:'14 min ago',text:'Verified EU Taxonomy alignment',icon:ShieldCheck},{time:'28 min ago',text:'Mapped SASB disclosures',icon:Activity},{time:'1 hr ago',text:'Published impact metrics dashboard',icon:ChartBarBig}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <TouchableOpacity onPress={() => router.push('/ai-agent/trading/esg-analyst')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Leaf size={16} color="#2E7D32" />
          <Text style={{ fontSize: 13, color: '#2E7D32', marginLeft: 6, fontWeight: '600' }}>← AI ESG Analyst</Text>
        </TouchableOpacity>
        <View style={[styles.heroIconWrap, { backgroundColor: '#2E7D3220' }]}>
          <FileText size={48} color="#2E7D32" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Impact Reporter</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>TCFD, SFDR & EU Taxonomy Reporting</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#2E7D3222' }]}><Star size={12} color="#2E7D32" /><Text style={[styles.badgeText, { color: '#2E7D32' }]}>Sub-Agent</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Trading Dept</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Shield size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Enterprise</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text>
        <Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI Impact Reporter operates as a specialized sub-agent under AI ESG Analyst, delivering enterprise-grade capabilities in tcfd, sfdr & eu taxonomy reporting within the Trading & Investments department.</Text>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#2E7D3218'}]}><Text style={[styles.tagText,{color:'#2E7D32'}]}>{c}</Text></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>
        {responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#2E7D32"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><Text style={[styles.metricValue,{color:theme.colors.text}]}>{m.value}</Text><Text style={[styles.metricLabel,{color:theme.colors.textSecondary}]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color="#34C759"/><Text style={{fontSize:11,color:'#34C759',fontWeight:'600'}}>{m.change}</Text></View></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>
        {activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#2E7D3215'}]}><a.icon size={14} color="#2E7D32"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text>
        <TouchableOpacity onPress={()=>router.push('/ai-agent/trading/esg-analyst')} style={[styles.agentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}>
          <View style={[styles.agentIcon,{backgroundColor:'#2E7D3220'}]}><Leaf size={28} color="#2E7D32"/></View>
          <View style={styles.agentInfo}><Text style={[styles.agentName,{color:theme.colors.text}]}>{d.pt}</Text><Text style={[styles.agentDesc,{color:theme.colors.textSecondary}]}>Parent Agent</Text></View>
          <ChevronRight size={20} color={theme.colors.textSecondary}/>
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="impact-reporter" agentName="AI Impact Reporter"/>
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},
});
