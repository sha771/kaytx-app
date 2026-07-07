import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-medical-coder',
    uid: 'ktx-17-medical-coder',
    name: 'AI Medical Coder',
    title: 'AI Medical Coder',
    description: 'AI Medical Coder coordinates team activities and ensures quality output for the Healthcare & Medical department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Patient Care Coordination', 'Medical Records Management', 'Clinical Decision Support', 'Health Monitoring', 'Treatment Planning'],
    color: '#EC407A',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '87% efficiency',
    replacesRole: 'AI Medical Coder',
    subAgents: [
      { id: 'ai-service-improvement-planner', uid: 'ktx-17-service-improvement-planner', name: 'AI Service Improvement Planner', title: 'AI Service Improvement Planner', route: '/ai-agent/healthcare/service-improvement-planner' },
      { id: 'ai-code-assigner', uid: 'ktx-17-code-assigner', name: 'AI Code Assigner', title: 'AI Code Assigner', route: '/ai-agent/healthcare/code-assigner' },
      { id: 'ai-remote-monitor', uid: 'ktx-17-remote-monitor', name: 'AI Remote Monitor', title: 'AI Remote Monitor', route: '/ai-agent/healthcare/remote-monitor' }
    ],
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
      department: 'Healthcare & Medical',
      level: 'team_lead',
      departmentId: 17,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
