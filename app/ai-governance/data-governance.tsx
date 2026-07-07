/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Database, GitBranch, Shield, AlertTriangle, CheckCircle, 
  ArrowLeft, ChevronRight, Layers, Network, FileText,
  Lock, Eye, TrendingUp, Activity, Zap, HardDrive, FolderOpen,
  TreeDeciduous, Link2, RefreshCw, BarChart3, Scan, Crown,
  Settings, Clock, AlertCircle
} from 'lucide-react-native';

interface Dataset {
  id: string;
  name: string;
  type: string;
  size: string;
  qualityScore: number;
  piiRisk: 'low' | 'medium' | 'high';
  lineage: string;
  lastUpdated: string;
}

interface DataFlow {
  id: string;
  source: string;
  destination: string;
  type: string;
  volume: string;
  status: 'active' | 'paused' | 'error';
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Enterprise Corpus v3.2',
    type: 'Training Data',
    size: '2.4TB',
    qualityScore: 96,
    piiRisk: 'low',
    lineage: 'Verified',
    lastUpdated: '2024-01-20'
  },
  {
    id: '2',
    name: 'Customer Interaction Logs',
    type: 'Production Data',
    size: '1.8TB',
    qualityScore: 92,
    piiRisk: 'medium',
    lineage: 'Verified',
    lastUpdated: '2024-01-18'
  },
  {
    id: '3',
    name: 'Public Web Dataset',
    type: 'External Data',
    size: '4.2TB',
    qualityScore: 88,
    piiRisk: 'high',
    lineage: 'Pending Review',
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    name: 'Internal Knowledge Base',
    type: 'Training Data',
    size: '1.2TB',
    qualityScore: 94,
    piiRisk: 'low',
    lineage: 'Verified',
    lastUpdated: '2024-01-12'
  },
];

const dataFlows: DataFlow[] = [
  { id: '1', source: 'CRM System', destination: 'Data Lake', type: 'Sync', volume: '450GB/day', status: 'active' },
  { id: '2', source: 'API Gateway', destination: 'Vector DB', type: 'Stream', volume: '120GB/day', status: 'active' },
  { id: '3', source: 'External APIs', destination: 'Data Lake', type: 'Ingest', volume: '280GB/day', status: 'paused' },
  { id: '4', source: 'Model Outputs', destination: 'Audit Log', type: 'Archive', volume: '85GB/day', status: 'active' },
];

const lineageNodes = [
  { id: '1', name: 'Data Sources', status: 'verified' },
  { id: '2', name: 'Ingestion Pipeline', status: 'verified' },
  { id: '3', name: 'Data Lake', status: 'verified' },
  { id: '4', name: 'Processing Layer', status: 'verified' },
  { id: '5', name: 'Feature Store', status: 'verified' },
  { id: '6', name: 'Model Training', status: 'verified' },
  { id: '7', name: 'Production', status: 'verified' },
];

const lineageGraph = [
  { id: '1', source: 'CRM System', target: 'Data Lake', type: 'sync', confidence: 98 },
  { id: '2', source: 'Data Lake', target: 'Processing Layer', type: 'transform', confidence: 95 },
  { id: '3', source: 'Processing Layer', target: 'Feature Store', type: 'extract', confidence: 97 },
  { id: '4', source: 'Feature Store', target: 'Model Training', type: 'train', confidence: 94 },
  { id: '5', source: 'Model Training', target: 'Production', type: 'deploy', confidence: 96 },
];

const dataQualityMetrics = [
  { id: '1', metric: 'Completeness', value: 96, trend: 'up', threshold: 95 },
  { id: '2', metric: 'Accuracy', value: 94, trend: 'stable', threshold: 90 },
  { id: '3', metric: 'Consistency', value: 92, trend: 'down', threshold: 90 },
  { id: '4', metric: 'Timeliness', value: 98, trend: 'up', threshold: 95 },
];

