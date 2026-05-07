import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Landmark, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Briefcase, FileText, Handshake, ClipboardList, DollarSign, BarChart3, FileCheck, MessageCircle, UsersRound, Eye, BookOpen } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'chief-admin-officer', name: 'AI Chief Administrative Officer (Gov)', description: 'Executive leadership for government operations', icon: Briefcase, color: '#1B5E20', route: '/ai-agent/government/chief-admin-officer' },
  { id: 'vp-public-policy', name: 'AI VP Public Policy', description: 'Public policy strategy and government relations', icon: Landmark, color: '#2E7D32', route: '/ai-agent/government/vp-public-policy' },
  { id: 'vp-regulatory-affairs', name: 'AI VP Regulatory Affairs', description: 'Regulatory compliance and affairs management', icon: FileCheck, color: '#388E3C', route: '/ai-agent/government/vp-regulatory-affairs' },
  { id: 'vp-public-engagement', name: 'AI VP Public Engagement', description: 'Public engagement and community relations', icon: Users, color: '#43A047', route: '/ai-agent/government/vp-public-engagement' },
  { id: 'policy-manager', name: 'AI Policy Manager', description: 'Policy development and implementation', icon: FileText, color: '#4CAF50', route: '/ai-agent/government/policy-manager' },
  { id: 'grants-manager', name: 'AI Grants Manager', description: 'Grant management and compliance', icon: DollarSign, color: '#66BB6A', route: '/ai-agent/government/grants-manager' },
  { id: 'policy-analyst', name: 'AI Policy Analyst', description: 'Policy analysis and research', icon: BarChart3, color: '#81C784', route: '/ai-agent/government/ai-policy-analyst' },
  { id: 'regulatory-specialist', name: 'AI Regulatory Specialist', description: 'Regulatory compliance and tracking', icon: ClipboardList, color: '#A5D6A7', route: '/ai-agent/government/ai-regulatory-specialist' },
  { id: 'public-affairs', name: 'AI Public Affairs Specialist', description: 'Public affairs and communications', icon: MessageCircle, color: '#C8E6C9', route: '/ai-agent/government/ai-public-affairs' },
  { id: 'grants-specialist', name: 'AI Grants Specialist', description: 'Grant writing and management', icon: Handshake, color: '#1B5E20', route: '/ai-agent/government/ai-grants-specialist' },
  { id: 'government-compliance', name: 'AI Government Compliance', description: 'Government compliance and ethics', icon: BookOpen, color: '#2E7D32', route: '/ai-agent/government/ai-government-compliance' },
  { id: 'transparency-officer', name: 'AI Transparency Officer', description: 'Transparency and accountability', icon: Eye, color: '#388E3C', route: '/ai-agent/government/ai-transparency-officer' },
];

export default function GovernmentDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1B5E2020' }]}><Landmark size={48} color="#1B5E20" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Government Affairs</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Government Affairs Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1B5E2022' }]}><Star size={12} color="#1B5E20" /><Text style={[styles.badgeText, { color: '#1B5E20' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#1B5E20'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push(agent.route)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#1B5E2012' }]}><act.icon size={24} color="#1B5E20" /><Text style={[styles.actionText, { color: '#1B5E20' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>36 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/government/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#47556915' }]}>
          <Landmark size={20} color="#475569" />
          <Text style={[styles.subAgentButtonText, { color: '#475569' }]}>View All 36 Sub-Agents</Text>
          <ArrowRight size={18} color="#475569" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="government-index" agentName="Government Affairs Department" />
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
  subAgentButton:{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:16,borderRadius:12,gap:8},
  subAgentButtonText:{fontSize:14,fontWeight:'600'}
});

