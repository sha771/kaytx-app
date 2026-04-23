 
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Zap } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';

export default function AISalesAgentScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-sales-agent')!;

  // Fetch real data from tRPC
  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
    agentId: agent.id 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'sales-revenue', 
    limit: 10 
  });

  const conversions = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        amount: a.details?.amount ? `$${a.details.amount.toLocaleString()}` : '$1,250',
        client: a.details?.customerName || 'Client',
        time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    }
    return [
      { amount: '$4,200', client: 'Acme Corp', time: '12m ago' },
      { amount: '$1,150', client: 'StartUp Inc', time: '24m ago' },
      { amount: '$8,500', client: 'Global Ltd', time: '41m ago' },
    ];
  }, [activityData]);

  const renderActiveTab = (
    <View style={styles.tabContent}>
      <View style={[styles.heroCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Live Engagement</Text>
        <Text style={[styles.bigNum, { color: theme.colors.primary }]}>{analytics?.activeConversations ?? 1402}</Text>
        <Text style={[styles.subText, { color: theme.colors.secondaryText }]}>Active Conversations</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent conversions</Text>
      {(conversions?.slice(0, 3) || [
        { amount: '$4,200', client: 'Acme Corp', time: '12m ago' },
        { amount: '$1,150', client: 'StartUp Inc', time: '24m ago' },
        { amount: '$8,500', client: 'Global Ltd', time: '41m ago' },
      ]).map((conv: { amount: string; client: string; time: string }, i: number) => (
        <View key={i} style={[styles.convRow, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.convLeft}>
            <Text style={[styles.convClient, { color: theme.colors.text }]}>{conv.client}</Text>
            <Text style={[styles.convTime, { color: theme.colors.secondaryText }]}>{conv.time}</Text>
          </View>
          <Text style={[styles.convAmount, { color: '#34C759' }]}>{conv.amount}</Text>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'engagement', label: 'Engagement', icon: Zap, component: renderActiveTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  heroCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 10, opacity: 0.7 },
  bigNum: { fontSize: 48, fontWeight: '900', marginBottom: 4 },
  subText: { fontSize: 14, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  convRow: { padding: 18, borderRadius: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  convLeft: { gap: 2 },
  convClient: { fontSize: 15, fontWeight: '700' },
  convTime: { fontSize: 11 },
  convAmount: { fontSize: 16, fontWeight: '800' }
});
