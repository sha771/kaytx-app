import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { CalendarClock, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Activity, Bell, Mail, Phone, MessageSquare, Calendar, Send } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIFollowUpSchedulerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-follow-up-scheduler')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const scheduledFollowUps = [
    { id: 'FU-001', customer: 'Acme Corp', type: 'Email', subject: 'Check-in after resolution', scheduled: '2:00 PM Today', status: 'scheduled', priority: 'High' },
    { id: 'FU-002', customer: 'TechStart Inc', type: 'Call', subject: 'Retention offer discussion', scheduled: '3:30 PM Today', status: 'scheduled', priority: 'Critical' },
    { id: 'FU-003', customer: 'GlobalRetail Ltd', type: 'SMS', subject: 'Satisfaction survey', scheduled: '10:00 AM Tomorrow', status: 'pending', priority: 'Medium' },
    { id: 'FU-004', customer: 'DataFlow Systems', type: 'Email', subject: 'Feature update notification', scheduled: '9:00 AM Tomorrow', status: 'scheduled', priority: 'Low' },
  ];
  const followUpChannels = [
    { channel: 'Email', icon: Mail, scheduled: 89, sent: 67, responseRate: '42%', color: '#3B82F6' },
    { channel: 'Phone Call', icon: Phone, scheduled: 34, sent: 28, responseRate: '78%', color: '#10B981' },
    { channel: 'SMS', icon: MessageSquare, scheduled: 56, sent: 45, responseRate: '56%', color: '#8B5CF6' },
    { channel: 'In-App', icon: Bell, scheduled: 42, sent: 38, responseRate: '34%', color: '#F59E0B' },
  ];
  const recentCompleted = [
    { customer: 'BetaCorp', type: 'Email', subject: 'Service check-in', result: 'Responded', time: '1h ago' },
    { customer: 'InnoSoft', type: 'Call', subject: 'Renewal discussion', result: 'Renewed', time: '2h ago' },
    { customer: 'MegaTrade', type: 'SMS', subject: 'Feedback request', result: 'No Response', time: '3h ago' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><CalendarClock size={20} color="#fff" /><Text style={styles.metricValue}>221</Text><Text style={styles.metricLabel}>Scheduled Today</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Send size={20} color="#fff" /><Text style={styles.metricValue}>178</Text><Text style={styles.metricLabel}>Sent Today</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>52.4%</Text><Text style={styles.metricLabel}>Response Rate</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>4.2h</Text><Text style={styles.metricLabel}>Avg Follow-Up</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><CalendarClock size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduled Follow-Ups</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>Schedule</Text></TouchableOpacity>
        </View>
        {scheduledFollowUps.map((f) => (
          <TouchableOpacity key={f.id} style={styles.followUpRow}>
            <View style={styles.fuInfo}><View style={[styles.fuIcon, { backgroundColor: f.type === 'Email' ? '#3B82F615' : f.type === 'Call' ? '#10B98115' : '#8B5CF615' }]}><CalendarClock size={16} color={f.type === 'Email' ? '#3B82F6' : f.type === 'Call' ? '#10B981' : '#8B5CF6'} /></View><View><Text style={[styles.fuSubject, { color: theme.colors.text }]}>{f.subject}</Text><Text style={[styles.fuMeta, { color: theme.colors.secondaryText }]}>{f.customer} · {f.type} · {f.scheduled}</Text></View></View>
            <View style={[styles.priorityBadge, { backgroundColor: f.priority === 'Critical' ? '#EF444420' : f.priority === 'High' ? '#F59E0B20' : '#3B82F620' }]}><Text style={[styles.priorityText, { color: f.priority === 'Critical' ? '#EF4444' : f.priority === 'High' ? '#F59E0B' : '#3B82F6' }]}>{f.priority}</Text></View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Follow-Up Channels</Text></View></View>
        {followUpChannels.map((ch) => (
          <View key={ch.channel} style={styles.channelRow}>
            <View style={styles.chInfo}><View style={[styles.chIcon, { backgroundColor: ch.color + '15' }]}><ch.icon size={18} color={ch.color} /></View><View><Text style={[styles.chName, { color: theme.colors.text }]}>{ch.channel}</Text><Text style={[styles.chMeta, { color: theme.colors.secondaryText }]}>{ch.scheduled} scheduled · {ch.sent} sent</Text></View></View>
            <Text style={[styles.chRate, { color: ch.color }]}>{ch.responseRate}</Text>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Follow-up Scheduler requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>52.4%</Text><Text style={styles.metricLabel}>Response Rate</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>78%</Text><Text style={styles.metricLabel}>Call Response</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+6.8%</Text><Text style={styles.metricLabel}>Response Up</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>4.2h</Text><Text style={styles.metricLabel}>Avg Response</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Response Rates Improving</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Follow-up response rates up 6.8% this week. Phone calls remain most effective at 78%.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Optimal Timing Detected</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Emails sent between 10-11 AM show 34% higher response. Consider rescheduling afternoon sends.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduler Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Scheduling</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically schedule follow-ups</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Smart Timing</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Optimize send time based on customer behavior</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Multi-Channel Sequences</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-sequence across email, SMS, calls</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Response Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Cancel follow-up if customer responds</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Escalation on No Response</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Escalate after 3 failed follow-ups</Text></View><Switch value={false} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: CalendarClock, component: renderOverviewTab() },
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
  followUpRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  fuInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  fuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  fuSubject: { fontSize: 14, fontWeight: '600' },
  fuMeta: { fontSize: 12, marginTop: 2 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityText: { fontSize: 11, fontWeight: '700' },
  channelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  chInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  chIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  chName: { fontSize: 15, fontWeight: '600' },
  chMeta: { fontSize: 12, marginTop: 2 },
  chRate: { fontSize: 14, fontWeight: '700' },
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
