import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Share2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'brand-monitor',
    name: 'AI Brand Monitor',
    title: 'Social Media',
    description: 'Monitors brand mentions, sentiment, and reputation across all social platforms.',
    capabilities: ["Brand Mention Tracking","Sentiment Analysis","Reputation Management"],
    icon: Share2,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$86k/year',
    aiCost: '$1k/year',
    efficiency: '86x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1015,
      responseTime: '0.6s',
      accuracyRate: '96.7%',
    },
    hierarchy: {
      department: 'Social-media',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
