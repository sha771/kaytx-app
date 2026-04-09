import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Upload,
  X,
  Check,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Database,
  ChevronLeft,
  Filter,
  Search,
  Cloud,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  getAgentById,
  addTrainingDocument,
  getAgentDataUploadConfig,
} from '@/constants/aiAgentHierarchy';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress: number;
  error?: string;
  uploadedAt?: string;
  tags: string[];
}

const fileTypeIcons: Record<string, string> = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  txt: '📃',
  csv: '📊',
  json: '📋',
  xlsx: '📈',
  ppt: '📽️',
  pptx: '📽️',
  md: '📑',
  html: '🌐',
  xml: '📋',
};

const fileTypeColors: Record<string, string> = {
  pdf: '#FF5722',
  doc: '#2196F3',
  docx: '#2196F3',
  txt: '#757575',
  csv: '#4CAF50',
  json: '#FF9800',
  xlsx: '#4CAF50',
  ppt: '#E91E63',
  pptx: '#E91E63',
  md: '#00BCD4',
  html: '#FF5722',
  xml: '#FF9800',
};

export default function AgentDataUploadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<UploadStatus | 'all'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTag, setUploadTag] = useState('');

  const loadAgentAndDocuments = React.useCallback(() => {
    setLoading(true);
    const foundAgent = getAgentById(id);
    if (foundAgent) {
      setAgent(foundAgent);
      // Load existing documents from agent configuration
      const existingDocs = foundAgent.configuration?.dataUpload?.uploadedDocuments || [];
      setFiles(existingDocs.map(doc => ({
        id: doc.id,
        name: doc.name,
        size: doc.size,
        type: doc.type,
        status: (doc.processingStatus === 'pending' ? 'idle' : doc.processingStatus || 'completed') as UploadStatus,
        progress: doc.processed ? 100 : 0,
        uploadedAt: doc.uploadedAt,
        tags: doc.tags || [],
      })));
    }
    setLoading(false);
  }, [id]);

  // Load agent and existing documents
  React.useEffect(() => {
    loadAgentAndDocuments();
  }, [id, loadAgentAndDocuments]);

  const handleUpload = useCallback(async (selectedFiles: any[]) => {
    if (!agent) return;

    const dataConfig = getAgentDataUploadConfig(agent.id);
    if (!dataConfig?.enabled) {
      Alert.alert('Upload Disabled', 'Data upload is not enabled for this agent.');
      return;
    }

    // Check file size limit
    const maxSize = dataConfig.maxFileSize * 1024 * 1024; // Convert MB to bytes
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      Alert.alert(
        'File Too Large',
        `Some files exceed the ${dataConfig.maxFileSize}MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`
      );
      return;
    }

    // Check allowed formats
    const allowedFormats = dataConfig.allowedFormats;
    const invalidFiles = selectedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return !allowedFormats.includes(extension as any);
    });
    if (invalidFiles.length > 0) {
      Alert.alert(
        'Invalid File Format',
        `Allowed formats: ${allowedFormats.join(', ')}`
      );
      return;
    }

    // Start upload process
    for (const file of selectedFiles) {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const newFile: UploadFile = {
        id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: extension,
        status: 'uploading',
        progress: 0,
        tags: uploadTag ? [uploadTag] : [],
      };

      setFiles(prev => [newFile, ...prev]);

      // Simulate upload progress
      simulateUploadProgress(newFile.id);

      // Add to agent configuration
      const agentDoc = addTrainingDocument(agent.id, {
        name: file.name,
        type: extension,
        size: file.size,
        processed: false,
        tags: uploadTag ? [uploadTag] : [],
      });

      if (agentDoc) {
        // Update file with real ID
        setFiles(prev =>
          prev.map(f =>
            f.id === newFile.id
              ? { ...f, id: agentDoc.id, status: 'processing', uploadedAt: agentDoc.uploadedAt }
              : f
          )
        );

        // Simulate processing
        setTimeout(() => {
          setFiles(prev =>
            prev.map(f =>
              f.id === agentDoc.id
                ? { ...f, status: dataConfig.autoProcessing ? 'completed' : 'idle', progress: 100 }
                : f
            )
          );
        }, 2000);
      }
    }

    setShowUploadModal(false);
    setUploadTag('');
  }, [agent, uploadTag]);

  const simulateUploadProgress = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, progress: Math.min(progress, 90) } : f
        )
      );

      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleDelete = useCallback((fileId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFiles(prev => prev.filter(f => f.id !== fileId));
            setSelectedFiles(prev => {
              const newSet = new Set(prev);
              newSet.delete(fileId);
              return newSet;
            });
          },
        },
      ]
    );
  }, []);

  const handleBatchDelete = useCallback(() => {
    if (selectedFiles.size === 0) return;

    Alert.alert(
      'Delete Documents',
      `Are you sure you want to delete ${selectedFiles.size} documents?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFiles(prev => prev.filter(f => !selectedFiles.has(f.id)));
            setSelectedFiles(new Set());
          },
        },
      ]
    );
  }, [selectedFiles]);

  const toggleFileSelection = useCallback((fileId: string) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  }, []);

  const handleRetry = useCallback((fileId: string) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === fileId ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
      )
    );
    simulateUploadProgress(fileId);
    setTimeout(() => {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
        )
      );
    }, 2000);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#34C759" />;
      case 'failed':
        return <XCircle size={20} color="#FF3B30" />;
      case 'processing':
      case 'uploading':
        return <Loader2 size={20} color="#007AFF" />;
      default:
        return <Clock size={20} color="#8E8E93" />;
    }
  };

  const getStatusText = (status: UploadStatus): string => {
    switch (status) {
      case 'completed':
        return 'Processed';
      case 'failed':
        return 'Failed';
      case 'processing':
        return 'Processing';
      case 'uploading':
        return 'Uploading';
      default:
        return 'Pending';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: files.length,
    uploaded: files.filter(f => f.status === 'completed').length,
    processing: files.filter(f => f.status === 'processing' || f.status === 'uploading').length,
    failed: files.filter(f => f.status === 'failed').length,
    totalSize: files.reduce((acc, f) => acc + f.size, 0),
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>Loading documents...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!agent) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <AlertTriangle size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.text }]}>Agent not found</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const dataConfig = getAgentDataUploadConfig(agent.id);
  const isUploadEnabled = dataConfig?.enabled ?? false;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Database size={24} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Training Documents</Text>
          </View>
          <View style={styles.headerRight}>
            {selectedFiles.size > 0 ? (
              <TouchableOpacity
                onPress={handleBatchDelete}
                style={[styles.iconButton, { backgroundColor: colors.error + '15' }]}
              >
                <Trash2 size={20} color={colors.error} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                style={[styles.iconButton, { backgroundColor: colors.border + '30' }]}
              >
                <Filter size={20} color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <Animated.View entering={FadeInRight.delay(100)} style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}>
            <Cloud size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.primary }]}>{stats.total}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '80' }]}>Total</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(150)} style={[styles.statCard, { backgroundColor: '#34C75915' }]}>
            <CheckCircle size={20} color="#34C759" />
            <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.uploaded}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '80' }]}>Processed</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200)} style={[styles.statCard, { backgroundColor: '#007AFF15' }]}>
            <Loader2 size={20} color="#007AFF" />
            <Text style={[styles.statValue, { color: '#007AFF' }]}>{stats.processing}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '80' }]}>Processing</Text>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(250)} style={[styles.statCard, { backgroundColor: colors.text + '10' }]}>
            <Database size={20} color={colors.text} />
            <Text style={[styles.statValue, { color: colors.text }]}>{formatFileSize(stats.totalSize)}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '80' }]}>Storage Used</Text>
          </Animated.View>
        </ScrollView>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.border + '30' }]}>
          <Search size={18} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search documents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color={colors.text + '60'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* File List */}
      <FlatList
        data={filteredFiles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.fileList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Database size={64} color={colors.text + '20'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No Documents Yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text + '60' }]}>
              Upload documents to train your AI agent
            </Text>
            {!isUploadEnabled && (
              <Text style={[styles.emptyWarning, { color: colors.warning }]}>
                Data upload is disabled for this agent. Enable it in configuration.
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Animated.View entering={FadeInUp}>
            <TouchableOpacity
              style={[
                styles.fileCard,
                {
                  backgroundColor: colors.card,
                  borderColor: selectedFiles.has(item.id) ? colors.primary : colors.border,
                  borderWidth: selectedFiles.has(item.id) ? 2 : 1,
                },
              ]}
              onPress={() => toggleFileSelection(item.id)}
              onLongPress={() => toggleFileSelection(item.id)}
            >
              {/* File Icon */}
              <View
                style={[
                  styles.fileIconContainer,
                  { backgroundColor: (fileTypeColors[item.type] || colors.primary) + '20' },
                ]}
              >
                <Text style={styles.fileIcon}>{fileTypeIcons[item.type] || '📄'}</Text>
              </View>

              {/* File Info */}
              <View style={styles.fileInfo}>
                <Text style={[styles.fileName, { color: colors.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.fileMeta}>
                  <Text style={[styles.fileSize, { color: colors.text + '60' }]}>
                    {formatFileSize(item.size)}
                  </Text>
                  <Text style={[styles.fileDot, { color: colors.text + '40' }]}>•</Text>
                  <Text style={[styles.fileDate, { color: colors.text + '60' }]}>
                    {formatDate(item.uploadedAt)}
                  </Text>
                </View>
                {item.tags.length > 0 && (
                  <View style={styles.fileTags}>
                    {item.tags.map((tag, index) => (
                      <View key={index} style={[styles.tag, { backgroundColor: colors.primary + '15' }]}>
                        <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Status */}
              <View style={styles.fileStatus}>
                {item.status === 'uploading' || item.status === 'processing' ? (
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                      <View
                        style={[
                          styles.progressFill,
                          { backgroundColor: colors.primary, width: `${item.progress}%` },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressText, { color: colors.primary }]}>{item.progress}%</Text>
                  </View>
                ) : (
                  <>
                    {getStatusIcon(item.status)}
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            item.status === 'completed'
                              ? '#34C759'
                              : item.status === 'failed'
                              ? '#FF3B30'
                              : colors.primary,
                        },
                      ]}
                    >
                      {getStatusText(item.status)}
                    </Text>
                  </>
                )}
              </View>

              {/* Actions */}
              {selectedFiles.has(item.id) ? (
                <View style={[styles.checkbox, { backgroundColor: colors.primary }]}>
                  <Check size={16} color="#fff" />
                </View>
              ) : (
                <View style={styles.fileActions}>
                  {item.status === 'failed' && (
                    <TouchableOpacity
                      onPress={() => handleRetry(item.id)}
                      style={[styles.actionButton, { backgroundColor: colors.primary + '15' }]}
                    >
                      <RefreshCw size={16} color={colors.primary} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={[styles.actionButton, { backgroundColor: colors.error + '15' }]}
                  >
                    <Trash2 size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* Upload Button */}
      {isUploadEnabled && (
        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.uploadButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowUploadModal(true)}
          >
            <Upload size={20} color="#fff" />
            <Text style={styles.uploadButtonText}>Upload Documents</Text>
          </TouchableOpacity>
          <Text style={[styles.uploadHint, { color: colors.text + '60' }]}>
            Max {dataConfig?.maxFileSize}MB per file • {dataConfig?.maxTotalStorage}GB total
          </Text>
        </View>
      )}

      {/* Upload Modal */}
      <Modal visible={showUploadModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} style={styles.modalContent}>
            <View style={[styles.modalHeader, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Upload Documents</Text>
              <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Tag Input */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Tags (optional)</Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: colors.border + '30', color: colors.text, borderColor: colors.border }]}
                  value={uploadTag}
                  onChangeText={setUploadTag}
                  placeholder="Add a tag for these documents"
                  placeholderTextColor={colors.text + '40'}
                />
              </View>

              {/* File Types Info */}
              <View style={styles.infoBox}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>Supported Formats</Text>
                <Text style={[styles.infoText, { color: colors.text + '60' }]}>
                  {dataConfig?.allowedFormats.map(ext => `.${ext}`).join(', ')}
                </Text>
              </View>

              {/* Upload Area */}
              <TouchableOpacity
                style={[styles.uploadArea, { borderColor: colors.primary, backgroundColor: colors.primary + '05' }]}
                onPress={() => {
                  // Simulate file selection
                  const mockFiles = [
                    { name: 'training-data.pdf', size: 1024 * 1024 * 2.5, type: 'application/pdf' },
                    { name: 'knowledge-base.docx', size: 1024 * 512, type: 'application/docx' },
                  ];
                  handleUpload(mockFiles);
                }}
              >
                <Upload size={48} color={colors.primary} />
                <Text style={[styles.uploadAreaTitle, { color: colors.text }]}>
                  Tap to Select Files
                </Text>
                <Text style={[styles.uploadAreaSubtitle, { color: colors.text + '60' }]}>
                  or drag and drop files here
                </Text>
              </TouchableOpacity>

              <Text style={[styles.supportedFormats, { color: colors.text + '40' }]}>
                Maximum file size: {dataConfig?.maxFileSize}MB
              </Text>
            </ScrollView>
          </BlurView>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <BlurView intensity={50} style={styles.filterModalContent}>
            <View style={[styles.modalHeader, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Filter Documents</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  statusFilter === 'all' && { backgroundColor: colors.primary + '15' },
                ]}
                onPress={() => setStatusFilter('all')}
              >
                <Text style={[styles.filterOptionText, { color: colors.text }]}>All Documents</Text>
                {statusFilter === 'all' && <Check size={20} color={colors.primary} />}
              </TouchableOpacity>

              {(['completed', 'processing', 'uploading', 'failed'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterOption,
                    statusFilter === status && { backgroundColor: colors.primary + '15' },
                  ]}
                  onPress={() => setStatusFilter(status)}
                >
                  <View style={styles.filterOptionContent}>
                    {getStatusIcon(status)}
                    <Text style={[styles.filterOptionText, { color: colors.text }]}>
                      {getStatusText(status)}
                    </Text>
                  </View>
                  {statusFilter === status && <Check size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          </BlurView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  statsScroll: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  fileList: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyWarning: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  fileIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 24,
  },
  fileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
  },
  fileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  fileSize: {
    fontSize: 13,
  },
  fileDot: {
    marginHorizontal: 6,
    fontSize: 13,
  },
  fileDate: {
    fontSize: 13,
  },
  fileTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  fileStatus: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  progressContainer: {
    alignItems: 'center',
    width: 60,
  },
  progressBar: {
    width: 50,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadHint: {
    fontSize: 12,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  filterModalContent: {
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalBody: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 15,
  },
  infoBox: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
  },
  uploadArea: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  uploadAreaTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 16,
  },
  uploadAreaSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  supportedFormats: {
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  filterOptions: {
    padding: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 8,
    marginBottom: 4,
  },
  filterOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterOptionText: {
    fontSize: 16,
  },
});
