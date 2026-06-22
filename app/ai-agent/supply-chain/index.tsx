import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-vp-supply-chain-operations', uid: 'ktx-21-vp-supply-chain-operations', title: 'AI VP Supply Chain Operations', route: '/ai-agent/supply-chain/vp-supply-chain-operations', color: '#42A5F5', level: 'vp_director', efficiency: '78%' },
  { id: 'ai-procurement-manager', uid: 'ktx-21-procurement-manager', title: 'AI Procurement Manager', route: '/ai-agent/supply-chain/procurement-manager', color: '#42A5F5', level: 'manager', efficiency: '89%' },
  { id: 'ai-logistics-manager', uid: 'ktx-21-logistics-manager', title: 'AI Logistics Manager', route: '/ai-agent/supply-chain/logistics-manager', color: '#42A5F5', level: 'manager', efficiency: '75%' },
  { id: 'ai-warehouse-lead', uid: 'ktx-21-warehouse-lead', title: 'AI Warehouse Lead', route: '/ai-agent/supply-chain/warehouse-lead', color: '#42A5F5', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-procurement-buyer', uid: 'ktx-21-procurement-buyer', title: 'AI Procurement Buyer', route: '/ai-agent/supply-chain/procurement-buyer', color: '#42A5F5', level: 'team_lead', efficiency: '75%' },
  { id: 'ai-inventory-specialist', uid: 'ktx-21-inventory-specialist', title: 'AI Inventory Specialist', route: '/ai-agent/supply-chain/inventory-specialist', color: '#42A5F5', level: 'team_lead', efficiency: '76%' },
  { id: 'ai-demand-planner', uid: 'ktx-21-demand-planner', title: 'AI Demand Planner', route: '/ai-agent/supply-chain/demand-planner', color: '#42A5F5', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-supplier-relations', uid: 'ktx-21-supplier-relations', title: 'AI Supplier Relations', route: '/ai-agent/supply-chain/supplier-relations', color: '#42A5F5', level: 'team_lead', efficiency: '82%' },
  { id: 'ai-shipping-coordinator', uid: 'ktx-21-shipping-coordinator', title: 'AI Shipping Coordinator', route: '/ai-agent/supply-chain/shipping-coordinator', color: '#42A5F5', level: 'c_level', efficiency: '76%' },
  { id: 'ai-fulfillment-specialist', uid: 'ktx-21-fulfillment-specialist', title: 'AI Fulfillment Specialist', route: '/ai-agent/supply-chain/fulfillment-specialist', color: '#42A5F5', level: 'team_lead', efficiency: '90%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Supply Chain & Logistics - AI Agents</Text>
      <Text style={s.sub}>60 AI Agents & Employees</Text>
      <View style={s.grid}>
        {agents.map((a) => (
          <Pressable key={a.id} style={[s.card, { borderLeftColor: a.color }]} onPress={() => router.push(a.route as any)}>
            <Text style={s.at}>{a.title}</Text>
            <Text style={s.al}>{a.level.replace('_',' ').toUpperCase()}</Text>
            <Text style={s.ae}>{a.efficiency}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0a0a0a',padding:16},title:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:4},
  sub:{color:'#888',fontSize:14,marginBottom:16},grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  card:{backgroundColor:'#1a1a2e',borderRadius:12,padding:16,width:'48%',borderLeftWidth:3},
  at:{color:'#fff',fontSize:14,fontWeight:'600',marginBottom:4},al:{color:'#888',fontSize:11,marginBottom:2},
  ae:{color:'#10B981',fontSize:12},
});
