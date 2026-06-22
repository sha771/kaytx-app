import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function CollectionsAgentPage() {
  const agent = {
    id: 'collections-agent',
    name: 'AI Collections Agent',
    title: 'Banking Agent',
    description: 'Automated Collections Agent agent specializing in collections operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Collections Management","Customer Communication","Payment Processing","Recovery Strategies","Compliance"],
    icon: AlertTriangle,
    color: '#C62828',
    type: 'agent' as const,
    humanCost: '$48k/year',
    aiCost: '$1.5k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'Collections Agent',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,900',
      tasksAutomatedDaily: 260,
      responseTime: '3.2s',
      accuracyRate: '95.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
