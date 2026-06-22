import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headphones } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'personal-secretary',
    name: 'AI Personal Secretary',
    title: 'Executive Support AI',
    description: 'The AI Personal Secretary provides comprehensive administrative support to executives, handling calendar management, correspondence, meeting coordination, and task prioritization.',
    capabilities: ["Calendar Management","Email Management","Meeting Coordination","Travel Planning","Task Prioritization","Correspondence Handling","Document Preparation","Contact Management"],
    icon: Headphones,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$96k/year',
    aiCost: '$1k/year',
    efficiency: '96x efficiency improvement',
    replacesRole: 'Executive Support AI',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1461,
      responseTime: '1.3s',
      accuracyRate: '98.6%',
    },
    hierarchy: {
      department: 'Assistant',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
