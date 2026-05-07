import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { AlertTriangle, CheckCircle, Clock, BarChart3, Lock, Sparkles, ChevronRight, Users, ArrowUp, Zap, Shield } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIEscalationManagerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-escalation-manager')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { activeEscalations: 8, resolvedToday: 34, avgResolution: '2h 14m', escalationRate: '7.6%' };
  const activeEscalations = [
    { id: 'ESC-2847', customer: 'TechCorp', severity: 'P1', reason: 'Service outage', assignedTo: 'Sarah J.', elapsed: '45m' },
    { id: 'ESC-2846', customer: 'CloudSync', severity: 'P2', reason: 'Data sync failure', assignedTo: 'Mike D.', elapsed: '1h 20m' },
    { id: 'ESC-2845', customer: 'DataFlow', severity: 'P2', reason: 'API auth errors', assignedTo: 'Emily C.', elapsed: '2h 05m' },
  ];
  const rules = [
    { name: 'P1 Auto-Escalate', trigger: 'Service outage > 15min', action: 'Notify VP + On-call', active: true },
    { name: 'Repeat Customer', trigger: '3+ tickets in 7 days', action: 'Assign senior agent', active: true },
    { name: 'Revenue Threshold', trigger: 'Account ARR > $100K', action: 'Priority queue', active: true },
  ];

  const renderEscalationsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.activeEscalations}</Text><Text style={styles.metricLabel}>Active</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.resolvedToday}</Text><Text style={styles.metricLabel}>Resolved Today</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.avgResolution}</Text><Text style={styles.metricLabel}>Avg Resolution</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ArrowUp size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.escalationRate}</Text><Text style={styles.metricLabel}>Escalation Rate</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Escalations</Text></View></View>
          <View style={styles.escList}>
            {activeEscalations.map((e) => (
              <View key={e.id} style={styles.escCard}>
                <View style={styles.escHeader}>
                  <View style={styles.escLeft}>
                    <View style={[styles.severityBadge, { backgroundColor: e.severity === 'P1' ? '#EF444420' : '#F59E0B20' }]}>
                      <Text style={[styles.severityText, { color: e.severity === 'P1' ? '#EF4444' : '#F59E0B' }]}>{e.severity}</Text>
                    </View>
                    <View><Text style={[styles.escCustomer, { color: theme.colors.text }]}>{e.customer}</Text><Text style={[styles.escReason, { color: theme.colors.secondaryText }]}>{e.reason}</Text></View>
                  </View>
                  <Text style={[styles.escElapsed, { color: e.elapsed.includes('h') ? '#EF4444' : '#F59E0B' }]}>{e.elapsed}</Text>
                </View>
                <View style={styles.escFooter}>
                  <Text style={[styles.escAssigned, { color: theme.colors.secondaryText }]}>Assigned: {e.assignedTo}</Text>
                  <Text style={[styles.escId, { color: theme.colors.secondaryText }]}>{e.id}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Escalation Rules</Text></View></View>
          <View style={styles.ruleList}>
            {rules.map((r) => (
              <View key={r.name} style={styles.ruleCard}>
                <View style={styles.ruleHeader}><Text style={[styles.ruleName, { color: theme.colors.text }]}>{r.name}</Text><View style={[styles.activeDot, { backgroundColor: r.active ? '#10B981' : '#9CA3AF' }]} /></View>
                <Text style={[styles.ruleTrigger, { color: theme.colors.secondaryText }]}>Trigger: {r.trigger}</Text>
                <Text style={[styles.ruleAction, { color: theme.colors.secondaryText }]}>Action: {r.action}</Text>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Escalation Manager.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'escalations', label: 'Escalations', icon: AlertTriangle, component: renderEscalationsTab() }];
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
  escList: { gap: 12 }, escCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  escHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  escLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  severityText: { fontSize: 11, fontWeight: '700' },
  escCustomer: { fontSize: 15, fontWeight: '700' },
  escReason: { fontSize: 12, marginTop: 2 },
  escElapsed: { fontSize: 14, fontWeight: '700' },
  escFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  escAssigned: { fontSize: 12 }, escId: { fontSize: 12 },
  ruleList: { gap: 12 }, ruleCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  ruleName: { fontSize: 15, fontWeight: '700' },
  activeDot: { width: 8, height: 8, borderRadius: 4 },
  ruleTrigger: { fontSize: 12, marginBottom: 4 },
  ruleAction: { fontSize: 12 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
