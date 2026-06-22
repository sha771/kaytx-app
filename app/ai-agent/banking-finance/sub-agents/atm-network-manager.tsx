import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Monitor } from 'lucide-react-native';

export default function ATMNetworkManagerPage() {
  const agent = {
    id: 'atm-network-manager',
    name: 'AI ATM Network Manager',
    title: 'Banking Agent',
    description: 'Automated ATM Network Manager agent specializing in ATM network operations with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","ATM Management","Network Monitoring","Cash Management","Maintenance Coordination","Service Optimization"],
    icon: Monitor,
    color: '#424242',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1.5k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'ATM Network Manager',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 340,
      responseTime: '2.5s',
      accuracyRate: '96.5%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
