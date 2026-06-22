import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-learning-specialist',
    uid: 'ktx-07-learning-specialist',
    name: 'AI Learning Specialist',
    title: 'AI Learning Specialist',
    description: 'AI Learning Specialist coordinates team activities and ensures quality output for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['HR Compliance', 'Workforce Planning', 'Talent Acquisition', 'Employee Onboarding', 'Performance Reviews'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '89% efficiency',
    replacesRole: 'AI Learning Specialist',
    subAgents: [
      { id: 'ai-ld-curriculum-designer', uid: 'ktx-07-ld-curriculum-designer', name: 'AI L&D Curriculum Designer', title: 'AI L&D Curriculum Designer', route: '/ai-agent/human-resources/ld-curriculum-designer' },
      { id: 'ai-hiring-budget-manager', uid: 'ktx-07-hiring-budget-manager', name: 'AI Hiring Budget Manager', title: 'AI Hiring Budget Manager', route: '/ai-agent/human-resources/hiring-budget-manager' },
      { id: 'ai-bonus-calculator', uid: 'ktx-07-bonus-calculator', name: 'AI Bonus Calculator', title: 'AI Bonus Calculator', route: '/ai-agent/human-resources/bonus-calculator' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3958',
      tasksAutomatedDaily: 474,
      responseTime: '2.0s',
      accuracyRate: '99.1%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
