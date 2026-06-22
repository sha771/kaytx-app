import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Activity, Star, UserPlus, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, GraduationCap, Heart, Award, Settings, FileText, Layers } from 'lucide-react-native';
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
  { id: 'vp-talent', name: 'VP Talent', description: 'VP Talent AI Agent', icon: Users, color: '#880E4F' },
  { id: 'director-hr-1', name: 'Director of HR - North America', description: 'Director of HR North America AI Agent', icon: Users, color: '#E91E63' },
  { id: 'director-hr-2', name: 'Director of HR - Europe', description: 'Director of HR Europe AI Agent', icon: Users, color: '#E91E63' },
  { id: 'director-hr-3', name: 'Director of HR - Asia Pacific', description: 'Director of HR Asia Pacific AI Agent', icon: Users, color: '#E91E63' },
  { id: 'director-hr-4', name: 'Director of HR - Latin America', description: 'Director of HR Latin America AI Agent', icon: Users, color: '#E91E63' },
  { id: 'director-hr-5', name: 'Director of HR - Global Operations', description: 'Director of HR Global Operations AI Agent', icon: Users, color: '#E91E63' },
  { id: 'director-talent-acquisition-1', name: 'Director of Talent Acquisition - Technical', description: 'Director of Talent Acquisition Technical AI Agent', icon: UserPlus, color: '#2196F3' },
  { id: 'director-talent-acquisition-2', name: 'Director of Talent Acquisition - Sales & Marketing', description: 'Director of Talent Acquisition Sales Marketing AI Agent', icon: UserPlus, color: '#2196F3' },
  { id: 'director-talent-acquisition-3', name: 'Director of Talent Acquisition - Executive', description: 'Director of Talent Acquisition Executive AI Agent', icon: UserPlus, color: '#2196F3' },
  { id: 'director-talent-acquisition-4', name: 'Director of Talent Acquisition - Campus & Early Career', description: 'Director of Talent Acquisition Campus AI Agent', icon: UserPlus, color: '#2196F3' },
  { id: 'director-learning-development-1', name: 'Director of L&D - Leadership', description: 'Director of L&D Leadership AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'director-learning-development-2', name: 'Director of L&D - Technical Skills', description: 'Director of L&D Technical Skills AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'director-learning-development-3', name: 'Director of L&D - Compliance & Professional', description: 'Director of L&D Compliance Professional AI Agent', icon: GraduationCap, color: '#9C27B0' },
  { id: 'director-compensation-1', name: 'Director of Compensation - Executive', description: 'Director of Compensation Executive AI Agent', icon: Award, color: '#FF9800' },
  { id: 'director-compensation-2', name: 'Director of Compensation - Sales & Revenue', description: 'Director of Compensation Sales Revenue AI Agent', icon: Award, color: '#FF9800' },
  { id: 'director-compensation-3', name: 'Director of Compensation - Broad-Based', description: 'Director of Compensation Broad-Based AI Agent', icon: Award, color: '#FF9800' },
  { id: 'director-benefits-1', name: 'Director of Benefits - Health & Wellness', description: 'Director of Benefits Health Wellness AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'director-benefits-2', name: 'Director of Benefits - Retirement & Financial', description: 'Director of Benefits Retirement Financial AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'director-benefits-3', name: 'Director of Benefits - Total Rewards & Perks', description: 'Director of Benefits Total Rewards Perks AI Agent', icon: Heart, color: '#E91E63' },
  { id: 'director-hr-analytics-1', name: 'Director of HR Analytics - Workforce Intelligence', description: 'Director of HR Analytics Workforce Intelligence AI Agent', icon: ChartBarBig, color: '#2196F3' },
  { id: 'director-hr-analytics-2', name: 'Director of HR Analytics - Talent Intelligence', description: 'Director of HR Analytics Talent Intelligence AI Agent', icon: ChartBarBig, color: '#2196F3' },
  { id: 'director-hr-analytics-3', name: 'Director of HR Analytics - People Analytics', description: 'Director of HR Analytics People Analytics AI Agent', icon: ChartBarBig, color: '#2196F3' },
  { id: 'director-employee-relations-1', name: 'Director of Employee Relations - Conflict Resolution', description: 'Director of Employee Relations Conflict Resolution AI Agent', icon: MessageSquare, color: '#9C27B0' },
  { id: 'director-employee-relations-2', name: 'Director of Employee Relations - Policy & Compliance', description: 'Director of Employee Relations Policy Compliance AI Agent', icon: MessageSquare, color: '#9C27B0' },
  { id: 'director-employee-relations-3', name: 'Director of Employee Relations - Engagement & Culture', description: 'Director of Employee Relations Engagement Culture AI Agent', icon: MessageSquare, color: '#9C27B0' },
  { id: 'director-diversity-inclusion-1', name: 'Director of D&I - Strategy & Programs', description: 'Director of D&I Strategy Programs AI Agent', icon: Users, color: '#FF5722' },
  { id: 'director-diversity-inclusion-2', name: 'Director of D&I - Analytics & Reporting', description: 'Director of D&I Analytics Reporting AI Agent', icon: Users, color: '#FF5722' },
  { id: 'director-organizational-development-1', name: 'Director of OD - Change Management', description: 'Director of OD Change Management AI Agent', icon: Target, color: '#3F51B5' },
  { id: 'director-organizational-development-2', name: 'Director of OD - Design & Structure', description: 'Director of OD Design Structure AI Agent', icon: Target, color: '#3F51B5' },
  { id: 'director-hr-operations-1', name: 'Director of HR Operations - Service Delivery', description: 'Director of HR Operations Service Delivery AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'director-hr-operations-2', name: 'Director of HR Operations - Process & Systems', description: 'Director of HR Operations Process Systems AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'director-hr-operations-3', name: 'Director of HR Operations - Shared Services', description: 'Director of HR Operations Shared Services AI Agent', icon: Settings, color: '#607D8B' },
  { id: 'director-hr-technology-1', name: 'Director of HR Technology - Systems & Platforms', description: 'Director of HR Technology Systems Platforms AI Agent', icon: Shield, color: '#00BCD4' },
  { id: 'director-hr-technology-2', name: 'Director of HR Technology - Digital Transformation', description: 'Director of HR Technology Digital Transformation AI Agent', icon: Shield, color: '#00BCD4' },
  { id: 'director-workforce-planning-1', name: 'Director of Workforce Planning - Strategic', description: 'Director of Workforce Planning Strategic AI Agent', icon: Target, color: '#4CAF50' },
  { id: 'director-workforce-planning-2', name: 'Director of Workforce Planning - Operational', description: 'Director of Workforce Planning Operational AI Agent', icon: Target, color: '#4CAF50' },
  { id: 'director-hr-project-1', name: 'Director of HR Projects - Transformation', description: 'Director of HR Projects Transformation AI Agent', icon: Calendar, color: '#673AB7' },
  { id: 'director-hr-project-2', name: 'Director of HR Projects - Program Management', description: 'Director of HR Projects Program Management AI Agent', icon: Calendar, color: '#673AB7' },
  { id: 'director-hr-project-3', name: 'Director of HR Projects - Continuous Improvement', description: 'Director of HR Projects Continuous Improvement AI Agent', icon: Calendar, color: '#673AB7' },
  { id: 'director-shared-services-1', name: 'Director of Shared Services - Global Operations', description: 'Director of Shared Services Global Operations AI Agent', icon: Users, color: '#009688' },
  { id: 'director-shared-services-2', name: 'Director of Shared Services - Centers of Expertise', description: 'Director of Shared Services COE AI Agent', icon: Users, color: '#009688' },
  { id: 'director-centers-of-excellence-1', name: 'Director of COE - Talent & Culture', description: 'Director of COE Talent Culture AI Agent', icon: Star, color: '#FFC107' },
  { id: 'director-centers-of-excellence-2', name: 'Director of COE - Learning & Analytics', description: 'Director of COE Learning Analytics AI Agent', icon: Star, color: '#FFC107' },
  { id: 'director-hr-compliance-1', name: 'Director of HR Compliance - Regulatory', description: 'Director of HR Compliance Regulatory AI Agent', icon: Shield, color: '#795548' },
  { id: 'director-hr-compliance-2', name: 'Director of HR Compliance - Internal Controls', description: 'Director of HR Compliance Internal Controls AI Agent', icon: Shield, color: '#795548' },
  { id: 'director-hr-policy-1', name: 'Director of HR Policy - Policy Development', description: 'Director of HR Policy Policy Development AI Agent', icon: FileText, color: '#607D8B' },
  { id: 'director-hr-policy-2', name: 'Director of HR Policy - Communication & Education', description: 'Director of HR Policy Communication Education AI Agent', icon: FileText, color: '#607D8B' }
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

