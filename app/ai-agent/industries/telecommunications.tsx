import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'telecommunications',
    name: 'Telecommunications',
    title: 'Scale service requests, network issues, and billing support',
    description: 'The Telecommunications AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Headphones,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$61k/year',
    aiCost: '$1k/year',
    efficiency: '61x efficiency improvement',
    replacesRole: 'Scale service requests, network issues, and billing support',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 679,
      responseTime: '0.9s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Industries',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
