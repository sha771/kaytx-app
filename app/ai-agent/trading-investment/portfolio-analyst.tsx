import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-portfolio-analyst',
    uid: 'ktx-14-portfolio-analyst',
    name: 'AI Portfolio Analyst',
    title: 'AI Portfolio Analyst',
    description: 'AI Portfolio Analyst coordinates team activities and ensures quality output for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Compliance Monitoring', 'Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling', 'Portfolio Management'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '75% efficiency',
    replacesRole: 'AI Portfolio Analyst',
    subAgents: [
      { id: 'ai-trader-performance-evaluator', uid: 'ktx-14-trader-performance-evaluator', name: 'AI Trader Performance Evaluator', title: 'AI Trader Performance Evaluator', route: '/ai-agent/trading/trader-performance-evaluator' },
      { id: 'ai-greeks-calculator', uid: 'ktx-14-greeks-calculator', name: 'AI Greeks Calculator', title: 'AI Greeks Calculator', route: '/ai-agent/trading/greeks-calculator' },
      { id: 'ai-central-bank-watcher', uid: 'ktx-14-central-bank-watcher', name: 'AI Central Bank Watcher', title: 'AI Central Bank Watcher', route: '/ai-agent/trading/central-bank-watcher' }
    ],
    infrastructure: {
      status: 'online',
      health: 85,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3780',
      tasksAutomatedDaily: 440,
      responseTime: '1.9s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'team_lead',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
