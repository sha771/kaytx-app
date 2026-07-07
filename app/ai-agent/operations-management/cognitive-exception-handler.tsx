import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertTriangle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-exception-handler',
    name: 'AI Cognitive Exception Handler',
    title: 'Cognitive Exception Handler',
    description: 'Intelligent exception handling and problem resolution with AI',
    capabilities: ["Exception Handling","Problem Resolution","Issue Management","Root Cause Analysis"],
    icon: AlertTriangle,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$102k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Exception Handler',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.3k',
      tasksAutomatedDaily: 256,
      responseTime: '0.7s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
