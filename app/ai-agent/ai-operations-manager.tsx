import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Users, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { aiEmployees } from '@/constants/aiEmployees';
import { router } from 'expo-router';

export default function AIOperationsManagerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-operations-manager') ?? aiEmployees[0];
  
  // Fetch operations data from backend
  const { data: analytics, isLoading: analyticsLoading } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id,
    timeRange: '7d' 
  });
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'operations-management' });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isPremiumLocked = useMemo(() => {
    return agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter');
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  const operationsData = analytics as any;

  if (analyticsLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderWorkflowsTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Active Workflows</Text>
          {operationsData?.activeWorkflows?.map((wf: any, i: number) => (
            <View key={i} style={styles.workflowItem}>
              <Text style={[styles.wfName, { color: theme.colors.text }]}>{wf.name}</Text>
              <View style={styles.wfMeta}>
                <Text style={[styles.wfStatus, { 
                  color: wf.status === 'Running' ? '#34C759' : 
                         wf.status === 'Optimization' ? '#FF9500' : 
                         wf.status === 'Completed' ? '#007AFF' : theme.colors.secondaryText 
                }]}>{wf.status}</Text>
                <Text style={[styles.wfEfficiency, { color: theme.colors.primary }]}>{wf.efficiency}</Text>
              </View>
            </View>
          )) || [
            { name: 'Inventory Re-order', status: 'Running', efficiency: '98%' },
            { name: 'Vendor Sync', status: 'Optimization', efficiency: '94%' },
            { name: 'Shift Scheduling', status: 'Completed', efficiency: '100%' }
          ].map((wf, i) => (
            <View key={i} style={styles.workflowItem}>
              <Text style={[styles.wfName, { color: theme.colors.text }]}>{wf.name}</Text>
              <View style={styles.wfMeta}>
                <Text style={[styles.wfStatus, { 
                  color: wf.status === 'Running' ? '#34C759' : 
                         wf.status === 'Optimization' ? '#FF9500' : 
                         wf.status === 'Completed' ? '#007AFF' : theme.colors.secondaryText 
                }]}>{wf.status}</Text>
                <Text style={[styles.wfEfficiency, { color: theme.colors.primary }]}>{wf.efficiency}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Operations Manager is part of our Enterprise suite. Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity 
              style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [
    { id: 'workflows', label: 'Workflows', icon: Users, component: renderWorkflowsTab }
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, textAlign: 'center', marginHorizontal: 20 },
  tabContent: { paddingBottom: 20 },
  card: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  workflowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(150,150,150,0.1)' },
  wfName: { fontWeight: '700', fontSize: 14 },
  wfMeta: { alignItems: 'flex-end' },
  wfStatus: { fontSize: 12, marginBottom: 4 },
  wfEfficiency: { fontSize: 14, fontWeight: '700' },
  noDataText: { textAlign: 'center', fontStyle: 'italic' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
