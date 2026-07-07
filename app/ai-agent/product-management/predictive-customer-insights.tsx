import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-customer-insights',
    name: 'AI Predictive Customer Insights',
    title: 'Predictive Customer Insights',
    description: 'Predictive customer insights and feedback analysis with AI',
    capabilities: ["Customer Insights","Feedback Analysis","Predictive Analytics","User Intelligence"],
    icon: MessageSquare,
    color: '#E65100',
    type: 'employee' as const,
    humanCost: '$112k/year',
    aiCost: '$3.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Customer Insights Manager',
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
      responseTime: '1.0s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Product Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
