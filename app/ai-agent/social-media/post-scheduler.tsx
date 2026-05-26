import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Share2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'post-scheduler',
    name: 'AI Post Scheduler',
    title: 'Social Media',
    description: 'Schedules and publishes posts across all social platforms at optimal times for maximum engagement.',
    capabilities: ["Multi-Platform Scheduling","Optimal Time Detection","Automated Publishing"],
    icon: Share2,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$94k/year',
    aiCost: '$1k/year',
    efficiency: '94x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 1423,
      responseTime: '1.4s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Social-media',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
