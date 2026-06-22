import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-restaurant-officer', uid: 'ktx-36-chief-restaurant-officer', title: 'AI Chief Restaurant Officer', route: '/ai-agent/restaurants/chief-restaurant-officer', color: '#F59E0B', level: 'c_level', efficiency: '82%' },
  { id: 'ai-head-chef', uid: 'ktx-36-head-chef', title: 'AI Head Chef', route: '/ai-agent/restaurants/head-chef', color: '#F59E0B', level: 'manager', efficiency: '88%' },
  { id: 'ai-kitchen-manager', uid: 'ktx-36-kitchen-manager', title: 'AI Kitchen Manager', route: '/ai-agent/restaurants/kitchen-manager', color: '#F59E0B', level: 'manager', efficiency: '86%' },
  { id: 'ai-restaurant-manager', uid: 'ktx-36-restaurant-manager', title: 'AI Restaurant Manager', route: '/ai-agent/restaurants/restaurant-manager', color: '#F59E0B', level: 'manager', efficiency: '87%' },
  { id: 'ai-service-manager', uid: 'ktx-36-service-manager', title: 'AI Service Manager', route: '/ai-agent/restaurants/service-manager', color: '#F59E0B', level: 'manager', efficiency: '85%' },
  { id: 'ai-sous-chef', uid: 'ktx-36-sous-chef', title: 'AI Sous Chef', route: '/ai-agent/restaurants/sous-chef', color: '#F59E0B', level: 'manager', efficiency: '86%' },
  { id: 'ai-vp-culinary', uid: 'ktx-36-vp-culinary', title: 'AI VP Culinary', route: '/ai-agent/restaurants/vp-culinary', color: '#F59E0B', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-finance', uid: 'ktx-36-vp-finance', title: 'AI VP Finance', route: '/ai-agent/restaurants/vp-finance', color: '#F59E0B', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-marketing', uid: 'ktx-36-vp-marketing', title: 'AI VP Marketing', route: '/ai-agent/restaurants/vp-marketing', color: '#F59E0B', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-operations', uid: 'ktx-36-vp-operations', title: 'AI VP Operations', route: '/ai-agent/restaurants/vp-operations', color: '#F59E0B', level: 'vp_director', efficiency: '87%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Restaurants - AI Agents</Text>
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
