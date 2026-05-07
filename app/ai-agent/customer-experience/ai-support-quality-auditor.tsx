import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Shield, CheckCircle, Clock, BarChart3, Lock, Sparkles, Star, AlertTriangle, FileText, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AISupportQualityAuditorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-support-quality-auditor')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { auditsToday: 142, compliance: '96.8%', avgScore: '4.2/5', flagged: 6 };
  const qualityScores = [
    { category: 'Response Accuracy', score: 94, trend: '+2.1%' },
    { category: 'Tone & Empathy', score: 91, trend: '+1.8%' },
    { category: 'Resolution Quality', score: 88, trend: '-0.4%' },
    { category: 'SLA Compliance', score: 97, trend: '+0.5%' },
    { category: 'Knowledge Usage', score: 82, trend: '+3.2%' },
  ];
  const flaggedItems = [
    { agent: 'Bot-Chat-07', issue: 'Incorrect refund policy cited', severity: 'high', ticket: 'TK-4821' },
    { agent: 'Bot-Email-03', issue: 'Missed escalation trigger', severity: 'medium', ticket: 'TK-4818' },
    { agent: 'Bot-Chat-12', issue: 'Incomplete resolution', severity: 'medium', ticket: 'TK-4815' },
  ];

  const renderQualityTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.auditsToday}</Text><Text style={styles.metricLabel}>Audits Today</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.compliance}</Text><Text style={styles.metricLabel}>Compliance</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Star size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.avgScore}</Text><Text style={styles.metricLabel}>Avg Score</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.flagged}</Text><Text style={styles.metricLabel}>Flagged</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quality Scores</Text></View></View>
          <View style={styles.scoreList}>
            {qualityScores.map((s) => (
              <View key={s.category} style={styles.scoreCard}>
                <View style={styles.scoreHeader}><Text style={[styles.scoreCategory, { color: theme.colors.text }]}>{s.category}</Text><Text style={[styles.scoreTrend, { color: s.trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{s.trend}</Text></View>
                <View style={styles.scoreBarContainer}><View style={[styles.scoreBar, { width: s.score + '%', backgroundColor: s.score > 90 ? '#10B981' : s.score > 80 ? '#F59E0B' : '#EF4444' } as any]} /></View>
                <Text style={[styles.scoreValue, { color: theme.colors.text }]}>{s.score}/100</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Flagged Issues</Text></View></View>
          <View style={styles.flagList}>
            {flaggedItems.map((f) => (
              <View key={f.ticket} style={styles.flagCard}>
                <View style={styles.flagHeader}>
                  <View style={[styles.flagBadge, { backgroundColor: f.severity === 'high' ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.flagBadgeText, { color: f.severity === 'high' ? '#EF4444' : '#F59E0B' }]}>{f.severity}</Text></View>
                  <Text style={[styles.flagAgent, { color: theme.colors.text }]}>{f.agent}</Text>
                </View>
                <Text style={[styles.flagIssue, { color: theme.colors.secondaryText }]}>{f.issue}</Text>
                <Text style={[styles.flagTicket, { color: theme.colors.secondaryText }]}>{f.ticket}</Text>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Support Quality Auditor.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'quality', label: 'Quality', icon: Shield, component: renderQualityTab() }];
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
  scoreList: { gap: 14 }, scoreCard: { marginBottom: 4 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  scoreCategory: { fontSize: 14, fontWeight: '600' },
  scoreTrend: { fontSize: 12, fontWeight: '600' },
  scoreBarContainer: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden', marginBottom: 4 },
  scoreBar: { height: '100%', borderRadius: 4 },
  scoreValue: { fontSize: 12, fontWeight: '700' },
  flagList: { gap: 12 }, flagCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  flagHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  flagBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  flagBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  flagAgent: { fontSize: 14, fontWeight: '700' },
  flagIssue: { fontSize: 13, marginBottom: 4 },
  flagTicket: { fontSize: 12 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
