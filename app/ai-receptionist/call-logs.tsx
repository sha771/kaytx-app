 
import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  Calendar,
  FileText,
  X,
  ListFilter,
  Search,
  TrendingUp,
  MessageSquare,
  Star,
  Download,
  TriangleAlert,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
} from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import type {
  ReceptionistCallLog,
  ReceptionistCategory,
  ReceptionistCallStatus,
  ReceptionistSentiment,
} from '@/types/receptionist';

const timeRangeDurations: Record<'24h' | '7d' | '30d' | 'all', number | null> = {
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
  all: null,
};

const sentimentFilters: { id: ReceptionistSentiment; label: string }[] = [
  { id: 'positive', label: 'Positive' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'negative', label: 'Negative' },
];

const statusFilters: { id: ReceptionistCallStatus; label: string }[] = [
  { id: 'answered', label: 'Answered' },
  { id: 'missed', label: 'Missed' },
  { id: 'voicemail', label: 'Voicemail' },
];

const categoryFilters: { id: ReceptionistCategory; label: string }[] = [
  { id: 'inquiry', label: 'Inquiry' },
  { id: 'appointment', label: 'Appointment' },
  { id: 'support', label: 'Support' },
  { id: 'sales', label: 'Sales' },
  { id: 'missed', label: 'Missed' },
  { id: 'other', label: 'Other' },
];

