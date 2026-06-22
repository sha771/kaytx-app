 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Brain,
  Upload,
  Play,
  CircleCheck,
  Database,
  EllipsisVertical,
  Download,
  Trash2,
  Target,
  Zap,
  Award,
  X,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ChartLine } from 'react-native-chart-kit';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Training Types
interface TrainingJob {
  id: string;
  agentId: string;
  agentName: string;
  status: 'pending' | 'training' | 'completed' | 'failed' | 'paused';
  datasetId: string;
  datasetName: string;
  model: string;
  progress: number;
  accuracy: number;
  loss: number;
  epochs: number;
  currentEpoch: number;
  startTime?: string;
  endTime?: string;
  estimatedTimeRemaining?: number;
  metrics: {
    precision: number;
    recall: number;
    f1Score: number;

}

interface TrainingDataset {
  id: string;
  name: string;
  description: string;
  size: number;
  format: string;
  samples: number;
  uploadedAt: string;
  tags: string[];
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

};
// Mock Data
const MOCK_TRAINING_JOBS: TrainingJob[] = [
  {
    id: '1',
    agentId: 'agent-1',
    agentName: 'AI Sales Rep',
    status: 'training',
    datasetId: 'dataset-1',
    datasetName: 'Sales Conversations v2',
    model: 'gpt-4-fine-tuned',
    progress: 65,
    accuracy: 0.87,
    loss: 0.23,
    epochs: 10,
    currentEpoch: 6,
    startTime: '2026-03-01T08:00:00Z',
    estimatedTimeRemaining: 3600,
    metrics: {
      precision: 0.89,
      recall: 0.85,
      f1Score: 0.87,
    },
  },
  {
    id: '2',
    agentId: 'agent-2',
    agentName: 'Customer Support User',
    status: 'completed',
    datasetId: 'dataset-2',
    datasetName: 'Support Tickets Dataset',
    model: 'gpt-4-fine-tuned',
    progress: 100,
    accuracy: 0.92,
    loss: 0.15,
    epochs: 12,
    currentEpoch: 12,
    startTime: '2026-02-28T10:00:00Z',
    endTime: '2026-02-28T16:30:00Z',
    metrics: {
      precision: 0.94,
      recall: 0.90,
      f1Score: 0.92,
    },
  },
  {
    id: '3',
    agentId: 'agent-3',
    agentName: 'AI Bookkeeper',
    status: 'pending',
    datasetId: 'dataset-3',
    datasetName: 'Financial Records',
    model: 'gpt-4-fine-tuned',
    progress: 0,
    accuracy: 0,
    loss: 0,
    epochs: 8,
    currentEpoch: 0,
    metrics: {
      precision: 0,
      recall: 0,
      f1Score: 0,
    },
  },
];

const MOCK_DATASETS: TrainingDataset[] = [
  {
    id: 'dataset-1',
    name: 'Sales Conversations v2',
    description: 'High-quality sales conversation data for training',
    size: 45.2,
    format: 'JSONL',
    samples: 12500,
    uploadedAt: '2026-02-15T10:30:00Z',
    tags: ['sales', 'conversations', 'high-quality'],
    quality: 'excellent',
  },
  {
    id: 'dataset-2',
    name: 'Support Tickets Dataset',
    description: 'Customer support ticket resolutions',
    size: 28.5,
    format: 'CSV',
    samples: 8500,
    uploadedAt: '2026-02-20T14:15:00Z',
    tags: ['support', 'tickets', 'resolutions'],
    quality: 'good',
  },
  {
    id: 'dataset-3',
    name: 'Financial Records',
    description: 'Bookkeeping and accounting transaction data',
    size: 15.8,
    format: 'JSONL',
    samples: 3200,
    uploadedAt: '2026-02-25T09:00:00Z',
    tags: ['finance', 'accounting', 'transactions'],
    quality: 'good',
  },
];

const CHART_CONFIG = {
  backgroundColor: 'transparent',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3B82F6',
  },
};

