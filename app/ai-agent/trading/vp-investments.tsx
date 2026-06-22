import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-vp-investments',
    uid: 'ktx-14-vp-investments',
    name: 'AI VP Investments',
    title: 'AI VP Investments',
    description: 'AI VP Investments drives department strategy and oversees operations for the Trading & Investments department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.',
    capabilities: ['Market Analysis', 'Risk Assessment', 'Trade Execution', 'Compliance Monitoring', 'Performance Attribution'],
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$1,800/mo',
    efficiency: '94% efficiency',
    replacesRole: 'AI VP Investments',
    subAgents: [
      { id: 'ai-market-outlook-analyst', uid: 'ktx-14-market-outlook-analyst', name: 'AI Market Outlook Analyst', title: 'AI Market Outlook Analyst', route: '/ai-agent/trading/market-outlook-analyst' },
      { id: 'ai-execution-quality-reporter', uid: 'ktx-14-execution-quality-reporter', name: 'AI Execution Quality Reporter', title: 'AI Execution Quality Reporter', route: '/ai-agent/trading/execution-quality-reporter' },
      { id: 'ai-restricted-list-monitor', uid: 'ktx-14-restricted-list-monitor', name: 'AI Restricted List Monitor', title: 'AI Restricted List Monitor', route: '/ai-agent/trading/restricted-list-monitor' }
    ],
    infrastructure: {
      status: 'online',
      health: 91,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10329',
      tasksAutomatedDaily: 891,
      responseTime: '1.7s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Trading & Investments',
      level: 'vp_director',
      departmentId: 14,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
