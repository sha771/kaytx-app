/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Cpu, GitBranch, Clock, CheckCircle, AlertTriangle, 
  ArrowLeft, ChevronRight, Layers, Workflow, TrendingUp,
  FileText, Database, Shield, Zap, Play, Pause, RotateCcw,
  BarChart3, Activity, ArrowUp, ArrowDown, Target, Award,
  Crown, Network, Settings, Lock, Eye
} from 'lucide-react-native';

interface ModelVersion {
  id: string;
  name: string;
  version: string;
  status: 'production' | 'staging' | 'development' | 'deprecated';
  accuracy: number;
  latency: string;
  deploymentDate: string;
  trainingData: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
}

const lifecycleStages = [
  { id: '1', name: 'Model Created', status: 'completed', icon: Layers },
  { id: '2', name: 'Training Validation', status: 'completed', icon: TrendingUp },
  { id: '3', name: 'Safety Review', status: 'completed', icon: Shield },
  { id: '4', name: 'Policy Check', status: 'completed', icon: FileText },
  { id: '5', name: 'Deployment Approval', status: 'in_progress', icon: CheckCircle },
  { id: '6', name: 'Production Monitoring', status: 'pending', icon: Activity },
  { id: '7', name: 'Continuous Evaluation', status: 'pending', icon: RotateCcw },
];

const modelVersions = [
  { id: '1', model: 'GPT-4-Turbo', version: 'v2.4.1', accuracy: 96.8, latency: '245ms', throughput: '12.4K req/s', cost: '$0.03/1K tokens', status: 'production' },
  { id: '2', model: 'GPT-4-Turbo', version: 'v2.3.8', accuracy: 96.2, latency: '258ms', throughput: '11.8K req/s', cost: '$0.03/1K tokens', status: 'staging' },
  { id: '3', model: 'Claude-3-Opus', version: 'v1.8.2', accuracy: 95.4, latency: '312ms', throughput: '9.2K req/s', cost: '$0.04/1K tokens', status: 'production' },
  { id: '4', model: 'Claude-3-Opus', version: 'v1.7.5', accuracy: 94.8, latency: '328ms', throughput: '8.8K req/s', cost: '$0.04/1K tokens', status: 'deprecated' },
];

const deploymentReadiness = [
  { id: '1', model: 'Llama-2-70B', version: 'v3.1.0', readiness: 92, blockers: 1, warnings: 3, status: 'ready' },
  { id: '2', model: 'Mistral-Large', version: 'v1.0.5', readiness: 78, blockers: 2, warnings: 5, status: 'needs-review' },
  { id: '3', model: 'Gemma-7B', version: 'v2.2.1', readiness: 65, blockers: 3, warnings: 7, status: 'not-ready' },
];

const mockModels: ModelVersion[] = [
  {
    id: '1',
    name: 'GPT-4-Turbo',
    version: 'v2.4.1',
    status: 'production',
    accuracy: 96.8,
    latency: '245ms',
    deploymentDate: '2024-01-15',
    trainingData: 'Enterprise Corpus v3.2',
    approvalStatus: 'approved'
  },
  {
    id: '2',
    name: 'Claude-3-Opus',
    version: 'v1.8.2',
    status: 'production',
    accuracy: 95.4,
    latency: '312ms',
    deploymentDate: '2024-01-10',
    trainingData: 'Internal Knowledge Base',
    approvalStatus: 'approved'
  },
  {
    id: '3',
    name: 'Llama-2-70B',
    version: 'v3.1.0',
    status: 'staging',
    accuracy: 93.2,
    latency: '189ms',
    deploymentDate: '2024-01-18',
    trainingData: 'Public Web Dataset',
    approvalStatus: 'pending'
  },
  {
    id: '4',
    name: 'Mistral-Large',
    version: 'v1.0.5',
    status: 'development',
    accuracy: 91.8,
    latency: '156ms',
    deploymentDate: '2024-01-20',
    trainingData: 'Mixed Corpus',
    approvalStatus: 'pending'
  },
];

