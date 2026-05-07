import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Activity, Shield, CircleCheckBig, Clock, Target, ArrowRight, Zap, BookOpen, Tag, GitBranch } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Catalogs',value:'89',icon:BookOpen,color:'#34C759'},{label:'Uptime',value:'99.7%',icon:Activity,color:'#007AFF'},{label:'Response',value:'1.2s',icon:Clock,color:'#FF9500'},{label:'Quality',value:'94.2%',icon:Target,color:'#00BCD4'}];
  const capabilities = ['Data Cataloging','Metadata Enforcement','Data Lineage','Quality Scoring','Standard Enforcement','Issue Resolution'];
  const responsibilities = ['Curate and maintain enterprise data catalogs','Enforce metadata standards across all data assets','Track data lineage and provenance chains','Score data quality and flag anomalies','Enforce data standards and compliance rules','Resolve data quality issues and discrepancies'];
  const activities = [{time:'5 min ago',text:'Updated data catalog with 12 new entries',icon:BookOpen},{time:'20 min ago',text:'Enforced metadata rules on staging DB',icon:Tag},{time:'45 min ago',text:'Traced lineage for customer data pipeline',icon:GitBranch}];
  const subAgents = [
    {name:'AI Data Catalog Curator',icon:BookOpen,route:'/ai-agent/data/sub-agents/data-catalog-curator',color:'#00BCD4'},
    {name:'AI Metadata Enforcer',icon:Tag,route:'/ai-agent/data/sub-agents/metadata-enforcer',color:'#007AFF'},
    {name:'AI Data Lineage Tracker',icon:GitBranch,route:'/ai-agent/data/sub-agents/data-lineage-tracker',color:'#FF9500'},
  ];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#00BCD420' }]}><Database size={48} color="#00BCD4" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Data Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Data Management Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#00BCD422' }]}><Shield size={12} color="#00BCD4" /><Text style={[styles.badgeText, { color: '#00BCD4' }]}>Manager</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Data Manager oversees data cataloging, metadata enforcement, lineage tracking, quality scoring, and standard compliance. Ensures enterprise data assets are discoverable, trustworthy, and compliant with governance policies.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#00BCD418' }]}><Text style={[styles.tagText, { color: '#00BCD4' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#00BCD4" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/data-manager','/data/catalog','/data/metadata','/data/lineage'].map((ep,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6"/><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>{subAgents.map((sa,i)=>(<TouchableOpacity key={i} onPress={()=>router.push(sa.route as any)} style={[styles.parentCard,{backgroundColor:theme.colors.background||'#F2F2F7',marginTop:i>0?8:0}]}><sa.icon size={24} color={sa.color}/><View style={styles.parentInfo}><Text style={[styles.parentName,{color:theme.colors.text}]}>{sa.name}</Text><Text style={[styles.parentDesc,{color:theme.colors.textSecondary}]}>Sub-Agent</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#00BCD415' }]}><act.icon size={14} color="#00BCD4" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <AgentFeatures agentId="data-manager" agentName="AI Data Manager" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2}});


