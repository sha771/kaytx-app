import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { ArrowRight, CircleCheckBig } from 'lucide-react-native';

interface SubAgent {
  id: string;
  label: string;
}

interface SubAgentLinksProps {
  subAgents: SubAgent[];
  basePath?: string;
  color?: string;
}

export default function SubAgentLinks({ subAgents, basePath = '/ai-agent/realestate/sub-agents', color = '#33691E' }: SubAgentLinksProps) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Sub-Agents</Text>
      {subAgents.map((agent) => (
        <TouchableOpacity
          key={agent.id}
          onPress={() => router.push(`${basePath}/${agent.id}`)}
          style={[styles.card, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.iconWrap, { backgroundColor: color + '20' }]}>
            <CircleCheckBig size={18} color={color} />
          </View>
          <Text style={[styles.label, { color: theme.colors.text }]}>{agent.label}</Text>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  label: { flex: 1, fontSize: 14, fontWeight: '600' },
});
