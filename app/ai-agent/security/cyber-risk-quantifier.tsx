import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-cyber-risk-quantifier',
    uid: 'ktx-11-cyber-risk-quantifier',
    name: 'AI Cyber Risk Quantifier',
    title: 'AI Cyber Risk Quantifier',
    description: 'AI Cyber Risk Quantifier provides specialized expertise and executes critical tasks for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Threat Detection', 'Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Access Control'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Cyber Risk Quantifier',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'specialist',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
