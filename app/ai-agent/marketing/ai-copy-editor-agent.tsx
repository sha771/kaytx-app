import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { PenTool, CheckCircle, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, FileText, Clock, AlignLeft } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-copy-editor', name: 'AI Copy Editor', title: 'Editorial Quality Control',
  description: 'Polishes and perfects content â€” grammar, style, tone consistency, brand voice alignment, and readability optimization for all marketing materials.',
  capabilities: ['Grammar Correction', 'Style Enforcement', 'Tone Alignment', 'Brand Voice', 'Readability', 'Fact Checking', 'Consistency', 'Proofreading'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-content-marketing-agent',
};

export default function AICopyEditorAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { edited: 126, errorsFixed: '2.4K', avgTime: '12m', qualityScore: '94/100' };
  const editTypes = [
    { type: 'Grammar', count: 842, pct: '35%', color: '#06B6D4' },
    { type: 'Style', count: 624, pct: '26%', color: '#10B981' },
    { type: 'Clarity', count: 486, pct: '20%', color: '#8B5CF6' },
    { type: 'Brand Voice', count: 428, pct: '18%', color: '#F59E0B' },
  ];
  const recentEdits = [
    { doc: 'Q2 Marketing Report', type: 'Style', issues: 24, time: '18m', status: 'Done' },
    { doc: 'Product Launch Copy', type: 'Grammar', issues: 18, time: '14m', status: 'Done' },
    { doc: 'Email Campaign Draft', type: 'Brand Voice', issues: 32, time: '22m', status: 'Done' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-content-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Content Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><FileText size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.edited}</Text><Text style={styles.metricLabel}>Docs Edited</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.errorsFixed}</Text><Text style={styles.metricLabel}>Errors Fixed</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgTime}</Text><Text style={styles.metricLabel}>Avg Edit Time</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.qualityScore}</Text><Text style={styles.metricLabel}>Quality Score</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><PenTool size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Edit Breakdown</Text></View></View>
          <View style={styles.editList}>
            {editTypes.map((e) => (
              <View key={e.type} style={styles.editCard}>
                <View style={styles.editHeader}><View style={[styles.editDot, { backgroundColor: e.color }]} /><Text style={[styles.editType, { color: theme.colors.text }]}>{e.type}</Text><Text style={[styles.editPct, { color: e.color }]}>{e.pct}</Text></View>
                <Text style={[styles.editCount, { color: theme.colors.secondaryText }]}>{e.count} corrections</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Edits</Text></View></View>
          <View style={styles.editDocList}>
            {recentEdits.map((e) => (
              <View key={e.doc} style={styles.editDocCard}>
                <View style={styles.editDocHeader}><Text style={[styles.editDocName, { color: theme.colors.text }]}>{e.doc}</Text><Text style={[styles.editDocStatus, { color: '#10B981' }]}>{e.status}</Text></View>
                <View style={styles.editDocMeta}><Text style={[styles.editDocType, { color: theme.colors.secondaryText }]}>{e.type}</Text><Text style={[styles.editDocIssues, { color: '#F59E0B' }]}>{e.issues} issues</Text><Text style={[styles.editDocTime, { color: theme.colors.secondaryText }]}>{e.time}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Passive voice usage reduced 42% â€” readability score improved', color: '#10B981' },{ msg: 'Brand voice consistency at 94% across all edited content', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Copy Editor is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: PenTool, component: renderOverviewTab() },
  ];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  editList: { gap: 12 }, editCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  editHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }, editDot: { width: 10, height: 10, borderRadius: 5 },
  editType: { fontSize: 14, fontWeight: '600', flex: 1 }, editPct: { fontSize: 14, fontWeight: '700' }, editCount: { fontSize: 12 },
  editDocList: { gap: 12 }, editDocCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  editDocHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, editDocName: { fontSize: 14, fontWeight: '600', flex: 1 }, editDocStatus: { fontSize: 12, fontWeight: '600' },
  editDocMeta: { flexDirection: 'row', gap: 12 }, editDocType: { fontSize: 11 }, editDocIssues: { fontSize: 11, fontWeight: '600' }, editDocTime: { fontSize: 11 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
