import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function LiveChatAgentPage() {
  const agent = {
    id: 'live-chat-agent',
    name: 'AI Live Chat Agent',
    title: 'E-Commerce Agent',
    description: 'Automated Live Chat Agent agent specializing in live chat support with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Live Chat","Real-time Support","Multi-tasking","Communication","Customer Engagement"],
    icon: MessageSquare,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$42k/year',
    aiCost: '$1.5k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'Live Chat Agent',
    infrastructure: {
      status: 'online' as const,
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,400',
      tasksAutomatedDaily: 220,
      responseTime: '1.5s',
      accuracyRate: '95.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
