import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-emergency-response',
    name: 'AI Real-Time Emergency Response',
    title: 'Real-Time Emergency Response',
    description: 'Real-time emergency response coordination with AI',
    capabilities: ["Emergency Response","Coordination","Crisis Management","Rapid Deployment"],
    icon: AlertCircle,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$112k/year',
    aiCost: '$3.1k/year',
    efficiency: '36x efficiency improvement',
    replacesRole: 'Emergency Response Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.1k',
      tasksAutomatedDaily: 212,
      responseTime: '0.3s',
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
