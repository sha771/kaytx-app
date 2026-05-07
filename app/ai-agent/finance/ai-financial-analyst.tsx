import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, TrendingUp, Calculator, BarChart3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function FinancialAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0EA5E920' }]}>
          <TrendingUp size={56} color="#0EA5E9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Financial Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Finance - Analyst</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#0EA5E922' }]}><TrendingUp size={12} color="#0EA5E9" /><Text style={[styles.badgeText, { color: '#0EA5E9' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          { label: 'Cost Equiv', value: '$120K/yr', icon: TrendingUp, color: '#34C759' },
          { label: 'AI Cost', value: '$6K/yr', icon: Clock, color: '#007AFF' },
          { label: 'Efficiency', value: '20x', icon: Target, color: '#FF9500' },
          { label: 'Insights', value: '180/mo', icon: BarChart3, color: '#0EA5E9' }
        ].map((stat, index) => (
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
          The AI Financial Analyst performs deep financial analysis, calculating key ratios, projecting trends,
          and benchmarking performance against industry standards. It provides actionable insights for strategic
          decision-making across all financial dimensions.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Financial Ratio Calculation & Analysis',
          'Trend Projection & Forecasting',
          'Industry Benchmark Comparison',
          'Investment Performance Analysis',
          'Ad-hoc Financial Modeling',
          'Data-Driven Insight Generation'
        ].map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#0EA5E9" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Ratio Analysis', 'Trend Projection', 'Benchmarking', 'Modeling', 'Performance', 'Insights', 'Visualization', 'Comparative'].map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#0EA5E918' }]}>
              <Text style={[styles.tagText, { color: '#0EA5E9' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'Ratios Tracked', value: '45+ KPIs' },
          { label: 'Trend Accuracy', value: '94.2%' },
          { label: 'Benchmarks', value: '12 industries' },
          { label: 'Insights', value: '180/mo' }
        ].map((metric, index) => (
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#0EA5E9' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {[
          { name: 'AI Ratio Calculator', route: '/ai-agent/finance/sub-agents/ratio-calculator', icon: Calculator, color: '#2E7D32', desc: 'Financial ratio computation' },
          { name: 'AI Trend Projector', route: '/ai-agent/finance/sub-agents/trend-projector', icon: TrendingUp, color: '#007AFF', desc: 'Financial trend forecasting' },
          { name: 'AI Benchmark Comparator', route: '/ai-agent/finance/sub-agents/benchmark-comparator', icon: BarChart3, color: '#FF9500', desc: 'Industry benchmark comparison' }
        ].map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(sub.route as any)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '20' }]}><sub.icon size={24} color={sub.color} /></View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/financial-analyst', '/analyst/ratios', '/analyst/benchmark'].map((endpoint, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2E7D3212' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/ratio-calculator')}>
            <Calculator size={24} color="#2E7D32" />
            <Text style={[styles.actionText, { color: '#2E7D32' }]}>Ratios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF12' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/trend-projector')}>
            <TrendingUp size={24} color="#007AFF" />
            <Text style={[styles.actionText, { color: '#007AFF' }]}>Trends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF950012' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/benchmark-comparator')}>
            <BarChart3 size={24} color="#FF9500" />
            <Text style={[styles.actionText, { color: '#FF9500' }]}>Benchmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#0EA5E912' }]} onPress={() => router.push('/ai-agent/finance')}>
            <TrendingUp size={24} color="#0EA5E9" />
            <Text style={[styles.actionText, { color: '#0EA5E9' }]}>Finance</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="financial-analyst" agentName="AI Financial Analyst" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  metricRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  metricDot: { width: 8, height: 8, borderRadius: 4 },
  metricLabel: { fontSize: 14, fontWeight: '600' },
  metricValue: { fontSize: 14, flex: 1 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 8, gap: 12 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 16, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
