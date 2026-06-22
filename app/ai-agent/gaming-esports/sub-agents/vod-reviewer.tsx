import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sword } from 'lucide-react-native';

export default function AIVODReviewerPage() {
  const agent = {
    id: 'vod-reviewer',
    name: 'AI VOD Reviewer',
    title: 'AI VOD Reviewer',
    description: 'Reviews gameplay footage for analysis and improvement insights.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Sword,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'vod-reviewer',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$2,478',
      tasksAutomatedDaily: 915,
      responseTime: '0.8s',
      accuracyRate: '98.4%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
