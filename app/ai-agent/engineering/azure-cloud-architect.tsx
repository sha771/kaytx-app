import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'azure-cloud-architect',
    name: 'Azure Cloud Architect',
    title: 'Engineering',
    description: 'The Azure Cloud Architect designs and manages Microsoft Azure infrastructure, services, and enterprise cloud solutions.',
    capabilities: ["Azure Architecture","Virtual Machines","Azure Storage","Azure Networking","Azure AD Security","Hybrid Cloud"],
    icon: Cloud,
    color: '#0078D4',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$1k/year',
    efficiency: '125x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 842,
      responseTime: '0.9s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
