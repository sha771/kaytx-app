import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Switch,
  TextInput,
} from 'react-native';
import {
  HelpCircle,
  Search,
  Plus,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Lock,
  ChevronRight,
  Sparkles,
  Filter,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  Copy,
  Star,
  Zap,
  FileText,
  Users,
  Globe,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIFAQResponderScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-faq-responder')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isPremiumLocked = useMemo(() => {
    return (
      agent.isPremium &&
      (subscription?.plan === 'free' || subscription?.plan === 'starter')
    );
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  const [searchQuery, setSearchQuery] = useState('');

  // Key Metrics
  const keyMetrics = {
    totalFAQs: 248,
    autoResolved: 1847,
    avgResponseTime: '0.8s',
    satisfaction: '91.4%',
  };

  // FAQ Categories
  const faqCategories = [
    { name: 'Account & Login', count: 42, icon: Users, color: '#3B82F6', views: 3420 },
    { name: 'Billing & Payments', count: 38, icon: FileText, color: '#10B981', views: 2890 },
    { name: 'Product Features', count: 56, icon: Sparkles, color: '#8B5CF6', views: 4210 },
    { name: 'Technical Issues', count: 64, icon: HelpCircle, color: '#EF4444', views: 5670 },
    { name: 'API & Integration', count: 28, icon: Globe, color: '#F59E0B', views: 1890 },
    { name: 'Security & Privacy', count: 20, icon: Lock, color: '#6366F1', views: 1240 },
  ];

  // Top FAQs
  const topFAQs = [
    {
      id: 'FAQ-001',
      question: 'How do I reset my password?',
      category: 'Account & Login',
      views: 1240,
      helpful: 94,
      autoResolved: 892,
      lastUpdated: '2 days ago',
    },
    {
      id: 'FAQ-002',
      question: 'What payment methods do you accept?',
      category: 'Billing & Payments',
      views: 980,
      helpful: 91,
      autoResolved: 724,
      lastUpdated: '1 week ago',
    },
    {
      id: 'FAQ-003',
      question: 'How to set up API authentication?',
      category: 'API & Integration',
      views: 870,
      helpful: 88,
      autoResolved: 542,
      lastUpdated: '3 days ago',
    },
    {
      id: 'FAQ-004',
      question: 'Can I export my data?',
      category: 'Product Features',
      views: 760,
      helpful: 92,
      autoResolved: 618,
      lastUpdated: '5 days ago',
    },
    {
      id: 'FAQ-005',
      question: 'Why is my integration not working?',
      category: 'Technical Issues',
      views: 650,
      helpful: 86,
      autoResolved: 412,
      lastUpdated: '1 day ago',
    },
  ];

  // Recent Queries
  const recentQueries = [
    { query: 'How to change email address?', matched: true, responseTime: '0.6s' },
    { query: 'Invoice download not working', matched: true, responseTime: '0.9s' },
    { query: 'Custom domain setup', matched: true, responseTime: '0.7s' },
    { query: 'Team member permissions', matched: false, responseTime: '-' },
    { query: 'Data backup frequency', matched: true, responseTime: '0.5s' },
  ];

  const renderKnowledgeTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <BookOpen size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.totalFAQs}</Text>
            <Text style={styles.metricLabel}>Total FAQs</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.autoResolved.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Auto-Resolved</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.avgResponseTime}</Text>
            <Text style={styles.metricLabel}>Avg Response</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Star size={20} color="#fff" />
            <Text style={styles.metricValue}>{keyMetrics.satisfaction}</Text>
            <Text style={styles.metricLabel}>Satisfaction</Text>
          </LinearGradient>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search FAQs..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQ Categories */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <BookOpen size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categories</Text>
            </View>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}>
              <Plus size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.categoryGrid}>
            {faqCategories.map((cat) => (
              <TouchableOpacity key={cat.name} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
                  <cat.icon size={22} color={cat.color} />
                </View>
                <Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.name}</Text>
                <View style={styles.categoryStats}>
                  <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>{cat.count} FAQs</Text>
                  <Text style={[styles.categoryViews, { color: theme.colors.secondaryText }]}>{cat.views.toLocaleString()} views</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top FAQs */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <TrendingUp size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top FAQs</Text>
            </View>
          </View>

          <View style={styles.faqList}>
            {topFAQs.map((faq, idx) => (
              <View key={faq.id} style={styles.faqCard}>
                <View style={styles.faqHeader}>
                  <View style={styles.faqRank}>
                    <Text style={styles.faqRankText}>#{idx + 1}</Text>
                  </View>
                  <View style={styles.faqInfo}>
                    <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>{faq.question}</Text>
                    <Text style={[styles.faqCategory, { color: theme.colors.secondaryText }]}>{faq.category}</Text>
                  </View>
                </View>

                <View style={styles.faqMetrics}>
                  <View style={styles.faqMetric}>
                    <Eye size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.faqMetricText, { color: theme.colors.secondaryText }]}>{faq.views.toLocaleString()}</Text>
                  </View>
                  <View style={styles.faqMetric}>
                    <ThumbsUp size={14} color="#10B981" />
                    <Text style={[styles.faqMetricText, { color: '#10B981' }]}>{faq.helpful}%</Text>
                  </View>
                  <View style={styles.faqMetric}>
                    <CheckCircle size={14} color="#3B82F6" />
                    <Text style={[styles.faqMetricText, { color: '#3B82F6' }]}>{faq.autoResolved} resolved</Text>
                  </View>
                </View>

                <View style={styles.faqFooter}>
                  <Text style={[styles.faqUpdated, { color: theme.colors.secondaryText }]}>Updated {faq.lastUpdated}</Text>
                  <View style={styles.faqActions}>
                    <TouchableOpacity>
                      <Edit size={16} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Copy size={16} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View
          style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}
        >
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI FAQ Responder is part of our Enterprise suite. Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity
              style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderActivityTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Match Rate */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Match Performance</Text>
            </View>
          </View>

          <View style={styles.matchContainer}>
            <View style={styles.matchMain}>
              <Text style={[styles.matchValue, { color: '#10B981' }]}>87.4%</Text>
              <Text style={[styles.matchLabel, { color: theme.colors.secondaryText }]}>FAQ Match Rate</Text>
            </View>
            <View style={styles.matchBreakdown}>
              <View style={styles.matchItem}>
                <Text style={[styles.matchItemValue, { color: theme.colors.text }]}>87.4%</Text>
                <Text style={[styles.matchItemLabel, { color: theme.colors.secondaryText }]}>Direct match</Text>
              </View>
              <View style={styles.matchItem}>
                <Text style={[styles.matchItemValue, { color: theme.colors.text }]}>8.2%</Text>
                <Text style={[styles.matchItemLabel, { color: theme.colors.secondaryText }]}>Partial match</Text>
              </View>
              <View style={styles.matchItem}>
                <Text style={[styles.matchItemValue, { color: theme.colors.text }]}>4.4%</Text>
                <Text style={[styles.matchItemLabel, { color: theme.colors.secondaryText }]}>No match</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Queries */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MessageSquare size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Queries</Text>
            </View>
          </View>

          <View style={styles.queryList}>
            {recentQueries.map((q, idx) => (
              <View key={idx} style={styles.queryCard}>
                <View style={styles.queryLeft}>
                  <Text style={[styles.queryText, { color: theme.colors.text }]}>{q.query}</Text>
                </View>
                <View style={styles.queryRight}>
                  {q.matched ? (
                    <View style={styles.matchedBadge}>
                      <CheckCircle size={14} color="#10B981" />
                      <Text style={styles.matchedText}>Matched</Text>
                    </View>
                  ) : (
                    <View style={styles.unmatchedBadge}>
                      <HelpCircle size={14} color="#F59E0B" />
                      <Text style={styles.unmatchedText}>No Match</Text>
                    </View>
                  )}
                  <Text style={[styles.responseTime, { color: theme.colors.secondaryText }]}>{q.responseTime}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Suggestions */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Zap size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Suggestions</Text>
            </View>
          </View>

          <View style={styles.suggestionList}>
            {[
              { msg: 'Add FAQ for "Team member permissions" — 12 unmatched queries this week', priority: 'high' },
              { msg: 'Update "API authentication" FAQ — helpfulness dropped to 88%', priority: 'medium' },
              { msg: 'Merge duplicate FAQs in "Technical Issues" category', priority: 'low' },
            ].map((sug, idx) => (
              <View key={idx} style={[styles.suggestionCard, { borderLeftColor: sug.priority === 'high' ? '#EF4444' : sug.priority === 'medium' ? '#F59E0B' : '#6B7280' }]}>
                <Text style={[styles.suggestionText, { color: theme.colors.text }]}>{sug.msg}</Text>
                <TouchableOpacity style={[styles.suggestionBtn, { backgroundColor: theme.colors.primary + '15' }]}>
                  <Text style={[styles.suggestionBtnText, { color: theme.colors.primary }]}>Create</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, component: renderKnowledgeTab() },
    { id: 'activity', label: 'Activity', icon: BarChart3, component: renderActivityTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  addBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  categoryIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  categoryName: { fontSize: 13, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  categoryStats: { alignItems: 'center' },
  categoryCount: { fontSize: 12, fontWeight: '600' },
  categoryViews: { fontSize: 11, marginTop: 2 },
  faqList: { gap: 12 },
  faqCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  faqHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  faqRank: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#3B82F615',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqRankText: { fontSize: 12, fontWeight: '700', color: '#3B82F6' },
  faqInfo: { flex: 1 },
  faqQuestion: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  faqCategory: { fontSize: 12 },
  faqMetrics: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  faqMetric: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  faqMetricText: { fontSize: 12, fontWeight: '600' },
  faqFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  faqUpdated: { fontSize: 12 },
  faqActions: { flexDirection: 'row', gap: 16 },
  matchContainer: { alignItems: 'center', paddingVertical: 20 },
  matchMain: { alignItems: 'center', marginBottom: 24 },
  matchValue: { fontSize: 48, fontWeight: '800' },
  matchLabel: { fontSize: 15, marginTop: 8 },
  matchBreakdown: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
  matchItem: { alignItems: 'center' },
  matchItemValue: { fontSize: 20, fontWeight: '700' },
  matchItemLabel: { fontSize: 12, marginTop: 4 },
  queryList: { gap: 12 },
  queryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 14,
    borderRadius: 14,
  },
  queryLeft: { flex: 1 },
  queryText: { fontSize: 14, fontWeight: '600' },
  queryRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  matchedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#10B98120', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  matchedText: { fontSize: 11, color: '#10B981', fontWeight: '600' },
  unmatchedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F59E0B20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  unmatchedText: { fontSize: 11, color: '#F59E0B', fontWeight: '600' },
  responseTime: { fontSize: 12 },
  suggestionList: { gap: 12 },
  suggestionCard: {
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(0,0,0,0.02)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionText: { fontSize: 13, flex: 1, lineHeight: 18 },
  suggestionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  suggestionBtnText: { fontSize: 12, fontWeight: '600' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
