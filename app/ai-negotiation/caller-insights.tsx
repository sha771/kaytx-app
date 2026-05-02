 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  TrendingUp,
  Users,
  Phone,
  Clock,
  MapPin,
  Building,
  Award,
  Activity,
} from 'lucide-react-native';
import { mockCallerInsights } from '@/utils/mockNegotiationData';

export default function CallerInsightsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');

  const filteredInsights = mockCallerInsights.filter((insight: typeof mockCallerInsights[0]) => {
    const matchesSearch =
      insight.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || insight.sentiment === filterType;
    return matchesSearch && matchesFilter;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '#34C759';
      case 'negative':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  const totalCalls = mockCallerInsights.reduce((sum: number, i: typeof mockCallerInsights[0]) => sum + i.totalCalls, 0);
  const avgWinRate =
    mockCallerInsights.reduce((sum: number, i: typeof mockCallerInsights[0]) => sum + i.winRate, 0) / mockCallerInsights.length;
  const avgDealValue =
    mockCallerInsights.reduce((sum: number, i: typeof mockCallerInsights[0]) => sum + i.avgDealValue, 0) / mockCallerInsights.length;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Caller Insights',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F5' }]}>
              <View style={styles.statIconContainer}>
                <Phone size={20} color="#FF2D92" />
              </View>
              <Text style={styles.statValue}>{totalCalls}</Text>
              <Text style={styles.statLabel}>Total Calls</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}>
              <View style={styles.statIconContainer}>
                <Award size={20} color="#34C759" />
              </View>
              <Text style={styles.statValue}>{avgWinRate.toFixed(1)}%</Text>
              <Text style={styles.statLabel}>Avg Win Rate</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: '#FFF5F0' }]}>
              <View style={styles.statIconContainer}>
                <TrendingUp size={20} color="#FF9500" />
              </View>
              <Text style={styles.statValue}>${(avgDealValue / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>Avg Deal Value</Text>
            </View>
          </View>

          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Search size={18} color="#8E8E93" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or company..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#8E8E93"
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
            >
              {['all', 'positive', 'neutral', 'negative'].map((Filter) => (
                <TouchableOpacity
                  key={Filter}
                  style={[
                    styles.filterChip,
                    filterType === Filter && styles.filterChipActive,
                  ]}
                  onPress={() => setFilterType(Filter as typeof filterType)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      filterType === Filter && styles.filterChipTextActive,
                    ]}
                  >
                    {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.insightsList}>
            {filteredInsights.map((insight) => (
              <View key={insight.id} style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <View style={styles.insightHeaderLeft}>
                    <Text style={styles.insightName}>{insight.customerName}</Text>
                    <View style={styles.companyRow}>
                      <Building size={14} color="#8E8E93" />
                      <Text style={styles.insightCompany}>{insight.customerCompany}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.sentimentBadge,
                      { backgroundColor: getSentimentColor(insight.sentiment) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sentimentText,
                        { color: getSentimentColor(insight.sentiment) },
                      ]}
                    >
                      {insight.sentiment}
                    </Text>
                  </View>
                </View>

                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Phone size={16} color="#FF2D92" />
                    <Text style={styles.metricValue}>{insight.totalCalls}</Text>
                    <Text style={styles.metricLabel}>Calls</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Award size={16} color="#34C759" />
                    <Text style={styles.metricValue}>{insight.totalDeals}</Text>
                    <Text style={styles.metricLabel}>Deals</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <TrendingUp size={16} color="#FF9500" />
                    <Text style={styles.metricValue}>${(insight.avgDealValue / 1000).toFixed(0)}K</Text>
                    <Text style={styles.metricLabel}>Avg Deal</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Activity size={16} color="#5AC8FA" />
                    <Text style={styles.metricValue}>{insight.winRate}%</Text>
                    <Text style={styles.metricLabel}>Win Rate</Text>
                  </View>
                </View>

                <View style={styles.demographicsSection}>
                  <Text style={styles.sectionTitle}>Demographics</Text>
                  <View style={styles.demographicsGrid}>
                    <View style={styles.demographicItem}>
                      <Building size={14} color="#8E8E93" />
                      <Text style={styles.demographicText}>{insight.demographics.industry}</Text>
                    </View>
                    <View style={styles.demographicItem}>
                      <Users size={14} color="#8E8E93" />
                      <Text style={styles.demographicText}>{insight.demographics.companySize}</Text>
                    </View>
                    <View style={styles.demographicItem}>
                      <MapPin size={14} color="#8E8E93" />
                      <Text style={styles.demographicText}>{insight.demographics.location}</Text>
                    </View>
                  </View>
                </View>

                {insight.preferredTime && (
                  <View style={styles.behaviorSection}>
                    <Clock size={14} color="#FF2D92" />
                    <Text style={styles.behaviorText}>Preferred Time: {insight.preferredTime}</Text>
                  </View>
                )}

                {insight.behaviorPattern && (
                  <View style={styles.patternSection}>
                    <Text style={styles.patternText}>{insight.behaviorPattern}</Text>
                  </View>
                )}

                <View style={styles.cardFooter}>
                  <Text style={styles.lastContactText}>
                    Last contact: {new Date(insight.lastContact).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF2D92',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  insightsList: {
    padding: 16,
    gap: 16,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightHeaderLeft: {
    flex: 1,
  },
  insightName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightCompany: {
    fontSize: 14,
    color: '#8E8E93',
  },
  sentimentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sentimentText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  metricsGrid: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  metricLabel: {
    fontSize: 11,
    color: '#8E8E93',
  },
  demographicsSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase' as const,
  },
  demographicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  demographicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  demographicText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  behaviorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF0F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  behaviorText: {
    fontSize: 13,
    color: '#FF2D92',
    flex: 1,
  },
  patternSection: {
    backgroundColor: '#FFF5F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  patternText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontStyle: 'italic' as const,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  lastContactText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  viewDetailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF2D92',
  },
});
