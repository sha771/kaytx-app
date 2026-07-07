import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Route } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-journey-optimization-specialist-3',
    name: 'Journey Optimization Specialist',
    title: 'Journey Optimization Specialist',
    description: 'The Journey Optimization Specialist AI analyzes customer journeys, identifies friction points, and implements optimizations to improve customer experience.',
    capabilities: ["Journey Mapping","Friction Analysis","Experience Optimization","A/B Testing","Conversion Rate Optimization","Touchpoint Optimization"],
    icon: Route,
    color: '#FF5722',
    type: 'employee' as const,
    humanCost: '$125k/year',
    aiCost: '$4k/year',
    efficiency: '31x efficiency improvement',
    replacesRole: 'Journey Optimization',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 650,
      responseTime: '1.6s',
      accuracyRate: '92.9%',
    },
    hierarchy: {
      department: 'Customer Experience',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
