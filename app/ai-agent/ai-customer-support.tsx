import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Headphones, CheckCircle, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICustomerSupportScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-customer-support')!;
  
  // Fetch real data from tRPC
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id,
    timeRange: '7d' 
  });
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ 
    agentId: agent.id,
    limit: 30 
  });
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

  const recentResolutions: { id: string; issue: string; time: string; status: string }[] = (activityData?.activities ?? []).slice(0, 4).map((a: any, idx: number) => ({
    id: `#${10000 + idx}`,
    issue: a.action || a.eventType || 'Support Task',
    time: a.timestamp ? new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—',
    status: a.status === 'error' ? 'Escalated' : 'Resolved',
  }));

  const renderTicketsTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Live Queue Metrics</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statVal, { color: theme.colors.primary }]}>{agent.roiMetrics.responseTime ?? '0s'}</Text>
              <Text style={styles.statLabel}>Wait Time</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statVal, { color: '#34C759' }]}>{typeof analytics?.successRate === 'number' ? analytics.successRate.toFixed(1) : '0'}%</Text>
              <Text style={styles.statLabel}>CSAT</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statVal, { color: theme.colors.text }]}>{typeof analytics?.tasksCompleted === 'number' ? analytics.tasksCompleted.toLocaleString() : '0'}</Text>
              <Text style={styles.statLabel}>Solved 24h</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.header, { color: theme.colors.text }]}>Recent Resolutions</Text>
        {recentResolutions.map((t, i) => (
          <View key={i} style={[styles.ticketCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.ticketLeft}>
              <CheckCircle size={14} color={t.status === 'Resolved' ? '#34C759' : '#FF9500'} />
              <View>
                <Text style={[styles.ticketId, { color: theme.colors.secondaryText }]}>{t.id}</Text>
                <Text style={[styles.ticketIssue, { color: theme.colors.text }]}>{t.issue}</Text>
              </View>
            </View>
            <Text style={[styles.ticketTime, { color: theme.colors.secondaryText }]}>{t.time}</Text>
          </View>
        ))}
      </View>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Customer Support agent is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'tickets', label: 'Tickets', icon: Headphones, component: renderTicketsTab }
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  card: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  statLabel: { fontSize: 12, opacity: 0.6 },
  header: { fontSize: 16, fontWeight: '800', marginBottom: 15 },
  ticketCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10 },
  ticketLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ticketId: { fontSize: 10, fontWeight: '700' },
  ticketIssue: { fontSize: 13, fontWeight: '600' },
  ticketTime: { fontSize: 11 },
  container: { flex: 1 },
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
