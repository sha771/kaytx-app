import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { DollarSign, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, TrendingUp, TrendingDown, ChartBarBig, Users, Brain, FileText, CheckCircle, AlertTriangle, Layers, Settings, PieChart } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'revenue-modeler', name: 'AI Revenue Modeler', description: 'Revenue scenario modeling & financial projection', icon: TrendingUp, color: '#007AFF' },
  { id: 'pricing-optimizer', name: 'AI Pricing Optimizer', description: 'Dynamic pricing optimization & value-based strategy', icon: DollarSign, color: '#34C759' },
  { id: 'forecast-validator', name: 'AI Forecast Validator', description: 'Forecast accuracy validation & bias detection', icon: CheckCircle, color: '#FF9500' },
];

export default function VPRevenuePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'ARR', value: '$94.2M', icon: DollarSign, color: '#007AFF', change: '+18%' },
    { label: 'NRR', value: '118%', icon: TrendingUp, color: '#34C759', change: '+5%' },
    { label: 'Forecast Acc.', value: '96.8%', icon: ChartBarBig, color: '#FF9500', change: '+2.1%' },
    { label: 'Rev. Growth', value: '32%', icon: TrendingUp, color: '#AF52DE', change: '+4%' },
  ];
  const kpis = [
    { label: 'MRR', value: '$7.85M', trend: 'up' },
    { label: 'Churn Rate', value: '2.1%', trend: 'down' },
    { label: 'ARPU', value: '$42K', trend: 'up' },
    { label: 'LTV/CAC', value: '5.2x', trend: 'up' },
  ];
  const capabilities = ['Revenue Strategy','Forecasting & Modeling','Pricing Strategy','Sales-Marketing Alignment','Revenue Analytics','Growth Planning','Board Reporting','MRR/ARR Tracking','Churn Analysis','Expansion Revenue','Contract Optimization','RevOps'];
  const responsibilities = ['Revenue strategy & go-to-market planning','Revenue forecasting & financial modeling','Pricing strategy & monetization optimization','Sales & marketing revenue alignment','Revenue analytics & executive reporting','Growth planning & execution oversight','Contract value optimization & expansion','Churn reduction & retention strategy','Board-level revenue reporting','Revenue operations process improvement'];
  const activities = [
    { time: '2 min ago', text: 'Updated Q3 revenue forecast: $94.2M ARR', icon: ChartBarBig, type: 'forecast' },
    { time: '15 min ago', text: 'Identified pricing uplift: +$2.4M potential', icon: DollarSign, type: 'pricing' },
    { time: '30 min ago', text: 'Aligned sales & marketing on Q3 plan', icon: Users, type: 'alignment' },
    { time: '1 hour ago', text: 'Validated forecast accuracy: 96.8%', icon: CheckCircle, type: 'validation' },
    { time: '2 hours ago', text: 'Reviewed expansion revenue pipeline', icon: TrendingUp, type: 'growth' },
  ];
  const quickActions = [{ label: 'Revenue Dashboard', icon: ChartBarBig },{ label: 'Forecast Model', icon: TrendingUp },{ label: 'Pricing Review', icon: DollarSign },{ label: 'Growth Plan', icon: TrendingUp },{ label: 'Board Report', icon: FileText },{ label: 'Churn Analysis', icon: Activity }];
  const typeColors: Record<string,string> = { forecast:'#007AFF', pricing:'#34C759', alignment:'#5856D6', validation:'#FF9500', growth:'#34C759' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E6510018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510025' }]}><DollarSign size={48} color="#E65100" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Revenue</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Revenue Officer • Revenue Operations Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}><Star size={12} color="#E65100" /><Text style={[styles.badgeText, { color: '#E65100' }]}>Executive</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((s,i)=>(<View key={i} style={[styles.statCard,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><s.icon size={22} color={s.color}/><Text style={[styles.statValue,{color:theme.colors.text}]}>{s.value}</Text><Text style={[styles.statChange,{color:s.change.startsWith('+')?'#34C759':'#FF3B30'}]}>{s.change}</Text><Text style={[styles.statLabel,{color:theme.colors.textSecondary}]}>{s.label}</Text></View>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Executive Dashboard</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((k,i)=>(<View key={i} style={[styles.kpiCard,{backgroundColor:theme.colors.background}]}><Text style={[styles.kpiValue,{color:theme.colors.text}]}>{k.value}</Text><Text style={[styles.kpiLabel,{color:theme.colors.textSecondary}]}>{k.label}</Text><View style={[styles.trendBadge,{backgroundColor:(k.trend==='up'?'#34C759':'#FF3B30')+'22'}]}>{k.trend==='up'?<TrendingUp size={10} color="#34C759"/>:<TrendingDown size={10} color="#FF3B30"/>}</View></View>))}
        </View>
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Overview</Text><Text style={[styles.description,{color:theme.colors.textSecondary}]}>The AI VP Revenue drives revenue excellence through AI-powered automation, predictive analytics, and intelligent decision-making. This enterprise agent orchestrates specialized sub-agents to deliver comprehensive revenue operations capabilities.</Text></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((c,i)=>(<View key={i} style={[styles.tag,{backgroundColor:'#E6510018'}]}><Text style={[styles.tagText,{color:'#E65100'}]}>{c}</Text></View>))}</View></View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Strategic Responsibilities</Text>{responsibilities.map((r,i)=>(<View key={i} style={styles.responsibilityRow}><View style={[styles.bulletPoint,{backgroundColor:'#E65100'}]}/><Text style={[styles.responsibilityText,{color:theme.colors.textSecondary}]}>{r}</Text></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}>
        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Specialized Sub-Agents</Text><View style={[styles.countBadge,{backgroundColor:'#E6510022'}]}><Text style={[styles.countBadgeText,{color:'#E65100'}]}>{SUB_AGENTS.length}</Text></View></View>
        <Text style={[styles.sectionDesc,{color:theme.colors.textSecondary}]}>AI workers specializing in revenue functions</Text>
        {SUB_AGENTS.map((a)=>(<TouchableOpacity key={a.id} onPress={()=>router.push(`/ai-agent/sales/sub-agents/${a.id}`)} style={[styles.agentCard,{backgroundColor:theme.colors.background}]}><View style={[styles.agentIcon,{backgroundColor:a.color+'20'}]}><a.icon size={24} color={a.color}/></View><View style={styles.agentInfo}><Text style={[styles.agentName,{color:theme.colors.text}]}>{a.name}</Text><Text style={[styles.agentDesc,{color:theme.colors.textSecondary}]}>{a.description}</Text></View><ArrowRight size={20} color={theme.colors.textSecondary}/></TouchableOpacity>))}
      </View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Executive Activity Feed</Text>{activities.map((a,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon,{backgroundColor:(typeColors[a.type]||'#8E8E93')+'20'}]}><a.icon size={14} color={typeColors[a.type]||'#8E8E93'}/></View><View style={styles.activityContent}><Text style={[styles.activityText,{color:theme.colors.text}]}>{a.text}</Text><Text style={[styles.activityTime,{color:theme.colors.textSecondary}]}>{a.time}</Text></View><View style={[styles.activityBadge,{backgroundColor:(typeColors[a.type]||'#8E8E93')+'15'}]}><Text style={[styles.activityBadgeText,{color:typeColors[a.type]||'#8E8E93'}]}>{a.type}</Text></View></View>))}</View>
      <View style={[styles.section,{backgroundColor:theme.colors.card||'#F2F2F7'}]}><Text style={[styles.sectionTitle,{color:theme.colors.text}]}>Quick Actions</Text><View style={styles.actionsGrid}>{quickActions.map((a,i)=>(<TouchableOpacity key={i} style={[styles.actionButton,{backgroundColor:'#E6510012'}]}><a.icon size={22} color="#E65100"/><Text style={[styles.actionText,{color:'#E65100'}]}>{a.label}</Text></TouchableOpacity>))}</View></View>
      <AgentFeatures agentId="vp-revenue" agentName="AI VP Revenue" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#E5E5EA'},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',marginTop:16,gap:8},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statChange:{fontSize:11,fontWeight:'600',marginTop:2},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:8},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},sectionDesc:{fontSize:13,marginBottom:16,lineHeight:18},description:{fontSize:14,lineHeight:22},kpiGrid:{flexDirection:'row',flexWrap:'wrap',gap:12,marginTop:8},kpiCard:{flex:1,minWidth:'45%',padding:14,borderRadius:12,position:'relative'},kpiValue:{fontSize:20,fontWeight:'bold'},kpiLabel:{fontSize:12,marginTop:4},trendBadge:{position:'absolute',top:10,right:10,padding:4,borderRadius:8},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},bulletPoint:{width:6,height:6,borderRadius:3},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:10},responsibilityText:{fontSize:14,flex:1,lineHeight:20},countBadge:{paddingHorizontal:8,paddingVertical:2,borderRadius:12},countBadgeText:{fontSize:12,fontWeight:'700'},agentCard:{flexDirection:'row',alignItems:'center',padding:14,borderRadius:12,marginBottom:10},agentIcon:{width:44,height:44,borderRadius:12,justifyContent:'center',alignItems:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:15,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},activityBadge:{paddingHorizontal:8,paddingVertical:3,borderRadius:10},activityBadgeText:{fontSize:10,fontWeight:'600',textTransform:'capitalize'},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},actionText:{fontSize:12,fontWeight:'600',marginTop:8},
});
