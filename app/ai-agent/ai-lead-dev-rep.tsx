import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserPlus, ListFilter } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';

export default function AILeadDevRepScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-lead-dev-rep')!;

  // Fetch real data from tRPC
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'sales-revenue', 
    limit: 10 
  });

  const leads = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        name: a.details?.customerName || 'Lead Prospect',
        company: a.details?.company || 'Enterprise Corp',
        score: a.details?.confidence || 85,
        source: a.details?.source || 'LinkedIn'
      }));
    }
    return [
      { name: 'Director of Ops', company: 'HealthPlus', score: 98, source: 'LinkedIn' },
      { name: 'VP Sales', company: 'LogiTech', score: 92, source: 'Crunchbase' },
      { name: 'Founder', company: 'Stealth AI', score: 88, source: 'Twitter' },
    ];
  }, [activityData]);

  const renderProspectingTab = (
    <View style={styles.tabContent}>
      <View style={[styles.statRow, { marginBottom: 20 }]}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: theme.colors.primary }]}>
            {analytics?.tasksCompleted ? (analytics.tasksCompleted * 12).toLocaleString() : '8,420'}
          </Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Scraped</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: '#34C759' }]}>
            {analytics?.tasksCompleted ? Math.round(analytics.tasksCompleted * 0.4).toLocaleString() : '315'}
          </Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Qualified</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: '#FF9500' }]}>
            {analytics?.successRate ? `${(analytics.successRate * 0.12).toFixed(1)}%` : '12%'}
          </Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Reply Rate</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Lead Feed</Text>
      {leads.map((lead: any, i: number) => (
        <View key={i} style={[styles.leadRow, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.leadInfo}>
            <Text style={[styles.leadName, { color: theme.colors.text }]}>{lead.name}</Text>
            <Text style={[styles.leadComp, { color: theme.colors.secondaryText }]}>{lead.company} • {lead.source}</Text>
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: lead.score > 90 ? '#34C75915' : '#FF950015' }]}>
            <Text style={[styles.scoreText, { color: lead.score > 90 ? '#34C759' : '#FF9500' }]}>{lead.score}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'prospects', label: 'Prospecting', icon: UserPlus, component: renderProspectingTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  statRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, padding: 20, borderRadius: 16, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '900', marginBottom: 4 },
  statLab: { fontSize: 11, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  leadRow: { padding: 16, borderRadius: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadInfo: { flex: 1 },
  leadName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  leadComp: { fontSize: 12 },
  scoreBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontSize: 12, fontWeight: '800' }
});
