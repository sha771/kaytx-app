import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Eye } from 'lucide-react-native';

export default function AIContentModeratorPage() {
  const agent = {
    id: 'content-moderator',
    name: 'AI Content Moderator',
    title: 'AI Content Moderator',
    description: 'Moderates chat and community content for toxicity and policy violations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Eye,
    color: 'undefined',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'content-moderator',
    hierarchy: {
      department: 'Gaming & Esports'
    },
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7,433',
      tasksAutomatedDaily: 861,
      responseTime: '1.2s',
      accuracyRate: '98.1%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
