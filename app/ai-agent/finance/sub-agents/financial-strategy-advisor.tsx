import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, DollarSign, Clock, Target, Zap, ArrowRight, Briefcase, BarChart3, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function FinancialStrategyAdvisorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#2E7D3220' }]}>
          <DollarSign size={56} color="#2E7D32" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Financial Strategy Advisor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Chief Financial Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#2E7D3222' }]}><Briefcase size={12} color="#2E7D32" /><Text style={[styles.badgeText, { color: '#2E7D32' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$80K/yr',icon: DollarSign, color: '#34C759'},
          {label:'AI Cost',value:'$4K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Accuracy',value:'96.2%',icon: BarChart3, color: '#2E7D32'}
        ].map((stat,index)=>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Financial Strategy Advisor develops and recommends long-term financial strategies aligned with
          enterprise goals. It analyzes market conditions, competitive landscape, and internal financial data to
          provide actionable strategic recommendations that maximize growth while minimizing financial risk.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Long-Term Financial Strategy Development',
          'Market & Competitive Analysis',
          'Growth Strategy Recommendations',
          'Financial Goal Setting & Tracking',
          'Strategic Investment Advisory',
          'Economic Trend Impact Assessment'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#2E7D32" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Strategy Development','Market Analysis','Growth Planning','Goal Tracking','Investment Advisory','Trend Assessment','Scenario Modeling','Competitive Intel'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#2E7D3218' }]}>
              <Text style={[styles.tagText, { color: '#2E7D32' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Strategy Accuracy', value: '96.2% on target' },
          { label: 'Growth Rate', value: '18.3% YoY' },
          { label: 'Advisory Uptime', value: '99.9%' },
          { label: 'Recommendations', value: '340/month' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#2E7D32' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/financial-strategy-advisor', '/financial-strategy-advisor/advise', '/financial-strategy-advisor/forecast'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/finance/cfo')}>
            <Briefcase size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>CFO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF12' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/capital-allocation-optimizer')}>
            <BarChart3 size={24} color="#007AFF" />
            <Text style={[styles.actionText, { color: '#007AFF' }]}>Allocation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF950012' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/risk-reward-analyst')}>
            <TrendingUp size={24} color="#FF9500" />
            <Text style={[styles.actionText, { color: '#FF9500' }]}>Risk-Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2E7D3212' }]} onPress={() => router.push('/ai-agent/finance')}>
            <DollarSign size={24} color="#2E7D32" />
            <Text style={[styles.actionText, { color: '#2E7D32' }]}>Finance</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/finance/cfo')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Briefcase size={24} color="#10B981" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Financial Officer</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="financial-strategy-advisor" agentName="AI Financial Strategy Advisor" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  metricRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  metricDot: { width: 8, height: 8, borderRadius: 4 },
  metricLabel: { fontSize: 14, fontWeight: '600' },
  metricValue: { fontSize: 14, flex: 1 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
