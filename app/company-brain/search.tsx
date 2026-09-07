/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Modal, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Search, X, Filter, FileText, MessageSquare, Users, Calendar, ChevronRight, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '../../lib/api-client';

export default function CompanyBrainSearch() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState((params.q as string) || '');
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getSearchSuggestions({ organizationId: 'default' });
      if (response?.success && response?.data) {
        const data = response.data;
        setSuggestions(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query?: string) => {
    const q = query || searchQuery;
    if (q.trim()) {
      setIsSearching(true);
      try {
        const response = await apiClient.searchKnowledge({
          organizationId: 'default',
          query: q,
        });
        if (response?.success && response?.data) {
          const data = response.data;
          setResults(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (searchQuery.trim()) {
      await handleSearch();
    } else {
      await loadSuggestions();
    }
    setRefreshing(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'process':
      case 'policy':
        return FileText;
      case 'meeting':
        return MessageSquare;
      case 'client':
        return Users;
      default:
        return FileText;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'process':
        return '#6366f1';
      case 'technical':
        return '#8b5cf6';
      case 'policy':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  if (loading && !searchQuery) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Search Knowledge</Text>
          <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
            <Filter size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading suggestions...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Knowledge</Text>
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filterButton}>
          <Filter size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for anything..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
          autoFocus
        />
        {searchQuery && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
      >
        {!searchQuery ? (
          /* Suggested Questions */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested Questions</Text>
            <View style={styles.suggestionsList}>
              {suggestions.length === 0 ? (
                <View style={styles.suggestionItem}>
                  <Sparkles size={16} color="#6366f1" />
                  <Text style={styles.suggestionText}>How do I handle client refunds?</Text>
                </View>
              ) : (
                suggestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => {
                      const q = typeof question === 'string' ? question : question.question || question;
                      setSearchQuery(q);
                      handleSearch(q);
                    }}
                  >
                    <Sparkles size={16} color="#6366f1" />
                    <Text style={styles.suggestionText}>{typeof question === 'string' ? question : question.question || question}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        ) : isSearching ? (
          /* Loading State */
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Searching knowledge base...</Text>
          </View>
        ) : (
          /* Search Results */
          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>Results</Text>
              <Text style={styles.resultsCount}>{results.length} found</Text>
            </View>
            <View style={styles.resultsList}>
              {results.map((result, index) => {
                const Icon = getResultIcon(result.type);
                const color = getResultColor(result.type);
                const id = result.id || result._id || index;
                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.resultItem}
                    onPress={() => router.push(`/company-brain/node/${id}` as any)}
                  >
                    <View style={styles.resultHeader}>
                      <View style={[styles.resultIcon, { backgroundColor: `${color}20` }]}>
                        <Icon size={20} color={color} />
                      </View>
                      <View style={styles.resultMeta}>
                        <Text style={styles.resultType}>{result.type}</Text>
                        <Text style={styles.resultSource}>{result.source || result.type}</Text>
                      </View>
                      <View style={styles.confidenceBadge}>
                        <Text style={styles.confidenceText}>{Math.round((result.confidence || 0) * 100)}%</Text>
                      </View>
                    </View>
                    <Text style={styles.resultTitle}>{result.title}</Text>
                    <Text style={styles.resultSummary}>{result.summary || result.excerpt || ''}</Text>
                    <View style={styles.resultFooter}>
                      <View style={styles.tagsContainer}>
                        {(result.tags || []).slice(0, 3).map((tag, i) => (
                          <View key={i} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                      <View style={styles.resultMetaInfo}>
                        <Text style={styles.resultAuthor}>{result.author || 'Unknown'}</Text>
                        <Text style={styles.resultTime}>{result.updatedAt || result.lastUpdated || ''}</Text>
                      </View>
                    </View>
                    <ChevronRight size={20} color="#64748b" style={styles.chevron} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Source Type</Text>
              {['document', 'slack', 'email', 'ai_agent'].map((source) => (
                <TouchableOpacity key={source} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{source}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Knowledge Type</Text>
              {['process', 'decision', 'technical', 'policy'].map((type) => (
                <TouchableOpacity key={type} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Time Range</Text>
              {['Last 24 hours', 'Last week', 'Last month', 'Last year', 'All time'].map((range) => (
                <TouchableOpacity key={range} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{range}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.clearFiltersButton}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyFiltersButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    margin: 20,
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
  clearButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  suggestionsList: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  suggestionText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#94a3b8',
  },
  resultsList: {
    gap: 12,
  },
  resultItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultMeta: {
    flex: 1,
  },
  resultType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultSource: {
    fontSize: 12,
    color: '#94a3b8',
  },
  confidenceBadge: {
    backgroundColor: '#10b98120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  resultSummary: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 12,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#6366f120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#6366f1',
  },
  resultMetaInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  resultAuthor: {
    fontSize: 12,
    color: '#94a3b8',
  },
  resultTime: {
    fontSize: 12,
    color: '#64748b',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#334155',
    marginRight: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    gap: 12,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  applyFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
