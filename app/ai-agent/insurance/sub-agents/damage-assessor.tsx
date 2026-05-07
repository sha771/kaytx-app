import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, ArrowRight, BarChart3, Briefcase, Calculator, ChevronRight, CircleCheckBig, ClipboardList, Clock, DollarSign, FileText, Shield, Target, TrendingUp, Users, Zap
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const CAPABILITIES = ["Damage Assessment","Property Valuation","Repair Estimation","Total Loss Determination","Photo Analysis","Scope of Loss","Depreciation Calculation","Salvage Evaluation"];
const RESPONSIBILITIES = ["Assess property and vehicle damage for claims adjustment","Estimate repair costs and determine total loss thresholds","Analyze damage photos and documentation for assessment","Determine scope of loss and covered damages","Calculate depreciation and actual cash values","Evaluate salvage value for total loss vehicles and property"];
const METRICS = [{"label":"Assessments","value":"6,847","change":"+321","trend":"up"},{"label":"Accuracy","value":"97.4%","change":"+0.8%","trend":"up"},{"label":"Avg Time","value":"2.4 hrs","change":"-18%","trend":"up"},{"label":"Total Loss Rate","value":"12%","change":"-2%","trend":"up"}];

export default function DamageAssessorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Tasks', value: '6,847', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.8s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.4%', icon: Target, color: '#FF5722' }
  ];
  const activities = [{"time":"3 min ago","text":"Assessed vehicle damage for 8 auto collision claims","icon":"ClipboardList"},{"time":"10 min ago","text":"Determined total loss on 2 commercial vehicles","icon":"DollarSign"},{"time":"18 min ago","text":"Calculated depreciation for 4 property claims","icon":"Calculator"}];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF572220' }]}>
          <ClipboardList size={56} color="#FF5722" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{"AI Damage Assessor"}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent · AI Claims Adjuster</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF572222' }]}><Briefcase size={12} color="#FF5722" /><Text style={[styles.badgeText, { color: '#FF5722' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#004D4022' }]}><Shield size={12} color="#004D40" /><Text style={[styles.badgeText, { color: '#004D40' }]}>Insurance</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>AI Damage Assessor - Sub-agent supporting AI Claims Adjuster. Part of the Kaytx AI Workforce Insurance hierarchy providing specialized enterprise capabilities for risk management, underwriting, claims, and actuarial operations.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{CAPABILITIES.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#FF572218' }]}><Text style={[styles.tagText, { color: '#FF5722' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{RESPONSIBILITIES.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#FF5722" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text><View style={styles.metricsGrid}>{METRICS.map((m,i)=>(<View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text><View style={styles.metricTrend}><TrendingUp size={12} color="#34C759" /><Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text></View></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#FF572215' }]}><act.icon size={14} color="#FF5722" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/damage-assessor','/damage-assessor/execute','/damage-assessor/analyze'].map((endpoint,i)=>(<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/insurance/claims-adjuster')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Shield size={24} color="#004D40" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{"AI Claims Adjuster"}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent · Insurance Dept</Text></View><ChevronRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
      <AgentFeatures agentId="damage-assessor" agentName="AI Damage Assessor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:22,fontWeight:'bold',textAlign:'center'},heroSubtitle:{fontSize:14,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:8,marginTop:14,flexWrap:'wrap',justifyContent:'center'},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:16,fontWeight:'bold',marginTop:6},statLabel:{fontSize:11,marginTop:3},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},metricsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},metricCard:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},metricValue:{fontSize:20,fontWeight:'bold'},metricLabel:{fontSize:12,marginTop:4},metricTrend:{flexDirection:'row',alignItems:'center',gap:4,marginTop:6},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},endpointRow:{flexDirection:'row',alignItems:'center',marginBottom:8,gap:8},endpointText:{fontSize:13,fontFamily:'monospace'},parentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:12},parentInfo:{flex:1},parentName:{fontSize:16,fontWeight:'600'},parentDesc:{fontSize:12,marginTop:2}});
