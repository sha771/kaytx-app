import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Brain, 
  Lightbulb, 
  ArrowLeft,
  Activity,
  Target,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  DollarSign,
  Globe,
  Clock
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface AIInsight {
  id: string;
  category: 'strategic' | 'financial' | 'operational' | 'risk' | 'growth';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

const aiInsights: AIInsight[] = [
  {
    id: '1',
    category: 'strategic',
    title: 'Southeast Asia Expansion Opportunity',
    description: 'Expansion into Southeast Asia is projected to increase annual revenue by $1.4B with 87% market penetration within 24 months.',
    impact: '+$1.4B Revenue',
    confidence: 87,
    priority: 'high',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    category: 'operational',
    title: 'AI-Driven Procurement Optimization',
    description: 'Operating costs can be reduced by 8% through AI-driven procurement optimization and automated supplier negotiations.',
    impact: '-$224M OpEx',
    confidence: 92,
    priority: 'high',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    category: 'financial',
    title: 'M&A Target Synergy Analysis',
    description: 'Acquisition target shows projected synergy value of $680M with integration timeline of 18 months.',
    impact: '+$680M Value',
    confidence: 78,
    priority: 'medium',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    category: 'risk',
    title: 'Geopolitical Risk Alert',
    description: 'Enterprise risk increased due to geopolitical disruptions in two strategic markets. Recommend supply chain diversification.',
    impact: 'Risk Mitigation',
    confidence: 94,
    priority: 'high',
    timestamp: '8 hours ago'
  },
  {
    id: '5',
    category: 'growth',
    title: 'AI Productivity Enhancement',
    description: 'AI adoption could improve workforce productivity by 17% within 12 months through intelligent automation and decision support.',
    impact: '+17% Productivity',
    confidence: 89,
    priority: 'medium',
    timestamp: '12 hours ago'
  },
  {
    id: '6',
    category: 'strategic',
    title: 'Digital Transformation Acceleration',
    description: 'Accelerating digital transformation initiative could generate $2.1B in additional value over 3 years.',
    impact: '+$2.1B Value',
    confidence: 85,
    priority: 'medium',
    timestamp: '1 day ago'
  },
  {
    id: '7',
    category: 'financial',
    title: 'Capital Allocation Optimization',
    description: 'Reallocating 15% of R&D budget to high-growth markets could improve ROI by 12%.',
    impact: '+12% ROI',
    confidence: 76,
    priority: 'low',
    timestamp: '1 day ago'
  }
];

export default function AIInsights() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  const categories = [
    { id: 'all', label: 'All Insights' },
    { id: 'strategic', label: 'Strategic' },
    { id: 'financial', label: 'Financial' },
    { id: 'operational', label: 'Operational' },
    { id: 'risk', label: 'Risk' },
    { id: 'growth', label: 'Growth' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategic': return '#3B82F6';
      case 'financial': return '#10B981';
      case 'operational': return '#8B5CF6';
      case 'risk': return '#EF4444';
      case 'growth': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const filteredInsights = selectedCategory === 'all' 
    ? aiInsights 
    : aiInsights.filter(insight => insight.category === selectedCategory);

  const InsightCard = ({ insight }: { insight: AIInsight }) => (
    <TouchableOpacity
      style={[styles.insightCard, { backgroundColor: '#0A0F1A' }]}
      onPress={() => setSelectedInsight(insight)}
    >
      <View style={styles.insightHeader}>
        <View style={[styles.insightCategory, { backgroundColor: `${getCategoryColor(insight.category)}20` }]}>
          <Brain size={16} color={getCategoryColor(insight.category)} />
          <Text style={[styles.insightCategoryText, { color: getCategoryColor(insight.category) }]}>
            {insight.category.toUpperCase()}
          </Text>
        </View>
        <View style={[styles.insightPriority, { backgroundColor: `${getPriorityColor(insight.priority)}20` }]}>
          <Text style={[styles.insightPriorityText, { color: getPriorityColor(insight.priority) }]}>
            {insight.priority.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.insightTitle}>{insight.title}</Text>
      <Text style={styles.insightDescription} numberOfLines={2}>{insight.description}</Text>
      <View style={styles.insightFooter}>
        <View style={styles.insightImpact}>
          <Target size={14} color="#F59E0B" />
          <Text style={styles.insightImpactText}>{insight.impact}</Text>
        </View>
        <View style={styles.insightMeta}>
          <Clock size={14} color="#9CA3AF" />
          <Text style={styles.insightTimestamp}>{insight.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const InsightDetail = ({ insight }: { insight: AIInsight }) => (
    <View style={[styles.insightDetail, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.insightDetailHeader}>
        <TouchableOpacity onPress={() => setSelectedInsight(null)}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={[styles.insightDetailCategory, { backgroundColor: `${getCategoryColor(insight.category)}20` }]}>
          <Brain size={20} color={getCategoryColor(insight.category)} />
          <Text style={[styles.insightDetailCategoryText, { color: getCategoryColor(insight.category) }]}>
            {insight.category.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.insightDetailTitle}>{insight.title}</Text>
      <Text style={styles.insightDetailDescription}>{insight.description}</Text>

      <View style={styles.insightDetailMetrics}>
        <View style={styles.insightDetailMetric}>
          <Target size={24} color="#F59E0B" />
          <View style={styles.insightDetailMetricInfo}>
            <Text style={styles.insightDetailMetricLabel}>Impact</Text>
            <Text style={[styles.insightDetailMetricValue, { color: '#F59E0B' }]}>{insight.impact}</Text>
          </View>
        </View>
        <View style={styles.insightDetailMetric}>
          <CheckCircle size={24} color="#10B981" />
          <View style={styles.insightDetailMetricInfo}>
            <Text style={styles.insightDetailMetricLabel}>Confidence</Text>
            <Text style={[styles.insightDetailMetricValue, { color: '#10B981' }]}>{insight.confidence}%</Text>
          </View>
        </View>
        <View style={styles.insightDetailMetric}>
          <AlertTriangle size={24} color={getPriorityColor(insight.priority)} />
          <View style={styles.insightDetailMetricInfo}>
            <Text style={styles.insightDetailMetricLabel}>Priority</Text>
            <Text style={[styles.insightDetailMetricValue, { color: getPriorityColor(insight.priority) }]}>
              {insight.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.insightDetailActions}>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]}>
          <CheckCircle size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Accept Recommendation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
          <Activity size={16} color="#9CA3AF" />
          <Text style={[styles.actionButtonText, { color: '#9CA3AF' }]}>Request Analysis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insightDetailFooter}>
        <Clock size={14} color="#9CA3AF" />
        <Text style={styles.insightDetailTimestamp}>Generated {insight.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Insights Center</Text>
          <Text style={styles.headerSubtitle}>Executive Intelligence & Recommendations</Text>
        </View>
        <Brain size={20} color="#06B6D4" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryChip, selectedCategory === category.id && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === category.id && styles.categoryChipTextActive]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedInsight ? (
          <InsightDetail insight={selectedInsight} />
        ) : (
          <>
            <View style={styles.summarySection}>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Brain size={32} color="#06B6D4" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>847</Text>
                  <Text style={styles.summaryLabel}>Recommendations</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <CheckCircle size={32} color="#10B981" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>94.7%</Text>
                  <Text style={styles.summaryLabel}>Accuracy</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <DollarSign size={32} color="#F59E0B" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>+$7.9B</Text>
                  <Text style={styles.summaryLabel}>Value Created</Text>
                </View>
              </View>
            </View>

            <View style={styles.insightsSection}>
              <Text style={styles.sectionTitle}>AI-Generated Insights</Text>
              {filteredInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryChipActive: {
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  content: { flex: 1 },
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryInfo: { flex: 1 },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  insightsSection: { padding: 20, paddingTop: 0 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightPriority: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightPriorityText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 12,
    lineHeight: 18,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightImpactText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  insightDetail: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  insightDetailCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  insightDetailCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightDetailTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  insightDetailDescription: {
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 22,
    marginBottom: 24,
  },
  insightDetailMetrics: {
    gap: 16,
    marginBottom: 24,
  },
  insightDetailMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  insightDetailMetricInfo: {
    flex: 1,
  },
  insightDetailMetricLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  insightDetailMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  insightDetailActions: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  actionButtonPrimary: {
    backgroundColor: '#06B6D4',
  },
  actionButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insightDetailFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  insightDetailTimestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
