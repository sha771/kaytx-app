 
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    LineChart,
    PieChart,
    Activity,
    TrendingUp,
    Zap,
    Target,
    ChevronRight,
    Info
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PredictiveMetricsScreen() {
    const { theme } = useTheme();

    const forecastData = [
        { period: 'Q1 2026', revenue: '$1.2M', growth: '+15%', confidence: '92%' },
        { period: 'Q2 2026', revenue: '$1.4M', growth: '+22%', confidence: '88%' },
        { period: 'Q3 2026', revenue: '$1.8M', growth: '+28%', confidence: '84%' },
    ];

    const opportunities = [
        { title: 'Market Expansion', impact: 'High', source: 'Asia-Pacific demand spike' },
        { title: 'Product Upsell', impact: 'Medium', source: 'Enterprise feature usage' },
        { title: 'Ad Optimization', impact: 'High', source: 'Lower CPC trending' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Predictive Metrics' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Predictive Metrics</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>AI-modeled financial forecasting and growth opportunity identification.</Text>
                </View>

                <View style={[styles.heroCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <View style={styles.heroHeader}>
                        <TrendingUp color={theme.colors.primary} size={24} />
                        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>FY2026 Revenue Forecast</Text>
                    </View>
                    <View style={styles.heroMain}>
                        <Text style={[styles.heroValue, { color: theme.colors.text }]}>$5.8M</Text>
                        <View style={[styles.growthPill, { backgroundColor: '#34C75920' }]}>
                            <Text style={[styles.growthText, { color: '#34C759' }]}>+32.4% Est.</Text>
                        </View>
                    </View>
                    <Text style={[styles.heroSubtext, { color: theme.colors.secondaryText }]}>Based on current market velocity and adoption rates.</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quarterly Projections</Text>
                {forecastData.map((item, index) => (
                    <View key={index} style={[styles.forecastRow, { borderBottomColor: theme.colors.border }]}>
                        <View style={styles.periodCol}>
                            <Text style={[styles.periodText, { color: theme.colors.text }]}>{item.period}</Text>
                            <Text style={[styles.confidenceText, { color: theme.colors.secondaryText }]}>{item.confidence} Confidence</Text>
                        </View>
                        <View style={styles.valueCol}>
                            <Text style={[styles.revenueText, { color: theme.colors.text }]}>{item.revenue}</Text>
                            <Text style={[styles.growthLabel, { color: '#34C759' }]}>{item.growth}</Text>
                        </View>
                    </View>
                ))}

                <View style={[styles.aiInsightRow, { backgroundColor: theme.colors.primary + '10' }]}>
                    <Zap size={20} color={theme.colors.primary} />
                    <Text style={[styles.aiInsightText, { color: theme.colors.text }]}>
                        AI detected a 15% increase in retention probability for users who use the CRM automation features.
                    </Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Growth Opportunities</Text>
                <View style={styles.opportunitiesGrid}>
                    {opportunities.map((opp, index) => (
                        <TouchableOpacity key={index} style={[styles.oppCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <Target size={24} color={theme.colors.primary} />
                            <Text style={[styles.oppTitle, { color: theme.colors.text }]}>{opp.title}</Text>
                            <View style={[styles.impactBadge, { backgroundColor: opp.impact === 'High' ? '#FF3B3020' : '#FF950020' }]}>
                                <Text style={[styles.impactText, { color: opp.impact === 'High' ? '#FF3B30' : '#FF9500' }]}>{opp.impact} Impact</Text>
                            </View>
                            <Text style={[styles.oppSource, { color: theme.colors.secondaryText }]}>{opp.source}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={[styles.exportButton, { borderColor: theme.colors.primary }]}>
                    <Text style={[styles.exportText, { color: theme.colors.primary }]}>Export Predicted Financial Model</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
    },
    heroCard: {
        padding: 20,
        borderRadius: 24,
        marginBottom: 32,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 10,
    },
    heroMain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    heroValue: {
        fontSize: 42,
        fontWeight: '800',
        marginRight: 16,
    },
    growthPill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    growthText: {
        fontSize: 14,
        fontWeight: '700',
    },
    heroSubtext: {
        fontSize: 13,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    forecastRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    periodCol: {
        flex: 1,
    },
    periodText: {
        fontSize: 17,
        fontWeight: '600',
    },
    confidenceText: {
        fontSize: 13,
        marginTop: 2,
    },
    valueCol: {
        alignItems: 'flex-end',
    },
    revenueText: {
        fontSize: 17,
        fontWeight: '700',
    },
    growthLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
    },
    aiInsightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginVertical: 24,
    },
    aiInsightText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        lineHeight: 20,
    },
    opportunitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 32,
    },
    oppCard: {
        width: (width - 56) / 2,
        padding: 16,
        borderRadius: 20,
        alignItems: 'flex-start',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    oppTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 8,
    },
    impactBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 8,
    },
    impactText: {
        fontSize: 11,
        fontWeight: '800',
    },
    oppSource: {
        fontSize: 12,
        lineHeight: 16,
    },
    exportButton: {
        borderWidth: 2,
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 40,
    },
    exportText: {
        fontSize: 16,
        fontWeight: '700',
    },
});
