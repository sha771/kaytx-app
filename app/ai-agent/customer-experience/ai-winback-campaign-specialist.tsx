import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { RefreshCw, CheckCircle, Clock, BarChart3, Lock, Sparkles, TrendingUp, Mail, MessageCircle, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIWinbackCampaignSpecialistScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-winback-campaign-specialist')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { active: 8, recovered: 24, success: '18.4%', revenue: '$186K' };
  const campaigns = [
    { name: 'We Miss You', channel: 'Email', sent: 142, opened: '42%', clicked: '18%', converted: 8 },
    { name: 'Special Offer', channel: 'Email+SMS', sent: 86, opened: '58%', clicked: '24%', converted: 12 },
    { name: 'Product Update', channel: 'In-app', sent: 240, seen: '72%', engaged: '34%', converted: 4 },
  ];
  const recovered = [
    { account: 'GlobalTech Solutions', campaign: 'Special Offer', arr: '$48K', daysInactive: 45 },
    { account: 'DataStream Inc', campaign: 'We Miss You', arr: '$32K', daysInactive: 62 },
    { account: 'CloudPeak', campaign: 'Product Update', arr: '$24K', daysInactive: 38 },
  ];

  const renderCampaignsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><RefreshCw size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.active}</Text><Text style={styles.metricLabel}>Active</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.recovered}</Text><Text style={styles.metricLabel}>Recovered</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.success}</Text><Text style={styles.metricLabel}>Success Rate</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.revenue}</Text><Text style={styles.metricLabel}>Recovered</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Mail size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Campaign Performance</Text></View></View>
          <View style={styles.campList}>
            {campaigns.map((c) => (
              <View key={c.name} style={styles.campCard}>
                <View style={styles.campHeader}><Text style={[styles.campName, { color: theme.colors.text }]}>{c.name}</Text><Text style={[styles.campChannel, { color: theme.colors.secondaryText }]}>{c.channel}</Text></View>
                <View style={styles.campMetrics}>
                  <Text style={[styles.campMetric, { color: theme.colors.text }]}>{c.sent} sent</Text>
                  <Text style={[styles.campMetric, { color: '#3B82F6' }]}>{c.opened} opened</Text>
                  <Text style={[styles.campMetric, { color: '#10B981' }]}>{c.converted} won</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><CheckCircle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recently Recovered</Text></View></View>
          <View style={styles.recList}>
            {recovered.map((r) => (
              <View key={r.account} style={styles.recCard}>
                <View style={styles.recHeader}><Text style={[styles.recAccount, { color: theme.colors.text }]}>{r.account}</Text><Text style={[styles.recArr, { color: '#10B981' }]}>{r.arr}</Text></View>
                <View style={styles.recFooter}>
                  <Text style={[styles.recCampaign, { color: theme.colors.secondaryText }]}>via {r.campaign}</Text>
                  <Text style={[styles.recInactive, { color: theme.colors.secondaryText }]}>{r.daysInactive}d inactive</Text>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Win-back Campaign Specialist.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'campaigns', label: 'Campaigns', icon: RefreshCw, component: renderCampaignsTab() }];
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
  campList: { gap: 12 }, campCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  campHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  campName: { fontSize: 15, fontWeight: '700' }, campChannel: { fontSize: 12 },
  campMetrics: { flexDirection: 'row', gap: 16 },
  campMetric: { fontSize: 13, fontWeight: '600' },
  recList: { gap: 12 }, recCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  recHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  recAccount: { fontSize: 15, fontWeight: '700' }, recArr: { fontSize: 15, fontWeight: '700' },
  recFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  recCampaign: { fontSize: 12 }, recInactive: { fontSize: 12 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
