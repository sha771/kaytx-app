import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Palette, CheckCircle, Clock, BarChart3, Lock, Sparkles, Users, Target, Zap, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIPersonalizationEngineScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-personalization-engine')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { profilesEnriched: 8420, campaigns: 24, conversion: '18.4%', engagement: '+32%' };
  const rules = [
    { name: 'Onboarding Sequence', trigger: 'New user signup', action: 'Drip emails + tutorials', performance: '+45% activation' },
    { name: 'Re-engagement', trigger: '14 days inactive', action: 'Special offer email', performance: '+12% return' },
    { name: 'Upsell Opportunity', trigger: 'High usage detected', action: 'Show upgrade prompt', performance: '+28% conversion' },
    { name: 'Feature Discovery', trigger: 'Low feature adoption', action: 'In-app walkthrough', performance: '+35% feature use' },
  ];

  const renderPersonalizationTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Users size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.profilesEnriched.toLocaleString()}</Text><Text style={styles.metricLabel}>Profiles</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.campaigns}</Text><Text style={styles.metricLabel}>Active Rules</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.conversion}</Text><Text style={styles.metricLabel}>Conversion</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.engagement}</Text><Text style={styles.metricLabel}>Engagement</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Palette size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personalization Rules</Text></View></View>
          <View style={styles.ruleList}>
            {rules.map((r) => (
              <View key={r.name} style={styles.ruleCard}>
                <View style={styles.ruleHeader}><Text style={[styles.ruleName, { color: theme.colors.text }]}>{r.name}</Text><Text style={[styles.rulePerformance, { color: '#10B981' }]}>{r.performance}</Text></View>
                <Text style={[styles.ruleTrigger, { color: theme.colors.secondaryText }]}>Trigger: {r.trigger}</Text>
                <Text style={[styles.ruleAction, { color: theme.colors.secondaryText }]}>Action: {r.action}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.recList}>
            {[
              { msg: 'Upsell rule showing 28% conversion — expand to Growth tier', color: '#10B981' },
              { msg: 'Feature Discovery rule underperforming on mobile — investigate', color: '#F59E0B' },
              { msg: 'Add rule for power users: early access to beta features', color: '#3B82F6' },
            ].map((r, idx) => (
              <View key={idx} style={[styles.recCard, { borderLeftColor: r.color }]}><Text style={[styles.recText, { color: theme.colors.text }]}>{r.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Personalization Engine.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'personalization', label: 'Personalization', icon: Palette, component: renderPersonalizationTab() }];
  if (!agent) return <View style={styles.container}><Text style={{ color: theme.colors.text }}>Agent not found</Text></View>;
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  ruleList: { gap: 12 }, ruleCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  ruleName: { fontSize: 15, fontWeight: '700' }, rulePerformance: { fontSize: 12, fontWeight: '600' },
  ruleTrigger: { fontSize: 12, marginBottom: 2 }, ruleAction: { fontSize: 12 },
  recList: { gap: 12 }, recCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  recText: { fontSize: 13, lineHeight: 18 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
