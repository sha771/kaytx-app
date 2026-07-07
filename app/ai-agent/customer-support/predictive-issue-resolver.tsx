import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { AlertCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'predictive-issue-resolver',
    name: 'AI Predictive Issue Resolver',
    title: 'Predictive Issue Resolver',
    description: 'Predictive issue resolution and troubleshooting with AI-powered detection',
    capabilities: ["Issue Resolution","Predictive Detection","Troubleshooting","Root Cause Analysis"],
    icon: AlertCircle,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$65k/year',
    aiCost: '$1.7k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Support Specialist',
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
      accuracyRate: '98.2%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
