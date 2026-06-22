import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const agents = [
  { id: 'ai-esports-director', uid: 'ktx-27-esports-director', title: 'AI Esports Director', route: '/ai-agent/gaming-esports/esports-director', color: '#EC4899', level: 'c_level', efficiency: '84%' },
  { id: 'ai-esports-marketing-manager', uid: 'ktx-27-esports-marketing-manager', title: 'AI Esports Marketing Manager', route: '/ai-agent/gaming-esports/esports-marketing-manager', color: '#EC4899', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-esports-operations-manager', uid: 'ktx-27-esports-operations-manager', title: 'AI Esports Operations Manager', route: '/ai-agent/gaming-esports/esports-operations-manager', color: '#EC4899', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-tournament-organizer', uid: 'ktx-27-tournament-organizer', title: 'AI Tournament Organizer', route: '/ai-agent/gaming-esports/tournament-organizer', color: '#EC4899', level: 'manager', efficiency: '85%' },
  { id: 'ai-game-producer', uid: 'ktx-27-game-producer', title: 'AI Game Producer', route: '/ai-agent/gaming-esports/game-producer', color: '#EC4899', level: 'manager', efficiency: '88%' },
  { id: 'ai-game-designer', uid: 'ktx-27-game-designer', title: 'AI Game Designer', route: '/ai-agent/gaming-esports/game-designer', color: '#EC4899', level: 'manager', efficiency: '87%' },
  { id: 'ai-community-manager', uid: 'ktx-27-community-manager', title: 'AI Community Manager', route: '/ai-agent/gaming-esports/community-manager', color: '#EC4899', level: 'team_lead', efficiency: '89%' },
  { id: 'ai-stream-coordinator', uid: 'ktx-27-stream-coordinator', title: 'AI Stream Coordinator', route: '/ai-agent/gaming-esports/stream-coordinator', color: '#EC4899', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-player-development-coach', uid: 'ktx-27-player-development-coach', title: 'AI Player Development Coach', route: '/ai-agent/gaming-esports/player-development-coach', color: '#EC4899', level: 'team_lead', efficiency: '86%' },
  { id: 'ai-esports-analyst', uid: 'ktx-27-esports-analyst', title: 'AI Esports Analyst', route: '/ai-agent/gaming-esports/esports-analyst', color: '#EC4899', level: 'team_lead', efficiency: '84%' },
];
export default function DepartmentIndex() {
  const router = useRouter();
  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Gaming & Esports - AI Agents</Text>
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
