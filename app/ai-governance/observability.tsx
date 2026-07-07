/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Eye, Activity, Zap, TrendingUp, Clock, DollarSign, 
  ArrowLeft, ChevronRight, Cpu, Server, HardDrive, 
  BarChart3, LineChart, PieChart, Target, Gauge,
  AlertCircle, ArrowUp, ArrowDown, Waves, Flame, Monitor, Crown,
  Settings, RefreshCw, Network
} from 'lucide-react-native';

interface PerformanceMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ModelPerformance {
  id: string;
  name: string;
  accuracy: number;
  latency: string;
  throughput: string;
  cost: string;
  drift: number;
}

const performanceMetrics: PerformanceMetric[] = [
  { id: '1', name: 'Average Latency', value: '245', unit: 'ms', status: 'optimal', trend: 'down' },
  { id: '2', name: 'Token Usage', value: '2.4M', unit: '/hour', status: 'optimal', trend: 'up' },
  { id: '3', name: 'Cost per Request', value: '0.0024', unit: 'USD', status: 'optimal', trend: 'down' },
  { id: '4', name: 'Model Accuracy', value: '96.8', unit: '%', status: 'optimal', trend: 'up' },
  { id: '5', name: 'System Throughput', value: '8,420', unit: 'req/min', status: 'warning', trend: 'stable' },
  { id: '6', name: 'Error Rate', value: '0.12', unit: '%', status: 'optimal', trend: 'down' },
];

const modelPerformances: ModelPerformance[] = [
  {
    id: '1',
    name: 'GPT-4-Turbo',
    accuracy: 96.8,
    latency: '245ms',
    throughput: '1,240 req/min',
    cost: '$0.0024',
    drift: 0.02
  },
  {
    id: '2',
    name: 'Claude-3-Opus',
    accuracy: 95.4,
    latency: '312ms',
    throughput: '980 req/min',
    cost: '$0.0032',
    drift: 0.05
  },
  {
    id: '3',
    name: 'Llama-2-70B',
    accuracy: 93.2,
    latency: '189ms',
    throughput: '2,100 req/min',
    cost: '$0.0018',
    drift: 0.08
  },
];

const usageHeatmap = [
  { region: 'US-East', usage: 85, color: '#10b981' },
  { region: 'US-West', usage: 72, color: '#06b6d4' },
  { region: 'EU-Central', usage: 68, color: '#8b5cf6' },
  { region: 'Asia-Pacific', usage: 54, color: '#f59e0b' },
];

const realTimeInference = [
  { id: '1', model: 'GPT-4-Turbo', requests: 1240, latency: '245ms', successRate: 99.2, timestamp: '2s ago' },
  { id: '2', model: 'Claude-3-Opus', requests: 980, latency: '312ms', successRate: 98.8, timestamp: '5s ago' },
  { id: '3', model: 'Llama-2-70B', requests: 2100, latency: '189ms', successRate: 99.5, timestamp: '8s ago' },
];

const driftDetection = [
  { id: '1', model: 'GPT-4-Turbo', driftScore: 0.02, status: 'stable', lastCheck: '10m ago' },
  { id: '2', model: 'Claude-3-Opus', driftScore: 0.05, status: 'warning', lastCheck: '15m ago' },
  { id: '3', model: 'Llama-2-70B', driftScore: 0.08, status: 'warning', lastCheck: '20m ago' },
];

const performanceTrends = [
  { id: '1', metric: 'Latency', current: 245, previous: 258, change: -5.0, status: 'improved' },
  { id: '2', metric: 'Throughput', current: 8420, previous: 7950, change: 5.9, status: 'improved' },
  { id: '3', metric: 'Error Rate', current: 0.12, previous: 0.18, change: -33.3, status: 'improved' },
  { id: '4', metric: 'Cost', current: 58.4, previous: 62.1, change: -6.0, status: 'improved' },
];

