import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BarChart3 } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cognitive-cost-modeler',
    name: 'AI Cognitive Cost Modeler',
    title: 'Cognitive Cost Modeler',
    description: 'Intelligent cost modeling and simulation with cognitive AI',
    capabilities: ["Cost Modeling","Simulation","Cognitive AI","Financial Analysis"],
    icon: BarChart3,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$112k/year',
    aiCost: '$3.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Cost Modeler',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9.1k',
      tasksAutomatedDaily: 212,
      responseTime: '0.9s',
      accuracyRate: '96.3%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
