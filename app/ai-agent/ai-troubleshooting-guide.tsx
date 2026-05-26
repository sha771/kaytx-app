import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HelpCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-troubleshooting-guide',
    name: 'Ai Troubleshooting Guide',
    title: 'Ai Troubleshooting Guide',
    description: 'The Ai Troubleshooting Guide AI provides specialized services and automation within its department.',
    capabilities: ['Task Automation', 'Data Processing', 'Workflow Management', 'Analysis', 'Reporting', 'Optimization'],
    icon: HelpCircle,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$1.2k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'Ai Troubleshooting Guide',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 710,
      responseTime: '1.2s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'AI Operations',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
