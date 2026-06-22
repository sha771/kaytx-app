import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function B2BSalesAgentPage() {
  const agent = {
    id: 'b2b-sales-agent',
    name: 'AI B2B Sales Agent',
    title: 'E-Commerce Agent',
    description: 'Automated B2B Sales Agent agent specializing in B2B sales with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","B2B Sales","Lead Generation","Account Management","Negotiation","Relationship Building"],
    icon: Briefcase,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'B2B Sales Agent',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6,100',
      tasksAutomatedDaily: 410,
      responseTime: '2.0s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
