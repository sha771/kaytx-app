import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import {
    Plane,
    ArrowLeft,
    CircleCheckBig,
    TrendingUp,
    Clock,
    Users,
    Headphones,
    RefreshCw,
    Luggage,
    MapPin,
    Calendar,
    TriangleAlert,
    Star,
    Zap,
    Shield,
    Globe,
    Phone,
    MessageSquare,
    ChartBarBig,
    Lock,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AIRLINE_USE_CASES = [
    {
        id: 'disruption',
        title: 'Flight Disruption Management',
        description: 'Automated rebooking, delay notifications, and compensation processing during IRROPS',
        icon: TriangleAlert,
        color: '#FF6B6B',
        stats: { automated: '94%', avgTime: '45s', satisfaction: '4.8/5' },
        isPremium: true,
    },
    {
        id: 'booking',
        title: 'Booking & Reservations',
        description: 'Handle new bookings, modifications, upgrades, and seat selections 24/7',
        icon: Calendar,
        color: '#4ECDC4',
        stats: { automated: '89%', avgTime: '2m', satisfaction: '4.7/5' },
    },
    {
        id: 'baggage',
        title: 'Baggage Claims & Tracking',
        description: 'Real-time baggage status, delayed bag claims, and delivery coordination',
        icon: Luggage,
        color: '#45B7D1',
        stats: { automated: '91%', avgTime: '1m', satisfaction: '4.6/5' },
    },
    {
        id: 'loyalty',
        title: 'Loyalty Program Support',
        description: 'Miles inquiries, tier benefits, partner redemptions, and status matching',
        icon: Star,
        color: '#F9CA24',
        stats: { automated: '96%', avgTime: '30s', satisfaction: '4.9/5' },
        isPremium: true,
    },
    {
        id: 'checkin',
        title: 'Check-in & Boarding',
        description: 'Mobile check-in assistance, boarding pass issues, and gate information',
        icon: MapPin,
        color: '#6C5CE7',
        stats: { automated: '97%', avgTime: '20s', satisfaction: '4.8/5' },
    },
    {
        id: 'refunds',
        title: 'Refunds & Compensation',
        description: 'Process EU261 claims, voluntary changes refunds, and travel vouchers',
        icon: RefreshCw,
        color: '#00B894',
        stats: { automated: '85%', avgTime: '3m', satisfaction: '4.5/5' },
        isPremium: true,
    },
];

const AIRLINE_METRICS = [
    { label: 'Calls Handled/Day', value: '50K+', icon: Phone, color: '#007AFF' },
    { label: 'Avg Resolution Time', value: '45s', icon: Clock, color: '#34C759' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: Star, color: '#FF9500' },
    { label: 'Cost Reduction', value: '78%', icon: TrendingUp, color: '#5856D6' },
];

const RECOMMENDED_AGENTS = [
    'ai-receptionist',
    'ai-customer-support',
    'ai-operations-manager',
    'ai-data-analyst',
    'ai-retention-specialist',
    'ai-crm-assistant',
];

export default function AirlineIndustryScreen() {
    const { theme } = useTheme();
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

    // Fetch real-time industry-specific metrics from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'customer-experience' });
    const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

    const isEnterprise = useMemo(() => {
        return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
    }, [subscription]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isEnterprise) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [isEnterprise, fadeAnim]);

    const industryMetrics = useMemo(() => [
        { label: 'Calls Handled/Day', value: statsData?.tasksToday ? `${(statsData.tasksToday / 10).toFixed(1)}K+` : '50K+', icon: Phone, color: '#007AFF' },
        { label: 'Avg Resolution Time', value: '45s', icon: Clock, color: '#34C759' },
        { label: 'Customer Satisfaction', value: statsData?.avgSuccessRate ? `${(statsData.avgSuccessRate / 20).toFixed(1)}/5` : '4.8/5', icon: Star, color: '#FF9500' },
        { label: 'Cost Reduction', value: '78%', icon: TrendingUp, color: '#5856D6' },
    ], [statsData]);

    const recommendedAIAgents = aiEmployees.filter(emp => RECOMMENDED_AGENTS.includes(emp.id));

    const renderUseCaseCard = (useCase: typeof AIRLINE_USE_CASES[0]) => {
        const IconComponent = useCase.icon;
        const isSelected = selectedUseCase === useCase.id;
        const isLocked = useCase.isPremium && !isEnterprise;

        return (
            <TouchableOpacity
                key={useCase.id}
                style={[
                    styles.useCaseCard,
                    { backgroundColor: theme.colors.cardBackground },
                    isSelected && { borderColor: useCase.color, borderWidth: 2 },
                ]}
                onPress={() => {
                    if (isLocked) {
                        router.push('/enterprise/billing');
                        return;
                    }
                    setSelectedUseCase(isSelected ? null : useCase.id);
                }}
                activeOpacity={0.7}
            >
                <View style={styles.useCaseHeader}>
                    <View style={[styles.useCaseIconContainer, { backgroundColor: useCase.color + '20' }]}>
                        <IconComponent size={24} color={useCase.color} />
                    </View>
                    {isLocked && <Lock size={16} color={theme.colors.secondaryText} />}
                </View>
                <Text style={[styles.useCaseTitle, { color: theme.colors.text }]}>{useCase.title}</Text>
                <Text style={[styles.useCaseDescription, { color: theme.colors.secondaryText }]}>
                    {useCase.description}
                </Text>

                {isSelected && !isLocked && (
                    <View style={styles.useCaseStats}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: useCase.color }]}>{useCase.stats.automated}</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Automated</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: useCase.color }]}>{useCase.stats.avgTime}</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: useCase.color }]}>{useCase.stats.satisfaction}</Text>
                            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>CSAT</Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderAgentCard = (agent: typeof aiEmployees[0]) => {
        const IconComponent = agent.icon;
        const isLocked = agent.isPremium && !isEnterprise;

        return (
            <TouchableOpacity
                key={agent.id}
                style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => {
                    if (isLocked) {
                        router.push('/enterprise/billing');
                        return;
                    }
                    router.push(agent.route);
                }}
                activeOpacity={0.7}
            >
                <View style={[styles.agentIconContainer, { backgroundColor: agent.color + '20' }]}>
                    <IconComponent size={28} color={agent.color} />
                </View>
                <View style={styles.agentInfo}>
                    <View style={styles.agentTitleRow}>
                        <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                        {isLocked && <Lock size={12} color={theme.colors.secondaryText} />}
                    </View>
                    <Text style={[styles.agentTitle, { color: theme.colors.secondaryText }]}>{agent.title}</Text>
                    <View style={styles.agentMetrics}>
                        <View style={styles.metricBadge}>
                            <Text style={[styles.metricText, { color: agent.color }]}>{agent.efficiency}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.agentCost}>
                    <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>AI Cost</Text>
                    <Text style={[styles.costValue, { color: '#34C759' }]}>{agent.aiCost}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen
                options={{
                    title: 'Airline Industry',
                    headerStyle: { backgroundColor: theme.colors.background },
                    headerTintColor: theme.colors.text,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <ArrowLeft size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <LinearGradient
                    colors={['#1a1a2e', '#16213e', '#0f3460']}
                    style={styles.heroSection}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.heroIconContainer}>
                        <Plane size={48} color="#fff" />
                    </View>
                    <Text style={styles.heroTitle}>Airline Industry</Text>
                    <Text style={styles.heroSubtitle}>
                        Automate bookings, changes, and high-volume disruption support with AI-powered customer service
                    </Text>

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

                {/* Key Benefits */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Benefits</Text>
                    <View style={styles.benefitsGrid}>
                        <View style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Zap size={24} color="#FF6B6B" />
                            <Text style={[styles.benefitTitle, { color: theme.colors.text }]}>IRROPS Ready</Text>
                            <Text style={[styles.benefitDescription, { color: theme.colors.secondaryText }]}>
                                Handle 10x call volume during flight disruptions automatically
                            </Text>
                        </View>
                        <View style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Globe size={24} color="#4ECDC4" />
                            <Text style={[styles.benefitTitle, { color: theme.colors.text }]}>24/7 Global</Text>
                            <Text style={[styles.benefitDescription, { color: theme.colors.secondaryText }]}>
                                Support passengers across all time zones in 40+ languages
                            </Text>
                        </View>
                        <View style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Shield size={24} color="#6C5CE7" />
                            <Text style={[styles.benefitTitle, { color: theme.colors.text }]}>PCI Compliant</Text>
                            <Text style={[styles.benefitDescription, { color: theme.colors.secondaryText }]}>
                                Secure payment processing for bookings and refunds
                            </Text>
                        </View>
                        <View style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <ChartBarBig size={24} color="#00B894" />
                            <Text style={[styles.benefitTitle, { color: theme.colors.text }]}>Real-time Analytics</Text>
                            <Text style={[styles.benefitDescription, { color: theme.colors.secondaryText }]}>
                                Track performance, identify trends, optimize operations
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Use Cases */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Primary Use Cases</Text>
                    <Text style={[styles.sectionSubtitle, { color: theme.colors.secondaryText }]}>
                        Tap to see detailed metrics for each automation
                    </Text>
                    <View style={styles.useCasesGrid}>
                        {AIRLINE_USE_CASES.map(renderUseCaseCard)}
                    </View>
                </View>

                {/* Recommended AI Agents */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recommended AI Agents</Text>
                    <Text style={[styles.sectionSubtitle, { color: theme.colors.secondaryText }]}>
                        Pre-configured agents optimized for airline operations
                    </Text>
                    <View style={styles.agentsContainer}>
                        {recommendedAIAgents.map(renderAgentCard)}
                    </View>
                </View>

                {/* CTA Section */}
                <View style={[styles.ctaSection, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.ctaTitle, { color: theme.colors.text }]}>Ready to transform your airline support?</Text>
                    <Text style={[styles.ctaDescription, { color: theme.colors.secondaryText }]}>
                        Deploy AI agents tailored for airline operations in under 24 hours
                    </Text>
                    <TouchableOpacity
                        style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
                        onPress={() => router.push('/ai-agent/ai-agent')}
                    >
                        <Text style={styles.ctaButtonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        padding: 8,
        marginLeft: 8,
    },
    content: {
        flex: 1,
    },
    heroSection: {
        padding: 24,
        paddingTop: 32,
        paddingBottom: 32,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 24,
    },
    heroIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
        marginBottom: 24,
    },
    heroStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    heroStatItem: {
        alignItems: 'center',
        minWidth: (width - 80) / 4,
    },
    heroStatValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        marginTop: 6,
    },
    heroStatLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
        textAlign: 'center',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 6,
    },
    sectionSubtitle: {
        fontSize: 14,
        marginBottom: 16,
    },
    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    benefitCard: {
        width: (width - 52) / 2,
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    benefitTitle: {
        fontSize: 15,
        fontWeight: '700',
    },
    benefitDescription: {
        fontSize: 12,
        lineHeight: 18,
    },
    useCasesGrid: {
        gap: 12,
    },
    useCaseCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    useCaseIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    useCaseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    useCaseTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    useCaseDescription: {
        fontSize: 13,
        lineHeight: 19,
    },
    useCaseStats: {
        flexDirection: 'row',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(150,150,150,0.2)',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
    },
    statLabel: {
        fontSize: 11,
        marginTop: 2,
    },
    agentsContainer: {
        gap: 12,
    },
    agentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 14,
    },
    agentIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    agentInfo: {
        flex: 1,
    },
    agentTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    agentName: {
        fontSize: 16,
        fontWeight: '700',
    },
    agentTitle: {
        fontSize: 12,
        marginBottom: 6,
    },
    agentMetrics: {
        flexDirection: 'row',
        gap: 8,
    },
    metricBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(52,199,89,0.15)',
        borderRadius: 6,
    },
    metricText: {
        fontSize: 11,
        fontWeight: '700',
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    premiumText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFD700',
    },
    agentCost: {
        alignItems: 'flex-end',
    },
    costLabel: {
        fontSize: 11,
        marginBottom: 2,
    },
    costValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    ctaSection: {
        margin: 20,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    ctaTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
    },
    ctaDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    ctaButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    ctaButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

