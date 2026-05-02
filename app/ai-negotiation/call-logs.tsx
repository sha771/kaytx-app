 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  Calendar,
  Search,
  ListFilter,
  Download,
  Play,
  FileText,
  TrendingUp,
  DollarSign,
  CircleCheck,
  ShieldCheck,
  MessageCircle,
  Signal,
  Star,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';
import { mockCallLogs } from '@/utils/mockNegotiationData';
import type { CallLog } from '@/types/negotiation';

const { width } = Dimensions.get('window');

type EnhancedCallLog = CallLog & {
  channel: 'voice' | 'whatsapp' | 'sms';
  qualityScore: number;
  risk: 'low' | 'medium' | 'high';
};

export default function CallLogsScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'answered' | 'missed' | 'won' | 'lost'>('all');
  const [selectedCallType, setSelectedCallType] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'voice' | 'whatsapp' | 'sms'>('all');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<EnhancedCallLog | null>(null);

  const enrichedLogs = useMemo<EnhancedCallLog[]>(
    () =>
      mockCallLogs.map((log, index) => {
        const channel: 'voice' | 'whatsapp' | 'sms' = index % 3 === 0 ? 'whatsapp' : index % 3 === 1 ? 'voice' : 'sms';
        const qualityScore = log.status === 'missed' ? 42 : log.outcome === 'won' ? 92 : 74;
        const risk: 'low' | 'medium' | 'high' = qualityScore > 85 ? 'low' : qualityScore > 60 ? 'medium' : 'high';
        return { ...log, channel, qualityScore, risk };
      }),
    [],
  );

  const filteredLogs = useMemo(() => {
    let filtered = [...enrichedLogs];

    if (searchQuery) {
      filtered = filtered.filter(
        log =>
          log.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.customerPhone.includes(searchQuery),
      );
    }

    if (selectedFilter !== 'all') {
      if (selectedFilter === 'answered' || selectedFilter === 'missed') {
        filtered = filtered.filter(log => log.status === selectedFilter);
      } else if (selectedFilter === 'won' || selectedFilter === 'lost') {
        filtered = filtered.filter(log => log.outcome === selectedFilter);
      }
    }

    if (selectedCallType !== 'all') {
      filtered = filtered.filter(log => log.callType === selectedCallType);
    }

    if (channelFilter !== 'all') {
      filtered = filtered.filter(log => log.channel === channelFilter);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [searchQuery, selectedFilter, selectedCallType, channelFilter, enrichedLogs]);

  const stats = useMemo(() => {
    const total = enrichedLogs.length;
    const answered = enrichedLogs.filter(l => l.status === 'answered').length;
    const missed = enrichedLogs.filter(l => l.status === 'missed').length;
    const won = enrichedLogs.filter(l => l.outcome === 'won').length;
    const lost = enrichedLogs.filter(l => l.outcome === 'lost').length;
    const avgDuration = enrichedLogs
      .filter(l => l.duration && l.duration !== '0:00')
      .reduce((sum, l) => {
        const [min, sec] = l.duration!.split(':').map(Number);
        return sum + (min * 60 + sec);
      }, 0) / Math.max(answered, 1);

    return {
      total,
      answered,
      missed,
      won,
      lost,
      answerRate: total > 0 ? ((answered / total) * 100).toFixed(1) : '0',
      winRate: answered > 0 ? ((won / answered) * 100).toFixed(1) : '0',
      avgDuration: `${Math.floor(avgDuration / 60)}:${String(Math.floor(avgDuration % 60)).padStart(2, '0')}`,
    };
  }, [enrichedLogs]);

  const channelStats = useMemo(
    () => [
      {
        id: 'voice',
        label: 'Voice Grid',
        icon: Phone,
        total: enrichedLogs.filter(log => log.channel === 'voice').length,
        trend: '+12% QoQ',
        color: '#007AFF',
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp Live',
        icon: MessageCircle,
        total: enrichedLogs.filter(log => log.channel === 'whatsapp').length,
        trend: '+21% engagement',
        color: '#25D366',
      },
      {
        id: 'sms',
        label: 'SMS Assist',
        icon: Signal,
        total: enrichedLogs.filter(log => log.channel === 'sms').length,
        trend: '+8% reach',
        color: '#FF9500',
      },
    ],
    [enrichedLogs],
  );

  const qualityInsights = useMemo(
    () => [
      {
        id: 'qi-1',
        title: 'Enterprise calls',
        value: '92 quality score',
        detail: 'AI co-pilot active on 87% of calls',
        icon: ShieldCheck,
        color: '#34C759',
      },
      {
        id: 'qi-2',
        title: 'WhatsApp escalations',
        value: '3 pending',
        detail: 'Need human approval within SLA',
        icon: MessageCircle,
        color: '#FF9500',
      },
      {
        id: 'qi-3',
        title: 'Risk alerts',
        value: '1 high-risk call',
        detail: 'Sales compliance flagged discount',
        icon: Signal,
        color: '#FF3B30',
      },
    ],
    [],
  );

  const timelineBuckets = useMemo(() => {
    const map: Record<string, number> = {};
    filteredLogs.forEach(log => {
      const day = new Date(log.timestamp).toDateString();
      map[day] = (map[day] ?? 0) + 1;
    });
    return Object.entries(map)
      .map(([day, count]) => ({ day, count }))
      .slice(0, 5);
  }, [filteredLogs]);

  const getCallIcon = (type: string, status: string) => {
    if (status === 'missed') return PhoneMissed;
    if (type === 'incoming') return PhoneIncoming;
    return PhoneOutgoing;
  };

  const getCallColor = (type: string, status: string) => {
    if (status === 'missed') return '#FF3B30';
    if (type === 'incoming') return '#34C759';
    return '#007AFF';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Call Logs',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Call History</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Track voice, WhatsApp, and SMS negotiations</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <View style={styles.statsContainer}
            testID="call-analytics-strip"
          >
            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="call-stat-total"
            >
              <View style={[styles.statIcon, { backgroundColor: '#007AFF20' }]}> 
                <Phone size={20} color="#007AFF" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.total}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Calls</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="call-stat-answered"
            >
              <View style={[styles.statIcon, { backgroundColor: '#34C75920' }]}> 
                <CircleCheck size={20} color="#34C759" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.answered}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Answered</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="call-stat-missed"
            >
              <View style={[styles.statIcon, { backgroundColor: '#FF3B3020' }]}> 
                <PhoneMissed size={20} color="#FF3B30" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.missed}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Missed</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="call-stat-winrate"
            >
              <View style={[styles.statIcon, { backgroundColor: '#34C75920' }]}> 
                <TrendingUp size={20} color="#34C759" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.winRate}%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Win Rate</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="call-stat-duration"
            >
              <View style={[styles.statIcon, { backgroundColor: '#FF950020' }]}> 
                <Clock size={20} color="#FF9500" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.avgDuration}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Duration</Text>
            </View>
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelScroll}
          testID="channel-grid"
        >
          {channelStats.map(channel => {
            const Icon = channel.icon;
            return (
              <TouchableOpacity
                key={channel.id}
                style={[styles.channelCard, { backgroundColor: theme.colors.cardBackground }, channelFilter === channel.id && { borderColor: channel.color, borderWidth: 1 }]}
                onPress={() => setChannelFilter(channel.id as typeof channelFilter)}
              >
                <View style={[styles.channelIcon, { backgroundColor: `${channel.color}20` }]}> 
                  <Icon size={20} color={channel.color} />
                </View>
                <Text style={[styles.channelLabel, { color: theme.colors.secondaryText }]}>{channel.label}</Text>
                <Text style={[styles.channelValue, { color: theme.colors.text }]}>{channel.total}</Text>
                <Text style={[styles.channelTrend, { color: channel.color }]}>{channel.trend}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground }]}
            testID="call-search"
          >
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search calls..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => setShowFilterModal(true)}
          >
            <ListFilter size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.filtersRow}
          testID="call-status-filters"
        >
          {(['all', 'answered', 'missed', 'won', 'lost'] as const).map(filter => (
            <TouchableOpacity
              key={Filter}
              style={[styles.filterChip, selectedFilter === Filter && { backgroundColor: theme.colors.primary }, selectedFilter !== Filter && { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => setSelectedFilter(Filter)}
            >
              <Text style={[styles.filterChipText, { color: selectedFilter === Filter ? '#fff' : theme.colors.text }]}>
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}
          testID="quality-insights"
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quality & Trust</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {qualityInsights.map(insight => {
              const Icon = insight.icon;
              return (
                <View key={insight.id} style={[styles.qualityCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={[styles.qualityIcon, { backgroundColor: `${insight.color}20` }]}> 
                    <Icon size={18} color={insight.color} />
                  </View>
                  <Text style={[styles.qualityTitle, { color: theme.colors.text }]}>{insight.title}</Text>
                  <Text style={[styles.qualityValue, { color: insight.color }]}>{insight.value}</Text>
                  <Text style={[styles.qualityDetail, { color: theme.colors.secondaryText }]}>{insight.detail}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}
          testID="timeline-strip"
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Traffic Timeline</Text>
          <View style={styles.timelineRow}>
            {timelineBuckets.map(bucket => (
              <View key={bucket.day} style={[styles.timelineCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.timelineCount, { color: theme.colors.text }]}>{bucket.count}</Text>
                <Text style={[styles.timelineLabel, { color: theme.colors.secondaryText }]}>{bucket.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{filteredLogs.length} Calls</Text>
            <TouchableOpacity style={styles.exportButton}>
              <Download size={16} color={theme.colors.primary} />
              <Text style={[styles.exportText, { color: theme.colors.primary }]}>Export</Text>
            </TouchableOpacity>
          </View>

          {filteredLogs.map(log => {
            const CallIcon = getCallIcon(log.callType, log.status);
            const callColor = getCallColor(log.callType, log.status);

            return (
              <TouchableOpacity
                key={log.id}
                style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedLog(log)}
                testID={`call-card-${log.id}`}
              >
                <View style={styles.callMain}>
                  <View style={[styles.callIconContainer, { backgroundColor: `${callColor}20` }]}> 
                    <CallIcon size={20} color={callColor} />
                  </View>

                  <View style={styles.callInfo}>
                    <View style={styles.callHeader}>
                      <Text style={[styles.callName, { color: theme.colors.text }]}>{log.customerName}</Text>
                      <View style={[styles.channelPill, { backgroundColor: log.channel === 'voice' ? '#007AFF20' : log.channel === 'whatsapp' ? '#25D36620' : '#FF950020' }]}
                        testID={`channel-pill-${log.id}`}
                      >
                        <Text style={{ color: log.channel === 'voice' ? '#007AFF' : log.channel === 'whatsapp' ? '#25D366' : '#FF9500', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>
                          {log.channel}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.callPhone, { color: theme.colors.secondaryText }]}>{log.customerPhone}</Text>

                    <View style={styles.callMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={12} color={theme.colors.secondaryText} />
                        <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{formatDate(log.timestamp)}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={12} color={theme.colors.secondaryText} />
                        <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{formatTime(log.timestamp)}</Text>
                      </View>
                      {log.duration && log.duration !== '0:00' && (
                        <View style={styles.metaItem}>
                          <Clock size={12} color={theme.colors.secondaryText} />
                          <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{log.duration}</Text>
                        </View>
                      )}
                      {log.dealValue && (
                        <View style={styles.metaItem}>
                          <DollarSign size={12} color={theme.colors.secondaryText} />
                          <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{log.dealValue.toLocaleString()}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.callQualityRow}>
                      <ShieldCheck size={14} color={log.qualityScore > 85 ? '#34C759' : '#FF9500'} />
                      <Text style={[styles.callQualityText, { color: theme.colors.text }]}>{log.qualityScore} quality</Text>
                      <Star size={12} color="#FFC312" />
                      <Text style={[styles.callQualityText, { color: theme.colors.secondaryText }]}>Risk {log.risk}</Text>
                    </View>

                    {log.summary && (
                      <Text style={[styles.callSummary, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                        {log.summary}
                      </Text>
                    )}
                  </View>
                </View>

                {(log.recording || log.transcript) && (
                  <View style={styles.callActions}>
                    {log.recording && (
                      <TouchableOpacity style={styles.actionButton}>
                        <Play size={14} color={theme.colors.primary} />
                        <Text style={[styles.actionText, { color: theme.colors.primary }]}>Play</Text>
                      </TouchableOpacity>
                    )}
                    {log.transcript && (
                      <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/ai-negotiation/transcripts')}>
                        <FileText size={14} color={theme.colors.primary} />
                        <Text style={[styles.actionText, { color: theme.colors.primary }]}>Transcript</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {filteredLogs.length === 0 && (
            <View style={styles.emptyState}>
              <Phone size={48} color={theme.colors.secondaryText} />
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No calls found</Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>Try adjusting your filters</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Filter Calls</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={[styles.modalClose, { color: theme.colors.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}
              testID="call-Filter-calltype"
            >
              <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Call Type</Text>
              <View style={styles.optionsRow}>
                {(['all', 'incoming', 'outgoing'] as const).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.optionButton, selectedCallType === type && { backgroundColor: theme.colors.primary }, selectedCallType !== type && { backgroundColor: theme.colors.background }]}
                    onPress={() => setSelectedCallType(type)}
                  >
                    <Text style={[styles.optionText, { color: selectedCallType === type ? '#fff' : theme.colors.text }]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalSection}
              testID="call-Filter-channel"
            >
              <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>Channel</Text>
              <View style={styles.optionsRow}>
                {(['all', 'voice', 'whatsapp', 'sms'] as const).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.optionButton, channelFilter === type && { backgroundColor: theme.colors.primary }, channelFilter !== type && { backgroundColor: theme.colors.background }]}
                    onPress={() => setChannelFilter(type)}
                  >
                    <Text style={[styles.optionText, { color: channelFilter === type ? '#fff' : theme.colors.text }]}>{type.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: theme.colors.background }]}
              onPress={() => {
                setSelectedFilter('all');
                setSelectedCallType('all');
                setChannelFilter('all');
                setSearchQuery('');
              }}
            >
              <Text style={[styles.resetText, { color: theme.colors.primary }]}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={!!selectedLog} transparent animationType="slide" onRequestClose={() => setSelectedLog(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.detailModalContent, { backgroundColor: theme.colors.background }]}
            testID="call-detail-modal"
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Call Detail</Text>
              <TouchableOpacity onPress={() => setSelectedLog(null)}>
                <Text style={[styles.modalClose, { color: theme.colors.primary }]}>Close</Text>
              </TouchableOpacity>
            </View>
            {selectedLog && (
              <ScrollView style={styles.modalBody}>
                <Text style={[styles.detailTitle, { color: theme.colors.text }]}>{selectedLog.customerName}</Text>
                <Text style={[styles.detailSubtitle, { color: theme.colors.secondaryText }]}>{selectedLog.customerPhone}</Text>
                <View style={styles.detailRowSplit}>
                  <Text style={[styles.detailValueMain, { color: theme.colors.text }]}>{selectedLog.qualityScore} quality</Text>
                  <Text style={[styles.detailValueMain, { color: selectedLog.risk === 'high' ? '#FF3B30' : selectedLog.risk === 'medium' ? '#FF9500' : '#34C759' }]}>Risk {selectedLog.risk}</Text>
                </View>
                <View style={styles.detailChipsRow}>
                  <View style={[styles.channelPill, { backgroundColor: '#F2F2F7' }]}> 
                    <Text style={{ color: '#007AFF', fontWeight: '600' }}>{selectedLog.channel.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.channelPill, { backgroundColor: '#F2F2F7' }]}> 
                    <Text style={{ color: '#007AFF', fontWeight: '600' }}>{formatDate(selectedLog.timestamp)}</Text>
                  </View>
                  <View style={[styles.channelPill, { backgroundColor: '#F2F2F7' }]}> 
                    <Text style={{ color: '#007AFF', fontWeight: '600' }}>{formatTime(selectedLog.timestamp)}</Text>
                  </View>
                </View>
                {selectedLog.summary && (
                  <View style={styles.detailSummaryCard}>
                    <Text style={[styles.detailSectionTitle, { color: theme.colors.text }]}>Summary</Text>
                    <Text style={[styles.detailSummaryText, { color: theme.colors.secondaryText }]}>{selectedLog.summary}</Text>
                  </View>
                )}
                <View style={styles.detailSummaryCard}>
                  <Text style={[styles.detailSectionTitle, { color: theme.colors.text }]}>Next Actions</Text>
                  <Text style={[styles.detailSummaryText, { color: theme.colors.secondaryText }]}>Sync transcript to CRM, trigger AI recap, and notify deal owner.</Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  statCard: {
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
  },
  channelScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  channelCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  channelLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  channelValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  channelTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  qualityCard: {
    width: 220,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  qualityIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  qualityTitle: {
    fontSize: 13,
    marginBottom: 4,
  },
  qualityValue: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  qualityDetail: {
    fontSize: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineCard: {
    flex: 1,
    minWidth: (width - 64) / 3,
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  timelineCount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineLabel: {
    fontSize: 11,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '500',
  },
  callCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  callMain: {
    flexDirection: 'row',
    gap: 12,
  },
  callIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callInfo: {
    flex: 1,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600',
  },
  channelPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  callPhone: {
    fontSize: 13,
    marginBottom: 8,
  },
  callMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  callQualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  callQualityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  callSummary: {
    fontSize: 13,
    lineHeight: 18,
  },
  callActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalClose: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resetButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailModalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    maxHeight: '85%',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailRowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailValueMain: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailChipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailSummaryCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  detailSummaryText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
