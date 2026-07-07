import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Building } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-government-operations',
    name: 'AI Cognitive Government Operations',
    title: 'Cognitive Government Operations',
    description: 'Government operations optimization with cognitive AI capabilities',
    capabilities: ["Government Operations","Process Optimization","Cognitive Computing","Public Administration"],
    icon: Building,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Government Operations Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 278,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
