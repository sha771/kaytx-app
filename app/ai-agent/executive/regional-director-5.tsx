import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MapPin } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'regional-director-5',
    name: 'Regional Director 5',
    title: 'Regional Director - International',
    description: 'Oversees international regional markets, global expansion, and cross-border operations.',
    capabilities: ["International Markets","Global Expansion","Cross-Border Operations","Cultural Management","Regulatory Compliance"],
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
      tasksAutomatedDaily: 205,
      responseTime: '0.5s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Executive',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
