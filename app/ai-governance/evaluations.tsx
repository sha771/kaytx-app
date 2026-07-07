/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import {
  Target,
  Trophy,
  TrendingUp,
  Award,
  BarChart3,
  LineChart,
  ArrowLeft,
  ChevronRight,
  Brain,
  Zap,
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  Star,
  Medal,
  Gauge,
  Crown,
  Settings,
  RefreshCw,
  Flame,
  Clock,
  Percent,
  Layers,
  ArrowUp,
  ArrowDown
} from 'lucide-react-native';

interface ModelBenchmark {
  id: string;
  name: string;
  accuracy: number;
  hallucinationRate: number;
  safetyScore: number;
  biasScore: number;
  performanceScore: number;
  overallScore: number;
}

interface EvaluationTest {
  id: string;
  name: string;
  category: string;
  status: 'passed' | 'failed' | 'pending';
  score: number;
  lastRun: string;
}

const modelBenchmarks: ModelBenchmark[] = [
  {
    id: '1',
    name: 'GPT-4-Turbo',
    accuracy: 96.8,
    hallucinationRate: 0.8,
    safetyScore: 97.2,
    biasScore: 94.5,
    performanceScore: 95.8,
    overallScore: 96.9
  },
  {
    id: '2',
    name: 'Claude-3-Opus',
    accuracy: 95.4,
    hallucinationRate: 1.2,
    safetyScore: 96.8,
    biasScore: 93.2,
    performanceScore: 94.1,
    overallScore: 94.9
  },
  {
    id: '3',
    name: 'Llama-2-70B',
    accuracy: 93.2,
    hallucinationRate: 2.4,
    safetyScore: 92.5,
    biasScore: 91.8,
    performanceScore: 96.4,
    overallScore: 93.5
  },
];

const evaluationTests: EvaluationTest[] = [
  { id: '1', name: 'Hallucination Detection', category: 'Safety', status: 'passed', score: 96, lastRun: '2 hours ago' },
  { id: '2', name: 'Bias Detection', category: 'Fairness', status: 'passed', score: 94, lastRun: '4 hours ago' },
  { id: '3', name: 'Toxic Content Filter', category: 'Safety', status: 'passed', score: 98, lastRun: '6 hours ago' },
  { id: '4', name: 'Prompt Injection Defense', category: 'Security', status: 'failed', score: 88, lastRun: '8 hours ago' },
  { id: '5', name: 'PII Redaction', category: 'Privacy', status: 'passed', score: 95, lastRun: '10 hours ago' },
  { id: '6', name: 'Factual Accuracy', category: 'Quality', status: 'passed', score: 93, lastRun: '12 hours ago' },
];

const benchmarkCategories = [
  { name: 'Accuracy', score: 95.8, trend: 'up' },
  { name: 'Safety', score: 96.2, trend: 'up' },
  { name: 'Fairness', score: 92.4, trend: 'stable' },
  { name: 'Performance', score: 94.1, trend: 'up' },
  { name: 'Robustness', score: 89.6, trend: 'down' },
];

const performanceDrift = [
  { id: '1', model: 'GPT-4-Turbo', baseline: 96.8, current: 96.5, drift: -0.3, status: 'stable' },
  { id: '2', model: 'Claude-3-Opus', baseline: 95.4, current: 94.8, drift: -0.6, status: 'warning' },
  { id: '3', model: 'Llama-2-70B', baseline: 93.2, current: 92.1, drift: -1.1, status: 'critical' },
];

const benchmarkScorecards = [
  { id: '1', benchmark: 'MMLU', score: 86.4, rank: 1, change: '+2.3' },
  { id: '2', benchmark: 'HumanEval', score: 92.8, rank: 2, change: '+1.5' },
  { id: '3', benchmark: 'GSM8K', score: 89.2, rank: 1, change: '+3.1' },
  { id: '4', benchmark: 'TruthfulQA', score: 94.6, rank: 3, change: '+0.8' },
];

