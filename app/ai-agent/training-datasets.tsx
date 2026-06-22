import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ProgressBarAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Upload,
  FileText,
  Database,
  Trash2,
  CircleCheck,
  CircleAlert,
  Clock,
  File,
  Folder,
  X,
  EllipsisVertical,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  Brain,
  Zap,
  Save,
  Download,
  ListFilter,
  Search,
  Plus,
  Link,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Dataset Types
interface Dataset {
  id: string;
  name: string;
  type: 'conversations' | 'documents' | 'knowledge' | 'qa';
  format: 'json' | 'csv' | 'pdf' | 'txt';
  size: string;
  records: number;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  uploadedAt: string;
  agentId?: string;
  description?: string;
}

interface TrainingJob {
  id: string;
  name: string;
  status: 'queued' | 'training' | 'completed' | 'failed';
  progress: number;
  datasetCount: number;
  startedAt: string;
  estimatedCompletion?: string;
  model: string;
  accuracy?: number;
  loss?: number;
}

// Mock Data
const DATASETS: Dataset[] = [
  {
    id: '1',
    name: 'Customer Support Conversations',
    type: 'conversations',
    format: 'json',
    size: '45.2 MB',
    records: 12450,
    status: 'ready',
    progress: 100,
    uploadedAt: '2026-02-28',
    agentId: 'support-ai',
    description: 'Historical customer support chat logs',
  },
  {
    id: '2',
    name: 'Product Documentation',
    type: 'documents',
    format: 'pdf',
    size: '128.5 MB',
    records: 342,
    status: 'processing',
    progress: 78,
    uploadedAt: '2026-03-01',
    agentId: 'knowledge-ai',
    description: 'Product manuals and technical docs',
  },
  {
    id: '3',
    name: 'Sales Q&A Pairs',
    type: 'qa',
    format: 'csv',
    size: '12.8 MB',
    records: 5670,
    status: 'ready',
    progress: 100,
    uploadedAt: '2026-02-25',
    agentId: 'sales-ai',
    description: 'Common sales questions and answers',
  },
  {
    id: '4',
    name: 'Company Knowledge Base',
    type: 'knowledge',
    format: 'txt',
    size: '8.4 MB',
    records: 1200,
    status: 'uploading',
    progress: 45,
    uploadedAt: '2026-03-01',
    description: 'Internal wiki and policies',
  },
];

const TRAINING_JOBS: TrainingJob[] = [
  {
    id: '1',
    name: 'Support Agent Fine-tuning',
    status: 'training',
    progress: 67,
    datasetCount: 3,
    startedAt: '2026-03-01 08:00',
    estimatedCompletion: '2 hours remaining',
    model: 'GPT-4',
    accuracy: 94.2,
    loss: 0.08,
  },
  {
    id: '2',
    name: 'Sales Knowledge Training',
    status: 'completed',
    progress: 100,
    datasetCount: 2,
    startedAt: '2026-02-28 14:30',
    model: 'GPT-3.5',
    accuracy: 91.5,
    loss: 0.12,
  },
  {
    id: '3',
    name: 'Product Expert Training',
    status: 'queued',
    progress: 0,
    datasetCount: 4,
    startedAt: 'Pending',
    model: 'Claude-3',
  },
];

const TYPE_COLORS = {
  conversations: '#3B82F6',
  documents: '#F59E0B',
  knowledge: '#10B981',
  qa: '#8B5CF6',


};
const TYPE_ICONS = {
  conversations: FileText,
  documents: Folder,
  knowledge: Database,
  qa: File,
};

