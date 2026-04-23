import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Share2, MessageCircle, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AISocialMediaManagerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-social-media-manager')!;

  // Fetch real data from tRPC
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'marketing-growth', 
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

  const viralAlerts = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        topic: a.details?.topic || 'Trend',
        platform: a.details?.platform || 'Social',
        velocity: a.status === 'success' ? 'High' : 'Medium',
        mentions: a.details?.mentions ? `${a.details.mentions}/hr` : '120/hr'
      }));
    }
    return [
      { topic: 'New Launch', platform: 'Twitter', velocity: 'High', mentions: '450/hr' },
      { topic: 'Support Thread', platform: 'Reddit', velocity: 'Medium', mentions: '120/hr' },
    ];
  }, [activityData]);

  const renderSocialTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.engCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Social Sentiment</Text>
          <View style={styles.sentimentBar}>
            <View style={[styles.pos, { width: `${analytics?.successRate || 78}%`, backgroundColor: agent.color }]} />
          </View>
          <Text style={[styles.sentText, { color: theme.colors.secondaryText }]}>{analytics?.successRate || 78}% Positive mentions today</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Viral Alerts</Text>
        {viralAlerts.map((trend: { topic: string; platform: string; velocity: string; mentions: string }, i: number) => (
          <View key={i} style={[styles.trendRow, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.trendLeft}>
              <Text style={[styles.topic, { color: theme.colors.text }]}>#{trend.topic}</Text>
              <Text style={[styles.plat, { color: theme.colors.secondaryText }]}>{trend.platform}</Text>
            </View>
            <View style={styles.trendRight}>
              <Text style={[styles.vel, { color: trend.velocity === 'High' ? '#FF3B30' : '#FF9500' }]}>{trend.velocity}</Text>
              <Text style={[styles.men, { color: theme.colors.text }]}>{trend.mentions}</Text>
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
              The AI Social Media Manager is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'social', label: 'Social Grid', icon: Share2, component: renderSocialTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  engCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 15 },
  sentimentBar: { height: 10, backgroundColor: 'rgba(150,150,150,0.1)', borderRadius: 5, overflow: 'hidden', marginBottom: 10 },
  pos: { height: '100%' },
  sentText: { fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  trendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderRadius: 16, marginBottom: 10 },
  trendLeft: { gap: 2 },
  topic: { fontSize: 15, fontWeight: '800' },
  plat: { fontSize: 12 },
  trendRight: { alignItems: 'flex-end', gap: 2 },
  vel: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  men: { fontSize: 14, fontWeight: '600' },
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
