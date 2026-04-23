import { z } from "zod";
import { publicProcedure } from "../../../create-context";
import { AgentStats, AgentActivity, AgentAnalytics } from "../types";

const mockStats: AgentStats = {
  totalAgents: 61,
  activeAgents: 52,
  totalTasks: 45680,
  tasksToday: 3456,
  avgSuccessRate: 93,
  avgHealthScore: 91,
  totalConnections: 24,
  activeConnections: 21,
};

const mockActivities: AgentActivity[] = [
  {
    id: 'act-1',
    agentId: 'ce-1',
    agentName: 'AI Receptionist',
    action: 'Scheduled appointment for John D.',
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    status: 'success',
    details: { customerId: 'cust-123', appointmentType: 'consultation' },
  },
  {
    id: 'act-2',
    agentId: 'sr-1',
    agentName: 'AI Lead Development Rep',
    action: 'Qualified 12 new leads',
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    status: 'success',
    details: { leadsQualified: 12, source: 'inbound' },
  },
  {
    id: 'act-3',
    agentId: 'mg-2',
    agentName: 'AI Campaign Optimizer',
    action: 'Optimized ad spend by 23%',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'success',
    details: { previousSpend: 10000, newSpend: 7700, savings: 2300 },
  },
  {
    id: 'act-4',
    agentId: 'di-7',
    agentName: 'AI Fraud Detection Agent',
    action: 'Blocked 3 fraudulent transactions',
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    status: 'success',
    details: { transactionsBlocked: 3, amountSaved: 12500 },
  },
  {
    id: 'act-5',
    agentId: 'om-2',
    agentName: 'AI Workflow Automation Agent',
    action: 'Automated 5 new workflows',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    status: 'success',
    details: { workflowsCreated: 5, hoursSaved: 24 },
  },
  {
    id: 'act-6',
    agentId: 'ce-4',
    agentName: 'AI Complaint Handling Agent',
    action: 'De-escalated customer complaint',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'success',
    details: { complaintId: 'comp-456', resolution: 'refund_issued' },
  },
  {
    id: 'act-7',
    agentId: 'sr-3',
    agentName: 'AI Sales Executive',
    action: 'Closed $45K enterprise deal',
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
    status: 'success',
    details: { dealId: 'deal-789', value: 45000, company: 'Acme Corp' },
  },
  {
    id: 'act-8',
    agentId: 'mg-5',
    agentName: 'AI Social Media Manager',
    action: 'Scheduled 45 posts for next week',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    status: 'success',
    details: { postsScheduled: 45, platforms: ['twitter', 'linkedin', 'instagram'] },
  },
];

export const getStatsProcedure = publicProcedure
  .input(z.object({
    category: z.enum(['customer-experience', 'sales-revenue', 'marketing-growth', 'operations-management', 'data-intelligence', 'analysis-performance', 'core-intelligence', 'all']).optional(),
  }).optional())
  .query(({ input }) => {
    const category = input?.category;
    
    if (category && category !== 'all') {
      const categoryMultiplier: Record<string, number> = {
        'customer-experience': 0.15,
        'sales-revenue': 0.18,
        'marketing-growth': 0.17,
        'operations-management': 0.16,
        'data-intelligence': 0.17,
        'analysis-performance': 0.09,
        'core-intelligence': 0.08,
        'receptionist': 0.05,
        'negotiation': 0.12,
        'sales': 0.18,
        'marketing': 0.17,
        'operations': 0.16,
        'data': 0.17,
        'support': 0.15,
        'analytics': 0.17,
      };
      
      const multiplier = categoryMultiplier[category] || 0.15;
      
      return {
        totalAgents: Math.round(mockStats.totalAgents * multiplier),
        activeAgents: Math.round(mockStats.activeAgents * multiplier),
        totalTasks: Math.round(mockStats.totalTasks * multiplier),
        tasksToday: Math.round(mockStats.tasksToday * multiplier),
        avgSuccessRate: mockStats.avgSuccessRate + Math.round((Math.random() - 0.5) * 6),
        avgHealthScore: mockStats.avgHealthScore + Math.round((Math.random() - 0.5) * 6),
        totalConnections: Math.round(mockStats.totalConnections * multiplier),
        activeConnections: Math.round(mockStats.activeConnections * multiplier),
      };
    }
    
    return mockStats;
  });

export const getActivityProcedure = publicProcedure
  .input(z.object({
    limit: z.number().optional().default(10),
    category: z.enum(['customer-experience', 'sales-revenue', 'marketing-growth', 'operations-management', 'data-intelligence', 'analysis-performance', 'core-intelligence', 'all']).optional(),
  }).optional())
  .query(({ input }) => {
    const limit = input?.limit ?? 10;
    const category = input?.category;
    
    let activities = mockActivities;
    
    if (category && category !== 'all') {
      const categoryPrefixes: Record<string, string> = {
        'customer-experience': 'ce-',
        'sales-revenue': 'sr-',
        'marketing-growth': 'mg-',
        'operations-management': 'om-',
        'data-intelligence': 'di-',
        'receptionist': 'ai-receptionist',
        'negotiation': 'ai-negotiator',
        'sales': 'sr-',
        'marketing': 'mg-',
        'operations': 'om-',
        'data': 'di-',
        'support': 'ce-',
        'analytics': 'di-',
      };
      
      const prefix = categoryPrefixes[category];
      if (prefix) {
        activities = activities.filter(a => a.agentId.startsWith(prefix));
      }
    }
    
    return {
      activities: activities.slice(0, limit),
      total: activities.length,
    };
  });

export const getAgentAnalyticsProcedure = publicProcedure
  .input(z.object({
    agentId: z.string().optional(),
    type: z.string().optional(),
    timeRange: z.enum(['24h', '7d', '30d', '90d']).optional().default('7d'),
  }))
  .query(({ input }): AgentAnalytics => {
    const events = mockActivities;

    const totalTasks = events.length;
    const tasksCompleted = events.filter(e => e.status === 'success').length;
    const errorCount = events.filter(e => e.status === 'error').length;
    const successRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;
    const errorRate = totalTasks > 0 ? (errorCount / totalTasks) * 100 : 0;

    const actionCounts = new Map<string, { count: number; success: number }>();
    for (const e of events) {
      const key = e.action || 'Unknown';
      const row = actionCounts.get(key) || { count: 0, success: 0 };
      row.count += 1;
      if (e.status === 'success') row.success += 1;
      actionCounts.set(key, row);
    }

    const topActions = Array.from(actionCounts.entries())
      .map(([action, v]) => ({
        action,
        count: v.count,
        success: v.count > 0 ? Math.round((v.success / v.count) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalTasks,
      successRate,
      averageResponseTime: '1.2s',
      activeConversations: Math.max(0, mockStats.activeAgents - 3),
      revenueImpact: '$12,450',
      tasksCompleted,
      errorRate: `${errorRate.toFixed(2)}%`,
      uptime: 99.9,
      dailyActivity: [
        { date: new Date().toISOString().split('T')[0], tasks: totalTasks, success: tasksCompleted }
      ],
      topActions,
    };
  });

export const getAgentActivityProcedure = publicProcedure
  .input(z.object({
    agentId: z.string().optional(),
    type: z.string().optional(),
    limit: z.number().optional().default(50),
  }))
  .query(({ input }) => {
    const limit = input.limit ?? 50;

    let activities = mockActivities;
    if (input.agentId) {
      activities = activities.filter(a => a.agentId === input.agentId);
    }

    return {
      activities: activities.slice(0, limit),
      count: Math.min(limit, activities.length),
      total: activities.length,
    };
  });
