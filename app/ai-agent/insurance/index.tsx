import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, ShieldAlert, ShieldCheck, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, TrendingUp, Calculator, ClipboardList, UserCheck, Search, FileText, BookOpen, PenTool, Eye, Zap, DollarSign, Scale, Gavel, Brain, AlertTriangle, Handshake, Gauge, BarChart3, PieChart, RefreshCw, GitBranch, RotateCcw, Landmark, UserPlus, SquareCheck, CalendarClock } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const VP_EXECUTIVE_AGENTS = [
  { id: 'cro', name: 'AI Chief Risk Officer', icon: ShieldAlert, color: '#FF7043', subAgents: [
    { id: 'enterprise-risk-strategy-advisor', name: 'AI Enterprise Risk Strategy Advisor', icon: Shield },
    { id: 'risk-appetite-definer', name: 'AI Risk Appetite Definer', icon: Gauge },
    { id: 'board-risk-reporter', name: 'AI Board Risk Reporter', icon: FileText },
  ]},
  { id: 'vp-underwriting', name: 'AI VP Underwriting', icon: ShieldCheck, color: '#FF5722', subAgents: [
    { id: 'underwriting-guidelines-enforcer', name: 'AI Underwriting Guidelines Enforcer', icon: BookOpen },
    { id: 'portfolio-mix-manager', name: 'AI Portfolio Mix Manager', icon: PieChart },
    { id: 'pricing-strategy-advisor', name: 'AI Pricing Strategy Advisor', icon: DollarSign },
  ]},
  { id: 'vp-claims', name: 'AI VP Claims', icon: FileText, color: '#E64A19', subAgents: [
    { id: 'claims-process-optimizer', name: 'AI Claims Process Optimizer', icon: Zap },
    { id: 'settlement-authority-manager', name: 'AI Settlement Authority Manager', icon: Gavel },
    { id: 'litigation-coordinator', name: 'AI Litigation Coordinator', icon: Scale },
  ]},
  { id: 'vp-risk-assessment', name: 'AI VP Risk Assessment', icon: ShieldAlert, color: '#BF360C', subAgents: [
    { id: 'risk-model-overseer', name: 'AI Risk Model Overseer', icon: Brain },
    { id: 'assessment-standards-enforcer', name: 'AI Assessment Standards Enforcer', icon: SquareCheck },
    { id: 'emerging-risk-spotter', name: 'AI Emerging Risk Spotter', icon: Eye },
  ]},
];

const MANAGER_AGENT_GROUPS = [
  { id: 'underwriting-manager', name: 'AI Underwriting Manager', icon: BookOpen, color: '#FF7043', subAgents: [
    { id: 'workflow-prioritizer', name: 'AI Workflow Prioritizer', icon: ClipboardList },
    { id: 'quality-reviewer', name: 'AI Quality Reviewer', icon: SquareCheck },
    { id: 'exception-approver', name: 'AI Exception Approver', icon: ShieldCheck },
  ]},
  { id: 'claims-manager', name: 'AI Claims Manager', icon: ClipboardList, color: '#FF5722', subAgents: [
    { id: 'claims-assigner', name: 'AI Claims Assigner', icon: UserPlus },
    { id: 'reserve-reviewer', name: 'AI Reserve Reviewer', icon: DollarSign },
    { id: 'fraud-flag-coordinator', name: 'AI Fraud Flag Coordinator', icon: AlertTriangle },
  ]},
  { id: 'policy-manager', name: 'AI Policy Manager', icon: FileText, color: '#E64A19', subAgents: [
    { id: 'policy-lifecycle-manager', name: 'AI Policy Lifecycle Manager', icon: RefreshCw },
    { id: 'renewal-tracker', name: 'AI Renewal Tracker', icon: CalendarClock },
    { id: 'endorsement-processor', name: 'AI Endorsement Processor', icon: FileText },
  ]},
];

