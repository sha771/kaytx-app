 
import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { UserCheck, Target, Zap, TrendingUp, BarChart3, Users, MessageSquare, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AISalesRepScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-sales-rep')!;

  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'sales-revenue' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'sales-revenue', limit: 10 });
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

  const leads = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        name: a.details?.customerName || 'Lead Prospect',
        company: a.details?.company || 'Enterprise Corp',
        score: a.details?.confidence || 85,
        status: a.status === 'success' ? 'Replied' : 'Opened',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }
    return [
      { name: 'Sarah Connor', company: 'Skynet Inc', score: 98, status: 'Meeting Booked', time: '2h ago' },
      { name: 'John Doe', company: 'Acme Corp', score: 85, status: 'Replied', time: '4h ago' },
      { name: 'Jane Smith', company: 'TechGlobal', score: 72, status: 'Opened', time: '1d ago' }
    ];
  }, [activityData]);

  const renderProspectingTab = (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#34C759', '#28a745']} style={styles.metricCard}>
            <Target size={20} color="#fff" />
            <Text style={styles.metricValue}>{statsData?.tasksToday || 850}</Text>
            <Text style={styles.metricLabel}>Total Outreach</Text>
          </LinearGradient>
          <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
            <MessageSquare size={20} color="#fff" />
            <Text style={styles.metricValue}>{statsData?.avgSuccessRate ? `${statsData.avgSuccessRate}%` : '12%'}</Text>
            <Text style={styles.metricLabel}>Reply Rate</Text>
          </LinearGradient>
          <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>{statsData?.activeConnections || 45}</Text>
            <Text style={styles.metricLabel}>Meetings Booked</Text>
          </LinearGradient>
          <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.metricValue}>$125K</Text>
            <Text style={styles.metricLabel}>Pipe Created</Text>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>High Intent Leads</Text>
            <Zap size={18} color="#FFCC00" />
          </View>
          {leads.map((l: { score: number; name: string; company: string; time: string; status: string }, i: number) => (
            <View key={i} style={styles.leadRow}>
              <View style={[styles.scoreBadge, { backgroundColor: l.score > 90 ? '#34C75920' : '#FF950020' }]}>
                <Text style={[styles.scoreText, { color: l.score > 90 ? '#34C759' : '#FF9500' }]}>{l.score}</Text>
              </View>
              <View style={styles.leadInfo}>
                <Text style={[styles.leadName, { color: theme.colors.text }]}>{l.name}</Text>
                <Text style={[styles.leadMeta, { color: theme.colors.secondaryText }]}>{l.company} • {l.time}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                <Text style={[styles.statusText, { color: theme.colors.primary }]}>{l.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Sales Rep agent is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'prospecting', label: 'Prospecting', icon: UserCheck, component: renderProspectingTab },
    { id: 'pipeline', label: 'Pipeline', icon: BarChart3, component: <View /> },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  leadRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  scoreBadge: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  scoreText: { fontSize: 14, fontWeight: '800' },
  leadInfo: { flex: 1 },
  leadName: { fontSize: 15, fontWeight: '600' },
  leadMeta: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
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
