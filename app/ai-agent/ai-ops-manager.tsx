import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Settings, Zap, Activity, Layers, Database, Cpu, Shield, Globe } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';

export default function AIOpsManagerScreen() {
    const { theme } = useTheme();
    const agent = aiEmployees.find(e => e.id === 'ai-operations-manager')!;

    // Fetch real data from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'operations-management' });
    const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'operations-management', limit: 5 });

    const nodes = useMemo(() => {
        if (activityData?.activities && activityData.activities.length > 0) {
            return activityData.activities.slice(0, 3).map((a: any, i: number) => ({
                name: a.action || 'Workflow Sync',
                latency: `${(2 + i * 3)}ms`,
                load: a.status === 'processing' ? 85 : 42
            }));
        }
        return [
            { name: 'Supply Chain Sync', latency: '4ms', load: 42 },
            { name: 'Inventory Balance', latency: '12ms', load: 15 },
            { name: 'Logistics Routing', latency: '8ms', load: 88 },
        ];
    }, [activityData]);

    const renderInfrastructureTab = (
        <View style={styles.tabContent}>
            <View style={[styles.statusCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Chain Optimization</Text>
                {nodes.map((node: any, i: number) => (
                    <View key={i} style={styles.nodeRow}>
                        <View style={styles.nodeInfo}>
                            <Text style={[styles.nodeName, { color: theme.colors.text }]}>{node.name}</Text>
                            <Text style={[styles.nodeLatency, { color: theme.colors.primary }]}>{node.latency} Latency</Text>
                        </View>
                        <View style={styles.loadGrid}>
                            <View style={[styles.loadBar, { backgroundColor: theme.colors.background }]}>
                                <View style={[styles.loadFill, { width: `${node.load}%`, backgroundColor: node.load > 80 ? '#FF3B30' : theme.colors.primary }]} />
                            </View>
                            <Text style={styles.loadLabel}>{node.load}% LOAD</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    const customTabs = [
        { id: 'infra', label: 'Systems', icon: Database, component: renderInfrastructureTab }
    ];

    return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
    tabContent: { paddingBottom: 20 },
    statusCard: { padding: 24, borderRadius: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
    nodeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    nodeInfo: { flex: 1 },
    nodeName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
    nodeLatency: { fontSize: 11, fontWeight: '800' },
    loadGrid: { alignItems: 'flex-end', width: 100 },
    loadBar: { width: '100%', height: 6, borderRadius: 3, marginBottom: 4, overflow: 'hidden' },
    loadFill: { height: '100%' },
    loadLabel: { fontSize: 9, fontWeight: '800', opacity: 0.5 }
});
