import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Share2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'influencer-outreach',
    name: 'AI Influencer Outreach',
    title: 'Social Media',
    description: 'Identifies, contacts, and manages influencer partnerships and collaborations.',
    capabilities: ["Influencer Discovery","Outreach Automation","Partnership Management"],
    icon: Share2,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$82k/year',
    aiCost: '$1k/year',
    efficiency: '82x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 672,
      responseTime: '0.4s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Social-media',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
