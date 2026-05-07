import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Link, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp, User, Package, ShoppingCart, Truck, Warehouse, ClipboardList, BarChart3, Handshake, Ship, PackageCheck } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

const DEPARTMENT_AGENTS = [
  { id: 'vp-supply-chain-ops', name: 'AI VP Supply Chain Operations', description: 'Strategic oversight of entire supply chain network', icon: User, color: '#581C84', route: '/ai-agent/supply-chain/vp-supply-chain-ops', count: 3 },
  { id: 'procurement-manager', name: 'AI Procurement Manager', description: 'Manage sourcing, contracts, and supplier evaluation', icon: ShoppingCart, color: '#0EA5E9', route: '/ai-agent/supply-chain/procurement-manager', count: 3 },
  { id: 'logistics-manager', name: 'AI Logistics Manager', description: 'Coordinate transportation and service level monitoring', icon: Truck, color: '#F59E0B', route: '/ai-agent/supply-chain/logistics-manager', count: 3 },
  { id: 'warehouse-lead', name: 'AI Warehouse Lead', description: 'Oversee warehouse operations, layout, and safety', icon: Warehouse, color: '#10B981', route: '/ai-agent/supply-chain/warehouse-lead', count: 3 },
  { id: 'procurement-buyer', name: 'AI Procurement Buyer', description: 'Handle RFQs, bid analysis, and order placement', icon: ClipboardList, color: '#8B5CF6', route: '/ai-agent/supply-chain/procurement-buyer', count: 3 },
  { id: 'inventory-specialist', name: 'AI Inventory Specialist', description: 'Optimize stock levels and track obsolescence', icon: BarChart3, color: '#EC4899', route: '/ai-agent/supply-chain/inventory-specialist', count: 3 },
  { id: 'demand-planner', name: 'AI Demand Planner', description: 'Forecast demand and adjust for seasonality', icon: TrendingUp, color: '#06B6D4', route: '/ai-agent/supply-chain/ai-demand-planner', count: 3 },
  { id: 'supplier-relations', name: 'AI Supplier Relations', description: 'Manage supplier performance and relationships', icon: Handshake, color: '#F97316', route: '/ai-agent/supply-chain/ai-supplier-relations', count: 3 },
  { id: 'shipping-coordinator', name: 'AI Shipping Coordinator', description: 'Book carriers and track shipments', icon: Ship, color: '#84CC16', route: '/ai-agent/supply-chain/ai-shipping-coordinator', count: 3 },
  { id: 'fulfillment-specialist', name: 'AI Fulfillment Specialist', description: 'Process orders and optimize packaging', icon: PackageCheck, color: '#6366F1', route: '/ai-agent/supply-chain/ai-fulfillment-specialist', count: 3 },
];

export default function SupplyChainDepartment() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5D403720' }]}><Link size={48} color="#5D4037" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Supply Chain</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents for Supply Chain Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Star size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{DEPARTMENT_AGENTS.length} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:DEPARTMENT_AGENTS.length.toString(),icon: CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'30',icon:Users,color:'#007AFF'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#FF9500'},{label:'Processed',value:'500K+',icon:TrendingUp,color:'#5D4037'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The Supply Chain department optimizes logistics, procurement, and inventory management through AI-powered forecasting and automation.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Department Agents</Text>
        {DEPARTMENT_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={()=>router.push('/ai-agent/supply-chain/'+agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
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
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#5D403712' }]}>
              <act.icon size={24} color="#5D4037" />
              <Text style={[styles.actionText, { color: '#5D4037' }]}>{act.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>30 helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/supply-chain/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '#0EA5E915' }]}>
          <Package size={20} color="#0EA5E9" />
          <Text style={[styles.subAgentButtonText, { color: '#0EA5E9' }]}>View All 30 Sub-Agents</Text>
          <ArrowRight size={18} color="#0EA5E9" />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="supply-chain-index" agentName="Supply Chain Department" />
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

