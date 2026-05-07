import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { Gift, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Activity, DollarSign, Percent, Star, Users, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIOfferOptimizerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-offer-optimizer')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const activeOffers = [
    { id: 'OFR-001', name: 'Loyalty Discount - 20%', target: 'Acme Corp', type: 'Discount', acceptance: 78, revenue: '$2,400', status: 'active' },
    { id: 'OFR-002', name: 'Free Month - Upgrade', target: 'TechStart Inc', type: 'Upgrade', acceptance: 65, revenue: '$1,800', status: 'pending' },
    { id: 'OFR-003', name: 'Extended Trial - 30 days', target: 'GlobalRetail Ltd', type: 'Trial', acceptance: 82, revenue: '$3,200', status: 'active' },
    { id: 'OFR-004', name: 'Custom Package Deal', target: 'DataFlow Systems', type: 'Bundle', acceptance: 54, revenue: '$5,600', status: 'draft' },
  ];
  const offerTemplates = [
    { name: 'Win-Back Discount', usage: 156, successRate: '72%', avgRevenue: '$1,200', icon: Percent },
    { name: 'Loyalty Upgrade', usage: 124, successRate: '68%', avgRevenue: '$2,400', icon: Star },
    { name: 'Extended Trial', usage: 98, successRate: '82%', avgRevenue: '$800', icon: Clock },
    { name: 'Bundle Package', usage: 76, successRate: '64%', avgRevenue: '$4,200', icon: Gift },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Gift size={20} color="#fff" /><Text style={styles.metricValue}>34</Text><Text style={styles.metricLabel}>Active Offers</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>71.4%</Text><Text style={styles.metricLabel}>Acceptance Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>$48K</Text><Text style={styles.metricLabel}>Revenue Saved</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>89.2%</Text><Text style={styles.metricLabel}>Optimization Score</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Offers</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>New Offer</Text></TouchableOpacity>
        </View>
        {activeOffers.map((o) => (
          <TouchableOpacity key={o.id} style={styles.offerRow}>
            <View style={styles.offerInfo}><View style={[styles.offerIcon, { backgroundColor: theme.colors.primary + '15' }]}><Gift size={16} color={theme.colors.primary} /></View><View><Text style={[styles.offerName, { color: theme.colors.text }]}>{o.name}</Text><Text style={[styles.offerMeta, { color: theme.colors.secondaryText }]}>{o.target} · {o.type}</Text></View></View>
            <View style={styles.offerRight}>
              <Text style={[styles.offerRevenue, { color: '#10B981' }]}>{o.revenue}</Text>
              <View style={[styles.acceptBadge, { backgroundColor: o.acceptance >= 70 ? '#10B98120' : '#F59E0B20' }]}><Text style={[styles.acceptText, { color: o.acceptance >= 70 ? '#10B981' : '#F59E0B' }]}>{o.acceptance}%</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Offer Templates</Text></View></View>
        {offerTemplates.map((t) => (
          <View key={t.name} style={styles.templateRow}>
            <View style={styles.tplInfo}><View style={[styles.tplIcon, { backgroundColor: theme.colors.primary + '15' }]}><t.icon size={18} color={theme.colors.primary} /></View><View><Text style={[styles.tplName, { color: theme.colors.text }]}>{t.name}</Text><Text style={[styles.tplMeta, { color: theme.colors.secondaryText }]}>{t.usage} uses · {t.successRate} success</Text></View></View>
            <Text style={[styles.tplRevenue, { color: theme.colors.text }]}>{t.avgRevenue}</Text>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Offer Optimizer requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>71.4%</Text><Text style={styles.metricLabel}>Acceptance Rate</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>$48K</Text><Text style={styles.metricLabel}>Revenue Retained</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+8.2%</Text><Text style={styles.metricLabel}>Conversion Up</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>$1,420</Text><Text style={styles.metricLabel}>Avg Offer Value</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Offer Conversion Improving</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Acceptance rates up 8.2% this week. Personalized offers outperform generic ones by 34%.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Bundle Offers Underperforming</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Bundle packages have 64% success rate vs 82% for extended trials. Consider adjusting pricing.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimizer Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Generate Offers</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically generate personalized offers</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>A/B Testing</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Test multiple offer variants automatically</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Revenue Threshold</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Only offer to customers with MRR {'>'} $500</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Discount Limits</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Max discount cap at 25%</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Learning Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Learn from offer acceptance patterns</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Gift, component: renderOverviewTab() },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: renderAnalyticsTab() },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab() },
  ];
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
  offerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  offerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  offerIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  offerName: { fontSize: 14, fontWeight: '600' },
  offerMeta: { fontSize: 12, marginTop: 2 },
  offerRight: { alignItems: 'flex-end', gap: 4 },
  offerRevenue: { fontSize: 14, fontWeight: '700' },
  acceptBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  acceptText: { fontSize: 11, fontWeight: '700' },
  templateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  tplInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tplIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  tplName: { fontSize: 15, fontWeight: '600' },
  tplMeta: { fontSize: 12, marginTop: 2 },
  tplRevenue: { fontSize: 14, fontWeight: '600' },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  insightCard: { flexDirection: 'row', padding: 16, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 16, marginBottom: 12 },
  insightIcon: { marginRight: 12, marginTop: 2 }, insightContent: { flex: 1 },
  insightTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  insightDesc: { fontSize: 13, lineHeight: 20 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  settingInfo: { flex: 1, marginRight: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  settingDesc: { fontSize: 13 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
