import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ShoppingCart } from 'lucide-react-native';

export default function MediaBuyerPage() {
  const agent = {
    id: 'media-buyer',
    name: 'AI Media Buyer',
    title: 'Media Buying Agent',
    description: 'Automated Media Buyer agent specializing in media purchasing, ad placement, and rate negotiation with advanced AI capabilities for media acquisition, placement optimization, and cost management.',
    capabilities: ["Media Purchasing","Ad Placement","Rate Negotiation","Media Acquisition","Placement Optimization","Cost Management"],
    icon: ShoppingCart,
    color: '#F97316',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Media Buyer',
    infrastructure: {
      status: 'online' as const,
      health: 91,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 50,
      responseTime: '<2s',
      accuracyRate: '91%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