const SPECIALIST_AGENT_GROUPS = [
  { id: 'underwriter-1', name: 'AI Underwriter', icon: PenTool, color: '#FF7043', subAgents: [
    { id: 'risk-evaluator', name: 'AI Risk Evaluator', icon: Search },
    { id: 'premium-calculator', name: 'AI Premium Calculator', icon: Calculator },
    { id: 'coverage-analyzer', name: 'AI Coverage Analyzer', icon: Eye },
  ]},
  { id: 'claims-adjuster', name: 'AI Claims Adjuster', icon: ClipboardList, color: '#FF5722', subAgents: [
    { id: 'damage-assessor', name: 'AI Damage Assessor', icon: ClipboardList },
    { id: 'liability-determiner', name: 'AI Liability Determiner', icon: Scale },
    { id: 'settlement-negotiator', name: 'AI Settlement Negotiator', icon: Handshake },
  ]},
  { id: 'fraud-detector', name: 'AI Fraud Detection Agent', icon: Search, color: '#E64A19', subAgents: [
    { id: 'pattern-detector', name: 'AI Pattern Detector', icon: Search },
    { id: 'anomaly-scorer', name: 'AI Anomaly Scorer', icon: Activity },
    { id: 'investigation-coordinator', name: 'AI Investigation Coordinator', icon: Eye },
  ]},
  { id: 'actuary-analyst', name: 'AI Actuary Analyst', icon: Calculator, color: '#FF7043', subAgents: [
    { id: 'loss-development-tracker', name: 'AI Loss Development Tracker', icon: TrendingUp },
    { id: 'frequencyseverity-modeler', name: 'AI Frequency/Severity Modeler', icon: BarChart3 },
    { id: 'rate-filing-preparer', name: 'AI Rate Filing Preparer', icon: FileText },
  ]},
  { id: 'risk-modeler', name: 'AI Risk Modeler', icon: ChartBarBig, color: '#FF5722', subAgents: [
    { id: 'scenario-builder', name: 'AI Scenario Builder', icon: GitBranch },
    { id: 'correlation-analyst', name: 'AI Correlation Analyst', icon: BarChart3 },
    { id: 'capital-requirement-calculator', name: 'AI Capital Requirement Calculator', icon: Landmark },
  ]},
  { id: 'policy-admin', name: 'AI Policy Administrator', icon: FileText, color: '#E64A19', subAgents: [
    { id: 'policy-issuer', name: 'AI Policy Issuer', icon: FileText },
    { id: 'document-generator', name: 'AI Document Generator', icon: FileText },
    { id: 'compliance-checker', name: 'AI Compliance Checker', icon: ShieldCheck },
  ]},
  { id: 'customer-risk-analyst', name: 'AI Customer Risk Analyst', icon: UserCheck, color: '#FF7043', subAgents: [
    { id: 'risk-profiler', name: 'AI Risk Profiler', icon: UserCheck },
    { id: 'behavioral-scorer', name: 'AI Behavioral Scorer', icon: Brain },
    { id: 'segmentation-analyst', name: 'AI Segmentation Analyst', icon: PieChart },
  ]},
  { id: 'catastrophe-modeler', name: 'AI Catastrophe Modeler', icon: AlertTriangle, color: '#FF5722', subAgents: [
    { id: 'event-simulator', name: 'AI Event Simulator', icon: Zap },
    { id: 'exposure-aggregator', name: 'AI Exposure Aggregator', icon: Eye },
    { id: 'loss-estimator', name: 'AI Loss Estimator', icon: Calculator },
  ]},
  { id: 'reinsurance-specialist', name: 'AI Reinsurance Specialist', icon: ShieldCheck, color: '#E64A19', subAgents: [
    { id: 'treaty-negotiator', name: 'AI Treaty Negotiator', icon: Handshake },
    { id: 'ceding-calculator', name: 'AI Ceding Calculator', icon: DollarSign },
    { id: 'recoveries-tracker', name: 'AI Recoveries Tracker', icon: RotateCcw },
  ]},
];

