// Type definitions for receptionist service
import type { 
  ReceptionistCallType, 
  ReceptionistCallStatus, 
  ReceptionistSentiment, 
  ReceptionistCategory,
  ReceptionistCallLog,
  ReceptionistCallAnalytics 
} from '../types/receptionist';

import {
  ReceptionistAnalyticsPayload,
  ReceptionistRealtimeInsight,
  NumericTrendMetric,
  StringTrendMetric,
  TrendDirection,
} from '@/types/receptionist';

// Mock data for receptionist service
const mockReceptionistAnalytics: ReceptionistCallAnalytics = {
  totalCalls: 1250,
  answeredCalls: 1180,
  missedCalls: 70,
  avgHandleTime: '4:05',
  positiveSentimentRate: 78,
  categories: [
    { name: 'general', count: 450, percentage: 36 },
    { name: 'appointments', count: 320, percentage: 26 },
    { name: 'emergencies', count: 180, percentage: 14 },
    { name: 'information', count: 300, percentage: 24 },
  ],
  hourlyLoad: [
    { hour: '09:00', calls: 145, load: 0.72 },
    { hour: '10:00', calls: 189, load: 0.95 },
    { hour: '14:00', calls: 167, load: 0.84 },
    { hour: '15:00', calls: 178, load: 0.89 },
  ],
  appointmentsBooked: { current: 45, change: 3, trend: 'up' },
  avgResponseTime: { current: '2:30', change: -15, trend: 'up' },
  satisfaction: { current: 92, change: 2, trend: 'up' },
};

const mockReceptionistCallLogs = [
  {
    id: '1',
    callId: 'call-1',
    callerName: 'John Doe',
    callerPhone: '+1234567890',
    callType: 'inbound',
    duration: '4:05',
    timestamp: new Date('2026-01-29T10:30:00Z'),
    status: 'answered',
    summary: 'Scheduled appointment for next week',
    sentiment: 'positive',
    category: 'appointments',
  },
  {
    id: '2',
    callId: 'call-2',
    callerName: 'Jane Smith',
    callerPhone: '+0987654321',
    callType: 'inbound',
    duration: '3:09',
    timestamp: new Date('2026-01-29T11:45:00Z'),
    status: 'answered',
    summary: 'General inquiry resolved',
    sentiment: 'neutral',
    category: 'general',
  },
];

const delay = (ms: number = 320) => new Promise(resolve => setTimeout(resolve, ms));

const mapNumericTrendMetric = (
  metric?: { current: number; change: number; trend: TrendDirection },
): NumericTrendMetric | undefined =>
  metric
    ? {
        current: metric.current,
        change: metric.change,
        trend: metric.trend,
      }
    : undefined;

const mapStringTrendMetric = (
  metric?: { current: string; change: number; trend: TrendDirection },
): StringTrendMetric | undefined =>
  metric
    ? {
        current: metric.current,
        change: metric.change,
        trend: metric.trend,
      }
    : undefined;

const parseDurationToSeconds = (value: string) => {
  if (!value.includes(':')) {
    return Number(value) || 0;
  }
  const segments = value.split(':').map(segment => Number(segment));
  if (segments.length === 3) {
    const [hours = 0, minutes = 0, seconds = 0] = segments;
    return hours * 3600 + minutes * 60 + seconds;
  }
  const [minutes = 0, seconds = 0] = segments;
  return minutes * 60 + seconds;
};

