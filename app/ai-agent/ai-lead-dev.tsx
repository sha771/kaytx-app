import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Target, Users, Zap, Mail, MessageSquare, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';

export default function AILeadDevScreen() {
    const { theme } = useTheme();
    const agent = aiEmployees.find(e => e.id === 'ai-lead-dev')!;

    const renderProspectingTab = (
        <View style={styles.tabContent}>
            <View style={[styles.funnelCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Lead Generation Funnel</Text>
                <View style={styles.funnelStats}>
                    <View style={styles.fItem}>
                        <Text style={[styles.fVal, { color: theme.colors.primary }]}>1,420</Text>
                        <Text style={styles.fLab}>IDENTIFIED</Text>
                    </View>
                    <View style={styles.fItem}>
                        <Text style={[styles.fVal, { color: '#34C759' }]}>342</Text>
                        <Text style={styles.fLab}>QUALIFIED</Text>
                    </View>
                    <View style={styles.fItem}>
                        <Text style={[styles.fVal, { color: '#FF9500' }]}>84</Text>
                        <Text style={styles.fLab}>PASSED</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const customTabs = [
        { id: 'prospecting', label: 'Funnel Metrics', icon: Target, component: renderProspectingTab }
    ];

    return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
    tabContent: { paddingBottom: 20 },
    funnelCard: { padding: 24, borderRadius: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
    funnelStats: { flexDirection: 'row', justifyContent: 'space-between' },
    fItem: { flex: 1, alignItems: 'center' },
    fVal: { fontSize: 20, fontWeight: '900', marginBottom: 2 },
    fLab: { fontSize: 9, fontWeight: '800', opacity: 0.5 }
});
