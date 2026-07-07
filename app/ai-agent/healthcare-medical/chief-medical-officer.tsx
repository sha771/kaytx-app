import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-medical-officer',
    uid: 'ktx-17-chief-medical-officer',
    name: 'AI Chief Medical Officer',
    title: 'AI Chief Medical Officer',
    description: 'AI Chief Medical Officer leads strategic direction and executive decision-making for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Chief Medical Officer',
    subAgents: [
      { id: 'ai-clinical-strategy-advisor', uid: 'ktx-17-clinical-strategy-advisor', name: 'AI Clinical Strategy Advisor', title: 'AI Clinical Strategy Advisor', route: '/ai-agent/healthcare/clinical-strategy-advisor' },
      { id: 'ai-revenue-cycle-analyst', uid: 'ktx-17-revenue-cycle-analyst', name: 'AI Revenue Cycle Analyst', title: 'AI Revenue Cycle Analyst', route: '/ai-agent/healthcare/revenue-cycle-analyst' },
      { id: 'ai-follow-up-scheduler', uid: 'ktx-17-follow-up-scheduler', name: 'AI Follow-up Scheduler', title: 'AI Follow-up Scheduler', route: '/ai-agent/healthcare/follow-up-scheduler' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11288',
      tasksAutomatedDaily: 552,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'c_level',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
