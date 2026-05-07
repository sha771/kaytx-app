import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Factory, Activity, Star, Users, CircleCheckBig, Clock, Target, Zap, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function CPOProductionPage() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '15' }]}><Factory size={48} color={theme.colors.primary} /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI CPO Production</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Production Officer AI</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}><Star size={12} color={theme.colors.primary} /><Text style={[styles.badgeText, { color: theme.colors.primary }]}>C-Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Executive</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Units',value:'2.4M',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'98.5%',icon:Activity,color:'#007AFF'},{label:'Response',value:'0.3s',icon:Clock,color:'#FF9500'},{label:'Yield',value:'99.2%',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI CPO Production manages manufacturing operations, production planning, and quality control. This agent optimizes manufacturing efficiency, ensures product quality, and maintains supply chain operations.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Production Planning','Quality Control','Supply Chain Opt','Manufacturing Analytics','Maintenance','Safety Compliance'].map((cap,i)=>(<View key={i} style={[styles.tag, { backgroundColor: theme.colors.primary + '18' }]}><Text style={[styles.tagText, { color: theme.colors.primary }]}>{cap}</Text></View>))}
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {['Manufacturing Strategy & Operations','Production Planning & Scheduling','Quality Control & Assurance','Supply Chain & Inventory Management','Equipment Maintenance & Reliability','Safety & Compliance Management','Process Optimization & Lean','Cost Control & Efficiency'].map((item,i)=>(<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color={theme.colors.primary} /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {[{time:'2 min ago',text:'Approved production schedule for Q4 ramp-up'},{time:'15 min ago',text:'Updated quality control thresholds for new product line'},{time:'40 min ago',text:'Completed maintenance schedule optimization'},{time:'2 hours ago',text:'Published manufacturing efficiency dashboard'},{time:'4 hours ago',text:'Conducted safety audit for assembly line 3'}].map((act,i)=>(<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '15' }]}><Zap size={14} color={theme.colors.primary} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}><act.icon size={24} color={theme.colors.primary} /><Text style={[styles.actionText, { color: theme.colors.primary }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="cpo-production" agentName="Cpo Production" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  tagsContainer:{flexDirection:'row',flexWrap:'wrap',gap:8},
  tag:{paddingHorizontal:12,paddingVertical:6,borderRadius:20},
  tagText:{fontSize:12,fontWeight:'600'},
  responsibilityRow:{flexDirection:'row',alignItems:'center',marginBottom:10,gap:8},
  responsibilityText:{fontSize:14,flex:1,lineHeight:20},
  activityRow:{flexDirection:'row',alignItems:'center',marginBottom:12,gap:12},
  activityIcon:{width:32,height:32,borderRadius:16,justifyContent:'center',alignItems:'center'},
  activityContent:{flex:1},
  activityText:{fontSize:14,fontWeight:'500'},
  activityTime:{fontSize:12,marginTop:2},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});

