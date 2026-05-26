import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Share2 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'social-analytics',
    name: 'AI Social Analytics Agent',
    title: 'Social Media',
    description: 'Analyzes social media performance metrics, tracks KPIs, and provides actionable insights.',
    capabilities: ["Performance Analytics","KPI Tracking","Insight Generation"],
    icon: Share2,
    color: '#007AFF',
    type: 'agent' as const,
    humanCost: '$59k/year',
    aiCost: '$1k/year',
    efficiency: '59x efficiency improvement',
    replacesRole: 'Social Media',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 896,
      responseTime: '1.1s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Social-media',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
