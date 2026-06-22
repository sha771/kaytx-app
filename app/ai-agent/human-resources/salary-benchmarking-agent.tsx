import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-salary-benchmarking-agent',
    uid: 'ktx-07-salary-benchmarking-agent',
    name: 'AI Salary Benchmarking Agent',
    title: 'AI Salary Benchmarking Agent',
    description: 'AI Salary Benchmarking Agent provides specialized expertise and executes critical tasks for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '91% efficiency',
    replacesRole: 'AI Salary Benchmarking Agent',
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
      department: 'Human Resources',
      level: 'specialist',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
