import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Mail } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'email-assistant',
    name: 'AI Email Assistant',
    title: 'Email Management AI',
    description: 'The AI Email Assistant manages your inbox efficiently, drafts professional responses, prioritizes messages, and automates email workflows to save hours of manual work.',
    capabilities: ["Email Management","Response Drafting","Inbox Prioritization","Smart Filtering","Auto-Archiving","Follow-up Tracking","Template Generation","Spam Detection"],
    icon: Mail,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$85k/year',
    aiCost: '$1k/year',
    efficiency: '85x efficiency improvement',
    replacesRole: 'Email Management AI',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1019,
      responseTime: '0.9s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Assistant',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
