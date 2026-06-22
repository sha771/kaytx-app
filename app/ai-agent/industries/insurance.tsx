import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'insurance',
    name: 'Insurance',
    title: 'Automate claim intake, status updates, and customer service',
    description: 'The Insurance AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: 'Automate claim intake, status updates, and customer service',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 856,
      responseTime: '1.6s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
