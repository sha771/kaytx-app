 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
  Search,
  Filter,
  CheckCircle,
  Star,
} from 'lucide-react-native';

interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  niche: string;
  averageLikes: number;
  averageComments: number;
  costPerPost: number;
  tier: 'mega' | 'macro' | 'micro' | 'nano';
  verified: boolean;
}

export default function InfluencerMarketingScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      handle: '@sarahj',
      platform: 'Instagram',
      followers: 2500000,
      engagementRate: 4.8,
      niche: 'Lifestyle & Business',
      averageLikes: 120000,
      averageComments: 3500,
      costPerPost: 15000,
      tier: 'mega',
      verified: true,
    },
    {
      id: '2',
      name: 'Tech Mike',
      handle: '@techmike',
      platform: 'YouTube',
      followers: 850000,
      engagementRate: 6.2,
      niche: 'Technology',
      averageLikes: 52700,
      averageComments: 1800,
      costPerPost: 8000,
      tier: 'macro',
      verified: true,
    },
    {
      id: '3',
      name: 'Emma Creative',
      handle: '@emmacreates',
      platform: 'TikTok',
      followers: 125000,
      engagementRate: 8.5,
      niche: 'Marketing & Design',
      averageLikes: 10625,
      averageComments: 450,
      costPerPost: 2500,
      tier: 'micro',
      verified: false,
    },
    {
      id: '4',
      name: 'Business Pro',
      handle: '@bizpro',
      platform: 'LinkedIn',
      followers: 45000,
      engagementRate: 5.3,
      niche: 'B2B & SaaS',
      averageLikes: 2385,
      averageComments: 180,
      costPerPost: 1200,
      tier: 'nano',
      verified: true,
    },
  ]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'mega':
        return '#8B5CF6';
      case 'macro':
        return '#3B82F6';
      case 'micro':
        return '#10B981';
      case 'nano':
        return '#F59E0B';
      default:
        return '#64748B';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const filteredInfluencers = influencers.filter((inf) => {
    const matchesSearch =
      searchQuery === '' ||
      inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform =
      selectedPlatform === 'all' || inf.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const stats = {
    totalInfluencers: influencers.length,
    avgEngagement: (
      influencers.reduce((sum, i) => sum + i.engagementRate, 0) / influencers.length
    ).toFixed(1),
    totalReach: influencers.reduce((sum, i) => sum + i.followers, 0),
    activeCampaigns: 8,
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Influencer Marketing',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Influencer Partnerships</Text>
          <Text style={styles.subtitle}>Find and manage influencer collaborations</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Users size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.totalInfluencers}</Text>
            <Text style={styles.statLabel}>Influencers</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.avgEngagement}%</Text>
            <Text style={styles.statLabel}>Avg Engagement</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <Heart size={20} color="#fff" />
            <Text style={styles.statValue}>{formatNumber(stats.totalReach)}</Text>
            <Text style={styles.statLabel}>Total Reach</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <MessageCircle size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search influencers..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <Filter size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.platformFilters}
          >
            {['all', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn'].map((platform) => (
              <TouchableOpacity
                key={platform}
                style={[
                  styles.platformButton,
                  selectedPlatform === platform && styles.platformButtonActive,
                ]}
                onPress={() => setSelectedPlatform(platform)}
              >
                <Text
                  style={[
                    styles.platformButtonText,
                    selectedPlatform === platform && styles.platformButtonTextActive,
                  ]}
                >
                  {platform}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredInfluencers.map((influencer) => (
            <View key={influencer.id} style={styles.influencerCard}>
              <View style={styles.influencerHeader}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {influencer.name.split(' ').map((n) => n[0]).join('')}
                    </Text>
                  </View>
                  {influencer.verified && (
                    <View style={styles.verifiedBadge}>
                      <CheckCircle size={16} color="#3B82F6" />
                    </View>
                  )}
                </View>

                <View style={styles.influencerInfo}>
                  <Text style={styles.influencerName}>{influencer.name}</Text>
                  <Text style={styles.influencerHandle}>{influencer.handle}</Text>
                  <View style={styles.platformBadge}>
                    <Text style={styles.platformBadgeText}>{influencer.platform}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.tierBadge,
                    { backgroundColor: getTierColor(influencer.tier) },
                  ]}
                >
                  <Text style={styles.tierText}>
                    {influencer.tier.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metric}>
                  <Users size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    {formatNumber(influencer.followers)}
                  </Text>
                  <Text style={styles.metricLabel}>Followers</Text>
                </View>

                <View style={styles.metric}>
                  <TrendingUp size={16} color="#64748B" />
                  <Text style={styles.metricValue}>{influencer.engagementRate}%</Text>
                  <Text style={styles.metricLabel}>Engagement</Text>
                </View>

                <View style={styles.metric}>
                  <Heart size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    {formatNumber(influencer.averageLikes)}
                  </Text>
                  <Text style={styles.metricLabel}>Avg Likes</Text>
                </View>

                <View style={styles.metric}>
                  <MessageCircle size={16} color="#64748B" />
                  <Text style={styles.metricValue}>
                    {formatNumber(influencer.averageComments)}
                  </Text>
                  <Text style={styles.metricLabel}>Avg Comments</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.nicheTag}>
                  <Star size={14} color="#F59E0B" />
                  <Text style={styles.nicheText}>{influencer.niche}</Text>
                </View>
                <Text style={styles.costText}>
                  ${influencer.costPerPost.toLocaleString()}/post
                </Text>
              </View>

              <TouchableOpacity style={styles.contactButton}>
                <MessageCircle size={18} color="#fff" />
                <Text style={styles.contactButtonText}>Contact Influencer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  platformFilters: {
    marginBottom: 16,
  },
  platformButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    marginRight: 8,
  },
  platformButtonActive: {
    backgroundColor: '#3B82F6',
  },
  platformButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  platformButtonTextActive: {
    color: '#fff',
  },
  influencerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  influencerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  influencerInfo: {
    flex: 1,
  },
  influencerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  influencerHandle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 6,
  },
  platformBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  platformBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  metricsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  nicheTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  nicheText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  costText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
