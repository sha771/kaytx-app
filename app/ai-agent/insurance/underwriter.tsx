import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-underwriter',
    uid: 'ktx-16-underwriter',
    name: 'AI Underwriter',
    title: 'AI Underwriter',
    description: 'AI Underwriter coordinates team activities and ensures quality output for the Insurance & Risk department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Regulatory Compliance', 'Customer Communication', 'Claims Processing', 'Underwriting', 'Policy Management'],
    color: '#FF7043',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI Underwriter',
    subAgents: [
      { id: 'ai-settlement-authority-manager', uid: 'ktx-16-settlement-authority-manager', name: 'AI Settlement Authority Manager', title: 'AI Settlement Authority Manager', route: '/ai-agent/insurance/settlement-authority-manager' },
      { id: 'ai-coverage-analyzer', uid: 'ktx-16-coverage-analyzer', name: 'AI Coverage Analyzer', title: 'AI Coverage Analyzer', route: '/ai-agent/insurance/coverage-analyzer' },
      { id: 'ai-risk-profiler', uid: 'ktx-16-risk-profiler', name: 'AI Risk Profiler', title: 'AI Risk Profiler', route: '/ai-agent/insurance/risk-profiler' }
    ],
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.0%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3246',
      tasksAutomatedDaily: 338,
      responseTime: '1.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Insurance & Risk',
      level: 'team_lead',
      departmentId: 16,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
