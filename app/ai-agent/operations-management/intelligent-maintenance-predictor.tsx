import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Wrench } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-maintenance-predictor',
    name: 'AI Intelligent Maintenance Predictor',
    title: 'Intelligent Maintenance Predictor',
    description: 'Predictive maintenance and equipment management with AI',
    capabilities: ["Predictive Maintenance","Equipment Management","Asset Optimization","Downtime Reduction"],
    icon: Wrench,
    color: '#00695C',
    type: 'employee' as const,
    humanCost: '$105k/year',
    aiCost: '$2.8k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Maintenance Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.5k',
      tasksAutomatedDaily: 245,
      responseTime: '0.8s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Operations Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
