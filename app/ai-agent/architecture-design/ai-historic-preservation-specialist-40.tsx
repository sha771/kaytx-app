import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-historic-preservation-specialist',
    name: 'AI Historic Preservation Specialist',
    title: 'Historic Preservation Specialist',
    description: 'AI Historic Preservation Specialist - Historic Preservation Specialist level AI agent in the architecture design department. Part of the Kaytx AI Workforce hierarchy providing specialized architecture design capabilities.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: 'hsl(40, 70%, 50%)',
    type: 'agent' as const,
    humanCost: '$70k/year',
    aiCost: '$1k/year',
    efficiency: '70x efficiency improvement',
    replacesRole: 'Historic Preservation Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1047,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'architecture design',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
