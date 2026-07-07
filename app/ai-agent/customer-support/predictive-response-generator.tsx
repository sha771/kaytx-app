import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Send } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-response-generator',
    name: 'AI Predictive Response Generator',
    title: 'Predictive Response Generator',
    description: 'Predictive response generation and automation with natural language AI',
    capabilities: ["Response Generation","Automation","Natural Language","Template Management"],
    icon: Send,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$56k/year',
    aiCost: '$1.4k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Response Specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$4.5k',
      tasksAutomatedDaily: 534,
      responseTime: '0.2s',
      accuracyRate: '98.3%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
