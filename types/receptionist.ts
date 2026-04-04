export type ReceptionistCallType = 'incoming' | 'outgoing';
export type ReceptionistCallStatus = 'answered' | 'missed' | 'voicemail';
export type ReceptionistSentiment = 'positive' | 'neutral' | 'negative';
export type ReceptionistCategory = 'inquiry' | 'appointment' | 'support' | 'sales' | 'missed' | 'other';

export interface ReceptionistCallLog {
  id: string;
  callId: string;
  callerName: string;
  callerPhone: string;
  callType: ReceptionistCallType;
  duration: string;
  timestamp: string;
  status: ReceptionistCallStatus;
  summary?: string;
  sentiment?: ReceptionistSentiment;
  category?: ReceptionistCategory;
}

export type TrendDirection = 'up' | 'down';

export interface NumericTrendMetric {
  current: number;
  change: number;
  trend: TrendDirection;
}

export interface StringTrendMetric {
  current: string;
  change: number;
  trend: TrendDirection;
}

export interface ReceptionistCallAnalytics {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  avgHandleTime: string;
  positiveSentimentRate: number;
  categories: {
    name: string;
    count: number;
    percentage: number;
  }[];
  hourlyLoad: {
    hour: string;
    calls: number;
  }[];
  appointmentsBooked?: NumericTrendMetric;
  avgResponseTime?: StringTrendMetric;
  satisfaction?: NumericTrendMetric;
}

export interface ReceptionistRealtimeInsight {
  label: string;
  value: string;
  change: string;
  sentiment: 'up' | 'down' | 'neutral';
}

export interface ReceptionistAnalyticsPayload {
  analytics: ReceptionistCallAnalytics;
  highlights: ReceptionistRealtimeInsight[];
}
