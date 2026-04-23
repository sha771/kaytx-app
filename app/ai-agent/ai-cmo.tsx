import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Megaphone, Brain, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICMOScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-cmo')!;
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 50 });
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'marketing-growth' });
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

  const campaigns: { name: string; channel: string; roi: string; status: string }[] = (activityData?.activities ?? []).slice(0, 3).map((a: any, idx: number) => ({
    name: a.action || `Campaign ${idx + 1}`,
    channel: a.details?.channel || a.details?.source || 'Multi-channel',
    roi: statsData?.avgSuccessRate ? (statsData.avgSuccessRate / 20).toFixed(1) : '—',
    status: a.status === 'success' ? 'SCALING' : a.status === 'processing' ? 'OPTIMIZING' : 'ACTIVE',
  }));

  const renderMarketingTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={styles.campaignList}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Autonomous Campaigns</Text>
          {campaigns.map((camp, i) => (
            <View key={i} style={[styles.campCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.campHeader}>
                <View style={styles.campInfo}>
                  <Text style={[styles.campName, { color: theme.colors.text }]}>{camp.name}</Text>
                  <Text style={[styles.campChannel, { color: theme.colors.secondaryText }]}>{camp.channel}</Text>
                </View>
                <View style={styles.roiBox}>
                  <Text style={[styles.roiVal, { color: '#34C759' }]}>{camp.roi}x</Text>
                  <Text style={styles.roiLab}>ROI</Text>
                </View>
              </View>
              <View style={styles.campFooter}>
                <View style={[styles.statusPoint, { backgroundColor: '#34C759' }]} />
                <Text style={[styles.statusText, { color: theme.colors.secondaryText }]}>{camp.status}</Text>
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
              The AI CMO is part of our Enterprise suite. Upgrade your plan to activate this agent.
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

  const renderMemoryTab = (
    <View style={styles.tabContent}>
      <View style={styles.memorySection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Marketing Memory & Context</Text>
        <View style={[styles.memoryCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Brain size={24} color={agent.color} style={{ marginBottom: 12 }} />
          <Text style={[styles.memoryTitle, { color: theme.colors.text }]}>Brand Consistency Engine</Text>
          <Text style={[styles.memoryDesc, { color: theme.colors.secondaryText }]}>
            Learned from 1,200+ previous interactions to maintain a consistent brand voice across all autonomous channels.
          </Text>
        </View>
        <View style={styles.memoryGrid}>
          {[
            { label: 'Customer Preferences', value: 'High' },
            { label: 'Market Sentiment', value: 'Positive' },
            { label: 'Competitor Moves', value: 'Monitored' },
            { label: 'Deal Context', value: 'Integrated' },
          ].map((item, i) => (
            <View key={i} style={[styles.smallMemoryCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.smallMemoryLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
              <Text style={[styles.smallMemoryValue, { color: theme.colors.text }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const customTabs = [
    { id: 'marketing', label: 'Campaign Engine', icon: Megaphone, component: renderMarketingTab },
    { id: 'memory', label: 'Memory & Context', icon: Brain, component: renderMemoryTab }
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 20 },
  campaignList: { gap: 12 },
  campCard: { padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 1 },
  campHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  campInfo: { flex: 1 },
  campName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  campChannel: { fontSize: 12, fontWeight: '600' },
  roiBox: { alignItems: 'flex-end' },
  roiVal: { fontSize: 20, fontWeight: '900' },
  roiLab: { fontSize: 9, fontWeight: '800', opacity: 0.5 },
  campFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.1)' },
  statusPoint: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  memorySection: { gap: 16 },
  memoryCard: { padding: 24, borderRadius: 24, marginBottom: 16 },
  memoryTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  memoryDesc: { fontSize: 13, lineHeight: 18 },
  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  smallMemoryCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 16, alignItems: 'center' },
  smallMemoryLabel: { fontSize: 10, fontWeight: '700', marginBottom: 4 },
  smallMemoryValue: { fontSize: 14, fontWeight: '800' },
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

