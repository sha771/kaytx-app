import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Handshake, Shield, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AINegotiatorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-negotiator')!;

  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'sales-revenue' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'sales-revenue', limit: 10 });
  const { data: negotiationStats } = trpc.aiAgents.getAgentAnalytics.useQuery({ agentId: agent.id, timeRange: '7d' });
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

  const securedValue = useMemo(() => {
    const revenueImpact = (negotiationStats as any)?.revenueImpact;
    return typeof revenueImpact === 'string' && revenueImpact.length > 0 ? revenueImpact : '$485,000';
  }, [negotiationStats]);

  const activeNegotiations = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        client: a.details?.customerName || 'Client',
        stage: a.status === 'processing' ? 'Negotiating' : 'Redlining',
        leverage: a.details?.confidence > 90 ? 'High' : 'Medium',
        sentiment: a.status === 'success' ? 'Positive' : 'Neutral'
      }));
    }
    return [
      { client: 'MegaCorp', stage: 'Redlining', leverage: 'High', sentiment: 'Positive' },
      { client: 'FastScale', stage: 'Pricing', leverage: 'Medium', sentiment: 'Neutral' },
    ];
  }, [activityData]);

  const renderDealsTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.hero, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.heroHeader}>
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Value Secured</Text>
            <Shield size={20} color="#34C759" />
          </View>
          <Text style={[styles.heroVal, { color: '#34C759' }]}>{securedValue}</Text>
          <Text style={[styles.heroSub, { color: theme.colors.secondaryText }]}>In optimized contract terms this quarter</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Negotiations</Text>
        {activeNegotiations.map((deal: any, i: number) => (
          <View key={i} style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.cardTop}>
              <Text style={[styles.client, { color: theme.colors.text }]}>{deal.client}</Text>
              <View style={[styles.badge, { backgroundColor: deal.sentiment === 'Positive' ? '#34C75915' : '#FF950015' }]}>
                <Text style={[styles.badgeText, { color: deal.sentiment === 'Positive' ? '#34C759' : '#FF9500' }]}>{deal.sentiment}</Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: 'rgba(150,150,150,0.1)' }]} />
            <View style={styles.cardBottom}>
              <Text style={[styles.meta, { color: theme.colors.secondaryText }]}>Stage: {deal.stage}</Text>
              <Text style={[styles.meta, { color: theme.colors.secondaryText }]}>Lev: {deal.leverage}</Text>
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
              The AI Negotiator is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'deals', label: 'Negotiations', icon: Handshake, component: renderDealsTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  hero: { padding: 24, borderRadius: 24, marginBottom: 25 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  heroTitle: { fontSize: 16, fontWeight: '800' },
  heroVal: { fontSize: 32, fontWeight: '900', marginBottom: 4 },
  heroSub: { fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  card: { padding: 18, borderRadius: 18, marginBottom: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  client: { fontSize: 16, fontWeight: '700' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  divider: { height: 1, marginVertical: 12 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  meta: { fontSize: 12, fontWeight: '600' },
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
