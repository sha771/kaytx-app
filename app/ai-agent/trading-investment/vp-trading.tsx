import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-trading',
    uid: 'ktx-14-vp-trading',
    name: 'AI VP Trading',
    title: 'AI VP Trading',
    description: 'AI VP Trading drives department strategy and oversees operations for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Performance Attribution', 'Derivatives Pricing', 'Quantitative Modeling', 'Portfolio Management', 'Market Analysis'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '86% efficiency',
    replacesRole: 'AI VP Trading',
    subAgents: [
      { id: 'ai-portfolio-allocation-director', uid: 'ktx-14-portfolio-allocation-director', name: 'AI Portfolio Allocation Director', title: 'AI Portfolio Allocation Director', route: '/ai-agent/trading/portfolio-allocation-director' },
      { id: 'ai-market-depth-analyzer', uid: 'ktx-14-market-depth-analyzer', name: 'AI Market Depth Analyzer', title: 'AI Market Depth Analyzer', route: '/ai-agent/trading/market-depth-analyzer' },
      { id: 'ai-regulatory-reporter', uid: 'ktx-14-regulatory-reporter', name: 'AI Regulatory Reporter', title: 'AI Regulatory Reporter', route: '/ai-agent/trading/regulatory-reporter' }
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
      department: 'Trading & Investments',
      level: 'vp_director',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
