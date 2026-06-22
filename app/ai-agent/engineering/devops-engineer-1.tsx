import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Terminal } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'devops-engineer-1',
    name: 'DevOps Engineer',
    title: 'Engineering',
    description: 'The DevOps Engineer automates CI/CD pipelines, manages infrastructure as code, and bridges development and operations to enable continuous delivery.',
    capabilities: ["CI/CD Pipeline Automation","Infrastructure as Code","Container Orchestration","Deployment Automation","Monitoring Setup","Incident Response"],
    icon: Terminal,
    color: '#1976D2',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 587,
      responseTime: '1.1s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
