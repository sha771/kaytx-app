import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  ChartBar,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Zap,
  Target,
  Users,
  User,
  Award,
  ChevronRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  allSubAgents,
  agentCategories,
} from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

export default function AIAgentsAnalyticsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Calculate aggregate stats
  const totalTasksCompleted = allAgents.reduce((sum, agent) => sum + (agent.performance?.tasksCompleted || 0), 0);
  const avgSuccessRate = allAgents.reduce((sum, agent) => sum + (agent.performance?.successRate || 0), 0) / allAgents.length;
  const avgResponseTime = allAgents.reduce((sum, agent) => sum + (agent.performance?.averageResponseTime || 0), 0) / allAgents.length;
  const avgSatisfaction = allAgents.reduce((sum, agent) => sum + (agent.performance?.customerSatisfaction || 0), 0) / allAgents.length;
  const totalUptime = allAgents.filter(a => a.status === 'active').length / allAgents.length * 100;

  // Calculate cost savings
  const totalHumanCost = allAgents.reduce((sum, agent) => {
    const cost = parseInt(agent.humanCostEquivalent?.replace(/[^0-9]/g, '') || '0');
    return sum + cost;
  }, 0);
  const totalAICost = allAgents.reduce((sum, agent) => {
    const cost = parseInt(agent.aiCost?.replace(/[^0-9]/g, '') || '0');
    return sum + cost;
  }, 0);
  const totalSavings = totalHumanCost - totalAICost;
  const savingsPercentage = ((totalSavings / totalHumanCost) * 100).toFixed(0);

  // Category breakdown
  const categoryStats = agentCategories.map(cat => {
    const agentsInCategory = allSubAgents.filter(a => a.category === cat.id);
    const avgPerf = agentsInCategory.reduce((sum, a) => sum + (a.performance?.successRate || 0), 0) / (agentsInCategory.length || 1);
    return { ...cat, count: agentsInCategory.length, avgPerformance: avgPerf };
  }).sort((a, b) => b.avgPerformance - a.avgPerformance);

  // Top performing agents
  const topAgents = [...allAgents]
    .sort((a, b) => (b.performance?.successRate || 0) - (a.performance?.successRate || 0))
    .slice(0, 5);

  // Most active agents (by tasks completed)
  const mostActiveAgents = [...allAgents]
    .sort((a, b) => (b.performance?.tasksCompleted || 0) - (a.performance?.tasksCompleted || 0))
    .slice(0, 5);

  const periods = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <ChartBarBig size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>AI Agents Analytics</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[styles.periodTab, selectedPeriod === period.id && { backgroundColor: colors.primary }]}
              onPress={() => setSelectedPeriod(period.id as any)}
            >
              <Text style={[styles.periodText, { color: selectedPeriod === period.id ? '#fff' : colors.text }]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Cards */}
        <View style={styles.overviewGrid}>
          <Animated.View entering={FadeInUp} style={[styles.overviewCard, { backgroundColor: colors.primary + '15' }]}>
            <Target size={24} color={colors.primary} />
            <Text style={[styles.overviewNumber, { color: colors.primary }]}>{avgSuccessRate.toFixed(1)}%</Text>
            <Text style={[styles.overviewLabel, { color: colors.text + '60' }]}>Avg Success Rate</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(100)} style={[styles.overviewCard, { backgroundColor: '#10B981' + '15' }]}>
            <Activity size={24} color="#10B981" />
            <Text style={[styles.overviewNumber, { color: '#10B981' }]}>{avgResponseTime.toFixed(2)}s</Text>
            <Text style={[styles.overviewLabel, { color: colors.text + '60' }]}>Avg Response</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(200)} style={[styles.overviewCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <Award size={24} color="#8B5CF6" />
            <Text style={[styles.overviewNumber, { color: '#8B5CF6' }]}>{avgSatisfaction.toFixed(1)}</Text>
            <Text style={[styles.overviewLabel, { color: colors.text + '60' }]}>Avg Satisfaction</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(300)} style={[styles.overviewCard, { backgroundColor: '#F59E0B' + '15' }]}>
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.overviewNumber, { color: '#F59E0B' }]}>{totalUptime.toFixed(1)}%</Text>
            <Text style={[styles.overviewLabel, { color: colors.text + '60' }]}>Uptime</Text>
          </Animated.View>
        </View>

        {/* Cost Savings Card */}
        <Animated.View entering={FadeInRight} style={[styles.savingsCard, { backgroundColor: '#10B981' }]}>
          <View style={styles.savingsHeader}>
            <TrendingUp size={28} color="#fff" />
            <Text style={styles.savingsTitle}>Cost Savings</Text>
          </View>
          <View style={styles.savingsRow}>
            <View style={styles.savingsItem}>
              <Text style={styles.savingsValue}>${(totalSavings / 1000).toFixed(0)}K</Text>
              <Text style={styles.savingsLabel}>Saved Annually</Text>
            </View>
            <View style={styles.savingsDivider} />
            <View style={styles.savingsItem}>
              <Text style={styles.savingsValue}>{savingsPercentage}%</Text>
              <Text style={styles.savingsLabel}>Reduction</Text>
            </View>
            <View style={styles.savingsDivider} />
            <View style={styles.savingsItem}>
              <Text style={styles.savingsValue}>${(totalHumanCost / totalAICost).toFixed(0)}x</Text>
              <Text style={styles.savingsLabel}>ROI</Text>
            </View>
          </View>
        </Animated.View>

        {/* Tasks Completed */}
        <Animated.View entering={FadeInRight.delay(100)} style={[styles.tasksCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.tasksHeader}>
            <User size={24} color={colors.primary} />
            <Text style={[styles.tasksTitle, { color: colors.text }]}>Tasks Completed</Text>
          </View>
          <Text style={[styles.tasksNumber, { color: colors.primary }]}>{totalTasksCompleted.toLocaleString()}</Text>
          <Text style={[styles.tasksSubtitle, { color: colors.text + '60' }]}>Total tasks across all agents</Text>
        </Animated.View>

        {/* Category Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Performance</Text>
          {categoryStats.map((cat, index) => (
            <Animated.View entering={FadeInUp.delay(index * 50)} key={cat.id} style={[styles.categoryRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={20} color={cat.color} />
              </View>
              <View style={styles.categoryDetails}>
                <Text style={[styles.categoryName, { color: colors.text }]}>{cat.label}</Text>
                <Text style={[styles.categoryCount, { color: colors.text + '60' }]}>{cat.count} agents</Text>
              </View>
              <View style={styles.performanceBar}>
                <View style={[styles.performanceFill, { width: `${cat.avgPerformance}%`, backgroundColor: cat.color }]} />
              </View>
              <Text style={[styles.performanceText, { color: cat.color }]}>{cat.avgPerformance.toFixed(1)}%</Text>
            </Animated.View>
          ))}
        </View>

        {/* Top Performing Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Performing Agents</Text>
          {topAgents.map((agent, index) => (
            <TouchableOpacity
              key={agent.id}
              style={[styles.agentRow, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/ai-agent/agent-configuration?id=${agent.id}`)}
            >
              <View style={[styles.rankBadge, { backgroundColor: index < 3 ? '#FFD700' : colors.border }]}>
                <Text style={[styles.rankText, { color: index < 3 ? '#000' : colors.text }]}>{index + 1}</Text>
              </View>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                <agent.icon size={20} color={agent.color} />
              </View>
              <View style={styles.agentDetails}>
                <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentMeta, { color: colors.text + '60' }]}>{agent.performance?.successRate}% success rate</Text>
              </View>
              <ChevronRight size={18} color={colors.text + '40'} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Most Active Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Most Active Agents</Text>
          {mostActiveAgents.map((agent, index) => (
            <TouchableOpacity
              key={agent.id}
              style={[styles.agentRow, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(`/ai-agent/agent-configuration?id=${agent.id}`)}
            >
              <View style={[styles.activityBadge, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.activityText, { color: colors.primary }]}>#{index + 1}</Text>
              </View>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                <agent.icon size={20} color={agent.color} />
              </View>
              <View style={styles.agentDetails}>
                <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentMeta, { color: colors.text + '60' }]}>
                  {agent.performance?.tasksCompleted?.toLocaleString()} tasks
                </Text>
              </View>
              <ChevronRight size={18} color={colors.text + '40'} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  periodScroll: { paddingHorizontal: 16, marginTop: 8, marginBottom: 12 },
  periodTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  periodText: { fontSize: 14, fontWeight: '500' },
  content: { padding: 16 },
  overviewGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  overviewCard: { width: (width - 52) / 2, padding: 16, borderRadius: 12, alignItems: 'center' },
  overviewNumber: { fontSize: 24, fontWeight: '700', marginTop: 8 },
  overviewLabel: { fontSize: 12, marginTop: 4 },
  savingsCard: { padding: 20, borderRadius: 16, marginBottom: 16 },
  savingsHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  savingsTitle: { fontSize: 18, fontWeight: '600', color: '#fff' },
  savingsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  savingsItem: { alignItems: 'center' },
  savingsValue: { fontSize: 22, fontWeight: '700', color: '#fff' },
  savingsLabel: { fontSize: 12, color: '#fff', opacity: 0.8, marginTop: 4 },
  savingsDivider: { width: 1, backgroundColor: '#fff', opacity: 0.3 },
  tasksCard: { padding: 20, borderRadius: 16, borderWidth: 1, marginBottom: 16, alignItems: 'center' },
  tasksHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  tasksTitle: { fontSize: 16, fontWeight: '600' },
  tasksNumber: { fontSize: 36, fontWeight: '700' },
  tasksSubtitle: { fontSize: 14, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  categoryIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  categoryDetails: { flex: 1, marginLeft: 12 },
  categoryName: { fontSize: 14, fontWeight: '600' },
  categoryCount: { fontSize: 12, marginTop: 2 },
  performanceBar: { width: 60, height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, marginRight: 8 },
  performanceFill: { height: '100%', borderRadius: 3 },
  performanceText: { fontSize: 12, fontWeight: '600', width: 40 },
  agentRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  rankBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  rankText: { fontSize: 12, fontWeight: '700' },
  activityBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  activityText: { fontSize: 11, fontWeight: '600' },
  agentIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  agentDetails: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 14, fontWeight: '600' },
  agentMeta: { fontSize: 12, marginTop: 2 },
});
