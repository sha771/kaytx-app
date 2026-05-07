import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Briefcase, Calculator, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const HIERARCHY = {
  cSuite: [
    { id: 'cfo', name: 'AI Chief Financial Officer', icon: Briefcase, color: '#10B981', subCount: 3, subs: ['Financial Strategy Advisor','Capital Allocation Optimizer','Risk-Reward Analyst'] },
  ],
  vp: [
    { id: 'vp-finance', name: 'AI VP Finance', icon: DollarSign, color: '#2E7D32', subCount: 3, subs: ['Financial Modeler','Cash Flow Forecaster','Investment Appraiser'] },
    { id: 'vp-accounting', name: 'AI VP Accounting', icon: Calculator, color: '#0D47A1', subCount: 3, subs: ['Ledger Reconciler','Accounting Standards Enforcer','Close Process Coordinator'] },
  ],
};

export default function FinanceDepartment() {
  const { theme } = useTheme();
  const router = useRouter();

  const renderGroup = (agents: any[], title: string) => (
    <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      {agents.map((agent: any) => {
        const AgentIcon = agent.icon;
        return (
          <TouchableOpacity key={agent.id} onPress={() => router.push('/ai-agent/finance/' + agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><AgentIcon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subCount} Sub-Agents: {agent.subs.join(', ')}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#2E7D3220' }]}><DollarSign size={48} color="#2E7D32" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Finance & Accounting</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents & Employees — Enterprise Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#2E7D3222' }]}><Star size={12} color="#2E7D32" /><Text style={[styles.badgeText, { color: '#2E7D32' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:'3',icon:CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'9',icon:Users,color:'#007AFF'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#FF9500'},{label:'Efficiency',value:'20x',icon:Target,color:'#2E7D32'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Finance & Accounting department operates through a structured hierarchy of AI agents — from C-Suite leadership down to specialist workers. Each agent manages dedicated sub-agents for granular task execution, ensuring enterprise-grade performance at every level.</Text>
      </View>
      {renderGroup(HIERARCHY.cSuite, 'C-Suite Leadership')}
      {renderGroup(HIERARCHY.vp, 'VP Level')}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hub</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>9 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/finance/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#2E7D3215' }]}>
          <DollarSign size={20} color="#2E7D32" />
          <Text style={[styles.subAgentButtonText, { color: '#2E7D32' }]}>View All 9 Sub-Agents</Text>
          <ArrowRight size={18} color="#2E7D32" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#2E7D3212' }]}><act.icon size={24} color="#2E7D32" /><Text style={[styles.actionText, { color: '#2E7D32' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="finance-index" agentName="Finance & Accounting Department" />
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
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginTop:12,gap:10},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
