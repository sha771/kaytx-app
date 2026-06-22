import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-retention',
    uid: 'ktx-01-vp-retention',
    name: 'AI VP Retention',
    title: 'AI VP Retention',
    description: 'AI VP Retention drives department strategy and oversees operations for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI VP Retention',
    subAgents: [
      { id: 'ai-account-health-monitor', uid: 'ktx-01-account-health-monitor', name: 'AI Account Health Monitor', title: 'AI Account Health Monitor', route: '/ai-agent/customer-experience/account-health-monitor' },
      { id: 'ai-call-router', uid: 'ktx-01-call-router', name: 'AI Call Router', title: 'AI Call Router', route: '/ai-agent/customer-experience/call-router' },
      { id: 'ai-follow-up-scheduler', uid: 'ktx-01-follow-up-scheduler', name: 'AI Follow-up Scheduler', title: 'AI Follow-up Scheduler', route: '/ai-agent/customer-experience/follow-up-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10055',
      tasksAutomatedDaily: 845,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'vp_director',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
