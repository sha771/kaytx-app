import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'intelligent-cost-controller',
    name: 'AI Intelligent Cost Controller',
    title: 'Intelligent Cost Controller',
    description: 'Intelligent cost control and monitoring with AI',
    capabilities: ["Cost Control","Monitoring","Financial Oversight","Cost Management"],
    icon: Shield,
    color: '#C62828',
    type: 'employee' as const,
    humanCost: '$100k/year',
    aiCost: '$2.7k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Cost Controller',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8.1k',
      tasksAutomatedDaily: 278,
      responseTime: '0.7s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Costing Management',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
