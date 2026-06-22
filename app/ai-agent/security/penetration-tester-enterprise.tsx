import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'penetration-tester-enterprise',
    name: 'penetration-tester-enterprise',
    title: 'penetration-tester-enterprise',
    description: 'The penetration-tester-enterprise AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: 'penetration-tester-enterprise',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1057,
      responseTime: '0.4s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
