import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-cyber',
    name: 'vp-cyber',
    title: 'vp-cyber',
    description: 'The vp-cyber AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Briefcase,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$228k/year',
    aiCost: '$4k/year',
    efficiency: '57x efficiency improvement',
    replacesRole: 'vp-cyber',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17',
      tasksAutomatedDaily: 1434,
      responseTime: '0.6s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Security',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
