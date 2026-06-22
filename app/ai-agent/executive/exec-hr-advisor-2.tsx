import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'exec-hr-advisor-2',
    name: 'Executive HR Advisor 2',
    title: 'Executive Culture Advisor',
    description: 'Advises on organizational culture, employee engagement, and workplace experience strategy.',
    capabilities: ["Culture Strategy","Employee Engagement","Workplace Experience","Culture Measurement","Change Advisory"],
    icon: Heart,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$170k/year',
    aiCost: '$3.5k/year',
    efficiency: '49x efficiency improvement',
    replacesRole: 'Executive HR Advisor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 190,
      responseTime: '0.5s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
