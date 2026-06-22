import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-technology-consultant',
    uid: 'ktx-06-technology-consultant',
    name: 'AI Technology Consultant',
    title: 'AI Technology Consultant',
    description: 'AI Technology Consultant provides expert technology advice and recommendations to organizations, helping them make informed decisions about technology investments, digital transformation, and strategic technology initiatives.',
    capabilities: ['Technology Advisory', 'Strategic Planning', 'Vendor Evaluation', 'Solution Assessment', 'Digital Transformation'],
    color: '#5E35B1',
    type: 'agent' as const,
    humanCost: '$110k/year',
    aiCost: '$1,400/mo',
    efficiency: '89% efficiency',
    replacesRole: 'Technology Consultant',
    infrastructure: {
      status: 'online',
      health: 94,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7666',
      tasksAutomatedDaily: 278,
      responseTime: '2.2s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Technology & Engineering',
      level: 'specialist',
      departmentId: 6,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
