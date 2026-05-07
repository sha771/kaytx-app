import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Activity, Star, Users, CircleCheckBig, Clock, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, Phone, TrendingUp, Handshake, Award } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'sales-crm', name: 'Sales CRM', description: 'Sales CRM AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-enablement', name: 'Sales Enablement', description: 'Sales Enablement AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-executive', name: 'Sales Executive', description: 'Sales Executive AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-forecast', name: 'Sales Forecast Analyst', description: 'Sales Forecast Analyst AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-negotiator', name: 'Sales Negotiator', description: 'Sales Negotiator AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-ops-manager', name: 'Sales Ops Manager', description: 'Sales Ops Manager AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-pricing', name: 'Sales Pricing', description: 'Sales Pricing AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-proposal', name: 'Sales Proposal', description: 'Sales Proposal AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-rep', name: 'Sales Representative', description: 'Sales Representative AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'sales-sdr', name: 'Sales Development Rep', description: 'Sales Development Rep AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'vp-business-development', name: 'VP Business Development', description: 'VP Business Development AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'vp-channel-partners', name: 'VP Channel Partners', description: 'VP Channel Partners AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'vp-revenue', name: 'VP Revenue', description: 'VP Revenue AI Agent', icon: TrendingUp, color: '#1565C0' },
  { id: 'vp-sales', name: 'VP Sales', description: 'VP Sales AI Agent', icon: TrendingUp, color: '#1565C0' }
];;

export default function SalesDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}><Target size={48} color="#F59E0B" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Sales & Revenue</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Revenue Engine</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}><Star size={12} color="#F59E0B" /><Text style={[styles.badgeText, { color: '#F59E0B' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Leads',value:'1K+/day',icon:Clock,color:'#FF9500'},{label:'Conversion',value:'35%',icon:Target,color:'#F59E0B'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Sales & Revenue department drives growth through AI-powered lead generation, prospecting, deal closing, and revenue optimization. Our agents maximize sales performance and customer acquisition.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/sales/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#F59E0B12' }]}><act.icon size={24} color="#F59E0B" /><Text style={[styles.actionText, { color: '#F59E0B' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>42 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/sales/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#FF950015' }]}>
          <TrendingUp size={20} color="#FF9500" />
          <Text style={[styles.subAgentButtonText, { color: '#FF9500' }]}>View All 42 Sub-Agents</Text>
          <ArrowRight size={18} color="#FF9500" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="sales-index" agentName="Sales Department" />

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

