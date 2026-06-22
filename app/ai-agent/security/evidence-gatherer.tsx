import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-evidence-gatherer',
    uid: 'ktx-11-evidence-gatherer',
    name: 'AI Evidence Gatherer',
    title: 'AI Evidence Gatherer',
    description: 'AI Evidence Gatherer provides specialized expertise and executes critical tasks for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Access Control', 'Encryption Management', 'Compliance Monitoring', 'Risk Mitigation', 'Threat Detection'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Evidence Gatherer',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'specialist',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