const formatSeconds = (seconds: number) => {
  if (seconds <= 0) {
    return '0:00';
  }
  const wholeMinutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.max(0, Math.round(seconds - wholeMinutes * 60));
  return `${wholeMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const normalizeCallLog = (log: typeof mockReceptionistCallLogs[number]): ReceptionistCallLog => ({
  id: log.id,
  callId: log.callId,
  callerName: log.callerName,
  callerPhone: log.callerPhone,
  callType: log.callType as ReceptionistCallType,
  duration: log.duration,
  timestamp: log.timestamp.toISOString(),
  status: log.status as ReceptionistCallStatus,
  summary: log.summary ?? '',
  sentiment: log.sentiment as ReceptionistSentiment,
  category: (log.category ?? 'other') as ReceptionistCategory,
});

const buildAnalyticsFromLogs = (logs: ReceptionistCallLog[]): ReceptionistCallAnalytics => {
  const totalCalls = logs.length;
  const answeredCalls = logs.filter(log => log.status === 'answered').length;
  const missedCalls = logs.filter(log => log.status === 'missed').length;
  const totalDurationSeconds = logs.reduce((acc, log) => acc + parseDurationToSeconds(log.duration), 0);
  const avgHandleTime = totalCalls === 0 ? '0:00' : formatSeconds(totalDurationSeconds / Math.max(answeredCalls, 1));
  const positiveSentiment = logs.filter(log => log.sentiment === 'positive').length;
  const positiveSentimentRate = totalCalls === 0 ? 0 : Math.round((positiveSentiment / totalCalls) * 100);

  const categoryCounter = logs.reduce<Record<string, number>>((acc, log) => {
    const key = log.category ?? 'other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounter).map(name => ({
    name,
    count: categoryCounter[name] ?? 0,
    percentage: Math.round(((categoryCounter[name] ?? 0) / Math.max(totalCalls, 1)) * 1000) / 10,
  }));

  const hourlyCounter = logs.reduce<Record<string, number>>((acc, log) => {
    const hour = new Date(log.timestamp).getHours();
    const label = `${((hour + 11) % 12) + 1} ${hour >= 12 ? 'PM' : 'AM'}`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const hourlyLoad = Object.keys(hourlyCounter)
    .sort((a, b) => {
      const parseHour = (label: string) => {
        const [hourString, meridian] = label.split(' ');
        let hour = Number(hourString);
        if (meridian === 'PM' && hour !== 12) {
          hour += 12;
        }
        if (meridian === 'AM' && hour === 12) {
          hour = 0;
        }
        return hour;
      };
      return parseHour(a) - parseHour(b);
    })
    .map(label => ({ hour: label, calls: hourlyCounter[label] ?? 0, load: 0.5 }));

  if (categories.length === 0 && mockReceptionistAnalytics.categories) {
    mockReceptionistAnalytics.categories.forEach((category) => {
      categories.push({
        name: category.name,
        count: category.count,
        percentage: category.percentage,
      });
    });
  }

  if (hourlyLoad.length === 0 && mockReceptionistAnalytics.hourlyLoad) {
    mockReceptionistAnalytics.hourlyLoad.forEach((hour) => {
      hourlyLoad.push({ hour: hour.hour, calls: hour.calls, load: hour.load });
    });
  }

  const appointmentsTrend = mapNumericTrendMetric(mockReceptionistAnalytics.appointmentsBooked);
  const responseTrend = mapStringTrendMetric(mockReceptionistAnalytics.avgResponseTime);
  const satisfactionTrend = mapNumericTrendMetric(mockReceptionistAnalytics.satisfaction);

  return {
    totalCalls,
    answeredCalls,
    missedCalls,
    avgHandleTime,
    positiveSentimentRate,
    categories,
    hourlyLoad,
    ...(appointmentsTrend ? { appointmentsBooked: appointmentsTrend } : {}),
    ...(responseTrend ? { avgResponseTime: responseTrend } : {}),
    ...(satisfactionTrend ? { satisfaction: satisfactionTrend } : {}),
  };
};

const buildHighlights = (analytics: ReceptionistCallAnalytics): ReceptionistRealtimeInsight[] => {
  const answeredRate = analytics.totalCalls === 0 ? 0 : Math.round((analytics.answeredCalls / analytics.totalCalls) * 100);
  const missedRate = analytics.totalCalls === 0 ? 0 : Math.round((analytics.missedCalls / analytics.totalCalls) * 100);
  const peakHour = analytics.hourlyLoad.reduce<{ hour: string; calls: number } | null>((peak, slot) => {
    if (!peak || slot.calls > peak.calls) {
      return slot;
    }
    return peak;
  }, null);

  return [
    {
      label: 'Answered Rate',
      value: `${answeredRate}%`,
      change: answeredRate > 90 ? '+3.2%' : '+1.1%',
      sentiment: answeredRate >= 85 ? 'up' : 'neutral',
    },
    {
      label: 'Missed Calls',
      value: `${analytics.missedCalls}`,
      change: missedRate > 10 ? '+0.8%' : '-1.4%',
      sentiment: missedRate <= 10 ? 'up' : 'down',
    },
    {
      label: 'Avg Handle Time',
      value: analytics.avgHandleTime,
      change: '-0.6s',
      sentiment: 'up',
    },
    {
      label: 'Peak Hour',
      value: peakHour ? `${peakHour.hour}` : 'N/A',
      change: peakHour ? `${peakHour.calls} calls` : '0 calls',
      sentiment: 'neutral',
    },
  ];
};

export const fetchReceptionistCallLogs = async (): Promise<ReceptionistCallLog[]> => {
  await delay();
  return mockReceptionistCallLogs.map(normalizeCallLog);
};

export const deriveReceptionistAnalytics = (
  logs: ReceptionistCallLog[],
): ReceptionistAnalyticsPayload => {
  const analytics = buildAnalyticsFromLogs(logs);
  const highlights = buildHighlights(analytics);
  return { analytics, highlights };
};

export const fetchReceptionistAnalytics = async (
  incomingLogs?: ReceptionistCallLog[],
): Promise<ReceptionistAnalyticsPayload> => {
  const logs = incomingLogs ?? (await fetchReceptionistCallLogs());
  return deriveReceptionistAnalytics(logs);
};
