import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Lock } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'internal-control-specialist',
    name: 'Internal Control Specialist',
    title: 'Internal Control Specialist',
    description: 'Specialist designing, implementing, and monitoring internal controls to safeguard assets and ensure reliable financial reporting.',
    capabilities: [
      "Internal Control Design",
      "Control Implementation",
      "Control Testing",
      "Control Gap Analysis",
      "SOX Compliance Support",
      "Control Documentation"
    ],
    icon: Lock,
    color: '#4527A0',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1.5k/year',
    efficiency: '56x efficiency improvement',
    replacesRole: 'Internal Control Specialist',
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
