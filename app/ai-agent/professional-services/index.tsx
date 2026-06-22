import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-chief-professional-services-officer', uid: 'ktx-25-chief-professional-services-officer', title: 'AI Chief Professional Services Officer', route: '/ai-agent/professional-services/chief-professional-services-officer', color: '#9333EA', level: 'c_level', efficiency: '82%' },
  { id: 'ai-vp-client-services', uid: 'ktx-25-vp-client-services', title: 'AI VP Client Services', route: '/ai-agent/professional-services/vp-client-services', color: '#9333EA', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-consulting', uid: 'ktx-25-vp-consulting', title: 'AI VP Consulting', route: '/ai-agent/professional-services/vp-consulting', color: '#9333EA', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-project-delivery', uid: 'ktx-25-vp-project-delivery', title: 'AI VP Project Delivery', route: '/ai-agent/professional-services/vp-project-delivery', color: '#9333EA', level: 'vp_director', efficiency: '80%' },
  { id: 'ai-vp-service-operations', uid: 'ktx-25-vp-service-operations', title: 'AI VP Service Operations', route: '/ai-agent/professional-services/vp-service-operations', color: '#9333EA', level: 'vp_director', efficiency: '83%' },
  { id: 'ai-consulting-manager', uid: 'ktx-25-consulting-manager', title: 'AI Consulting Manager', route: '/ai-agent/professional-services/consulting-manager', color: '#9333EA', level: 'manager', efficiency: '86%' },
  { id: 'ai-service-delivery-manager', uid: 'ktx-25-service-delivery-manager', title: 'AI Service Delivery Manager', route: '/ai-agent/professional-services/service-delivery-manager', color: '#9333EA', level: 'manager', efficiency: '84%' },
  { id: 'ai-project-manager-prof', uid: 'ktx-25-project-manager-prof', title: 'AI Project Manager (Prof)', route: '/ai-agent/professional-services/project-manager-prof', color: '#9333EA', level: 'manager', efficiency: '87%' },
  { id: 'ai-client-success-manager', uid: 'ktx-25-client-success-manager', title: 'AI Client Success Manager', route: '/ai-agent/professional-services/client-success-manager', color: '#9333EA', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-business-consultant', uid: 'ktx-25-business-consultant', title: 'AI Business Consultant', route: '/ai-agent/professional-services/business-consultant', color: '#9333EA', level: 'team_lead', efficiency: '85%' },
  { id: 'ai-consulting-integration-specialist', uid: 'ktx-25-consulting-integration-specialist', title: 'AI Consulting Integration Specialist', route: '/ai-agent/professional-services/consulting-integration-specialist', color: '#9333EA', level: 'team_lead', efficiency: '90%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Professional Services - AI Agents</Text>
      <Text style={s.sub}>120 AI Agents & Employees</Text>
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
