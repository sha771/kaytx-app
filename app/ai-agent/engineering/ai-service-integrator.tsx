import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HelpCircle } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-service-integrator',
    name: 'AI Service Integrator',
    title: 'Engineering',
    description: 'The AI Service Integrator connects internal and external systems through APIs, middleware, and event-driven architectures for seamless data flow.',
    capabilities: ["API Integration","Middleware Configuration","Event-Driven Architecture","Service Mesh Management","Webhook Management","Integration Testing"],
    icon: HelpCircle,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$66k/year',
    aiCost: '$1k/year',
    efficiency: '66x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4',
      tasksAutomatedDaily: 1063,
      responseTime: '1.5s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
