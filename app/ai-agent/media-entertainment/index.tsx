import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-cmeo', uid: 'ktx-26-cmeo', title: 'AI Chief Media & Entertainment Officer', route: '/ai-agent/media-entertainment/cmeo', color: '#E11D48', level: 'c_level', efficiency: '85%' },
  { id: 'ai-vp-content-production', uid: 'ktx-26-vp-content-production', title: 'AI VP Content Production', route: '/ai-agent/media-entertainment/vp-content-production', color: '#E11D48', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-creative-services', uid: 'ktx-26-vp-creative-services', title: 'AI VP Creative Services', route: '/ai-agent/media-entertainment/vp-creative-services', color: '#E11D48', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-digital-media', uid: 'ktx-26-vp-digital-media', title: 'AI VP Digital Media', route: '/ai-agent/media-entertainment/vp-digital-media', color: '#E11D48', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-media-operations', uid: 'ktx-26-vp-media-operations', title: 'AI VP Media Operations', route: '/ai-agent/media-entertainment/vp-media-operations', color: '#E11D48', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-content-director', uid: 'ktx-26-content-director', title: 'AI Content Director', route: '/ai-agent/media-entertainment/content-director', color: '#E11D48', level: 'manager', efficiency: '86%' },
  { id: 'ai-creative-director', uid: 'ktx-26-creative-director', title: 'AI Creative Director', route: '/ai-agent/media-entertainment/creative-director', color: '#E11D48', level: 'manager', efficiency: '88%' },
  { id: 'ai-media-manager', uid: 'ktx-26-media-manager', title: 'AI Media Manager', route: '/ai-agent/media-entertainment/media-manager', color: '#E11D48', level: 'manager', efficiency: '85%' },
  { id: 'ai-production-manager', uid: 'ktx-26-production-manager', title: 'AI Production Manager', route: '/ai-agent/media-entertainment/production-manager', color: '#E11D48', level: 'manager', efficiency: '87%' },
  { id: 'ai-content-strategist', uid: 'ktx-26-content-strategist', title: 'AI Content Strategist', route: '/ai-agent/media-entertainment/content-strategist', color: '#E11D48', level: 'manager', efficiency: '86%' },
  { id: 'ai-media-coordinator', uid: 'ktx-26-media-coordinator', title: 'AI Media Coordinator', route: '/ai-agent/media-entertainment/media-coordinator', color: '#E11D48', level: 'manager', efficiency: '84%' },
  { id: 'ai-digital-media-specialist', uid: 'ktx-26-digital-media-specialist', title: 'AI Digital Media Specialist', route: '/ai-agent/media-entertainment/digital-media-specialist', color: '#E11D48', level: 'manager', efficiency: '85%' },
  { id: 'ai-vp-distribution', uid: 'ktx-26-vp-distribution', title: 'AI VP Distribution', route: '/ai-agent/media-entertainment/vp-distribution', color: '#E11D48', level: 'vp_director', efficiency: '86%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Media & Entertainment - AI Agents</Text>
      <Text style={s.sub}>48 AI Agents & Employees</Text>
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