export default function CallLogsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'incoming' | 'outgoing' | 'missed'>('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<ReceptionistCallLog | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<{
    status: 'all' | ReceptionistCallStatus;
    sentiment: 'all' | ReceptionistSentiment;
    category: 'all' | ReceptionistCategory;
    timeRange: '24h' | '7d' | '30d' | 'all';
  }>({ status: 'all', sentiment: 'all', category: 'all', timeRange: '7d' });

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: callLogs = [], isLoading, refetch, isRefetching } = trpc.receptionist.getCallLogs.useQuery(undefined, {
    staleTime: 60 * 1000,
  });

  const { data: analytics } = trpc.receptionist.getAnalytics.useQuery();

  const analyticsPayload = useMemo(() => {
    if (!analytics) return undefined;
    
    // Fallback highlights if not provided by backend
    const highlights = [
      { label: 'Peak Hour', value: '2 PM - 4 PM', sentiment: 'neutral' as const },
      { label: 'Missed Calls', value: analytics.missedCalls.toString(), sentiment: analytics.missedCalls > 5 ? 'down' as const : 'up' as const },
    ];

    return { analytics, highlights };
  }, [analytics]);

  const filteredCalls = useMemo(() => {
    if (!callLogs.length) {
      return [];
    }

    return callLogs.filter(call => {
      const searchMatch =
        call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.callerPhone.includes(searchQuery) ||
        call.summary?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!searchMatch) {
        return false;
      }

      if (selectedFilter === 'incoming' && call.callType !== 'incoming') {
        return false;
      }
      if (selectedFilter === 'outgoing' && call.callType !== 'outgoing') {
        return false;
      }
      if (selectedFilter === 'missed' && call.status !== 'missed') {
        return false;
      }

      if (filters.status !== 'all' && call.status !== filters.status) {
        return false;
      }
      if (filters.sentiment !== 'all' && call.sentiment !== filters.sentiment) {
        return false;
      }
      if (filters.category !== 'all' && call.category !== filters.category) {
        return false;
      }
      const durationLimit = timeRangeDurations[filters.timeRange];
      if (durationLimit) {
        const now = Date.now();
        const callTime = new Date(call.timestamp).getTime();
        if (now - callTime > durationLimit) {
          return false;
        }
      }
      return true;
    });
  }, [callLogs, searchQuery, selectedFilter, filters]);

  const getCallIcon = useCallback((type: string) => {
    switch (type) {
      case 'incoming':
        return PhoneIncoming;
      case 'outgoing':
        return PhoneOutgoing;
      default:
        return Phone;
    }
  }, []);

  const getCallColor = useCallback((type: string) => {
    switch (type) {
      case 'incoming':
        return '#34C759';
      case 'outgoing':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  }, []);

  const getSentimentColor = useCallback((sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return '#34C759';
      case 'neutral':
        return '#FF9500';
      case 'negative':
        return '#FF3B30';
      default:
        return theme.colors.secondaryText;
    }
  }, [theme.colors.secondaryText]);

  const handleAdvancedFilter = useCallback(
    (
      key: 'status' | 'sentiment' | 'category',
      value: ReceptionistCallStatus | ReceptionistSentiment | ReceptionistCategory,
    ) => {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key] === value ? 'all' : value,
      }));
    },
    [],
  );

  const handleResetFilters = useCallback(() => {
    setFilters({ status: 'all', sentiment: 'all', category: 'all', timeRange: '7d' });
    setSelectedFilter('all');
  }, []);

  const renderStats = () => {
    if (!analyticsPayload) {
      return null;
    }

    const { analytics, highlights } = analyticsPayload;
    const answeredRate = analytics.totalCalls === 0 ? 0 : Math.round((analytics.answeredCalls / analytics.totalCalls) * 100);
    const missedRate = analytics.totalCalls === 0 ? 0 : Math.round((analytics.missedCalls / analytics.totalCalls) * 100);

    const statCards = [
      {
        id: 'volume',
        title: 'Total Volume',
        value: analytics.totalCalls.toLocaleString(),
        delta: `Answered ${answeredRate}%`,
        icon: Phone,
        color: '#007AFF',
        trendIcon: ArrowUpRight,
      },
      {
        id: 'missed',
        title: 'Missed Calls',
        value: analytics.missedCalls.toString(),
        delta: `${missedRate}% of traffic`,
        icon: PhoneMissed,
        color: '#FF3B30',
        trendIcon: ArrowDownRight,
      },
      {
        id: 'handle',
        title: 'Avg Handle Time',
        value: analytics.avgHandleTime,
        delta: 'Goal < 3:00',
        icon: Clock,
        color: '#FFCC02',
        trendIcon: ArrowDownRight,
      },
      {
        id: 'sentiment',
        title: 'Positive Sentiment',
        value: `${analytics.positiveSentimentRate}%`,
        delta: 'AI summaries',
        icon: TrendingUp,
        color: '#34C759',
        trendIcon: ArrowUpRight,
      },
    ];

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsRow}
          testID="receptionist-call-stats"
        >
          {statCards.map(card => {
            const Icon = card.icon;
            const TrendIcon = card.trendIcon;
            return (
              <View key={card.id} style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
                testID={`receptionist-stat-${card.id}`}>
                {!isEnterprise && (
                  <TouchableOpacity 
                    style={styles.lockOverlay}
                    onPress={() => router.push('/enterprise-admin')}
                  >
                    <Lock size={20} color={theme.colors.text} />
                  </TouchableOpacity>
                )}
                <View style={[styles.statCardIcon, { backgroundColor: `${card.color}20` }]}> 
                  <Icon size={18} color={card.color} />
                </View>
                <Text style={[styles.statCardValue, { color: theme.colors.text }]}>{card.value}</Text>
                <Text style={[styles.statCardTitle, { color: theme.colors.secondaryText }]}>{card.title}</Text>
                <View style={styles.statDeltaRow}>
                  <TrendIcon size={14} color={card.color} />
                  <Text style={[styles.statDelta, { color: card.color }]}>{card.delta}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.highlightGrid}>
          {highlights.map(highlight => (
            <View
              key={highlight.label}
              style={[styles.highlightCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={styles.highlightHeader}>
                <Text style={[styles.highlightLabel, { color: theme.colors.secondaryText }]}>
                  {highlight.label}
                </Text>
                <TriangleAlert
                  size={16}
                  color={highlight.sentiment === 'down' ? '#FF3B30' : highlight.sentiment === 'up' ? '#34C759' : theme.colors.secondaryText}
                />
              </View>
              <Text style={[styles.highlightValue, { color: theme.colors.text }]}>{highlight.value}</Text>
              <Text
                style={[styles.highlightChange, {
                  color: highlight.sentiment === 'down'
                    ? '#FF3B30'
                    : highlight.sentiment === 'up'
                    ? '#34C759'
                    : theme.colors.secondaryText,
                }]}
              >
                {highlight.change}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="receptionist-call-logs-screen">
      <Stack.Screen
        options={{
          title: 'Call Logs',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => refetch()}>
              {isRefetching ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Download size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Call Intelligence</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}
          testID="receptionist-call-logs-subtitle">
          Advanced filtering, AI summaries, and compliance-grade audit trails
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}
          testID="receptionist-call-search">
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search caller, phone, or summary..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            testID="receptionist-call-search-input"
          />
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => setShowFilterModal(true)}
          testID="receptionist-Filter-toggle"
        >
          <ListFilter size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
        testID="receptionist-primary-filters"
      >
        {(['all', 'incoming', 'outgoing', 'missed'] as const).map(Filter => (
          <TouchableOpacity
            key={Funnel}
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  selectedFilter === Filter ? theme.colors.primary : theme.colors.cardBackground,
              },
            ]}
            onPress={() => setSelectedFilter(Filter)}
            testID={`receptionist-Filter-${Funnel}`}
          >
            <Text
              style={{
                color: selectedFilter === Filter ? 'white' : theme.colors.text,
                fontWeight: '600',
              }}
            >
              {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderStats()}

      <FlatList
        data={filteredCalls}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.colors.primary} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          !isLoading ? (
            <View style={styles.emptyState}>
              <MessageSquare size={32} color={theme.colors.secondaryText} />
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No calls match these filters</Text>
              <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
                Try updating your search or reset filters to view all conversations.
              </Text>
              <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleResetFilters}
                testID="receptionist-reset-filters"
              >
                <Text style={styles.resetButtonText}>Reset filters</Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
        renderItem={({ item }) => {
          const CallIcon = getCallIcon(item.callType);
          const callColor = getCallColor(item.callType);
          return (
            <TouchableOpacity
              style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {
                setSelectedCall(item);
                setShowDetailsModal(true);
              }}
              testID={`receptionist-call-${item.id}`}
            >
              <View style={[styles.callIcon, { backgroundColor: `${callColor}20` }]}
                testID={`receptionist-call-icon-${item.id}`}>
                <CallIcon size={20} color={callColor} />
              </View>
              <View style={styles.callInfo}>
                <View style={styles.callHeader}>
                  <Text style={[styles.callerName, { color: theme.colors.text }]}>{item.callerName}</Text>
                  <Text style={[styles.callTime, { color: theme.colors.secondaryText }]}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Text style={[styles.callerPhone, { color: theme.colors.secondaryText }]}>{item.callerPhone}</Text>
                {item.summary && (
                  <Text
                    style={[styles.callSummary, { color: theme.colors.secondaryText }]}
                    numberOfLines={2}
                  >
                    {item.summary}
                  </Text>
                )}
                <View style={styles.callMeta}>
                  <View style={styles.metaLeft}>
                    <Clock size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>{item.duration}</Text>
                    {item.category && (
                      <View style={[styles.categoryTag, { backgroundColor: `${theme.colors.primary}15` }]}
                        testID={`receptionist-category-${item.category}`}>
                        <Text style={[styles.categoryTagText, { color: theme.colors.primary }]}>
                          {item.category}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.metaRight}>
                    {item.sentiment && (
                      <View style={[styles.sentimentBadge, { backgroundColor: `${getSentimentColor(item.sentiment)}20` }]}>
                        <Text style={[styles.sentimentText, { color: getSentimentColor(item.sentiment) }]}>
                          {item.sentiment}
                        </Text>
                      </View>
                    )}
                    <Star size={12} color="#FFCC02" fill="none" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        testID="receptionist-call-logs-list"
      />

      {(isLoading || isRefetching) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      <Modal
        visible={showDetailsModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-call-details">
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Call Details</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {selectedCall && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.detailSection}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Caller</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedCall.callerName}</Text>
                  <Text style={[styles.detailSubValue, { color: theme.colors.secondaryText }]}>{selectedCall.callerPhone}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Call Summary</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedCall.summary ?? 'No AI summary recorded.'}</Text>
                </View>

                <View style={styles.detailMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.metaItemText, { color: theme.colors.secondaryText }]}>Duration: {selectedCall.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Calendar size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.metaItemText, { color: theme.colors.secondaryText }]}>
                      {new Date(selectedCall.timestamp).toLocaleString()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.exportButton, { backgroundColor: theme.colors.primary }]}
                  onPress={() => setShowDetailsModal(false)}
                >
                  <FileText size={16} color="white" />
                  <Text style={styles.exportButtonText}>Open Transcript</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.filterModalContent, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-advanced-filters">
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Advanced Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalBody}>
              <Text style={[styles.filterGroupLabel, { color: theme.colors.text }]}>Sentiment</Text>
              <View style={styles.filterGroupRow}>
                {sentimentFilters.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterPill,
                      {
                        backgroundColor:
                          filters.sentiment === option.id ? theme.colors.primary : theme.colors.background,
                      },
                    ]}
                    onPress={() => handleAdvancedFilter('sentiment', option.id)}
                  >
                    <Text style={{ color: filters.sentiment === option.id ? 'white' : theme.colors.text }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.filterGroupLabel, { color: theme.colors.text }]}>Status</Text>
              <View style={styles.filterGroupRow}>
                {statusFilters.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterPill,
                      {
                        backgroundColor:
                          filters.status === option.id ? theme.colors.primary : theme.colors.background,
                      },
                    ]}
                    onPress={() => handleAdvancedFilter('status', option.id)}
                  >
                    <Text style={{ color: filters.status === option.id ? 'white' : theme.colors.text }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.filterGroupLabel, { color: theme.colors.text }]}>Category</Text>
              <View style={styles.filterGroupRow}>
                {categoryFilters.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterPill,
                      {
                        backgroundColor:
                          filters.category === option.id ? theme.colors.primary : theme.colors.background,
                      },
                    ]}
                    onPress={() => handleAdvancedFilter('category', option.id)}
                  >
                    <Text style={{ color: filters.category === option.id ? 'white' : theme.colors.text }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.filterGroupLabel, { color: theme.colors.text }]}>Time Range</Text>
              <View style={styles.filterGroupRow}>
                {(['24h', '7d', '30d', 'all'] as const).map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterPill,
                      {
                        backgroundColor:
                          filters.timeRange === option ? theme.colors.primary : theme.colors.background,
                      },
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, timeRange: option }))}
                  >
                    <Text style={{ color: filters.timeRange === option ? 'white' : theme.colors.text }}>
                      {option.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setShowFilterModal(false)}
              >
                <RefreshCw size={18} color="white" />
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearFilters} onPress={handleResetFilters}>
                <Text style={[styles.clearFiltersText, { color: theme.colors.secondaryText }]}>Clear all</Text>
              </TouchableOpacity>
            </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statsRow: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: 220,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  statCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statCardTitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  statDeltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statDelta: {
    fontSize: 12,
    fontWeight: '600',
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  highlightCard: {
    flex: 1,
    minWidth: 150,
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  highlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  highlightLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  highlightChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  callCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  callIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  callerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  callTime: {
    fontSize: 12,
  },
  callerPhone: {
    fontSize: 13,
    marginBottom: 6,
  },
  callSummary: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  callMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
  },
  sentimentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sentimentText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  resetButton: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  filterModalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  detailSubValue: {
    fontSize: 14,
    marginTop: 4,
  },
  detailMeta: {
    gap: 12,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaItemText: {
    fontSize: 14,
  },
  exportButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterGroupLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  filterGroupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  applyButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearFilters: {
    alignItems: 'center',
    marginTop: 12,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
