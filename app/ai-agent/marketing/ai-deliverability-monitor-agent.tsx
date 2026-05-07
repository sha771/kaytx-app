import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Shield, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Mail, CheckCircle, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-deliverability-monitor', name: 'AI Deliverability Monitor', title: 'Inbox Placement & Reputation',
  description: 'Monitors email deliverability across providers — tracking inbox placement, sender reputation, bounce rates, and authentication to ensure maximum reach.',
  capabilities: ['Inbox Placement', 'Sender Reputation', 'Bounce Management', 'Authentication (SPF/DKIM/DMARC)', 'Spam Score', 'Blacklist Monitoring', 'Warm-up Management', 'Provider Analytics'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-email-marketing-agent',
};

export default function AIDeliverabilityMonitorAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { inboxRate: '96.2%', bounceRate: '1.8%', spamRate: '0.3%', reputation: 'Excellent' };
  const authStatus = [
    { protocol: 'SPF', status: 'Valid', color: '#10B981' },
    { protocol: 'DKIM', status: 'Valid', color: '#10B981' },
    { protocol: 'DMARC', status: 'Valid', color: '#10B981' },
    { protocol: 'rDNS', status: 'Valid', color: '#10B981' },
  ];
  const providerPerformance = [
    { provider: 'Gmail', inbox: '97%', promo: '2%', spam: '1%', color: '#EA4335' },
    { provider: 'Outlook', inbox: '95%', promo: '3%', spam: '2%', color: '#0078D4' },
    { provider: 'Apple Mail', inbox: '98%', promo: '1%', spam: '1%', color: '#A2AAAD' },
    { provider: 'Yahoo', inbox: '94%', promo: '4%', spam: '2%', color: '#6001D2' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-email-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Email Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Mail size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.inboxRate}</Text><Text style={styles.metricLabel}>Inbox Rate</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.bounceRate}</Text><Text style={styles.metricLabel}>Bounce Rate</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.spamRate}</Text><Text style={styles.metricLabel}>Spam Rate</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.reputation}</Text><Text style={styles.metricLabel}>Reputation</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Shield size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Authentication Status</Text></View></View>
          <View style={styles.authList}>
            {authStatus.map((a) => (
              <View key={a.protocol} style={styles.authCard}>
                <Text style={[styles.authProtocol, { color: theme.colors.text }]}>{a.protocol}</Text>
                <View style={[styles.authBadge, { backgroundColor: a.color + '20' }]}><Text style={[styles.authStatus, { color: a.color }]}>{a.status}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Provider Performance</Text></View></View>
          <View style={styles.providerList}>
            {providerPerformance.map((p) => (
              <View key={p.provider} style={styles.providerCard}>
                <View style={styles.providerHeader}><View style={[styles.providerDot, { backgroundColor: p.color }]} /><Text style={[styles.providerName, { color: theme.colors.text }]}>{p.provider}</Text></View>
                <View style={styles.providerMetrics}><Text style={[styles.providerMetric, { color: '#10B981' }]}>Inbox: {p.inbox}</Text><Text style={[styles.providerMetric, { color: '#F59E0B' }]}>Promo: {p.promo}</Text><Text style={[styles.providerMetric, { color: '#EF4444' }]}>Spam: {p.spam}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Yahoo inbox placement improved 4% after DMARC policy tightening', color: '#10B981' },{ msg: 'Bounce rate trending down — list hygiene automation working', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Deliverability Monitor is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: Shield, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  authList: { gap: 10 }, authCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  authProtocol: { fontSize: 14, fontWeight: '600' }, authBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }, authStatus: { fontSize: 12, fontWeight: '600' },
  providerList: { gap: 12 }, providerCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  providerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }, providerDot: { width: 10, height: 10, borderRadius: 5 }, providerName: { fontSize: 14, fontWeight: '600' },
  providerMetrics: { flexDirection: 'row', gap: 12 }, providerMetric: { fontSize: 12, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