const dataLineageTree = [
  { id: '1', name: 'Enterprise Corpus', type: 'root', children: ['Customer Data', 'Product Data', 'Transaction Data'] },
  { id: '2', name: 'Customer Data', type: 'branch', children: ['CRM Records', 'Support Tickets', 'Web Interactions'] },
  { id: '3', name: 'Product Data', type: 'branch', children: ['Catalog', 'Inventory', 'Pricing'] },
  { id: '4', name: 'Transaction Data', type: 'branch', children: ['Orders', 'Payments', 'Refunds'] },
];

export default function DataGovernanceScreen() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const getPIIRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  const DatasetCard = ({ dataset }: { dataset: Dataset }) => (
    <TouchableOpacity 
      style={[styles.datasetCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getPIIRiskColor(dataset.piiRisk)}30` }]}
      onPress={() => setSelectedDataset(dataset)}
    >
      <View style={styles.datasetHeader}>
        <View style={[styles.datasetIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Database size={24} color="#06b6d4" />
        </View>
        <View style={styles.datasetInfo}>
          <Text style={[styles.datasetName, { color: '#f9fafb' }]}>{dataset.name}</Text>
          <Text style={[styles.datasetType, { color: '#9ca3af' }]}>{dataset.type}</Text>
        </View>
        <View style={[styles.piiBadge, { backgroundColor: `${getPIIRiskColor(dataset.piiRisk)}20` }]}>
          <Text style={[styles.piiBadgeText, { color: getPIIRiskColor(dataset.piiRisk) }]}>PII: {dataset.piiRisk}</Text>
        </View>
      </View>
      <View style={styles.datasetMetrics}>
        <View style={styles.datasetMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Size</Text>
          <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{dataset.size}</Text>
        </View>
        <View style={styles.datasetMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Quality Score</Text>
          <Text style={[styles.metricValue, { color: dataset.qualityScore > 90 ? '#10b981' : dataset.qualityScore > 80 ? '#f59e0b' : '#ef4444' }]}>{dataset.qualityScore}%</Text>
        </View>
        <View style={styles.datasetMetric}>
          <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>Lineage</Text>
          <Text style={[styles.metricValue, { color: dataset.lineage === 'Verified' ? '#10b981' : '#f59e0b' }]}>{dataset.lineage}</Text>
        </View>
      </View>
      <View style={styles.datasetFooter}>
        <Text style={[styles.datasetUpdated, { color: '#6b7280' }]}>Updated: {dataset.lastUpdated}</Text>
        <ChevronRight size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );

  const DataFlowCard = ({ flow }: { flow: DataFlow }) => (
    <View style={[styles.flowCard, { backgroundColor: 'rgba(10, 15, 25, 0.6)', borderLeftWidth: 3, borderLeftColor: getStatusColor(flow.status) }]}>
      <View style={styles.flowHeader}>
        <View style={[styles.flowIcon, { backgroundColor: `${getStatusColor(flow.status)}20` }]}>
          <GitBranch size={20} color={getStatusColor(flow.status)} />
        </View>
        <View style={styles.flowInfo}>
          <Text style={[styles.flowSource, { color: '#f9fafb' }]}>{flow.source}</Text>
          <Text style={[styles.flowArrow, { color: '#6b7280' }]}>→</Text>
          <Text style={[styles.flowDestination, { color: '#f9fafb' }]}>{flow.destination}</Text>
        </View>
        <View style={[styles.flowStatus, { backgroundColor: `${getStatusColor(flow.status)}20` }]}>
          <Text style={[styles.flowStatusText, { color: getStatusColor(flow.status) }]}>{flow.status}</Text>
        </View>
      </View>
      <View style={styles.flowMetrics}>
        <View style={styles.flowMetric}>
          <Text style={[styles.flowMetricLabel, { color: '#9ca3af' }]}>Type</Text>
          <Text style={[styles.flowMetricValue, { color: '#f9fafb' }]}>{flow.type}</Text>
        </View>
        <View style={styles.flowMetric}>
          <Text style={[styles.flowMetricLabel, { color: '#9ca3af' }]}>Volume</Text>
          <Text style={[styles.flowMetricValue, { color: '#f9fafb' }]}>{flow.volume}</Text>
        </View>
      </View>
    </View>
  );

  const LineageNode = ({ node, index }: { node: typeof lineageNodes[0], index: number }) => (
    <View style={styles.lineageNode}>
      <View style={[styles.nodeIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
        <CheckCircle size={20} color="#10b981" />
      </View>
      <Text style={[styles.nodeName, { color: '#f9fafb' }]}>{node.name}</Text>
      {index < lineageNodes.length - 1 && <View style={[styles.nodeConnector, { backgroundColor: '#10b981' }]} />}
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
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Data Governance</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>Data Lineage & Quality Management</Text>
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
                  <Text style={[styles.executiveName, { color: '#f9fafb' }]}>Data Governance Control</Text>
                  <Text style={[styles.executiveRole, { color: '#9ca3af' }]}>Enterprise Data Lineage & Quality</Text>
                </View>
              </View>
              <View style={[styles.executiveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <Text style={[styles.executiveBadgeText, { color: '#10b981' }]}>GOVERNED</Text>
              </View>
            </View>
            <View style={styles.executiveMetrics}>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#06b6d4' }]}>4,820</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Datasets</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#10b981' }]}>94.2%</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Quality Score</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#8b5cf6' }]}>12.4TB</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>Total Data</Text>
              </View>
              <View style={styles.executiveMetric}>
                <Text style={[styles.executiveMetricValue, { color: '#f59e0b' }]}>28</Text>
                <Text style={[styles.executiveMetricLabel, { color: '#9ca3af' }]}>PII Alerts</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Sensitivity Heatmap */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Sensitivity Heatmap</Text>
          <View style={[styles.heatmapContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.heatmapGrid}>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)', borderColor: 'rgba(16, 185, 129, 0.5)' }]}>
                <View style={styles.heatmapCellHeader}>
                  <Shield size={16} color="#10b981" />
                  <Text style={[styles.heatmapCellTitle, { color: '#10b981' }]}>Public Data</Text>
                </View>
                <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>2,840</Text>
                <Text style={[styles.heatmapCellSub, { color: '#9ca3af' }]}>Datasets</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(6, 182, 212, 0.3)', borderColor: 'rgba(6, 182, 212, 0.5)' }]}>
                <View style={styles.heatmapCellHeader}>
                  <Lock size={16} color="#06b6d4" />
                  <Text style={[styles.heatmapCellTitle, { color: '#06b6d4' }]}>Internal</Text>
                </View>
                <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>1,420</Text>
                <Text style={[styles.heatmapCellSub, { color: '#9ca3af' }]}>Datasets</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(245, 158, 11, 0.3)', borderColor: 'rgba(245, 158, 11, 0.5)' }]}>
                <View style={styles.heatmapCellHeader}>
                  <AlertTriangle size={16} color="#f59e0b" />
                  <Text style={[styles.heatmapCellTitle, { color: '#f59e0b' }]}>Confidential</Text>
                </View>
                <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>482</Text>
                <Text style={[styles.heatmapCellSub, { color: '#9ca3af' }]}>Datasets</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(239, 68, 68, 0.3)', borderColor: 'rgba(239, 68, 68, 0.5)' }]}>
                <View style={styles.heatmapCellHeader}>
                  <AlertCircle size={16} color="#ef4444" />
                  <Text style={[styles.heatmapCellTitle, { color: '#ef4444' }]}>Restricted</Text>
                </View>
                <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>78</Text>
                <Text style={[styles.heatmapCellSub, { color: '#9ca3af' }]}>Datasets</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Overview</Text>
          <View style={[styles.overviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.overviewMetrics}>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Database size={32} color="#06b6d4" />
                </View>
                <Text style={[styles.overviewValue, { color: '#06b6d4' }]}>9.6TB</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Total Data</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <CheckCircle size={32} color="#10b981" />
                </View>
                <Text style={[styles.overviewValue, { color: '#10b981' }]}>94.2%</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>Quality Score</Text>
              </View>
              <View style={styles.overviewMetric}>
                <View style={[styles.overviewIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <AlertTriangle size={32} color="#f59e0b" />
                </View>
                <Text style={[styles.overviewValue, { color: '#f59e0b' }]}>12</Text>
                <Text style={[styles.overviewLabel, { color: '#9ca3af' }]}>PII Alerts</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Lineage */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Lineage Pipeline</Text>
          <View style={[styles.lineageContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lineageScroll}>
              {lineageNodes.map((node, index) => (
                <View key={node.id} style={styles.lineageStage}>
                  <LineageNode node={node} index={index} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Training Datasets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Training Datasets</Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.addButtonText, { color: '#06b6d4' }]}>+ Add Dataset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.datasetsGrid}>
            {mockDatasets.map(dataset => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </View>
        </View>

        {/* Data Flows */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Flows</Text>
          <View style={styles.flowsGrid}>
            {dataFlows.map(flow => (
              <DataFlowCard key={flow.id} flow={flow} />
            ))}
          </View>
        </View>

        {/* Sensitivity Heatmap */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Sensitivity Heatmap</Text>
          <View style={[styles.heatmapContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.heatmapGrid}>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <Text style={[styles.heatmapLabel, { color: '#10b981' }]}>Public</Text>
                <Text style={[styles.heatmapCount, { color: '#f9fafb' }]}>42</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <Text style={[styles.heatmapLabel, { color: '#06b6d4' }]}>Internal</Text>
                <Text style={[styles.heatmapCount, { color: '#f9fafb' }]}>28</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <Text style={[styles.heatmapLabel, { color: '#f59e0b' }]}>Confidential</Text>
                <Text style={[styles.heatmapCount, { color: '#f9fafb' }]}>15</Text>
              </View>
              <View style={[styles.heatmapCell, { backgroundColor: 'rgba(239, 68, 68, 0.3)' }]}>
                <Text style={[styles.heatmapLabel, { color: '#ef4444' }]}>Restricted</Text>
                <Text style={[styles.heatmapCount, { color: '#f9fafb' }]}>8</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Quality Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Quality Metrics</Text>
          <View style={[styles.qualityContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {dataQualityMetrics.map(metric => (
              <View key={metric.id} style={[styles.qualityRow, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.qualityMetricInfo}>
                  <Text style={[styles.qualityLabel, { color: '#f9fafb' }]}>{metric.metric}</Text>
                  <View style={styles.qualityTrend}>
                    {metric.trend === 'up' && <TrendingUp size={12} color="#10b981" />}
                    {metric.trend === 'down' && <TrendingUp size={12} color="#ef4444" style={{ transform: [{ rotate: '180deg' }] }} />}
                    {metric.trend === 'stable' && <Activity size={12} color="#9ca3af" />}
                  </View>
                </View>
                <View style={[styles.qualityBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                  <View style={[styles.qualityFill, { width: `${metric.value}%`, backgroundColor: metric.value >= metric.threshold ? '#10b981' : '#f59e0b' }]} />
                </View>
                <Text style={[styles.qualityPercent, { color: metric.value >= metric.threshold ? '#10b981' : '#f59e0b' }]}>{metric.value}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Advanced Lineage Graph */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Advanced Lineage Graph</Text>
          <View style={[styles.lineageGraphContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {lineageGraph.map(edge => (
              <View key={edge.id} style={[styles.lineageEdge, { backgroundColor: 'rgba(255, 255, 255, 0.02)' }]}>
                <View style={styles.lineageEdgeSource}>
                  <View style={[styles.lineageEdgeDot, { backgroundColor: '#06b6d4' }]} />
                  <Text style={[styles.lineageEdgeText, { color: '#f9fafb' }]}>{edge.source}</Text>
                </View>
                <View style={styles.lineageEdgeArrow}>
                  <Link2 size={16} color="#8b5cf6" />
                  <Text style={[styles.lineageEdgeType, { color: '#9ca3af' }]}>{edge.type}</Text>
                </View>
                <View style={styles.lineageEdgeTarget}>
                  <Text style={[styles.lineageEdgeText, { color: '#f9fafb' }]}>{edge.target}</Text>
                  <View style={[styles.lineageEdgeDot, { backgroundColor: '#10b981' }]} />
                </View>
                <View style={[styles.lineageEdgeConfidence, { backgroundColor: edge.confidence > 95 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                  <Text style={[styles.lineageEdgeConfidenceText, { color: edge.confidence > 95 ? '#10b981' : '#f59e0b' }]}>{edge.confidence}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Data Lineage Tree */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Lineage Tree</Text>
          <View style={[styles.lineageTreeContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            {dataLineageTree.map(node => (
              <View key={node.id} style={[styles.lineageTreeNode, { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderLeftWidth: 3, borderLeftColor: node.type === 'root' ? '#06b6d4' : '#8b5cf6' }]}>
                <View style={styles.lineageTreeNodeHeader}>
                  <View style={[styles.lineageTreeNodeIcon, { backgroundColor: node.type === 'root' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)' }]}>
                    <TreeDeciduous size={20} color={node.type === 'root' ? '#06b6d4' : '#8b5cf6'} />
                  </View>
                  <Text style={[styles.lineageTreeNodeName, { color: '#f9fafb' }]}>{node.name}</Text>
                  <View style={[styles.lineageTreeNodeType, { backgroundColor: node.type === 'root' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)' }]}>
                    <Text style={[styles.lineageTreeNodeTypeText, { color: node.type === 'root' ? '#06b6d4' : '#8b5cf6' }]}>{node.type}</Text>
                  </View>
                </View>
                <View style={styles.lineageTreeChildren}>
                  {node.children.map((child, index) => (
                    <View key={index} style={[styles.lineageTreeChild, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
                      <Scan size={14} color="#9ca3af" />
                      <Text style={[styles.lineageTreeChildText, { color: '#9ca3af' }]}>{child}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Data Retention Policy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Retention Policy</Text>
          <View style={[styles.retentionContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.retentionGrid}>
              <View style={styles.retentionCard}>
                <View style={styles.retentionHeader}>
                  <HardDrive size={20} color="#06b6d4" />
                  <Text style={[styles.retentionTitle, { color: '#f9fafb' }]}>Training Data</Text>
                </View>
                <Text style={[styles.retentionPeriod, { color: '#06b6d4' }]}>7 Years</Text>
                <Text style={[styles.retentionSub, { color: '#9ca3af' }]}>Auto-archive after 5 years</Text>
              </View>
              <View style={styles.retentionCard}>
                <View style={styles.retentionHeader}>
                  <Activity size={20} color="#10b981" />
                  <Text style={[styles.retentionTitle, { color: '#f9fafb' }]}>Production Logs</Text>
                </View>
                <Text style={[styles.retentionPeriod, { color: '#10b981' }]}>2 Years</Text>
                <Text style={[styles.retentionSub, { color: '#9ca3af' }]}>Auto-purge after 90 days</Text>
              </View>
              <View style={styles.retentionCard}>
                <View style={styles.retentionHeader}>
                  <FolderOpen size={20} color="#8b5cf6" />
                  <Text style={[styles.retentionTitle, { color: '#f9fafb' }]}>Audit Trails</Text>
                </View>
                <Text style={[styles.retentionPeriod, { color: '#8b5cf6' }]}>10 Years</Text>
                <Text style={[styles.retentionSub, { color: '#9ca3af' }]}>Permanent storage</Text>
              </View>
              <View style={styles.retentionCard}>
                <View style={styles.retentionHeader}>
                  <Zap size={20} color="#f59e0b" />
                  <Text style={[styles.retentionTitle, { color: '#f9fafb' }]}>Temp Data</Text>
                </View>
                <Text style={[styles.retentionPeriod, { color: '#f59e0b' }]}>30 Days</Text>
                <Text style={[styles.retentionSub, { color: '#9ca3af' }]}>Auto-delete after 7 days</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Access Control */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Access Control</Text>
          <View style={[styles.accessContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.accessSummary}>
              <View style={styles.accessMetric}>
                <Text style={[styles.accessValue, { color: '#10b981' }]}>842</Text>
                <Text style={[styles.accessLabel, { color: '#9ca3af' }]}>Active Users</Text>
              </View>
              <View style={styles.accessMetric}>
                <Text style={[styles.accessValue, { color: '#06b6d4' }]}>128</Text>
                <Text style={[styles.accessLabel, { color: '#9ca3af' }]}>Data Roles</Text>
              </View>
              <View style={styles.accessMetric}>
                <Text style={[styles.accessValue, { color: '#8b5cf6' }]}>24</Text>
                <Text style={[styles.accessLabel, { color: '#9ca3af' }]}>Access Requests</Text>
              </View>
            </View>
            <View style={styles.accessList}>
              <View style={styles.accessItem}>
                <View style={[styles.accessIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Eye size={16} color="#10b981" />
                </View>
                <Text style={[styles.accessName, { color: '#f9fafb' }]}>Read-Only Access</Text>
                <Text style={[styles.accessCount, { color: '#10b981' }]}>624 users</Text>
              </View>
              <View style={styles.accessItem}>
                <View style={[styles.accessIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <RefreshCw size={16} color="#06b6d4" />
                </View>
                <Text style={[styles.accessName, { color: '#f9fafb' }]}>Read-Write Access</Text>
                <Text style={[styles.accessCount, { color: '#06b6d4' }]}>142 users</Text>
              </View>
              <View style={styles.accessItem}>
                <View style={[styles.accessIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <Lock size={16} color="#f59e0b" />
                </View>
                <Text style={[styles.accessName, { color: '#f9fafb' }]}>Admin Access</Text>
                <Text style={[styles.accessCount, { color: '#f59e0b' }]}>76 users</Text>
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
  heatmapContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  heatmapGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  heatmapCell: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  heatmapCellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  heatmapCellTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  heatmapCellValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  heatmapCellSub: {
    fontSize: 11,
    fontWeight: '500',
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
  lineageContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  lineageScroll: {
    flexDirection: 'row',
  },
  lineageStage: {
    marginRight: 20,
  },
  lineageNode: {
    alignItems: 'center',
    width: 100,
  },
  nodeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  nodeName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  nodeConnector: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 40,
    height: 2,
  },
  datasetsGrid: {
    gap: 12,
  },
  datasetCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  datasetIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  datasetInfo: {
    flex: 1,
  },
  datasetName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  datasetType: {
    fontSize: 12,
    fontWeight: '500',
  },
  piiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  piiBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  datasetMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  datasetMetric: {
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
  datasetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  datasetUpdated: {
    fontSize: 12,
    fontWeight: '400',
  },
  flowsGrid: {
    gap: 12,
  },
  flowCard: {
    padding: 16,
    borderRadius: 12,
  },
  flowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  flowInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flowSource: {
    fontSize: 14,
    fontWeight: '600',
  },
  flowArrow: {
    fontSize: 16,
  },
  flowDestination: {
    fontSize: 14,
    fontWeight: '600',
  },
  flowStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  flowStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  flowMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  flowMetric: {
    flex: 1,
  },
  flowMetricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  flowMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  heatmapContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  heatmapGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  heatmapCell: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  heatmapLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  heatmapCount: {
    fontSize: 24,
    fontWeight: '800',
  },
  qualityContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qualityLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 100,
  },
  qualityBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  qualityFill: {
    height: '100%',
    borderRadius: 4,
  },
  qualityPercent: {
    fontSize: 14,
    fontWeight: '700',
    width: 40,
  },
  qualityMetricInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qualityTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineageGraphContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  lineageEdge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  lineageEdgeSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  lineageEdgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lineageEdgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  lineageEdgeArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lineageEdgeType: {
    fontSize: 11,
    fontWeight: '500',
  },
  lineageEdgeTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  lineageEdgeConfidence: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  lineageEdgeConfidenceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  lineageTreeContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  lineageTreeNode: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  lineageTreeNodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lineageTreeNodeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineageTreeNodeName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  lineageTreeNodeType: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  lineageTreeNodeTypeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  lineageTreeChildren: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 52,
  },
  lineageTreeChild: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  lineageTreeChildText: {
    fontSize: 12,
    fontWeight: '500',
  },
  retentionContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  retentionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  retentionCard: {
    width: '48%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  retentionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  retentionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  retentionPeriod: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  retentionSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  accessContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  accessSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  accessMetric: {
    alignItems: 'center',
  },
  accessValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  accessLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  accessList: {
    gap: 12,
  },
  accessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
  },
  accessIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accessName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
  },
  accessCount: {
    fontSize: 12,
    fontWeight: '600',
  },
});
