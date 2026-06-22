import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-containment-coordinator',
    uid: 'ktx-11-containment-coordinator',
    name: 'AI Containment Coordinator',
    title: 'AI Containment Coordinator',
    description: 'AI Containment Coordinator leads strategic direction and executive decision-making for the Security & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Incident Response', 'Security Auditing', 'Access Control', 'Encryption Management', 'Compliance Monitoring'],
    color: '#F44336',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '77% efficiency',
    replacesRole: 'AI Containment Coordinator',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11562',
      tasksAutomatedDaily: 598,
      responseTime: '2.3s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Security & Risk',
      level: 'c_level',
      departmentId: 11,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
