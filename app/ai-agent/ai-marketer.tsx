import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Globe, PenTool, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AIMarketerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-marketer')!;

  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'marketing-growth' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'marketing-growth', limit: 10 });
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
  
  const contentSchedule = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        title: a.action || 'Marketing Content',
        channel: a.details?.channel || 'Social',
        status: a.status === 'success' ? 'Published' : a.status === 'processing' ? 'Scheduled' : 'Drafting',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }
    return [
      { title: 'The Future of AI', channel: 'Blog', status: 'Published', time: '2h ago' },
      { title: 'Product Hunt Launch', channel: 'Social', status: 'Scheduled', time: 'Tomorrow' },
      { title: 'Customer Stories', channel: 'Email', status: 'Drafting', time: 'In Progress' },
    ];
  }, [activityData]);

  const renderContentTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.statsRow, { marginBottom: 20 }]}>
          <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statVal, { color: theme.colors.primary }]}>{statsData?.tasksToday || 214}</Text>
            <Text style={styles.statLab}>Posts</Text>
          </View>
          <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statVal, { color: '#34C759' }]}>3.2M</Text>
            <Text style={styles.statLab}>Reach</Text>
          </View>
          <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statVal, { color: '#FF2D55' }]}>{statsData?.avgSuccessRate ? `${(statsData.avgSuccessRate / 20).toFixed(1)}%` : '4.8%'}</Text>
            <Text style={styles.statLab}>Eng.</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Content Schedule</Text>
        {contentSchedule.map((item: any, i: number) => (
          <View key={i} style={[styles.contCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.contLeft}>
              <Text style={[styles.contTitle, { color: theme.colors.text }]}>{item.title}</Text>
              <Text style={[styles.contMeta, { color: theme.colors.secondaryText }]}>{item.channel} • {item.time}</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: item.status === 'Published' ? '#34C75915' : 'rgba(150,150,150,0.1)' }]}>
              <Text style={[styles.pillText, { color: item.status === 'Published' ? '#34C759' : theme.colors.text }]}>{item.status}</Text>
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
              The AI Marketer is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'content', label: 'Content Ops', icon: Globe, component: renderContentTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  statLab: { fontSize: 11, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  contCard: { padding: 18, borderRadius: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contLeft: { flex: 1 },
  contTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  contMeta: { fontSize: 12 },
  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  pillText: { fontSize: 10, fontWeight: '800' },
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