export default function TrainingDashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'datasets' | 'models'>('overview');
  const [trainingJobs] = useState(MOCK_TRAINING_JOBS);
  const [datasets] = useState(MOCK_DATASETS);
  const [, _setSelectedJob] = useState<TrainingJob | null>(null);
  const [, _setShowUploadModal] = useState(false);
  const [, _setShowStartTrainingModal] = useState(false);

  // Calculate stats
  const stats = {
    totalJobs: trainingJobs.length,
    activeJobs: trainingJobs.filter(j => j.status === 'training').length,
    completedJobs: trainingJobs.filter(j => j.status === 'completed').length,
    averageAccuracy: trainingJobs.filter(j => j.status === 'completed').reduce((acc, j) => acc + j.accuracy, 0) /
      (trainingJobs.filter(j => j.status === 'completed').length || 1),
    totalDatasets: datasets.length,
    totalSamples: datasets.reduce((acc, d) => acc + d.samples, 0),
  };

  const renderOverviewTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Brain size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.totalJobs}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Training Jobs</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Play size={24} color="#10B981" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.activeJobs}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <CircleCheck size={24} color="#8B5CF6" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.completedJobs}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Target size={24} color="#F59E0B" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {(stats.averageAccuracy * 100).toFixed(1)}%
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Avg Accuracy</Text>
        </View>
      </View>

      {/* Performance Chart */}
      <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Training Performance</Text>
        <ChartLine
          data={{
            labels: ['Epoch 1', 'Epoch 3', 'Epoch 5', 'Epoch 7', 'Epoch 9'],
            datasets: [
              {
                data: [0.45, 0.62, 0.75, 0.84, 0.92],
                color: () => '#3B82F6',
              },
              {
                data: [0.85, 0.65, 0.45, 0.30, 0.18],
                color: () => '#EF4444',
              },
            ],
          }}
          width={SCREEN_WIDTH - 64}
          height={200}
          chartConfig={{
            ...CHART_CONFIG,
            color: (opacity = 1) => colors.tint,
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.legendText, { color: colors.icon }]}>Accuracy</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.legendText, { color: colors.icon }]}>Loss</Text>
          </View>
        </View>
      </View>

      {/* Recent Training Jobs */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Jobs</Text>
          <TouchableOpacity onPress={() => setActiveTab('jobs')}>
            <Text style={[styles.seeAllText, { color: colors.tint }]}>See All</Text>
          </TouchableOpacity>
        </View>
        {trainingJobs.slice(0, 3).map((job, index) => (
          <Animated.View
            key={job.id}
            entering={FadeIn.delay(index * 100)}
            style={[styles.jobCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.jobHeader}>
              <View style={styles.jobInfo}>
                <Text style={[styles.jobAgent, { color: colors.text }]}>{job.agentName}</Text>
                <Text style={[styles.jobDataset, { color: colors.icon }]}>{job.datasetName}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Text>
              </View>
            </View>
            {job.status === 'training' && (
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${job.progress}%`, backgroundColor: colors.tint },
                    ]}
                  />
                </View>
                <View style={styles.progressStats}>
                  <Text style={[styles.progressText, { color: colors.text }]}>
                    {job.progress}% • Epoch {job.currentEpoch}/{job.epochs}
                  </Text>
                  <Text style={[styles.progressText, { color: colors.icon }]}>
                    {formatTime(job.estimatedTimeRemaining || 0)} remaining
                  </Text>
                </View>
              </View>
            )}
            {job.status === 'completed' && (
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Target size={16} color={colors.tint} />
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {(job.accuracy * 100).toFixed(1)}%
                  </Text>
                  <Text style={[styles.metricLabel, { color: colors.icon }]}>Accuracy</Text>
                </View>
                <View style={styles.metric}>
                  <Zap size={16} color={colors.tint} />
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {(job.metrics.f1Score * 100).toFixed(1)}%
                  </Text>
                  <Text style={[styles.metricLabel, { color: colors.icon }]}>F1 Score</Text>
                </View>
                <View style={styles.metric}>
                  <Award size={16} color={colors.tint} />
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {(job.loss * 100).toFixed(1)}%
                  </Text>
                  <Text style={[styles.metricLabel, { color: colors.icon }]}>Loss</Text>
                </View>
              </View>
            )}
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );

  const renderJobsTab = () => (
    <FlatList
      data={trainingJobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item: job }) => (
        <TouchableOpacity
          style={[styles.jobCard, { backgroundColor: colors.card }]}
          onPress={() => setSelectedJob(job)}
        >
          <View style={styles.jobHeader}>
            <View style={styles.jobInfo}>
              <Text style={[styles.jobAgent, { color: colors.text }]}>{job.agentName}</Text>
              <Text style={[styles.jobDataset, { color: colors.icon }]}>{job.datasetName}</Text>
            </View>
            <TouchableOpacity>
              <EllipsisVertical size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.jobDetails}>
            <View style={styles.jobDetail}>
              <Text style={[styles.jobDetailLabel, { color: colors.icon }]}>Model</Text>
              <Text style={[styles.jobDetailValue, { color: colors.text }]}>{job.model}</Text>
            </View>
            <View style={styles.jobDetail}>
              <Text style={[styles.jobDetailLabel, { color: colors.icon }]}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.jobDetail}>
              <Text style={[styles.jobDetailLabel, { color: colors.icon }]}>Started</Text>
              <Text style={[styles.jobDetailValue, { color: colors.text }]}>
                {job.startTime ? new Date(job.startTime).toLocaleDateString() : '-'}
              </Text>
            </View>
          </View>
          {job.status === 'training' && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${job.progress}%`, backgroundColor: colors.tint },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.text }]}>
                {job.progress}% complete • {formatTime(job.estimatedTimeRemaining || 0)} remaining
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContent}
    />
  );

  const renderDatasetsTab = () => (
    <FlatList
      data={datasets}
      keyExtractor={(item) => item.id}
      renderItem={({ item: dataset }) => (
        <View style={[styles.datasetCard, { backgroundColor: colors.card }]}>
          <View style={styles.datasetHeader}>
            <View style={[styles.datasetIcon, { backgroundColor: colors.tint + '20' }]}>
              <Database size={24} color={colors.tint} />
            </View>
            <View style={styles.datasetInfo}>
              <Text style={[styles.datasetName, { color: colors.text }]}>{dataset.name}</Text>
              <Text style={[styles.datasetMeta, { color: colors.icon }]}>
                {dataset.format} • {dataset.size} MB • {dataset.samples.toLocaleString()} samples
              </Text>
            </View>
            <View style={[styles.qualityBadge, { backgroundColor: getQualityColor(dataset.quality) + '20' }]}>
              <Text style={[styles.qualityText, { color: getQualityColor(dataset.quality) }]}>
                {dataset.quality.charAt(0).toUpperCase() + dataset.quality.slice(1)}
              </Text>
            </View>
          </View>
          <Text style={[styles.datasetDescription, { color: colors.icon }]}>
            {dataset.description}
          </Text>
          <View style={styles.datasetTags}>
            {dataset.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.background }]}>
                <Text style={[styles.tagText, { color: colors.icon }]}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.datasetFooter}>
            <Text style={[styles.datasetDate, { color: colors.icon }]}>
              Uploaded {new Date(dataset.uploadedAt).toLocaleDateString()}
            </Text>
            <View style={styles.datasetActions}>
              <TouchableOpacity style={styles.datasetAction}>
                <Download size={18} color={colors.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.datasetAction}>
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'failed': return '#EF4444';
      case 'paused': return '#F59E0B';
      case 'pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return '#10B981';
      case 'good': return '#3B82F6';
      case 'fair': return '#F59E0B';
      case 'poor': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Training Dashboard</Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            Manage agent training & datasets
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.tint }]}
          onPress={() => setShowStartTrainingModal(true)}
        >
          <Play size={20} color="white" />
          <Text style={styles.actionButtonText}>Start Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={() => setShowUploadModal(true)}
        >
          <Upload size={20} color={colors.text} />
          <Text style={[styles.actionButtonTextSecondary, { color: colors.text }]}>Upload Data</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        {(['overview', 'jobs', 'datasets', 'models'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { borderBottomColor: colors.tint }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? colors.tint : colors.icon },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'jobs' && renderJobsTab()}
        {activeTab === 'datasets' && renderDatasetsTab()}
      </View>

      <Modal
        visible={!!selectedJob}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedJob(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Training Job</Text>
              <TouchableOpacity onPress={() => setSelectedJob(null)}>
                <X size={22} color={colors.icon} />
              </TouchableOpacity>
            </View>
            {selectedJob && (
              <ScrollView style={styles.modalBody}>
                <Text style={[styles.modalText, { color: colors.text }]}>{selectedJob.agentName}</Text>
                <Text style={[styles.modalSubtext, { color: colors.icon }]}>{selectedJob.datasetName}</Text>
                <Text style={[styles.modalSubtext, { color: colors.icon }]}>Status: {selectedJob.status}</Text>
                <Text style={[styles.modalSubtext, { color: colors.icon }]}>Progress: {selectedJob.progress}%</Text>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showUploadModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Upload Dataset</Text>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <X size={22} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.modalSubtext, { color: colors.icon }]}>Upload flow coming soon.</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showStartTrainingModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowStartTrainingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Start Training</Text>
              <TouchableOpacity onPress={() => setShowStartTrainingModal(false)}>
                <X size={22} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.modalSubtext, { color: colors.icon }]}>Training start flow coming soon.</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: (SCREEN_WIDTH - 56) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
  },
  chartCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  jobCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobAgent: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  jobDataset: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  jobDetail: {
    flex: 1,
  },
  jobDetailLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  jobDetailValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 11,
  },
  listContent: {
    padding: 16,
  },
  datasetCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  datasetIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  datasetInfo: {
    flex: 1,
  },
  datasetName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  datasetMeta: {
    fontSize: 13,
  },
  qualityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  qualityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  datasetDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  datasetTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
  },
  datasetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datasetDate: {
    fontSize: 12,
  },
  datasetActions: {
    flexDirection: 'row',
    gap: 12,
  },
  datasetAction: {
    padding: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalBody: {
    paddingTop: 8,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  modalSubtext: {
    fontSize: 13,
    marginBottom: 4,
  },
});
