import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HardDrive } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'data-lake-engineer',
    name: 'Data Lake Engineer',
    title: 'Engineering',
    description: 'The Data Lake Engineer builds and manages data lakes using S3, ADLS, and GCS for scalable data storage.',
    capabilities: ["Data Lake Design","S3 Architecture","Data Lake Storage","Data Cataloging","Lakehouse Implementation","Data Organization"],
    icon: HardDrive,
    color: '#455A64',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1k/year',
    efficiency: '110x efficiency improvement',
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
      tasksAutomatedDaily: 743,
      responseTime: '1.0s',
      accuracyRate: '96.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
