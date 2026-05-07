import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { AlertTriangle, CheckCircle, Clock, BarChart3, Lock, Sparkles, TrendingUp, Shield, Brain, Activity } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIChurnPredictorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-churn-predictor')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { predictions: 640, accuracy: '94.2%', highRisk: 34, saved: 142 };
  const riskFactors = [
    { factor: 'Declining login frequency', weight: '28%', impact: 'high' },
    { factor: 'Support ticket sentiment', weight: '22%', impact: 'high' },
    { factor: 'Feature adoption drop', weight: '18%', impact: 'medium' },
    { factor: 'Contract renewal proximity', weight: '15%', impact: 'medium' },
    { factor: 'Payment delays', weight: '12%', impact: 'high' },
  ];
  const predictions = [
    { account: 'TechCorp Industries', risk: 92, arr: '$240K', daysToChurn: '7 days', status: 'intervention' },
    { account: 'CloudSync Ltd', risk: 78, arr: '$84K', daysToChurn: '14 days', status: 'monitoring' },
    { account: 'DataFlow Inc', risk: 71, arr: '$56K', daysToChurn: '21 days', status: 'monitoring' },
  ];

  const renderChurnTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Brain size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.predictions}</Text><Text style={styles.metricLabel}>Predictions</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.accuracy}</Text><Text style={styles.metricLabel}>Accuracy</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.highRisk}</Text><Text style={styles.metricLabel}>High Risk</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.saved}</Text><Text style={styles.metricLabel}>Saved</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Factors</Text></View></View>
          <View style={styles.factorList}>
            {riskFactors.map((f) => (
              <View key={f.factor} style={styles.factorCard}>
                <View style={styles.factorHeader}><Text style={[styles.factorName, { color: theme.colors.text }]}>{f.factor}</Text><Text style={[styles.factorWeight, { color: theme.colors.secondaryText }]}>{f.weight}</Text></View>
                <View style={styles.factorBarContainer}><View style={[styles.factorBar, { width: f.weight, backgroundColor: f.impact === 'high' ? '#EF4444' : '#F59E0B' } as any]} /></View>
                <Text style={[styles.factorImpact, { color: f.impact === 'high' ? '#EF4444' : '#F59E0B' }]}>{f.impact} impact</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Predictions</Text></View></View>
          <View style={styles.predList}>
            {predictions.map((p) => (
              <View key={p.account} style={styles.predCard}>
                <View style={styles.predHeader}>
                  <View style={styles.predLeft}><Text style={[styles.predAccount, { color: theme.colors.text }]}>{p.account}</Text><Text style={[styles.predArr, { color: theme.colors.secondaryText }]}>{p.arr} ARR</Text></View>
                  <View style={[styles.predBadge, { backgroundColor: p.risk > 80 ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.predBadgeText, { color: p.risk > 80 ? '#EF4444' : '#F59E0B' }]}>{p.risk}%</Text></View>
                </View>
                <View style={styles.predFooter}>
                  <Text style={[styles.predDays, { color: '#EF4444' }]}>Risk: {p.daysToChurn}</Text>
                  <Text style={[styles.predStatus, { color: p.status === 'intervention' ? '#EF4444' : '#F59E0B' }]}>{p.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Churn Predictor.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'churn', label: 'Churn', icon: AlertTriangle, component: renderChurnTab() }];
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
  factorList: { gap: 14 }, factorCard: { marginBottom: 4 },
  factorHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  factorName: { fontSize: 14, fontWeight: '600' }, factorWeight: { fontSize: 12 },
  factorBarContainer: { height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  factorBar: { height: '100%', borderRadius: 3 },
  factorImpact: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  predList: { gap: 12 }, predCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  predHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  predLeft: { flex: 1 }, predAccount: { fontSize: 15, fontWeight: '700' },
  predArr: { fontSize: 12, marginTop: 2 },
  predBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  predBadgeText: { fontSize: 14, fontWeight: '700' },
  predFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  predDays: { fontSize: 13, fontWeight: '600' },
  predStatus: { fontSize: 13, fontWeight: '600', textTransform: 'capitalize' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
