import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'airline',
    name: 'Airline Industry',
    title: 'Automate bookings, changes, and high-volume disruption support with AI-powered customer service',
    description: 'The Airline Industry AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Users,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$63k/year',
    aiCost: '$1k/year',
    efficiency: '63x efficiency improvement',
    replacesRole: 'Automate bookings, changes, and high-volume disruption support with AI-powered customer service',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 661,
      responseTime: '0.9s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
