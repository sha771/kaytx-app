 
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
  Book,
  Search,
  Plus,
  Folder,
  Star,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react-native';

interface Article {
  id: string;
  title: string;
  category: string;
  views: number;
  likes: number;
  lastUpdated: string;
  author: string;
  excerpt: string;
  featured: boolean;
}

export default function KnowledgeBaseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Getting Started with Product Features',
      category: 'Onboarding',
      views: 5420,
      likes: 342,
      lastUpdated: '2 days ago',
      author: 'Sarah Johnson',
      excerpt: 'Learn the basics of our platform and start using key features...',
      featured: true,
    },
    {
      id: '2',
      title: 'Advanced API Integration Guide',
      category: 'Development',
      views: 3890,
      likes: 278,
      lastUpdated: '5 days ago',
      author: 'Mike Chen',
      excerpt: 'Deep dive into API endpoints and integration patterns...',
      featured: true,
    },
    {
      id: '3',
      title: 'Best Practices for Team Collaboration',
      category: 'Team Management',
      views: 2150,
      likes: 156,
      lastUpdated: '1 week ago',
      author: 'Emily Davis',
      excerpt: 'Tips and tricks for effective team collaboration...',
      featured: false,
    },
    {
      id: '4',
      title: 'Security & Compliance Overview',
      category: 'Security',
      views: 1890,
      likes: 124,
      lastUpdated: '2 weeks ago',
      author: 'Alex Martinez',
      excerpt: 'Understanding our security features and compliance standards...',
      featured: false,
    },
  ]);

  const categories = [
    'all',
    'Onboarding',
    'Development',
    'Team Management',
    'Security',
    'Billing',
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalArticles: articles.length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    featured: articles.filter((a) => a.featured).length,
    avgLikes: Math.round(
      articles.reduce((sum, a) => sum + a.likes, 0) / articles.length
    ),
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Knowledge Base',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Knowledge Base</Text>
          <Text style={styles.subtitle}>Documentation and resources</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Book size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.totalArticles}</Text>
            <Text style={styles.statLabel}>Articles</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.totalViews.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <Star size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.featured}</Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <Users size={20} color="#fff" />
            <Text style={styles.statValue}>{stats.avgLikes}</Text>
            <Text style={styles.statLabel}>Avg Likes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search articles..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Folder
                  size={16}
                  color={selectedCategory === category ? '#fff' : '#64748B'}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredArticles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.articleCard}>
              {article.featured && (
                <View style={styles.featuredBadge}>
                  <Star size={14} color="#F59E0B" />
                  <Text style={styles.featuredText}>Featured</Text>
                </View>
              )}

              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt}>{article.excerpt}</Text>

              <View style={styles.categoryTag}>
                <Folder size={14} color="#3B82F6" />
                <Text style={styles.categoryTagText}>{article.category}</Text>
              </View>

              <View style={styles.articleMeta}>
                <View style={styles.metaItem}>
                  <TrendingUp size={14} color="#64748B" />
                  <Text style={styles.metaText}>
                    {article.views.toLocaleString()} views
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Star size={14} color="#64748B" />
                  <Text style={styles.metaText}>{article.likes} likes</Text>
                </View>

                <View style={styles.metaItem}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.metaText}>{article.lastUpdated}</Text>
                </View>
              </View>

              <View style={styles.authorSection}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {article.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Text>
                </View>
                <Text style={styles.authorName}>{article.author}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerButton: {
    marginRight: 16,
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
    fontSize: 18,
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
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    marginRight: 8,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  articleCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 12,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#3B82F620',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  articleMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  authorName: {
    fontSize: 14,
    color: '#94A3B8',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
