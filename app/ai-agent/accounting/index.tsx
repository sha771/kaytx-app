import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, Calculator, FileText, ChartPie, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const DEPARTMENT_AGENTS = [
  { id: 'accounting-manager', name: 'Accounting Manager', description: 'Accounting Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'audit-manager', name: 'Audit Manager', description: 'Audit Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'auditor', name: 'AI Auditor', description: 'AI Auditor AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'bookkeeper', name: 'AI Bookkeeper', description: 'AI Bookkeeper AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'budget-manager', name: 'Budget Manager', description: 'Budget Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'cfo', name: 'CFO', description: 'CFO AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'controller', name: 'Controller', description: 'Controller AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'expense-manager', name: 'AI Expense Manager', description: 'AI Expense Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'finance-analyst', name: 'Finance Analyst', description: 'Finance Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'finance-manager', name: 'Finance Manager', description: 'Finance Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'financial-planner', name: 'AI Financial Planner', description: 'AI Financial Planner AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'invoice-processor', name: 'AI Invoice Processor', description: 'AI Invoice Processor AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'payroll-manager', name: 'AI Payroll Manager', description: 'AI Payroll Manager AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'tax-analyst', name: 'AI Tax Analyst', description: 'AI Tax Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'tax-specialist', name: 'Tax Specialist', description: 'Tax Specialist AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'treasury-analyst', name: 'Treasury Analyst', description: 'Treasury Analyst AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-accounting', name: 'VP Accounting', description: 'VP Accounting AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-finance', name: 'VP Finance', description: 'VP Finance AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-investor-relations', name: 'VP Investor Relations', description: 'VP Investor Relations AI Agent', icon: Calculator, color: '#0D47A1' },
  { id: 'vp-treasury', name: 'VP Treasury', description: 'VP Treasury AI Agent', icon: Calculator, color: '#0D47A1' }
];;

export default function AccountingDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#2E7D3220' }]}><DollarSign size={48} color="#2E7D32" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Finance & Accounting</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Financial Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#2E7D3222' }]}><Star size={12} color="#2E7D32" /><Text style={[styles.badgeText, { color: '#2E7D32' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#2E7D32'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Finance & Accounting department manages all financial operations through AI-powered agents. From auditing and bookkeeping to payroll and tax compliance, our agents ensure accurate and efficient financial management.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/accounting/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#2E7D3212' }]}><act.icon size={24} color="#2E7D32" /><Text style={[styles.actionText, { color: '#2E7D32' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    
      <AgentFeatures agentId="accounting-index" agentName="Accounting & Finance Department" />
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


