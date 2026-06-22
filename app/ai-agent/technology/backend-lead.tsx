import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-backend-lead',
    uid: 'ktx-06-backend-lead',
    name: 'AI Backend Lead',
    title: 'AI Backend Lead',
    description: 'AI Backend Lead coordinates team activities and ensures quality output for the Technology & Engineering department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Technical Documentation', 'Code Generation', 'System Architecture', 'DevOps Automation', 'Performance Optimization'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '80% efficiency',
    replacesRole: 'AI Backend Lead',
    subAgents: [
      { id: 'ai-scalability-planner', uid: 'ktx-06-scalability-planner', name: 'AI Scalability Planner', title: 'AI Scalability Planner', route: '/ai-agent/technology/scalability-planner' },
      { id: 'ai-api-design-reviewer', uid: 'ktx-06-api-design-reviewer', name: 'AI API Design Reviewer', title: 'AI API Design Reviewer', route: '/ai-agent/technology/api-design-reviewer' },
      { id: 'ai-e2e-test-writer', uid: 'ktx-06-e2e-test-writer', name: 'AI E2E Test Writer', title: 'AI E2E Test Writer', route: '/ai-agent/technology/e2e-test-writer' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3335',
      tasksAutomatedDaily: 355,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'team_lead',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
