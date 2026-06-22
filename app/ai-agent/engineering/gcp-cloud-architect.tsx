import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cloud } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'gcp-cloud-architect',
    name: 'GCP Cloud Architect',
    title: 'Engineering',
    description: 'The GCP Cloud Architect designs and manages Google Cloud Platform infrastructure, services, and cloud-native solutions.',
    capabilities: ["GCP Architecture","Compute Engine","Cloud Storage","VPC Networking","Cloud IAM Security","Kubernetes Engine"],
    icon: Cloud,
    color: '#4285F4',
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
      tasksAutomatedDaily: 848,
      responseTime: '0.9s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