export default function ObservabilityScreen() {
  const [selectedModel, setSelectedModel] = useState<ModelPerformance | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color={trend === 'up' ? '#10b981' : '#ef4444'} />;
      case 'down': return <TrendingUp size={16} color="#10b981" style={{ transform: [{ rotate: '180deg' }] }} />;
      default: return <Activity size={16} color="#9ca3af" />;
    }
  };

  const PerformanceMetricCard = ({ metric }: { metric: PerformanceMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(metric.status)}30` }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${getStatusColor(metric.status)}20` }]}>
          <Activity size={20} color={getStatusColor(metric.status)} />
        </View>
        <Text style={[styles.metricName, { color: '#f9fafb' }]}>{metric.name}</Text>
        {getTrendIcon(metric.trend)}
      </View>
      <View style={styles.metricContent}>
        <Text style={[styles.metricValue, { color: getStatusColor(metric.status) }]}>{metric.value}</Text>
        <Text style={[styles.metricUnit, { color: '#9ca3af' }]}>{metric.unit}</Text>
      </View>
    </View>
  );

  const ModelPerformanceCard = ({ model }: { model: ModelPerformance }) => (
    <TouchableOpacity 
      style={[styles.modelCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}
      onPress={() => setSelectedModel(model)}
    >
      <View style={styles.modelHeader}>
        <View style={[styles.modelIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Cpu size={24} color="#06b6d4" />
        </View>
        <View style={styles.modelInfo}>
          <Text style={[styles.modelName, { color: '#f9fafb' }]}>{model.name}</Text>
          <Text style={[styles.modelLatency, { color: '#9ca3af' }]}>Latency: {model.latency}</Text>
        </View>
        <View style={styles.modelAccuracy}>
          <Text style={[styles.accuracyValue, { color: model.accuracy > 95 ? '#10b981' : model.accuracy > 90 ? '#06b6d4' : '#f59e0b' }]}>
            {model.accuracy}%
          </Text>
        </View>
      </View>
      <View style={styles.modelMetrics}>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Throughput</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{model.throughput}</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Cost</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{model.cost}</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Drift</Text>
          <Text style={[styles.metricValue, { color: model.drift < 0.05 ? '#10b981' : model.drift < 0.1 ? '#f59e0b' : '#ef4444' }]}>
            {model.drift}
          </Text>
        </View>
      </View>
      <View style={styles.modelFooter}>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Observability</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>AI Performance Monitoring Hub</Text>
          </View>
        </View>

        {/* Executive Governance Layer */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>Executive Governance Layer</Text>
          <View style={[styles.executiveContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.executiveHeader}>
              <View style={styles.executiveProfile}>
                <View style={[styles.executiveAvatar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Crown size={28} color="#06b6d4" />
                </View>
                <View style={styles.executiveInfo}>
                  <Text style={[styles.executiveName, { color: '#f9faff' }]}>Observability Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise AI Performance Monitoring</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>MONITORED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>245ms</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Avg Latency</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>96.8%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>8.4K</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Req/Min</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>0.12%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Error Rate</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Performance Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Activity size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>245ms</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Avg Latency</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Zap size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>96.8%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Accuracy</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <DollarSign size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>$2.4K</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Hourly Cost</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            {performanceMetrics.map(metric => (
              <PerformanceMetricCard key={metric.id} metric={metric} />
            ))}
          </View>
        </View>

        {/* Model Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Performance</Text>
          <View style={styles.modelsGrid}>
            {modelPerformances.map(model => (
              <ModelPerformanceCard key={model.id} model={model} />
            ))}
          </View>
        </View>

        {/* Usage Heatmap */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Regional Usage Heatmap</Text>
          <View style={[styles.heatmapContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.heatmapGrid}>
              {usageHeatmap.map((item, index) => (
                <View key={index} style={[styles.heatmapCell, { backgroundColor: `${item.color}30` }]}>
                  <Text style={[styles.heatmapRegion, { color: '#f9fafb' }]}>{item.region}</Text>
                  <View style={styles.heatmapBar}>
                    <View style={[styles.heatmapFill, { width: `${item.usage}%`, backgroundColor: item.color }]} />
                  </View>
                  <Text style={[styles.heatmapUsage, { color: item.color }]}>{item.usage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Cost Optimization */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Cost Optimization</Text>
          <View style={[styles.costContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.costRow}>
              <View style={styles.costInfo}>
                <Text style={[styles.costLabel, { color: '#9ca3af' }]}>Total Daily Cost</Text>
                <Text style={[styles.costValue, { color: '#f9fafb' }]}>$58.4K</Text>
              </View>
              <View style={[styles.costTrend, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.costTrendText, { color: '#10b981' }]}>-12% vs last week</Text>
              </View>
            </View>
            <View style={styles.costBreakdown}>
              <View style={styles.costItem}>
                <View style={[styles.costItemBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <View style={[styles.costItemFill, { width: '45%', backgroundColor: '#06b6d4' }]} />
                </View>
                <Text style={[styles.costItemLabel, { color: '#9ca3af' }]}>Inference (45%)</Text>
              </View>
              <View style={styles.costItem}>
                <View style={[styles.costItemBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <View style={[styles.costItemFill, { width: '30%', backgroundColor: '#8b5cf6' }]} />
                </View>
                <Text style={[styles.costItemLabel, { color: '#9ca3af' }]}>Storage (30%)</Text>
              </View>
              <View style={styles.costItem}>
                <View style={[styles.costItemBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <View style={[styles.costItemFill, { width: '25%', backgroundColor: '#f59e0b' }]} />
                </View>
                <Text style={[styles.costItemLabel, { color: '#9ca3af' }]}>Compute (25%)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>System Health</Text>
          <View style={[styles.healthContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Server size={24} color="#10b981" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>API Gateway</Text>
                <Text style={[styles.healthStatus, { color: '#10b981' }]}>99.9% Uptime</Text>
              </View>
              <View style={[styles.healthIndicator, { backgroundColor: '#10b981' }]} />
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <HardDrive size={24} color="#06b6d4" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Vector Database</Text>
                <Text style={[styles.healthStatus, { color: '#06b6d4' }]}>99.8% Uptime</Text>
              </View>
              <View style={[styles.healthIndicator, { backgroundColor: '#06b6d4' }]} />
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Cpu size={24} color="#f59e0b" />
              </View>
              <View style={styles.healthInfo}>
                <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Model Hosting</Text>
                <Text style={[styles.healthStatus, { color: '#f59e0b' }]}>85% Capacity</Text>
              </View>
              <View style={[styles.healthIndicator, { backgroundColor: '#f59e0b' }]} />
            </View>
          </View>
        </View>

        {/* Real-Time Inference Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Real-Time Inference Dashboard</Text>
          <View style={[styles.inferenceContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {realTimeInference.map(item => (
              <View key={item.id} style={[styles.inferenceRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: item.successRate > 99 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.inferenceModel}>
                  <View style={[styles.inferenceIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Monitor size={20} color="#06b6d4" />
                  </View>
                  <View style={styles.inferenceModelInfo}>
                    <Text style={[styles.inferenceModelName, { color: '#f9fafb' }]}>{item.model}</Text>
                    <Text style={[styles.inferenceTimestamp, { color: '#9ca3af' }]}>{item.timestamp}</Text>
                  </View>
                </View>
                <View style={styles.inferenceMetrics}>
                  <View style={styles.inferenceMetric}>
                    <Waves size={14} color="#06b6d4" />
                    <Text style={[styles.inferenceMetricLabel, { color: '#9ca3af' }]}>Requests</Text>
                    <Text style={[styles.inferenceMetricValue, { color: '#f9fafb' }]}>{item.requests.toLocaleString()}</Text>
                  </View>
                  <View style={styles.inferenceMetric}>
                    <Clock size={14} color="#8b5cf6" />
                    <Text style={[styles.inferenceMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                    <Text style={[styles.inferenceMetricValue, { color: '#f9faff' }]}>{item.latency}</Text>
                  </View>
                  <View style={styles.inferenceMetric}>
                    <Zap size={14} color="#10b981" />
                    <Text style={[styles.inferenceMetricLabel, { color: '#9ca3af' }]}>Success</Text>
                    <Text style={[styles.inferenceMetricValue, { color: item.successRate > 99 ? '#10b981' : '#f59e0b' }]}>{item.successRate}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Drift Detection System */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Drift Detection</Text>
          <View style={[styles.driftContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {driftDetection.map(item => (
              <View key={item.id} style={[styles.driftCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: item.status === 'stable' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.driftHeader}>
                  <View style={styles.driftModelInfo}>
                    <Text style={[styles.driftModelName, { color: '#f9fafb' }]}>{item.model}</Text>
                    <Text style={[styles.driftLastCheck, { color: '#9ca3af' }]}>Last check: {item.lastCheck}</Text>
                  </View>
                  <View style={[styles.driftScore, { backgroundColor: item.driftScore < 0.05 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.driftScoreValue, { color: item.driftScore < 0.05 ? '#10b981' : '#f59e0b' }]}>{item.driftScore}</Text>
                  </View>
                </View>
                <View style={styles.driftFooter}>
                  <View style={[styles.driftStatus, { backgroundColor: item.status === 'stable' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                    <Flame size={16} color={item.status === 'stable' ? '#10b981' : '#f59e0b'} />
                    <Text style={[styles.driftStatusText, { color: item.status === 'stable' ? '#10b981' : '#f59e0b' }]}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Trends */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Performance Trends</Text>
          <View style={[styles.trendsContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {performanceTrends.map(trend => (
              <View key={trend.id} style={[styles.trendRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.trendMetric}>
                  <Text style={[styles.trendMetricName, { color: '#f9fafb' }]}>{trend.metric}</Text>
                  <View style={styles.trendValues}>
                    <Text style={[styles.trendCurrent, { color: '#f9fafb' }]}>{trend.current}</Text>
                    <Text style={[styles.trendPrevious, { color: '#9ca3af' }]}>→ {trend.previous}</Text>
                  </View>
                </View>
                <View style={[styles.trendChange, { backgroundColor: trend.status === 'improved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                  {trend.status === 'improved' ? <ArrowDown size={16} color="#10b981" /> : <ArrowUp size={16} color="#ef4444" />}
                  <Text style={[styles.trendChangeText, { color: trend.status === 'improved' ? '#10b981' : '#ef4444' }]}>{Math.abs(trend.change)}%</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 16,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricName: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  metricContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: '500',
  },
  modelsGrid: {
    gap: 12,
  },
  modelCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelLatency: {
    fontSize: 12,
    fontWeight: '500',
  },
  modelAccuracy: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  accuracyValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  modelMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  modelMetric: {
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
  modelFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  heatmapContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  heatmapGrid: {
    gap: 12,
  },
  heatmapCell: {
    padding: 16,
    borderRadius: 12,
  },
  heatmapRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  heatmapBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  heatmapUsage: {
    fontSize: 16,
    fontWeight: '700',
  },
  costContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 20,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costInfo: {
    flex: 1,
  },
  costLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  costValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  costTrend: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  costTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  costBreakdown: {
    gap: 12,
  },
  costItem: {
    gap: 6,
  },
  costItemBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  costItemFill: {
    height: '100%',
    borderRadius: 4,
  },
  costItemLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  healthContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  healthInfo: {
    flex: 1,
  },
  healthTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  healthStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  inferenceContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  inferenceRow: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  inferenceModel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inferenceModelInfo: {
    flex: 1,
  },
  inferenceModelName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  inferenceTimestamp: {
    fontSize: 12,
    fontWeight: '500',
  },
  inferenceMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  inferenceMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  inferenceMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  inferenceMetricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  driftContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  driftCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  driftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driftModelInfo: {
    flex: 1,
  },
  driftModelName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  driftLastCheck: {
    fontSize: 12,
    fontWeight: '500',
  },
  driftScore: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  driftScoreValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  driftFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driftStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  driftStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendsContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  trendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  trendMetric: {
    flex: 1,
  },
  trendMetricName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  trendValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendCurrent: {
    fontSize: 16,
    fontWeight: '700',
  },
  trendPrevious: {
    fontSize: 13,
    fontWeight: '500',
  },
  trendChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  trendChangeText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
