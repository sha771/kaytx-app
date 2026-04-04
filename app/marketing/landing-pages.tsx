import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Layout, Plus, Edit2, Trash2, Copy, Eye, TrendingUp, Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LandingPage {
  id: string;
  name: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  conversions: number;
  conversionRate: number;
  lastEdited: string;
  thumbnail: string;
}

export default function LandingPagesScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [pages, setPages] = useState<LandingPage[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      status: 'published',
      views: 12543,
      conversions: 892,
      conversionRate: 7.1,
      lastEdited: '2 hours ago',
      thumbnail: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      name: 'Product Launch - Premium',
      status: 'published',
      views: 8721,
      conversions: 1234,
      conversionRate: 14.2,
      lastEdited: '1 day ago',
      thumbnail: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      name: 'Free Trial Sign Up',
      status: 'draft',
      views: 0,
      conversions: 0,
      conversionRate: 0,
      lastEdited: '3 days ago',
      thumbnail: 'https://via.placeholder.com/300x200',
    },
    {
      id: '4',
      name: 'Webinar Registration',
      status: 'published',
      views: 5432,
      conversions: 421,
      conversionRate: 7.8,
      lastEdited: '5 days ago',
      thumbnail: 'https://via.placeholder.com/300x200',
    },
  ]);

  const deletePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const duplicatePage = (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page) {
      const newPage = { ...page, id: Date.now().toString(), name: `${page.name} (Copy)`, status: 'draft' as const };
      setPages([...pages, newPage]);
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || page.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Landing Pages',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Landing Pages</Text>
            <Text style={styles.headerSubtitle}>{pages.length} total pages</Text>
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create Page</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search landing pages..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          {['all', 'published', 'draft'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
              onPress={() => setFilter(f as typeof filter)}
            >
              <Text style={[styles.filterButtonText, filter === f && styles.filterButtonTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Eye size={18} color="#60A5FA" />
          <Text style={styles.statValue}>26.7K</Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={18} color="#10B981" />
          <Text style={styles.statValue}>2,547</Text>
          <Text style={styles.statLabel}>Conversions</Text>
        </View>
        <View style={styles.statCard}>
          <Layout size={18} color="#F59E0B" />
          <Text style={styles.statValue}>9.5%</Text>
          <Text style={styles.statLabel}>Avg. CVR</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {filteredPages.map((page) => (
          <View key={page.id} style={styles.pageCard}>
            <View style={styles.pagePreview}>
              <Layout size={40} color="#374151" />
            </View>

            <View style={styles.pageContent}>
              <View style={styles.pageHeader}>
                <Text style={styles.pageName}>{page.name}</Text>
                <View style={[
                  styles.statusBadge,
                  page.status === 'published' && styles.statusBadgePublished,
                  page.status === 'draft' && styles.statusBadgeDraft,
                ]}>
                  <Text style={[
                    styles.statusBadgeText,
                    page.status === 'published' && styles.statusBadgeTextPublished,
                    page.status === 'draft' && styles.statusBadgeTextDraft,
                  ]}>
                    {page.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {page.status === 'published' && (
                <View style={styles.pageStats}>
                  <View style={styles.pageStat}>
                    <Text style={styles.pageStatValue}>{page.views.toLocaleString()}</Text>
                    <Text style={styles.pageStatLabel}>Views</Text>
                  </View>
                  <View style={styles.pageStat}>
                    <Text style={styles.pageStatValue}>{page.conversions.toLocaleString()}</Text>
                    <Text style={styles.pageStatLabel}>Conversions</Text>
                  </View>
                  <View style={styles.pageStat}>
                    <Text style={[styles.pageStatValue, { color: '#10B981' }]}>
                      {page.conversionRate}%
                    </Text>
                    <Text style={styles.pageStatLabel}>CVR</Text>
                  </View>
                </View>
              )}

              <Text style={styles.lastEdited}>Last edited {page.lastEdited}</Text>

              <View style={styles.pageActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye size={16} color="#60A5FA" />
                  <Text style={styles.actionButtonText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit2 size={16} color="#10B981" />
                  <Text style={[styles.actionButtonText, { color: '#10B981' }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => duplicatePage(page.id)}
                >
                  <Copy size={16} color="#F59E0B" />
                  <Text style={[styles.actionButtonText, { color: '#F59E0B' }]}>Duplicate</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => deletePage(page.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                  <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.createCard}>
          <Plus size={32} color="#60A5FA" />
          <Text style={styles.createCardTitle}>Create New Landing Page</Text>
          <Text style={styles.createCardDescription}>Start from scratch or use a template</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60A5FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1F2937',
  },
  filterButtonActive: {
    backgroundColor: '#60A5FA',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  pageCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  pagePreview: {
    width: 120,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContent: {
    flex: 1,
    padding: 16,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgePublished: {
    backgroundColor: '#1A3A2E',
  },
  statusBadgeDraft: {
    backgroundColor: '#3A2E1A',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadgeTextPublished: {
    color: '#10B981',
  },
  statusBadgeTextDraft: {
    color: '#F59E0B',
  },
  pageStats: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  pageStat: {
    alignItems: 'center',
  },
  pageStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pageStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  lastEdited: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  pageActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#60A5FA',
  },
  createCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  createCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  createCardDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
