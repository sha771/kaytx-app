import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Layout } from 'lucide-react-native';

export default function MediaPlannerPage() {
  const agent = {
    id: 'media-planner',
    name: 'AI Media Planner',
    title: 'Media Planning Agent',
    description: 'Automated Media Planner agent specializing in media strategy, campaign planning, and budget optimization with advanced AI capabilities for media allocation, audience targeting, and performance tracking.',
    capabilities: ["Media Strategy","Campaign Planning","Budget Optimization","Media Allocation","Audience Targeting","Performance Tracking"],
    icon: Layout,
    color: '#8B5CF6',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Media Planner',
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
