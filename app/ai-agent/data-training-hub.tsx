import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Database,
  Upload,
  FileText,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Brain,
  Zap,
  Tag,
  Folder,
  MoreVertical,
  Plus,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  AgentDocument,
  getAgentDataUploadConfig,
  addTrainingDocument,
} from '@/constants/aiAgentHierarchy';

export default function DataTrainingHubScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  // Aggregate all documents from all agents
  const allDocuments: (AgentDocument & { agentName: string; agentId: string })[] = [];
  allAgents.forEach(agent => {
    const docs = agent.configuration?.dataUpload?.uploadedDocuments || [];
    docs.forEach(doc => {
      allDocuments.push({ ...doc, agentName: agent.name, agentId: agent.id });
    });
  });

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesAgent = !selectedAgent || doc.agentId === selectedAgent;
    const matchesStatus = filterStatus === 'all' || doc.processingStatus === filterStatus;
    return matchesSearch && matchesAgent && matchesStatus;
  });

  const stats = {
    total: allDocuments.length,
    processed: allDocuments.filter(d => d.processingStatus === 'completed').length,
    pending: allDocuments.filter(d => d.processingStatus === 'pending').length,
    failed: allDocuments.filter(d => d.processingStatus === 'failed').length,
    totalSize: allDocuments.reduce((sum, d) => sum + (d.size || 0), 0),
  };

  const agentsWithData = allAgents.filter(a => 
    (a.configuration?.dataUpload?.uploadedDocuments?.length || 0) > 0
  );

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleUploadPress = () => {
    router.push('/ai-agent/agent-data-upload');
  };

  const handleAgentDataPress = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const handleDeleteDocument = (docId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this training document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Would delete here in real implementation
          console.log('Delete document:', docId);
        }}
      ]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} color="#10B981" />;
      case 'pending': return <Clock size={16} color="#F59E0B" />;
      case 'failed': return <AlertCircle size={16} color="#EF4444" />;
      default: return <FileText size={16} color={colors.text + '60'} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Database size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Data & Training Hub</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPress}>
            <Upload size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <View style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}>
            <FileText size={18} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.primary }]}>{stats.total}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Documents</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#10B981' + '15' }]}>
            <CheckCircle size={18} color="#10B981" />
            <Text style={[styles.statValue, { color: '#10B981' }]}>{stats.processed}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Processed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B' + '15' }]}>
            <Clock size={18} color="#F59E0B" />
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{stats.pending}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <Brain size={18} color="#8B5CF6" />
            <Text style={[styles.statValue, { color: '#8B5CF6' }]}>{agentsWithData.length}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Agents with Data</Text>
          </View>
        </ScrollView>

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: colors.border + '30' }]}>
          <Search size={18} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search documents, agents, tags..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedAgent && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedAgent('')}
          >
            <Text style={[styles.filterText, { color: !selectedAgent ? '#fff' : colors.text }]}>
              All Agents
            </Text>
          </TouchableOpacity>
          {agentsWithData.map(agent => (
            <TouchableOpacity
              key={agent.id}
              style={[styles.filterChip, selectedAgent === agent.id && { backgroundColor: agent.color }]}
              onPress={() => setSelectedAgent(selectedAgent === agent.id ? '' : agent.id)}
            >
              <Text style={[styles.filterText, { color: selectedAgent === agent.id ? '#fff' : colors.text }]}>
                {agent.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Filter */}
        <View style={styles.statusFilterRow}>
          {(['all', 'completed', 'pending', 'failed'] as const).map(status => (
            <TouchableOpacity
              key={status}
              style={[styles.statusChip, filterStatus === status && { 
                backgroundColor: status === 'completed' ? '#10B981' : status === 'pending' ? '#F59E0B' : status === 'failed' ? '#EF4444' : colors.primary 
              }]}
              onPress={() => setFilterStatus(status)}
            >
              <Text style={[styles.statusText, { color: filterStatus === status ? '#fff' : colors.text }]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Upload Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.primary + '15' }]} onPress={handleUploadPress}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary }]}>
              <Upload size={20} color="#fff" />
            </View>
            <Text style={[styles.quickActionText, { color: colors.text }]}>Upload Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: '#10B981' + '15' }]} onPress={() => router.push('/ai-agent/bulk-config')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#10B981' }]}>
              <Zap size={20} color="#fff" />
            </View>
            <Text style={[styles.quickActionText, { color: colors.text }]}>Bulk Training</Text>
          </TouchableOpacity>
        </View>

        {/* Documents List */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Training Documents</Text>
          <Text style={[styles.sectionCount, { color: colors.text + '40' }]}>{filteredDocuments.length}</Text>
        </View>

        {filteredDocuments.length === 0 ? (
          <View style={styles.emptyState}>
            <Database size={48} color={colors.text + '20'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No documents found</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text + '60' }]}>
              Upload documents to train your AI agents
            </Text>
          </View>
        ) : (
          filteredDocuments.map((doc, index) => (
            <Animated.View entering={FadeInUp.delay(index * 30)} key={doc.id}>
              <View style={[styles.docCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.docHeader}>
                  <View style={styles.docIconRow}>
                    {getStatusIcon(doc.processingStatus)}
                    <Text style={[styles.docName, { color: colors.text }]} numberOfLines={1}>
                      {doc.name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteDocument(doc.id)}>
                    <Trash2 size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.docMeta}>
                  <Text style={[styles.docAgent, { color: colors.primary }]}>{doc.agentName}</Text>
                  <Text style={[styles.docSize, { color: colors.text + '60' }]}>{formatSize(doc.size || 0)}</Text>
                </View>

                {doc.tags && doc.tags.length > 0 && (
                  <View style={styles.tagsRow}>
                    {doc.tags.map((tag, idx) => (
                      <View key={idx} style={[styles.tagChip, { backgroundColor: colors.border + '30' }]}>
                        <Tag size={10} color={colors.text + '60'} />
                        <Text style={[styles.tagText, { color: colors.text + '80' }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.docFooter}>
                  <Text style={[styles.docDate, { color: colors.text + '40' }]}>
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </Text>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: doc.processingStatus === 'completed' ? '#10B98115' : 
                                    doc.processingStatus === 'pending' ? '#F59E0B15' : '#EF444415'
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: doc.processingStatus === 'completed' ? '#10B981' : 
                             doc.processingStatus === 'pending' ? '#F59E0B' : '#EF4444'
                    }]}>
                      {doc.processingStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  uploadButton: { padding: 8 },
  statsScroll: { paddingHorizontal: 16, marginTop: 8, marginBottom: 12 },
  statCard: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, marginRight: 10 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 11 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 12, paddingHorizontal: 12, borderRadius: 10, height: 44 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  filterScroll: { paddingHorizontal: 16, marginBottom: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#00000008' },
  filterText: { fontSize: 13, fontWeight: '500' },
  statusFilterRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  statusChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#00000008' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  content: { flex: 1 },
  quickActions: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  quickActionCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 12 },
  quickActionIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quickActionText: { fontSize: 14, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  sectionCount: { fontSize: 13 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48, gap: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600' },
  emptySubtitle: { fontSize: 13, textAlign: 'center' },
  docCard: { marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 12, borderWidth: 1 },
  docHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  docIconRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  docName: { fontSize: 14, fontWeight: '600', flex: 1 },
  docMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  docAgent: { fontSize: 12, fontWeight: '500' },
  docSize: { fontSize: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  tagChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11 },
  docFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  docDate: { fontSize: 12 },
});
