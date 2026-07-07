import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-customer-satisfaction',
    name: 'AI Predictive Customer Satisfaction',
    title: 'Predictive Customer Satisfaction',
    description: 'Customer satisfaction prediction and analysis with predictive modeling',
    capabilities: ["Satisfaction Prediction","Customer Analytics","Predictive Modeling","Insight Generation"],
    icon: Star,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$78k/year',
    aiCost: '$2.1k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'CSAT Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.3k',
      tasksAutomatedDaily: 312,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
