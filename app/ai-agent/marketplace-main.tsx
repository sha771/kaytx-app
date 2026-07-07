import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Store,
  Search,
  ListFilter,
  Star,
  Download,
  Users,
  Zap,
  Brain,
  MessageSquare,
  Target,
  TrendingUp,
  Shield,
  Heart,
  Clock,
  Grid3X3,
  List,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const templates = [
  {
    id: 'customer-support-pro',
    name: 'Customer Support Pro',
    description: 'Advanced customer service agent with multi-language support, sentiment analysis, and escalation handling.',
    category: 'customer-experience',
    icon: MessageSquare,
    color: '#007AFF',
    downloads: 12580,
    rating: 4.9,
    reviews: 324,
    tags: ['Support', 'Multi-language', 'Sentiment'],
    features: ['Auto-translation', 'Ticket routing', 'Knowledge base integration'],
    model: 'gpt-4o',
    voiceEnabled: true,
    trainingRequired: true,
    installTime: '5 min',
  },
  {
    id: 'sales-closer',
    name: 'Sales Closer',
    description: 'High-conversion sales agent trained on closing techniques and objection handling.',
    category: 'sales',
    icon: Target,
    color: '#10B981',
    downloads: 8932,
    rating: 4.8,
    reviews: 256,
    tags: ['Sales', 'CRM', 'Pipeline'],
    features: ['Lead scoring', 'Email sequencing', 'Deal tracking'],
    model: 'gpt-4o',
    voiceEnabled: true,
    trainingRequired: false,
    installTime: '3 min',
  },
  {
    id: 'marketing-automation',
    name: 'Marketing Automation Suite',
    description: 'Complete marketing automation with campaign management, A/B testing, and analytics.',
    category: 'marketing',
    icon: TrendingUp,
    color: '#F59E0B',
    downloads: 7210,
    rating: 4.7,
    reviews: 189,
    tags: ['Marketing', 'Email', 'Social'],
    features: ['Campaign builder', 'Audience segmentation', 'ROI tracking'],
    model: 'claude-3-sonnet',
    voiceEnabled: false,
    trainingRequired: false,
    installTime: '7 min',
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst Pro',
    description: 'Expert financial analysis agent with forecasting, reporting, and compliance monitoring.',
    category: 'accounting',
    icon: Brain,
    color: '#8B5CF6',
    downloads: 5643,
    rating: 4.9,
    reviews: 142,
    tags: ['Finance', 'Reports', 'Compliance'],
    features: ['Forecasting', 'Variance analysis', 'Audit trails'],
    model: 'gpt-4o',
    voiceEnabled: false,
    trainingRequired: true,
    installTime: '8 min',
  },
  {
    id: 'security-guardian',
    name: 'Security Guardian',
    description: 'AI security agent for threat detection, compliance monitoring, and incident response.',
    category: 'operations',
    icon: Shield,
    color: '#EF4444',
    downloads: 4892,
    rating: 4.6,
    reviews: 98,
    tags: ['Security', 'Compliance', 'Monitoring'],
    features: ['Threat detection', 'Access control', 'Audit logging'],
    model: 'claude-3-opus',
    voiceEnabled: false,
    trainingRequired: true,
    installTime: '10 min',
  },
  {
    id: 'data-analyst',
    name: 'Data Intelligence Analyst',
    description: 'Advanced data analysis with visualization, insights generation, and predictive modeling.',
    category: 'data',
    icon: Zap,
    color: '#EC4899',
    downloads: 6721,
    rating: 4.8,
    reviews: 178,
    tags: ['Analytics', 'ML', 'Visualization'],
    features: ['Auto-visualization', 'Predictive models', 'Data cleaning'],
    model: 'gpt-4o',
    voiceEnabled: false,
    trainingRequired: true,
    installTime: '6 min',
  },
  {
    id: 'hr-assistant',
    name: 'HR Assistant',
    description: 'Human resources agent for recruitment, onboarding, and employee engagement.',
    category: 'operations',
    icon: Users,
    color: '#14B8A6',
    downloads: 4356,
    rating: 4.5,
    reviews: 87,
    tags: ['HR', 'Recruiting', 'Onboarding'],
    features: ['Resume parsing', 'Interview scheduling', 'Onboarding flows'],
    model: 'gpt-4o-mini',
    voiceEnabled: true,
    trainingRequired: false,
    installTime: '4 min',
  },
  {
    id: 'inventory-manager',
    name: 'Inventory Manager',
    description: 'Smart inventory management with demand forecasting and automated reordering.',
    category: 'operations',
    icon: Grid3X3,
    color: '#6366F1',
    downloads: 3892,
    rating: 4.4,
    reviews: 76,
    tags: ['Inventory', 'Supply Chain', 'Forecasting'],
    features: ['Stock alerts', 'Supplier management', 'Demand prediction'],
    model: 'claude-3-sonnet',
    voiceEnabled: false,
    trainingRequired: true,
    installTime: '6 min',
  },
];

