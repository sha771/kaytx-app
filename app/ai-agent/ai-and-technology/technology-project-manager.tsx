import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-technology-project-manager',
    uid: 'ktx-06-technology-project-manager',
    name: 'AI Technology Project Manager',
    title: 'AI Technology Project Manager',
    description: 'AI Technology Project Manager plans, executes, and oversees technology projects ensuring timely delivery, quality outcomes, and alignment with business objectives through effective resource management and stakeholder communication.',
    capabilities: ['Project Planning', 'Resource Management', 'Risk Management', 'Stakeholder Communication', 'Delivery Management'],
    color: '#2E7D32',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1,200/mo',
    efficiency: '90% efficiency',
    replacesRole: 'Technology Project Manager',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6536',
      tasksAutomatedDaily: 264,
      responseTime: '2.1s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'manager',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
