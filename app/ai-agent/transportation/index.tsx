import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Truck, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, Briefcase, Settings, Package, MapPin, Route, Zap, Layers, Eye, DollarSign, Map, Gauge, Wrench, LayoutGrid } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'clo-logistics', name: 'AI Chief Logistics Officer', description: 'C-Suite logistics strategy & network design', icon: Briefcase, color: '#26A69A' },
  { id: 'vp-transportation', name: 'AI VP Transportation', description: 'Fleet strategy & route network leadership', icon: Truck, color: '#26A69A' },
  { id: 'vp-logistics-operations', name: 'AI VP Logistics Operations', description: 'Hub operations & throughput management', icon: Settings, color: '#26A69A' },
  { id: 'fleet-manager', name: 'AI Fleet Manager', description: 'Vehicle scheduling & maintenance planning', icon: Truck, color: '#26A69A' },
  { id: 'warehouse-manager', name: 'AI Warehouse Manager', description: 'Slot optimization & labor scheduling', icon: Package, color: '#26A69A' },
  { id: 'distribution-manager', name: 'AI Distribution Manager', description: 'Zone planning & carrier allocation', icon: MapPin, color: '#26A69A' },
  { id: 'ai-route-optimizer', name: 'AI Route Optimizer', description: 'Traffic prediction & multi-stop planning', icon: Route, color: '#26A69A' },
  { id: 'ai-fleet-coordinator', name: 'AI Fleet Coordinator', description: 'Dispatch optimization & vehicle tracking', icon: Zap, color: '#26A69A' },
  { id: 'ai-warehouse-operator', name: 'AI Warehouse Operator', description: 'Put-away & pick-pack coordination', icon: Package, color: '#26A69A' },
  { id: 'ai-dispatcher', name: 'AI Dispatcher', description: 'Load matching & driver communication', icon: Layers, color: '#26A69A' },
  { id: 'ai-tracking-specialist', name: 'AI Tracking Specialist', description: 'Shipment monitoring & ETA prediction', icon: Eye, color: '#26A69A' },
  { id: 'ai-last-mile-coordinator', name: 'AI Last Mile Coordinator', description: 'Delivery window & POD management', icon: MapPin, color: '#26A69A' },
  { id: 'ai-freight-broker', name: 'AI Freight Broker', description: 'Rate negotiation & carrier qualification', icon: DollarSign, color: '#26A69A' },
  { id: 'ai-customs-specialist', name: 'AI Customs Specialist', description: 'Duty calculation & compliance checking', icon: Shield, color: '#26A69A' },
];

const HIERARCHY_LEVELS = [
  { title: 'C-Suite & VP Level (236-238)', agents: DEPARTMENT_AGENTS.slice(0, 3) },
  { title: 'Manager Level (239-241)', agents: DEPARTMENT_AGENTS.slice(3, 6) },
  { title: 'Specialist Level (242-249)', agents: DEPARTMENT_AGENTS.slice(6) },
];

export default function TransportationDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6D4C4120' }]}><Truck size={48} color="#6D4C41" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Transportation</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Transportation Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4122' }]}><Star size={12} color="#6D4C41" /><Text style={[styles.badgeText, { color: '#6D4C41' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#007AFF'},{label:'Accuracy',value:'99.8%',icon:Target,color:'#FF9500'},{label:'Processed',value:'10K+',icon:TrendingUp,color:'#6D4C41'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{'"AI-powered department agents optimizing operations through intelligent automation."'}</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/transportation/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#6D4C4112' }]}>
              <act.icon size={24} color="#6D4C41" />
              <Text style={[styles.actionText, { color: '#6D4C41' }]}>{act.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>42 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/transportation/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#0EA5E915' }]}>
          <Truck size={20} color="#0EA5E9" />
          <Text style={[styles.subAgentButtonText, { color: '#0EA5E9' }]}>View All 42 Sub-Agents</Text>
          <ArrowRight size={18} color="#0EA5E9" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="transportation-index" agentName="Transportation Department" />
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
  actionText:{fontSize:13,fontWeight:'600',marginTop:8},
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginTop:12,gap:12},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1}
});

