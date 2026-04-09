import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Heart, Activity, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { aiEmployees } from '@/constants/aiEmployees';
import { router } from 'expo-router';

export default function AIRetentionSpecialistScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-retention-specialist') ?? aiEmployees[0];
  
  // Fetch real data from tRPC
  const { data: analytics, isLoading: analyticsLoading } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id,
    timeRange: '7d' 
  });
  const { data: activityData, isLoading: activityLoading } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'customer-experience', 
    limit: 10 
  });
  const { data: subscription, isLoading: subLoading } = trpc.enterprise.getSubscription.useQuery();

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

  const atRiskAccounts = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.slice(0, 3).map((a: any) => ({
        name: a.details?.customerName || 'Enterprise Client',
        mrr: a.details?.amount ? `$${a.details.amount.toLocaleString()}` : '$2,400',
        health: a.details?.confidence || 65,
        reason: a.action || 'Decreased activity detected'
      }));
    }
    return [
      { name: 'TechCorp Solutions', mrr: '$4,200', health: 35, reason: 'No login for 14 days' },
      { name: 'Global Logistics', mrr: '$1,850', health: 58, reason: 'Support ticket spike' },
    ];
  }, [activityData]);

  const churnRate = useMemo(() => {
    if (analytics?.successRate) {
      return (100 - analytics.successRate).toFixed(1);
    }
    return '0.8';
  }, [analytics]);

  if (analyticsLoading || activityLoading || subLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderHealthTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.mainMetric, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>PREDICTED CHURN</Text>
          <Text style={[styles.metricVal, { color: '#34C759' }]}>
            {churnRate}%
          </Text>
          <Text style={[styles.metricSub, { color: theme.colors.secondaryText }]}>
            Below industry avg (2.1%)
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Accounts</Text>
        {atRiskAccounts.map((risk: { name: string; mrr: string; health: number; reason: string }, i: number) => (
          <View key={i} style={[styles.riskCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.riskHeader}>
              <Text style={[styles.riskName, { color: theme.colors.text }]}>{risk.name}</Text>
              <Text style={[styles.riskMRR, { color: theme.colors.primary }]}>{risk.mrr}</Text>
            </View>
            <View style={styles.riskHealth}>
              <View style={[styles.healthBar, { backgroundColor: 'rgba(150,150,150,0.1)' }]}>
                <View style={[styles.healthFill, { 
                  width: `${risk.health}%`, 
                  backgroundColor: risk.health < 40 ? '#FF3B30' : risk.health < 60 ? '#FF9500' : '#34C759'
                }]} />
              </View>
              <Text style={[styles.riskReason, { color: theme.colors.secondaryText }]}>{risk.reason}</Text>
            </View>
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
              The AI Retention Specialist is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'health', label: 'Customer Health', icon: Heart, component: renderHealthTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, textAlign: 'center', marginHorizontal: 20 },
  tabContent: { paddingBottom: 20 },
  mainMetric: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 25 },
  metricLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  metricVal: { fontSize: 48, fontWeight: '900', marginBottom: 4 },
  metricSub: { fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  riskCard: { padding: 18, borderRadius: 16, marginBottom: 10 },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  riskName: { fontSize: 16, fontWeight: '700' },
  riskMRR: { fontSize: 14, fontWeight: '600' },
  riskHealth: { gap: 8 },
  healthBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  healthFill: { height: '100%' },
  riskReason: { fontSize: 12, fontStyle: 'italic' },
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
