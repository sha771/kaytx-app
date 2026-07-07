import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-voice-search-optimizer',
    uid: 'ktx-03-voice-search-optimizer',
    name: 'AI Voice Search Optimizer',
    title: 'AI Voice Search Optimizer',
    description: 'AI Voice Search Optimizer focuses on optimizing content for voice assistants and voice search queries. This AI agent automates conversational keyword research, question-based content optimization, and voice search performance monitoring to capture the growing voice search market.',
    capabilities: ['Voice Keyword Research', 'Conversational Content', 'Question-Based Optimization', 'Voice Search Analytics', 'Assistant Integration'],
    color: '#E91E63',
    type: 'sub-agent' as const,
    humanCost: '$65k/year',
    aiCost: '$800/mo',
    efficiency: '85% efficiency',
    replacesRole: 'AI Voice Search Optimizer',
    subAgents: [],
    infrastructure: {
      status: 'online' as const,
      health: 88,
      uptime: '99.4%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5295',
      tasksAutomatedDaily: 282,
      responseTime: '2.0s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Marketing & Growth',
      level: 'specialist',
      departmentId: 3,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
