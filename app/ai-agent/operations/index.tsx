import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Activity, Star, Users, CheckCircle2, Clock, Target, ArrowRight, BarChart3, MessageSquare, Calendar, Shield, Workflow, CheckCircle, Clipboard, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'admin-manager', name: 'Admin Manager', description: 'Admin Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-document-controller', name: 'AI Document Controller', description: 'AI Document Controller AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-executive-assistant', name: 'AI Executive Assistant', description: 'AI Executive Assistant AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-facilities-coordinator', name: 'AI Facilities Coordinator', description: 'AI Facilities Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-office-manager', name: 'AI Office Manager', description: 'AI Office Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-operations-manager', name: 'AI Operations Manager', description: 'AI Operations Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-process-optimization', name: 'AI Process Optimization', description: 'AI Process Optimization AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-quality-assurance', name: 'AI Quality Assurance', description: 'AI Quality Assurance AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-resource-planner', name: 'AI Resource Planner', description: 'AI Resource Planner AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-task-coordinator', name: 'AI Task Coordinator', description: 'AI Task Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-travel-coordinator', name: 'AI Travel Coordinator', description: 'AI Travel Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ai-workflow-automation', name: 'AI Workflow Automation', description: 'AI Workflow Automation AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'cao-admin', name: 'CAO - Chief Admin Officer', description: 'CAO - Chief Admin Officer AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'clo-logistics', name: 'CLO - Logistics', description: 'CLO - Logistics AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'compliance-monitoring', name: 'AI Compliance Monitoring Agent', description: 'AI Compliance Monitoring Agent AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'coo', name: 'COO', description: 'COO AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'customs-specialist', name: 'Customs Specialist', description: 'Customs Specialist AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'demand-planner', name: 'Demand Planner', description: 'Demand Planner AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'dispatcher', name: 'Dispatcher', description: 'Dispatcher AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'distribution-manager', name: 'Distribution Manager', description: 'Distribution Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'fleet-coordinator', name: 'Fleet Coordinator', description: 'Fleet Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'fleet-manager', name: 'Fleet Manager', description: 'Fleet Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'freight-broker', name: 'Freight Broker', description: 'Freight Broker AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'fulfillment-specialist', name: 'Fulfillment Specialist', description: 'Fulfillment Specialist AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'inventory-specialist', name: 'Inventory Specialist', description: 'Inventory Specialist AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'last-mile-coordinator', name: 'Last Mile Coordinator', description: 'Last Mile Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'logistics-manager', name: 'Logistics Manager', description: 'Logistics Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'operations-manager', name: 'AI Operations Manager', description: 'AI Operations Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'ops-manager', name: 'Ops Manager', description: 'Ops Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'process-optimization', name: 'AI Process Optimization Agent', description: 'AI Process Optimization Agent AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'procurement-buyer', name: 'Procurement Buyer', description: 'Procurement Buyer AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'procurement-manager', name: 'Procurement Manager', description: 'Procurement Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'quality-control', name: 'AI Quality Control Agent', description: 'AI Quality Control Agent AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'resource-planner', name: 'AI Resource Planner', description: 'AI Resource Planner AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'route-optimizer', name: 'Route Optimizer', description: 'Route Optimizer AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'shipping-coordinator', name: 'Shipping Coordinator', description: 'Shipping Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'supplier-relations', name: 'Supplier Relations', description: 'Supplier Relations AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'task-coordinator', name: 'AI Task Coordinator', description: 'AI Task Coordinator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'tracking-specialist', name: 'Tracking Specialist', description: 'Tracking Specialist AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vendor-management', name: 'AI Vendor Management Agent', description: 'AI Vendor Management Agent AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-admin-ops', name: 'VP Admin Operations', description: 'VP Admin Operations AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-facilities-admin', name: 'VP Facilities & Admin', description: 'VP Facilities & Admin AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-facilities', name: 'VP Facilities', description: 'VP Facilities AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-logistics-ops', name: 'VP Logistics Operations', description: 'VP Logistics Operations AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-operations', name: 'VP Operations', description: 'VP Operations AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-project-management', name: 'VP Project Management', description: 'VP Project Management AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-quality', name: 'VP Quality', description: 'VP Quality AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-supply-chain-ops', name: 'VP Supply Chain Operations', description: 'VP Supply Chain Operations AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-supply-chain', name: 'VP Supply Chain', description: 'VP Supply Chain AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'vp-transportation', name: 'VP Transportation', description: 'VP Transportation AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'warehouse-lead', name: 'Warehouse Lead', description: 'Warehouse Lead AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'warehouse-manager', name: 'Warehouse Manager', description: 'Warehouse Manager AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'warehouse-operator', name: 'Warehouse Operator', description: 'Warehouse Operator AI Agent', icon: Settings, color: '#4E342E' },
  { id: 'workflow-automation', name: 'AI Workflow Automation Agent', description: 'AI Workflow Automation Agent AI Agent', icon: Settings, color: '#4E342E' }
];;

export default function OperationsDepartment() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#607D8B20' }]}><Settings size={48} color="#607D8B" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Operations & Management</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Operational Excellence</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#607D8B22' }]}><Star size={12} color="#607D8B" /><Text style={[styles.badgeText, { color: '#607D8B' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon:CheckCircle2,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Activity,color:'#007AFF'},{label:'Efficiency',value:'+40%',icon:Clock,color:'#FF9500'},{label:'Quality',value:'99.5%',icon:Target,color:'#607D8B'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Operations & Management department ensures business efficiency through AI-powered process optimization, quality control, and workflow automation. Our agents streamline operations and improve productivity.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/operations/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:BarChart3},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#607D8B12' }]}><act.icon size={24} color="#607D8B" /><Text style={[styles.actionText, { color: '#607D8B' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
    <AgentFeatures agentId="operations-index" agentName="Operations Department" />

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
