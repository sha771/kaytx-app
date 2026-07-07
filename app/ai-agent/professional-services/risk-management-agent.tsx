import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-risk-management-agent',
    uid: 'ktx-17-risk-management-agent',
    name: 'AI Risk Management Agent',
    title: 'AI Risk Management Agent',
    description: 'AI Risk Management Agent leads delivery risk prediction, budget monitoring, escalation detection, and compliance monitoring for the Professional Services department. This AI agent automates complex risk workflows, provides intelligent risk insights, and collaborates with other agents to achieve optimal risk mitigation with maximum efficiency.',
    capabilities: ['Delivery Risk Prediction', 'Budget Monitoring', 'Escalation Detection', 'Compliance Monitoring', 'Risk Assessment'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$145k/year',
    aiCost: '$2,900/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Risk Management Agent',
    subAgents: [
      { id: 'ai-attorney', uid: 'ktx-17-attorney', name: 'AI Attorney', title: 'AI Attorney', route: '/ai-agent/professional-services/attorney' },
      { id: 'ai-auditor', uid: 'ktx-17-auditor', name: 'AI Auditor', title: 'AI Auditor', route: '/ai-agent/professional-services/auditor' },
      { id: 'ai-consultant', uid: 'ktx-17-consultant', name: 'AI Consultant', title: 'AI Consultant', route: '/ai-agent/professional-services/consultant' }
    ],
    infrastructure: {
      status: 'online',
      health: 89,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$14017',
      tasksAutomatedDaily: 698,
      responseTime: '2.0s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Professional Services',
      level: 'vp_director',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}