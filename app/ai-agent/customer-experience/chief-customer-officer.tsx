import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-customer-officer',
    uid: 'ktx-01-chief-customer-officer',
    name: 'AI Chief Customer Officer',
    title: 'AI Chief Customer Officer',
    description: 'AI Chief Customer Officer leads strategic direction and executive decision-making for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction', 'Loyalty Programs', 'Ticket Routing'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Chief Customer Officer',
    subAgents: [
      { id: 'ai-cx-strategy-analyst', uid: 'ktx-01-cx-strategy-analyst', name: 'AI CX Strategy Analyst', title: 'AI CX Strategy Analyst', route: '/ai-agent/customer-experience/cx-strategy-analyst' },
      { id: 'ai-retention-metrics-analyst', uid: 'ktx-01-retention-metrics-analyst', name: 'AI Retention Metrics Analyst', title: 'AI Retention Metrics Analyst', route: '/ai-agent/customer-experience/retention-metrics-analyst' },
      { id: 'ai-resolution-tracker', uid: 'ktx-01-resolution-tracker', name: 'AI Resolution Tracker', title: 'AI Resolution Tracker', route: '/ai-agent/customer-experience/resolution-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11425',
      tasksAutomatedDaily: 575,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'c_level',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
