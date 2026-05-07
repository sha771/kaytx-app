import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, DollarSign, TrendingUp, BarChart3 } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function CfoPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#10B98120' }]}>
          <Briefcase size={56} color="#10B981" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Financial Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Finance - C-Level Executive</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}><Briefcase size={12} color="#10B981" /><Text style={[styles.badgeText, { color: '#10B981' }]}>C-Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {[
          {label:'Cost Equiv',value:'$200K/yr',icon: Briefcase, color: '#34C759'},
          {label:'AI Cost',value:'$10K/yr',icon: Clock, color: '#007AFF'},
          {label:'Efficiency',value:'20x',icon: Target, color: '#FF9500'},
          {label:'Decisions',value:'1.2K/day',icon: BarChart3, color: '#10B981'}
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
          The AI Chief Financial Officer oversees the entire financial strategy of the enterprise, making high-level
          decisions on capital allocation, risk management, and financial planning. It coordinates with VP Finance
          and VP Accounting to ensure fiscal health, regulatory compliance, and maximum shareholder value.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {[
          'Enterprise Financial Strategy & Vision',
          'Capital Structure & Funding Decisions',
          'Risk-Reward Portfolio Management',
          'Board-Level Financial Reporting',
          'M&A Financial Due Diligence',
          'Investor Relations & Stakeholder Communication'
        ].map((item,index)=>(
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#10B981" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {['Financial Strategy','Capital Allocation','Risk Management','Board Reporting','M&A Analysis','Investor Relations','Compliance Oversight','Treasury Management'].map((cap,index)=>(
            <View key={index} style={[styles.tag, { backgroundColor: '#10B98118' }]}>
              <Text style={[styles.tagText, { color: '#10B981' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        {[
          { label: 'ROI', value: '23.4% enterprise' },
          { label: 'Cost Savings', value: '$2.1M/yr identified' },
          { label: 'Risk Score', value: 'Low (2.1/10)' },
          { label: 'Compliance', value: '100% adherence' }
        ].map((metric,index)=>(
          <View key={index} style={styles.metricRow}>
            <View style={[styles.metricDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{metric.label}:</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {[
          { name: 'AI Financial Strategy Advisor', route: '/ai-agent/finance/sub-agents/financial-strategy-advisor', icon: DollarSign, color: '#2E7D32', desc: 'Strategic financial advisory' },
          { name: 'AI Capital Allocation Optimizer', route: '/ai-agent/finance/sub-agents/capital-allocation-optimizer', icon: BarChart3, color: '#007AFF', desc: 'Capital deployment optimization' },
          { name: 'AI Risk-Reward Analyst', route: '/ai-agent/finance/sub-agents/risk-reward-analyst', icon: TrendingUp, color: '#FF9500', desc: 'Risk-reward analysis & scoring' }
        ].map((sub,index)=>(
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
        {['/consult/cfo', '/cfo/strategy', '/cfo/risk-assessment'].map((endpoint,index)=>(
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2E7D3212' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/financial-strategy-advisor')}>
            <DollarSign size={24} color="#2E7D32" />
            <Text style={[styles.actionText, { color: '#2E7D32' }]}>Strategy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF12' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/capital-allocation-optimizer')}>
            <BarChart3 size={24} color="#007AFF" />
            <Text style={[styles.actionText, { color: '#007AFF' }]}>Allocation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF950012' }]} onPress={() => router.push('/ai-agent/finance/sub-agents/risk-reward-analyst')}>
            <TrendingUp size={24} color="#FF9500" />
            <Text style={[styles.actionText, { color: '#FF9500' }]}>Risk-Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push('/ai-agent/finance')}>
            <Briefcase size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Finance</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="cfo" agentName="AI Chief Financial Officer" />
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
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
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
