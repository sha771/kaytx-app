import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Landmark } from 'lucide-react-native';

export default function TreasuryAnalystPage() {
  const agent = {
    id: 'treasury-analyst',
    name: 'AI Treasury Analyst',
    title: 'Banking Agent',
    description: 'Automated Treasury Analyst agent specializing in treasury operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Treasury Analysis","Liquidity Management","FX Operations","Investment Analysis","Risk Assessment"],
    icon: Landmark,
    color: '#1B5E20',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1.5k/year',
    efficiency: '46x efficiency improvement',
    replacesRole: 'Treasury Analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,700',
      tasksAutomatedDaily: 380,
      responseTime: '2.1s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
