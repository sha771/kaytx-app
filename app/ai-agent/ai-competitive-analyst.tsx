import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Search, Map, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICompetitiveAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-competitive-analyst')!;

  // Fetch real data from tRPC
  const { data: analytics, isLoading: analyticsLoading } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
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

  const winRate = useMemo(() => {
    return analytics?.successRate || 62;
  }, [analytics]);

  const renderBattleTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.battleCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Win/Loss Ratio</Text>
          <View style={styles.bar}>
            <View style={[styles.win, { backgroundColor: '#34C759', width: `${winRate}%` }]} />
            <View style={[styles.loss, { backgroundColor: '#FF3B30', width: `${100 - winRate}%` }]} />
          </View>
          <View style={styles.legend}>
            <Text style={[styles.legendText, { color: '#34C759' }]}>{winRate.toFixed(0)}% Wins</Text>
            <Text style={[styles.legendText, { color: '#FF3B30' }]}>{(100 - winRate).toFixed(0)}% Losses</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Battlecards</Text>
        {[
          { competitor: 'MegaCorp', weakness: 'Legacy Tech', strength: 'Brand Rec', tactic: 'Highlight Cloud Speed' },
          { competitor: 'QuickStart', weakness: 'Features', strength: 'Price', tactic: 'Emphasize ROI' },
        ].map((card, i) => (
          <View key={i} style={[styles.bCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.compName, { color: theme.colors.text }]}>{card.competitor}</Text>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>WEAKNESS</Text>
                <Text style={[styles.val, { color: theme.colors.text }]}>{card.weakness}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>TACTIC</Text>
                <Text style={[styles.val, { color: theme.colors.primary }]}>{card.tactic}</Text>
              </View>
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
              The AI Competitive Analyst is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'battle', label: 'Battlecards', icon: Map, component: renderBattleTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  battleCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 15 },
  bar: { height: 16, borderRadius: 8, flexDirection: 'row', overflow: 'hidden', marginBottom: 10 },
  win: { height: '100%' },
  loss: { height: '100%' },
  legend: { flexDirection: 'row', justifyContent: 'space-between' },
  legendText: { fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  bCard: { padding: 20, borderRadius: 20, marginBottom: 12 },
  compName: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 20 },
  gridItem: { flex: 1 },
  label: { fontSize: 10, fontWeight: '700', opacity: 0.5, marginBottom: 4 },
  val: { fontSize: 13, fontWeight: '600' },
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
