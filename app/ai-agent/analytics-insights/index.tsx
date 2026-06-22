import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const agents = [
  // CORE ANALYTICS INTELLIGENCE (15 strategic agents)
  { id: 'analytics-intelligence-hub', uid: 'ktx-analytics-001', title: 'AI Analytics Intelligence Hub - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/analytics-intelligence-hub', color: '#0EA5E9', level: 'c_level', efficiency: '96%' },
  { id: 'data-analytics-engine', uid: 'ktx-analytics-002', title: 'AI Data Analytics Engine - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/data-analytics-engine', color: '#0EA5E9', level: 'vp_director', efficiency: '95%' },
  { id: 'business-intelligence-platform', uid: 'ktx-analytics-003', title: 'AI Business Intelligence Platform - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/business-intelligence-platform', color: '#0EA5E9', level: 'vp_director', efficiency: '94%' },
  { id: 'predictive-analytics-system', uid: 'ktx-analytics-004', title: 'AI Predictive Analytics System - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/predictive-analytics-system', color: '#0EA5E9', level: 'vp_director', efficiency: '95%' },
  { id: 'performance-metrics-hub', uid: 'ktx-analytics-005', title: 'AI Performance Metrics Hub - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/performance-metrics-hub', color: '#0EA5E9', level: 'vp_director', efficiency: '93%' },
  { id: 'reporting-automation-center', uid: 'ktx-analytics-006', title: 'AI Reporting Automation Center - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/reporting-automation-center', color: '#0EA5E9', level: 'vp_director', efficiency: '94%' },
  { id: 'insights-generation-engine', uid: 'ktx-analytics-007', title: 'AI Insights Generation Engine - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/insights-generation-engine', color: '#0EA5E9', level: 'vp_director', efficiency: '95%' },
  { id: 'data-warehouse-orchestrator', uid: 'ktx-analytics-008', title: 'AI Data Warehouse Orchestrator - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/data-warehouse-orchestrator', color: '#0EA5E9', level: 'vp_director', efficiency: '93%' },
  { id: 'real-time-analytics-platform', uid: 'ktx-analytics-009', title: 'AI Real-Time Analytics Platform - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/real-time-analytics-platform', color: '#0EA5E9', level: 'vp_director', efficiency: '94%' },
  { id: 'advanced-analytics-suite', uid: 'ktx-analytics-010', title: 'AI Advanced Analytics Suite - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/advanced-analytics-suite', color: '#0EA5E9', level: 'vp_director', efficiency: '95%' },
  { id: 'strategic-analytics-advisor', uid: 'ktx-analytics-011', title: 'AI Strategic Analytics Advisor - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/strategic-analytics-advisor', color: '#10B981', level: 'c_level', efficiency: '96%' },
  { id: 'data-governance-manager', uid: 'ktx-analytics-012', title: 'AI Data Governance Manager - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/data-governance-manager', color: '#10B981', level: 'vp_director', efficiency: '93%' },
  { id: 'analytics-operations-center', uid: 'ktx-analytics-013', title: 'AI Analytics Operations Center - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/analytics-operations-center', color: '#10B981', level: 'vp_director', efficiency: '94%' },
  { id: 'data-quality-assurance', uid: 'ktx-analytics-014', title: 'AI Data Quality Assurance - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/data-quality-assurance', color: '#10B981', level: 'vp_director', efficiency: '92%' },
  { id: 'analytics-security-guardian', uid: 'ktx-analytics-015', title: 'AI Analytics Security Guardian - Enterprise', route: '/ai-agent/analytics-insights/sub-agents/analytics-security-guardian', color: '#10B981', level: 'vp_director', efficiency: '93%' },
];

export default function AnalyticsInsightsIndex() {
  const router = useRouter();

  const navigateToSubAgents = () => {
    router.push('/ai-agent/analytics-insights/sub-agents');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics and Insights Department</Text>
        <Text style={styles.subtitle}>Enterprise AI-Powered Analytics Solutions</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strategic Analytics Agents</Text>
          <Text style={styles.sectionDescription}>15 Enterprise-level strategic analytics intelligence agents</Text>
          
          {agents.map((agent) => (
            <Pressable
              key={agent.id}
              style={[styles.card, { borderLeftColor: agent.color }]}
              onPress={() => router.push(agent.route)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.agentTitle}>{agent.title}</Text>
                <View style={styles.metadata}>
                  <Text style={[styles.level, { color: agent.color }]}>{agent.level}</Text>
                  <Text style={styles.efficiency}>{agent.efficiency} efficiency</Text>
                </View>
                <Text style={styles.uid}>UID: {agent.uid}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operational Sub-Agents</Text>
          <Text style={styles.sectionDescription}>105 Specialized operational analytics agents</Text>
          
          <Pressable
            style={[styles.card, styles.subAgentsCard, { borderLeftColor: '#6366F1' }]}
            onPress={navigateToSubAgents}
          >
            <View style={styles.cardContent}>
              <Text style={styles.agentTitle}>View All 105 Sub-Agents</Text>
              <Text style={styles.subAgentsDescription}>
                Data Analytics, Business Intelligence, Predictive Analytics, Performance Metrics, Reporting Automation, and Insights Generation
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Total Agents</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Strategic</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>105</Text>
            <Text style={styles.statLabel}>Operational</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
  },
  subAgentsCard: {
    borderLeftColor: '#6366F1',
  },
  cardContent: {
    flex: 1,
  },
  agentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metadata: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  level: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  efficiency: {
    fontSize: 12,
    color: '#94A3B8',
  },
  uid: {
    fontSize: 12,
    color: '#64748B',
  },
  subAgentsDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0EA5E9',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
});
