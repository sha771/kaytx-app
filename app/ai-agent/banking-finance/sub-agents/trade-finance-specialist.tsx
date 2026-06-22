import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Ship } from 'lucide-react-native';

export default function TradeFinanceSpecialistPage() {
  const agent = {
    id: 'trade-finance-specialist',
    name: 'AI Trade Finance Specialist',
    title: 'Banking Agent',
    description: 'Automated Trade Finance Specialist agent specializing in trade finance with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Trade Finance","Letters of Credit","Documentary Collections","Trade Financing","Compliance"],
    icon: Ship,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1.5k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Trade Finance Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,900',
      tasksAutomatedDaily: 390,
      responseTime: '2.1s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