const evaluationTimeline = [
  { id: '1', event: 'Benchmark Run Completed', model: 'GPT-4-Turbo', score: 96.8, timestamp: '2 hours ago' },
  { id: '2', event: 'Drift Detected', model: 'Claude-3-Opus', score: 94.8, timestamp: '4 hours ago' },
  { id: '3', event: 'Safety Test Passed', model: 'Llama-2-70B', score: 92.5, timestamp: '6 hours ago' },
  { id: '4', event: 'Evaluation Scheduled', model: 'All Models', score: null, timestamp: '8 hours ago' },
];

export default function EvaluationsScreen() {
  const [selectedModel, setSelectedModel] = useState<ModelBenchmark | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return '#10b981';
      case 'failed': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return '#10b981';
    if (score >= 90) return '#06b6d4';
    if (score >= 85) return '#f59e0b';
    return '#ef4444';
  };

  const ModelBenchmarkCard = ({ model }: { model: ModelBenchmark }) => (
    <TouchableOpacity 
      style={[styles.benchmarkCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getScoreColor(model.overallScore)}30` }]}
      onPress={() => setSelectedModel(model)}
    >
      <View style={styles.benchmarkHeader}>
        <View style={[styles.benchmarkIcon, { backgroundColor: `${getScoreColor(model.overallScore)}20` }]}>
          <Trophy size={24} color={getScoreColor(model.overallScore)} />
        </View>
        <View style={styles.benchmarkInfo}>
          <Text style={[styles.benchmarkName, { color: '#f9fafb' }]}>{model.name}</Text>
          <Text style={[styles.benchmarkScore, { color: getScoreColor(model.overallScore) }]}>
            Overall: {model.overallScore}%
          </Text>
        </View>
        <View style={styles.benchmarkRank}>
          <Medal size={20} color="#f59e0b" />
        </View>
      </View>
      <View style={styles.benchmarkMetrics}>
        <View style={styles.benchmarkMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
          <Text style={[styles.metricValue, { color: getScoreColor(model.accuracy) }]}>{model.accuracy}%</Text>
        </View>
        <View style={styles.benchmarkMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Safety</Text>
          <Text style={[styles.metricValue, { color: getScoreColor(model.safetyScore) }]}>{model.safetyScore}%</Text>
        </View>
        <View style={styles.benchmarkMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Bias</Text>
          <Text style={[styles.metricValue, { color: getScoreColor(model.biasScore) }]}>{model.biasScore}%</Text>
        </View>
        <View style={styles.benchmarkMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Hallucination</Text>
          <Text style={[styles.metricValue, { color: model.hallucinationRate < 1 ? '#10b981' : model.hallucinationRate < 2 ? '#f59e0b' : '#ef4444' }]}>
            {model.hallucinationRate}%
          </Text>
        </View>
      </View>
      <View style={styles.benchmarkFooter}>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  const EvaluationTestCard = ({ test }: { test: EvaluationTest }) => (
    <View style={[styles.testCard, { backgroundColor: 'rgba(10, 15, 25, 0.6)', borderLeftWidth: 3, borderLeftColor: getStatusColor(test.status) }]}>
      <View style={styles.testHeader}>
        <View style={[styles.testIcon, { backgroundColor: `${getStatusColor(test.status)}20` }]}>
          {test.status === 'passed' && <CheckCircle size={20} color={getStatusColor(test.status)} />}
          {test.status === 'failed' && <AlertTriangle size={20} color={getStatusColor(test.status)} />}
          {test.status === 'pending' && <Activity size={20} color={getStatusColor(test.status)} />}
        </View>
        <View style={styles.testInfo}>
          <Text style={[styles.testName, { color: '#f9fafb' }]}>{test.name}</Text>
          <Text style={[styles.testCategory, { color: '#9ca3af' }]}>{test.category}</Text>
        </View>
        <View style={styles.testScore}>
          <Text style={[styles.testScoreValue, { color: getScoreColor(test.score) }]}>{test.score}%</Text>
        </View>
      </View>
      <View style={styles.testFooter}>
        <Text style={[styles.testTime, { color: '#6b7280' }]}>Last run: {test.lastRun}</Text>
        <View style={[styles.testStatus, { backgroundColor: `${getStatusColor(test.status)}20` }]}>
          <Text style={[styles.testStatusText, { color: getStatusColor(test.status) }]}>{test.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#f9fafb" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Evaluations</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>AI Evaluation & Benchmarking System</Text>
          </View>
        </View>

        {/* Executive Governance Layer */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Executive Governance Layer</Text>
          <View style={[styles.executiveContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.executiveHeader}>
              <View style={styles.executiveProfile}>
                <View style={[styles.executiveAvatar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Crown size={28} color="#06b6d4" />
                </View>
                <View style={styles.executiveInfo}>
                  <Text style={[styles.executiveName, { color: '#f9faff' }]}>Evaluation Governance</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Model Benchmarking System</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>BENCHMARKED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>12</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Models</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>96.9%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Avg Score</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>48</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Tests</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>2</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Model Comparison Leaderboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>Model Comparison Leaderboard</Text>
          <View style={[styles.leaderboardContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {modelBenchmarks.slice(0, 5).map((model, index) => (
              <View key={model.id} style={[styles.leaderboardRow, { backgroundColor: index === 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.leaderboardRank}>
                  <Text style={[styles.leaderboardRankText, { color: index === 0 ? '#f59e0b' : '#9ca3af' }]}>#{index + 1}</Text>
                </View>
                <View style={styles.leaderboardModel}>
                  <Text style={[styles.leaderboardModelName, { color: '#f9faff' }]}>{model.name}</Text>
                  <View style={styles.leaderboardScores}>
                    <View style={styles.leaderboardScore}>
                      <Text style={[styles.leaderboardScoreLabel, { color: '#9ca3af' }]}>Acc</Text>
                      <Text style={[styles.leaderboardScoreValue, { color: getScoreColor(model.accuracy) }]}>{model.accuracy}%</Text>
                    </View>
                    <View style={styles.leaderboardScore}>
                      <Text style={[styles.leaderboardScoreLabel, { color: '#9ca3af' }]}>Safe</Text>
                      <Text style={[styles.leaderboardScoreValue, { color: getScoreColor(model.safetyScore) }]}>{model.safetyScore}%</Text>
                    </View>
                    <View style={styles.leaderboardScore}>
                      <Text style={[styles.leaderboardScoreLabel, { color: '#9ca3af' }]}>Bias</Text>
                      <Text style={[styles.leaderboardScoreValue, { color: getScoreColor(model.biasScore) }]}>{model.biasScore}%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.leaderboardOverall}>
                  <Text style={[styles.leaderboardOverallValue, { color: getScoreColor(model.overallScore) }]}>{model.overallScore}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Evaluation Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Evaluation Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Trophy size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>95.2%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Overall Score</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Target size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>42</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Tests Passed</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>1</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Tests Failed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Model Leaderboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Leaderboard</Text>
          <View style={styles.benchmarksGrid}>
            {modelBenchmarks.map(model => (
              <ModelBenchmarkCard key={model.id} model={model} />
            ))}
          </View>
        </View>

        {/* Benchmark Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Benchmark Categories</Text>
          <View style={[styles.categoriesContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {benchmarkCategories.map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: '#f9fafb' }]}>{category.name}</Text>
                  <View style={styles.categoryTrend}>
                    {category.trend === 'up' && <TrendingUp size={16} color="#10b981" />}
                    {category.trend === 'down' && <TrendingUp size={16} color="#ef4444" style={{ transform: [{ rotate: '180deg' }] }} />}
                    {category.trend === 'stable' && <Activity size={16} color="#9ca3af" />}
                  </View>
                </View>
                <View style={styles.categoryScore}>
                  <Text style={[styles.categoryScoreValue, { color: getScoreColor(category.score) }]}>{category.score}%</Text>
                </View>
                <View style={[styles.categoryBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                  <View style={[styles.categoryFill, { width: `${category.score}%`, backgroundColor: getScoreColor(category.score) }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Evaluation Tests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Evaluation Tests</Text>
            <TouchableOpacity style={[styles.runButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Zap size={16} color="#06b6d4" />
              <Text style={[styles.runButtonText, { color: '#06b6d4' }]}>Run All Tests</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.testsGrid}>
            {evaluationTests.map(test => (
              <EvaluationTestCard key={test.id} test={test} />
            ))}
          </View>
        </View>

        {/* Performance Drift */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Performance Drift Analysis</Text>
          <View style={[styles.driftContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {performanceDrift.map(item => (
              <View key={item.id} style={[styles.driftRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.driftRowInfo}>
                  <View style={[styles.driftRowIcon, { backgroundColor: item.status === 'stable' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                    <Brain size={18} color={item.status === 'stable' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#ef4444'} />
                  </View>
                  <View style={styles.driftRowDetails}>
                    <Text style={[styles.driftRowModel, { color: '#f9fafb' }]}>{item.model}</Text>
                    <View style={styles.driftRowScores}>
                      <Text style={[styles.driftRowBaseline, { color: '#9ca3af' }]}>Baseline: {item.baseline}%</Text>
                      <Text style={[styles.driftRowCurrent, { color: item.status === 'stable' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#ef4444' }]}>Current: {item.current}%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.driftRowChange}>
                  <View style={[styles.driftRowChangeBadge, { backgroundColor: item.drift < -1 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    {item.drift < 0 ? <ArrowDown size={14} color="#ef4444" /> : <ArrowUp size={14} color="#10b981" />}
                    <Text style={[styles.driftRowChangeText, { color: item.drift < -1 ? '#ef4444' : '#f59e0b' }]}>{item.drift}%</Text>
                  </View>
                  <View style={[styles.driftRowStatus, { backgroundColor: item.status === 'stable' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                    <Text style={[styles.driftRowStatusText, { color: item.status === 'stable' ? '#10b981' : item.status === 'warning' ? '#f59e0b' : '#ef4444' }]}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Benchmark Scorecards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Benchmark Scorecards</Text>
          <View style={[styles.scorecardsContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {benchmarkScorecards.map(card => (
              <View key={card.id} style={[styles.scorecardRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.scorecardInfo}>
                  <View style={[styles.scorecardIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Trophy size={18} color="#06b6d4" />
                  </View>
                  <View style={styles.scorecardDetails}>
                    <Text style={[styles.scorecardBenchmark, { color: '#f9fafb' }]}>{card.benchmark}</Text>
                    <View style={styles.scorecardMeta}>
                      <Medal size={14} color="#f59e0b" />
                      <Text style={[styles.scorecardRank, { color: '#f59e0b' }]}>Rank #{card.rank}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.scorecardScore}>
                  <Text style={[styles.scorecardValue, { color: '#06b6d4' }]}>{card.score}%</Text>
                  <View style={[styles.scorecardChange, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <ArrowUp size={12} color="#10b981" />
                    <Text style={[styles.scorecardChangeText, { color: '#10b981' }]}>{card.change}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Evaluation Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Evaluation Timeline</Text>
          <View style={[styles.timelineContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {evaluationTimeline.map((item, index) => (
              <View key={item.id} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineDot, { backgroundColor: item.score ? '#10b981' : '#9ca3af' }]} />
                  {index < evaluationTimeline.length - 1 && <View style={[styles.timelineLine, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text style={[styles.timelineEvent, { color: '#f9fafb' }]}>{item.event}</Text>
                    <Text style={[styles.timelineTimestamp, { color: '#9ca3af' }]}>{item.timestamp}</Text>
                  </View>
                  <View style={styles.timelineMeta}>
                    <Text style={[styles.timelineModel, { color: '#9ca3af' }]}>{item.model}</Text>
                    {item.score && (
                      <View style={styles.timelineScore}>
                        <Star size={12} color="#f59e0b" />
                        <Text style={[styles.timelineScoreValue, { color: '#f59e0b' }]}>{item.score}%</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  executiveContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  executiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  executiveProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  executiveAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  executiveInfo: {
    flex: 1,
  },
  executiveName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  executiveRole: {
    fontSize: 12,
    fontWeight: '500',
  },
  executiveBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  executiveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  executiveMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  executiveMetric: {
    alignItems: 'center',
    flex: 1,
  },
  executiveMetricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  executiveMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  leaderboardContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  leaderboardRank: {
    width: 40,
    alignItems: 'center',
  },
  leaderboardRankText: {
    fontSize: 16,
    fontWeight: '800',
  },
  leaderboardModel: {
    flex: 1,
  },
  leaderboardModelName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  leaderboardScores: {
    flexDirection: 'row',
    gap: 16,
  },
  leaderboardScore: {
    alignItems: 'center',
  },
  leaderboardScoreLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  leaderboardScoreValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  leaderboardOverall: {
    width: 60,
    alignItems: 'center',
  },
  leaderboardOverallValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  runButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  overviewContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    alignItems: 'center',
    flex: 1,
  },
  overviewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  benchmarksGrid: {
    gap: 12,
  },
  benchmarkCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  benchmarkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benchmarkIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  benchmarkInfo: {
    flex: 1,
  },
  benchmarkName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  benchmarkScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  benchmarkRank: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  benchmarkMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  benchmarkMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  benchmarkFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoriesContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  categoryRow: {
    alignItems: 'center',
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTrend: {
    marginLeft: 8,
  },
  categoryScore: {
    width: 50,
    alignItems: 'flex-end',
  },
  categoryScoreValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  categoryBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryFill: {
    height: '100%',
    borderRadius: 3,
  },
  testsGrid: {
    gap: 12,
  },
  testCard: {
    padding: 16,
    borderRadius: 12,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  testCategory: {
    fontSize: 12,
    fontWeight: '400',
  },
  testScore: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  testScoreValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  testTime: {
    fontSize: 11,
    fontWeight: '400',
  },
  testStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  testStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  driftContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  driftItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
  },
  driftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driftModel: {
    fontSize: 14,
    fontWeight: '600',
  },
  driftBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  driftBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  driftChart: {
    alignItems: 'center',
  },
  driftBars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  driftBar: {
    width: 24,
    borderRadius: 4,
  },
  driftLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  scorecardContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  scorecardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  scorecardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  scorecardInfo: {
    flex: 1,
  },
  scorecardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  scorecardMeta: {
    fontSize: 12,
    fontWeight: '400',
  },
  scorecardRank: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  scorecardRankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  driftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  driftRowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  driftRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driftRowDetails: {
    flex: 1,
  },
  driftRowModel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  driftRowScores: {
    flexDirection: 'row',
    gap: 12,
  },
  driftRowBaseline: {
    fontSize: 12,
    fontWeight: '500',
  },
  driftRowCurrent: {
    fontSize: 12,
    fontWeight: '500',
  },
  driftRowChange: {
    alignItems: 'flex-end',
    gap: 8,
  },
  driftRowChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  driftRowChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  driftRowStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  driftRowStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  scorecardsContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  scorecardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scorecardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  scorecardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorecardDetails: {
    flex: 1,
  },
  scorecardBenchmark: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  scorecardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scorecardRank: {
    fontSize: 12,
    fontWeight: '500',
  },
  scorecardScore: {
    alignItems: 'flex-end',
    gap: 6,
  },
  scorecardValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  scorecardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scorecardChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timelineContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineEvent: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineTimestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  timelineMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineModel: {
    fontSize: 12,
    fontWeight: '500',
  },
  timelineScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timelineScoreValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});
