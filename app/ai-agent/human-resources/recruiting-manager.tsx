import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-recruiting-manager',
    uid: 'ktx-07-recruiting-manager',
    name: 'AI Recruiting Manager',
    title: 'AI Recruiting Manager',
    description: 'AI Recruiting Manager manages team operations and ensures delivery excellence for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition', 'Employee Onboarding'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '82% efficiency',
    replacesRole: 'AI Recruiting Manager',
    subAgents: [
      { id: 'ai-hr-process-automator', uid: 'ktx-07-hr-process-automator', name: 'AI HR Process Automator', title: 'AI HR Process Automator', route: '/ai-agent/human-resources/hr-process-automator' },
      { id: 'ai-incentive-plan-designer', uid: 'ktx-07-incentive-plan-designer', name: 'AI Incentive Plan Designer', title: 'AI Incentive Plan Designer', route: '/ai-agent/human-resources/incentive-plan-designer' },
      { id: 'ai-certification-tracker', uid: 'ktx-07-certification-tracker', name: 'AI Certification Tracker', title: 'AI Certification Tracker', route: '/ai-agent/human-resources/certification-tracker' }
    ],
    infrastructure: {
      status: 'online',
      health: 88,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3869',
      tasksAutomatedDaily: 457,
      responseTime: '2.0s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'manager',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
