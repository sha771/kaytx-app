import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, CheckCircle, Clock, TrendingUp, Search, Database, Shield, BookOpen, Sparkles, Filter, Download, Upload, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface DocumentCategory {
  name: string;
  count: number;
  icon: string;
  color: string;
}

interface DocumentMetrics {
  documentsProcessed: number;
  contracts: number;
  policies: number;
  reports: number;
  knowledgeBaseAssets: number;
  approvalRouted: number;
  classificationAccuracy: number;
  storageUtilization: number;
  searchActivity: number;
}

interface DocumentIntelligenceCenterProps {
  metrics: DocumentMetrics;
  categories: DocumentCategory[];
}

export default function DocumentIntelligenceCenter({ metrics, categories }: DocumentIntelligenceCenterProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <FileText size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Document Intelligence Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              AI-powered document management
            </Text>
          </View>
        </View>
        <View style={[styles.accuracyBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.accuracyBadgeText, { color: '#10B981' }]}>
            {metrics.classificationAccuracy}% Accuracy
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <FileText size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Documents Processed
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.documentsProcessed.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +18.5%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Approvals Routed
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.approvalRouted.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.3%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Database size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Storage Used
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.storageUtilization}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#F59E0B" />
            <Text style={[styles.trendText, { color: '#F59E0B' }]}>
              +2.4%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Search size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Search Activity
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.searchActivity.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +24.7%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.categoriesSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.categoriesHeader}>
          <Filter size={20} color="#8B5CF6" />
          <Text style={[styles.categoriesTitle, { color: theme.colors.text }]}>
            Document Categories
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <View key={index} style={[styles.categoryCard, { borderColor: category.color + '30', borderWidth: 1 }]}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <Text style={styles.categoryEmoji}>{category.icon}</Text>
              </View>
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                {category.name}
              </Text>
              <Text style={[styles.categoryCount, { color: category.color }]}>
                {category.count.toLocaleString()}
              </Text>
              <View style={[styles.categoryProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { 
                      backgroundColor: category.color,
                      width: `${Math.min((category.count / 5000) * 100, 100)}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.lifecycleSection}>
        <View style={styles.lifecycleHeader}>
          <Clock size={20} color="#8B5CF6" />
          <Text style={[styles.lifecycleTitle, { color: theme.colors.text }]}>
            Document Lifecycle
          </Text>
        </View>

        <View style={styles.lifecycleMetrics}>
          <View style={styles.lifecycleMetric}>
            <View style={[styles.lifecycleIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Upload size={16} color="#3B82F6" />
            </View>
            <View style={styles.lifecycleInfo}>
              <Text style={[styles.lifecycleLabel, { color: theme.colors.textSecondary }]}>
                Uploaded Today
              </Text>
              <Text style={[styles.lifecycleValue, { color: theme.colors.text }]}>
                847
              </Text>
            </View>
          </View>

          <View style={styles.lifecycleMetric}>
            <View style={[styles.lifecycleIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Eye size={16} color="#10B981" />
            </View>
            <View style={styles.lifecycleInfo}>
              <Text style={[styles.lifecycleLabel, { color: theme.colors.textSecondary }]}>
                Viewed Today
              </Text>
              <Text style={[styles.lifecycleValue, { color: theme.colors.text }]}>
                3,248
              </Text>
            </View>
          </View>

          <View style={styles.lifecycleMetric}>
            <View style={[styles.lifecycleIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Download size={16} color="#F59E0B" />
            </View>
            <View style={styles.lifecycleInfo}>
              <Text style={[styles.lifecycleLabel, { color: theme.colors.textSecondary }]}>
                Downloaded Today
              </Text>
              <Text style={[styles.lifecycleValue, { color: theme.colors.text }]}>
                1,425
              </Text>
            </View>
          </View>

          <View style={styles.lifecycleMetric}>
            <View style={[styles.lifecycleIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <Shield size={16} color="#EF4444" />
            </View>
            <View style={styles.lifecycleInfo}>
              <Text style={[styles.lifecycleLabel, { color: theme.colors.textSecondary }]}>
                Pending Approval
              </Text>
              <Text style={[styles.lifecycleValue, { color: theme.colors.text }]}>
                156
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.knowledgeSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.knowledgeHeader}>
          <BookOpen size={20} color="#8B5CF6" />
          <Text style={[styles.knowledgeTitle, { color: theme.colors.text }]}>
            Knowledge Base
          </Text>
          <View style={[styles.knowledgeBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Database size={14} color="#8B5CF6" />
            <Text style={[styles.knowledgeBadgeText, { color: '#8B5CF6' }]}>
              {metrics.knowledgeBaseAssets.toLocaleString()} Assets
            </Text>
          </View>
        </View>

        <View style={styles.knowledgeStats}>
          <View style={styles.knowledgeStat}>
            <Text style={[styles.knowledgeStatValue, { color: theme.colors.text }]}>
              94.2%
            </Text>
            <Text style={[styles.knowledgeStatLabel, { color: theme.colors.textSecondary }]}>
              Search Success
            </Text>
          </View>
          <View style={styles.knowledgeStat}>
            <Text style={[styles.knowledgeStatValue, { color: theme.colors.text }]}>
              1.8s
            </Text>
            <Text style={[styles.knowledgeStatLabel, { color: theme.colors.textSecondary }]}>
              Avg Response
            </Text>
          </View>
          <View style={styles.knowledgeStat}>
            <Text style={[styles.knowledgeStatValue, { color: theme.colors.text }]}>
              2,847
            </Text>
            <Text style={[styles.knowledgeStatLabel, { color: theme.colors.textSecondary }]}>
              Daily Queries
            </Text>
          </View>
          <View style={styles.knowledgeStat}>
            <Text style={[styles.knowledgeStatValue, { color: theme.colors.text }]}>
              97.8%
            </Text>
            <Text style={[styles.knowledgeStatLabel, { color: theme.colors.textSecondary }]}>
              Uptime
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  accuracyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesScroll: {
    gap: 12,
  },
  categoryCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  lifecycleSection: {
    marginBottom: 16,
  },
  lifecycleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  lifecycleTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  lifecycleMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  lifecycleMetric: {
    flex: 1,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  lifecycleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lifecycleInfo: {
    flex: 1,
  },
  lifecycleLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  lifecycleValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  knowledgeSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  knowledgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  knowledgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  knowledgeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  knowledgeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  knowledgeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  knowledgeStat: {
    alignItems: 'center',
  },
  knowledgeStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  knowledgeStatLabel: {
    fontSize: 10,
  },
});