import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Zap, GitBranch, Crown, Building2, DollarSign, Megaphone, Cpu, Building, MapPin, Settings, Radio, Globe, Compass, Lightbulb, Handshake, Rocket, Network, RefreshCw, Layout, UserCheck, FileText, BarChart3, ShieldAlert, AlertTriangle, CheckCircle, FileCheck, Heart, Database, Scale, Gavel, PiggyBank, LineChart } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'aod-lead', name: 'AOD Lead', description: 'AOD Lead AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'board-advisor', name: 'AI Board Advisor', description: 'AI Board Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cao-automation', name: 'AI CAO Automation', description: 'AI CAO Automation AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cco-advisor', name: 'AI CCO Advisor', description: 'AI CCO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cdao-advisor', name: 'AI CDAO Advisor', description: 'AI CDAO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'ceo-advisor', name: 'AI CEO Advisor', description: 'AI CEO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cfo-analyst', name: 'AI CFO Analyst', description: 'AI CFO Analyst AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'chro-advisor', name: 'AI CHRO Advisor', description: 'AI CHRO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cio-advisor', name: 'AI CIO Advisor', description: 'AI CIO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'ciso-advisor', name: 'AI CISO Advisor', description: 'AI CISO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'clo-advisor', name: 'AI CLO Advisor', description: 'AI CLO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'clo-logistics', name: 'CLO - Logistics', description: 'CLO - Logistics AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cmo-advisor', name: 'AI CMO Advisor', description: 'AI CMO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cmo-healthcare', name: 'CMO Healthcare', description: 'CMO Healthcare AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'coo-strategist', name: 'AI COO Strategist', description: 'AI COO Strategist AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cpo-production', name: 'AI CPO Production', description: 'AI CPO Production AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'creo-advisor', name: 'AI CREO Advisor', description: 'AI CREO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cro-risk', name: 'AI CRO Risk', description: 'AI CRO Risk AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'cto-advisor', name: 'AI CTO Advisor', description: 'AI CTO Advisor AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'decision-engine', name: 'AI Decision Engine', description: 'AI Decision Engine AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'rpa-manager', name: 'RPA Manager', description: 'RPA Manager AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'strategy-planner', name: 'AI Strategy Planner', description: 'AI Strategy Planner AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'vp-automation', name: 'VP Automation', description: 'VP Automation AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'vp-process-excellence', name: 'VP Process Excellence', description: 'VP Process Excellence AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'workflow-specialist', name: 'Workflow Specialist', description: 'Workflow Specialist AI Agent', icon: Briefcase, color: '#4A148C' },
  { id: 'c-strategic-advisor-1', name: 'C-Level Strategic Advisor 1', description: 'Strategic Planning Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-2', name: 'C-Level Strategic Advisor 2', description: 'Business Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-3', name: 'C-Level Strategic Advisor 3', description: 'Financial Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-4', name: 'C-Level Strategic Advisor 4', description: 'Technology Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-5', name: 'C-Level Strategic Advisor 5', description: 'Operational Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-6', name: 'C-Level Strategic Advisor 6', description: 'Market Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-7', name: 'C-Level Strategic Advisor 7', description: 'Talent Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'c-strategic-advisor-8', name: 'C-Level Strategic Advisor 8', description: 'Risk Strategy Advisor', icon: Crown, color: '#4A148C' },
  { id: 'evp-operations', name: 'Executive VP Operations', description: 'Executive Vice President of Operations', icon: Building2, color: '#4A148C' },
  { id: 'evp-finance', name: 'Executive VP Finance', description: 'Executive Vice President of Finance', icon: DollarSign, color: '#4A148C' },
  { id: 'evp-sales', name: 'Executive VP Sales', description: 'Executive Vice President of Sales', icon: TrendingUp, color: '#4A148C' },
  { id: 'evp-marketing', name: 'Executive VP Marketing', description: 'Executive Vice President of Marketing', icon: Megaphone, color: '#4A148C' },
  { id: 'evp-technology', name: 'Executive VP Technology', description: 'Executive Vice President of Technology', icon: Cpu, color: '#4A148C' },
  { id: 'evp-human-resources', name: 'Executive VP Human Resources', description: 'Executive Vice President of Human Resources', icon: Users, color: '#4A148C' },
  { id: 'division-president-1', name: 'Division President 1', description: 'Division President - North America', icon: Building, color: '#4A148C' },
  { id: 'division-president-2', name: 'Division President 2', description: 'Division President - Europe', icon: Building, color: '#4A148C' },
  { id: 'division-president-3', name: 'Division President 3', description: 'Division President - Asia Pacific', icon: Building, color: '#4A148C' },
  { id: 'division-president-4', name: 'Division President 4', description: 'Division President - Global Products', icon: Building, color: '#4A148C' },
  { id: 'regional-director-1', name: 'Regional Director 1', description: 'Regional Director - Northeast', icon: MapPin, color: '#4A148C' },
  { id: 'regional-director-2', name: 'Regional Director 2', description: 'Regional Director - Midwest', icon: MapPin, color: '#4A148C' },
  { id: 'regional-director-3', name: 'Regional Director 3', description: 'Regional Director - West Coast', icon: MapPin, color: '#4A148C' },
  { id: 'regional-director-4', name: 'Regional Director 4', description: 'Regional Director - Southeast', icon: MapPin, color: '#4A148C' },
  { id: 'regional-director-5', name: 'Regional Director 5', description: 'Regional Director - International', icon: MapPin, color: '#4A148C' },
  { id: 'functional-director-1', name: 'Functional Director 1', description: 'Director of Operations', icon: Settings, color: '#4A148C' },
  { id: 'functional-director-2', name: 'Functional Director 2', description: 'Director of Finance', icon: DollarSign, color: '#4A148C' },
  { id: 'functional-director-3', name: 'Functional Director 3', description: 'Director of Human Resources', icon: Users, color: '#4A148C' },
  { id: 'functional-director-4', name: 'Functional Director 4', description: 'Director of Sales', icon: TrendingUp, color: '#4A148C' },
  { id: 'functional-director-5', name: 'Functional Director 5', description: 'Director of Marketing', icon: Megaphone, color: '#4A148C' },
  { id: 'functional-director-6', name: 'Functional Director 6', description: 'Director of Technology', icon: Cpu, color: '#4A148C' },
  { id: 'exec-comm-director-1', name: 'Executive Communication Director 1', description: 'Director of Internal Communications', icon: MessageSquare, color: '#4A148C' },
  { id: 'exec-comm-director-2', name: 'Executive Communication Director 2', description: 'Director of External Communications', icon: Radio, color: '#4A148C' },
  { id: 'exec-comm-director-3', name: 'Executive Communication Director 3', description: 'Director of Investor Communications', icon: Globe, color: '#4A148C' },
  { id: 'strategy-director-1', name: 'Strategy Director 1', description: 'Director of Corporate Strategy', icon: Target, color: '#4A148C' },
  { id: 'strategy-director-2', name: 'Strategy Director 2', description: 'Director of Business Strategy', icon: Compass, color: '#4A148C' },
  { id: 'strategy-director-3', name: 'Strategy Director 3', description: 'Director of Innovation Strategy', icon: Lightbulb, color: '#4A148C' },
  { id: 'strategy-director-4', name: 'Strategy Director 4', description: 'Director of Risk Strategy', icon: Shield, color: '#4A148C' },
  { id: 'bus-dev-director-1', name: 'Business Development Director 1', description: 'Director of Strategic Partnerships', icon: Handshake, color: '#4A148C' },
  { id: 'bus-dev-director-2', name: 'Business Development Director 2', description: 'Director of New Markets', icon: Rocket, color: '#4A148C' },
  { id: 'bus-dev-director-3', name: 'Business Development Director 3', description: 'Director of M&A', icon: Briefcase, color: '#4A148C' },
  { id: 'bus-dev-director-4', name: 'Business Development Director 4', description: 'Director of Channel Development', icon: Network, color: '#4A148C' },
  { id: 'innovation-director-1', name: 'Innovation Director 1', description: 'Director of Product Innovation', icon: Lightbulb, color: '#4A148C' },
  { id: 'innovation-director-2', name: 'Innovation Director 2', description: 'Director of Process Innovation', icon: Zap, color: '#4A148C' },
  { id: 'innovation-director-3', name: 'Innovation Director 3', description: 'Director of Technology Innovation', icon: Cpu, color: '#4A148C' },
  { id: 'transformation-director-1', name: 'Transformation Director 1', description: 'Director of Digital Transformation', icon: RefreshCw, color: '#4A148C' },
  { id: 'transformation-director-2', name: 'Transformation Director 2', description: 'Director of Business Transformation', icon: GitBranch, color: '#4A148C' },
  { id: 'transformation-director-3', name: 'Transformation Director 3', description: 'Director of Cultural Transformation', icon: Layout, color: '#4A148C' },
  { id: 'chief-of-staff-1', name: 'Chief of Staff 1', description: 'Chief of Staff to CEO', icon: UserCheck, color: '#4A148C' },
  { id: 'chief-of-staff-2', name: 'Chief of Staff 2', description: 'Chief of Staff to Board', icon: UserCheck, color: '#4A148C' },
  { id: 'board-relations-1', name: 'Board Relations Specialist 1', description: 'Board Relations Manager', icon: Users, color: '#4A148C' },
  { id: 'board-relations-2', name: 'Board Relations Specialist 2', description: 'Board Meeting Coordinator', icon: FileText, color: '#4A148C' },
  { id: 'board-relations-3', name: 'Board Relations Specialist 3', description: 'Corporate Governance Specialist', icon: Shield, color: '#4A148C' },
  { id: 'investor-relations-1', name: 'Investor Relations Director 1', description: 'Director of Investor Relations', icon: TrendingUp, color: '#4A148C' },
  { id: 'investor-relations-2', name: 'Investor Relations Director 2', description: 'Director of Shareholder Services', icon: DollarSign, color: '#4A148C' },
  { id: 'investor-relations-3', name: 'Investor Relations Director 3', description: 'Director of Financial Communications', icon: BarChart3, color: '#4A148C' },
  { id: 'exec-risk-manager-1', name: 'Executive Risk Manager 1', description: 'Enterprise Risk Manager', icon: ShieldAlert, color: '#4A148C' },
  { id: 'exec-risk-manager-2', name: 'Executive Risk Manager 2', description: 'Strategic Risk Manager', icon: AlertTriangle, color: '#4A148C' },
  { id: 'exec-compliance-1', name: 'Executive Compliance Officer 1', description: 'Corporate Compliance Officer', icon: CheckCircle, color: '#4A148C' },
  { id: 'exec-compliance-2', name: 'Executive Compliance Officer 2', description: 'Regulatory Compliance Officer', icon: FileCheck, color: '#4A148C' },
  { id: 'exec-hr-advisor-1', name: 'Executive HR Advisor 1', description: 'Executive HR Strategy Advisor', icon: Users, color: '#4A148C' },
  { id: 'exec-hr-advisor-2', name: 'Executive HR Advisor 2', description: 'Executive Culture Advisor', icon: Heart, color: '#4A148C' },
  { id: 'exec-tech-advisor-1', name: 'Executive Technology Advisor 1', description: 'Technology Strategy Advisor', icon: Cpu, color: '#4A148C' },
  { id: 'exec-tech-advisor-2', name: 'Executive Technology Advisor 2', description: 'IT Architecture Advisor', icon: Database, color: '#4A148C' },
  { id: 'exec-legal-1', name: 'Executive Legal Counsel 1', description: 'Corporate Legal Counsel', icon: Scale, color: '#4A148C' },
  { id: 'exec-legal-2', name: 'Executive Legal Counsel 2', description: 'Strategic Legal Advisor', icon: Gavel, color: '#4A148C' },
  { id: 'exec-financial-advisor-1', name: 'Executive Financial Advisor 1', description: 'Financial Strategy Advisor', icon: PiggyBank, color: '#4A148C' },
  { id: 'exec-financial-advisor-2', name: 'Executive Financial Advisor 2', description: 'Treasury & Cash Advisor', icon: LineChart, color: '#4A148C' }
];

export default function ExecutiveDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#4A148C20' }]}><Briefcase size={48} color="#4A148C" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Executive</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Executive Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4A148C22' }]}><Star size={12} color="#4A148C" /><Text style={[styles.badgeText, { color: '#4A148C' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#4A148C'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/executive/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#4A148C12' }]}><act.icon size={24} color="#4A148C" /><Text style={[styles.actionText, { color: '#4A148C' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="executive-index" agentName="Executive Department" />
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

