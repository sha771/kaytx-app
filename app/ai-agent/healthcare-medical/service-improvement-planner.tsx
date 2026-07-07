import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-service-improvement-planner',
    uid: 'ktx-17-service-improvement-planner',
    name: 'AI Service Improvement Planner',
    title: 'AI Service Improvement Planner',
    description: 'AI Service Improvement Planner provides specialized expertise and executes critical tasks for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Medical Billing', 'Healthcare Compliance', 'Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '85% efficiency',
    replacesRole: 'AI Service Improvement Planner',
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4670',
      tasksAutomatedDaily: 210,
      responseTime: '0.6s',
      accuracyRate: '95.4%',
    },
    hierarchy: {
      department: 'Healthcare & Medical',
      level: 'specialist',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
