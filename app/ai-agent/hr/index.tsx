import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, UserPlus, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, GraduationCap, Heart, Award } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'ai-recruiter', name: 'AI Recruiter', description: 'AI Recruiter AI Agent', icon: Users, color: '#880E4F' },
  { id: 'benefits-manager', name: 'AI Benefits Manager', description: 'AI Benefits Manager AI Agent', icon: Users, color: '#880E4F' },
  { id: 'chro', name: 'CHRO', description: 'CHRO AI Agent', icon: Users, color: '#880E4F' },
  { id: 'compensation-analyst', name: 'Compensation Analyst', description: 'Compensation Analyst AI Agent', icon: Users, color: '#880E4F' },
  { id: 'culture-agent', name: 'AI Culture Agent', description: 'AI Culture Agent AI Agent', icon: Users, color: '#880E4F' },
  { id: 'hr-compliance', name: 'AI HR Compliance', description: 'AI HR Compliance AI Agent', icon: Users, color: '#880E4F' },
  { id: 'hr-ops-specialist', name: 'HR Operations Specialist', description: 'HR Operations Specialist AI Agent', icon: Users, color: '#880E4F' },
  { id: 'learning-specialist', name: 'Learning & Development Specialist', description: 'Learning & Development Specialist AI Agent', icon: Users, color: '#880E4F' },
  { id: 'onboarding-agent', name: 'AI Onboarding Agent', description: 'AI Onboarding Agent AI Agent', icon: Users, color: '#880E4F' },
  { id: 'performance-reviewer', name: 'AI Performance Reviewer', description: 'AI Performance Reviewer AI Agent', icon: Users, color: '#880E4F' },
  { id: 'recruiter', name: 'AI Recruiter', description: 'AI Recruiter AI Agent', icon: Users, color: '#880E4F' },
  { id: 'recruiting-manager', name: 'Recruiting Manager', description: 'Recruiting Manager AI Agent', icon: Users, color: '#880E4F' },
  { id: 'training-coordinator', name: 'AI Training Coordinator', description: 'AI Training Coordinator AI Agent', icon: Users, color: '#880E4F' },
  { id: 'vp-compensation', name: 'VP Compensation', description: 'VP Compensation AI Agent', icon: Users, color: '#880E4F' },
  { id: 'vp-culture', name: 'VP Culture', description: 'VP Culture AI Agent', icon: Users, color: '#880E4F' },
  { id: 'vp-hr-ops', name: 'VP HR Operations', description: 'VP HR Operations AI Agent', icon: Users, color: '#880E4F' },
  { id: 'vp-learning', name: 'VP Learning & Development', description: 'VP Learning & Development AI Agent', icon: Users, color: '#880E4F' },
  { id: 'vp-talent', name: 'VP Talent', description: 'VP Talent AI Agent', icon: Users, color: '#880E4F' }
];;

export default function HRDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#9C27B020' }]}><Users size={48} color="#9C27B0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Human Resources</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for People Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#9C27B022' }]}><Star size={12} color="#9C27B0" /><Text style={[styles.badgeText, { color: '#9C27B0' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><UserPlus size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Hires',value:'50+/mo',icon:Clock,color:'#FF9500'},{label:'Satisfaction',value:'96%',icon:Target,color:'#9C27B0'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Human Resources department manages the entire employee lifecycle through AI-powered agents. From recruitment and onboarding to training and engagement, our agents create an exceptional workplace experience.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/hr/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#9C27B012' }]}><act.icon size={24} color="#9C27B0" /><Text style={[styles.actionText, { color: '#9C27B0' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>33 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/hr/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#9C27B015' }]}>
          <Users size={20} color="#9C27B0" />
          <Text style={[styles.subAgentButtonText, { color: '#9C27B0' }]}>View All 33 Sub-Agents</Text>
          <ArrowRight size={18} color="#9C27B0" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="hr-index" agentName="Index" />
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

