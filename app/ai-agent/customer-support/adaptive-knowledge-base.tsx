import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'adaptive-knowledge-base',
    name: 'AI Adaptive Knowledge Base',
    title: 'Adaptive Knowledge Base',
    description: 'Adaptive knowledge base and self-service with intelligent content management',
    capabilities: ["Knowledge Management","Self-Service","Content Organization","Adaptive Learning"],
    icon: Database,
    color: '#1976D2',
    type: 'employee' as const,
    humanCost: '$58k/year',
    aiCost: '$1.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'Knowledge Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$4.7k',
      tasksAutomatedDaily: 412,
      responseTime: '0.3s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Customer Support',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
