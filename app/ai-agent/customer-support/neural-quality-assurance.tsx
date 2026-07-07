import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-quality-assurance',
    name: 'AI Neural Quality Assurance',
    title: 'Neural Quality Assurance',
    description: 'Support quality assurance and monitoring with neural AI capabilities',
    capabilities: ["Quality Assurance","Monitoring","Compliance","Performance Tracking"],
    icon: Shield,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$66k/year',
    aiCost: '$1.7k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'QA Specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5.3k',
      tasksAutomatedDaily: 423,
      responseTime: '0.4s',
      accuracyRate: '97.6%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
