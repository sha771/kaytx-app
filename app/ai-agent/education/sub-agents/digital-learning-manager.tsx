import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Laptop } from 'lucide-react-native';

export default function DigitalLearningManagerPage() {
  const agent = {
    id: 'digital-learning-manager',
    name: 'AI Digital Learning Manager',
    title: 'Education Agent',
    description: 'Automated Digital Learning Manager agent specializing in digital education management with advanced AI capabilities for online course management, LMS optimization, and digital resource coordination.',
    capabilities: ["Online Course Management","LMS Optimization","Digital Resource Coordination","Platform Integration","User Support","Technical Troubleshooting"],
    icon: Laptop,
    color: '#3B82F6',
    type: 'agent' as const,
    humanCost: '$51k/year',
    aiCost: '$1.0k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'Digital Learning Manager',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,400',
      tasksAutomatedDaily: 65,
      responseTime: '<2s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}