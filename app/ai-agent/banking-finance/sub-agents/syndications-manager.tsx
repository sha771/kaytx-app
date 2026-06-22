import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Network } from 'lucide-react-native';

export default function SyndicationsManagerPage() {
  const agent = {
    id: 'syndications-manager',
    name: 'AI Syndications Manager',
    title: 'Banking Agent',
    description: 'Automated Syndications Manager agent specializing in loan syndications with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Loan Syndications","Deal Structuring","Investor Relations","Distribution","Risk Management"],
    icon: Network,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Syndications Manager',
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
      responseTime: '1.8s',
      accuracyRate: '97.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
