import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  FileText,
  Clock,
  User,
  Phone,
  Calendar,
  Plus,
  Search,
  Pencil,
  Download,
  Share2,
  Mic,
  Play,
  Pause,
  Volume2,
  CircleCheck,
  CircleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';

interface CallSummary {
  id: string;
  title: string;
  participant: string;
  duration: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  hasRecording: boolean;
  hasTranscript: boolean;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  lastModified: string;
  tags: string[];
  isShared: boolean;
  relatedCallId?: string;
}

export default function CallSummaryNoteScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'summaries' | 'notes' | 'settings'>('summaries');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoSummary, setAutoSummary] = useState<boolean>(true);
  const [autoTranscript, setAutoTranscript] = useState<boolean>(true);

  const callMetrics = undefined as any;
  const callHistory = undefined as any;

  const formatDuration = (seconds?: number) => {
    const s = typeof seconds === 'number' ? Math.max(0, seconds) : 0;
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    const mm = mins.toString().padStart(2, '0');
    const ss = secs.toString().padStart(2, '0');
    return hrs > 0 ? `${hrs}:${mm}:${ss}` : `${mins}:${ss}`;

    };

  const summaries: CallSummary[] = (callHistory?.calls ?? []).map((c: any) => {
    const start = c.startTime ? new Date(c.startTime) : new Date();

    const status: CallSummary['status'] =
      c.status === 'completed'
        ? 'completed'
        : c.status === 'in-progress' || c.status === 'queued' || c.status === 'ringing'
          ? 'processing'
          : 'failed';

    const participant = c.customerName
      ? `${c.customerName}${c.phoneNumber ? ` (${c.phoneNumber})` : ''}`
      : c.phoneNumber || 'Unknown';

    return {
      id: c.callId,
      title: c.customerName ? `Call with ${c.customerName}` : `Call ${c.callId}`,
      participant,
      duration: formatDuration(c.duration),
      date: start.toLocaleString(),
      status,
      summary: `Status: ${c.status}. Duration: ${formatDuration(c.duration)}.`,
      keyPoints: [],
      actionItems: [],
      sentiment: 'neutral',
      hasRecording: false,
      hasTranscript: false,
    };
  });

  const notes: Note[] = [];

  const getSentimentColor = (sentiment: CallSummary['sentiment']) => {
    switch (sentiment) {
      case 'positive': return '#34C759';
      case 'neutral': return '#FF9500';
      case 'negative': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: CallSummary['status']) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'processing': return '#FF9500';
      case 'failed': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: CallSummary['status']) => {
    switch (status) {
      case 'completed': return CircleCheck;
      case 'processing': return Clock;
      case 'failed': return CircleAlert;
      default: return Clock;
    }
  };

  const filteredSummaries = summaries.filter(summary =>
    summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    summary.participant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSummaryItem = ({ item }: { item: CallSummary }) => {
    const StatusIcon = getStatusIcon(item.status);
    
    return (
      <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.summaryHeader}>
          <View style={styles.summaryInfo}>
            <Text style={[styles.summaryTitle, { color: theme.colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[styles.summaryParticipant, { color: theme.colors.secondaryText }]}>
              {item.participant}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <StatusIcon size={12} color={getStatusColor(item.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.summaryMeta}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
              {item.duration}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Calendar size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
              {item.date}
            </Text>
          </View>
          <View style={[styles.sentimentBadge, { backgroundColor: getSentimentColor(item.sentiment) + '20' }]}>
            <Text style={[styles.sentimentText, { color: getSentimentColor(item.sentiment) }]}>
              {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
            </Text>
          </View>
        </View>

        <Text style={[styles.summaryContent, { color: theme.colors.text }]} numberOfLines={3}>
          {item.summary}
        </Text>

        <View style={styles.keyPointsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Points:</Text>
          {item.keyPoints.slice(0, 2).map((point, index) => (
            <Text key={index} style={[styles.keyPoint, { color: theme.colors.secondaryText }]}>
              • {point}
            </Text>
          ))}
          {item.keyPoints.length > 2 && (
            <Text style={[styles.moreText, { color: theme.colors.primary }]}>
              +{item.keyPoints.length - 2} more
            </Text>
          )}
        </View>

        <View style={styles.summaryActions}>
          <View style={styles.actionGroup}>
            {item.hasRecording && (
              <TouchableOpacity style={styles.actionButton}>
                <Volume2 size={16} color={theme.colors.primary} />
                <Text style={[styles.actionText, { color: theme.colors.primary }]}>Recording</Text>
              </TouchableOpacity>
            )}
            {item.hasTranscript && (
              <TouchableOpacity style={styles.actionButton}>
                <FileText size={16} color={theme.colors.primary} />
                <Text style={[styles.actionText, { color: theme.colors.primary }]}>Transcript</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.actionGroup}>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={16} color={theme.colors.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Download size={16} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <View style={[styles.noteCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.noteHeader}>
        <View style={styles.noteInfo}>
          <Text style={[styles.noteTitle, { color: theme.colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.noteDate, { color: theme.colors.secondaryText }]}>
            Modified: {item.lastModified}
          </Text>
        </View>
        {item.isShared && (
          <View style={[styles.sharedBadge, { backgroundColor: theme.colors.primary + '20' }]}>
            <Text style={[styles.sharedText, { color: theme.colors.primary }]}>Shared</Text>
          </View>
        )}
      </View>

      <Text style={[styles.noteContent, { color: theme.colors.text }]} numberOfLines={3}>
        {item.content}
      </Text>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.noteActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Pencil size={16} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={16} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.primary }]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSettings = () => (
    <ScrollView style={styles.settingsContainer}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>Auto-Processing</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Summary</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Automatically generate call summaries
            </Text>
          </View>
          <Switch
            value={autoSummary}
            onValueChange={setAutoSummary}
            trackColor={{ false: '#8E8E93', true: theme.colors.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Transcript</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Automatically transcribe call recordings
            </Text>
          </View>
          <Switch
            value={autoTranscript}
            onValueChange={setAutoTranscript}
            trackColor={{ false: '#8E8E93', true: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>Export Options</Text>
        
        <TouchableOpacity style={styles.exportButton}>
          <FileText size={20} color={theme.colors.primary} />
          <Text style={[styles.exportText, { color: theme.colors.primary }]}>Export All Summaries</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color={theme.colors.primary} />
          <Text style={[styles.exportText, { color: theme.colors.primary }]}>Download Notes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Call Summary & Notes</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['summaries', 'notes', 'settings'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      {(activeTab === 'summaries' || activeTab === 'notes') && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder={`Search ${activeTab}...`}
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      )}

      {/* Content */}
      {activeTab === 'summaries' && (
        <FlatList
          data={filteredSummaries}
          renderItem={renderSummaryItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'notes' && (
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'settings' && renderSettings()}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => Alert.alert('Create New', 'Feature coming soon!')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  summaryInfo: {
    flex: 1,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryParticipant: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  summaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  sentimentBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sentimentText: {
    fontSize: 10,
    fontWeight: '500',
  },
  summaryContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  keyPointsContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  keyPoint: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  summaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
  },
  sharedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sharedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
  },
  noteActions: {
    flexDirection: 'row',
    gap: 16,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  exportText: {
    fontSize: 16,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
