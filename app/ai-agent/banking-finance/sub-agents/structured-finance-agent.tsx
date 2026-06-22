import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building2 } from 'lucide-react-native';

export default function StructuredFinanceAgentPage() {
  const agent = {
    id: 'structured-finance-agent',
    name: 'AI Structured Finance Agent',
    title: 'Banking Agent',
    description: 'Automated Structured Finance Agent agent specializing in structured finance with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Structured Finance","Deal Structuring","Risk Modeling","Valuation","Capital Markets"],
    icon: Building2,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1.5k/year',
    efficiency: '60x efficiency improvement',
    replacesRole: 'Structured Finance Agent',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,400',
      tasksAutomatedDaily: 490,
      responseTime: '1.6s',
      accuracyRate: '97.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
