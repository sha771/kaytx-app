import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, Code, GitBranch, Server, Database, Cloud, Terminal, Layers, Smartphone, Layout, Code2, CheckCircle, Network, Zap, Box, Gauge, Brain } from 'lucide-react-native';
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
  { id: 'vp-security-tech', name: 'VP Security Technology', description: 'VP Security Technology AI Agent', icon: Code, color: '#1565C0' },
  { id: 'senior-devops-engineer-1', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-devops-engineer-2', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-devops-engineer-3', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-devops-engineer-4', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-devops-engineer-5', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-devops-engineer-6', name: 'Senior DevOps Engineer', description: 'Senior DevOps Engineer AI Agent', icon: Server, color: '#2196F3' },
  { id: 'senior-sre-1', name: 'Senior SRE', description: 'Senior Site Reliability Engineer AI Agent', icon: Activity, color: '#4CAF50' },
  { id: 'senior-sre-2', name: 'Senior SRE', description: 'Senior Site Reliability Engineer AI Agent', icon: Activity, color: '#4CAF50' },
  { id: 'senior-sre-3', name: 'Senior SRE', description: 'Senior Site Reliability Engineer AI Agent', icon: Activity, color: '#4CAF50' },
  { id: 'senior-sre-4', name: 'Senior SRE', description: 'Senior Site Reliability Engineer AI Agent', icon: Activity, color: '#4CAF50' },
  { id: 'senior-sre-5', name: 'Senior SRE', description: 'Senior Site Reliability Engineer AI Agent', icon: Activity, color: '#4CAF50' },
  { id: 'cloud-architect-1', name: 'Cloud Architect', description: 'Cloud Architect AI Agent', icon: Cloud, color: '#03A9F4' },
  { id: 'cloud-architect-2', name: 'Cloud Architect', description: 'Cloud Architect AI Agent', icon: Cloud, color: '#03A9F4' },
  { id: 'cloud-architect-3', name: 'Cloud Architect', description: 'Cloud Architect AI Agent', icon: Cloud, color: '#03A9F4' },
  { id: 'cloud-architect-4', name: 'Cloud Architect', description: 'Cloud Architect AI Agent', icon: Cloud, color: '#03A9F4' },
  { id: 'security-architect-1', name: 'Security Architect', description: 'Security Architect AI Agent', icon: Shield, color: '#F44336' },
  { id: 'security-architect-2', name: 'Security Architect', description: 'Security Architect AI Agent', icon: Shield, color: '#F44336' },
  { id: 'security-architect-3', name: 'Security Architect', description: 'Security Architect AI Agent', icon: Shield, color: '#F44336' },
  { id: 'data-architect-1', name: 'Data Architect', description: 'Data Architect AI Agent', icon: Database, color: '#673AB7' },
  { id: 'data-architect-2', name: 'Data Architect', description: 'Data Architect AI Agent', icon: Database, color: '#673AB7' },
  { id: 'data-architect-3', name: 'Data Architect', description: 'Data Architect AI Agent', icon: Database, color: '#673AB7' },
  { id: 'network-architect-1', name: 'Network Architect', description: 'Network Architect AI Agent', icon: Network, color: '#FF9800' },
  { id: 'network-architect-2', name: 'Network Architect', description: 'Network Architect AI Agent', icon: Network, color: '#FF9800' },
  { id: 'senior-software-architect-1', name: 'Senior Software Architect', description: 'Senior Software Architect AI Agent', icon: Layers, color: '#3F51B5' },
  { id: 'senior-software-architect-2', name: 'Senior Software Architect', description: 'Senior Software Architect AI Agent', icon: Layers, color: '#3F51B5' },
  { id: 'senior-software-architect-3', name: 'Senior Software Architect', description: 'Senior Software Architect AI Agent', icon: Layers, color: '#3F51B5' },
  { id: 'senior-software-architect-4', name: 'Senior Software Architect', description: 'Senior Software Architect AI Agent', icon: Layers, color: '#3F51B5' },
  { id: 'senior-software-architect-5', name: 'Senior Software Architect', description: 'Senior Software Architect AI Agent', icon: Layers, color: '#3F51B5' },
  { id: 'mobile-lead-developer-1', name: 'Mobile Lead Developer', description: 'Mobile Lead Developer AI Agent', icon: Smartphone, color: '#00BCD4' },
  { id: 'mobile-lead-developer-2', name: 'Mobile Lead Developer', description: 'Mobile Lead Developer AI Agent', icon: Smartphone, color: '#00BCD4' },
  { id: 'mobile-lead-developer-3', name: 'Mobile Lead Developer', description: 'Mobile Lead Developer AI Agent', icon: Smartphone, color: '#00BCD4' },
  { id: 'frontend-lead-developer-1', name: 'Frontend Lead Developer', description: 'Frontend Lead Developer AI Agent', icon: Layout, color: '#9C27B0' },
  { id: 'frontend-lead-developer-2', name: 'Frontend Lead Developer', description: 'Frontend Lead Developer AI Agent', icon: Layout, color: '#9C27B0' },
  { id: 'frontend-lead-developer-3', name: 'Frontend Lead Developer', description: 'Frontend Lead Developer AI Agent', icon: Layout, color: '#9C27B0' },
  { id: 'backend-lead-developer-1', name: 'Backend Lead Developer', description: 'Backend Lead Developer AI Agent', icon: Server, color: '#009688' },
  { id: 'backend-lead-developer-2', name: 'Backend Lead Developer', description: 'Backend Lead Developer AI Agent', icon: Server, color: '#009688' },
  { id: 'backend-lead-developer-3', name: 'Backend Lead Developer', description: 'Backend Lead Developer AI Agent', icon: Server, color: '#009688' },
  { id: 'fullstack-lead-developer-1', name: 'Full-Stack Lead Developer', description: 'Full-Stack Lead Developer AI Agent', icon: Code2, color: '#607D8B' },
  { id: 'fullstack-lead-developer-2', name: 'Full-Stack Lead Developer', description: 'Full-Stack Lead Developer AI Agent', icon: Code2, color: '#607D8B' },
  { id: 'qa-director-1', name: 'QA Director', description: 'QA Director AI Agent', icon: CheckCircle, color: '#4CAF50' },
  { id: 'qa-director-2', name: 'QA Director', description: 'QA Director AI Agent', icon: CheckCircle, color: '#4CAF50' },
  { id: 'database-architect-1', name: 'Database Architect', description: 'Database Architect AI Agent', icon: Database, color: '#795548' },
  { id: 'database-architect-2', name: 'Database Architect', description: 'Database Architect AI Agent', icon: Database, color: '#795548' },
  { id: 'infrastructure-architect-1', name: 'Infrastructure Architect', description: 'Infrastructure Architect AI Agent', icon: Server, color: '#37474F' },
  { id: 'infrastructure-architect-2', name: 'Infrastructure Architect', description: 'Infrastructure Architect AI Agent', icon: Server, color: '#37474F' },
  { id: 'engineering-manager-1', name: 'Engineering Manager', description: 'Engineering Manager AI Agent', icon: Users, color: '#1976D2' },
  { id: 'engineering-manager-2', name: 'Engineering Manager', description: 'Engineering Manager AI Agent', icon: Users, color: '#1976D2' },
  { id: 'engineering-manager-3', name: 'Engineering Manager', description: 'Engineering Manager AI Agent', icon: Users, color: '#1976D2' },
  { id: 'engineering-manager-4', name: 'Engineering Manager', description: 'Engineering Manager AI Agent', icon: Users, color: '#1976D2' },
  { id: 'technical-lead-1', name: 'Technical Lead', description: 'Technical Lead AI Agent', icon: Zap, color: '#FFC107' },
  { id: 'technical-lead-2', name: 'Technical Lead', description: 'Technical Lead AI Agent', icon: Zap, color: '#FFC107' },
  { id: 'technical-lead-3', name: 'Technical Lead', description: 'Technical Lead AI Agent', icon: Zap, color: '#FFC107' },
  { id: 'platform-architect', name: 'Platform Architect', description: 'Platform Architect AI Agent', icon: Box, color: '#5C6BC0' },
  { id: 'api-architect', name: 'API Architect', description: 'API Architect AI Agent', icon: GitBranch, color: '#26A69A' },
  { id: 'performance-architect', name: 'Performance Architect', description: 'Performance Architect AI Agent', icon: Gauge, color: '#E65100' },
  { id: 'security-engineer-2', name: 'Security Engineer', description: 'Security Engineer AI Agent', icon: Shield, color: '#D32F2F' },
  { id: 'security-engineer-3', name: 'Security Engineer', description: 'Security Engineer AI Agent', icon: Shield, color: '#D32F2F' },
  { id: 'security-engineer-4', name: 'Security Engineer', description: 'Security Engineer AI Agent', icon: Shield, color: '#D32F2F' },
  { id: 'ml-engineer-1', name: 'ML Engineer', description: 'ML Engineer AI Agent', icon: Brain, color: '#7B1FA2' },
  { id: 'ml-engineer-2', name: 'ML Engineer', description: 'ML Engineer AI Agent', icon: Brain, color: '#7B1FA2' },
  { id: 'ml-engineer-3', name: 'ML Engineer', description: 'ML Engineer AI Agent', icon: Brain, color: '#7B1FA2' },
  { id: 'data-engineer-2', name: 'Data Engineer', description: 'Data Engineer AI Agent', icon: Database, color: '#0097A7' },
  { id: 'data-engineer-3', name: 'Data Engineer', description: 'Data Engineer AI Agent', icon: Database, color: '#0097A7' }
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

