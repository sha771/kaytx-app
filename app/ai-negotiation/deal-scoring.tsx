 
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
import { TrendingUp, Target, Award, TriangleAlert, Search, ChevronRight } from 'lucide-react-native';

interface Deal {
  id: string;
  companyName: string;
  contactName: string;
  dealValue: number;
  score: number;
  stage: string;
  probability: number;
  factors: {
    budget: number;
    authority: number;
    need: number;
    timeline: number;
    engagement: number;
  };
  lastActivity: string;
}

export default function DealScoringScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [deals] = useState<Deal[]>([
    {
      id: '1',
      companyName: 'Acme Corporation',
      contactName: 'John Smith',
      dealValue: 125000,
      score: 92,
      stage: 'Proposal',
      probability: 85,
      factors: {
        budget: 95,
        authority: 90,
        need: 88,
        timeline: 92,
        engagement: 95,
      },
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      companyName: 'Tech Solutions Inc',
      contactName: 'Sarah Johnson',
      dealValue: 85000,
      score: 78,
      stage: 'Negotiation',
      probability: 70,
      factors: {
        budget: 80,
        authority: 75,
        need: 82,
        timeline: 70,
        engagement: 83,
      },
      lastActivity: '5 hours ago',
    },
    {
      id: '3',
      companyName: 'Global Enterprises',
      contactName: 'Michael Brown',
      dealValue: 250000,
      score: 65,
      stage: 'Discovery',
      probability: 45,
      factors: {
        budget: 70,
        authority: 60,
        need: 75,
        timeline: 55,
        engagement: 65,
      },
      lastActivity: '1 day ago',
    },
    {
      id: '4',
      companyName: 'Startup Labs',
      contactName: 'Emily Chen',
      dealValue: 45000,
      score: 45,
      stage: 'Qualification',
      probability: 30,
      factors: {
        budget: 40,
        authority: 50,
        need: 55,
        timeline: 45,
        engagement: 35,
      },
      lastActivity: '3 days ago',
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Hot';
    if (score >= 60) return 'Warm';
    return 'Cold';
  };

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      searchQuery === '' ||
      deal.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'hot') return matchesSearch && deal.score >= 80;
    if (selectedFilter === 'warm') return matchesSearch && deal.score >= 60 && deal.score < 80;
    if (selectedFilter === 'cold') return matchesSearch && deal.score < 60;
    return matchesSearch;
  });

  const stats = {
    avgScore: Math.round(deals.reduce((sum, d) => sum + d.score, 0) / deals.length),
    hotDeals: deals.filter((d) => d.score >= 80).length,
    totalValue: deals.reduce((sum, d) => sum + d.dealValue, 0),
    avgProbability: Math.round(deals.reduce((sum, d) => sum + d.probability, 0) / deals.length),
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Deal Scoring',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.avgScore}</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <Award size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.hotDeals}</Text>
            <Text style={styles.statLabel}>Hot Deals</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <Target size={20} color="#fff" />
            <Text style={styles.statValue}>${(stats.totalValue / 1000).toFixed(0)}K</Text>
            <Text style={styles.statLabel}>Pipeline</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <TriangleAlert size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.avgProbability}%</Text>
            <Text style={styles.statLabel}>Avg Probability</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search deals..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {['all', 'hot', 'warm', 'cold'].map((Filter) => (
              <TouchableOpacity
                key={Funnel}
                style={[
                  styles.filterButton,
                  selectedFilter === Filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(Filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === Filter && styles.filterTextActive,
                  ]}
                >
                  {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredDeals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <View style={styles.dealHeader}>
                <View style={styles.dealInfo}>
                  <Text style={styles.companyName}>{deal.companyName}</Text>
                  <Text style={styles.contactName}>{deal.contactName}</Text>
                  <Text style={styles.dealValue}>
                    ${deal.dealValue.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.scoreContainer}>
                  <View
                    style={[
                      styles.scoreBadge,
                      { backgroundColor: getScoreColor(deal.score) },
                    ]}
                  >
                    <Text style={styles.scoreValue}>{deal.score}</Text>
                  </View>
                  <Text
                    style={[styles.scoreLabel, { color: getScoreColor(deal.score) }]}
                  >
                    {getScoreLabel(deal.score)}
                  </Text>
                </View>
              </View>

              <View style={styles.stageRow}>
                <Text style={styles.stageLabel}>Stage:</Text>
                <Text style={styles.stageValue}>{deal.stage}</Text>
                <View style={styles.probabilityBadge}>
                  <Text style={styles.probabilityText}>{deal.probability}%</Text>
                </View>
              </View>

              <View style={styles.factorsContainer}>
                <Text style={styles.factorsTitle}>Scoring Factors</Text>
                <View style={styles.factorsGrid}>
                  {Object.entries(deal.factors).map(([key, value]) => (
                    <View key={key} style={styles.factorItem}>
                      <View style={styles.factorHeader}>
                        <Text style={styles.factorLabel}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                        <Text style={styles.factorValue}>{value}</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${value}%`,
                              backgroundColor: getScoreColor(value),
                            },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.lastActivity}>Last activity: {deal.lastActivity}</Text>
                <ChevronRight size={20} color="#64748B" />
              </View>
            </TouchableOpacity>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
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
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  dealCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dealInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  dealValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  scoreContainer: {
    alignItems: 'center',
    gap: 6,
  },
  scoreBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  stageLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  stageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  probabilityBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  probabilityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  factorsContainer: {
    marginBottom: 12,
  },
  factorsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 12,
  },
  factorsGrid: {
    gap: 10,
  },
  factorItem: {
    gap: 6,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factorLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  factorValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  lastActivity: {
    fontSize: 12,
    color: '#64748B',
  },
});
