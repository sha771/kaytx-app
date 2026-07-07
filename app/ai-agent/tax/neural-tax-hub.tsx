import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'neural-tax-hub',
    name: 'AI Neural Tax Hub',
    title: 'Neural Tax Hub',
    description: 'Central tax coordination and management system with AI-powered workflow optimization',
    capabilities: ["Tax Coordination","Workflow Automation","Compliance Management","Process Optimization"],
    icon: Briefcase,
    color: '#2E7D32',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Tax Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7.7k',
      tasksAutomatedDaily: 312,
      responseTime: '0.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Tax',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
