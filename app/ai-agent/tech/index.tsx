import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'cto', name: 'CTO', description: 'Chief Technology Officer AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'vp-engineering', name: 'VP Engineering', description: 'VP Engineering AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'vp-infrastructure', name: 'VP Infrastructure', description: 'VP Infrastructure AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'vp-ai-ml', name: 'VP AI/ML', description: 'VP AI/ML AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'vp-security-tech', name: 'VP Security Technology', description: 'VP Security Tech AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'architect-lead', name: 'Lead Architect', description: 'Lead Architect AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'devops-manager', name: 'DevOps Manager', description: 'DevOps Manager AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'frontend-lead', name: 'Frontend Lead', description: 'Frontend Lead AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'backend-lead', name: 'Backend Lead', description: 'Backend Lead AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'sre-lead', name: 'SRE Lead', description: 'SRE Lead AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'frontend-dev', name: 'Frontend Developer', description: 'Frontend Developer AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'backend-dev', name: 'Backend Developer', description: 'Backend Developer AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'sre-engineer', name: 'SRE Engineer', description: 'SRE Engineer AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'qa-automation', name: 'QA Automation Engineer', description: 'QA Automation AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'data-engineer', name: 'Data Engineer', description: 'Data Engineer AI Agent', icon: Cpu, color: '#1565C0' },
  { id: 'security-engineer', name: 'Security Engineer', description: 'Security Engineer AI Agent', icon: Cpu, color: '#1565C0' },
];

export default function TechIndex() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1565C015' }]}><Cpu size={48} color="#1565C0" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Technology & Engineering</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Tech & Engineering</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1565C022' }]}><Star size={12} color="#1565C0" /><Text style={[styles.badgeText, { color: '#1565C0' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>16 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:'16',icon:CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.99%',icon:Activity,color:'#007AFF'},{label:'Deploys',value:'24/7',icon:Clock,color:'#FF9500'},{label:'Coverage',value:'100%',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Technology & Engineering department powers all technical operations through AI agents. From CTO-level strategy to frontend/backend development, DevOps, SRE, and security engineering.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/tech/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>48 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/tech/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#1565C015' }]}>
          <Cpu size={20} color="#1565C0" />
          <Text style={[styles.subAgentButtonText, { color: '#1565C0' }]}>View All 48 Sub-Agents</Text>
          <ArrowRight size={18} color="#1565C0" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#1565C012' }]}><act.icon size={24} color="#1565C0" /><Text style={[styles.actionText, { color: '#1565C0' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="tech-index" agentName="Technology & Engineering" />
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
  actionText:{fontSize:13,fontWeight:'600',marginTop:8},
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,gap:10,marginTop:8},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1}
});
