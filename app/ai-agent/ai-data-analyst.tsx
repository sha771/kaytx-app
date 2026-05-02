 
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartBar, Database } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';

export default function AIDataAnalystScreen() {
    const { theme } = useTheme();
    // Note: route in constants might be ai-data-analytics, but we stick to filename for simplicity.
    const agent = aiEmployees.find(e => e.id === 'ai-data-analyst')!;

    // Fetch real data from tRPC
    const { data: analyticsData } = trpc.aiAgents.getAgentAnalytics.useQuery({ 
        agentId: agent.id 
    });
    const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
        category: 'data-intelligence', 
        limit: 10 
    });

    const reports: { name: string; type: string; status: 'Ready' | 'Processing' }[] = useMemo(() => {
        if (activityData?.activities && activityData.activities.length > 0) {
            return activityData.activities.map((a: any) => ({
                name: a.action || 'Data Report',
                type: a.details?.category || 'Analytics',
                status: a.status === 'success' ? 'Ready' : 'Processing' as 'Ready' | 'Processing'
            }));
        }
        return [
            { name: 'Q3 Revenue Models', type: 'Predictive', status: 'Ready' },
            { name: 'User Cohort Analysis', type: 'Behavioral', status: 'Processing' },
            { name: 'Supply Chain Heatmap', type: 'Geospatial', status: 'Ready' },
        ];
    }, [activityData]);

    const renderDashTab = (
        <View style={styles.tabContent}>
            <View style={[styles.mainCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Data Throughput</Text>
                <Text style={[styles.val, { color: theme.colors.primary }]}>
                    {analyticsData?.tasksCompleted ? `${(analyticsData.tasksCompleted * 1.2).toFixed(1)} TB/hr` : '4.2 TB/hr'}
                </Text>
                <Text style={[styles.sub, { color: theme.colors.secondaryText }]}>Processed & Indexed</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Generated Reports</Text>
            {(reports?.slice(0, 3) || [
                { name: 'Q3 Revenue Models', type: 'Predictive', status: 'Ready' },
                { name: 'User Cohort Analysis', type: 'Behavioral', status: 'Processing' },
                { name: 'Supply Chain Heatmap', type: 'Geospatial', status: 'Ready' },
            ]).map((rep: { name: string; type: string; status: 'Ready' | 'Processing' }, i: number) => (
                <View key={i} style={[styles.repCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Database size={20} color={rep.status === 'Ready' ? '#34C759' : '#FF9500'} />
                    <View style={styles.repInfo}>
                        <Text style={[styles.repName, { color: theme.colors.text }]}>{rep.name}</Text>
                        <Text style={[styles.repType, { color: theme.colors.secondaryText }]}>{rep.type}</Text>
                    </View>
                    <Text style={[styles.repStatus, { color: rep.status === 'Ready' ? '#34C759' : '#FF9500' }]}>{rep.status}</Text>
                </View>
            ))}
        </View>
    );

    const customTabs = [
        { id: 'dashboards', label: 'Dashboards', icon: ChartBar, component: renderDashTab }
    ];

    return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
    tabContent: { paddingBottom: 20 },
    mainCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 25 },
    cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
    val: { fontSize: 40, fontWeight: '900', marginBottom: 4 },
    sub: { fontSize: 14 },
    sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
    repCard: { flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 16, marginBottom: 10, gap: 15 },
    repInfo: { flex: 1 },
    repName: { fontSize: 15, fontWeight: '700' },
    repType: { fontSize: 12 },
    repStatus: { fontSize: 12, fontWeight: '800' }
});
