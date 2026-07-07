import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Database,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Zap,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Briefcase,
  Building,
  Globe,
  MapPin,
  AlertTriangle,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Share2,
  Download,
  Eye,
  Star,
  Tag,
  Folder,
  File,
  Video,
  Link,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function KnowledgeIntelligenceCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'case-studies' | 'best-practices' | 'templates'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  const knowledgeMetrics = {
    totalAssets: 24800,
    caseStudies: 1240,
    bestPractices: 860,
    deliveryTemplates: 540,
    internalArticles: 18600,
    aiGeneratedInsights: 3200,
    knowledgeGraphNodes: 12400,
    knowledgeGraphConnections: 48200,
    expertiseAreas: 86,
    avgQualityScore: 92,
    monthlyUsage: 45000
  };

  const topCategories = [
    { category: 'Cloud Migration', count: 234, trend: '+18%', quality: 94 },
    { category: 'Data Analytics', count: 198, trend: '+24%', quality: 91 },
    { category: 'AI/ML Implementation', count: 156, trend: '+42%', quality: 96 },
    { category: 'Cybersecurity', count: 142, trend: '+28%', quality: 93 },
    { category: 'Digital Transformation', count: 128, trend: '+22%', quality: 89 },
    { category: 'Change Management', count: 98, trend: '+15%', quality: 88 }
  ];

  const knowledgeAssets = [
    {
      id: 1,
      title: 'Enterprise Cloud Migration Framework',
      type: 'best-practice',
      category: 'Cloud Migration',
      author: 'Cloud Services Team',
      qualityScore: 96,
      views: 1240,
      downloads: 320,
      rating: 4.8,
      lastUpdated: '2024-01-15',
      tags: ['Cloud', 'Migration', 'Framework', 'Best Practice'],
      format: 'Document',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'AI/ML Implementation Playbook',
      type: 'template',
      category: 'AI/ML Implementation',
      author: 'AI Center of Excellence',
      qualityScore: 94,
      views: 890,
      downloads: 280,
      rating: 4.9,
      lastUpdated: '2024-01-18',
      tags: ['AI', 'ML', 'Playbook', 'Template'],
      format: 'Document',
      size: '3.8 MB'
    },
    {
      id: 3,
      title: 'Fortune 500 Tech Digital Transformation',
      type: 'case-study',
      category: 'Digital Transformation',
      author: 'Delivery Team',
      qualityScore: 92,
      views: 1560,
      downloads: 450,
      rating: 4.7,
      lastUpdated: '2024-01-10',
      tags: ['Digital', 'Transformation', 'Case Study', 'Enterprise'],
      format: 'Document',
      size: '5.2 MB'
    },
    {
      id: 4,
      title: 'Zero Trust Security Implementation',
      type: 'best-practice',
      category: 'Cybersecurity',
      author: 'Security Practice',
      qualityScore: 95,
      views: 720,
      downloads: 210,
      rating: 4.8,
      lastUpdated: '2024-01-20',
      tags: ['Security', 'Zero Trust', 'Best Practice'],
      format: 'Document',
      size: '1.8 MB'
    },
    {
      id: 5,
      title: 'Data Governance Framework',
      type: 'template',
      category: 'Data Analytics',
      author: 'Data Practice',
      qualityScore: 91,
      views: 640,
      downloads: 180,
      rating: 4.6,
      lastUpdated: '2024-01-12',
      tags: ['Data', 'Governance', 'Template', 'Framework'],
      format: 'Document',
      size: '2.1 MB'
    }
  ];

  const recentInsights = [
    { id: 1, title: 'Cloud Cost Optimization Patterns', category: 'Cloud Migration', generated: '2024-01-20', impact: 'high' },
    { id: 2, title: 'AI Model Selection Guidelines', category: 'AI/ML Implementation', generated: '2024-01-19', impact: 'medium' },
    { id: 3, title: 'Change Management Success Factors', category: 'Change Management', generated: '2024-01-18', impact: 'medium' },
    { id: 4, title: 'Security Compliance Automation', category: 'Cybersecurity', generated: '2024-01-17', impact: 'high' },
    { id: 5, title: 'Data Quality Metrics Framework', category: 'Data Analytics', generated: '2024-01-16', impact: 'low' }
  ];

  const renderMetricCard = (label: string, value: string | number, icon: any, color: string, subtitle?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {subtitle && <Text style={[styles.metricCardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const renderCategoryRow = (category: any, index: number) => (
    <View key={index} style={styles.categoryRow}>
      <Text style={[styles.categoryName, { color: colors.text }]}>{category.category}</Text>
      <View style={[styles.categoryBar, { backgroundColor: colors.glass }]}>
        <View style={[styles.categoryFill, { width: `${(category.count / 234) * 100}%`, backgroundColor: colors.electricBlue }]} />
      </View>
      <Text style={[styles.categoryCount, { color: colors.text }]}>{category.count}</Text>
      <View style={styles.trendBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.trendText, { color: colors.emeraldGreen }]}>{category.trend}</Text>
      </View>
      <Text style={[styles.categoryQuality, { color: category.quality >= 92 ? colors.emeraldGreen : colors.electricBlue }]}>{category.quality}%</Text>
    </View>
  );

  const renderAssetCard = (asset: any) => (
    <View key={asset.id} style={[styles.assetCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.assetHeader}>
        <View style={styles.assetInfo}>
          <View style={styles.assetTitleRow}>
            <Text style={[styles.assetTitle, { color: colors.text }]}>{asset.title}</Text>
            <View style={[
              styles.typeBadge,
              { backgroundColor: asset.type === 'case-study' ? colors.purple + '20' : asset.type === 'best-practice' ? colors.emeraldGreen + '20' : colors.electricBlue + '20' }
            ]}>
              <Text style={[
                styles.typeText,
                { color: asset.type === 'case-study' ? colors.purple : asset.type === 'best-practice' ? colors.emeraldGreen : colors.electricBlue }
              ]}>{asset.type}</Text>
            </View>
          </View>
          <Text style={[styles.assetCategory, { color: colors.textSecondary }]}>{asset.category} • {asset.author}</Text>
        </View>
        <View style={[styles.qualityBadge, { backgroundColor: colors.emeraldGreen + '20' }]}>
          <Star size={12} color={colors.emeraldGreen} />
          <Text style={[styles.qualityScore, { color: colors.emeraldGreen }]}>{asset.qualityScore}</Text>
        </View>
      </View>

      <View style={styles.assetMetrics}>
        <View style={styles.assetMetric}>
          <Eye size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{asset.views.toLocaleString()}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Views</Text>
        </View>
        <View style={styles.assetMetric}>
          <Download size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{asset.downloads}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Downloads</Text>
        </View>
        <View style={styles.assetMetric}>
          <Star size={14} color={colors.amber} />
          <Text style={[styles.metricValue, { color: colors.amber }]}>{asset.rating}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Rating</Text>
        </View>
        <View style={styles.assetMetric}>
          <File size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{asset.size}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Size</Text>
        </View>
      </View>

      <View style={styles.assetTags}>
        {asset.tags.slice(0, 3).map((tag: string, idx: number) => (
          <View key={idx} style={[styles.tagBadge, { backgroundColor: colors.purple + '20' }]}>
            <Tag size={10} color={colors.purple} />
            <Text style={[styles.tagText, { color: colors.purple }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.assetDetails}>
        <View style={styles.detailRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Updated: {asset.lastUpdated}</Text>
        </View>
        <View style={styles.detailRow}>
          <BookOpen size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Format: {asset.format}</Text>
        </View>
      </View>

      <View style={styles.assetActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <Eye size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Download size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40' }]}>
          <Share2 size={16} color={colors.emeraldGreen} />
          <Text style={[styles.actionButtonText, { color: colors.emeraldGreen }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInsightRow = (insight: any, index: number) => (
    <View key={index} style={[styles.insightRow, { borderBottomColor: colors.cardBorder }]}>
      <View style={[styles.insightDot, { backgroundColor: insight.impact === 'high' ? colors.red : insight.impact === 'medium' ? colors.amber : colors.emeraldGreen }]} />
      <View style={styles.insightContent}>
        <Text style={[styles.insightTitle, { color: colors.text }]}>{insight.title}</Text>
        <Text style={[styles.insightMeta, { color: colors.textSecondary }]}>{insight.category} • Generated: {insight.generated}</Text>
      </View>
      <View style={[
        styles.impactBadge,
        { backgroundColor: insight.impact === 'high' ? colors.red + '20' : insight.impact === 'medium' ? colors.amber + '20' : colors.emeraldGreen + '20' }
      ]}>
        <Text style={[
          styles.impactText,
          { color: insight.impact === 'high' ? colors.red : insight.impact === 'medium' ? colors.amber : colors.emeraldGreen }
        ]}>{insight.impact}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <Database size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Knowledge Intelligence Hub</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Enterprise Knowledge Management & AI Insights</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Knowledge Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Knowledge Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Assets', knowledgeMetrics.totalAssets, Database, colors.electricBlue)}
            {renderMetricCard('Case Studies', knowledgeMetrics.caseStudies, BookOpen, colors.purple)}
            {renderMetricCard('Best Practices', knowledgeMetrics.bestPractices, Award, colors.emeraldGreen)}
            {renderMetricCard('Templates', knowledgeMetrics.deliveryTemplates, FileText, colors.electricBlue)}
            {renderMetricCard('AI Insights', knowledgeMetrics.aiGeneratedInsights, Lightbulb, colors.amber)}
            {renderMetricCard('Knowledge Nodes', knowledgeMetrics.knowledgeGraphNodes, Layers, colors.purple)}
            {renderMetricCard('Connections', knowledgeMetrics.knowledgeGraphConnections, Link, colors.electricBlue)}
            {renderMetricCard('Avg Quality', `${knowledgeMetrics.avgQualityScore}%`, Star, colors.emeraldGreen)}
          </View>
        </View>

        {/* Top Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Knowledge Categories</Text>
          <View style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {topCategories.map((category, index) => renderCategoryRow(category, index))}
          </View>
        </View>

        {/* Recent AI Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent AI-Generated Insights</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {recentInsights.map((insight, index) => renderInsightRow(insight, index))}
          </View>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'case-studies', 'best-practices', 'templates'].map((view) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.filterTab,
                  selectedView === view && styles.activeFilterTab,
                  { backgroundColor: selectedView === view ? colors.electricBlue : colors.glass }
                ]}
                onPress={() => setSelectedView(view as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  { color: selectedView === view ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Knowledge Assets Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Knowledge Assets' : selectedView === 'case-studies' ? 'Case Studies' : selectedView === 'best-practices' ? 'Best Practices' : 'Templates'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>Add Asset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.assetsGrid}>
            {knowledgeAssets
              .filter(a => selectedView === 'all' || a.type === selectedView)
              .map((asset) => renderAssetCard(asset))}
          </View>
        </View>

        {/* AI Knowledge Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Knowledge Intelligence</Text>
          <View style={[styles.aiInsightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.aiInsightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.purple + '20' }]}>
                <Lightbulb size={20} color={colors.purple} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Knowledge Gap Identified</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI identifies gap in Edge Computing knowledge assets. Recommend creating 3-5 best practice documents based on recent project learnings.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Create</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.aiInsightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Content Optimization Opportunity</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI suggests updating 12 Cloud Migration assets with latest best practices to improve quality scores by 8-12%.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.aiInsightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.electricBlue + '20' }]}>
                <Zap size={20} color={colors.electricBlue} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Knowledge Graph Enhancement</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI recommends adding 45 new connections between AI/ML and Data Analytics assets to improve discoverability.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Enhance</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  metricCardSubtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
    width: 140,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  categoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoryQuality: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  insightMeta: {
    fontSize: 12,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  assetsGrid: {
    gap: 12,
  },
  assetCard: {
    padding: 16,
    borderRadius: 12,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  assetInfo: {
    flex: 1,
  },
  assetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  assetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  assetCategory: {
    fontSize: 14,
  },
  qualityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qualityScore: {
    fontSize: 12,
    fontWeight: '600',
  },
  assetMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  assetMetric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  assetTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  assetDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  assetActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  aiInsightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  aiInsightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  insightAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  insightActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
