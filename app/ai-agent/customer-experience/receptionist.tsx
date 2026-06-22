import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-receptionist',
    uid: 'ktx-01-receptionist',
    name: 'AI Receptionist',
    title: 'AI Receptionist',
    description: 'AI Receptionist coordinates team activities and ensures quality output for the Customer Experience department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Customer Feedback Analysis', 'Customer Journey Mapping', 'Sentiment Analysis', 'Multi-channel Support', 'Churn Prediction'],
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Receptionist',
    subAgents: [
      { id: 'ai-escalation-manager', uid: 'ktx-01-escalation-manager', name: 'AI Escalation Manager', title: 'AI Escalation Manager', route: '/ai-agent/customer-experience/escalation-manager' },
      { id: 'ai-appointment-scheduler', uid: 'ktx-01-appointment-scheduler', name: 'AI Appointment Scheduler', title: 'AI Appointment Scheduler', route: '/ai-agent/customer-experience/appointment-scheduler' },
      { id: 'ai-reward-recommender', uid: 'ktx-01-reward-recommender', name: 'AI Reward Recommender', title: 'AI Reward Recommender', route: '/ai-agent/customer-experience/reward-recommender' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Customer Experience',
      level: 'team_lead',
      departmentId: 1,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
