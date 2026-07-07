import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-multi-language-support',
    name: 'AI Real-Time Multi-Language Support',
    title: 'Real-Time Multi-Language Support',
    description: 'Real-time multi-language support capabilities with AI translation',
    capabilities: ["Multi-Language Support","Real-Time Translation","Localization","Cultural Adaptation"],
    icon: Globe,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$74k/year',
    aiCost: '$2.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Language Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.0k',
      tasksAutomatedDaily: 356,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
