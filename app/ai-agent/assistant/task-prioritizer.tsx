import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ChevronLeft , User} from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { EnhancedAgentShell } from '@/components/ai-agent/EnhancedAgentShell';

const agent = {
  id: 'ai-task-prioritizer',
  name: 'AI Task Prioritizer',
  title: 'Task Priority Management AI',
  description: 'Prioritizes tasks, manages to-do lists, and optimizes productivity.',
  icon: User,
  color: '#F57C00',
  type: 'subagent' as const,
  category: 'ai-personal-assistant',
  parentCategory: 'ai-personal-assistant',
  capabilities: ['Task Prioritization', 'To-Do Management', 'Productivity Optimization'],
  performance: { tasksCompleted: 0, successRate: 0, averageResponseTime: 0, customerSatisfaction: 0, uptime: '99.9%' },
  humanCostEquivalent: '$0/year',
  aiCost: '$0/year',
  efficiency: '0x cost efficiency',
};

export default function AgentScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{agent.name}</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView style={styles.content}>
        <EnhancedAgentShell agent={agent} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  headerRight: { width: 40 },
  content: { flex: 1 },
});
