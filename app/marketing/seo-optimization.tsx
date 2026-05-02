 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, TrendingUp, Users, Target, Zap, Plus, ListFilter } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function SEOOptimizationScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'keywords', 'content', 'technical', 'backlinks'];

  const seoMetrics = [
    { label: 'Domain Authority', value: 68, change: '+5', color: theme.colors.success },
    { label: 'Organic Traffic', value: '45.2K', change: '+12%', color: theme.colors.primary },
    { label: 'Keyword Rankings', value: 234, change: '+18', color: theme.colors.warning },
    { label: 'Backlinks', value: '1.2K', change: '+8%', color: theme.colors.error },
  ];

  const keywords = [
    {
      id: '1',
      keyword: 'digital marketing',
      position: 3,
      volume: 12000,
      difficulty: 'High',
      trend: 'up',
      clicks: 850,
    },
    {
      id: '2',
      keyword: 'social media management',
      position: 7,
      volume: 8500,
      difficulty: 'Medium',
      trend: 'up',
      clicks: 420,
    },
    {
      id: '3',
      keyword: 'content marketing',
      position: 12,
      volume: 15000,
      difficulty: 'High',
      trend: 'down',
      clicks: 280,
    },
    {
      id: '4',
      keyword: 'email automation',
      position: 5,
      volume: 6200,
      difficulty: 'Medium',
      trend: 'stable',
      clicks: 380,
    },
  ];

  const seoTasks = [
    {
      id: '1',
      title: 'Optimize meta descriptions',
      category: 'content',
      priority: 'high',
      status: 'pending',
      impact: 'High',
      effort: 'Low',
    },
    {
      id: '2',
      title: 'Fix broken internal links',
      category: 'technical',
      priority: 'medium',
      status: 'in-progress',
      impact: 'Medium',
      effort: 'Medium',
    },
    {
      id: '3',
      title: 'Build quality backlinks',
      category: 'backlinks',
      priority: 'high',
      status: 'pending',
      impact: 'High',
      effort: 'High',
    },
    {
      id: '4',
      title: 'Research long-tail keywords',
      category: 'keywords',
      priority: 'low',
      status: 'completed',
      impact: 'Medium',
      effort: 'Low',
    },
  ];

  const contentSuggestions = [
    {
      id: '1',
      title: 'How to Create Effective Email Campaigns',
      keywords: ['email marketing', 'campaigns', 'automation'],
      difficulty: 'Medium',
      potential: 'High',
    },
    {
      id: '2',
      title: 'Social Media Analytics Guide',
      keywords: ['social media', 'analytics', 'metrics'],
      difficulty: 'Low',
      potential: 'Medium',
    },
    {
      id: '3',
      title: 'Content Marketing ROI Calculator',
      keywords: ['content marketing', 'ROI', 'calculator'],
      difficulty: 'High',
      potential: 'High',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'low': return theme.colors.success;
      case 'medium': return theme.colors.warning;
      case 'high': return theme.colors.error;
      default: return theme.colors.secondaryText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low': return theme.colors.success;
      case 'medium': return theme.colors.warning;
      case 'high': return theme.colors.error;
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return theme.colors.success;
      case 'in-progress': return theme.colors.warning;
      case 'pending': return theme.colors.error;
      default: return theme.colors.secondaryText;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const filteredTasks = seoTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>SEO Optimization</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Search size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SEO Dashboard</Text>
          </View>
          <Text style={[styles.cardDescription, { color: theme.colors.secondaryText }]}>
            Monitor and optimize your search engine performance
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {seoMetrics.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <Text style={[styles.metricChange, { color: metric.color }]}>
                {metric.change}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Keywords</Text>
          
          <View style={styles.keywordsList}>
            {keywords.map((keyword) => (
              <View key={keyword.id} style={[styles.keywordCard, { borderColor: theme.colors.border }]}>
                <View style={styles.keywordHeader}>
                  <Text style={[styles.keywordText, { color: theme.colors.text }]}>
                    {keyword.keyword}
                  </Text>
                  <View style={styles.keywordMeta}>
                    <Text style={styles.trendIcon}>{getTrendIcon(keyword.trend)}</Text>
                    <Text style={[styles.positionText, { color: theme.colors.primary }]}>
                      #{keyword.position}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.keywordStats}>
                  <View style={styles.statItem}>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                      Volume
                    </Text>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>
                      {keyword.volume.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                      Clicks
                    </Text>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>
                      {keyword.clicks}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
                      Difficulty
                    </Text>
                    <View 
                      style={[
                        styles.difficultyBadge, 
                        { backgroundColor: getDifficultyColor(keyword.difficulty) }
                      ]}
                    >
                      <Text style={styles.difficultyText}>{keyword.difficulty}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SEO Tasks</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={[styles.searchInput, { borderColor: theme.colors.border }]}>
              <Search size={20} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Search tasks..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryFilter}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selectedCategory === category ? theme.colors.primary : 'transparent',
                      borderColor: theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      {
                        color: selectedCategory === category ? '#FFFFFF' : theme.colors.text,
                      },
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.tasksList}>
            {filteredTasks.map((task) => (
              <View key={task.id} style={[styles.taskCard, { borderColor: theme.colors.border }]}>
                <View style={styles.taskHeader}>
                  <Text style={[styles.taskTitle, { color: theme.colors.text }]}>
                    {task.title}
                  </Text>
                  <View style={styles.taskBadges}>
                    <View 
                      style={[
                        styles.priorityBadge, 
                        { backgroundColor: getPriorityColor(task.priority) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{task.priority}</Text>
                    </View>
                    <View 
                      style={[
                        styles.statusBadge, 
                        { backgroundColor: getStatusColor(task.status) }
                      ]}
                    >
                      <Text style={styles.badgeText}>{task.status}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.taskMeta}>
                  <Text style={[styles.taskCategory, { color: theme.colors.secondaryText }]}>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                  </Text>
                  <Text style={[styles.taskImpact, { color: theme.colors.text }]}>
                    Impact: {task.impact} • Effort: {task.effort}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Target size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Content Suggestions</Text>
          </View>
          
          <View style={styles.suggestionsList}>
            {contentSuggestions.map((suggestion) => (
              <View key={suggestion.id} style={[styles.suggestionCard, { borderColor: theme.colors.border }]}>
                <Text style={[styles.suggestionTitle, { color: theme.colors.text }]}>
                  {suggestion.title}
                </Text>
                
                <View style={styles.keywordTags}>
                  {suggestion.keywords.map((keyword, index) => (
                    <View key={index} style={[styles.keywordTag, { backgroundColor: theme.colors.primary }]}>
                      <Text style={styles.keywordTagText}>{keyword}</Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.suggestionMeta}>
                  <View style={styles.suggestionMetaItem}>
                    <Text style={[styles.suggestionMetaLabel, { color: theme.colors.secondaryText }]}>
                      Difficulty:
                    </Text>
                    <Text 
                      style={[
                        styles.suggestionMetaValue, 
                        { color: getDifficultyColor(suggestion.difficulty) }
                      ]}
                    >
                      {suggestion.difficulty}
                    </Text>
                  </View>
                  <View style={styles.suggestionMetaItem}>
                    <Text style={[styles.suggestionMetaLabel, { color: theme.colors.secondaryText }]}>
                      Potential:
                    </Text>
                    <Text style={[styles.suggestionMetaValue, { color: theme.colors.success }]}>
                      {suggestion.potential}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Zap size={24} color={theme.colors.primary} />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>SEO Tips</Text>
          </View>
          
          <View style={styles.tipsList}>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Focus on long-tail keywords with lower competition
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Create high-quality, original content regularly
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Optimize page loading speed and mobile experience
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Build quality backlinks from authoritative websites
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Use proper heading structure (H1, H2, H3)
            </Text>
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              • Monitor and fix technical SEO issues regularly
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    padding: 4,
  },
  keywordsList: {
    gap: 12,
  },
  keywordCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  keywordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  keywordText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  keywordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendIcon: {
    fontSize: 16,
  },
  positionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  keywordStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoryFilter: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tasksList: {
    gap: 12,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  taskBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  taskMeta: {
    gap: 4,
  },
  taskCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskImpact: {
    fontSize: 12,
  },
  suggestionsList: {
    gap: 16,
  },
  suggestionCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  keywordTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  keywordTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  keywordTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  suggestionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  suggestionMetaLabel: {
    fontSize: 12,
  },
  suggestionMetaValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});