import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-complaint-handling',
    name: '{agent.name}',
    title: '{agent.title}',
    description: 'AI Complaint Handling Agent - Complaint Handling level AI agent in the ai complaint handling department. Part of the Kaytx AI Workforce hierarchy providing automated complaint handling capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$66k/year',
    aiCost: '$1k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: '{agent.title}',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 503,
      responseTime: '1.0s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
