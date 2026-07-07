import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'real-time-citizen-services',
    name: 'AI Real-Time Citizen Services',
    title: 'Real-Time Citizen Services',
    description: 'Real-time citizen services and support with AI-powered assistance',
    capabilities: ["Citizen Services","Real-Time Support","Service Delivery","Public Assistance"],
    icon: Users,
    color: '#1565C0',
    type: 'employee' as const,
    humanCost: '$75k/year',
    aiCost: '$2.0k/year',
    efficiency: '37x efficiency improvement',
    replacesRole: 'Citizen Services Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6.1k',
      tasksAutomatedDaily: 423,
      responseTime: '0.4s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Public Sector',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
