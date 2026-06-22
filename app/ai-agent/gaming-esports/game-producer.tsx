import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Gamepad2 } from 'lucide-react-native';

export default function AIGameProducerPage() {
  const agent = {
    id: 'game-producer',
    name: 'AI Game Producer',
    title: 'AI Game Producer',
    description: 'The AI Game Producer manages game development pipelines, coordinates cross-functional teams, and ensures timely delivery of high-quality gaming experiences.',
    capabilities: ["Project Management","Team Coordination","Quality Assurance","Timeline Management","Budget Control","Stakeholder Communication","Risk Management","Delivery Excellence"],
    icon: Gamepad2,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$145k/year',
    aiCost: '$3k/year',
    efficiency: '48x efficiency improvement',
    replacesRole: 'game-producer',
    hierarchy: {
      department: 'Gaming & Esports',
      level: 'manager',
      reportsTo: 'cto'
    },
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8,455',
      tasksAutomatedDaily: 599,
      responseTime: '0.7s',
      accuracyRate: '97.6%',
    }
  };
  return <AgentPageWrapper agent={agent} />;
}
