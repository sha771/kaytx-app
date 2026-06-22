import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-strategy-officer', uid: 'ktx-32-chief-strategy-officer', title: 'AI Chief Strategy Officer', route: '/ai-agent/executive-strategy/chief-strategy-officer', color: '#6366F1', level: 'c_level', efficiency: '85%' },
  { id: 'ai-vp-business-development', uid: 'ktx-32-vp-business-development', title: 'AI VP Business Development', route: '/ai-agent/executive-strategy/vp-business-development', color: '#6366F1', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-corporate-strategy', uid: 'ktx-32-vp-corporate-strategy', title: 'AI VP Corporate Strategy', route: '/ai-agent/executive-strategy/vp-corporate-strategy', color: '#6366F1', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-innovation-strategy', uid: 'ktx-32-vp-innovation-strategy', title: 'AI VP Innovation Strategy', route: '/ai-agent/executive-strategy/vp-innovation-strategy', color: '#6366F1', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-investor-relations', uid: 'ktx-32-vp-investor-relations', title: 'AI VP Investor Relations', route: '/ai-agent/executive-strategy/vp-investor-relations', color: '#6366F1', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-market-intelligence', uid: 'ktx-32-vp-market-intelligence', title: 'AI VP Market Intelligence', route: '/ai-agent/executive-strategy/vp-market-intelligence', color: '#6366F1', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-mergers-acquisitions', uid: 'ktx-32-vp-mergers-acquisitions', title: 'AI VP Mergers & Acquisitions', route: '/ai-agent/executive-strategy/vp-mergers-acquisitions', color: '#6366F1', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-portfolio-management', uid: 'ktx-32-vp-portfolio-management', title: 'AI VP Portfolio Management', route: '/ai-agent/executive-strategy/vp-portfolio-management', color: '#6366F1', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-risk-management', uid: 'ktx-32-vp-risk-management', title: 'AI VP Risk Management', route: '/ai-agent/executive-strategy/vp-risk-management', color: '#6366F1', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-vp-strategic-operations', uid: 'ktx-32-vp-strategic-operations', title: 'AI VP Strategic Operations', route: '/ai-agent/executive-strategy/vp-strategic-operations', color: '#6366F1', level: 'vp_director', efficiency: '86%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Executive & Strategy - AI Agents</Text>
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
