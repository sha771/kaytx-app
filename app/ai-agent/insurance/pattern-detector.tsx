import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-pattern-detector',
    uid: 'ktx-16-pattern-detector',
    name: 'AI Pattern Detector',
    title: 'AI Pattern Detector',
    description: 'AI Pattern Detector leads strategic direction and executive decision-making for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Risk Assessment', 'Fraud Detection', 'Premium Calculation', 'Regulatory Compliance', 'Customer Communication'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '88% efficiency',
    replacesRole: 'AI Pattern Detector',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10603',
      tasksAutomatedDaily: 937,
      responseTime: '1.8s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'c_level',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
