import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cloud-security-specialist',
    name: 'Cloud Security Specialist',
    title: 'Engineering',
    description: 'The Cloud Security Specialist secures cloud infrastructure across AWS, Azure, and GCP with cloud-native security practices.',
    capabilities: ["Cloud Security","CSPM","IAM Management","Cloud Compliance","Container Security","Cloud Monitoring"],
    icon: Shield,
    color: '#0277BD',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$1k/year',
    efficiency: '115x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9',
      tasksAutomatedDaily: 789,
      responseTime: '0.9s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
