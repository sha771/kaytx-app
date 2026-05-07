import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Zap, Target, TrendingUp, ChartBarBig, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICampaignOptimizerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-campaign-optimizer')!;

  // Bridge to unified trpc analytics
  const { data: analytics, isLoading: analyticsLoading } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id 
  });
  const { data: activityData, isLoading: activityLoading } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'marketing-growth', 
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

  const experiments = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        name: a.action || 'Experiment',
        status: a.status === 'success' ? 'Scaling' : 'Optimizing',
        confidence: a.details?.confidence ? `${a.details.confidence}%` : '92%'
      }));
    }
    return [
      { name: 'Headline A/B/C', status: 'Winning B', confidence: '98%' },
      { name: 'Creative Saturation', status: 'Cycling', confidence: 'Processing' },
      { name: 'Audience Lookalike', status: 'Scaling', confidence: '92%' },
    ];
  }, [activityData]);

  if (analyticsLoading || activityLoading || subLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading optimization data...</Text>
        </View>
      </View>
    );
  }

  const renderOptTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.headerCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Real-time Bid Adjustments</Text>
          <Text style={[styles.headerVal, { color: '#FFCC00' }]}>
            {analytics?.tasksCompleted ? (analytics.tasksCompleted * 12).toLocaleString() : '5,201'}
          </Text>
          <Text style={[styles.headerSub, { color: theme.colors.secondaryText }]}>Optimizations / Hour</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Experiments</Text>
        {experiments.map((exp: any, i: number) => (
          <View key={i} style={[styles.expCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.expHeader}>
              <Text style={[styles.expName, { color: theme.colors.text }]}>{exp.name}</Text>
              <View style={[styles.badge, { backgroundColor: '#FFCC0020' }]}>
                <Text style={[styles.badgeText, { color: '#FFCC00' }]}>{exp.confidence}</Text>
              </View>
            </View>
            <Text style={[styles.expStatus, { color: theme.colors.secondaryText }]}>{exp.status}</Text>
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
              The AI Campaign Optimizer is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'optimization', label: 'Optimization', icon: Zap, component: renderOptTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { paddingBottom: 20 },
  headerCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 25 },
  headerTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  headerVal: { fontSize: 40, fontWeight: '900', marginBottom: 4 },
  headerSub: { fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  expCard: { padding: 20, borderRadius: 20, marginBottom: 12 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  expName: { fontSize: 15, fontWeight: '700' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  expStatus: { fontSize: 13 },
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
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    marginTop: 16, 
    fontSize: 16 
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 32 
  },
  errorText: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 8 
  },
  errorSubtext: { 
    fontSize: 14, 
    textAlign: 'center' 
  }
});