const categories = [
  { id: 'all', label: 'All Templates', icon: Store },
  { id: 'customer-experience', label: 'Customer Experience', icon: MessageSquare },
  { id: 'sales', label: 'Sales', icon: Target },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
  { id: 'accounting', label: 'Accounting', icon: Brain },
  { id: 'operations', label: 'Operations', icon: Zap },
  { id: 'data', label: 'Data Intelligence', icon: Grid3X3 },
];

export default function AgentMarketplaceScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );


  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            fill={star <= Math.round(rating) ? '#F59E0B' : 'transparent'}
            color={star <= Math.round(rating) ? '#F59E0B' : '#9CA3AF'}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Store size={22} color={colors.primary} />
            <Text style={[styles.titleText, { color: colors.text }]}>Agent Marketplace</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.text + '60'} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search templates..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <ListFilter size={20} color={colors.text + '60'} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, selectedCategory === cat.id && { backgroundColor: colors.primary }]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <cat.icon size={14} color={selectedCategory === cat.id ? '#fff' : colors.text} />
              <Text style={[styles.categoryText, { color: selectedCategory === cat.id ? '#fff' : colors.text }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.viewToggle}>
          <Text style={[styles.resultsText, { color: colors.text + '60' }]}>{filteredTemplates.length} templates</Text>
          <View style={styles.viewButtons}>
            <TouchableOpacity 
              style={[styles.viewBtn, viewMode === 'grid' && { backgroundColor: colors.primary }]} 
              onPress={() => setViewMode('grid')}
            >
              <Grid3X3 size={18} color={viewMode === 'grid' ? '#fff' : colors.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.viewBtn, viewMode === 'list' && { backgroundColor: colors.primary }]} 
              onPress={() => setViewMode('list')}
            >
              <List size={18} color={viewMode === 'list' ? '#fff' : colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp}>
          <View style={viewMode === 'grid' ? styles.grid : styles.list}>
            {filteredTemplates.map((template, index) => (
              <Animated.View 
                key={template.id} 
                entering={FadeInUp.delay(index * 50)}
                style={[viewMode === 'grid' ? styles.gridCard : styles.listCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: template.color + '15' }]}>
                    <template.icon size={24} color={template.color} />
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => toggleFavorite(template.id)}>
                      <Heart 
                        size={20} 
                        fill={favorites.includes(template.id) ? '#EF4444' : 'transparent'} 
                        color={favorites.includes(template.id) ? '#EF4444' : colors.text + '40'} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.templateName, { color: colors.text }]}>{template.name}</Text>
                <Text style={[styles.templateDesc, { color: colors.text + '60' }]} numberOfLines={2}>
                  {template.description}
                </Text>

                <View style={styles.tagsContainer}>
                  {template.tags.map(tag => (
                    <View key={tag} style={[styles.tagChip, { backgroundColor: template.color + '10' }]}>
                      <Text style={[styles.tagText, { color: template.color }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.statsRow}>
                  {renderStars(template.rating)}
                  <Text style={[styles.ratingText, { color: colors.text + '60' }]}>
                    {template.rating} ({template.reviews})
                  </Text>
                  <Download size={14} color={colors.text + '40'} />
                  <Text style={[styles.downloadsText, { color: colors.text + '60' }]}>
                    {template.downloads.toLocaleString()}
                  </Text>
                </View>

                <View style={[styles.installInfo, { borderTopColor: colors.border }]}>
                  <View style={styles.installDetail}>
                    <Clock size={14} color={colors.text + '40'} />
                    <Text style={[styles.installText, { color: colors.text + '60' }]}>{template.installTime}</Text>
                  </View>
                  <View style={styles.installDetail}>
                    <User size={14} color={colors.text + '40'} />
                    <Text style={[styles.installText, { color: colors.text + '60' }]}>{template.model}</Text>
                  </View>
                </View>

                <TouchableOpacity style={[styles.installBtn, { backgroundColor: colors.primary }]}>
                  <Download size={18} color="#fff" />
                  <Text style={styles.installBtnText}>Install</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#00000008',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 16 },
  filterBtn: { padding: 8 },
  categoryScroll: { paddingHorizontal: 16, marginBottom: 12 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#00000008',
    marginRight: 8,
  },
  categoryText: { fontSize: 13, fontWeight: '500' },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  resultsText: { fontSize: 14 },
  viewButtons: { flexDirection: 'row', gap: 6 },
  viewBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#00000008',
  },
  content: { flex: 1, padding: 16 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
  },
  list: { gap: 12 },
  listCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActions: { flexDirection: 'row', gap: 8 },
  templateName: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  templateDesc: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  tagChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: { fontSize: 11, fontWeight: '600' },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  stars: { flexDirection: 'row', gap: 2 },
  ratingText: { fontSize: 12 },
  downloadsText: { fontSize: 12 },
  installInfo: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 10,
    marginBottom: 12,
    borderTopWidth: 1,
  },
  installDetail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  installText: { fontSize: 12 },
  installBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
  },
  installBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  bottomSpacing: { height: 40 },
});

}