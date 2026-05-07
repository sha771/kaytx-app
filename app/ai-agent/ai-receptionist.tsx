import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Phone, Users, Clock, CircleCheck, CircleAlert, ChartBarBig, Settings, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIReceptionistScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-receptionist')!;
  
  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'customer-experience' 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'customer-experience',
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

  const callMetrics = useMemo(() => {
    if (!statsData) return { totalCalls: 0, completedCalls: 0, avgDuration: '0:00', missedCalls: 0 };
    return {
      totalCalls: statsData.tasksToday,
      completedCalls: Math.round(statsData.tasksToday * (statsData.avgSuccessRate / 100)),
      avgDuration: '2m 14s', // Mocked duration as it's not in AgentStats
      missedCalls: Math.round(statsData.tasksToday * (1 - statsData.avgSuccessRate / 100)),
    };
  }, [statsData]);

  const activities = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        id: a.id,
        from: a.details?.customerName || 'Unknown',
        status: a.status === 'success' ? 'completed' : 'missed',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: a.details?.duration ? `${Math.floor(a.details.duration / 60)}m ${a.details.duration % 60}s` : '2m 14s',
      }));
    }
    return [];
  }, [activityData]);

  const renderDashboard = (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
            <Phone size={20} color="#fff" />
            <Text style={styles.metricValue}>{callMetrics?.totalCalls ?? 0}</Text>
            <Text style={styles.metricLabel}>Total Calls</Text>
          </LinearGradient>
          <LinearGradient colors={['#34C759', '#28a745']} style={styles.metricCard}>
            <CircleCheck size={20} color="#fff" />
            <Text style={styles.metricValue}>{callMetrics?.completedCalls ?? 0}</Text>
            <Text style={styles.metricLabel}>Resolved</Text>
          </LinearGradient>
          <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{callMetrics?.avgDuration ?? '0:00'}</Text>
            <Text style={styles.metricLabel}>Avg Duration</Text>
          </LinearGradient>
          <LinearGradient colors={['#FF3B30', '#c82333']} style={styles.metricCard}>
            <CircleAlert size={20} color="#fff" />
            <Text style={styles.metricValue}>{callMetrics?.missedCalls ?? 0}</Text>
            <Text style={styles.metricLabel}>Missed</Text>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Call Stream</Text>
            <ChartBarBig size={18} color={theme.colors.primary} />
          </View>
          {activities.map((call: any) => (
            <View key={call.id} style={styles.callRow}>
              <View style={[styles.callStatus, { backgroundColor: call.status === 'completed' ? '#34C75920' : '#FF3B3020' }]}>
                <Phone size={14} color={call.status === 'completed' ? '#34C759' : '#FF3B30'} />
              </View>
              <View style={styles.callInfo}>
                <Text style={[styles.callFrom, { color: theme.colors.text }]}>{call.from}</Text>
                <Text style={[styles.callMeta, { color: theme.colors.secondaryText }]}>{call.time} • {call.duration}</Text>
              </View>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary + '15' }]}>
                <Text style={[styles.actionBtnText, { color: theme.colors.primary }]}>View</Text>
              </TouchableOpacity>
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
              The AI Receptionist is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarBig, component: renderDashboard },
    { id: 'settings', label: 'Voice Config', icon: Settings, component: <View /> },
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
  callRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  callStatus: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  callInfo: { flex: 1 },
  callFrom: { fontSize: 15, fontWeight: '600' },
  callMeta: { fontSize: 12, marginTop: 2 },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  actionBtnText: { fontSize: 12, fontWeight: '600' },
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
