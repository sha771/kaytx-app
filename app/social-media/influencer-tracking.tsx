 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { UserPlus, Star, Users, Heart, Mail, Plus, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  engagement: string;
  niche: string;
  status: 'active' | 'contacted' | 'potential';
  posts: number;
}

export default function InfluencerTracking() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'contacted' | 'potential'>('all');

  const influencers: Influencer[] = [
    { id: '1', name: 'Sarah Tech', handle: '@sarahtech', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', followers: '245K', engagement: '4.8%', niche: 'Tech', status: 'active', posts: 12 },
    { id: '2', name: 'Mark Digital', handle: '@markdigital', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', followers: '189K', engagement: '3.9%', niche: 'Marketing', status: 'contacted', posts: 0 },
    { id: '3', name: 'Emma Business', handle: '@emmabiz', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', followers: '312K', engagement: '5.2%', niche: 'Business', status: 'active', posts: 8 },
    { id: '4', name: 'Alex Creator', handle: '@alexcreator', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', followers: '156K', engagement: '6.1%', niche: 'Lifestyle', status: 'potential', posts: 0 },
    { id: '5', name: 'Lisa Startup', handle: '@lisastartup', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', followers: '98K', engagement: '7.2%', niche: 'Startups', status: 'contacted', posts: 0 },
  ];

  const stats = [
    { label: 'Active Partners', value: '8', icon: UserPlus, color: '#34C759' },
    { label: 'Total Reach', value: '2.4M', icon: Users, color: '#007AFF' },
    { label: 'Avg Engagement', value: '5.2%', icon: Heart, color: '#FF2D55' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'contacted': return '#FF9500';
      case 'potential': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const filteredInfluencers = selectedStatus === 'all' ? influencers : influencers.filter(i => i.status === selectedStatus);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Influencer Tracking',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Stats Overview */}
        <View style={styles.statsRow}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <IconComponent size={18} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Add Influencer */}
        <TouchableOpacity style={[styles.addButton, { borderColor: theme.colors.primary }]}>
          <Plus size={20} color={theme.colors.primary} />
          <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>Add Influencer</Text>
        </TouchableOpacity>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {(['all', 'active', 'contacted', 'potential'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterTab, selectedStatus === status && { backgroundColor: theme.colors.primary }]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[styles.filterText, { color: selectedStatus === status ? '#FFF' : theme.colors.secondaryText }]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Influencer List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Influencers ({filteredInfluencers.length})</Text>
          {filteredInfluencers.map((influencer) => (
            <TouchableOpacity key={influencer.id} style={[styles.influencerCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Image source={{ uri: influencer.avatar }} style={styles.avatar} />
              <View style={styles.influencerInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.name, { color: theme.colors.text }]}>{influencer.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(influencer.status)}15` }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(influencer.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(influencer.status) }]}>
                      {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.handle, { color: theme.colors.secondaryText }]}>{influencer.handle}</Text>
                <View style={styles.influencerStats}>
                  <View style={styles.influencerStat}>
                    <Users size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.influencerStatText, { color: theme.colors.secondaryText }]}>{influencer.followers}</Text>
                  </View>
                  <View style={styles.influencerStat}>
                    <Heart size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.influencerStatText, { color: theme.colors.secondaryText }]}>{influencer.engagement}</Text>
                  </View>
                  <View style={[styles.nicheBadge, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <Text style={[styles.nicheText, { color: theme.colors.secondaryText }]}>{influencer.niche}</Text>
                  </View>
                </View>
                {influencer.status === 'active' && (
                  <Text style={[styles.postsCount, { color: theme.colors.primary }]}>{influencer.posts} posts together</Text>
                )}
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Mail size={16} color={theme.colors.primary} />
                </TouchableOpacity>
                <ChevronRight size={18} color={theme.colors.secondaryText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Discovery */}
        <View style={[styles.discoveryCard, { backgroundColor: '#AF52DE10', borderColor: '#AF52DE' }]}>
          <Star size={20} color="#AF52DE" />
          <View style={styles.discoveryContent}>
            <Text style={[styles.discoveryTitle, { color: theme.colors.text }]}>Discover New Influencers</Text>
            <Text style={[styles.discoveryText, { color: theme.colors.secondaryText }]}>AI-powered recommendations based on your niche and audience</Text>
          </View>
          <ChevronRight size={18} color="#AF52DE" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, padding: 14, borderRadius: 14, alignItems: 'center' },
  statIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  statLabel: { fontSize: 11, textAlign: 'center' },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', gap: 8, marginBottom: 16 },
  addButtonText: { fontSize: 15, fontWeight: '600' },
  filterContainer: { marginBottom: 20 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', marginRight: 10 },
  filterText: { fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  influencerCard: { flexDirection: 'row', padding: 14, borderRadius: 14, marginBottom: 12, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  influencerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '600' },
  handle: { fontSize: 13, marginBottom: 8 },
  influencerStats: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  influencerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  influencerStatText: { fontSize: 12 },
  nicheBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  nicheText: { fontSize: 10, fontWeight: '600' },
  postsCount: { fontSize: 12, fontWeight: '600', marginTop: 6 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  discoveryCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, borderLeftWidth: 4, gap: 12, marginBottom: 20 },
  discoveryContent: { flex: 1 },
  discoveryTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  discoveryText: { fontSize: 12 },
});
