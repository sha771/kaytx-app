import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-chief-technology-officer',
    uid: 'ktx-06-chief-technology-officer',
    name: 'AI Chief Technology Officer',
    title: 'AI Chief Technology Officer',
    description: 'AI Chief Technology Officer leads strategic direction and executive decision-making for the Technology & Engineering department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Performance Optimization', 'Security Scanning', 'API Management', 'Cloud Infrastructure', 'Technical Documentation'],
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI Chief Technology Officer',
    subAgents: [
      { id: 'ai-tech-strategy-advisor', uid: 'ktx-06-tech-strategy-advisor', name: 'AI Tech Strategy Advisor', title: 'AI Tech Strategy Advisor', route: '/ai-agent/technologynology/tech-strategy-advisor' },
      { id: 'ai-integration-planner', uid: 'ktx-06-integration-planner', name: 'AI Integration Planner', title: 'AI Integration Planner', route: '/ai-agent/technologynology/integration-planner' },
      { id: 'ai-cross-browser-tester', uid: 'ktx-06-cross-browser-tester', name: 'AI Cross-browser Tester', title: 'AI Cross-browser Tester', route: '/ai-agent/technologynology/cross-browser-tester' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11699',
      tasksAutomatedDaily: 621,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'c_level',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
