import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-enterprise-architect',
    uid: 'ktx-00-enterprise-architect',
    name: 'AI Enterprise Architect',
    title: 'AI Enterprise Architect',
    description: 'AI Enterprise Architect coordinates team activities and ensures quality output for the Cross-Department department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Anomaly Detection', 'Cross-department Coordination', 'Enterprise Analytics', 'System Integration', 'Data Sharing'],
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '76% efficiency',
    replacesRole: 'AI Enterprise Architect',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4047',
      tasksAutomatedDaily: 491,
      responseTime: '2.1s',
      accuracyRate: '99.3%',
    },
    hierarchy: {
      department: 'Cross-Department',
      level: 'team_lead',
      departmentId: 0,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
