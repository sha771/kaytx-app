import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Settings, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { aiEmployees } from '@/constants/aiEmployees';
import { router } from 'expo-router';

export default function AIProductManagerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-product-manager') ?? aiEmployees[0];
  
  // Fetch product management data from backend
  const { data: analytics, isLoading: analyticsLoading, error } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
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

  const productData = analytics as any;

  if (analyticsLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const sprintProgress = (productData as any)?.sprintProgress as
    | { percentage?: number; sprintNumber?: number; completedTasks?: number; totalTasks?: number }
    | undefined;

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Failed to load product management data
        </Text>
      </View>
    );
  }

  const renderRoadmapTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Sprint Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${sprintProgress?.percentage || 68}%`, 
              backgroundColor: theme.colors.primary 
            }]} />
          </View>
          <View style={styles.sprintStats}>
            <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
              Sprint {sprintProgress?.sprintNumber || 42}
            </Text>
            <Text style={[styles.statText, { color: theme.colors.text }]}>
              {sprintProgress?.completedTasks || 12}/{sprintProgress?.totalTasks || 18}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feature Prioritization</Text>
        {[
          { name: 'Dark Mode V2', impact: 'High', effort: 'Low', score: 9.2 },
          { name: 'API Rate Limiting', impact: 'Medium', effort: 'Medium', score: 7.5 },
          { name: 'Legacy Export', impact: 'Low', effort: 'High', score: 4.1 },
        ].map((feat, i) => (
          <View key={i} style={[styles.featureCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.featLeft}>
              <Text style={[styles.featName, { color: theme.colors.text }]}>{feat.name}</Text>
              <Text style={[styles.featMeta, { color: theme.colors.secondaryText }]}>Impact: {feat.impact} • Effort: {feat.effort}</Text>
            </View>
            <View style={[styles.scoreBox, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.scoreVal, { color: theme.colors.primary }]}>{feat.score}</Text>
              <Text style={[styles.scoreLab, { color: theme.colors.secondaryText }]}>RICE</Text>
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
              The AI Product Manager is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'roadmap', label: 'Roadmap', icon: Settings, component: renderRoadmapTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, textAlign: 'center', marginHorizontal: 20 },
  tabContent: { paddingBottom: 20 },
  summaryCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 15 },
  progressBar: { height: 8, backgroundColor: 'rgba(150,150,150,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressFill: { height: '100%' },
  sprintStats: { flexDirection: 'row', justifyContent: 'space-between' },
  statText: { fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  featureCard: { padding: 18, borderRadius: 20, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featLeft: { flex: 1 },
  featName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  featMeta: { fontSize: 11 },
  scoreBox: { alignItems: 'center', padding: 10, borderRadius: 12 },
  scoreVal: { fontSize: 16, fontWeight: '900' },
  scoreLab: { fontSize: 9, fontWeight: '700', opacity: 0.6 },
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
