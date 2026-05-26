import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Laptop } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'team-leads',
    name: 'Team Lead Level',
    title: 'Technical & Functional Team Leaders',
    description: 'The Team Lead level represents technical and functional leaders who guide daily team activities. These agents combine hands-on expertise with leadership capabilities, mentoring specialists while maintaining technical contributions to projects.',
    capabilities: ["Task Automation","Data Processing","Workflow Management"],
    icon: Laptop,
    color: '#9C27B0',
    type: 'agent' as const,
    humanCost: '$76k/year',
    aiCost: '$1k/year',
    efficiency: '76x efficiency improvement',
    replacesRole: 'Technical & Functional Team Leaders',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 564,
      responseTime: '0.5s',
      accuracyRate: '98.5%',
    },
    hierarchy: {
      department: 'Hierarchy',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
