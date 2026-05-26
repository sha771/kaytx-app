import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, useSafeAreaInsets } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, Filter, Mic, Image, Clock, User, FileText, MessageSquare, Star, Zap, ArrowRight, TrendingUp } from 'lucide-react-native';

export default function SmartSearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const SAMPLE_RESULTS = [
    { 
      title: 'Client Refund Policy v2.3', 
      type: 'Process', 
      source: 'Google Docs', 
      confidence: 96,
      snippet: 'To process a refund, the customer must provide their order number within 30 days of purchase...',
      updated: '2 days ago'
    },
    { 
      title: 'Q4 Product Launch Strategy', 
      type: 'Decision', 
      source: 'Slack #product', 
      confidence: 94,
      snippet: 'After reviewing market analysis, we decided to launch with a phased approach starting...',
      updated: '5 hours ago'
    },
    { 
      title: 'AWS Migration Timeline', 
      type: 'Project', 
      source: 'Jira', 
      confidence: 92,
      snippet: 'Phase 1: Infrastructure assessment complete. Phase 2: Pilot migration scheduled for...',
      updated: '1 week ago'
    }
  ];

  const RECENT_SEARCHES = [
    'AWS migration best practices',
    'Client onboarding process',
    'Q4 sales targets',
    'Security compliance requirements'
  ];

  const SUGGESTED_FOLLOWUPS = [
    'How do we handle enterprise clients?',
    'What was the decision timeline?',
    'Who owns this process?',
    'When was this last updated?'
  ];

  const FILTERS = [
    { id: 'all', label: 'All', active: true },
    { id: 'documents', label: 'Documents', active: false },
    { id: 'slack', label: 'Slack', active: false },
    { id: 'email', label: 'Email', active: false },
    { id: 'decisions', label: 'Decisions', active: false },
    { id: 'clients', label: 'Clients', active: false }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Smart Search</Text>
          <Text style={styles.headerSubtitle}>Natural language queries with contextual results</Text>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: '#1E293B' }]}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask anything about your company..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <View style={styles.searchActions}>
            <TouchableOpacity style={styles.searchAction}>
              <Mic size={18} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchAction}>
              <Image size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {FILTERS.map((filter) => (
            <TouchableOpacity 
              key={filter.id} 
              style={[
                styles.filterChip, 
                { backgroundColor: filter.active ? '#3B82F6' : '#1E293B' }
              ]}
            >
              <Text style={[styles.filterText, { color: filter.active ? '#FFFFFF' : '#9CA3AF' }]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: '#1E293B' }]}>
            <Filter size={14} color="#9CA3AF" />
            <Text style={styles.filterText}>More Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>892</Text>
            <Text style={styles.statLabel}>Daily Queries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Text style={styles.statValue}>1.2s</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </View>
        </View>

        {/* Search Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results for "refund policy and client decisions"</Text>
          {SAMPLE_RESULTS.map((result, index) => (
            <TouchableOpacity key={index} style={[styles.resultCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.resultHeader}>
                <View style={[styles.typeBadge, { backgroundColor: '#3B82F620' }]}>
                  <Text style={styles.typeText}>{result.type}</Text>
                </View>
                <View style={styles.resultMeta}>
                  <Text style={styles.resultSource}>{result.source}</Text>
                  <Text style={styles.resultDot}>•</Text>
                  <Text style={styles.resultTime}>{result.updated}</Text>
                </View>
              </View>
              <Text style={styles.resultTitle}>{result.title}</Text>
              <Text style={styles.resultSnippet} numberOfLines={2}>{result.snippet}</Text>
              <View style={styles.resultFooter}>
                <View style={styles.confidenceRow}>
                  <Zap size={12} color="#F59E0B" />
                  <Text style={styles.confidenceText}>{result.confidence}% confidence</Text>
                </View>
                <ArrowRight size={16} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {RECENT_SEARCHES.map((search, index) => (
            <TouchableOpacity key={index} style={[styles.recentItem, { backgroundColor: '#1E293B' }]}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Follow-ups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Follow-ups</Text>
          <View style={styles.followUps}>
            {SUGGESTED_FOLLOWUPS.map((followup, index) => (
              <TouchableOpacity key={index} style={[styles.followUpItem, { backgroundColor: '#1E293B' }]}>
                <MessageSquare size={14} color="#3B82F6" />
                <Text style={styles.followUpText}>{followup}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Searches</Text>
          <View style={styles.trendingRow}>
            {[
              { topic: 'Q4 Strategy', trend: '+45%' },
              { topic: 'AWS Migration', trend: '+32%' },
              { topic: 'Security Audit', trend: '+28%' },
              { topic: 'Product Launch', trend: '+21%' }
            ].map((item, index) => (
              <View key={index} style={[styles.trendingCard, { backgroundColor: '#1E293B' }]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.trendingTopic}>{item.topic}</Text>
                <Text style={styles.trendingTrend}>{item.trend}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Advanced Search Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Search</Text>
          <View style={styles.advancedGrid}>
            <TouchableOpacity style={[styles.advancedItem, { backgroundColor: '#1E293B' }]}>
              <User size={20} color="#7C3AED" />
              <Text style={styles.advancedText}>Search by Person</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.advancedItem, { backgroundColor: '#1E293B' }]}>
              <FileText size={20} color="#3B82F6" />
              <Text style={styles.advancedText}>Search by Document</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.advancedItem, { backgroundColor: '#1E293B' }]}>
              <Calendar size={20} color="#10B981" />
              <Text style={styles.advancedText}>Search by Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.advancedItem, { backgroundColor: '#1E293B' }]}>
              <Star size={20} color="#F59E0B" />
              <Text style={styles.advancedText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    gap: 12
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    flex: 1
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9CA3AF'
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 8
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF'
  },
  searchActions: {
    flexDirection: 'row',
    gap: 8
  },
  searchAction: {
    padding: 4
  },
  filters: {
    marginTop: 12
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6
  },
  filterText: {
    fontSize: 13,
    color: '#9CA3AF'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12
  },
  clearText: {
    fontSize: 13,
    color: '#3B82F6'
  },
  resultCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 10
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  typeText: {
    fontSize: 10,
    color: '#3B82F6',
    fontWeight: '500'
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  resultSource: {
    fontSize: 11,
    color: '#6B7280'
  },
  resultDot: {
    fontSize: 11,
    color: '#6B7280'
  },
  resultTime: {
    fontSize: 11,
    color: '#6B7280'
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6
  },
  resultSnippet: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  confidenceText: {
    fontSize: 11,
    color: '#F59E0B'
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
    gap: 10
  },
  recentText: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  followUps: {
    gap: 8
  },
  followUpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 10
  },
  followUpText: {
    fontSize: 13,
    color: '#FFFFFF',
    flex: 1
  },
  trendingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  trendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8
  },
  trendingTopic: {
    fontSize: 13,
    color: '#FFFFFF'
  },
  trendingTrend: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600'
  },
  advancedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  advancedItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 10
  },
  advancedText: {
    fontSize: 13,
    color: '#FFFFFF'
  }
};