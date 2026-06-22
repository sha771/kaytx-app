import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-agriculture-officer', uid: 'ktx-34-chief-agriculture-officer', title: 'AI Chief Agriculture Officer', route: '/ai-agent/agriculture/chief-agriculture-officer', color: '#22C55E', level: 'c_level', efficiency: '83%' },
  { id: 'ai-crop-manager', uid: 'ktx-34-crop-manager', title: 'AI Crop Manager', route: '/ai-agent/agriculture/crop-manager', color: '#22C55E', level: 'manager', efficiency: '85%' },
  { id: 'ai-equipment-manager', uid: 'ktx-34-equipment-manager', title: 'AI Equipment Manager', route: '/ai-agent/agriculture/equipment-manager', color: '#22C55E', level: 'manager', efficiency: '84%' },
  { id: 'ai-livestock-manager', uid: 'ktx-34-livestock-manager', title: 'AI Livestock Manager', route: '/ai-agent/agriculture/livestock-manager', color: '#22C55E', level: 'manager', efficiency: '86%' },
  { id: 'ai-precision-farming-specialist', uid: 'ktx-34-precision-farming-specialist', title: 'AI Precision Farming Specialist', route: '/ai-agent/agriculture/precision-farming-specialist', color: '#22C55E', level: 'specialist', efficiency: '87%' },
  { id: 'ai-sustainability-manager', uid: 'ktx-34-sustainability-manager', title: 'AI Sustainability Manager', route: '/ai-agent/agriculture/sustainability-manager', color: '#22C55E', level: 'manager', efficiency: '85%' },
  { id: 'ai-vp-agriculture-technology', uid: 'ktx-34-vp-agriculture-technology', title: 'AI VP Agriculture Technology', route: '/ai-agent/agriculture/vp-agriculture-technology', color: '#22C55E', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-crop-production', uid: 'ktx-34-vp-crop-production', title: 'AI VP Crop Production', route: '/ai-agent/agriculture/vp-crop-production', color: '#22C55E', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-farm-operations', uid: 'ktx-34-vp-farm-operations', title: 'AI VP Farm Operations', route: '/ai-agent/agriculture/vp-farm-operations', color: '#22C55E', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-livestock-management', uid: 'ktx-34-vp-livestock-management', title: 'AI VP Livestock Management', route: '/ai-agent/agriculture/vp-livestock-management', color: '#22C55E', level: 'vp_director', efficiency: '85%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Agriculture - AI Agents</Text>
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
