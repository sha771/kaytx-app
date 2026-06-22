import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-litigation-coordinator',
    uid: 'ktx-16-litigation-coordinator',
    name: 'AI Litigation Coordinator',
    title: 'AI Litigation Coordinator',
    description: 'AI Litigation Coordinator leads strategic direction and executive decision-making for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Underwriting', 'Policy Management', 'Risk Assessment', 'Fraud Detection', 'Premium Calculation'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Litigation Coordinator',
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
      department: 'Insurance & Risk',
      level: 'c_level',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
