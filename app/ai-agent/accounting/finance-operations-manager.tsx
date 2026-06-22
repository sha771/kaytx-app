import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Workflow } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'finance-operations-manager',
    name: 'Finance Operations Manager',
    title: 'Finance Operations Manager',
    description: 'Manager optimizing finance operations, driving process efficiency, and leading continuous improvement initiatives.',
    capabilities: [
      "Finance Operations Optimization",
      "Process Improvement",
      "Efficiency Initiatives",
      "Team Management",
      "KPI Monitoring",
      "Operational Excellence"
    ],
    icon: Workflow,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1.5k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Finance Operations Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7.8',
      tasksAutomatedDaily: 2456,
      responseTime: '0.8s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
