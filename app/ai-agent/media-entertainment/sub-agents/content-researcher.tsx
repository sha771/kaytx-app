import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { SearchCheck } from 'lucide-react-native';

export default function ContentResearcherPage() {
  const agent = {
    id: 'content-researcher',
    name: 'AI Content Researcher',
    title: 'Content Research Agent',
    description: 'Automated Content Researcher agent specializing in content research, trend analysis, and topic discovery with advanced AI capabilities for research automation, trend identification, and content ideation.',
    capabilities: ["Content Research","Trend Analysis","Topic Discovery","Research Automation","Trend Identification","Content Ideation"],
    icon: SearchCheck,
    color: '#0D9488',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.3k/year',
    efficiency: '10x efficiency improvement',
    replacesRole: 'Content Researcher',
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
