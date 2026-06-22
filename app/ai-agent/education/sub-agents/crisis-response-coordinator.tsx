import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function CrisisResponseCoordinatorPage() {
  const agent = {
    id: 'crisis-response-coordinator',
    name: 'AI Crisis Response Coordinator',
    title: 'Education Agent',
    description: 'Automated Crisis Response Coordinator agent specializing in emergency management with advanced AI capabilities for incident detection, response coordination, and communication management.',
    capabilities: ["Incident Detection","Response Coordination","Communication Management","Safety Protocol Enforcement","Emergency Resource Allocation","Post-Crisis Analysis"],
    icon: AlertTriangle,
    color: '#EF4444',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$1.1k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Crisis Management Director',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,600',
      tasksAutomatedDaily: 50,
      responseTime: '<1s',
      accuracyRate: '98%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}