import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function DiversityInclusionManagerPage() {
  const agent = {
    id: 'diversity-inclusion-manager',
    name: 'AI Diversity Inclusion Manager',
    title: 'Education Agent',
    description: 'Automated Diversity Inclusion Manager agent specializing in DEI initiatives with advanced AI capabilities for diversity analytics, inclusion program management, and bias detection.',
    capabilities: ["Diversity Analytics","Inclusion Program Management","Bias Detection","Compliance Monitoring","Training Coordination","Progress Reporting"],
    icon: Users,
    color: '#EC4899',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'DEI Director',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,300',
      tasksAutomatedDaily: 65,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}