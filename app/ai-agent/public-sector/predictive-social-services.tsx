import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Heart } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-social-services',
    name: 'AI Predictive Social Services',
    title: 'Predictive Social Services',
    description: 'Predictive social services optimization with AI modeling',
    capabilities: ["Social Services","Predictive Optimization","Service Delivery","Community Support"],
    icon: Heart,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.2k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Social Services Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.9k',
      tasksAutomatedDaily: 356,
      responseTime: '0.5s',
      accuracyRate: '97.2%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
