import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-churn-predictor',
    name: 'ai-churn-predictor',
    title: 'ai-churn-predictor',
    description: 'The ai-churn-predictor AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$80k/year',
    aiCost: '$1k/year',
    efficiency: '80x efficiency improvement',
    replacesRole: 'ai-churn-predictor',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 887,
      responseTime: '0.7s',
      accuracyRate: '98.8%',
    },
    hierarchy: {
      department: 'Customer-experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
