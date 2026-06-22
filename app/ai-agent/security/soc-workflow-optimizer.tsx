import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-soc-workflow-optimizer',
    uid: 'ktx-11-soc-workflow-optimizer',
    name: 'AI SOC Workflow Optimizer',
    title: 'AI SOC Workflow Optimizer',
    description: 'AI SOC Workflow Optimizer provides specialized expertise and executes critical tasks for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Vulnerability Assessment', 'Incident Response', 'Security Auditing', 'Access Control', 'Encryption Management'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI SOC Workflow Optimizer',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4225',
      tasksAutomatedDaily: 125,
      responseTime: '2.3s',
      accuracyRate: '94.3%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'specialist',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