export default function TrainingDatasetScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [datasets, setDatasets] = useState<Dataset[]>(DATASETS);
  const [jobs, setJobs] = useState<TrainingJob[]>(TRAINING_JOBS);
  const [activeTab, setActiveTab] = useState<'datasets' | 'training'>('datasets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const filteredDatasets = datasets.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
      case 'completed':
        return <CircleCheck size={16} color="#10B981" />;
      case 'uploading':
      case 'processing':
      case 'training':
        return <Clock size={16} color="#F59E0B" />;
      case 'error':
      case 'failed':
        return <CircleAlert size={16} color="#EF4444" />;
      case 'queued':
        return <Zap size={16} color="#6B7280" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
      case 'completed':
        return '#10B981';
      case 'uploading':
      case 'processing':
      case 'training':
        return '#F59E0B';
      case 'error':
      case 'failed':
        return '#EF4444';
      case 'queued':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const deleteDataset = (id: string) => {
    Alert.alert(
      'Delete Dataset',
      'Are you sure you want to delete this dataset? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setDatasets(prev => prev.filter(d => d.id !== id));
        }},
      ]
    );
  };

  const renderDatasetCard = (dataset: Dataset, index: number) => {
    const TypeIcon = TYPE_ICONS[dataset.type];
    const typeColor = TYPE_COLORS[dataset.type];

    return (
      <Animated.View
        key={dataset.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.datasetCard, { backgroundColor: colors.card }]}
      >
        <View style={styles.datasetHeader}>
          <View style={[styles.typeIcon, { backgroundColor: typeColor + '15' }]}>
            <TypeIcon size={20} color={typeColor} />
          </View>
          <View style={styles.datasetInfo}>
            <Text style={[styles.datasetName, { color: colors.text }]}>
              {dataset.name}
            </Text>
            <Text style={[styles.datasetMeta, { color: colors.icon }]}>
              {dataset.records.toLocaleString()} records • {dataset.size}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteDataset(dataset.id)}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {dataset.description && (
          <Text style={[styles.datasetDescription, { color: colors.icon }]}>
            {dataset.description}
          </Text>
        )}

        <View style={styles.datasetFooter}>
          <View style={styles.statusRow}>
            {getStatusIcon(dataset.status)}
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(dataset.status) },
              ]}
            >
              {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
            </Text>
          </View>
          <Text style={[styles.uploadDate, { color: colors.icon }]}>
            {dataset.uploadedAt}
          </Text>
        </View>

        {(dataset.status === 'uploading' || dataset.status === 'processing') && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${dataset.progress}%`, backgroundColor: colors.tint },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.tint }]}>
              {dataset.progress}%
            </Text>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderTrainingJobCard = (job: TrainingJob, index: number) => (
    <Animated.View
      key={job.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.jobCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.jobHeader}>
        <View style={[styles.jobIcon, { backgroundColor: colors.tint + '15' }]}>
          <Brain size={20} color={colors.tint} />
        </View>
        <View style={styles.jobInfo}>
          <Text style={[styles.jobName, { color: colors.text }]}>{job.name}</Text>
          <Text style={[styles.jobModel, { color: colors.icon }]}>{job.model}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) + '15' }]}>
          {getStatusIcon(job.status)}
          <Text style={[styles.statusBadgeText, { color: getStatusColor(job.status) }]}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Text>
        </View>
      </View>

      {job.status === 'training' && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${job.progress}%`, backgroundColor: colors.tint },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.tint }]}>
            {job.progress}%
          </Text>
        </View>
      )}

      <View style={styles.jobStats}>
        <View style={styles.jobStat}>
          <Database size={14} color={colors.icon} />
          <Text style={[styles.jobStatText, { color: colors.icon }]}>
            {job.datasetCount} datasets
          </Text>
        </View>
        <View style={styles.jobStat}>
          <Clock size={14} color={colors.icon} />
          <Text style={[styles.jobStatText, { color: colors.icon }]}>
            {job.startedAt}
          </Text>
        </View>
        {job.accuracy && (
          <View style={styles.jobStat}>
            <Sparkles size={14} color="#10B981" />
            <Text style={[styles.jobStatText, { color: '#10B981' }]}>
              {job.accuracy}% accuracy
            </Text>
          </View>
        )}
      </View>

      {job.estimatedCompletion && (
        <Text style={[styles.etaText, { color: colors.icon }]}>
          {job.estimatedCompletion}
        </Text>
      )}

      {job.status === 'training' && (
        <View style={styles.jobActions}>
          <TouchableOpacity style={styles.jobActionButton}>
            <Pause size={16} color={colors.tint} />
            <Text style={[styles.jobActionText, { color: colors.tint }]}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobActionButton}>
            <CircleAlert size={16} color="#EF4444" />
            <Text style={[styles.jobActionText, { color: '#EF4444' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Training Data
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Datasets & Training Jobs
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.tint }]}>
          <Upload size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {datasets.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Datasets</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {jobs.filter(j => j.status === 'training').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Training</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {datasets.reduce((sum, d) => sum + d.records, 0).toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Records</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'datasets' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('datasets')}
        >
          <Database size={18} color={activeTab === 'datasets' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'datasets' ? 'white' : colors.text }]}>
            Datasets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'training' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('training')}
        >
          <Brain size={18} color={activeTab === 'training' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'training' ? 'white' : colors.text }]}>
            Training Jobs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'datasets' ? (
          <>
            {/* Search */}
            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
              <Search size={18} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search datasets..."
                placeholderTextColor={colors.icon}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <ListFilter size={18} color={colors.icon} />
              </TouchableOpacity>
            </View>

            {/* Upload Card */}
            <TouchableOpacity style={[styles.uploadCard, { backgroundColor: colors.tint + '10', borderColor: colors.tint }]}>
              <View style={[styles.uploadCardIcon, { backgroundColor: colors.tint + '15' }]}>
                <Upload size={24} color={colors.tint} />
              </View>
              <View>
                <Text style={[styles.uploadCardTitle, { color: colors.text }]}>
                  Upload New Dataset
                </Text>
                <Text style={[styles.uploadCardSubtitle, { color: colors.icon }]}>
                  Support JSON, CSV, PDF, TXT files
                </Text>
              </View>
              <Plus size={20} color={colors.tint} />
            </TouchableOpacity>

            {/* Datasets List */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Your Datasets
              </Text>
              <Text style={[styles.sectionCount, { color: colors.icon }]}>
                {filteredDatasets.length} items
              </Text>
            </View>

            {filteredDatasets.map((dataset, index) => renderDatasetCard(dataset, index))}

            {filteredDatasets.length === 0 && (
              <View style={styles.emptyState}>
                <Database size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>
                  No datasets found
                </Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Upload your first dataset to get started
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* New Training Job Button */}
            <TouchableOpacity style={[styles.newJobButton, { backgroundColor: colors.tint }]}>
              <Play size={18} color="white" />
              <Text style={styles.newJobButtonText}>Start New Training Job</Text>
            </TouchableOpacity>

            {/* Training Jobs List */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Training Jobs
              </Text>
              <Text style={[styles.sectionCount, { color: colors.icon }]}>
                {jobs.length} jobs
              </Text>
            </View>

            {jobs.map((job, index) => renderTrainingJobCard(job, index))}
          </>
        )}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 20,
    gap: 16,
  },
  uploadCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  uploadCardSubtitle: {
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
  },
  datasetCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
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
    marginBottom: 2,
  },
  datasetMeta: {
    fontSize: 13,
  },
  datasetDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  datasetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  uploadDate: {
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  newJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  newJobButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  jobCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  jobModel: {
    fontSize: 13,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  jobStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  jobStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jobStatText: {
    fontSize: 12,
  },
  etaText: {
    fontSize: 12,
    marginTop: 4,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  jobActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
