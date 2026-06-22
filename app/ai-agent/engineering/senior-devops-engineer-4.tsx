import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Server } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'senior-devops-engineer-4',
    name: 'Senior DevOps Engineer',
    title: 'Senior DevOps Engineer',
    description: 'The Senior DevOps Engineer AI manages CI/CD pipelines, infrastructure automation, and deployment strategies to ensure reliable software delivery.',
    capabilities: ["CI/CD Pipeline Management","Infrastructure as Code","Container Orchestration","Cloud Infrastructure","Deployment Automation","Monitoring & Logging"],
    icon: Server,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$4k/year',
    efficiency: '41x efficiency improvement',
    replacesRole: 'DevOps Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 840,
      responseTime: '1.2s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
