import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Bot, Activity, BarChart3, TrendingUp, Clock, Zap, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

export default function AiLeadQualifierScreen() {
  const { theme } = useTheme();
  
  // Mock Agent object just in case it doesn't align correctly
  const agent = useMemo(() => ({
    id: 'ai-lead-qualifier',
    name: 'AI Lead Qualifier',
    title: 'Prospect Assessment & Scoring',
    description: 'Intelligently assesses and scores prospects to ensure the sales team focuses on high-intent leads.',
    category: 'sales-revenue',
    type: 'subagent',
    status: 'active',
    capabilities: ["Lead Scoring","Intent Analysis","BANT Verification","Data Enrichment","Market Segmentation","Funnel Management","Conversion Optimization","Behavioral Tracking","Profile Matching","Automated Disqualification"],
    performance: { successRate: 98, averageResponseTime: 1.2, customerSatisfaction: 4.8 },
  }), []);

  const dashboardTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#69F0AE', '#00b359']} style={styles.metricCard}>
          <Zap size={20} color="#fff" />
          <Text style={styles.metricValue}>12.5k</Text>
          <Text style={styles.metricLabel}>Tasks Today</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>0.8s</Text>
          <Text style={styles.metricLabel}>Avg Response</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>98.5%</Text>
          <Text style={styles.metricLabel}>Success Rate</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
          <Clock size={18} color={theme.colors.secondaryText} />
        </View>
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={[styles.tradeRow, { borderBottomColor: theme.colors.border }]}>
             <View style={[styles.sideTag, { backgroundColor: theme.colors.primary + '20' }]}>
               <Target size={14} color={theme.colors.primary} />
             </View>
             <View style={styles.tradeInfo}>
               <Text style={[styles.tradeAsset, { color: theme.colors.text }]}>Executed Operation #{Math.floor(Math.random() * 9000) + 1000}</Text>
               <Text style={[styles.tradeMeta, { color: theme.colors.secondaryText }]}>Status: Optimal</Text>
             </View>
             <Text style={[styles.tradePnl, { color: '#00C853' }]}>Success</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: dashboardTab },
  ];

  return <AgentShell agent={agent as any} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, minWidth: '30%', padding: 16, borderRadius: 20, gap: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  tradeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  sideTag: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  tradeInfo: { flex: 1 },
  tradeAsset: { fontSize: 14, fontWeight: '600' },
  tradeMeta: { fontSize: 12, marginTop: 2 },
  tradePnl: { fontSize: 14, fontWeight: '800' },
});