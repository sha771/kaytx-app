 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Hash, TrendingUp, Search, Plus, Copy, Star, BarChart3, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface HashtagData {
  id: string;
  tag: string;
  posts: string;
  reach: string;
  engagement: string;
  trending: boolean;
  saved: boolean;
}

export default function HashtagManager() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'trending' | 'saved' | 'suggested'>('trending');

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'saved', label: 'Saved', icon: Star },
    { id: 'suggested', label: 'Suggested', icon: Hash },
  ] as const;

  const hashtags: HashtagData[] = [
    { id: '1', tag: '#Innovation', posts: '2.4M', reach: '890M', engagement: '4.2%', trending: true, saved: true },
    { id: '2', tag: '#TechTrends', posts: '1.8M', reach: '650M', engagement: '3.8%', trending: true, saved: false },
    { id: '3', tag: '#AI', posts: '5.2M', reach: '1.2B', engagement: '5.1%', trending: true, saved: true },
    { id: '4', tag: '#StartupLife', posts: '890K', reach: '320M', engagement: '4.5%', trending: false, saved: true },
    { id: '5', tag: '#DigitalMarketing', posts: '3.1M', reach: '780M', engagement: '3.2%', trending: true, saved: false },
    { id: '6', tag: '#Entrepreneurship', posts: '2.1M', reach: '540M', engagement: '3.9%', trending: false, saved: true },
  ];

  const hashtagSets = [
    { id: '1', name: 'Product Launch', tags: ['#NewProduct', '#Launch', '#Innovation', '#Tech'], uses: 45 },
    { id: '2', name: 'Brand Awareness', tags: ['#BrandName', '#WeAre', '#OurStory', '#Community'], uses: 32 },
    { id: '3', name: 'Industry News', tags: ['#TechNews', '#Industry', '#Trends', '#Breaking'], uses: 28 },
  ];

  const filteredHashtags = hashtags.filter(h => {
    if (selectedCategory === 'trending') return h.trending;
    if (selectedCategory === 'saved') return h.saved;
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Hashtag Manager',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={18} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search hashtags..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryTab, selectedCategory === cat.id && { backgroundColor: theme.colors.primary }]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <IconComponent size={16} color={selectedCategory === cat.id ? '#FFF' : theme.colors.secondaryText} />
                <Text style={[styles.categoryText, { color: selectedCategory === cat.id ? '#FFF' : theme.colors.secondaryText }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hashtag Sets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hashtag Sets</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Plus size={16} color={theme.colors.primary} />
              <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>Create Set</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hashtagSets.map((set) => (
              <View key={set.id} style={[styles.setCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.setName, { color: theme.colors.text }]}>{set.name}</Text>
                <View style={styles.setTags}>
                  {set.tags.slice(0, 2).map((tag, i) => (
                    <View key={i} style={[styles.miniTag, { backgroundColor: `${theme.colors.primary}10` }]}>
                      <Text style={[styles.miniTagText, { color: theme.colors.primary }]}>{tag}</Text>
                    </View>
                  ))}
                  {set.tags.length > 2 && (
                    <Text style={[styles.moreTags, { color: theme.colors.secondaryText }]}>+{set.tags.length - 2}</Text>
                  )}
                </View>
                <Text style={[styles.setUses, { color: theme.colors.secondaryText }]}>Used {set.uses} times</Text>
                <TouchableOpacity style={[styles.copySetButton, { borderColor: theme.colors.border }]}>
                  <Copy size={14} color={theme.colors.primary} />
                  <Text style={[styles.copySetText, { color: theme.colors.primary }]}>Copy All</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Hashtag List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {selectedCategory === 'trending' ? 'Trending Now' : selectedCategory === 'saved' ? 'Saved Hashtags' : 'Suggested for You'}
          </Text>
          {filteredHashtags.map((hashtag) => (
            <View key={hashtag.id} style={[styles.hashtagCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.hashtagHeader}>
                <View style={[styles.hashtagIcon, { backgroundColor: '#007AFF15' }]}>
                  <Hash size={18} color="#007AFF" />
                </View>
                <View style={styles.hashtagInfo}>
                  <View style={styles.hashtagNameRow}>
                    <Text style={[styles.hashtagName, { color: theme.colors.text }]}>{hashtag.tag}</Text>
                    {hashtag.trending && (
                      <View style={[styles.trendingBadge, { backgroundColor: '#FF950015' }]}>
                        <TrendingUp size={10} color="#FF9500" />
                        <Text style={styles.trendingText}>Trending</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.hashtagPosts, { color: theme.colors.secondaryText }]}>{hashtag.posts} posts</Text>
                </View>
                <View style={styles.hashtagActions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Star size={18} color={hashtag.saved ? '#FFD700' : theme.colors.secondaryText} fill={hashtag.saved ? '#FFD700' : 'transparent'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Copy size={18} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.hashtagStats}>
                <View style={styles.hashtagStat}>
                  <Eye size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{hashtag.reach}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
                <View style={styles.hashtagStat}>
                  <BarChart3 size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{hashtag.engagement}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10, marginBottom: 16 },
  searchInput: { flex: 1, fontSize: 15 },
  categoryContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  categoryTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)', gap: 6 },
  categoryText: { fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  addButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, gap: 6 },
  addButtonText: { fontSize: 13, fontWeight: '600' },
  setCard: { width: 180, padding: 14, borderRadius: 14, marginRight: 12 },
  setName: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  setTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  miniTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  miniTagText: { fontSize: 11, fontWeight: '600' },
  moreTags: { fontSize: 12, marginLeft: 4 },
  setUses: { fontSize: 11, marginBottom: 10 },
  copySetButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 8, borderWidth: 1, gap: 6 },
  copySetText: { fontSize: 12, fontWeight: '600' },
  hashtagCard: { padding: 14, borderRadius: 14, marginBottom: 12 },
  hashtagHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  hashtagIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  hashtagInfo: { flex: 1 },
  hashtagNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hashtagName: { fontSize: 16, fontWeight: '600' },
  trendingBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  trendingText: { fontSize: 10, fontWeight: '600', color: '#FF9500' },
  hashtagPosts: { fontSize: 12, marginTop: 2 },
  hashtagActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 6 },
  hashtagStats: { flexDirection: 'row', alignItems: 'center' },
  hashtagStat: { flex: 1, alignItems: 'center', gap: 4 },
  statDivider: { width: 1, height: 32 },
  statValue: { fontSize: 15, fontWeight: '700' },
  statLabel: { fontSize: 11 },
});
