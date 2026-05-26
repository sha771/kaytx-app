import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'social-ad-manager',
    name: 'AI Social Ad Manager',
    title: 'Social Media',
    description: 'Manages paid social media campaigns, optimizes ad spend, and maximizes ROI.',
    capabilities: ["Campaign Management","Ad Spend Optimization","ROI Maximization"],
    icon: User,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$58k/year',
    aiCost: '$1k/year',
    efficiency: '58x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1107,
      responseTime: '1.0s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Social-media',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
