import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-urban-planning',
    name: 'AI Neural Urban Planning',
    title: 'Neural Urban Planning',
    description: 'Neural AI for urban planning and development optimization',
    capabilities: ["Urban Planning","Development Optimization","Neural AI","City Design"],
    icon: MapPin,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$115k/year',
    aiCost: '$3.2k/year',
    efficiency: '35x efficiency improvement',
    replacesRole: 'Urban Planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.3k',
      tasksAutomatedDaily: 223,
      responseTime: '0.9s',
      accuracyRate: '96.1%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
