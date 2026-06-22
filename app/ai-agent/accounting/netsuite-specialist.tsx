import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'netsuite-specialist',
    name: 'NetSuite Specialist',
    title: 'NetSuite Specialist',
    description: 'Specialist in NetSuite cloud ERP, managing financial modules, customizations, and process automation in NetSuite.',
    capabilities: [
      "NetSuite Financial Management",
      "SuiteScript Development",
      "Workflow Automation",
      "Customization Support",
      "Integration Management",
      "User Training"
    ],
    icon: Cloud,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'NetSuite Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9',
      tasksAutomatedDaily: 2345,
      responseTime: '0.8s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
