import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Laptop } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'maintenance-technician',
    name: 'maintenance-technician',
    title: 'maintenance-technician',
    description: 'The maintenance-technician AI provides specialized services and automation within its department.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Laptop,
    color: '#FF5722',
    type: 'agent' as const,
    humanCost: '$90k/year',
    aiCost: '$1k/year',
    efficiency: '90x efficiency improvement',
    replacesRole: 'maintenance-technician',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 520,
      responseTime: '0.8s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Manufacturing',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
