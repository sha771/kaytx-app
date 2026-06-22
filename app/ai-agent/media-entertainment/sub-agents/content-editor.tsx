import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Edit3 } from 'lucide-react-native';

export default function ContentEditorPage() {
  const agent = {
    id: 'content-editor',
    name: 'AI Content Editor',
    title: 'Content Editing Agent',
    description: 'Automated Content Editor agent specializing in content refinement, editing, and proofreading with advanced AI capabilities for content polishing, error correction, and quality enhancement.',
    capabilities: ["Content Refinement","Editing","Proofreading","Content Polishing","Error Correction","Quality Enhancement"],
    icon: Edit3,
    color: '#EC4899',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Content Editor',
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
