import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Brain,
  TrendingUp, 
  TriangleAlert,
  Lightbulb,
  Calendar,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Target,
  ChartBarBig,
  Zap,
  CircleCheckBig,
  Clock
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

interface Prediction {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  category: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  expectedOutcome: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export default function PredictiveInsightsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();
  const [activeTab, setActiveTab] = useState<'predictions' | 'recommendations'>('predictions');
  const [lastUpdated, setLastUpdated] = useState('2 minutes ago');

  const predictions: Prediction[] = [
    {
      id: '1',
      title: 'Support Ticket Volume Spike Expected',
      description: 'Based on historical patterns, ticket volume is predicted to increase by 35% next Monday due to product launch.',
      confidence: 89,
      impact: 'high',
      timeframe: 'Next 48 hours',
      category: 'Workload'
    },
    {
      id: '2',
      title: 'Customer Satisfaction Trend Declining',
      description: 'Analysis shows potential 5% decrease in CSAT scores if current response patterns continue.',
      confidence: 76,
      impact: 'medium',
      timeframe: 'Next week',
      category: 'Performance'
    },
    {
      id: '3',
      title: 'Optimal Training Window Identified',
      description: 'Low activity period detected for Saturday 2-4 AM - ideal for model updates.',
      confidence: 94,
      impact: 'low',
      timeframe: 'This weekend',
      category: 'Maintenance'
    },
    {
      id: '4',
      title: 'Revenue Opportunity Detected',
      description: 'Pattern analysis suggests 23% of current leads are likely to convert with targeted outreach.',
      confidence: 82,
      impact: 'high',
      timeframe: 'Next 30 days',
      category: 'Sales'
    },
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Enable Auto-Scaling for Support',
      description: 'Activate automatic resource scaling to handle predicted ticket volume increase.',
      expectedOutcome: 'Handle 35% more tickets seamlessly',
      difficulty: 'easy',
      category: 'Automation'
    },
    {
      id: '2',
      title: 'Update Response Templates',
      description: 'Refresh common response templates based on recent successful interactions.',
      expectedOutcome: 'Improve response quality by 12%',
      difficulty: 'medium',
      category: 'Content'
    },
    {
      id: '3',
      title: 'Prioritize High-Value Leads',
      description: 'Focus on the identified 23% of leads with highest conversion probability.',
      expectedOutcome: 'Increase conversion rate to 28%',
      difficulty: 'easy',
      category: 'Sales'
    },
    {
      id: '4',
      title: 'Schedule Knowledge Base Update',
      description: 'Add new FAQ entries based on recent recurring customer questions.',
      expectedOutcome: 'Reduce ticket volume by 8%',
      difficulty: 'medium',
      category: 'Knowledge'
    },
  ];

  const modelStats = {
    accuracy: 94.7,
    predictionsMade: 12547,
    successRate: 91.2,
    learningProgress: 87,
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#34C759';
      case 'medium': return '#FF9500';
      case 'hard': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Predictive Insights</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Intelligence
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCw size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* AI Status Banner */}
      <View style={[styles.aiBanner, { backgroundColor: theme.colors.primary + '15' }]}>
        <View style={[styles.aiIcon, { backgroundColor: theme.colors.primary }]}>
          <Brain size={24} color="#fff" />
        </View>
        <View style={styles.aiContent}>
          <Text style={[styles.aiTitle, { color: theme.colors.text }]}>AI Model Active</Text>
          <Text style={[styles.aiSubtitle, { color: theme.colors.textSecondary }]}>
            Last updated: {lastUpdated}
          </Text>
        </View>
        <View style={styles.aiBadge}>
          <Sparkles size={14} color={theme.colors.primary} />
          <Text style={[styles.aiBadgeText, { color: theme.colors.primary }]}>v2.4</Text>
        </View>
      </View>

      {/* Model Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Target size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{modelStats.accuracy}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <ChartBarBig size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{(modelStats.predictionsMade / 1000).toFixed(1)}k</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Predictions</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <CircleCheckBig size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{modelStats.successRate}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Success Rate</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Zap size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{modelStats.learningProgress}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Learning</Text>
        </View>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'predictions' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setActiveTab('predictions')}
        >
          <TrendingUp size={18} color={activeTab === 'predictions' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'predictions' ? '#fff' : theme.colors.textSecondary }]}>
            Predictions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recommendations' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setActiveTab('recommendations')}
        >
          <Lightbulb size={18} color={activeTab === 'recommendations' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'recommendations' ? '#fff' : theme.colors.textSecondary }]}>
            Recommendations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.section}>
        {activeTab === 'predictions' ? (
          predictions.map(prediction => (
            <View key={prediction.id} style={[styles.card, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                  <Text style={[styles.categoryText, { color: theme.colors.primary }]}>{prediction.category}</Text>
                </View>
                <View style={[styles.impactBadge, { backgroundColor: getImpactColor(prediction.impact) + '15' }]}>
                  <TriangleAlert size={12} color={getImpactColor(prediction.impact)} />
                  <Text style={[styles.impactText, { color: getImpactColor(prediction.impact) }]}>
                    {prediction.impact.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{prediction.title}</Text>
              <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
                {prediction.description}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.confidenceRow}>
                  <Brain size={14} color={theme.colors.primary} />
                  <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
                    {prediction.confidence}% confidence
                  </Text>
                </View>
                <View style={styles.timeRow}>
                  <Clock size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
                    {prediction.timeframe}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          recommendations.map(rec => (
            <View key={rec.id} style={[styles.card, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                  <Text style={[styles.categoryText, { color: theme.colors.primary }]}>{rec.category}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(rec.difficulty) + '15' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(rec.difficulty) }]}>
                    {rec.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{rec.title}</Text>
              <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>
                {rec.description}
              </Text>
              <View style={styles.outcomeBox}>
                <TrendingUp size={16} color="#34C759" />
                <Text style={[styles.outcomeText, { color: '#34C759' }]}>
                  Expected: {rec.expectedOutcome}
                </Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.actionButtonText}>Apply Recommendation</Text>
                <ArrowRight size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    
      <AgentFeatures agentId="predictive-insights" agentName="Predictive Insights" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  refreshButton: { padding: 8 },
  aiBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 16, 
    padding: 16, 
    borderRadius: 16 
  },
  aiIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  aiContent: { flex: 1, marginLeft: 12 },
  aiTitle: { fontSize: 16, fontWeight: '600' },
  aiSubtitle: { fontSize: 13, marginTop: 2 },
  aiBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 12, 
    gap: 4 
  },
  aiBadgeText: { fontSize: 12, fontWeight: '600' },
  statsRow: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 8, 
    marginBottom: 16 
  },
  statCard: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 12 
  },
  statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 12, 
    marginBottom: 16 
  },
  tab: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 12, 
    borderRadius: 12, 
    backgroundColor: '#E5E5EA',
    gap: 8
  },
  tabText: { fontSize: 14, fontWeight: '600' },
  section: { paddingHorizontal: 16 },
  card: { 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  categoryBadge: { 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  categoryText: { fontSize: 11, fontWeight: '600' },
  impactBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8, 
    gap: 4 
  },
  impactText: { fontSize: 10, fontWeight: '600' },
  difficultyBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  difficultyText: { fontSize: 10, fontWeight: '600' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  cardDescription: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  confidenceText: { fontSize: 12 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12 },
  outcomeBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#34C75915', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    gap: 8 
  },
  outcomeText: { fontSize: 13, fontWeight: '500' },
  actionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 12, 
    borderRadius: 12, 
    gap: 8 
  },
  actionButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});

