import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-event-officer', uid: 'ktx-33-chief-event-officer', title: 'AI Chief Event Officer', route: '/ai-agent/event-management/chief-event-officer', color: '#8B5CF6', level: 'c_level', efficiency: '84%' },
  { id: 'ai-event-coordinator', uid: 'ktx-33-event-coordinator', title: 'AI Event Coordinator', route: '/ai-agent/event-management/event-coordinator', color: '#8B5CF6', level: 'manager', efficiency: '86%' },
  { id: 'ai-event-manager', uid: 'ktx-33-event-manager', title: 'AI Event Manager', route: '/ai-agent/event-management/event-manager', color: '#8B5CF6', level: 'manager', efficiency: '87%' },
  { id: 'ai-event-marketing-specialist', uid: 'ktx-33-event-marketing-specialist', title: 'AI Event Marketing Specialist', route: '/ai-agent/event-management/event-marketing-specialist', color: '#8B5CF6', level: 'specialist', efficiency: '85%' },
  { id: 'ai-event-planner', uid: 'ktx-33-event-planner', title: 'AI Event Planner', route: '/ai-agent/event-management/event-planner', color: '#8B5CF6', level: 'manager', efficiency: '88%' },
  { id: 'ai-venue-manager', uid: 'ktx-33-venue-manager', title: 'AI Venue Manager', route: '/ai-agent/event-management/venue-manager', color: '#8B5CF6', level: 'manager', efficiency: '86%' },
  { id: 'ai-vp-event-logistics', uid: 'ktx-33-vp-event-logistics', title: 'AI VP Event Logistics', route: '/ai-agent/event-management/vp-event-logistics', color: '#8B5CF6', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-event-marketing', uid: 'ktx-33-vp-event-marketing', title: 'AI VP Event Marketing', route: '/ai-agent/event-management/vp-event-marketing', color: '#8B5CF6', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-event-operations', uid: 'ktx-33-vp-event-operations', title: 'AI VP Event Operations', route: '/ai-agent/event-management/vp-event-operations', color: '#8B5CF6', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-event-strategy', uid: 'ktx-33-vp-event-strategy', title: 'AI VP Event Strategy', route: '/ai-agent/event-management/vp-event-strategy', color: '#8B5CF6', level: 'vp_director', efficiency: '88%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Event Management - AI Agents</Text>
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  sub: { fontSize: 16, color: '#666', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { width: '48%', padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5', borderLeftWidth: 4 },
  at: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  al: { fontSize: 12, color: '#666', marginBottom: 2 },
  ae: { fontSize: 14, fontWeight: '500', color: '#333' }
});
