import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Share2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'shared-services-manager',
    name: 'Shared Services Manager',
    title: 'Shared Services Manager',
    description: 'Manager overseeing shared accounting services, service level agreements, and multi-entity support.',
    capabilities: [
      "Shared Services Management",
      "SLA Management",
      "Multi-Entity Support",
      "Service Delivery Optimization",
      "Client Relationship Management",
      "Performance Reporting"
    ],
    icon: Share2,
    color: '#1565C0',
    type: 'agent' as const,
    humanCost: '$100k/year',
    aiCost: '$1.8k/year',
    efficiency: '55x efficiency improvement',
    replacesRole: 'Shared Services Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8.2',
      tasksAutomatedDaily: 2654,
      responseTime: '0.6s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Accounting',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
