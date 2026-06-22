import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Monitor } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chief-digital-officer',
    name: 'Chief Digital Officer',
    title: 'Chief Digital Officer',
    description: 'The Chief Digital Officer AI drives digital transformation, digital strategy, and technology innovation.',
    capabilities: ["Digital Transformation","Digital Strategy","Technology Innovation","Customer Experience","Data Analytics","Digital Operations"],
    icon: Monitor,
    color: '#3B82F6',
    type: 'employee' as const,
    humanCost: '$210k/year',
    aiCost: '$4k/year',
    efficiency: '53x efficiency improvement',
    replacesRole: 'Chief Digital Officer',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$17k',
      tasksAutomatedDaily: 495,
      responseTime: '0.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
