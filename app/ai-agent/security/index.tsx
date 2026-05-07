import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, TrendingUp, ShieldCheck, Key, TriangleAlert, Crosshair, Eye, LayoutDashboard, Monitor, Scale } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'ciso', name: 'CISO', description: 'CISO AI Agent', icon: Shield, color: '#581C84' },
  { id: 'compliance-security-1', name: 'Compliance & Security', description: 'Compliance & Security AI Agent', icon: Shield, color: '#581C84' },
  { id: 'identity-manager-1', name: 'Identity Manager', description: 'Identity Manager AI Agent', icon: Shield, color: '#581C84' },
  { id: 'incident-responder-1', name: 'Incident Responder', description: 'Incident Responder AI Agent', icon: Shield, color: '#581C84' },
  { id: 'penetration-tester-1', name: 'Penetration Tester', description: 'Penetration Tester AI Agent', icon: Shield, color: '#581C84' },
  { id: 'security-analyst-1', name: 'Security Analyst', description: 'Security Analyst AI Agent', icon: Shield, color: '#581C84' },
  { id: 'security-architect', name: 'Security Architect', description: 'Security Architect AI Agent', icon: Shield, color: '#581C84' },
  { id: 'soc-manager', name: 'SOC Manager', description: 'SOC Manager AI Agent', icon: Shield, color: '#581C84' },
  { id: 'vp-cyber', name: 'VP Cybersecurity', description: 'VP Cybersecurity AI Agent', icon: Shield, color: '#581C84' },
  { id: 'vp-governance-risk', name: 'VP Governance & Risk', description: 'VP Governance & Risk AI Agent', icon: Shield, color: '#581C84' },
  { id: 'vp-privacy', name: 'VP Privacy', description: 'VP Privacy AI Agent', icon: Shield, color: '#581C84' },
  { id: 'vp-security-ops', name: 'VP Security Operations', description: 'VP Security Operations AI Agent', icon: Shield, color: '#581C84' }
];;

export default function SecurityDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#581C8420' }]}><Shield size={48} color="#581C84" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Security & Risk</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Security & Risk Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#581C8422' }]}><Star size={12} color="#581C84" /><Text style={[styles.badgeText, { color: '#581C84' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#581C84'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/security/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#581C8412' }]}><act.icon size={24} color="#581C84" /><Text style={[styles.actionText, { color: '#581C84' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>36 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#F4433615' }]}>
          <Shield size={20} color="#F44336" />
          <Text style={[styles.subAgentButtonText, { color: '#F44336' }]}>View All 36 Sub-Agents</Text>
          <ArrowRight size={18} color="#F44336" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="security-index" agentName="Security & Risk Department" />
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

