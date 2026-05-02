 
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
    Users,
    Calendar,
    Clock,
    SquareCheck,
    CircleAlert,
    ChartBar,
    ChevronRight,
    UserPlus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

const TEAM_MEMBERS = [
    { id: '1', name: 'Dev Team', load: 85, tasks: 12, availability: 'Low' },
    { id: '2', name: 'Design Team', load: 40, tasks: 4, availability: 'High' },
    { id: '3', name: 'Marketing PR', load: 95, tasks: 18, availability: 'Critical' },
    { id: '4', name: 'Sales Closer', load: 60, tasks: 8, availability: 'Medium' },
];

export default function ResourcePlanningScreen() {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Resource Planning' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Resource Planning</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Monitor team bandwidth, allocate tasks, and prevent burnout.</Text>
                </View>

                <View style={styles.summaryGrid}>
                    <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Text style={[styles.summaryValue, { color: theme.colors.text }]}>72%</Text>
                        <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Avg. Utilization</Text>
                    </View>
                    <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Text style={[styles.summaryValue, { color: '#FF3B30' }]}>2</Text>
                        <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Overloaded Teams</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Bandwidth Visualization</Text>
                {TEAM_MEMBERS.map((team) => (
                    <View key={team.id} style={[styles.teamCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.teamHeader}>
                            <Text style={[styles.teamName, { color: theme.colors.text }]}>{team.name}</Text>
                            <Text style={[styles.teamTasks, { color: theme.colors.secondaryText }]}>{team.tasks} Active Tasks</Text>
                        </View>
                        <View style={styles.progressRow}>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBar, { width: `${team.load}%`, backgroundColor: team.load > 90 ? '#FF3B30' : team.load > 70 ? '#FF9500' : '#34C759' }]} />
                            </View>
                            <Text style={[styles.loadValue, { color: theme.colors.text }]}>{team.load}%</Text>
                        </View>
                        <View style={styles.teamFooter}>
                            <Text style={[styles.availabilityLabel, { color: theme.colors.secondaryText }]}>Availability: </Text>
                            <Text style={{ color: team.availability === 'High' ? '#34C759' : team.availability === 'Critical' ? '#FF3B30' : '#FF9500', fontWeight: '700' }}>{team.availability}</Text>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={[styles.allocationButton, { backgroundColor: theme.colors.primary }]}>
                    <BarChart size={20} color="white" />
                    <Text style={styles.allocationButtonText}>Optimize Task Allocation (AI)</Text>
                </TouchableOpacity>

                <View style={[styles.warningCard, { backgroundColor: '#FF3B3010', borderColor: '#FF3B3040' }]}>
                    <CircleAlert size={20} color="#FF3B30" />
                    <Text style={[styles.warningText, { color: theme.colors.text }]}>
                        Marketing PR team is at 95% capacity. Delay in Q3 campaigns expected if no resources added.
                    </Text>
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
    summaryGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    summaryCard: {
        flex: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: 28,
        fontWeight: '800',
    },
    summaryLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    teamCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    teamHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    teamName: {
        fontSize: 17,
        fontWeight: '700',
    },
    teamTasks: {
        fontSize: 13,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    progressBarContainer: {
        flex: 1,
        height: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    loadValue: {
        fontSize: 14,
        fontWeight: '700',
        width: 40,
    },
    teamFooter: {
        flexDirection: 'row',
    },
    availabilityLabel: {
        fontSize: 13,
    },
    allocationButton: {
        marginTop: 12,
        padding: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 24,
    },
    allocationButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    warningCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        gap: 12,
        marginBottom: 40,
    },
    warningText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
    },
});
