import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Building, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Search, Briefcase, Building2, Settings, FileText, Key, Wrench, House, Megaphone } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'creo', name: 'AI Chief Real Estate Officer', description: 'Executive strategic leadership & portfolio oversight', icon: Building, color: '#7B1FA2', subAgents: ['Portfolio Strategy Advisor', 'Market Cycle Analyst', 'Capital Deployment Planner'] },
  { id: 'vp-property-management', name: 'AI VP Property Management', description: 'Property operations & performance optimization', icon: Building, color: '#1565C0', subAgents: ['Property Performance Monitor', 'NOI Optimizer', 'Tenant Retention Strategist'] },
  { id: 'vp-real-estate-development', name: 'AI VP Real Estate Development', description: 'Development pipeline & project management', icon: Building, color: '#00838F', subAgents: ['Development Pipeline Manager', 'Feasibility Analyst', 'Permit Tracker'] },
  { id: 'property-manager', name: 'AI Property Manager', description: 'Property operations & tenant management', icon: Building, color: '#33691E', subAgents: ['Rent Collector', 'Maintenance Dispatcher', 'Lease Enforcer'] },
  { id: 'leasing-manager', name: 'AI Leasing Manager', description: 'Lease negotiations & tenant acquisition', icon: Building, color: '#EF6C00', subAgents: ['Vacancy Minimizer', 'Lease Negotiator', 'Tenant Qualifier'] },
  { id: 'facilities-manager', name: 'AI Facilities Manager', description: 'Building systems & facility operations', icon: Building, color: '#5D4037', subAgents: ['Building Systems Monitor', 'Energy Manager', 'Space Optimizer'] },
  { id: 'property-analyst', name: 'AI Property Analyst', description: 'Market analysis & property valuation', icon: Building, color: '#2E7D32', subAgents: ['Comparable Analyzer', 'Value Estimator', 'Market Trend Reporter'] },
  { id: 'lease-administrator', name: 'AI Lease Administrator', description: 'Lease management & compliance', icon: Building, color: '#6A1B9A', subAgents: ['Lease Abstractor', 'Critical Date Tracker', 'Rent Escalation Calculator'] },
  { id: 'tenant-relations', name: 'AI Tenant Relations Specialist', description: 'Tenant communication & satisfaction', icon: Building, color: '#C62828', subAgents: ['Issue Resolver', 'Communication Coordinator', 'Satisfaction Surveyor'] },
  { id: 'maintenance-coordinator', name: 'AI Maintenance Coordinator', description: 'Maintenance operations & vendor management', icon: Building, color: '#F57C00', subAgents: ['Work Order Prioritizer', 'Vendor Dispatcher', 'Cost Estimator'] },
  { id: 'acquisition-analyst', name: 'AI Acquisition Analyst', description: 'Property acquisition & due diligence', icon: Building, color: '#00695C', subAgents: ['Deal Screener', 'Due Diligence Coordinator', 'Underwriting Assistant'] },
  { id: 'asset-manager', name: 'AI Asset Manager', description: 'Asset performance & disposition', icon: Building, color: '#4527A0', subAgents: ['Asset Performance Tracker', 'Disposition Advisor', 'Return Calculator'] },
  { id: 'development-coordinator', name: 'AI Development Coordinator', description: 'Project coordination & timeline management', icon: Building, color: '#283593', subAgents: ['Timeline Manager', 'Contractor Coordinator', 'Budget Tracker'] },
  { id: 'property-marketing', name: 'AI Property Marketing', description: 'Property marketing & lead generation', icon: Building, color: '#AD1457', subAgents: ['Listing Creator', 'Virtual Tour Builder', 'Lead Qualifier'] }
];

export default function RealestateDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#33691E20' }]}><Building size={48} color="#33691E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Real Estate</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Real Estate Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#33691E22' }]}><Star size={12} color="#33691E" /><Text style={[styles.badgeText, { color: '#33691E' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#33691E'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>14 Department Agents • 42 Sub-Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/realestate/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><agent.icon size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
              {agent.subAgents && (
                <View style={styles.subAgentsRow}>
                  {agent.subAgents.map((sub: string, idx: number) => (
                    <View key={idx} style={[styles.subAgentChip, { backgroundColor: agent.color + '15' }]}>
                      <Text style={[styles.subAgentText, { color: agent.color }]}>{sub}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#33691E12' }]}><act.icon size={24} color="#33691E" /><Text style={[styles.actionText, { color: '#33691E' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>42 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/realestate/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#8B5CF615' }]}>
          <Building2 size={20} color="#8B5CF6" />
          <Text style={[styles.subAgentButtonText, { color: '#8B5CF6' }]}>View All 42 Sub-Agents</Text>
          <ArrowRight size={18} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="realestate-index" agentName="Real Estate Department" />
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
  agentCard:{flexDirection:'row',alignItems:'flex-start',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  subAgentsRow:{flexDirection:'row',flexWrap:'wrap',gap:6,marginTop:8},
  subAgentChip:{paddingHorizontal:8,paddingVertical:4,borderRadius:12},
  subAgentText:{fontSize:10,fontWeight:'500'},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8},
  subAgentButton:{flexDirection:'row',alignItems:'center',justifyContent:'center',padding:14,borderRadius:12,gap:8,marginTop:12},
  subAgentButtonText:{fontSize:14,fontWeight:'600'}
});

