import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PenTool } from 'lucide-react-native';

export default function CopywriterPage() {
  const agent = {
    id: 'copywriter',
    name: 'AI Copywriter',
    title: 'Copywriting Agent',
    description: 'Automated Copywriter agent specializing in copywriting, content creation, and brand messaging with advanced AI capabilities for copy generation, tone adjustment, and message optimization.',
    capabilities: ["Copywriting","Content Creation","Brand Messaging","Copy Generation","Tone Adjustment","Message Optimization"],
    icon: PenTool,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Copywriter',
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