export default function ModelGovernanceScreen() {
  const [selectedModel, setSelectedModel] = useState<ModelVersion | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return '#10b981';
      case 'staging': return '#06b6d4';
      case 'development': return '#8b5cf6';
      case 'deprecated': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const LifecycleStage = ({ stage, index }: { stage: typeof lifecycleStages[0], index: number }) => {
    const Icon = stage.icon;
    return (
      <View style={styles.stageContainer}>
        <View style={[styles.stageIcon, { backgroundColor: stage.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : stage.status === 'in_progress' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(156, 163, 175, 0.2)' }]}>
          <Icon size={20} color={stage.status === 'completed' ? '#10b981' : stage.status === 'in_progress' ? '#06b6d4' : '#9ca3af'} />
        </View>
        <Text style={[styles.stageName, { color: '#f9fafb' }]}>{stage.name}</Text>
        {index < lifecycleStages.length - 1 && <View style={[styles.stageConnector, { backgroundColor: stage.status === 'completed' ? '#10b981' : 'rgba(156, 163, 175, 0.3)' }]} />}
      </View>
    );
  };

  const ModelCard = ({ model }: { model: ModelVersion }) => (
    <TouchableOpacity 
      style={[styles.modelCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(model.status)}30` }]}
      onPress={() => setSelectedModel(model)}
    >
      <View style={styles.modelHeader}>
        <View style={[styles.modelIcon, { backgroundColor: `${getStatusColor(model.status)}20` }]}>
          <Cpu size={24} color={getStatusColor(model.status)} />
        </View>
        <View style={styles.modelInfo}>
          <Text style={[styles.modelName, { color: '#f9fafb' }]}>{model.name}</Text>
          <Text style={[styles.modelVersion, { color: '#9ca3af' }]}>{model.version}</Text>
        </View>
        <View style={[styles.modelStatus, { backgroundColor: `${getStatusColor(model.status)}20` }]}>
          <Text style={[styles.modelStatusText, { color: getStatusColor(model.status) }]}>{model.status}</Text>
        </View>
      </View>
      <View style={styles.modelMetrics}>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{model.accuracy}%</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Latency</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{model.latency}</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Deployed</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{model.deploymentDate}</Text>
        </View>
      </View>
      <View style={styles.modelFooter}>
        <View style={styles.approvalBadge}>
          <Text style={[styles.approvalText, { color: getApprovalColor(model.approvalStatus) }]}>
            {model.approvalStatus}
          </Text>
        </View>
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Model Governance</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Model Registry & Lifecycle Management</Text>
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
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Model Governance Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Model Registry & Orchestration</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>GOVERNED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>2,481</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Registered Models</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>96.8%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Avg Accuracy</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>18,240</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Deployments</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>48</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Drift Alerts</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Model Lifecycle Pipeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Lifecycle Pipeline</Text>
          <View style={[styles.lifecycleContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lifecycleScroll}>
              {lifecycleStages.map((stage, index) => (
                <View key={stage.id} style={styles.lifecycleStage}>
                  <LifecycleStage stage={stage} index={index} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Model Registry */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Registry</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Register Model</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modelsGrid}>
            {mockModels.map(model => (
              <ModelCard key={model.id} model={model} />
            ))}
          </View>
        </View>

        {/* Model Performance Drift */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Performance Drift</Text>
          <View style={[styles.driftContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.driftItem}>
              <View style={styles.driftHeader}>
                <Text style={[styles.driftModel, { color: '#f9fafb' }]}>GPT-4-Turbo v2.4.1</Text>
                <View style={[styles.driftBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Text style={[styles.driftBadgeText, { color: '#10b981' }]}>Stable</Text>
                </View>
              </View>
              <View style={styles.driftMetrics}>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Drift Score</Text>
                  <Text style={[styles.driftMetricValue, { color: '#10b981' }]}>0.02</Text>
                </View>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Accuracy Delta</Text>
                  <Text style={[styles.driftMetricValue, { color: '#10b981' }]}>-0.1%</Text>
                </View>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Last Check</Text>
                  <Text style={[styles.driftMetricValue, { color: '#f9fafb' }]}>2h ago</Text>
                </View>
              </View>
            </View>
            <View style={styles.driftItem}>
              <View style={styles.driftHeader}>
                <Text style={[styles.driftModel, { color: '#f9fafb' }]}>Claude-3-Opus v1.8.2</Text>
                <View style={[styles.driftBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <Text style={[styles.driftBadgeText, { color: '#f59e0b' }]}>Warning</Text>
                </View>
              </View>
              <View style={styles.driftMetrics}>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Drift Score</Text>
                  <Text style={[styles.driftMetricValue, { color: '#f59e0b' }]}>0.15</Text>
                </View>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Accuracy Delta</Text>
                  <Text style={[styles.driftMetricValue, { color: '#f59e0b' }]}>-1.2%</Text>
                </View>
                <View style={styles.driftMetric}>
                  <Text style={[styles.driftMetricLabel, { color: '#9ca3af' }]}>Last Check</Text>
                  <Text style={[styles.driftMetricValue, { color: '#f9fafb' }]}>1h ago</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Training Data Sources */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Training Data Sources</Text>
          <View style={[styles.dataSourcesContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.dataSourceItem}>
              <View style={[styles.dataSourceIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Database size={24} color="#06b6d4" />
              </View>
              <View style={styles.dataSourceInfo}>
                <Text style={[styles.dataSourceName, { color: '#f9fafb' }]}>Enterprise Corpus v3.2</Text>
                <Text style={[styles.dataSourceMeta, { color: '#9ca3af' }]}>2.4TB • 842M documents • Verified</Text>
              </View>
              <CheckCircle size={20} color="#10b981" />
            </View>
            <View style={styles.dataSourceItem}>
              <View style={[styles.dataSourceIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Database size={24} color="#8b5cf6" />
              </View>
              <View style={styles.dataSourceInfo}>
                <Text style={[styles.dataSourceName, { color: '#f9fafb' }]}>Internal Knowledge Base</Text>
                <Text style={[styles.dataSourceMeta, { color: '#9ca3af' }]}>1.8TB • 521M documents • Verified</Text>
              </View>
              <CheckCircle size={20} color="#10b981" />
            </View>
            <View style={styles.dataSourceItem}>
              <View style={[styles.dataSourceIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <Database size={24} color="#f59e0b" />
              </View>
              <View style={styles.dataSourceInfo}>
                <Text style={[styles.dataSourceName, { color: '#f9fafb' }]}>Public Web Dataset</Text>
                <Text style={[styles.dataSourceMeta, { color: '#9ca3af' }]}>4.2TB • 1.2B documents • Pending Review</Text>
              </View>
              <AlertTriangle size={20} color="#f59e0b" />
            </View>
          </View>
        </View>

        {/* Version Comparison Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Version Comparison Dashboard</Text>
          <View style={[styles.versionComparisonContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {modelVersions.map(version => (
              <View key={version.id} style={[styles.versionRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: version.status === 'production' ? 'rgba(16, 185, 129, 0.3)' : version.status === 'staging' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(239, 68, 68, 0.3)' }]}>
                <View style={styles.versionModel}>
                  <Text style={[styles.versionModelName, { color: '#f9fafb' }]}>{version.model}</Text>
                  <Text style={[styles.versionModelVersion, { color: '#9ca3af' }]}>{version.version}</Text>
                </View>
                <View style={styles.versionMetrics}>
                  <View style={styles.versionMetric}>
                    <BarChart3 size={14} color="#06b6d4" />
                    <Text style={[styles.versionMetricValue, { color: '#f9fafb' }]}>{version.accuracy}%</Text>
                  </View>
                  <View style={styles.versionMetric}>
                    <Clock size={14} color="#8b5cf6" />
                    <Text style={[styles.versionMetricValue, { color: '#f9fafb' }]}>{version.latency}</Text>
                  </View>
                  <View style={styles.versionMetric}>
                    <Activity size={14} color="#10b981" />
                    <Text style={[styles.versionMetricValue, { color: '#f9fafb' }]}>{version.throughput}</Text>
                  </View>
                  <View style={styles.versionMetric}>
                    <Zap size={14} color="#f59e0b" />
                    <Text style={[styles.versionMetricValue, { color: '#f9fafb' }]}>{version.cost}</Text>
                  </View>
                </View>
                <View style={[styles.versionStatusBadge, { backgroundColor: version.status === 'production' ? 'rgba(16, 185, 129, 0.2)' : version.status === 'staging' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                  <Text style={[styles.versionStatusText, { color: version.status === 'production' ? '#10b981' : version.status === 'staging' ? '#06b6d4' : '#ef4444' }]}>{version.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Deployment Readiness Matrix */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Deployment Readiness Matrix</Text>
          <View style={[styles.readinessContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {deploymentReadiness.map(item => (
              <View key={item.id} style={[styles.readinessCard, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: item.status === 'ready' ? 'rgba(16, 185, 129, 0.3)' : item.status === 'needs-review' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)' }]}>
                <View style={styles.readinessHeader}>
                  <View style={styles.readinessModelInfo}>
                    <Text style={[styles.readinessModelName, { color: '#f9fafb' }]}>{item.model}</Text>
                    <Text style={[styles.readinessModelVersion, { color: '#9ca3af' }]}>{item.version}</Text>
                  </View>
                  <View style={[styles.readinessScore, { backgroundColor: item.readiness >= 90 ? 'rgba(16, 185, 129, 0.2)' : item.readiness >= 70 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                    <Text style={[styles.readinessScoreValue, { color: item.readiness >= 90 ? '#10b981' : item.readiness >= 70 ? '#f59e0b' : '#ef4444' }]}>{item.readiness}%</Text>
                  </View>
                </View>
                <View style={styles.readinessMetrics}>
                  <View style={styles.readinessMetric}>
                    <AlertTriangle size={14} color="#ef4444" />
                    <Text style={[styles.readinessMetricLabel, { color: '#9ca3af' }]}>Blockers</Text>
                    <Text style={[styles.readinessMetricValue, { color: item.blockers > 0 ? '#ef4444' : '#10b981' }]}>{item.blockers}</Text>
                  </View>
                  <View style={styles.readinessMetric}>
                    <Target size={14} color="#f59e0b" />
                    <Text style={[styles.readinessMetricLabel, { color: '#9ca3af' }]}>Warnings</Text>
                    <Text style={[styles.readinessMetricValue, { color: item.warnings > 3 ? '#f59e0b' : '#10b981' }]}>{item.warnings}</Text>
                  </View>
                </View>
                <View style={[styles.readinessStatus, { backgroundColor: item.status === 'ready' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'needs-review' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                  <Award size={16} color={item.status === 'ready' ? '#10b981' : item.status === 'needs-review' ? '#f59e0b' : '#ef4444'} />
                  <Text style={[styles.readinessStatusText, { color: item.status === 'ready' ? '#10b981' : item.status === 'needs-review' ? '#f59e0b' : '#ef4444' }]}>{item.status === 'ready' ? 'Ready for Deployment' : item.status === 'needs-review' ? 'Needs Review' : 'Not Ready'}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Model Performance Benchmarking */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Performance Benchmarking</Text>
          <View style={[styles.benchmarkContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.benchmarkHeader}>
              <Text style={[styles.benchmarkModel, { color: '#f9fafb' }]}>GPT-4-Turbo v2.4.1</Text>
              <View style={[styles.benchmarkBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.benchmarkBadgeText, { color: '#10b981' }]}>SOTA</Text>
              </View>
            </View>
            <View style={styles.benchmarkMetrics}>
              <View style={styles.benchmarkMetric}>
                <Text style={[styles.benchmarkMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <View style={[styles.benchmarkFill, { width: '96.8%', backgroundColor: '#10b981' }]} />
                </View>
                <Text style={[styles.benchmarkMetricValue, { color: '#10b981' }]}>96.8%</Text>
              </View>
              <View style={styles.benchmarkMetric}>
                <Text style={[styles.benchmarkMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <View style={[styles.benchmarkFill, { width: '82%', backgroundColor: '#06b6d4' }]} />
                </View>
                <Text style={[styles.benchmarkMetricValue, { color: '#06b6d4' }]}>245ms</Text>
              </View>
              <View style={styles.benchmarkMetric}>
                <Text style={[styles.benchmarkMetricLabel, { color: '#9ca3af' }]}>Throughput</Text>
                <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <View style={[styles.benchmarkFill, { width: '92%', backgroundColor: '#8b5cf6' }]} />
                </View>
                <Text style={[styles.benchmarkMetricValue, { color: '#8b5cf6' }]}>12.4K/s</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Model Lineage Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Lineage Graph</Text>
          <View style={[styles.lineageContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.lineageGraph}>
              <View style={[styles.lineageNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                <Database size={20} color="#06b6d4" />
                <Text style={[styles.lineageNodeText, { color: '#06b6d4' }]}>Training Data</Text>
                <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>v3.2</Text>
              </View>
              <View style={[styles.lineageConnector, { backgroundColor: '#06b6d4' }]} />
              <View style={[styles.lineageNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                <Workflow size={20} color="#8b5cf6" />
                <Text style={[styles.lineageNodeText, { color: '#8b5cf6' }]}>Training</Text>
                <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>Epoch 42</Text>
              </View>
              <View style={[styles.lineageConnector, { backgroundColor: '#8b5cf6' }]} />
              <View style={[styles.lineageNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                <CheckCircle size={20} color="#10b981" />
                <Text style={[styles.lineageNodeText, { color: '#10b981' }]}>Validation</Text>
                <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>Passed</Text>
              </View>
              <View style={[styles.lineageConnector, { backgroundColor: '#10b981' }]} />
              <View style={[styles.lineageNode, { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' }]}>
                <Play size={20} color="#f59e0b" />
                <Text style={[styles.lineageNodeText, { color: '#f59e0b' }]}>Deployment</Text>
                <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>v2.4.1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Model Cost Analysis */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Cost Analysis</Text>
          <View style={[styles.costContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.costSummary}>
              <View style={styles.costMetric}>
                <Text style={[styles.costMetricLabel, { color: '#9ca3af' }]}>Total Monthly Cost</Text>
                <Text style={[styles.costMetricValue, { color: '#f9fafb' }]}>$124,840</Text>
              </View>
              <View style={styles.costMetric}>
                <Text style={[styles.costMetricLabel, { color: '#9ca3af' }]}>Cost per 1K Tokens</Text>
                <Text style={[styles.costMetricValue, { color: '#06b6d4' }]}>$0.03</Text>
              </View>
              <View style={styles.costMetric}>
                <Text style={[styles.costMetricLabel, { color: '#9ca3af' }]}>Cost Trend</Text>
                <Text style={[styles.costMetricValue, { color: '#10b981' }]}>-12% MoM</Text>
              </View>
            </View>
            <View style={styles.costBreakdown}>
              <View style={styles.costBreakdownItem}>
                <View style={[styles.costBreakdownBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <View style={[styles.costBreakdownFill, { width: '65%', backgroundColor: '#06b6d4' }]} />
                </View>
                <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Inference (65%)</Text>
              </View>
              <View style={styles.costBreakdownItem}>
                <View style={[styles.costBreakdownBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <View style={[styles.costBreakdownFill, { width: '25%', backgroundColor: '#8b5cf6' }]} />
                </View>
                <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Training (25%)</Text>
              </View>
              <View style={styles.costBreakdownItem}>
                <View style={[styles.costBreakdownBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <View style={[styles.costBreakdownFill, { width: '10%', backgroundColor: '#10b981' }]} />
                </View>
                <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Storage (10%)</Text>
              </View>
            </View>
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
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  lifecycleContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  lifecycleScroll: {
    flexDirection: 'row',
  },
  lifecycleStage: {
    marginRight: 20,
  },
  stageContainer: {
    alignItems: 'center',
    width: 100,
  },
  stageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stageName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  stageConnector: {
    position: 'absolute',
    top: 24,
    right: -20,
    width: 40,
    height: 2,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelVersion: {
    fontSize: 13,
    fontWeight: '500',
  },
  modelStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modelStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
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
    fontSize: 16,
    fontWeight: '700',
  },
  modelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  approvalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  approvalText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  driftContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
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
  driftMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  driftMetric: {
    flex: 1,
  },
  driftMetricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  driftMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  dataSourcesContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  dataSourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
  },
  dataSourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dataSourceInfo: {
    flex: 1,
  },
  dataSourceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  dataSourceMeta: {
    fontSize: 12,
    fontWeight: '400',
  },
  versionComparisonContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  versionModel: {
    flex: 1,
  },
  versionModelName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  versionModelVersion: {
    fontSize: 12,
    fontWeight: '500',
  },
  versionMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 16,
  },
  versionMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  versionMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  versionStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  versionStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  readinessContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  readinessCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  readinessModelInfo: {
    flex: 1,
  },
  readinessModelName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  readinessModelVersion: {
    fontSize: 12,
    fontWeight: '500',
  },
  readinessScore: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  readinessScoreValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  readinessMetrics: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  readinessMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  readinessMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  readinessMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  readinessStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  readinessStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  benchmarkContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  benchmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  benchmarkModel: {
    fontSize: 16,
    fontWeight: '700',
  },
  benchmarkBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  benchmarkBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  benchmarkMetrics: {
    gap: 16,
  },
  benchmarkMetric: {
    gap: 8,
  },
  benchmarkMetricLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  benchmarkBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  benchmarkFill: {
    height: '100%',
    borderRadius: 4,
  },
  benchmarkMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  lineageContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  lineageGraph: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineageNode: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
  },
  lineageNodeText: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  lineageNodeSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  lineageConnector: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  costContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  costSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  costMetric: {
    alignItems: 'center',
  },
  costMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  costMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  costBreakdown: {
    gap: 12,
  },
  costBreakdownItem: {
    gap: 6,
  },
  costBreakdownBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  costBreakdownFill: {
    height: '100%',
    borderRadius: 4,
  },
  costBreakdownLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});
