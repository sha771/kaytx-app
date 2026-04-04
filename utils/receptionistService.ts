import { mockReceptionistAnalytics, mockReceptionistCallLogs } from '@/utils/mockNegotiationData';
import {
  ReceptionistAnalyticsPayload,
  ReceptionistCallAnalytics,
  ReceptionistCallLog,
  ReceptionistRealtimeInsight,
  NumericTrendMetric,
  StringTrendMetric,
  TrendDirection,
} from '@/types/receptionist';

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
    const [hours, minutes, seconds] = segments;
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
  callType: log.callType,
  duration: log.duration,
  timestamp: log.timestamp,
  status: log.status,
  summary: log.summary,
  sentiment: log.sentiment,
  category: (log.category ?? 'other') as ReceptionistCallLog['category'],
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
    count: categoryCounter[name],
    percentage: Math.round((categoryCounter[name] / Math.max(totalCalls, 1)) * 1000) / 10,
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
    .map(label => ({ hour: label, calls: hourlyCounter[label] }));

  if (categories.length === 0 && mockReceptionistAnalytics.callsByCategory) {
    mockReceptionistAnalytics.callsByCategory.forEach(category => {
      categories.push({
        name: category.category,
        count: category.count,
        percentage: category.percentage,
      });
    });
  }

  if (hourlyLoad.length === 0 && mockReceptionistAnalytics.peakHours) {
    mockReceptionistAnalytics.peakHours.forEach(hour => {
      hourlyLoad.push({ hour: hour.hour, calls: hour.calls });
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
    appointmentsBooked: appointmentsTrend,
    avgResponseTime: responseTrend,
    satisfaction: satisfactionTrend,
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
