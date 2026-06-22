import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Package } from 'lucide-react-native';

export default function SupplyOrdererPage() {
  const agent = {
    id: 'supply-orderer',
    name: 'AI Supply Orderer',
    title: 'Procurement Sub-Agent',
    description: 'Manages supply ordering, inventory tracking, and vendor coordination with automated reorder triggers.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: Package,
    color: '#14B8A6',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Supply Orderer',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
