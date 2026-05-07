import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, Code, GitBranch, Server, Database, Cloud, Terminal } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'architect-lead', name: 'Architecture Lead', description: 'Architecture Lead AI Agent', icon: Code, color: '#1565C0' },
  { id: 'architecture-advisor', name: 'AI Architecture Advisor', description: 'AI Architecture Advisor AI Agent', icon: Code, color: '#1565C0' },
  { id: 'backend-dev-1', name: 'Backend Developer', description: 'Backend Developer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'backend-lead', name: 'Backend Lead', description: 'Backend Lead AI Agent', icon: Code, color: '#1565C0' },
  { id: 'bug-triager', name: 'AI Bug Triager', description: 'AI Bug Triager AI Agent', icon: Code, color: '#1565C0' },
  { id: 'cicd-agent', name: 'AI CI/CD Agent', description: 'AI CI/CD Agent AI Agent', icon: Code, color: '#1565C0' },
  { id: 'code-reviewer', name: 'AI Code Reviewer', description: 'AI Code Reviewer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'cto', name: 'CTO', description: 'CTO AI Agent', icon: Code, color: '#1565C0' },
  { id: 'data-engineer-1', name: 'Data Engineer', description: 'Data Engineer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'devops-manager', name: 'DevOps Manager', description: 'DevOps Manager AI Agent', icon: Code, color: '#1565C0' },
  { id: 'documentation-agent', name: 'AI Documentation Agent', description: 'AI Documentation Agent AI Agent', icon: Code, color: '#1565C0' },
  { id: 'frontend-dev-1', name: 'Frontend Developer', description: 'Frontend Developer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'frontend-lead', name: 'Frontend Lead', description: 'Frontend Lead AI Agent', icon: Code, color: '#1565C0' },
  { id: 'qa-automation-1', name: 'QA Automation Engineer', description: 'QA Automation Engineer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'security-engineer-1', name: 'Security Engineer', description: 'Security Engineer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'sprint-manager', name: 'AI Sprint Manager', description: 'AI Sprint Manager AI Agent', icon: Code, color: '#1565C0' },
  { id: 'sre-engineer-1', name: 'SRE Engineer', description: 'SRE Engineer AI Agent', icon: Code, color: '#1565C0' },
  { id: 'sre-lead', name: 'SRE Lead', description: 'SRE Lead AI Agent', icon: Code, color: '#1565C0' },
  { id: 'test-automation', name: 'AI Test Automation', description: 'AI Test Automation AI Agent', icon: Code, color: '#1565C0' },
  { id: 'vp-ai-ml', name: 'VP AI & ML', description: 'VP AI & ML AI Agent', icon: Code, color: '#1565C0' },
  { id: 'vp-engineering', name: 'VP Engineering', description: 'VP Engineering AI Agent', icon: Code, color: '#1565C0' },
  { id: 'vp-infrastructure', name: 'VP Infrastructure', description: 'VP Infrastructure AI Agent', icon: Code, color: '#1565C0' },
  { id: 'vp-security-tech', name: 'VP Security Technology', description: 'VP Security Technology AI Agent', icon: Code, color: '#1565C0' }
];;

export default function EngineeringDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C020' }]}><Cpu size={48} color="#1565C0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Technology & Engineering</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Engineering Excellence</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Star size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Deploys',value:'50/day',icon:Clock,color:'#FF9500'},{label:'Coverage',value:'95%',icon:Target,color:'#1565C0'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Technology & Engineering department drives innovation through AI-powered software development, infrastructure management, and technical architecture. Our agents deliver high-quality code and reliable systems.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/engineering/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#1565C012' }]}><act.icon size={24} color="#1565C0" /><Text style={[styles.actionText, { color: '#1565C0' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="engineering-index" agentName="Index" />
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

