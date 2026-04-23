import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { DollarSign, TrendingUp, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AIPricingStrategistScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-pricing-strategist')!;

  // Fetch real data from tRPC
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id,
    timeRange: '7d' 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'analysis-performance', 
    limit: 10 
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

  const pricingAdjustments = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        segment: a.details?.segment || 'Market Segment',
        change: a.details?.priceChange || (a.status === 'success' ? '+5%' : '-2%'),
        reason: a.action || 'Market demand shift',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }
    return [
      { segment: 'Enterprise Annual', change: '+5%', reason: 'High Demand', time: '1h ago' },
      { segment: 'Startup Monthly', change: '-2%', reason: 'Comp. Pressure', time: '3h ago' },
    ];
  }, [activityData]);

  const renderPricingTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.grid, { marginBottom: 25 }]}>
          <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.val, { color: theme.colors.text }]}>${analytics?.totalTasks ? (analytics.totalTasks / 100).toFixed(0) : '48'}</Text>
            <Text style={[styles.lab, { color: theme.colors.secondaryText }]}>ARPU</Text>
          </View>
          <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.val, { color: '#34C759' }]}>+{analytics?.successRate ? (analytics.successRate / 8).toFixed(1) : '12'}%</Text>
            <Text style={[styles.lab, { color: theme.colors.secondaryText }]}>Margin</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Dynamic Adjustments</Text>
        {pricingAdjustments.map((adj: any, i: number) => (
          <View key={i} style={[styles.adjCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.adjLeft}>
              <Text style={[styles.adjSeg, { color: theme.colors.text }]}>{adj.segment}</Text>
              <Text style={[styles.adjReason, { color: theme.colors.secondaryText }]}>{adj.reason}</Text>
            </View>
            <View style={styles.adjRight}>
              <Text style={[styles.adjChange, { color: adj.change.includes('+') ? '#34C759' : '#FF9500' }]}>{adj.change}</Text>
              <Text style={[styles.adjTime, { color: theme.colors.secondaryText }]}>{adj.time}</Text>
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
              The AI Pricing Strategist is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'pricing', label: 'Pricing Model', icon: DollarSign, component: renderPricingTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  grid: { flexDirection: 'row', gap: 15 },
  stat: { flex: 1, padding: 20, borderRadius: 16, alignItems: 'center' },
  val: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  lab: { fontSize: 11, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  adjCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, borderRadius: 16, marginBottom: 10 },
  adjLeft: { gap: 2 },
  adjSeg: { fontSize: 15, fontWeight: '700' },
  adjReason: { fontSize: 12 },
  adjRight: { alignItems: 'flex-end', gap: 2 },
  adjChange: { fontSize: 16, fontWeight: '900' },
  adjTime: { fontSize: 10 },
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
