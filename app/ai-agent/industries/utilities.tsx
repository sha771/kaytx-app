import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import {
    Zap,
    ArrowLeft, AlertTriangle, CreditCard, Home, TrendingUp, Clock, Shield, Globe, BarChart3, Wrench, Activity, Lock, CheckCircle, ChevronRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const USE_CASES = [
    { id: 'outages', title: 'Outage Reporting', description: 'Proactive outage notifications and restoration updates', icon: AlertTriangle, color: '#FF6B6B', stats: { automated: '96%', avgTime: '20s', satisfaction: '4.5/5' }, isPremium: true },
    { id: 'billing', title: 'Billing & Payments', description: 'Payment plans, billing inquiries, and account updates', icon: CreditCard, color: '#4ECDC4', stats: { automated: '93%', avgTime: '1m', satisfaction: '4.7/5' } },
    { id: 'movein', title: 'Move-in / Move-out', description: 'Service activation, transfers, and final bill processing', icon: Home, color: '#6C5CE7', stats: { automated: '91%', avgTime: '2m', satisfaction: '4.8/5' }, isPremium: true },
    { id: 'service', title: 'Field Service Scheduling', description: 'Appointment scheduling and technician dispatch', icon: Wrench, color: '#00B894', stats: { automated: '88%', avgTime: '3m', satisfaction: '4.6/5' }, isPremium: true },
];

const _RECOMMENDED_AGENTS = ['ai-receptionist', 'ai-customer-support', 'ai-operations-manager', 'ai-manager', 'ai-data-analyst'];

export default function UtilitiesIndustryScreen() {
    const { theme } = useTheme();
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

    // Fetch real-time industry-specific metrics from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'operations-management' });
    const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

    const isEnterprise = useMemo(() => {
        return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
    }, [subscription]);

    const industryMetrics = useMemo(() => [
        { label: 'Outage Alerts/Day', value: statsData?.tasksToday ? `${(statsData.tasksToday / 20).toFixed(1)}K+` : '15K+', icon: Zap, color: '#007AFF' },
        { label: 'Avg Dispatch Time', value: '8.5m', icon: Clock, color: '#34C759' },
        { label: 'Grid Uptime', value: statsData?.avgHealthScore ? `${statsData.avgHealthScore}%` : '99.9%', icon: Activity, color: '#FF9500' },
        { label: 'Op Efficiency', value: statsData?.avgSuccessRate ? `${(statsData.avgSuccessRate / 5).toFixed(1)}x` : '12x', icon: TrendingUp, color: '#5856D6' },
    ], [statsData]);

    const industryAgents = useMemo(() => aiEmployees.filter(emp =>
        emp.capabilities.some(cap =>
            cap.toLowerCase().includes('utility') ||
            cap.toLowerCase().includes('energy') ||
            cap.toLowerCase().includes('water') ||
            cap.toLowerCase().includes('electricity') ||
            cap.toLowerCase().includes('gas') ||
            emp.category === 'support' ||
            emp.category === 'operations'
        )
    ), []);

    const renderAgent = ({ item }: { item: typeof aiEmployees[0] }) => {
        const IconComponent = item.icon;
        const isLocked = item.isPremium && !isEnterprise;

        return (
            <TouchableOpacity
                style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => {
                    if (isLocked) {
                        router.push('/enterprise/billing');
                        return;
                    }
                    router.push(item.route as any);
                }}
            >
                <View style={[styles.agentIcon, { backgroundColor: item.color + '15' }]}>
                    <IconComponent size={24} color={item.color} />
                </View>
                <View style={styles.agentInfo}>
                    <View style={styles.agentTitleRow}>
                        <Text style={[styles.agentName, { color: theme.colors.text }]}>
                            {item.name}
                        </Text>
                        {isLocked ? (
                            <Lock size={12} color={theme.colors.secondaryText} />
                        ) : (
                            <View style={[styles.statusDot, { backgroundColor: item.infrastructure.status === 'online' ? '#34C759' : '#8E8E93' }]} />
                        )}
                    </View>
                    <Text style={[styles.agentDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <View style={styles.agentMetrics}>
                        <View style={styles.metric}>
                            <TrendingUp size={12} color="#34C759" />
                            <Text style={[styles.metricText, { color: '#34C759' }]}>{item.efficiency}</Text>
                        </View>
                        <View style={styles.metric}>
                            <CheckCircle size={12} color={theme.colors.primary} />
                            <Text style={[styles.metricText, { color: theme.colors.primary }]}>{item.roiMetrics.accuracyRate}</Text>
                        </View>
                    </View>
                </View>
                <ChevronRight size={20} color={theme.colors.border} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Utilities', headerStyle: { backgroundColor: theme.colors.background }, headerTintColor: theme.colors.text, headerLeft: () => <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><ArrowLeft size={24} color={theme.colors.text} /></TouchableOpacity> }} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#1a472a', '#2d5a3f', '#3d7a50']} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={styles.heroIcon}><Zap size={48} color="#fff" /></View>
                    <Text style={styles.heroTitle}>Utilities</Text>
                    <Text style={styles.heroSubtitle}>Automate high-volume outages and billing questions without wait times</Text>
                    <View style={styles.heroStats}>
                        {industryMetrics.map((metric, index) => {
                            const IconComponent = metric.icon;
                            return (
                                <View key={index} style={styles.heroStatItem}>
                                    <IconComponent size={20} color={metric.color} />
                                    <Text style={styles.heroStatValue}>{metric.value}</Text>
                                    <Text style={styles.heroStatLabel}>{metric.label}</Text>
                                </View>
                            );
                        })}
                    </View>
                </LinearGradient>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Benefits</Text>
                    <View style={styles.benefitsGrid}>
                        {[{ icon: Zap, color: '#FF6B6B', title: 'Storm Surge Ready', desc: 'Handle 50x call volume during emergencies' }, { icon: Globe, color: '#4ECDC4', title: '24/7 Availability', desc: 'Round-the-clock customer support' }, { icon: Shield, color: '#6C5CE7', title: 'PCI Compliant', desc: 'Secure payment processing' }, { icon: BarChart3, color: '#00B894', title: 'Predictive Ops', desc: 'AI-powered demand forecasting' }].map((b, i) => { const I = b.icon; return <View key={i} style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}><I size={24} color={b.color} /><Text style={[styles.benefitTitle, { color: theme.colors.text }]}>{b.title}</Text><Text style={[styles.benefitDesc, { color: theme.colors.secondaryText }]}>{b.desc}</Text></View>; })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Use Cases</Text>
                    {USE_CASES.map(uc => {
                        const I = uc.icon;
                        const sel = selectedUseCase === uc.id;
                        const isLocked = uc.isPremium && !isEnterprise;
                        return (
                            <TouchableOpacity
                                key={uc.id}
                                style={[styles.useCaseCard, { backgroundColor: theme.colors.cardBackground }, sel && { borderColor: uc.color, borderWidth: 2 }]}
                                onPress={() => {
                                    if (isLocked) {
                                        router.push('/enterprise/billing');
                                        return;
                                    }
                                    setSelectedUseCase(sel ? null : uc.id);
                                }}
                            >
                                <View style={styles.useCaseHeader}>
                                    <View style={[styles.useCaseIcon, { backgroundColor: uc.color + '20' }]}>
                                        <I size={24} color={uc.color} />
                                    </View>
                                    {isLocked && <Lock size={16} color={theme.colors.secondaryText} />}
                                </View>
                                <Text style={[styles.useCaseTitle, { color: theme.colors.text }]}>{uc.title}</Text>
                                <Text style={[styles.useCaseDesc, { color: theme.colors.secondaryText }]}>{uc.description}</Text>
                                {sel && !isLocked && (
                                    <View style={styles.useCaseStats}>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.automated}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Automated</Text></View>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.avgTime}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text></View>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.satisfaction}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>CSAT</Text></View>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recommended AI Agents</Text>
                    <FlatList
                        data={industryAgents}
                        renderItem={renderAgent}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={[styles.cta, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.ctaTitle, { color: theme.colors.text }]}>Transform your utility operations</Text>
                    <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/ai-agent/ai-agent' as any)}><Text style={styles.ctaBtnText}>Get Started</Text></TouchableOpacity>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    backBtn: { padding: 8, marginLeft: 8 },
    content: { flex: 1 },
    hero: { padding: 24, paddingTop: 32, paddingBottom: 32, marginHorizontal: 16, marginTop: 16, borderRadius: 24 },
    heroIcon: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8 },
    heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 22, marginBottom: 24 },
    heroStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
    heroStatItem: { alignItems: 'center', minWidth: (width - 80) / 4 },
    heroStatValue: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 6 },
    heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2, textAlign: 'center' },
    section: { padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
    benefitsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    benefitCard: { width: (width - 52) / 2, padding: 16, borderRadius: 16, gap: 8 },
    benefitTitle: { fontSize: 15, fontWeight: '700' },
    benefitDesc: { fontSize: 12, lineHeight: 18 },
    useCaseCard: { padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: 'transparent' },
    useCaseIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    useCaseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    useCaseTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    useCaseDesc: { fontSize: 13, lineHeight: 19 },
    useCaseStats: { flexDirection: 'row', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.2)', justifyContent: 'space-around' },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: '800' },
    statLabel: { fontSize: 11, marginTop: 2 },
    agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 14, marginBottom: 12 },
    agentIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    agentInfo: { flex: 1 },
    agentTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
    agentName: { fontSize: 16, fontWeight: '700' },
    agentTitle: { fontSize: 12, marginBottom: 6 },
    agentDescription: { fontSize: 12, lineHeight: 18, marginTop: 4 },
    agentMetrics: { flexDirection: 'row', gap: 8 },
    metric: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metricBadge: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(52,199,89,0.15)', borderRadius: 6 },
    metricText: { fontSize: 11, fontWeight: '700' },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    costLabel: { fontSize: 11, marginBottom: 2 },
    costValue: { fontSize: 14, fontWeight: '700' },
    cta: { margin: 20, padding: 24, borderRadius: 20, alignItems: 'center' },
    ctaTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    ctaBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
    ctaBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
