import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PieChart } from 'lucide-react-native';

export default function PortfolioManagerPage() {
  const agent = {
    id: 'portfolio-manager',
    name: 'AI Portfolio Manager',
    title: 'Banking Agent',
    description: 'Automated Portfolio Manager agent specializing in investment portfolio management with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Portfolio Management","Asset Allocation","Risk Management","Performance Analysis","Rebalancing"],
    icon: PieChart,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Portfolio Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,900',
      tasksAutomatedDaily: 460,
      responseTime: '1.6s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
