import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-data-connector-builder',
    uid: 'ktx-08-data-connector-builder',
    name: 'AI AI Data Connector Builder',
    title: 'AI Data Connector Builder',
    description: 'AI AI Data Connector Builder leads strategic direction and executive decision-making for the Legal & Compliance department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Regulatory Compliance', 'Risk Assessment', 'Legal Research', 'IP Protection', 'Dispute Resolution'],
    color: '#3F51B5',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '90% efficiency',
    replacesRole: 'AI Data Connector Builder',
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
      department: 'Legal & Compliance',
      level: 'c_level',
      departmentId: 8,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
