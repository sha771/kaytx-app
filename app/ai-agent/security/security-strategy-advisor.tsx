import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-security-strategy-advisor',
    uid: 'ktx-11-security-strategy-advisor',
    name: 'AI Security Strategy Advisor',
    title: 'AI Security Strategy Advisor',
    description: 'AI Security Strategy Advisor provides specialized expertise and executes critical tasks for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Access Control', 'Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Security Strategy Advisor',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4492',
      tasksAutomatedDaily: 176,
      responseTime: '2.5s',
      accuracyRate: '94.9%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'specialist',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
