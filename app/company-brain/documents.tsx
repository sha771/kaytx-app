import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Upload, FileText, File, Trash2, Eye, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import apiClient from '@/lib/api-client';

export default function CompanyBrainDocuments() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDocuments = useCallback(async () => {
    try {
      const response = await apiClient.getDocuments({ organizationId: 'default' });
      if (response?.success && response?.data) {
        setDocuments(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadDocuments(); }, [loadDocuments]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDocuments();
  }, [loadDocuments]);

  const handleUpload = () => {
    Alert.alert(
      'Upload Document',
      'Select a file to upload to Company Brain',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Choose File', onPress: async () => {
          setIsUploading(true);
          try {
            await apiClient.uploadDocument({
              organizationId: 'default',
              fileName: 'Document',
              fileType: 'pdf',
            });
            Alert.alert('Success', 'Document uploaded successfully');
            loadDocuments();
          } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to upload document');
          } finally {
            setIsUploading(false);
          }
        }}
      ]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'processing':
        return <Clock size={16} color="#f59e0b" />;
      case 'error':
        return <AlertCircle size={16} color="#ef4444" />;
      default:
        return <Clock size={16} color="#64748b" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return '#10b981';
      case 'processing':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getFileIcon = (type: string) => {
    return FileText;
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }, styles.centered]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <Text style={styles.subtitle}>Upload and manage knowledge documents</Text>
      </View>

      {/* Upload Section */}
      <TouchableOpacity
        style={styles.uploadSection}
        onPress={handleUpload}
        disabled={isUploading}
        activeOpacity={0.7}
      >
        {isUploading ? (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.uploadingText}>Uploading document...</Text>
          </View>
        ) : (
          <>
            <View style={styles.uploadIcon}>
              <Upload size={32} color="#6366f1" />
            </View>
            <Text style={styles.uploadTitle}>Upload Document</Text>
            <Text style={styles.uploadSubtitle}>Drag & drop or click to browse</Text>
            <Text style={styles.uploadFormats}>PDF, DOCX, PPTX, TXT, MD, CSV</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{documents.length}</Text>
          <Text style={styles.statLabel}>Total Documents</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {documents.reduce((sum: number, doc: any) => sum + (doc.knowledgeNodes || doc.nodes || 0), 0)}
          </Text>
          <Text style={styles.statLabel}>Knowledge Nodes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {documents.filter((doc: any) => doc.status === 'processed').length}
          </Text>
          <Text style={styles.statLabel}>Processed</Text>
        </View>
      </View>

      {/* Documents List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Documents</Text>
        <View style={styles.documentsList}>
          {documents.map((doc: any) => {
            const Icon = getFileIcon(doc.type || doc.fileType);
            const statusColor = getStatusColor(doc.status);
            return (
              <TouchableOpacity
                key={doc.id}
                style={styles.documentItem}
                onPress={() => router.push(`/company-brain/document/${doc.id}` as any)}
                activeOpacity={0.7}
              >
                <View style={styles.documentIcon}>
                  <Icon size={24} color="#6366f1" />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{doc.name || doc.fileName}</Text>
                  <View style={styles.documentMeta}>
                    <Text style={styles.documentSize}>{doc.size || '-'}</Text>
                    <Text style={styles.documentSeparator}>•</Text>
                    <Text style={styles.documentAuthor}>{doc.author || doc.uploadedBy || '-'}</Text>
                    <Text style={styles.documentSeparator}>•</Text>
                    <Text style={styles.documentTime}>{doc.uploadedAt || '-'}</Text>
                  </View>
                  <View style={styles.documentStatus}>
                    {getStatusIcon(doc.status)}
                    <Text style={[styles.statusText, { color: statusColor }]}>
                      {doc.status ? doc.status.charAt(0).toUpperCase() + doc.status.slice(1) : 'Unknown'}
                    </Text>
                    {(doc.knowledgeNodes || doc.nodes) > 0 && (
                      <>
                        <Text style={styles.documentSeparator}>•</Text>
                        <Text style={styles.knowledgeNodes}>{doc.knowledgeNodes || doc.nodes} nodes</Text>
                      </>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color="#64748b" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Supported Formats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supported Formats</Text>
        <View style={styles.formatsGrid}>
          {['PDF', 'DOCX', 'PPTX', 'TXT', 'MD', 'CSV'].map((format) => (
            <View key={format} style={styles.formatItem}>
              <Text style={styles.formatText}>{format}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  uploadSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadingContainer: {
    alignItems: 'center',
  },
  uploadingText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  uploadFormats: {
    fontSize: 12,
    color: '#64748b',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#334155',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  documentsList: {
    gap: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  documentSize: {
    fontSize: 12,
    color: '#94a3b8',
  },
  documentSeparator: {
    fontSize: 12,
    color: '#64748b',
    marginHorizontal: 4,
  },
  documentAuthor: {
    fontSize: 12,
    color: '#94a3b8',
  },
  documentTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  knowledgeNodes: {
    fontSize: 12,
    color: '#6366f1',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  formatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  formatItem: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formatText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e8f0',
  },
});
