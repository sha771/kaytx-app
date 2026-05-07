import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Briefcase, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Gauge, Truck, ShieldCheck, Building2, ListTodo, Zap, Workflow } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const HIERARCHY = {
  cSuite: [
    { id: 'coo', name: 'AI Chief Operating Officer', icon: Briefcase, color: '#4E342E', subCount: 3, subs: ['Operational Efficiency Analyst','Cross-dept Coordinator','Strategic Initiative Tracker'] },
  ],
  vp: [
    { id: 'vp-operations', name: 'AI VP Operations', icon: Settings, color: '#5D4037', subCount: 3, subs: ['Process Auditor','SLA Monitor','Capacity Planner'] },
    { id: 'vp-supply-chain', name: 'AI VP Supply Chain', icon: Truck, color: '#33691E', subCount: 3, subs: ['Supplier Risk Assessor','Inventory Optimizer','Logistics Cost Analyzer'] },
    { id: 'vp-quality', name: 'AI VP Quality', icon: ShieldCheck, color: '#1B5E20', subCount: 3, subs: ['Quality Standards Enforcer','Defect Pattern Analyzer','Compliance Tracker'] },
    { id: 'vp-facilities', name: 'AI VP Facilities', icon: Building2, color: '#455A64', subCount: 3, subs: ['Space Utilization Analyst','Maintenance Scheduler','Energy Efficiency Monitor'] },
    { id: 'vp-project-management', name: 'AI VP Project Management', icon: Briefcase, color: '#283593', subCount: 3, subs: ['Milestone Tracker','Resource Allocator','Risk Identifier'] },
  ],
  manager: [
    { id: 'ai-operations-manager', name: 'AI Operations Manager', icon: Settings, color: '#4E342E', subCount: 3, subs: ['Daily Operations Coordinator','Escalation Handler','Performance Reporter'] },
    { id: 'ai-operations-manager-sub', name: 'AI Operations Manager (Sub)', icon: Settings, color: '#5D4037', subCount: 3, subs: ['Workflow Monitor','Bottleneck Detector','Efficiency Reporter'] },
  ],
  specialist: [
    { id: 'ai-workflow-automation', name: 'AI Workflow Automation Agent', icon: Workflow, color: '#0097A7', subCount: 3, subs: ['Process Mapper','Automation Rule Builder','Exception Handler'] },
    { id: 'ai-task-coordinator', name: 'AI Task Coordinator', icon: ListTodo, color: '#455A64', subCount: 3, subs: ['Task Prioritizer','Deadline Enforcer','Dependency Tracker'] },
    { id: 'ai-process-optimization', name: 'AI Process Optimization Agent', icon: TrendingUp, color: '#2E7D32', subCount: 3, subs: ['Lean Analyst','Waste Identifier','Improvement Recommender'] },
    { id: 'ai-resource-planner', name: 'AI Resource Planner', icon: Users, color: '#5D4037', subCount: 3, subs: ['Demand Forecaster','Allocation Optimizer','Utilization Tracker'] },
    { id: 'ai-quality-assurance', name: 'AI Quality Assurance Agent', icon: ShieldCheck, color: '#1B5E20', subCount: 3, subs: ['Test Case Generator','Defect Logger','Regression Tracker'] },
  ],
};

export default function OperationsDepartment() {
  const { theme } = useTheme();
  const router = useRouter();

  const renderGroup = (agents: any[], title: string) => (
    <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
      {agents.map((agent: any) => {
        const AgentIcon = agent.icon;
        return (
          <TouchableOpacity key={agent.id} onPress={() => router.push('/ai-agent/operations/' + agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
        <View style={[styles.heroIconWrap, { backgroundColor: '#607D8B20' }]}><Settings size={48} color="#607D8B" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Operations & Management</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents & Employees — Enterprise Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#607D8B22' }]}><Star size={12} color="#607D8B" /><Text style={[styles.badgeText, { color: '#607D8B' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>13 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:'13',icon:CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'39',icon:Users,color:'#007AFF'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#FF9500'},{label:'Efficiency',value:'20x',icon:Target,color:'#607D8B'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Operations & Management department operates through a structured hierarchy of AI agents — from C-Suite leadership down to specialist workers. Each agent manages dedicated sub-agents for granular task execution, ensuring enterprise-grade performance at every level.</Text>
      </View>
      {renderGroup(HIERARCHY.cSuite, 'C-Suite Leadership')}
      {renderGroup(HIERARCHY.vp, 'VP Level')}
      {renderGroup(HIERARCHY.manager, 'Manager Level')}
      {renderGroup(HIERARCHY.specialist, 'Specialist Level')}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hub</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>39 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/operations/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#607D8B15' }]}>
          <Settings size={20} color="#607D8B" />
          <Text style={[styles.subAgentButtonText, { color: '#607D8B' }]}>View All 39 Sub-Agents</Text>
          <ArrowRight size={18} color="#607D8B" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#607D8B12' }]}><act.icon size={24} color="#607D8B" /><Text style={[styles.actionText, { color: '#607D8B' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="operations-index" agentName="Operations & Management Department" />
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
