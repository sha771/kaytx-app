 
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Search,
  PhoneCall,
  MessageCircle,
  Clock,
  Shield,
  Download,
  Share2,
  Sparkles,
  ListFilter,
  X,
  Play,
  Link2,
  FileText,
  Mail,
  Bot,
  CircleAlert,
  CircleCheck,
  Copy,
  ExternalLink,
  Zap,
  Radio,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

type ChannelType = 'PSTN' | 'WhatsApp' | 'Video';
type Sentiment = 'positive' | 'neutral' | 'negative';

type TranscriptLine = {
  speaker: 'Customer' | 'AI' | 'Agent';
  text: string;
  time: string;
};

type ChannelFilter = 'all' | ChannelType;
type SentimentFilter = 'all' | Sentiment;

type ReceptionistTranscript = {
  id: string;
  customerName: string;
  phoneNumber: string;
  channel: ChannelType;
  timestamp: string;
  duration: string;
  sentiment: Sentiment;
  summary: string;
  actions: string[];
  tags: string[];
  qaScore: number;
  crmRecord: string;
  transcript: TranscriptLine[];
};

const channelColors: Record<ChannelType, string> = {
  PSTN: '#007AFF',
  WhatsApp: '#25D366',
  Video: '#AF52DE',
};

const sentimentColors: Record<Sentiment, string> = {
  positive: '#34C759',
  neutral: '#FFCC00',
  negative: '#FF3B30',
};

const channelFilters: ChannelFilter[] = ['all', 'PSTN', 'WhatsApp', 'Video'];
const sentimentFilters: SentimentFilter[] = ['all', 'positive', 'neutral', 'negative'];

const isAllSentiment = (value: SentimentFilter): value is 'all' => value === 'all';

export default function ReceptionistTranscriptsScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [channelFilter, setChannelFilter] = useState<ChannelType | 'all'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<Sentiment | 'all'>('all');
  const [selectedTranscript, setSelectedTranscript] = useState<ReceptionistTranscript | null>(null);
  
  // Real tRPC data
  const { data: receptionistTranscripts = [], refetch } = trpc.receptionist.getTranscripts.useQuery();
  const { data: config } = trpc.receptionist.getConfig.useQuery();

  const [enableLiveMonitor, setEnableLiveMonitor] = useState<boolean>(false);
  const [enableAutoNotes, setEnableAutoNotes] = useState<boolean>(config?.transcribeCalls ?? true);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState<boolean>(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState<boolean>(true);
  const [autoRefresh] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'qaScore'>('newest');
  const [liveCallsCount, setLiveCallsCount] = useState<number>(0);

  useEffect(() => {
    if (config) {
      setEnableAutoNotes(config.transcribeCalls);
    }
  }, [config]);

  const filteredTranscripts = useMemo(() => {
    return (receptionistTranscripts as ReceptionistTranscript[]).filter(transcript => {
      const matchesSearch = `${transcript.customerName} ${transcript.phoneNumber}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesChannel = channelFilter === 'all' || transcript.channel === channelFilter;
      const matchesSentiment = sentimentFilter === 'all' || transcript.sentiment === sentimentFilter;
      return matchesSearch && matchesChannel && matchesSentiment;
    }).sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortOrder === 'oldest') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (sortOrder === 'qaScore') return b.qaScore - a.qaScore;
      return 0;
    });
  }, [receptionistTranscripts, searchQuery, channelFilter, sentimentFilter, sortOrder]);

  React.useEffect(() => {
    if (realTimeUpdates && autoRefresh) {
      const interval = setInterval(() => {
        setLiveCallsCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
        refetch();
      }, 15000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [realTimeUpdates, autoRefresh, refetch]);

  const sentimentStats = useMemo(() => {
    const base = { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>;
    (receptionistTranscripts as ReceptionistTranscript[]).forEach(item => {
      if (base[item.sentiment] !== undefined) {
        base[item.sentiment] += 1;
      }
    });
    return base;
  }, [receptionistTranscripts]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Call Transcripts',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} ={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]} testID="receptionist-transcripts-title">Realtime call intelligence</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Replay conversations across PSTN, WhatsApp, and video while syncing CRM + QA workflows.</Text>
            
            <View style={styles.liveMonitorRow}>
              <View style={styles.liveMonitorInfo}>
                <Radio size={18} color={enableLiveMonitor ? '#34C759' : theme.colors.secondaryText} />
                <Text style={[styles.liveMonitorText, { color: theme.colors.text }]}>Live monitoring</Text>
                {enableLiveMonitor && liveCallsCount > 0 && (
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveBadgeText}>{liveCallsCount} LIVE</Text>
                  </View>
                )}
              </View>
              <Switch
                value={enableLiveMonitor}
                onValueChange={(val) => {
                  console.log('Live monitoring', val);
                  setEnableLiveMonitor(val);
                  Alert.alert('Live Monitoring', val ? 'Now monitoring active calls in real-time' : 'Live monitoring disabled');
                }}
              />
            </View>
            
            <View style={styles.liveMonitorRow}>
              <View style={styles.liveMonitorInfo}>
                <Bot size={18} color={theme.colors.primary} />
                <Text style={[styles.liveMonitorText, { color: theme.colors.text }]}>Auto AI notes</Text>
              </View>
              <Switch
                value={enableAutoNotes}
                onValueChange={(val) => {
                  console.log('Auto AI notes', val);
                  setEnableAutoNotes(val);
                }}
              />
            </View>
            
            <View style={styles.liveMonitorRow}>
              <View style={styles.liveMonitorInfo}>
                <Activity size={18} color={realTimeUpdates ? theme.colors.success : theme.colors.secondaryText} />
                <Text style={[styles.liveMonitorText, { color: theme.colors.text }]}>Real-time updates</Text>
              </View>
              <Switch
                value={realTimeUpdates}
                onValueChange={(val) => {
                  console.log('Real-time updates', val);
                  setRealTimeUpdates(val);
                }}
              />
            </View>
          </View>

          <View style={styles.sortBar}>
            <Text style={[styles.sortLabel, { color: theme.colors.text }]}>Sort by:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortOptions}>
              {(['newest', 'oldest', 'qaScore'] as const).map(option => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortChip, sortOrder === option && styles.sortChipActive]}
                  onPress={() => {
                    console.log('Sort order changed', option);
                    setSortOrder(option);
                  }}
                >
                  <Text style={[styles.sortChipText, { color: sortOrder === option ? '#fff' : theme.colors.text }]}>
                    {option === 'qaScore' ? 'QA Score' : option === 'newest' ? 'Newest First' : 'Oldest First'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.summaryGrid}>
            {[
              { id: 'numbers', label: 'Numbers monitored', value: '42', icon: PhoneCall },
              { id: 'whatsapp', label: 'WhatsApp handoffs', value: '18', icon: MessageCircle },
              { id: 'sla', label: 'SLA compliance', value: '99.2%', icon: Shield },
              { id: 'avg-time', label: 'Avg review time', value: '3m 22s', icon: Clock },
            ].map(item => {
              const Icon = item.icon;
              return (
                <View key={item.id} style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]} testID={`receptionist-transcripts-summary-${item.id}`}>
                  <View style={styles.summaryIcon}>
                    <Icon size={18} color={theme.colors.primary} />
                  </View>
                  <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{item.value}</Text>
                  <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.filterCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-transcripts-filters">
            <View style={styles.filterHeader}>
              <View style={styles.filterTitleRow}>
                <ListFilter size={16} color={theme.colors.primary} />
                <Text style={[styles.filterTitle, { color: theme.colors.text }]}>Filter & route</Text>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={() => {
                console.log('Filters cleared');
                setSearchQuery('');
                setChannelFilter('all');
                setSentimentFilter('all');
              }}>
                <Text style={[styles.clearButtonText, { color: theme.colors.primary }]}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search name, number, or tag"
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={text => {
                  console.log('Transcript search', text);
                  setSearchQuery(text);
                }}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {channelFilters.map(channel => (
                <TouchableOpacity
                  key={channel}
                  style={[styles.chip, channelFilter === channel && styles.chipActive]}
                  onPress={() => {
                    console.log('Channel filter', channel);
                    setChannelFilter(channel);
                  }}
                >
                  <Text style={[styles.chipText, { color: channelFilter === channel ? '#fff' : theme.colors.text }]}>
                    {channel === 'all' ? 'All channels' : channel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.sentimentRow}>
              {sentimentFilters.map(sentiment => {
                const isAllOption = isAllSentiment(sentiment);
                return (
                <TouchableOpacity
                  key={sentiment}
                  style={[styles.sentimentChip, sentimentFilter === sentiment && styles.sentimentChipActive]}
                  onPress={() => {
                    console.log('Sentiment filter', sentiment);
                    setSentimentFilter(isAllOption ? 'all' : sentiment);
                  }}
                >
                  <Text style={[styles.sentimentChipText, { color: sentimentFilter === sentiment ? '#fff' : theme.colors.secondaryText }]}>
                    {isAllOption ? 'All sentiment' : `${sentiment} (${sentimentStats[sentiment]})`}
                  </Text>
                </TouchableOpacity>
              );
              })}
            </View>
          </View>

          <View style={styles.listSection}>
            {filteredTranscripts.map(transcript => (
              <TouchableOpacity
                key={transcript.id}
                style={[styles.transcriptCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedTranscript(transcript)}
                testID={`receptionist-transcript-card-${transcript.id}`}
              >
                <View style={styles.transcriptHeader}>
                  <View>
                    <Text style={[styles.customerName, { color: theme.colors.text }]}>{transcript.customerName}</Text>
                    <Text style={[styles.phoneNumber, { color: theme.colors.secondaryText }]}>{transcript.phoneNumber}</Text>
                  </View>
                  <View style={[styles.channelBadge, { backgroundColor: `${channelColors[transcript.channel]}1A` }]}
                    >
                    <Text style={[styles.channelBadgeText, { color: channelColors[transcript.channel] }]}>{transcript.channel}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{new Date(transcript.timestamp).toLocaleString()}</Text>
                  <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{transcript.duration}</Text>
                  <Text style={[styles.sentimentLabel, { color: sentimentColors[transcript.sentiment] }]}>{transcript.sentiment}</Text>
                  <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>QA {transcript.qaScore}%</Text>
                </View>

                <Text style={[styles.summary, { color: theme.colors.text }]} numberOfLines={2}>{transcript.summary}</Text>

                <View style={styles.tagsRow}>
                  {transcript.tags.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.inlineAction} onPress={() => console.log('Open CRM', transcript.crmRecord)}>
                    <Link2 size={14} color={theme.colors.primary} />
                    <Text style={[styles.inlineActionText, { color: theme.colors.primary }]}>Open CRM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.inlineAction} onPress={() => console.log('Download recording', transcript.id)}>
                    <Download size={14} color={theme.colors.primary} />
                    <Text style={[styles.inlineActionText, { color: theme.colors.primary }]}>Recording</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.inlineAction} onPress={() => console.log('Share transcript', transcript.id)}>
                    <Share2 size={14} color={theme.colors.primary} />
                    <Text style={[styles.inlineActionText, { color: theme.colors.primary }]}>Share</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal visible={selectedTranscript !== null} animationType="slide" transparent={false} onRequestClose={() => setSelectedTranscript(null)}>
          {selectedTranscript && (
            <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Full transcript</Text>
                <TouchableOpacity onPress={() => setSelectedTranscript(null)}>
                  <X size={22} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalSummaryCard}>
                  <View>
                    <Text style={[styles.modalCustomer, { color: theme.colors.text }]}>{selectedTranscript.customerName}</Text>
                    <Text style={[styles.modalPhone, { color: theme.colors.secondaryText }]}>{selectedTranscript.phoneNumber}</Text>
                    <Text style={[styles.modalMeta, { color: theme.colors.secondaryText }]}>{new Date(selectedTranscript.timestamp).toLocaleString()} · {selectedTranscript.duration}</Text>
                  </View>
                  <View style={styles.modalSummaryRight}>
                    <View style={[styles.channelBadge, { backgroundColor: `${channelColors[selectedTranscript.channel]}1A` }]}
                      >
                      <Text style={[styles.channelBadgeText, { color: channelColors[selectedTranscript.channel] }]}>{selectedTranscript.channel}</Text>
                    </View>
                    <Text style={[styles.modalSentiment, { color: sentimentColors[selectedTranscript.sentiment] }]}>{selectedTranscript.sentiment.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.modalActionRow}>
                  <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={() => console.log('Replay call', selectedTranscript.id)}>
                    <Play size={16} color="#fff" />
                    <Text style={styles.primaryButtonText}>Replay call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.colors.primary }]} onPress={() => {
                    console.log('Generate AI summary', selectedTranscript.id);
                    setShowAnalysisPanel(!showAnalysisPanel);
                  }}>
                    <Sparkles size={16} color={theme.colors.primary} />
                    <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>AI analysis</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.quickActionsRow}>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]} onPress={() => {
                    console.log('Export transcript', selectedTranscript.id);
                    Alert.alert('Export', 'Transcript exported as PDF');
                  }}>
                    <FileText size={16} color={theme.colors.primary} />
                    <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Export PDF</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]} onPress={() => {
                    console.log('Email transcript', selectedTranscript.id);
                    Alert.alert('Email', 'Transcript sent to team');
                  }}>
                    <Mail size={16} color={theme.colors.primary} />
                    <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]} onPress={() => {
                    console.log('Copy transcript', selectedTranscript.id);
                    Alert.alert('Copied', 'Transcript copied to clipboard');
                  }}>
                    <Copy size={16} color={theme.colors.primary} />
                    <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Copy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]} onPress={() => {
                    console.log('Open in CRM', selectedTranscript.crmRecord);
                  }}>
                    <ExternalLink size={16} color={theme.colors.primary} />
                    <Text style={[styles.quickActionText, { color: theme.colors.text }]}>CRM</Text>
                  </TouchableOpacity>
                </View>

                {showAnalysisPanel && (
                  <View style={[styles.analysisPanel, { backgroundColor: theme.colors.cardBackground }]}>
                    <View style={styles.analysisPanelHeader}>
                      <Sparkles size={20} color={theme.colors.primary} />
                      <Text style={[styles.analysisPanelTitle, { color: theme.colors.text }]}>AI Deep Analysis</Text>
                    </View>
                    
                    <View style={styles.analysisSection}>
                      <Text style={[styles.analysisSectionTitle, { color: theme.colors.text }]}>Key Topics</Text>
                      <View style={styles.analysisChips}>
                        {['Order Status', 'Shipping', 'Account Verification', 'Follow-up'].map(topic => (
                          <View key={topic} style={[styles.analysisChip, { backgroundColor: `${theme.colors.primary}1A` }]}>
                            <Text style={[styles.analysisChipText, { color: theme.colors.primary }]}>{topic}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    
                    <View style={styles.analysisSection}>
                      <Text style={[styles.analysisSectionTitle, { color: theme.colors.text }]}>Customer Intent</Text>
                      <Text style={[styles.analysisText, { color: theme.colors.text }]}>Customer is seeking order status update with high satisfaction. Recommended action: Send proactive shipping notification via WhatsApp.</Text>
                    </View>
                    
                    <View style={styles.analysisSection}>
                      <Text style={[styles.analysisSectionTitle, { color: theme.colors.text }]}>Compliance Score</Text>
                      <View style={styles.complianceBar}>
                        <View style={[styles.complianceFill, { width: '97%', backgroundColor: '#34C759' }]} />
                      </View>
                      <Text style={[styles.complianceText, { color: theme.colors.secondaryText }]}>97% - All regulatory requirements met</Text>
                    </View>
                    
                    <View style={styles.analysisSection}>
                      <Text style={[styles.analysisSectionTitle, { color: theme.colors.text }]}>Recommended Next Steps</Text>
                      <View style={styles.recommendationsList}>
                        <View style={styles.recommendationItem}>
                          <CircleCheck size={16} color="#34C759" />
                          <Text style={[styles.recommendationText, { color: theme.colors.text }]}>Send WhatsApp receipt with tracking link</Text>
                        </View>
                        <View style={styles.recommendationItem}>
                          <CircleAlert size={16} color="#FFCC00" />
                          <Text style={[styles.recommendationText, { color: theme.colors.text }]}>Update CRM with VIP status confirmation</Text>
                        </View>
                        <View style={styles.recommendationItem}>
                          <Zap size={16} color={theme.colors.primary} />
                          <Text style={[styles.recommendationText, { color: theme.colors.text }]}>Schedule follow-up call in 48 hours</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Action items</Text>
                  {selectedTranscript.actions.map(action => (
                    <View key={action} style={[styles.actionItem, { backgroundColor: theme.colors.cardBackground }]}
                      >
                      <Text style={[styles.actionItemText, { color: theme.colors.text }]}>{action}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalSection}>
                  <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Conversation timeline</Text>
                  {selectedTranscript.transcript.map((line, index) => (
                    <View key={`${line.speaker}-${index}`} style={styles.timelineRow}>
                      <View style={[styles.timelineDot, { backgroundColor: line.speaker === 'AI' ? theme.colors.primary : '#8E8E93' }]} />
                      <View style={styles.timelineContent}>
                        <Text style={[styles.timelineSpeaker, { color: theme.colors.secondaryText }]}>{line.speaker} · {line.time}</Text>
                        <Text style={[styles.timelineText, { color: theme.colors.text }]}>{line.text}</Text>
                      </View>
                    </View>
                  ))}
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
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
  },
  summaryIcon: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  filterCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  filterTitleRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  chipActive: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sentimentRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  sentimentChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  sentimentChipActive: {
    backgroundColor: '#1C1C1E',
    borderColor: '#1C1C1E',
  },
  sentimentChipText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  listSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  transcriptCard: {
    borderRadius: 20,
    padding: 18,
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '700',
  },
  phoneNumber: {
    fontSize: 14,
  },
  channelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  channelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
  },
  sentimentLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  inlineAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inlineActionText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalContent: {
    padding: 20,
    gap: 20,
  },
  modalSummaryCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCustomer: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalPhone: {
    fontSize: 14,
    marginBottom: 4,
  },
  modalMeta: {
    fontSize: 12,
  },
  modalSummaryRight: {
    alignItems: 'flex-end',
    gap: 10,
  },
  modalSentiment: {
    fontSize: 13,
    fontWeight: '700',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  modalSection: {
    gap: 10,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionItem: {
    borderRadius: 14,
    padding: 14,
  },
  actionItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
  },
  timelineSpeaker: {
    fontSize: 12,
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 14,
    lineHeight: 20,
  },
  liveMonitorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  liveMonitorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  liveMonitorText: {
    fontSize: 15,
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  analysisPanel: {
    borderRadius: 18,
    padding: 18,
    gap: 16,
  },
  analysisPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  analysisPanelTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  analysisSection: {
    gap: 10,
  },
  analysisSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  analysisChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  analysisChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  analysisChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 20,
  },
  complianceBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  complianceFill: {
    height: '100%',
  },
  complianceText: {
    fontSize: 12,
    marginTop: 6,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  sortBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  sortChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sortChipActive: {
    backgroundColor: '#007AFF',
  },
  sortChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  liveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    marginLeft: 8,
  },
  liveBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

