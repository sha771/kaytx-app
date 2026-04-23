import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Heart, Activity, Star, Users, CheckCircle2, Clock, Target, ArrowRight, BarChart3, MessageSquare, Calendar, Shield, TrendingUp, DollarSign, Stethoscope, ShieldCheck, FileText, CreditCard, Code, Monitor, Building } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'billing-specialist', name: 'Billing Specialist', description: 'Billing Specialist AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'care-coordinator', name: 'Care Coordinator', description: 'Care Coordinator AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'cmo-healthcare', name: 'CMO Healthcare', description: 'CMO Healthcare AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'compliance-healthcare', name: 'Healthcare Compliance', description: 'Healthcare Compliance AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'health-records-specialist', name: 'Health Records Specialist', description: 'Health Records Specialist AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'medical-billing-manager', name: 'Medical Billing Manager', description: 'Medical Billing Manager AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'medical-coder', name: 'Medical Coder', description: 'Medical Coder AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'patient-coordinator', name: 'Patient Coordinator', description: 'Patient Coordinator AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'patient-services-manager', name: 'Patient Services Manager', description: 'Patient Services Manager AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'quality-improvement', name: 'Quality Improvement Specialist', description: 'Quality Improvement Specialist AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'scheduling-manager', name: 'Scheduling Manager', description: 'Scheduling Manager AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'telehealth-support', name: 'Telehealth Support', description: 'Telehealth Support AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'vp-healthcare-operations', name: 'VP Healthcare Operations', description: 'VP Healthcare Operations AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'vp-healthcare-ops', name: 'VP Healthcare Operations', description: 'VP Healthcare Operations AI Agent', icon: Heart, color: '#B71C1C' },
  { id: 'vp-patient-experience', name: 'VP Patient Experience', description: 'VP Patient Experience AI Agent', icon: Heart, color: '#B71C1C' }
];;

export default function healthcareDepartment() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#B71C1C20' }]}><Heart size={48} color="#B71C1C" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Healthcare</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Healthcare Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#B71C1C22' }]}><Star size={12} color="#B71C1C" /><Text style={[styles.badgeText, { color: '#B71C1C' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon:CheckCircle2,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#B71C1C'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{info.desc}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/healthcare/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:BarChart3},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#B71C1C12' }]}><act.icon size={24} color="#B71C1C" /><Text style={[styles.actionText, { color: '#B71C1C' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="healthcare-index" agentName="Healthcare Department" />
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
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
