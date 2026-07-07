import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-grant-opportunity-scanner',
    uid: 'ktx-20-grant-opportunity-scanner',
    name: 'AI Grant Opportunity Scanner',
    title: 'AI Grant Opportunity Scanner',
    description: 'AI Grant Opportunity Scanner provides specialized expertise and executes critical tasks for the Government & Public Sector department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Program Evaluation', 'Stakeholder Relations', 'Public Communications', 'Government Compliance', 'Policy Analysis'],
    color: '#78909C',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Grant Opportunity Scanner',
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
      department: 'Government & Public Sector',
      level: 'specialist',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
