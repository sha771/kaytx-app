import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-culture',
    uid: 'ktx-07-vp-culture',
    name: 'AI VP Culture',
    title: 'AI VP Culture',
    description: 'AI VP Culture drives department strategy and oversees operations for the Human Resources department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Culture Development', 'HR Compliance', 'Workforce Planning', 'Talent Acquisition', 'Employee Onboarding'],
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Culture',
    subAgents: [
      { id: 'ai-employer-brand-strategist', uid: 'ktx-07-employer-brand-strategist', name: 'AI Employer Brand Strategist', title: 'AI Employer Brand Strategist', route: '/ai-agent/human-resources/employer-brand-strategist' },
      { id: 'ai-market-compensation-researcher', uid: 'ktx-07-market-compensation-researcher', name: 'AI Market Compensation Researcher', title: 'AI Market Compensation Researcher', route: '/ai-agent/human-resources/market-compensation-researcher' },
      { id: 'ai-hr-ticket-resolver', uid: 'ktx-07-hr-ticket-resolver', name: 'AI HR Ticket Resolver', title: 'AI HR Ticket Resolver', route: '/ai-agent/human-resources/hr-ticket-resolver' }
    ],
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9781',
      tasksAutomatedDaily: 799,
      responseTime: '1.4s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Human Resources',
      level: 'vp_director',
      departmentId: 7,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
