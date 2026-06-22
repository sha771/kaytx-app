import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Brain } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ml-engineer-1',
    name: 'ML Engineer',
    title: 'ML Engineer',
    description: 'The ML Engineer AI develops machine learning models, implements ML pipelines, and ensures scalable ML solutions.',
    capabilities: ["Machine Learning","Model Development","ML Pipeline","Feature Engineering","Model Deployment","MLOps"],
    icon: Brain,
    color: '#7B1FA2',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$4k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'ML Engineering',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 845,
      responseTime: '1.3s',
      accuracyRate: '96.4%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
