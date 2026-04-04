import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Users,
    Instagram,
    Twitter,
    Youtube,
    DollarSign,
    Calendar,
    Star,
    Zap,
    ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

const INFLUENCERS = [
    { id: '1', name: 'Alex River', platform: 'Instagram', followers: '1.2M', status: 'Active', roi: '4.2x', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: '2', name: 'Sam Tech', platform: 'Youtube', followers: '850K', status: 'Negotiating', roi: '3.8x', avatar: 'https://i.pravatar.cc/150?u=sam' },
    { id: '3', name: 'Casey Codes', platform: 'Twitter', followers: '45K', status: 'Paused', roi: '5.1x', avatar: 'https://i.pravatar.cc/150?u=casey' },
];

export default function InfluencerCRMScreen() {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Influencer CRM' }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Influencer CRM</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Manage partnerships, track ROI, and automate outreach sync.</Text>
                </View>

                <View style={styles.metricsRow}>
                    <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Users size={20} color={theme.colors.primary} />
                        <Text style={[styles.metricValue, { color: theme.colors.text }]}>128</Text>
                        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Partners</Text>
                    </View>
                    <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <DollarSign size={20} color="#34C759" />
                        <Text style={[styles.metricValue, { color: theme.colors.text }]}>$42K</Text>
                        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Spend</Text>
                    </View>
                    <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Zap size={20} color="#FF9500" />
                        <Text style={[styles.metricValue, { color: theme.colors.text }]}>3.9x</Text>
                        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Avg ROI</Text>
                    </View>
                </View>

                <View style={[styles.campaignCard, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.campaignTitle}>Active Campaign: Summer Launch</Text>
                    <View style={styles.campaignProgress}>
                        <View style={[styles.progressBar, { width: '75%', backgroundColor: 'white' }]} />
                    </View>
                    <Text style={styles.campaignMeta}>15 Influencers • 45 Posts • 2.4M Reached</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Partner Network</Text>
                {INFLUENCERS.map((inf) => (
                    <TouchableOpacity key={inf.id} style={[styles.partnerCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Image source={{ uri: inf.avatar }} style={styles.avatar} />
                        <View style={styles.partnerInfo}>
                            <Text style={[styles.partnerName, { color: theme.colors.text }]}>{inf.name}</Text>
                            <View style={styles.platformRow}>
                                {inf.platform === 'Instagram' && <Instagram size={14} color="#E1306C" />}
                                {inf.platform === 'Youtube' && <Youtube size={14} color="#FF0000" />}
                                {inf.platform === 'Twitter' && <Twitter size={14} color="#1DA1F2" />}
                                <Text style={[styles.platformText, { color: theme.colors.secondaryText }]}> {inf.followers} followers</Text>
                            </View>
                        </View>
                        <View style={styles.partnerMeta}>
                            <View style={[styles.statusBadge, { backgroundColor: inf.status === 'Active' ? '#34C75920' : '#FF950020' }]}>
                                <Text style={{ color: inf.status === 'Active' ? '#34C759' : '#FF9500', fontSize: 10, fontWeight: '700' }}>{inf.status}</Text>
                            </View>
                            <Text style={[styles.roiText, { color: theme.colors.text }]}>{inf.roi} ROI</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.addButtonText}>Find New Influencers (AI Search)</Text>
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
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    metricCard: {
        width: (width - 60) / 3,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 8,
    },
    metricLabel: {
        fontSize: 11,
        fontWeight: '600',
    },
    campaignCard: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 32,
    },
    campaignTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    campaignProgress: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        marginBottom: 12,
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
    },
    campaignMeta: {
        color: 'white',
        fontSize: 12,
        opacity: 0.9,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    partnerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    partnerInfo: {
        flex: 1,
    },
    partnerName: {
        fontSize: 16,
        fontWeight: '700',
    },
    platformRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    platformText: {
        fontSize: 12,
    },
    partnerMeta: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 4,
    },
    roiText: {
        fontSize: 13,
        fontWeight: '600',
    },
    addButton: {
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 40,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});
