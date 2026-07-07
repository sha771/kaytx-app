import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-audit-liaison',
    uid: 'ktx-20-audit-liaison',
    name: 'AI Audit Liaison',
    title: 'AI Audit Liaison',
    description: 'AI Audit Liaison provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Policy Analysis', 'Public Engagement', 'Regulatory Development', 'Grant Management', 'Program Evaluation'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Audit Liaison',
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3424',
      tasksAutomatedDaily: 372,
      responseTime: '1.6s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
