 
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Switch,
} from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Phone,
  Clock,
  Star,
  Calendar,
  PhoneMissed,
  CheckCircle,
  Users,
  Activity,
  Zap,
  RefreshCw,
  Shield,
  Server,
  Layers,
  AlertTriangle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchReceptionistAnalytics } from '@/utils/receptionistService';
import type { ReceptionistAnalyticsPayload, ReceptionistRealtimeInsight, TrendDirection } from '@/types/receptionist';

const { width } = Dimensions.get('window');

const formatTrendColor = (trend: TrendDirection, positiveContext: boolean) => {
  if ((trend === 'up' && positiveContext) || (trend === 'down' && !positiveContext)) {
    return '#34C759';
  }
  return '#FF3B30';
};

export default function ReceptionistAnalyticsScreen() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [logFilter, setLogFilter] = useState<'all' | 'errors' | 'security'>('all');
  const [autoMitigation, setAutoMitigation] = useState<boolean>(true);
  const [safeRecording, setSafeRecording] = useState<boolean>(false);

  const { data, isLoading, refetch, isRefetching } = useQuery<ReceptionistAnalyticsPayload>({
    queryKey: ['receptionist-analytics', selectedPeriod],
    queryFn: () => fetchReceptionistAnalytics(),
    staleTime: 60 * 1000,
  });

  const analytics = data?.analytics;
  const highlights: ReceptionistRealtimeInsight[] = data?.highlights ?? [];

  const answeredRate = useMemo(() => {
    if (!analytics || analytics.totalCalls === 0) {
      return 0;
    }
    return Math.round((analytics.answeredCalls / analytics.totalCalls) * 100);
  }, [analytics]);

  const metrics = useMemo(() => {
    if (!analytics) {
      return [];
    }
    return [
      {
        key: 'total',
        title: 'Total Calls',
        value: analytics.totalCalls.toLocaleString(),
        change: `${answeredRate}% answered`,
        icon: Phone,
        color: '#007AFF',
        trend: 'up' as TrendDirection,
        positive: true,
      },
      {
        key: 'answered',
        title: 'Answered',
        value: analytics.answeredCalls.toLocaleString(),
        change: `${analytics.missedCalls} missed`,
        icon: CheckCircle,
        color: '#34C759',
        trend: 'up' as TrendDirection,
        positive: true,
      },
      {
        key: 'missed',
        title: 'Missed Calls',
        value: analytics.missedCalls.toLocaleString(),
        change: `${analytics.totalCalls ? Math.round((analytics.missedCalls / analytics.totalCalls) * 100) : 0}% of traffic`,
        icon: PhoneMissed,
        color: '#FF3B30',
        trend: 'down' as TrendDirection,
        positive: false,
      },
      {
        key: 'response',
        title: 'Avg Response',
        value: analytics.avgResponseTime?.current ?? analytics.avgHandleTime,
        change: analytics.avgResponseTime ? `${Math.abs(analytics.avgResponseTime.change)}% vs last` : 'Real-time SLA',
        icon: Clock,
        color: '#FF9500',
        trend: analytics.avgResponseTime?.trend ?? 'down',
        positive: false,
      },
      {
        key: 'satisfaction',
        title: 'Satisfaction',
        value: analytics.satisfaction ? `${analytics.satisfaction.current}/5.0` : '4.8/5.0',
        change: analytics.satisfaction ? `${analytics.satisfaction.change > 0 ? '+' : ''}${analytics.satisfaction.change}% QoQ` : '+4.3% QoQ',
        icon: Star,
        color: '#FFCC02',
        trend: analytics.satisfaction?.trend ?? 'up',
        positive: true,
      },
      {
        key: 'appointments',
        title: 'Appointments',
        value: analytics.appointmentsBooked ? analytics.appointmentsBooked.current.toLocaleString() : '0',
        change: analytics.appointmentsBooked ? `${analytics.appointmentsBooked.change > 0 ? '+' : ''}${analytics.appointmentsBooked.change}% this period` : 'No change',
        icon: Calendar,
        color: '#AF52DE',
        trend: analytics.appointmentsBooked?.trend ?? 'up',
        positive: true,
      },
    ];
  }, [analytics, answeredRate]);

  const categories: { name: string; count: number; percentage: number }[] = analytics?.categories ?? [];
  const hourlyLoad: { hour: string; calls: number }[] = analytics?.hourlyLoad ?? [];

  type LogEntry = { id: string; timestamp: string; message: string; level: 'info' | 'errors' | 'security'; source: string };

  const logStream = useMemo<LogEntry[]>(
    () => [
      {
        id: '1',
        timestamp: '09:42:12',
        message: 'Auto-mitigated packet loss on LAX edge cluster',
        level: 'info',
        source: 'Edge orchestrator',
      },
      {
        id: '2',
        timestamp: '09:35:44',
        message: 'Escalated VIP caller after 2 failed intents',
        level: 'errors',
        source: 'AI guardrail',
      },
      {
        id: '3',
        timestamp: '09:30:01',
        message: 'PII redaction applied to transcript',
        level: 'security',
        source: 'Compliance core',
      },
      {
        id: '4',
        timestamp: '09:25:18',
        message: 'DR heartbeat confirmed for FRA region',
        level: 'info',
        source: 'Resiliency monitor',
      },
    ],
    [],
  );

  const filteredLogs = useMemo(() => {
    if (logFilter === 'all') {
      return logStream;
    }
    return logStream.filter(log => log.level === logFilter);
  }, [logFilter, logStream]);

  const resiliencyCards = useMemo(
    () => [
      { id: 'redundancy', title: 'Redundancy', body: 'Active/Active · 4 regions live', icon: Layers, color: '#007AFF' },
      { id: 'failover', title: 'Failover drills', body: 'Last test 3h ago · 0 impact', icon: Server, color: '#34C759' },
      { id: 'compliance', title: 'Compliance', body: safeRecording ? 'Recording stored in EU vault' : 'Recording disabled', icon: Shield, color: '#FF9500' },
    ],
    [safeRecording],
  );

  const renderMetricCard = useCallback(
    (metric: (typeof metrics)[number]) => {
      const Icon = metric.icon;
      const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
      const trendColor = formatTrendColor(metric.trend, metric.positive);
      return (
        <View
          key={metric.key}
          style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
          testID={`receptionist-analytics-metric-${metric.key}`}
        >
          <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}
            testID={`receptionist-analytics-metric-icon-${metric.key}`}>
            <Icon size={22} color={metric.color} />
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
          <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{metric.title}</Text>
          <View style={styles.metricChange}>
            <TrendIcon size={14} color={trendColor} />
            <Text style={[styles.metricChangeText, { color: trendColor }]}>{metric.change}</Text>
          </View>
        </View>
      );
    },
    [theme.colors.cardBackground, theme.colors.secondaryText, theme.colors.text],
  );

  if (!analytics && isLoading) {
    return (
      <View style={[styles.loadingScreen, { backgroundColor: theme.colors.background }]}
        testID="receptionist-analytics-loading">
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>Loading live analytics...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="receptionist-analytics-screen">
      <Stack.Screen
        options={{
          title: 'Analytics',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={() => refetch()}>
              {isRefetching ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <RefreshCw size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.colors.primary} />}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Performance Analytics</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}
            testID="receptionist-analytics-subtitle">
            Real-time AI receptionist telemetry, trust & reliability
          </Text>
        </View>

        <View style={[styles.realtimeBanner, { backgroundColor: theme.colors.cardBackground }]}
          testID="receptionist-analytics-realtime">
          <View style={styles.bannerLeft}>
            <View style={styles.liveDot} />
            <Text style={[styles.bannerTitle, { color: theme.colors.text }]}>Streaming</Text>
            <Text style={[styles.bannerBody, { color: theme.colors.secondaryText }]}>WebSocket feed active</Text>
          </View>
          <TouchableOpacity style={styles.bannerButton} onPress={() => refetch()}>
            <Zap size={18} color={theme.colors.primary} />
            <Text style={[styles.bannerButtonText, { color: theme.colors.primary }]}>Sync now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.periodSelector}>
          {(['today', 'week', 'month', 'year'] as const).map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                { backgroundColor: selectedPeriod === period ? theme.colors.primary : theme.colors.cardBackground },
              ]}
              onPress={() => setSelectedPeriod(period)}
              testID={`receptionist-analytics-period-${period}`}
            >
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? 'white' : theme.colors.secondaryText },
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map(renderMetricCard)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reliability Controls</Text>
          <View style={[styles.controlCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-analytics-controls">
            <View style={styles.controlRow}>
              <View style={styles.controlInfo}>
                <Text style={[styles.controlLabel, { color: theme.colors.text }]}>Auto mitigation</Text>
                <Text style={[styles.controlDescription, { color: theme.colors.secondaryText }]}>Automatically reroute load when jitter spikes</Text>
              </View>
              <Switch
                value={autoMitigation}
                onValueChange={value => {
                  console.log('Auto mitigation toggled', value);
                  setAutoMitigation(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={autoMitigation ? '#fff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.controlRow}>
              <View style={styles.controlInfo}>
                <Text style={[styles.controlLabel, { color: theme.colors.text }]}>Secure call recording</Text>
                <Text style={[styles.controlDescription, { color: theme.colors.secondaryText }]}>Encrypt media at rest inside preferred region</Text>
              </View>
              <Switch
                value={safeRecording}
                onValueChange={value => {
                  console.log('Safe recording toggled', value);
                  setSafeRecording(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={safeRecording ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.resiliencyScroll}>
            {resiliencyCards.map(card => {
              const Icon = card.icon;
              return (
                <View key={card.id} style={[styles.resiliencyCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-analytics-resiliency-${card.id}`}>
                  <View style={[styles.resiliencyIcon, { backgroundColor: `${card.color}20` }]}>
                    <Icon size={16} color={card.color} />
                  </View>
                  <Text style={[styles.resiliencyTitle, { color: theme.colors.text }]}>{card.title}</Text>
                  <Text style={[styles.resiliencyBody, { color: theme.colors.secondaryText }]}>{card.body}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Distribution</Text>
          <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
            {categories.map(category => (
              <View key={category.name} style={styles.categoryRow}
                testID={`receptionist-analytics-category-${category.name}`}>
                <View style={styles.categoryLeft}>
                  <Text style={[styles.categoryName, { color: theme.colors.text }]}>{category.name}</Text>
                  <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>
                    {category.count.toLocaleString()} calls
                  </Text>
                </View>
                <View style={styles.categoryRight}>
                  <View style={[styles.progressBar, { backgroundColor: `${theme.colors.text}10` }]}
                    testID={`receptionist-analytics-category-progress-${category.name}`}>
                    <View
                      style={[styles.progressFill, { backgroundColor: theme.colors.primary, width: `${category.percentage}%` }]}
                    />
                  </View>
                  <Text style={[styles.categoryPercentage, { color: theme.colors.text }]}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Peak Hours</Text>
          <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.peakHoursChart}>
              {hourlyLoad.map(slot => {
                const maxCalls = Math.max(...hourlyLoad.map(item => item.calls), 1);
                const height = (slot.calls / maxCalls) * 120;
                return (
                  <View key={slot.hour} style={styles.barContainer}
                    testID={`receptionist-analytics-peak-${slot.hour}`}>
                    <View style={styles.barWrapper}>
                      <View style={[styles.bar, { height, backgroundColor: theme.colors.primary }]} />
                    </View>
                    <Text style={[styles.barLabel, { color: theme.colors.secondaryText }]}>{slot.hour}</Text>
                    <Text style={[styles.barValue, { color: theme.colors.text }]}>{slot.calls}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Reliability Logs</Text>
          <View style={styles.logFilterRow}>
            {(['all', 'errors', 'security'] as const).map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.logFilterButton,
                  { backgroundColor: logFilter === filter ? theme.colors.primary : theme.colors.cardBackground },
                ]}
                onPress={() => setLogFilter(filter)}
                testID={`receptionist-analytics-log-filter-${filter}`}
              >
                <Text
                  style={[
                    styles.logFilterText,
                    { color: logFilter === filter ? 'white' : theme.colors.secondaryText },
                  ]}
                >
                  {filter === 'all' ? 'All' : filter === 'errors' ? 'Errors' : 'Security'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.logCard, { backgroundColor: theme.colors.cardBackground }]}>
            {filteredLogs.map(log => (
              <View key={log.id} style={styles.logRow} testID={`receptionist-analytics-log-${log.id}`}>
                <View style={styles.logIcon}>
                  {log.level === 'errors' ? (
                    <AlertTriangle size={16} color="#FF3B30" />
                  ) : log.level === 'security' ? (
                    <Shield size={16} color={theme.colors.primary} />
                  ) : (
                    <Activity size={16} color={theme.colors.primary} />
                  )}
                </View>
                <View style={styles.logInfo}>
                  <Text style={[styles.logMessage, { color: theme.colors.text }]}>{log.message}</Text>
                  <Text style={[styles.logMeta, { color: theme.colors.secondaryText }]}>
                    {log.timestamp} · {log.source}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Highlights</Text>
          {highlights.map(item => (
            <View
              key={item.label}
              style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`receptionist-analytics-highlight-${item.label}`}
            >
              <View style={styles.insightRow}>
                <Activity size={20} color={item.sentiment === 'down' ? '#FF3B30' : item.sentiment === 'up' ? '#34C759' : theme.colors.primary} />
                <Text style={[styles.insightText, { color: theme.colors.text }]}> {item.label} </Text>
              </View>
              <View style={styles.highlightFooter}>
                <Text style={[styles.highlightValue, { color: theme.colors.text }]}>{item.value}</Text>
                <Text style={[styles.highlightChange, { color: item.sentiment === 'down' ? '#FF3B30' : item.sentiment === 'up' ? '#34C759' : theme.colors.secondaryText }]}>
                  {item.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Teams</Text>
          <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-analytics-teams">
            {[1, 2, 3].map(rank => (
              <View key={rank} style={styles.teamRow}>
                <View style={styles.teamAvatar}>
                  <Users size={16} color={theme.colors.primary} />
                </View>
                <View style={styles.teamInfo}>
                  <Text style={[styles.teamName, { color: theme.colors.text }]}>Pod {rank}</Text>
                  <Text style={[styles.teamSubtitle, { color: theme.colors.secondaryText }]}>Enterprise queue</Text>
                </View>
                <Text style={[styles.teamMetric, { color: theme.colors.text }]}>{rank === 1 ? '98%' : rank === 2 ? '94%' : '92%'}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
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
  headerButton: {
    padding: 8,
    marginRight: 8,
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
  realtimeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  bannerBody: {
    fontSize: 13,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    marginBottom: 6,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  controlCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  controlInfo: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  controlDescription: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 14,
  },
  resiliencyScroll: {
    paddingVertical: 4,
    gap: 12,
  },
  resiliencyCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  resiliencyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  resiliencyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  resiliencyBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  logFilterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  logFilterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  logFilterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  logIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  logInfo: {
    flex: 1,
  },
  logMessage: {
    fontSize: 14,
    fontWeight: '600',
  },
  logMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  chartCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryLeft: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
  },
  categoryRight: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 6,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  peakHoursChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 24,
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  highlightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  highlightValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  highlightChange: {
    fontSize: 13,
    fontWeight: '600',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  teamAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '600',
  },
  teamSubtitle: {
    fontSize: 12,
  },
  teamMetric: {
    fontSize: 14,
    fontWeight: '700',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
});
