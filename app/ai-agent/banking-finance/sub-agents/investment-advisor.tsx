import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { LineChart } from 'lucide-react-native';

export default function InvestmentAdvisorPage() {
  const agent = {
    id: 'investment-advisor',
    name: 'AI Investment Advisor',
    title: 'Banking Agent',
    description: 'Automated Investment Advisor agent specializing in investment advisory with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Investment Advisory","Portfolio Analysis","Risk Assessment","Market Research","Financial Planning"],
    icon: LineChart,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1.5k/year',
    efficiency: '52x efficiency improvement',
    replacesRole: 'Investment Advisor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,400',
      tasksAutomatedDaily: 420,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
