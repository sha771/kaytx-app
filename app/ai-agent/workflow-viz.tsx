import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, GitMerge, Check, ArrowRight, Play, Server, Database } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WORKFLOWS = [
    {
        id: 'w1',
        name: 'Enterprise Onboarding Chain',
        status: 'active',
        industry: 'HR / Tech',
        steps: [
            { agent: 'AI Recruiter', action: 'Screen Candidate', status: 'completed' },
            { agent: 'AI Scheduler', action: 'Book Interview', status: 'completed' },
            { agent: 'AI Admin', action: 'Generate Contract', status: 'processing' },
            { agent: 'AI IT Ops', action: 'Provision Access', status: 'pending' },
        ]
    },
    {
        id: 'w2',
        name: 'Mortgage Approval Pipeline',
        status: 'active',
        industry: 'Finance',
        steps: [
            { agent: 'AI Receptionist', action: 'Intake Call', status: 'completed' },
            { agent: 'AI KYC User', action: 'Verify ID', status: 'completed' },
            { agent: 'AI Risk Analyst', action: 'Credit Check', status: 'processing' },
            { agent: 'AI Underwriter', action: 'Final Approval', status: 'pending' },
        ]
    },
    {
        id: 'w3',
        name: 'Global Supply Chain Re-route',
        status: 'completed',
        industry: 'Logistics',
        steps: [
            { agent: 'AI Monitor', action: 'Detect Delay', status: 'completed' },
            { agent: 'AI Logistics', action: 'Find Alt Route', status: 'completed' },
            { agent: 'AI Negotiator', action: 'Secure Rates', status: 'completed' },
            { agent: 'AI Dispatch', action: 'Update Driver', status: 'completed' },
        ]
    }
];

export default function WorkflowVizScreen() {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [activeFlow, setActiveFlow] = useState('w1');

    // Simple animation simulation
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: '#09090b' }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Multi-Agent Orchestration</Text>
                    <Text style={styles.subtitle}>Real-time Cross-Agent Workflows</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Active Visualization Area */}
                <View style={styles.vizContainer}>
                    <View style={styles.vizHeader}>
                        <GitMerge size={20} color="#4CD964" />
                        <Text style={styles.vizTitle}>LIVE EXECUTION GRAPH</Text>
                    </View>

                    <View style={styles.graphArea}>
                        {WORKFLOWS.find(w => w.id === activeFlow)?.steps.map((step, i, arr) => (
                            <View key={i} style={styles.stepWrapper}>
                                {/* Connector Line */}
                                {i < arr.length - 1 && (
                                    <View style={[styles.connectorLine, step.status === 'completed' && { backgroundColor: '#4CD964' }]} />
                                )}

                                <View style={[
                                    styles.node,
                                    step.status === 'processing' && { borderColor: '#4CD964', borderWidth: 2, backgroundColor: 'rgba(76, 217, 100, 0.1)' },
                                    step.status === 'completed' && { backgroundColor: 'rgba(76, 217, 100, 0.2)', borderColor: 'transparent' }
                                ]}>
                                    {step.status === 'processing' && <View style={styles.pulse} />}
                                    <Text style={styles.nodeAgent}>{step.agent}</Text>
                                    <Text style={styles.nodeAction}>{step.action}</Text>
                                    {step.status === 'completed' && <View style={styles.checkBadge}><Check size={10} color="#000" /></View>}
                                </View>

                                {i < arr.length - 1 && (
                                    <View style={styles.arrowContainer}>
                                        <ArrowRight size={16} color={step.status === 'completed' ? '#4CD964' : '#333'} />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <Text style={styles.sectionHeader}>Active Workflows</Text>

                {WORKFLOWS.map(flow => (
                    <TouchableOpacity
                        key={flow.id}
                        style={[styles.flowCard, activeFlow === flow.id && styles.activeFlow]}
                        onPress={() => setActiveFlow(flow.id)}
                    >
                        <View style={styles.flowHeader}>
                            <View style={styles.flowIcon}>
                                <Play size={16} color="#fff" />
                            </View>
                            <View style={styles.flowInfo}>
                                <Text style={styles.flowName}>{flow.name}</Text>
                                <Text style={styles.flowMeta}>{flow.industry} • {flow.steps.length} Agents</Text>
                            </View>
                            <View style={[styles.statusBadge, flow.status === 'active' ? { backgroundColor: '#4CD96420' } : { backgroundColor: '#333' }]}>
                                <Text style={[styles.statusText, flow.status === 'active' && { color: '#4CD964' }]}>
                                    {flow.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    title: { color: '#fff', fontSize: 18, fontWeight: '800' },
    subtitle: { color: '#666', fontSize: 12 },
    content: { flex: 1, padding: 20 },
    vizContainer: { height: 320, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, marginBottom: 30, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    vizHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
    vizTitle: { color: '#4CD964', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
    graphArea: { flex: 1, justifyContent: 'center', gap: 10 },
    stepWrapper: { flexDirection: 'row', alignItems: 'center', position: 'relative', marginBottom: 20 },
    node: { width: 140, padding: 12, borderRadius: 12, backgroundColor: '#1c1c1e', borderLeftWidth: 3, borderLeftColor: '#666' },
    nodeAgent: { color: '#888', fontSize: 10, fontWeight: '700', marginBottom: 4 },
    nodeAction: { color: '#fff', fontSize: 12, fontWeight: '600' },
    connectorLine: { position: 'absolute', left: 20, top: 40, width: 2, height: 20, backgroundColor: '#333', zIndex: -1 },
    arrowContainer: { marginLeft: 10 },
    pulse: { position: 'absolute', top: -5, right: -5, width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CD964' },
    checkBadge: { position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: 8, backgroundColor: '#4CD964', alignItems: 'center', justifyContent: 'center' },
    sectionHeader: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 15 },
    flowCard: { padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 10, borderWidth: 1, borderColor: 'transparent' },
    activeFlow: { borderColor: '#4CD964', backgroundColor: 'rgba(76, 217, 100, 0.05)' },
    flowHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    flowIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    flowInfo: { flex: 1 },
    flowName: { color: '#fff', fontSize: 14, fontWeight: '700' },
    flowMeta: { color: '#666', fontSize: 11 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: { color: '#ccc', fontSize: 10, fontWeight: '800' }
});
