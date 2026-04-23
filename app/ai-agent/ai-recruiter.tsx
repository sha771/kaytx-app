import React, { useMemo, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { UserPlus, Users, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { aiEmployees } from '@/constants/aiEmployees';

export default function AIRecruiterScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-recruiter') ?? aiEmployees[0];
  
  // Fetch recruiting data from backend
  const { data: analytics, isLoading, error } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
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

  const recruitingData = analytics as any;

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Failed to load recruiting data
        </Text>
      </View>
    );
  }

  const renderHiringTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.pipeCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Talent Pipeline</Text>
          <View style={styles.pipeStats}>
            <View style={styles.pItem}>
              <Text style={[styles.pVal, { color: theme.colors.primary }]}>
                {recruitingData?.talentPipeline?.sourced || 48}
              </Text>
              <Text style={styles.pLab}>Sourced</Text>
            </View>
            <View style={styles.dash} />
            <View style={styles.pItem}>
              <Text style={[styles.pVal, { color: '#FF9500' }]}>
                {recruitingData?.talentPipeline?.interviews || 12}
              </Text>
              <Text style={styles.pLab}>Interview</Text>
            </View>
            <View style={styles.dash} />
            <View style={styles.pItem}>
              <Text style={[styles.pVal, { color: '#34C759' }]}>
                {recruitingData?.talentPipeline?.offers || 3}
              </Text>
              <Text style={styles.pLab}>Offers</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Candidates</Text>
        {recruitingData?.topCandidates?.map((cand: any, i: number) => (
          <View key={i} style={[styles.candCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.candHeader}>
              <Text style={[styles.candName, { color: theme.colors.text }]}>{cand.name}</Text>
              <Text style={[styles.candRole, { color: theme.colors.secondaryText }]}>{cand.role}</Text>
            </View>
            <View style={styles.candMatch}>
              <Text style={[styles.matchScore, { color: theme.colors.primary }]}>{cand.match}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
            <Text style={[styles.candStatus, { 
              color: cand.status === 'Final Round' ? '#34C759' : cand.status === 'Screening' ? '#FF9500' : theme.colors.secondaryText 
            }]}>{cand.status}</Text>
          </View>
        )) || [
          { name: 'Alex Rivera', role: 'Senior Engineer', match: 98, status: 'Final Round' },
          { name: 'Sarah Chen', role: 'Product Designer', match: 94, status: 'Screening' },
          { name: 'Marcus Bell', role: 'Sales Lead', match: 89, status: 'Sourced' }
        ].map((cand, i) => (
          <View key={i} style={[styles.candCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.candHeader}>
              <Text style={[styles.candName, { color: theme.colors.text }]}>{cand.name}</Text>
              <Text style={[styles.candRole, { color: theme.colors.secondaryText }]}>{cand.role}</Text>
            </View>
            <View style={styles.candMatch}>
              <Text style={[styles.matchScore, { color: theme.colors.primary }]}>{cand.match}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
            <Text style={[styles.candStatus, { 
              color: cand.status === 'Final Round' ? '#34C759' : cand.status === 'Screening' ? '#FF9500' : theme.colors.secondaryText 
            }]}>{cand.status}</Text>
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
              The AI Recruiter is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'hiring', label: 'Talent Pipeline', icon: UserPlus, component: renderHiringTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, textAlign: 'center' },
  tabContent: { paddingBottom: 20 },
  pipeCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  pipeStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pItem: { alignItems: 'center' },
  pVal: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  pLab: { fontSize: 11, fontWeight: '600', opacity: 0.6 },
  dash: { width: 20, height: 2, backgroundColor: 'rgba(150,150,150,0.2)' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  candCard: { padding: 18, borderRadius: 16, marginBottom: 10 },
  candHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  candInfo: { flex: 1 },
  candName: { fontSize: 15, fontWeight: '700' },
  candRole: { fontSize: 12 },
  candMatch: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 6 },
  matchScore: { fontSize: 18, fontWeight: '900' },
  matchLabel: { fontSize: 10, fontWeight: '800', opacity: 0.6 },
  noDataText: { textAlign: 'center', fontStyle: 'italic' },
  candStatus: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
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
