import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    BarChart3,
    TrendingUp,
    Users,
    Brain,
    Smile,
    Frown,
    Meh,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CustomerInsightsScreen() {
    const { theme } = useTheme();

    const sentimentData = [
        { label: 'Positive', value: 68, icon: Smile, color: '#34C759' },
        { label: 'Neutral', value: 22, icon: Meh, color: '#FF9500' },
        { label: 'Negative', value: 10, icon: Frown, color: '#FF3B30' },
    ];

    const highPotentialLeads = [
        { name: 'Global Tech Corp', score: 98, value: '$120k', reason: 'High engagement, frequent API calls' },
        { name: 'Innovate SL', score: 94, value: '$45k', reason: 'Multiple team members onboarded' },
        { name: 'Future Systems', score: 89, value: '$82k', reason: 'Upgrading from basic tier' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Customer Insights' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>AI Customer Insights</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Deep analysis of sentiment, intent, and growth potential.</Text>
                </View>

                <View style={[styles.aiCard, { backgroundColor: theme.colors.primary }]}>
                    <View style={styles.aiHeader}>
                        <Brain color="white" size={24} />
                        <Text style={styles.aiTitle}>AI Summary</Text>
                    </View>
                    <Text style={styles.aiText}>
                        Overall customer sentiment is trending up by 12% this week. Enterprise leads are showing a 40% increase in product-qualified signals. Recommended action: Prioritize Global Tech Corp for immediate follow-up.
                    </Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sentiment Analysis</Text>
                <View style={styles.sentimentRow}>
                    {sentimentData.map((item) => {
                        const Icon = item.icon;
                        return (
                            <View key={item.label} style={[styles.sentimentCard, { backgroundColor: theme.colors.cardBackground }]}>
                                <Icon color={item.color} size={28} />
                                <Text style={[styles.sentimentValue, { color: theme.colors.text }]}>{item.value}%</Text>
                                <Text style={[styles.sentimentLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
                            </View>
                        );
                    })}
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>High Potential Leads (AI Scored)</Text>
                {highPotentialLeads.map((lead, index) => (
                    <TouchableOpacity key={index} style={[styles.leadCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.leadHeader}>
                            <View>
                                <Text style={[styles.leadName, { color: theme.colors.text }]}>{lead.name}</Text>
                                <Text style={[styles.leadReason, { color: theme.colors.secondaryText }]}>{lead.reason}</Text>
                            </View>
                            <View style={[styles.scoreBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                                <Text style={[styles.scoreText, { color: theme.colors.primary }]}>{lead.score}</Text>
                            </View>
                        </View>
                        <View style={styles.leadMeta}>
                            <Text style={[styles.leadValue, { color: theme.colors.text }]}>{lead.value} Potential</Text>
                            <ArrowUpRight size={16} color="#34C759" />
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Behavioral Trends</Text>
                <View style={[styles.trendCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <View style={styles.trendRow}>
                        <Activity size={20} color={theme.colors.primary} />
                        <Text style={[styles.trendLabel, { color: theme.colors.text }]}>App Engagement</Text>
                        <ArrowUpRight size={20} color="#34C759" />
                        <Text style={styles.trendValue}>+24%</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.trendRow}>
                        <Users size={20} color={theme.colors.primary} />
                        <Text style={[styles.trendLabel, { color: theme.colors.text }]}>Churn Risk (AI detected)</Text>
                        <ArrowDownRight size={20} color="#FF3B30" />
                        <Text style={[styles.trendValue, { color: '#FF3B30' }]}>-5%</Text>
                    </View>
                </View>
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
        lineHeight: 20,
    },
    aiCard: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 32,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    aiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    aiTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },
    aiText: {
        color: 'white',
        fontSize: 15,
        lineHeight: 22,
        opacity: 0.9,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        marginTop: 8,
    },
    sentimentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    sentimentCard: {
        width: (width - 60) / 3,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    sentimentValue: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 12,
    },
    sentimentLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    leadCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    leadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    leadName: {
        fontSize: 17,
        fontWeight: '700',
    },
    leadReason: {
        fontSize: 13,
        marginTop: 2,
    },
    scoreBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    scoreText: {
        fontWeight: '800',
        fontSize: 14,
    },
    leadMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leadValue: {
        fontSize: 15,
        fontWeight: '600',
    },
    trendCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    trendLabel: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '600',
    },
    trendValue: {
        color: '#34C759',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        width: '100%',
    },
});
