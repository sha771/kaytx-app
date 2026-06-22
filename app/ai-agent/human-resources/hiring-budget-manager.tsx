import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-hiring-budget-manager',
    uid: 'ktx-07-hiring-budget-manager',
    name: 'AI Hiring Budget Manager',
    title: 'AI Hiring Budget Manager',
    description: 'AI Hiring Budget Manager manages team operations and ensures delivery excellence for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Talent Acquisition', 'Employee Onboarding', 'Performance Reviews', 'Training Programs', 'Compensation Analysis'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1,200/mo',
    efficiency: '83% efficiency',
    replacesRole: 'AI Hiring Budget Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4136',
      tasksAutomatedDaily: 108,
      responseTime: '2.2s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'manager',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
