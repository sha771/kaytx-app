import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-cao', uid: 'ktx-11-cao', title: 'AI CAO', route: '/ai-agent/admin/cao', color: '#6B7280', level: 'c_level', efficiency: '85%' },
  { id: 'ai-chief-administrative-officer', uid: 'ktx-11-chief-administrative-officer', title: 'AI Chief Administrative Officer', route: '/ai-agent/admin/chief-administrative-officer', color: '#6B7280', level: 'c_level', efficiency: '87%' },
  { id: 'ai-admin-director', uid: 'ktx-11-admin-director', title: 'AI Admin Director', route: '/ai-agent/admin/admin-director', color: '#6B7280', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-office-manager', uid: 'ktx-11-office-manager', title: 'AI Office Manager', route: '/ai-agent/admin/office-manager', color: '#6B7280', level: 'manager', efficiency: '82%' },
  { id: 'ai-admin-manager', uid: 'ktx-11-admin-manager', title: 'AI Admin Manager', route: '/ai-agent/admin/admin-manager', color: '#6B7280', level: 'manager', efficiency: '83%' },
  { id: 'ai-executive-assistant', uid: 'ktx-11-executive-assistant', title: 'AI Executive Assistant', route: '/ai-agent/admin/executive-assistant', color: '#6B7280', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-administrative-support-specialist', uid: 'ktx-11-administrative-support-specialist', title: 'AI Administrative Support Specialist', route: '/ai-agent/admin/administrative-support-specialist', color: '#6B7280', level: 'team_lead', efficiency: '90%' },
  { id: 'ai-executive-support-coordinator', uid: 'ktx-11-executive-support-coordinator', title: 'AI Executive Support Coordinator', route: '/ai-agent/admin/executive-support-coordinator', color: '#6B7280', level: 'team_lead', efficiency: '88%' },
  { id: 'ai-office-operations-specialist', uid: 'ktx-11-office-operations-specialist', title: 'AI Office Operations Specialist', route: '/ai-agent/admin/office-operations-specialist', color: '#6B7280', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-facilities-support-coordinator', uid: 'ktx-11-facilities-support-coordinator', title: 'AI Facilities Support Coordinator', route: '/ai-agent/admin/facilities-support-coordinator', color: '#6B7280', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-supply-chain-administrator', uid: 'ktx-11-supply-chain-administrator', title: 'AI Supply Chain Administrator', route: '/ai-agent/admin/supply-chain-administrator', color: '#6B7280', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-document-management-specialist', uid: 'ktx-11-document-management-specialist', title: 'AI Document Management Specialist', route: '/ai-agent/admin/document-management-specialist', color: '#6B7280', level: 'team_lead', efficiency: '92%' },
  { id: 'ai-process-administrator', uid: 'ktx-11-process-administrator', title: 'AI Process Administrator', route: '/ai-agent/admin/process-administrator', color: '#6B7280', level: 'team_lead', efficiency: '88%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Administrative - AI Agents</Text>
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
