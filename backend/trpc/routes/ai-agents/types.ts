
export type AgentActivityStatus = 'success' | 'processing' | 'pending' | 'warn' | 'error';

export interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  tasksToday: number;
  avgSuccessRate: number;
  avgHealthScore: number;
  totalConnections: number;
  activeConnections: number;
}

export interface AgentActivity {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  timestamp: string;
  status: AgentActivityStatus;
  eventType?: string;
  agentType?: string;
  description?: string;
  details?: Record<string, unknown>;
}

export interface AgentAnalyticsDailyActivity {
  date: string;
  tasks: number;
  success: number;
}

export interface AgentAnalyticsTopAction {
  action: string;
  count: number;
  success: number;
}

export interface AgentAnalytics {
  totalTasks: number;
  successRate: number;
  averageResponseTime: string;
  activeConversations: number;
  revenueImpact: string;
  tasksCompleted: number;
  errorRate: string;
  uptime: number;
  dailyActivity: AgentAnalyticsDailyActivity[];
  topActions: AgentAnalyticsTopAction[];
}
