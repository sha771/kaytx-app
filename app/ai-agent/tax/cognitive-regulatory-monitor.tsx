import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Scale } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-regulatory-monitor',
    name: 'AI Cognitive Regulatory Monitor',
    title: 'Cognitive Regulatory Monitor',
    description: 'Tax regulation monitoring and updates with cognitive AI capabilities',
    capabilities: ["Regulatory Monitoring","Update Tracking","Compliance Alerts","Change Detection"],
    icon: Scale,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$82k/year',
    aiCost: '$2.2k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Regulatory Monitor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.6k',
      tasksAutomatedDaily: 334,
      responseTime: '0.5s',
      accuracyRate: '97.3%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
