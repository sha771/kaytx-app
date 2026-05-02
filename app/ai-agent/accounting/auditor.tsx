import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, User } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AgentPage() {
  const { theme } = useTheme();
  const stats = [{label:'Tasks/Day',value:'120',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.99%',icon:Activity,color:'#007AFF'},{label:'Response',value:'<1 second',icon:Clock,color:'#FF9500'},{label:'Accuracy',value:'99.2%',icon:Target,color:'#0D47A1'}];
  const capabilities = ['Financial Auditing','Discrepancy Detection','Standards Compliance','Risk Assessment','Internal Controls','Regulatory Reporting'];
  const responsibilities = ['Financial statement preparation & analysis','Budget planning & variance monitoring','Audit coordination & compliance enforcement','Revenue recognition & tracking','Cost optimization & reduction initiatives','Regulatory & tax compliance reporting'];
  const activities = [{time:'3 min ago',text:'Analyzing journal entries for discrepancies',icon: CircleCheckBig},{time:'6 min ago',text:'Running compliance check on expense reports',icon:Clock},{time:'9 min ago',text:'Generating audit trail for Q2 transactions',icon:Zap}];
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0D47A120' }]}><User size={48} color="#0D47A1" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Auditor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Accounting & Finance</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0D47A122' }]}><Star size={12} color="#0D47A1" /><Text style={[styles.badgeText, { color: '#0D47A1' }]}>Agent</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>{stats.map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>Conducts financial audits, identifies discrepancies, and ensures compliance with accounting standards.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: '#0D47A118' }]}><Text style={[styles.tagText, { color: '#0D47A1' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#0D47A1" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: '#0D47A115' }]}><act.icon size={14} color="#0D47A1" /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
      <View style={[styles.costSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cost & ROI Analysis</Text>
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>Human Cost</Text><Text style={[styles.costValue, { color: '#FF3B30' }]}>{agentData.humanCost}</Text></View>
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>AI Cost</Text><Text style={[styles.costValue, { color: '#34C759' }]}>{agentData.aiCost}</Text></View>
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text><Text style={[styles.costValue, { color: color }]}>{agentData.efficiency}</Text></View>
        <View style={styles.costRow}><Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>Replaces</Text><Text style={[styles.costValue, { color: theme.colors.text }]}>{agentData.replacesRole}</Text></View>
        <View style={styles.roiCard}>
          <View style={[styles.roiItem, { backgroundColor: '#34C75915' }]}><Text style={[styles.roiValue, { color: '#34C759' }]}>{agentData.savingsPerMonth}</Text><Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Monthly Savings</Text></View>
          <View style={[styles.roiItem, { backgroundColor: '#007AFF15' }]}><Text style={[styles.roiValue, { color: '#007AFF' }]}>{agentData.tasksAutomatedDaily}</Text><Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Tasks/Day</Text></View>
          <View style={[styles.roiItem, { backgroundColor: '#0D47A115' }]}><Text style={[styles.roiValue, { color: color }]}>{agentData.accuracyRate}</Text><Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text></View>
          <View style={[styles.roiItem, { backgroundColor: '#FF950015' }]}><Text style={[styles.roiValue, { color: '#FF9500' }]}>{agentData.responseTime}</Text><Text style={[styles.roiLabel, { color: theme.colors.textSecondary }]}>Response</Text></View>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Results</Text>
        {[{task:'Monthly Compliance Audit',result:'No Violations',status:'Success'},{task:'Expense Reconciliation',result:'Discrepancies Resolved',status:'Success'},{task:'Internal Control Review',result:'98% Coverage',status:'Success'}].map((h,i)=>(<View key={i} style={styles.responsibilityRow}><CircleCheckBig size={14} color={h.status==='Success'?'#34C759':'#FF3B30'} /><View style={{flex:1}}><Text style={[styles.responsibilityText, { color: theme.colors.text }]}>{h.task}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{h.result} - {h.status}</Text></View></View>))}
      </View>
      <AgentFeatures agentId="auditor" agentName="AI Auditor" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({container:{flex:1},hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},heroTitle:{fontSize:26,fontWeight:'bold'},heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},badgesRow:{flexDirection:'row',gap:10,marginTop:16},badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},badgeText:{fontSize:12,fontWeight:'600'},statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},statValue:{fontSize:18,fontWeight:'bold',marginTop:8},statLabel:{fontSize:11,marginTop:4},section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},description:{fontSize:14,lineHeight:22},tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},tagText:{fontSize:12,fontWeight:'600'},responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},responsibilityText:{fontSize:14,flex:1,lineHeight:20},activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},activityContent:{flex:1},activityText:{fontSize:14,fontWeight:'500'},activityTime:{fontSize:12,marginTop:2},costSection:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},costRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},costLabel:{fontSize:14},costValue:{fontSize:14,fontWeight:'700'},roiCard:{flexDirection:'row',flexWrap:'wrap',gap:12,marginTop:12},roiItem:{flex:1,minWidth:'45%',padding:12,borderRadius:10,alignItems:'center'},roiValue:{fontSize:16,fontWeight:'bold'},roiLabel:{fontSize:11,marginTop:4}});
