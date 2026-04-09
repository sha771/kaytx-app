 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  FileText,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Tag,
  Brain,
  Sparkles,
} from 'lucide-react-native';
import { mockCallTranscripts } from '@/utils/mockNegotiationData';
import type { CallTranscript } from '@/types/negotiation';

export default function TranscriptsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState<CallTranscript | null>(null);
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTranscripts = mockCallTranscripts.filter((transcript: CallTranscript) => {
    const matchesSearch = transcript.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment = filterSentiment === 'all' || transcript.sentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp size={18} color="#34C759" />;
      case 'negative':
        return <TrendingDown size={18} color="#FF3B30" />;
      default:
        return <Minus size={18} color="#FF9500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '#34C759';
      case 'negative':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Call Transcripts',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <Filter size={22} color="#FF2D92" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={18} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by customer name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          {showFilters && (
            <View style={styles.filtersContainer}>
              <Text style={styles.filterLabel}>Sentiment:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
                {['all', 'positive', 'neutral', 'negative'].map((sentiment) => (
                  <TouchableOpacity
                    key={sentiment}
                    style={[
                      styles.filterChip,
                      filterSentiment === sentiment && styles.filterChipActive,
                    ]}
                    onPress={() => setFilterSentiment(sentiment as typeof filterSentiment)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        filterSentiment === sentiment && styles.filterChipTextActive,
                      ]}
                    >
                      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}>
              <Text style={[styles.statValue, { color: '#34C759' }]}>
                {mockCallTranscripts.filter((t: CallTranscript) => t.sentiment === 'positive').length}
              </Text>
              <Text style={styles.statLabel}>Positive</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF5F0' }]}>
              <Text style={[styles.statValue, { color: '#FF9500' }]}>
                {mockCallTranscripts.filter((t: CallTranscript) => t.sentiment === 'neutral').length}
              </Text>
              <Text style={styles.statLabel}>Neutral</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F0' }]}>
              <Text style={[styles.statValue, { color: '#FF3B30' }]}>
                {mockCallTranscripts.filter((t: CallTranscript) => t.sentiment === 'negative').length}
              </Text>
              <Text style={styles.statLabel}>Negative</Text>
            </View>
          </View>

          <View style={styles.transcriptsList}>
            {filteredTranscripts.map((transcript) => (
              <TouchableOpacity
                key={transcript.id}
                style={styles.transcriptCard}
                onPress={() => setSelectedTranscript(transcript)}
              >
                <View style={styles.transcriptHeader}>
                  <View style={styles.transcriptHeaderLeft}>
                    <Text style={styles.customerName}>{transcript.customerName}</Text>
                    <View style={styles.metaRow}>
                      <Clock size={14} color="#8E8E93" />
                      <Text style={styles.metaText}>{transcript.duration}</Text>
                      <Text style={styles.metaDivider}>•</Text>
                      <Text style={styles.metaText}>
                        {new Date(transcript.timestamp).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.sentimentBadge,
                      { backgroundColor: getSentimentColor(transcript.sentiment) + '20' },
                    ]}
                  >
                    {getSentimentIcon(transcript.sentiment)}
                  </View>
                </View>

                <View style={styles.summarySection}>
                  <View style={styles.summaryHeader}>
                    <Brain size={16} color="#FF2D92" />
                    <Text style={styles.summaryLabel}>AI Summary</Text>
                  </View>
                  <Text style={styles.summaryText} numberOfLines={2}>
                    {transcript.summary}
                  </Text>
                </View>

                <View style={styles.keyPointsSection}>
                  <View style={styles.keyPointsHeader}>
                    <Sparkles size={14} color="#FF9500" />
                    <Text style={styles.keyPointsLabel}>Key Points</Text>
                  </View>
                  <View style={styles.keyPointsList}>
                    {transcript.keyPoints.slice(0, 2).map((point, index) => (
                      <View key={index} style={styles.keyPoint}>
                        <View style={styles.keyPointDot} />
                        <Text style={styles.keyPointText} numberOfLines={1}>
                          {point}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.transcriptFooter}>
                  <View style={styles.actionItemsCount}>
                    <CheckCircle size={14} color="#34C759" />
                    <Text style={styles.actionItemsText}>
                      {transcript.actionItems.length} action items
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View Full Transcript</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={selectedTranscript !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedTranscript(null)}
        >
          {selectedTranscript && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <Text style={styles.modalTitle}>{selectedTranscript.customerName}</Text>
                  <View style={styles.modalMetaRow}>
                    <Clock size={14} color="#8E8E93" />
                    <Text style={styles.modalMetaText}>{selectedTranscript.duration}</Text>
                  </View>
                </View>
                <View style={styles.modalHeaderRight}>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedTranscript(null)}>
                    <X size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.modalContent}>
                <View
                  style={[
                    styles.sentimentCard,
                    { backgroundColor: getSentimentColor(selectedTranscript.sentiment) + '15' },
                  ]}
                >
                  <View style={styles.sentimentCardHeader}>
                    {getSentimentIcon(selectedTranscript.sentiment)}
                    <Text
                      style={[
                        styles.sentimentCardText,
                        { color: getSentimentColor(selectedTranscript.sentiment) },
                      ]}
                    >
                      {selectedTranscript.sentiment.charAt(0).toUpperCase() +
                        selectedTranscript.sentiment.slice(1)}{' '}
                      Sentiment
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Brain size={20} color="#FF2D92" />
                    <Text style={styles.sectionTitle}>AI-Generated Summary</Text>
                  </View>
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionText}>{selectedTranscript.summary}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Sparkles size={20} color="#FF9500" />
                    <Text style={styles.sectionTitle}>Key Points</Text>
                  </View>
                  <View style={styles.sectionContent}>
                    {selectedTranscript.keyPoints.map((point, index) => (
                      <View key={index} style={styles.bulletItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>{point}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <CheckCircle size={20} color="#34C759" />
                    <Text style={styles.sectionTitle}>Action Items</Text>
                  </View>
                  <View style={styles.sectionContent}>
                    {selectedTranscript.actionItems.map((item, index) => (
                      <View key={index} style={styles.actionItem}>
                        <View style={styles.actionCheckbox} />
                        <Text style={styles.actionText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <FileText size={20} color="#007AFF" />
                    <Text style={styles.sectionTitle}>Full Transcript</Text>
                  </View>
                  <View style={styles.transcriptContent}>
                    {selectedTranscript.transcript.split('\n').map((line, index) => {
                      const isAgent = line.startsWith('Agent:');
                      const isCustomer = line.startsWith('Customer:');
                      return (
                        <View key={index} style={styles.transcriptLine}>
                          {isAgent && (
                            <View style={styles.speakerBadge}>
                              <Text style={styles.agentText}>Agent</Text>
                            </View>
                          )}
                          {isCustomer && (
                            <View style={[styles.speakerBadge, { backgroundColor: '#E8F5FF' }]}>
                              <Text style={[styles.agentText, { color: '#007AFF' }]}>Customer</Text>
                            </View>
                          )}
                          <Text
                            style={[
                              styles.transcriptLineText,
                              isAgent && styles.agentLineText,
                              isCustomer && styles.customerLineText,
                            ]}
                          >
                            {line.replace(/^(Agent:|Customer:)\s*/, '')}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filtersContainer: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF2D92',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  transcriptsList: {
    padding: 16,
    gap: 16,
  },
  transcriptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  transcriptHeaderLeft: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  metaDivider: {
    fontSize: 13,
    color: '#8E8E93',
    marginHorizontal: 4,
  },
  sentimentBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summarySection: {
    backgroundColor: '#FFF0F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#FF2D92',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1A1A1A',
  },
  keyPointsSection: {
    marginBottom: 12,
  },
  keyPointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  keyPointsLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#FF9500',
  },
  keyPointsList: {
    gap: 6,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  keyPointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9500',
    marginTop: 6,
  },
  keyPointText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 18,
  },
  transcriptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  actionItemsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionItemsText: {
    fontSize: 13,
    color: '#34C759',
    fontWeight: '500' as const,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF2D92',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalHeaderLeft: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalMetaText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  modalHeaderRight: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  downloadButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  sentimentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sentimentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sentimentCardText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9500',
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  actionCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#34C759',
    marginTop: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  transcriptContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  transcriptLine: {
    marginBottom: 16,
  },
  speakerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE8F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  agentText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FF2D92',
  },
  transcriptLineText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  agentLineText: {
    color: '#1A1A1A',
  },
  customerLineText: {
    color: '#1A1A1A',
  },
});
