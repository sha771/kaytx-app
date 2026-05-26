import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'content-creator',
    name: 'AI Content Creator',
    title: 'Social Media',
    description: 'Creates engaging content for all social media platforms including posts, stories, reels, and graphics.',
    capabilities: ["Content Generation","Multi-Platform Publishing","Visual Content Creation"],
    icon: FileText,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$73k/year',
    aiCost: '$1k/year',
    efficiency: '73x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1283,
      responseTime: '1.7s',
      accuracyRate: '97.4%',
    },
    hierarchy: {
      department: 'Social-media',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
