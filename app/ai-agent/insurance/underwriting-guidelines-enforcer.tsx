import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-underwriting-guidelines-enforcer',
    uid: 'ktx-16-underwriting-guidelines-enforcer',
    name: 'AI Underwriting Guidelines Enforcer',
    title: 'AI Underwriting Guidelines Enforcer',
    description: 'AI Underwriting Guidelines Enforcer provides specialized expertise and executes critical tasks for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Underwriting Guidelines Enforcer',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2115',
      tasksAutomatedDaily: 295,
      responseTime: '1.0s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'specialist',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
