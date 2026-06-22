import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ClipboardList } from 'lucide-react-native';

export default function WorkOrderManagerPage() {
  const agent = {
    id: 'work-order-manager',
    name: 'AI Work Order Manager',
    title: 'Operations Sub-Agent',
    description: 'Manages work order creation, assignment, tracking, and closure with automated vendor dispatch and SLA monitoring. Handles priority assignment, progress tracking, quality control, and cost tracking for all facility maintenance requests.',
    capabilities: [
      'Ticket Creation',
      'Priority Assignment',
      'Vendor Dispatch',
      'Progress Tracking',
      'Quality Control',
      'Cost Tracking',
      'SLA Monitoring',
      'Closure Management'
    ],
    icon: ClipboardList,
    color: '#F97316',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1.1k/year',
    efficiency: '20x efficiency improvement',
    replacesRole: 'Work Order Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,800',
      tasksAutomatedDaily: 85,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
