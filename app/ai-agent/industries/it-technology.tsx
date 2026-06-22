import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'it-technology',
    name: 'Information Technology',
    title: 'Resolve tickets, reset passwords, and support users 24/7',
    description: 'The Information Technology AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Headphones,
    color: '#607D8B',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'Resolve tickets, reset passwords, and support users 24/7',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1185,
      responseTime: '0.8s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Industries',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
