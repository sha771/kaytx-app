import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, Activity, Star, CheckCircle2, Clock, Target, ArrowRight, Zap } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AgentPage() {
  const { theme } = useTheme();
  const stats = [{label:'Tasks/Day',value:'84',icon:CheckCircle2,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.5s',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.6%',icon:Target,color:'#1B5E20'}];
  const capabilities = ['Insight Discovery','Automated Analysis','Actionable Recommendations'];
  const responsibilities = ['Performance data collection & analysis','KPI dashboard management','Business intelligence reporting','Predictive model development','ROI calculation & tracking','Executive performance briefings'];
  const activities = [{time:'3 min ago',text:'Generated executive KPI dashboard',icon:CheckCircle2},{time:'6 min ago',text:'Updated predictive analytics models',icon:Clock},{time:'9 min ago',text:'Published quarterly performance report',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1B5E2020' }]}><Bot size={48} color="#1B5E20" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Insight Generation AI</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Performance & Analytics</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1B5E2022' }]}><Star size={12} color="#1B5E20" /><Text style={[styles.badgeText, { color: '#1B5E20' }]}>Agent</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Automatically discovers and generates actionable business insights from data.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#1B5E2018' }]}><Text style={[styles.tagText, { color: '#1B5E20' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#1B5E20" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#1B5E2015' }]}><act.icon size={14} color="#1B5E20" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.costSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cost & ROI Analysis</Text>
        
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>AI Cost</Text><Text style={[styles.costValue, { color: '#34C759' }]}>{agentData.aiCost}</Text></View>
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text><Text style={[styles.costValue, { color: color }]}>{agentData.efficiency}</Text></View>
        
        <View style={styles.roiCard}>
          
          
          
          
        </View>
      </View>
      <AgentFeatures agentId="insight-generation" agentName="Insight Generation AI" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},costSection:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},costRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},costLabel:{fontSize:14},costValue:{fontSize:14,fontWeight:'700'},roiCard:{flexDirection:'row',flexWrap:'wrap',gap:12,marginTop:12},roiItem:{flex:1,minWidth:'45%',padding:12,borderRadius:10,alignItems:'center'},roiValue:{fontSize:16,fontWeight:'bold'},roiLabel:{fontSize:11,marginTop:4}});
