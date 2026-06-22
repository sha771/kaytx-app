import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function CapitalMarketsAnalystPage() {
  const agent = {
    id: 'capital-markets-analyst',
    name: 'AI Capital Markets Analyst',
    title: 'Banking Agent',
    description: 'Automated Capital Markets Analyst agent specializing in capital markets analysis with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Capital Markets","Market Analysis","Debt Issuance","Equity Markets","Investment Research"],
    icon: BarChart3,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1.5k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Capital Markets Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,700',
      tasksAutomatedDaily: 440,
      responseTime: '1.7s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
