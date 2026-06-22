import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'regional-director-2',
    name: 'Regional Director 2',
    title: 'Regional Director - Midwest',
    description: 'Oversees Midwest regional operations, territory management, and regional customer relationships.',
    capabilities: ["Territory Management","Regional Sales","Customer Relations","Local Operations","Performance Tracking"],
    icon: MapPin,
    color: '#4A148C',
    type: 'agent' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'Regional Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$14k',
      tasksAutomatedDaily: 198,
      responseTime: '0.5s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
