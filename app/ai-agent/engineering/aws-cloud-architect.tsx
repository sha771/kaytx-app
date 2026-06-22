import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'aws-cloud-architect',
    name: 'AWS Cloud Architect',
    title: 'Engineering',
    description: 'The AWS Cloud Architect designs and manages AWS infrastructure, services, and architectures for optimal performance and cost.',
    capabilities: ["AWS Architecture","EC2 and Lambda","S3 and Storage","VPC Networking","IAM Security","Cost Optimization"],
    icon: Cloud,
    color: '#FF9900',
    type: 'agent' as const,
    humanCost: '$125k/year',
    aiCost: '$1k/year',
    efficiency: '125x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$10',
      tasksAutomatedDaily: 845,
      responseTime: '0.9s',
      accuracyRate: '97.8%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
