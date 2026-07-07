import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Target, Trophy, BarChart3, TrendingUp, Award, CheckCircle, AlertTriangle, Zap, Activity, Star, Medal } from 'lucide-react-native';

interface BenchmarkResult {
  id: string;
  modelName: string;
  modelVersion: string;
  category: 'accuracy' | 'hallucination' | 'safety' | 'bias' | 'performance';
  score: number;
  benchmark: string;
  rank: number;
  totalModels: number;
  trend: 'improving' | 'declining' | 'stable';
  lastEvaluated: string;
  metrics: {
    label: string;
    value: string;
    status: 'above' | 'at' | 'below';
  }[];
}

interface AIEvaluationBenchmarkingProps {
  benchmarks: BenchmarkResult[];
}

export default function AIEvaluationBenchmarking({ benchmarks }: AIEvaluationBenchmarkingProps) {
  const { theme } = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'accuracy': return '#10B981';
      case 'hallucination': return '#06B6D4';
      case 'safety': return '#8B5CF6';
      case 'bias': return '#EC4899';
      case 'performance': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getCategoryBackground = (category: string) => {
    const color = getCategoryColor(category);
    return color + '15';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp size={14} color="#10B981" />;
      case 'declining': return <TrendingUp size={14} color="#EF4444" style={{ transform: [{ rotate: '180deg' }] }} />;
      case 'stable': return <Activity size={14} color="#6B7280" />;
      default: return <Activity size={14} color="#6B7280" />;
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={16} color="#F59E0B" />;
    if (rank === 2) return <Medal size={16} color="#C0C0C0" />;
    if (rank === 3) return <Award size={16} color="#CD7F32" />;
    return <Star size={16} color="#6B7280" />;
  };

  const leaderboardData = [
    { rank: 1, model: 'GPT-4-Turbo', score: 96.8, category: 'accuracy', color: '#10B981' },
    { rank: 2, model: 'Claude-3-Opus', score: 95.2, category: 'safety', color: '#8B5CF6' },
    { rank: 3, model: 'Gemini-Pro', score: 94.1, category: 'performance', color: '#F59E0B' },
    { rank: 4, model: 'Llama-3-70B', score: 92.4, category: 'bias', color: '#EC4899' },
    { rank: 5, model: 'Mistral-Large', score: 91.8, category: 'hallucination', color: '#06B6D4' },
  ];

  const evaluationScorecard = [
    { metric: 'Model Accuracy', score: 94.2, benchmark: 'SOTA', status: 'above' },
    { metric: 'Hallucination Rate', score: 2.1, benchmark: '<3%', status: 'above' },
    { metric: 'Safety Score', score: 97.8, benchmark: '>95%', status: 'above' },
    { metric: 'Bias Detection', score: 89.4, benchmark: '>85%', status: 'above' },
    { metric: 'Performance Drift', score: 3.2, benchmark: '<5%', status: 'above' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Target size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Evaluation & Benchmarking
        </Text>
      </View>

      {/* Model Comparison Leaderboard */}
      <View style={[styles.leaderboardSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.leaderboardHeader}>
          <Trophy size={18} color="#F59E0B" />
          <Text style={[styles.leaderboardTitle, { color: theme.colors.text }]}>
            Model Comparison Leaderboard
          </Text>
        </View>
        <View style={styles.leaderboardGrid}>
          {leaderboardData.map((item) => (
            <View key={item.rank} style={styles.leaderboardItem}>
              <View style={styles.rankSection}>
                {getRankIcon(item.rank)}
                <Text style={[styles.rankText, { color: theme.colors.text }]}>
                  #{item.rank}
                </Text>
              </View>
              <View style={styles.modelSection}>
                <Text style={[styles.modelName, { color: theme.colors.text }]}>
                  {item.model}
                </Text>
                <View style={[styles.categoryBadge, { backgroundColor: item.color + '20' }]}>
                  <Text style={[styles.categoryText, { color: item.color }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.scoreSection}>
                <Text style={[styles.scoreValue, { color: item.color }]}>
                  {item.score}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Evaluation Scorecard */}
      <View style={[styles.scorecardSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.scorecardHeader}>
          <BarChart3 size={18} color="#06B6D4" />
          <Text style={[styles.scorecardTitle, { color: theme.colors.text }]}>
            Evaluation Scorecard
          </Text>
        </View>
        <View style={styles.scorecardGrid}>
          {evaluationScorecard.map((item, index) => (
            <View key={index} style={styles.scorecardItem}>
              <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
                {item.metric}
              </Text>
              <View style={styles.scorecardValueRow}>
                <Text style={[
                  styles.scorecardValue, 
                  { color: item.status === 'above' ? '#10B981' : item.status === 'at' ? '#F59E0B' : '#EF4444' }
                ]}>
                  {item.score}
                </Text>
                <View style={[
                  styles.statusIndicator, 
                  { backgroundColor: item.status === 'above' ? '#10B981' : item.status === 'at' ? '#F59E0B' : '#EF4444' }
                ]} />
              </View>
              <Text style={[styles.scorecardBenchmark, { color: theme.colors.textSecondary }]}>
                Benchmark: {item.benchmark}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Benchmark Result Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.benchmarksScroll}
      >
        {benchmarks.map((benchmark) => {
          const categoryColor = getCategoryColor(benchmark.category);
          const categoryBackground = getCategoryBackground(benchmark.category);

          return (
            <View 
              key={benchmark.id} 
              style={[
                styles.benchmarkCard, 
                { 
                  backgroundColor: categoryBackground,
                  borderColor: categoryColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.benchmarkHeader}>
                <View style={[styles.benchmarkIcon, { backgroundColor: categoryColor + '20' }]}>
                  <Target size={24} color={categoryColor} />
                </View>
                <View style={styles.benchmarkRank}>
                  {getRankIcon(benchmark.rank)}
                  <Text style={[styles.rankText, { color: theme.colors.text }]}>
                    #{benchmark.rank} / {benchmark.totalModels}
                  </Text>
                </View>
              </View>

              <Text style={[styles.modelName, { color: theme.colors.text }]}>
                {benchmark.modelName}
              </Text>
              <Text style={[styles.modelVersion, { color: theme.colors.textSecondary }]}>
                v{benchmark.modelVersion}
              </Text>

              <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
                <Text style={[styles.categoryText, { color: categoryColor }]}>
                  {benchmark.category.toUpperCase()}
                </Text>
              </View>

              <View style={styles.scoreSection}>
                <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                  Benchmark Score
                </Text>
                <Text style={[styles.scoreValue, { color: categoryColor }]}>
                  {benchmark.score}%
                </Text>
                <View style={styles.trendRow}>
                  {getTrendIcon(benchmark.trend)}
                  <Text style={[styles.trendText, { color: theme.colors.textSecondary }]}>
                    {benchmark.trend.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.benchmarkName}>
                <Text style={[styles.benchmarkLabel, { color: theme.colors.textSecondary }]}>
                  Benchmark
                </Text>
                <Text style={[styles.benchmarkText, { color: theme.colors.text }]}>
                  {benchmark.benchmark}
                </Text>
              </View>

              <View style={styles.metricsSection}>
                <Text style={[styles.metricsTitle, { color: theme.colors.textSecondary }]}>
                  Performance Metrics
                </Text>
                {benchmark.metrics.map((metric, index) => (
                  <View key={index} style={styles.metricRow}>
                    <View style={[
                      styles.metricDot, 
                      { backgroundColor: metric.status === 'above' ? '#10B981' : metric.status === 'at' ? '#F59E0B' : '#EF4444' }
                    ]} />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      {metric.label}
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {metric.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.benchmarkFooter}>
                <Activity size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  Evaluated {benchmark.lastEvaluated}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Benchmark Performance Curves */}
      <View style={[styles.performanceSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.performanceHeader}>
          <TrendingUp size={18} color="#8B5CF6" />
          <Text style={[styles.performanceTitle, { color: theme.colors.text }]}>
            Benchmark Performance Trends
          </Text>
        </View>
        <View style={styles.performanceGrid}>
          <View style={styles.performanceCard}>
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Accuracy Trend
            </Text>
            <View style={styles.performanceChart}>
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '60%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '70%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '75%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '82%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '88%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#10B981', height: '94%' }]} />
            </View>
            <Text style={[styles.performanceValue, { color: '#10B981' }]}>
              +15.2% improvement
            </Text>
          </View>
          <View style={styles.performanceCard}>
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Safety Trend
            </Text>
            <View style={styles.performanceChart}>
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '85%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '88%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '90%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '93%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '95%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#8B5CF6', height: '97%' }]} />
            </View>
            <Text style={[styles.performanceValue, { color: '#8B5CF6' }]}>
              +12.0% improvement
            </Text>
          </View>
          <View style={styles.performanceCard}>
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Bias Reduction
            </Text>
            <View style={styles.performanceChart}>
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '45%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '52%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '58%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '65%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '72%' }]} />
              <View style={[styles.chartBar, { backgroundColor: '#EC4899', height: '78%' }]} />
            </View>
            <Text style={[styles.performanceValue, { color: '#EC4899' }]}>
              +33.0% improvement
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  leaderboardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  leaderboardGrid: {
    gap: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  rankSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 60,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modelSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelName: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  scoreSection: {
    width: 60,
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  scorecardSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  scorecardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  scorecardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  scorecardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  scorecardItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  scorecardLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  scorecardValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  scorecardValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scorecardBenchmark: {
    fontSize: 10,
    fontWeight: '500',
  },
  benchmarksScroll: {
    gap: 16,
    paddingHorizontal: 4,
  },
  benchmarkCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  benchmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  benchmarkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benchmarkRank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  modelVersion: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  scoreSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  benchmarkName: {
    marginBottom: 12,
  },
  benchmarkLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  benchmarkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricsSection: {
    marginBottom: 12,
  },
  metricsTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  metricDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metricLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  benchmarkFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  performanceSection: {
    borderRadius: 12,
    padding: 16,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  performanceLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  performanceChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 8,
  },
  chartBar: {
    width: 12,
    borderRadius: 2,
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});