const ALL_AGENTS = [...VP_EXECUTIVE_AGENTS, ...MANAGER_AGENT_GROUPS, ...SPECIALIST_AGENT_GROUPS];

export default function InsuranceDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF704320' }]}><Shield size={48} color="#FF7043" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Insurance & Risk</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>16 AI Agents · 48 Sub-Agents · Enterprise Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF704322' }]}><Star size={12} color="#FF7043" /><Text style={[styles.badgeText, { color: '#FF7043' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>64 Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:'16',icon:CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'48',icon:Users,color:'#FF7043'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Insurance & Risk department operates 16 specialized AI agents and 48 sub-agents covering underwriting, claims processing, fraud detection, actuarial analysis, risk modeling, policy administration, catastrophe modeling, and reinsurance management. Each agent operates with enterprise-grade performance metrics and A2A collaboration endpoints.</Text>
      </View>

      {/* VP & Executive Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>VP & Executive Agents (192-195)</Text>
        {VP_EXECUTIVE_AGENTS.map((agent) => (
          <View key={agent.id} style={styles.agentGroup}>
            <TouchableOpacity onPress={()=>router.push('/ai-agent/insurance/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subAgents.length} sub-agents</Text>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.subAgentRow}>
              {agent.subAgents.map((sub) => (
                <TouchableOpacity key={sub.id} onPress={()=>router.push('/ai-agent/insurance/sub-agents/'+sub.id)} style={[styles.subAgentChip, { backgroundColor: agent.color + '15' }]}>
                  <sub.icon size={14} color={agent.color} />
                  <Text style={[styles.subAgentChipText, { color: agent.color }]}>{sub.name.replace('AI ', '')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Manager Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Manager Agents (196-198)</Text>
        {MANAGER_AGENT_GROUPS.map((agent) => (
          <View key={agent.id} style={styles.agentGroup}>
            <TouchableOpacity onPress={()=>router.push('/ai-agent/insurance/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subAgents.length} sub-agents</Text>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.subAgentRow}>
              {agent.subAgents.map((sub) => (
                <TouchableOpacity key={sub.id} onPress={()=>router.push('/ai-agent/insurance/sub-agents/'+sub.id)} style={[styles.subAgentChip, { backgroundColor: agent.color + '15' }]}>
                  <sub.icon size={14} color={agent.color} />
                  <Text style={[styles.subAgentChipText, { color: agent.color }]}>{sub.name.replace('AI ', '')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Specialist Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialist Agents (199-207)</Text>
        {SPECIALIST_AGENT_GROUPS.map((agent) => (
          <View key={agent.id} style={styles.agentGroup}>
            <TouchableOpacity onPress={()=>router.push('/ai-agent/insurance/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subAgents.length} sub-agents</Text>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            <View style={styles.subAgentRow}>
              {agent.subAgents.map((sub) => (
                <TouchableOpacity key={sub.id} onPress={()=>router.push('/ai-agent/insurance/sub-agents/'+sub.id)} style={[styles.subAgentChip, { backgroundColor: agent.color + '15' }]}>
                  <sub.icon size={14} color={agent.color} />
                  <Text style={[styles.subAgentChipText, { color: agent.color }]}>{sub.name.replace('AI ', '')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#FF704312' }]}><act.icon size={24} color="#FF7043" /><Text style={[styles.actionText, { color: '#FF7043' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>

      <AgentFeatures agentId="insurance-index" agentName="Insurance Department" />
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
  agentGroup:{marginBottom:16},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:8},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  subAgentRow:{flexDirection:'row',flexWrap:'wrap',gap:8,marginLeft:12},
  subAgentChip:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:6,borderRadius:16,gap:4},
  subAgentChipText:{fontSize:11,fontWeight:'600'},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
