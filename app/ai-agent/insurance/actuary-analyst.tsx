import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Calculator, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap,
  Users, MessageSquare, ChartBarBig, TrendingUp, AlertTriangle,
  Shield, ChevronRight, TrendingDown, BarChart3, FileText
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'loss-development-tracker', name: 'AI Loss Development Tracker', icon: TrendingDown, desc: 'Tracks loss development patterns and IBNR estimation across all lines' },
  { id: 'frequencyseverity-modeler', name: 'AI Frequency/Severity Modeler', icon: BarChart3, desc: 'Models claim frequency and severity distributions for pricing and reserving' },
  { id: 'rate-filing-preparer', name: 'AI Rate Filing Preparer', icon: FileText, desc: 'Prepares and validates rate filing documentation for regulatory submission' },
];

const QUICK_ACTIONS = [
  { label: 'Loss Models', icon: Calculator },
  { label: 'Team Chat', icon: MessageSquare },
  { label: 'Rate Filings', icon: FileText },
  { label: 'Reserving', icon: ChartBarBig },
];

const METRICS = [
  { label: 'Models Validated', value: '5,216', change: '+14%', trend: 'up' },
  { label: 'Reserve Accuracy', value: '98.6%', change: '+1.2%', trend: 'up' },
  { label: 'Rate Filings', value: '23', change: '+5', trend: 'up' },
  { label: 'IBNR Accuracy', value: '97.8%', change: '+2.1%', trend: 'up' },
];

export default function ActuaryAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks', value: '5,216', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '2.0s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.6%', icon: Target, color: '#004D40' }
  ];

  const capabilities = [
    'Actuarial Modeling', 'Pricing Analysis', 'Loss Reserving',
    'Risk Quantification', 'Statistical Analysis', 'Regulatory Compliance',
    'Loss Development Tracking', 'Frequency/Severity Modeling', 'Rate Filing Preparation',
    'IBNR Estimation', 'Data Quality Assurance', 'Stochastic Simulation'
  ];

  const responsibilities = [
    'Actuarial model development, calibration, and maintenance across all lines',
    'Pricing analysis, rate indication calculation, and rate filing support',
    'Loss reserving, IBNR estimation, and reserve adequacy testing',
    'Risk quantification and measurement for capital and solvency requirements',
    'Statistical analysis, hypothesis testing, and data modeling',
    'Regulatory compliance for actuarial work and rate filings',
    'Loss development tracking and chain-ladder analysis',
    'Frequency and severity distribution modeling and selection',
    'Rate filing preparation, documentation, and regulatory submission',
    'Data quality assurance and actuarial data governance'
  ];

  const activities = [
    { time: '3 min ago', text: 'Updated loss development factors for Q4 across 5 lines', icon: Calculator },
    { time: '6 min ago', text: 'Completed pricing review for 3 commercial products', icon: ChartBarBig },
    { time: '9 min ago', text: 'Validated reserve estimates: $142M total across all lines', icon: TrendingDown },
    { time: '14 min ago', text: 'Prepared rate filing for auto liability in 3 states', icon: FileText },
    { time: '28 min ago', text: 'Modeled severity distribution for workers compensation', icon: BarChart3 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#004D4020' }]}>
          <Calculator size={48} color="#004D40" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Actuary Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Actuarial Science & Pricing</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#004D4022' }]}><Star size={12} color="#004D40" /><Text style={[styles.badgeText, { color: '#004D40' }]}>Analyst</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Shield size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>Insurance Dept</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Actuary Analyst leads actuarial modeling, pricing analysis, and loss reserving across the Insurance division. This agent develops and validates actuarial models, supports rate filings, and ensures reserve adequacy. It orchestrates sub-agents for loss development tracking, frequency/severity modeling, and rate filing preparation.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#004D4018' }]}><Text style={[styles.tagText, { color: '#004D40' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#004D40" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text><Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>Direct reports executing loss development tracking, frequency/severity modeling, and rate filing preparation.</Text>{SUB_AGENTS.map((agent)=>(<TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/insurance/sub-agents/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><agent.icon size={28} color="#F59E0B" /></View><View style={styles.agentInfo}><Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text><Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text></View><ChevronRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text><View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color={m.trend==='up'?'#34C759':'#FF3B30'} /><Text style={{ fontSize: 11, color: m.trend==='up'?'#34C759':'#FF3B30', fontWeight: '600' }}>{m.change}</Text></View></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#004D4015' }]}><act.icon size={14} color="#004D40" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text><View style={styles.actionsGrid}>{QUICK_ACTIONS.map((action,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#004D4012' }]}><action.icon size={24} color="#004D40" /><Text style={[styles.actionText, { color: '#004D40' }]}>{action.label}</Text></TouchableOpacity>))}</View></View>
      <AgentFeatures agentId="actuary-analyst" agentName="AI Actuary Analyst" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},agentInfo:{flex:1,marginLeft:12},agentName:{fontSize:16,fontWeight:'600'},agentDesc:{fontSize:12,marginTop:2},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},actionText:{fontSize:13,fontWeight:'600',marginTop:8}});
