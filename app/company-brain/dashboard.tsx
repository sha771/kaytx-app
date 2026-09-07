/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Brain, TrendingUp, FileText, Users, AlertCircle, ArrowRight, Clock, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '@/lib/api-client';

export default function CompanyBrainDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getCompanyBrainDashboard();
      if (response?.success && response?.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/company-brain/search',
        params: { q: searchQuery }
      } as any);
    }
  };

  const knowledgeHealth = dashboardData?.health || { coverage: 0, outdated: 0, duplicates: 0, score: 0 };
  const trendingTopics = dashboardData?.trendingTopics || [];
  const recentKnowledge = dashboardData?.recentActivity || [];

  const quickActions = [
    { id: 1, title: 'Upload Document', icon: FileText, route: '/company-brain/documents', color: '#6366f1' },
    { id: 2, title: 'Ask Question', icon: Search, route: '/company-brain/search', color: '#8b5cf6' },
    { id: 3, title: 'View Knowledge Graph', icon: Brain, route: '/company-brain/graph', color: '#10b981' },
    { id: 4, title: 'Team Dashboard', icon: Users, route: '/company-brain/team', color: '#f59e0b' },
  ];

  if (loading && !dashboardData) {
    return (
      <View style={[styles.container, styles.loadingContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading Company Brain...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadDashboard} tintColor="#6366f1" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Company Brain</Text>
        <Text style={styles.subtitle}>Your Company's Collective Intelligence</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search knowledge base..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <ArrowRight size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Knowledge Health Score */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Knowledge Health</Text>
        <View style={styles.healthCard}>
          <View style={styles.healthScore}>
            <Text style={styles.healthScoreValue}>{knowledgeHealth.score}%</Text>
            <Text style={styles.healthScoreLabel}>Overall Score</Text>
          </View>
          <View style={styles.healthMetrics}>
            <View style={styles.metric}>
              <CheckCircle size={16} color="#10b981" />
              <Text style={styles.metricText}>{knowledgeHealth.coverage}% Coverage</Text>
            </View>
            <View style={styles.metric}>
              <AlertCircle size={16} color="#f59e0b" />
              <Text style={styles.metricText}>{knowledgeHealth.outdated}% Outdated</Text>
            </View>
            <View style={styles.metric}>
              <AlertCircle size={16} color="#ef4444" />
              <Text style={styles.metricText}>{knowledgeHealth.duplicates}% Duplicates</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Icon size={24} color={action.color} strokeWidth={2} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Trending Topics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <TouchableOpacity onPress={() => router.push('/company-brain/analytics' as any)}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.trendingList}>
          {trendingTopics.map((topic) => (
            <TouchableOpacity key={topic.id} style={styles.trendingItem}>
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingTopic}>{topic.topic}</Text>
                <Text style={styles.trendingSearches}>{topic.searches} searches</Text>
              </View>
              <TrendingUp size={20} color={topic.trend === 'up' ? '#10b981' : topic.trend === 'down' ? '#ef4444' : '#64748b'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Knowledge */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Knowledge</Text>
          <TouchableOpacity onPress={() => router.push('/company-brain/documents' as any)}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentList}>
          {recentKnowledge.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recentItem}>
              <View style={styles.recentIcon}>
                <FileText size={20} color="#6366f1" />
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentTitle}>{item.title}</Text>
                <View style={styles.recentMeta}>
                  <Text style={styles.recentType}>{item.type}</Text>
                  <Text style={styles.recentTime}>{item.time}</Text>
                </View>
              </View>
              <Text style={styles.recentAuthor}>{item.author}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 16,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 16,
  },
  searchButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  healthCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthScore: {
    alignItems: 'center',
  },
  healthScoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
  },
  healthScoreLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  healthMetrics: {
    flex: 1,
    marginLeft: 20,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricText: {
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  trendingList: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTopic: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  trendingSearches: {
    fontSize: 14,
    color: '#94a3b8',
  },
  recentList: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentType: {
    fontSize: 12,
    color: '#6366f1',
    marginRight: 8,
  },
  recentTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  recentAuthor: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 12,
  },
});
