import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { User } from 'lucide-react-native';

export default function PersonalBankerPage() {
  const agent = {
    id: 'personal-banker',
    name: 'AI Personal Banker',
    title: 'Banking Agent',
    description: 'Automated Personal Banker agent specializing in personal banking services with advanced AI capabilities for task automation, data processing, and workflow coordination.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Customer Service","Account Opening","Product Sales","Relationship Management","Financial Advice"],
    icon: User,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$62k/year',
    aiCost: '$1.5k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'Personal Banker',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 340,
      responseTime: '2.4s',
      accuracyRate: '96.0%',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
