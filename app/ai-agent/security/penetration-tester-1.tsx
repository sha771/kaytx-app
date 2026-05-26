import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'penetration-tester-1',
    name: 'penetration-tester-1',
    title: 'penetration-tester-1',
    description: 'The penetration-tester-1 AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Bot,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$75k/year',
    aiCost: '$1k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'penetration-tester-1',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 579,
      responseTime: '0.5s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Security',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
