import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function BusinessBankerPage() {
  const agent = {
    id: 'business-banker',
    name: 'AI Business Banker',
    title: 'Banking Agent',
    description: 'Automated Business Banker agent specializing in business banking services with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Business Lending","Relationship Management","Credit Analysis","Commercial Services","Strategic Planning"],
    icon: Briefcase,
    color: '#0D47A1',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$1.5k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'Business Banker',
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
      responseTime: '2.2s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
