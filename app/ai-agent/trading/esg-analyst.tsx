import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-esg-analyst',
    uid: 'ktx-14-esg-analyst',
    name: 'AI ESG Analyst',
    title: 'AI ESG Analyst',
    description: 'AI ESG Analyst coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Derivatives Pricing', 'Quantitative Modeling', 'Portfolio Management', 'Market Analysis', 'Risk Assessment'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '93% efficiency',
    replacesRole: 'AI ESG Analyst',
    subAgents: [
      { id: 'ai-performance-attribution-analyst', uid: 'ktx-14-performance-attribution-analyst', name: 'AI Performance Attribution Analyst', title: 'AI Performance Attribution Analyst', route: '/ai-agent/trading/performance-attribution-analyst' },
      { id: 'ai-benchmark-comparator', uid: 'ktx-14-benchmark-comparator', name: 'AI Benchmark Comparator', title: 'AI Benchmark Comparator', route: '/ai-agent/trading/benchmark-comparator' },
      { id: 'ai-execution-algorithm-tester', uid: 'ktx-14-execution-algorithm-tester', name: 'AI Execution Algorithm Tester', title: 'AI Execution Algorithm Tester', route: '/ai-agent/trading/execution-algorithm-tester' }
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
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
