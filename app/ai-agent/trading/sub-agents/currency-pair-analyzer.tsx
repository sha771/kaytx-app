import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, Globe, DollarSign, Key, Monitor } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const METRICS = [{"label":"Signal Acc","value":"92.4%","change":"+1.8%","trend":"up"},{"label":"Carry Yield","value":"+6.2%","change":"+0.4%","trend":"up"},{"label":"Correlation Det","value":"94%","change":"+2%","trend":"up"},{"label":"Pattern Rec","value":"87%","change":"+3%","trend":"up"}];

export default function CurrencyPairAnalyzerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [{label:'Pairs',value:'42',icon:Globe,color:'#34C759'},{label:'Signals',value:'847',icon:Zap,color:'#007AFF'},{label:'Accuracy',value:'92.4%',icon:Target,color:'#FF9500'},{label:'Coverage',value:'100%',icon:Activity,color:'#AF52DE'}];
  const capabilities = ["Technical Analysis","Fundamental Analysis","Carry Calculation","Volatility Surface","Correlation Matrix","Momentum Signals","Mean-reversion","Pattern Recognition"];
  const responsibilities = ["Analyze currency pairs using technical and fundamental methods","Calculate carry trade returns and roll-down metrics","Build FX volatility surfaces and term structures","Monitor cross-pair correlations and dependencies","Generate momentum and mean-reversion signals","Detect chart patterns and breakout levels"];
  const activities = [{time:'2 min ago',text:'Generated momentum signal on EUR/JPY',icon:Zap},{time:'6 min ago',text:'Updated carry calculation for 42 pairs',icon:DollarSign},{time:'14 min ago',text:'Detected correlation break in AUD/NZD',icon:Activity},{time:'28 min ago',text:'Identified head-and-shoulders on GBP/USD',icon:TrendingUp},{time:'1 hr ago',text:'Published FX technical analysis report',icon:FileText}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <TouchableOpacity onPress={() => router.push('/ai-agent/trading/forex-trader')} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Globe size={16} color="#00897B" />
          <Text style={{ fontSize: 13, color: '#00897B', marginLeft: 6, fontWeight: '600' }}>← AI Forex Trader</Text>
        </TouchableOpacity>
        <View style={[styles.heroIconWrap, { backgroundColor: '#00897B20' }]}>
          <Globe size={48} color="#00897B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Currency Pair Analyzer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Technical & Fundamental FX Analysis</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#00897B22' }]}><Star size={12} color="#00897B" /><Text style={[styles.badgeText, { color: '#00897B' }]}>Sub-Agent</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Trading Dept</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Shield size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Enterprise</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text>
        <Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI Currency Pair Analyzer operates as a specialized sub-agent under AI Forex Trader, delivering enterprise-grade capabilities in technical & fundamental fx analysis within the Trading & Investments department.</Text>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#00897B18'}]}><Text style={[styles.tagText,{color:'#00897B'}]}>{c}</Text></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Key Responsibilities</Text>
        {responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#00897B"/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}><Text style={[styles.metricValue,{color:theme.colors.text}]}>{m.value}</Text><Text style={[styles.metricLabel,{color:theme.colors.textSecondary}]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color="#34C759"/><Text style={{fontSize:11,color:'#34C759',fontWeight:'600'}}>{m.change}</Text></View></View>))}</View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Recent Activity</Text>
        {activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:'#00897B15'}]}><a.icon size={14} color="#00897B"/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Parent Agent</Text>
        <TouchableOpacity onPress={()=>router.push('/ai-agent/trading/forex-trader')} style={[styles.agentCard,{backgroundColor:theme.colors.background||'#F2F2F7'}]}>
          <View style={[styles.agentIcon,{backgroundColor:'#00897B20'}]}><Globe size={28} color="#00897B"/></View>
          <View style={styles.agentInfo}><Text style={[styles.agentName,{color:theme.colors.text}]}>{d.pt}</Text><Text style={[styles.agentDesc,{color:theme.colors.textSecondary}]}>Parent Agent</Text></View>
          <ChevronRight size={20} color={theme.colors.textSecondary}/>
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="currency-pair-analyzer" agentName="AI Currency Pair Analyzer"/>
      <View style={{height:40}}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},
});
