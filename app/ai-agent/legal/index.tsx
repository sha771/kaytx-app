import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Scale, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar, MessageSquare, Calendar, Shield, FileText, Search, TriangleAlert, BookOpen, Gavel, ChartBar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'cao', name: 'CAO', description: 'CAO AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'clo', name: 'CLO', description: 'CLO AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'compliance-analyst', name: 'Compliance Analyst', description: 'Compliance Analyst AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'compliance-gov', name: 'Government Compliance', description: 'Government Compliance AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'compliance-manager', name: 'Compliance Manager', description: 'Compliance Manager AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'compliance-monitor', name: 'AI Compliance Monitor', description: 'AI Compliance Monitor AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'contract-reviewer', name: 'AI Contract Reviewer', description: 'AI Contract Reviewer AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'contract-specialist', name: 'Contract Specialist', description: 'Contract Specialist AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'grants-manager', name: 'Grants Manager', description: 'Grants Manager AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'grants-specialist', name: 'Grants Specialist', description: 'Grants Specialist AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'legal-researcher', name: 'AI Legal Researcher', description: 'AI Legal Researcher AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'policy-analyst', name: 'AI Policy Analyst', description: 'AI Policy Analyst AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'policy-manager', name: 'Policy Manager', description: 'Policy Manager AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'public-affairs', name: 'Public Affairs', description: 'Public Affairs AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'regulatory-agent', name: 'AI Regulatory Agent', description: 'AI Regulatory Agent AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'regulatory-specialist', name: 'Regulatory Specialist', description: 'Regulatory Specialist AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'risk-assessor', name: 'AI Risk Assessor', description: 'AI Risk Assessor AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'transparency-officer', name: 'Transparency Officer', description: 'Transparency Officer AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-compliance', name: 'VP Compliance', description: 'VP Compliance AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-contracts', name: 'VP Contracts', description: 'VP Contracts AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-governance', name: 'VP Governance', description: 'VP Governance AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-ip', name: 'VP Intellectual Property', description: 'VP Intellectual Property AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-legal', name: 'VP Legal', description: 'VP Legal AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-public-engagement', name: 'VP Public Engagement', description: 'VP Public Engagement AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-public-policy', name: 'VP Public Policy', description: 'VP Public Policy AI Agent', icon: Scale, color: '#3E2723' },
  { id: 'vp-regulatory', name: 'VP Regulatory', description: 'VP Regulatory AI Agent', icon: Scale, color: '#3E2723' }
];;

export default function LegalDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#3F51B520' }]}><Scale size={48} color="#3F51B5" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Legal & Compliance</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Legal Protection</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#3F51B522' }]}><Star size={12} color="#3F51B5" /><Text style={[styles.badgeText, { color: '#3F51B5' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Contracts',value:'500+',icon:Clock,color:'#FF9500'},{label:'Compliance',value:'100%',icon:Target,color:'#3F51B5'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Legal & Compliance department protects the organization through AI-powered contract review, compliance monitoring, and risk assessment. Our agents ensure regulatory adherence and legal protection.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/legal/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBar},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#3F51B512' }]}><act.icon size={24} color="#3F51B5" /><Text style={[styles.actionText, { color: '#3F51B5' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    <AgentFeatures agentId="legal-index" agentName="Legal & Governance Department" />

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

