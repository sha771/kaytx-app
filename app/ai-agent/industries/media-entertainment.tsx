import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { Tv, ArrowLeft, Phone, Users, MessageSquare, CreditCard, TrendingUp, Clock, Star, Zap, Shield, Globe, ChartBar, Heart, Play, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const USE_CASES = [
    { id: 'subscription', title: 'Subscription Support', description: 'Account management, billing, and plan changes', icon: CreditCard, color: '#4ECDC4', stats: { automated: '94%', avgTime: '1m', satisfaction: '4.8/5' } },
    { id: 'content', title: 'Content Discovery', description: 'Personalized recommendations and content search', icon: Play, color: '#6C5CE7', stats: { automated: '97%', avgTime: '15s', satisfaction: '4.9/5' }, isPremium: true },
    { id: 'community', title: 'Community Moderation', description: 'Automated content moderation and user responses', icon: Users, color: '#FF6B6B', stats: { automated: '89%', avgTime: '2s', satisfaction: '4.5/5' }, isPremium: true },
    { id: 'social', title: 'Social & Campaign', description: 'Social media management and campaign execution', icon: MessageSquare, color: '#00B894', stats: { automated: '91%', avgTime: '30s', satisfaction: '4.7/5' } },
];

const RECOMMENDED_AGENTS = ['ai-customer-support', 'ai-social-media-manager', 'ai-marketer', 'ai-campaign-optimizer', 'ai-data-analyst', 'ai-retention-specialist'];

export default function MediaEntertainmentScreen() {
    const { theme } = useTheme();
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

    // Fetch real-time industry-specific metrics from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'marketing-growth' });
    const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

    const isEnterprise = useMemo(() => {
        return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
    }, [subscription]);

    const industryMetrics = useMemo(() => [
        { label: 'Interactions/Day', value: statsData?.tasksToday ? `${(statsData.tasksToday / 5).toFixed(1)}K+` : '500K+', icon: MessageSquare, color: '#007AFF' },
        { label: 'Response Time', value: '<2s', icon: Clock, color: '#34C759' },
        { label: 'Churn Reduction', value: statsData?.avgSuccessRate ? `${(statsData.avgSuccessRate / 2).toFixed(1)}%` : '45%', icon: TrendingUp, color: '#FF9500' },
        { label: 'Engagement', value: '+65%', icon: Heart, color: '#5856D6' },
    ], [statsData]);

    const industryAgents = useMemo(() => aiEmployees.filter(emp =>
        emp.capabilities.some(cap =>
            cap.toLowerCase().includes('media') ||
            cap.toLowerCase().includes('entertainment') ||
            cap.toLowerCase().includes('content') ||
            cap.toLowerCase().includes('streaming') ||
            emp.category === 'marketing' ||
            emp.category === 'support'
        )
    ), []);

    const recommendedAIAgents = industryAgents.filter(emp => RECOMMENDED_AGENTS.includes(emp.id));

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Media & Entertainment', headerStyle: { backgroundColor: theme.colors.background }, headerTintColor: theme.colors.text, headerLeft: () => <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><ArrowLeft size={24} color={theme.colors.text} /></TouchableOpacity> }} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#8e2de2', '#4a00e0', '#6a11cb']} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={styles.heroIcon}><Tv size={48} color="#fff" /></View>
                    <Text style={styles.heroTitle}>Media & Entertainment</Text>
                    <Text style={styles.heroSubtitle}>Keep fans engaged across multiple support channels</Text>
                    <View style={styles.heroStats}>{industryMetrics.map((m, i) => { const I = m.icon; return <View key={i} style={styles.heroStatItem}><I size={20} color={m.color} /><Text style={styles.heroStatValue}>{m.value}</Text><Text style={styles.heroStatLabel}>{m.label}</Text></View>; })}</View>
                </LinearGradient>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Benefits</Text>
                    <View style={styles.benefitsGrid}>
                        {[{ icon: Zap, color: '#FF6B6B', title: 'Viral Event Ready', desc: 'Handle 100x engagement spikes' }, { icon: Globe, color: '#4ECDC4', title: 'Omnichannel', desc: 'Engage on all social platforms' }, { icon: Shield, color: '#6C5CE7', title: 'Content Safety', desc: 'AI-powered moderation' }, { icon: ChartBar, color: '#00B894', title: 'Fan Analytics', desc: 'Deep engagement insights' }].map((b, i) => { const I = b.icon; return <View key={i} style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}><I size={24} color={b.color} /><Text style={[styles.benefitTitle, { color: theme.colors.text }]}>{b.title}</Text><Text style={[styles.benefitDesc, { color: theme.colors.secondaryText }]}>{b.desc}</Text></View>; })}
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
                    {recommendedAIAgents.map(a => {
                        const I = a.icon;
                        const isLocked = a.isPremium && !isEnterprise;
                        return (
                            <TouchableOpacity
                                key={a.id}
                                style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
                                onPress={() => {
                                    if (isLocked) {
                                        router.push('/enterprise/billing');
                                        return;
                                    }
                                    router.push(a.route);
                                }}
                            >
                                <View style={[styles.agentIcon, { backgroundColor: a.color + '20' }]}><I size={28} color={a.color} /></View>
                                <View style={styles.agentInfo}>
                                    <View style={styles.agentTitleRow}>
                                        <Text style={[styles.agentName, { color: theme.colors.text }]}>{a.name}</Text>
                                        {isLocked && <Lock size={12} color={theme.colors.secondaryText} />}
                                    </View>
                                    <Text style={[styles.agentTitle, { color: theme.colors.secondaryText }]}>{a.title}</Text>
                                    <View style={styles.agentMetrics}>
                                        <View style={styles.metricBadge}><Text style={[styles.metricText, { color: a.color }]}>{a.efficiency}</Text></View>
                                    </View>
                                </View>
                                <View style={styles.agentCost}><Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>AI Cost</Text><Text style={[styles.costValue, { color: '#34C759' }]}>{a.aiCost}</Text></View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={[styles.cta, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.ctaTitle, { color: theme.colors.text }]}>Engage your audience like never before</Text>
                    <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/ai-agent/ai-agent')}><Text style={styles.ctaBtnText}>Get Started</Text></TouchableOpacity>
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
    agentMetrics: { flexDirection: 'row', gap: 8 },
    metricBadge: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(52,199,89,0.15)', borderRadius: 6 },
    metricText: { fontSize: 11, fontWeight: '700' },
    agentCost: { alignItems: 'flex-end' },
    costLabel: { fontSize: 11, marginBottom: 2 },
    costValue: { fontSize: 14, fontWeight: '700' },
    cta: { margin: 20, padding: 24, borderRadius: 20, alignItems: 'center' },
    ctaTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    ctaBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
    ctaBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
