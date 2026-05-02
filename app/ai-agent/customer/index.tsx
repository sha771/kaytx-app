import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Headphones, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBar, MessageSquare, Calendar, Shield, Heart, MessageCircle, Smile } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'cco', name: 'CCO', description: 'CCO AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-billing', name: 'CX Billing', description: 'CX Billing AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-complaint', name: 'CX Complaints', description: 'CX Complaints AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-feedback', name: 'CX Feedback', description: 'CX Feedback AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-loyalty', name: 'CX Loyalty', description: 'CX Loyalty AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-receptionist', name: 'CX Receptionist', description: 'CX Receptionist AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-retention', name: 'CX Retention', description: 'CX Retention AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-support', name: 'CX Support', description: 'CX Support AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'cx-ticket-resolution', name: 'CX Ticket Resolution', description: 'CX Ticket Resolution AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'vp-customer-success', name: 'VP Customer Success', description: 'VP Customer Success AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'vp-experience', name: 'VP Customer Experience', description: 'VP Customer Experience AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'vp-loyalty', name: 'VP Loyalty Programs', description: 'VP Loyalty Programs AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'vp-retention', name: 'VP Customer Retention', description: 'VP Customer Retention AI Agent', icon: Headphones, color: '#E65100' },
  { id: 'vp-support', name: 'VP Customer Support', description: 'VP Customer Support AI Agent', icon: Headphones, color: '#E65100' }
];;

export default function CustomerExperienceIndex() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '15' }]}><Headphones size={48} color={theme.colors.primary} /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Customer Experience</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Customer Success</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}><Star size={12} color={theme.colors.primary} /><Text style={[styles.badgeText, { color: theme.colors.primary }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>14 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:'14',icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'24/7',icon:Activity,color:'#007AFF'},{label:'Response',value:'<1s',icon:Clock,color:'#FF9500'},{label:'CSAT',value:'98%',icon:Target,color:'#AF52DE'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Customer Experience department delivers 24/7 support through AI-powered agents. Our agents handle everything from onboarding to loyalty management, ensuring exceptional customer satisfaction.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/customer/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}><act.icon size={24} color={theme.colors.primary} /><Text style={[styles.actionText, { color: theme.colors.primary }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="customer-index" agentName="Index" />
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