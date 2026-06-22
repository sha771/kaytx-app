import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-fleet-coordinator',
    uid: 'ktx-19-fleet-coordinator',
    name: 'AI Fleet Coordinator',
    title: 'AI Fleet Coordinator',
    description: 'AI Fleet Coordinator leads strategic direction and executive decision-making for the Transportation & Logistics department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Carrier Relations', 'Customs Compliance', 'Demand Forecasting', 'Logistics Analytics', 'Fleet Management'],
    color: '#26A69A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Fleet Coordinator',
    subAgents: [
      { id: 'ai-throughput-monitor', uid: 'ktx-19-throughput-monitor', name: 'AI Throughput Monitor', title: 'AI Throughput Monitor', route: '/ai-agent/transportation/throughput-monitor' },
      { id: 'ai-dispatch-optimizer', uid: 'ktx-19-dispatch-optimizer', name: 'AI Dispatch Optimizer', title: 'AI Dispatch Optimizer', route: '/ai-agent/transportation/dispatch-optimizer' },
      { id: 'ai-customer-notifier', uid: 'ktx-19-customer-notifier', name: 'AI Customer Notifier', title: 'AI Customer Notifier', route: '/ai-agent/transportation/customer-notifier' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10740',
      tasksAutomatedDaily: 960,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Transportation & Logistics',
      level: 'c_level',
      departmentId: 19,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
