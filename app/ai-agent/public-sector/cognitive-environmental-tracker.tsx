import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Globe } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-environmental-tracker',
    name: 'AI Cognitive Environmental Tracker',
    title: 'Cognitive Environmental Tracker',
    description: 'Environmental monitoring and tracking with cognitive AI',
    capabilities: ["Environmental Monitoring","Tracking Systems","Climate Analysis","Sustainability"],
    icon: Globe,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$90k/year',
    aiCost: '$2.4k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Environmental Analyst',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.3k',
      tasksAutomatedDaily: 301,
      responseTime: '0.6s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
