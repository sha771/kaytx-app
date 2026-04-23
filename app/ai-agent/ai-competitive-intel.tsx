 
import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Eye, Shield, Lock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICompetitiveIntelScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-competitive-intel')!;

  // Fetch real data from tRPC
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

  const marketMoves = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        entity: a.details?.company || 'Competitor',
        action: a.action || 'Market Move',
        details: a.details?.description || 'Detected strategic shift in product or pricing.',
        impact: a.status === 'success' ? 'High' : 'Medium'
      }));
    }
    return [
      { entity: 'GlobalTech', action: 'New Feature', details: 'Added AI Voice to enterprise plan.', impact: 'Medium' },
      { entity: 'StartScale', action: 'Funding', details: 'Raised Series B ($45M).', impact: 'High' },
      { entity: 'LegacyCorp', action: 'Layoffs', details: 'Reducing sales staff by 10%.', impact: 'Low' },
    ];
  }, [activityData]);

  const renderMarketTab = (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        <View style={[styles.alertCard, { backgroundColor: '#FF3B3015', borderColor: '#FF3B3040', borderWidth: 1 }]}>
          <View style={styles.alertHeader}>
            <Shield size={18} color="#FF3B30" />
            <Text style={[styles.alertTitle, { color: '#FF3B30' }]}>Threat Detected</Text>
          </View>
          <Text style={[styles.alertText, { color: theme.colors.text }]}>
            Competitor {"'"}
            {marketMoves[0]?.entity}
            {"'"} performed a major {"'"}
            {marketMoves[0]?.action}
            {"'"}.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Market Moves</Text>
        {marketMoves.map((move: any, i: number) => (
          <View key={i} style={[styles.moveCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.moveHeader}>
              <Text style={[styles.moveEntity, { color: theme.colors.text }]}>{move.entity}</Text>
              <View style={[styles.impactBadge, { backgroundColor: move.impact === 'High' ? '#FF3B3015' : '#FF950015' }]}>
                <Text style={[styles.impactText, { color: move.impact === 'High' ? '#FF3B30' : '#FF9500' }]}>{move.impact}</Text>
              </View>
            </View>
            <Text style={[styles.moveAction, { color: theme.colors.primary }]}>{move.action}</Text>
            <Text style={[styles.moveDetails, { color: theme.colors.secondaryText }]}>{move.details}</Text>
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
              The Competitive Intelligence agent is part of our Enterprise suite. Upgrade your plan to activate this agent.
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
    { id: 'market', label: 'Surveillance', icon: Eye, component: renderMarketTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  alertCard: { padding: 16, borderRadius: 16, marginBottom: 25 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  alertTitle: { fontSize: 13, fontWeight: '800', textTransform: 'uppercase' },
  alertText: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  moveCard: { padding: 18, borderRadius: 16, marginBottom: 10 },
  moveHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  moveEntity: { fontSize: 15, fontWeight: '800' },
  impactBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  impactText: { fontSize: 10, fontWeight: '800' },
  moveAction: { fontSize: 12, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  moveDetails: { fontSize: 13 },
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
