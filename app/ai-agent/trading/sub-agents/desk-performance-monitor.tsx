import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, DollarSign, BarChart3, Key, Monitor } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const METRICS = [{"label":"Desk P&L","value":"+$4.2M","change":"+$840K","trend":"up"},{"label":"Avg Score","value":"87.4","change":"+2.1","trend":"up"},{"label":"Alerts","value":"12","change":"-3","trend":"up"},{"label":"Reports","value":"847","change":"+42","trend":"up"}];

export default function DeskPerformanceMonitorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Traders',value:'24',icon:Users,color:'#34C759'},{label:'P&L Real-time',value:'+$4.2M',icon:DollarSign,color:'#007AFF'},{label:'Alerts',value:'12',icon:AlertTriangle,color:'#FF9500'},{label:'Reports',value:'847',icon:FileText,color:'#AF52DE'}];
  const capabilities = ["P&L Tracking","Trader Scoring","Execution Analytics","Benchmark Comparison","Real-time Dashboard","Attribution Analysis","Alert Generation","Historical Trending"];
  const responsibilities = ["Track real-time desk and individual trader P&L","Score trader performance against benchmarks","Analyze execution quality and fill rates","Generate performance alerts and exception reports","Produce daily and weekly performance summaries","Maintain historical performance trending"];
  const activities = [{time:'1 min ago',text:'Updated real-time desk P&L dashboard',icon:Activity},{time:'4 min ago',text:'Scored 24 traders on execution quality',icon:Users},{time:'12 min ago',text:'Generated performance exception alert',icon:AlertTriangle},{time:'28 min ago',text:'Published daily desk performance summary',icon:FileText},{time:'1 hr ago',text:'Completed weekly attribution analysis',icon:BarChart3}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <TouchableOpacity onPress={() => router.push('/ai-agent/trading/vp-trading')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TrendingUp size={16} color="#1565C0" />
          <Text style={{ fontSize: 13, color: '#1565C0', marginLeft: 6, fontWeight: '600' }}>← AI VP Trading</Text>
        </TouchableOpacity>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C020' }]}>
          <Activity size={48} color="#1565C0" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Desk Performance Monitor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Real-time P&L Tracking & Trader Analytics</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Star size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>Sub-Agent</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Trading Dept</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Shield size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Enterprise</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text>
        <Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI Desk Performance Monitor operates as a specialized sub-agent under AI VP Trading, delivering enterprise-grade capabilities in real-time p&l tracking & trader analytics within the Trading & Investments department.</Text>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#1565C018'}]}><Text style={[styles.tagText,{color:'#1565C0'}]}>{c}</Text></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>
        {responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#1565C0"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><Text style={[styles.metricValue,{color:theme.colors.text}]}>{m.value}</Text><Text style={[styles.metricLabel,{color:theme.colors.textSecondary}]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color="#34C759"/><Text style={{fontSize:11,color:'#34C759',fontWeight:'600'}}>{m.change}</Text></View></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>
        {activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#1565C015'}]}><a.icon size={14} color="#1565C0"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text>
        <TouchableOpacity onPress={()=>router.push('/ai-agent/trading/vp-trading')} style={[styles.agentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}>
          <View style={[styles.agentIcon,{backgroundColor:'#1565C020'}]}><TrendingUp size={28} color="#1565C0"/></View>
          <View style={styles.agentInfo}><Text style={[styles.agentName,{color:theme.colors.text}]}>{d.pt}</Text><Text style={[styles.agentDesc,{color:theme.colors.textSecondary}]}>Parent Agent</Text></View>
          <ChevronRight size={20} color={theme.colors.textSecondary}/>
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="desk-performance-monitor" agentName="AI Desk Performance Monitor"/>
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},actionText:{fontSize:13,fontWeight:'600',marginTop:8},
});
