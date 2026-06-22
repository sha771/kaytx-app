import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-hr-operations-specialist',
    uid: 'ktx-07-hr-operations-specialist',
    name: 'AI HR Operations Specialist',
    title: 'AI HR Operations Specialist',
    description: 'AI HR Operations Specialist coordinates team activities and ensures quality output for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Training Programs', 'Compensation Analysis', 'Culture Development', 'HR Compliance', 'Workforce Planning'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '84% efficiency',
    replacesRole: 'AI HR Operations Specialist',
    subAgents: [
      { id: 'ai-employee-data-manager', uid: 'ktx-07-employee-data-manager', name: 'AI Employee Data Manager', title: 'AI Employee Data Manager', route: '/ai-agent/human-resources/employee-data-manager' },
      { id: 'ai-recruiter-performance-tracker', uid: 'ktx-07-recruiter-performance-tracker', name: 'AI Recruiter Performance Tracker', title: 'AI Recruiter Performance Tracker', route: '/ai-agent/human-resources/recruiter-performance-tracker' },
      { id: 'ai-salary-benchmarking-agent', uid: 'ktx-07-salary-benchmarking-agent', name: 'AI Salary Benchmarking Agent', title: 'AI Salary Benchmarking Agent', route: '/ai-agent/human-resources/salary-benchmarking-agent' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4403',
      tasksAutomatedDaily: 159,
      responseTime: '2.4s',
      accuracyRate: '94.7%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'team_lead',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
