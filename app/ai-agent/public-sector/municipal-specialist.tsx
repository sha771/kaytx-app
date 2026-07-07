import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';

export default function AgentPage() {
  const agent = {
    id: 'ai-municipal-specialist',
    uid: 'ktx-20-municipal-specialist',
    name: 'AI Municipal Specialist',
    title: 'AI Municipal Specialist',
    description: 'AI Municipal Specialist focuses on local government operations and city-level services. This AI agent manages municipal programs, coordinates with city departments, and addresses community needs at the local level.',
    capabilities: ['Municipal Services', 'Local Policy Analysis', 'City Planning Support', 'Community Programs', 'Municipal Compliance'],
    color: '#37474F',
    type: 'agent' as const,
    humanCost: '$65k/year',
    aiCost: '$850/mo',
    efficiency: '88% efficiency',
    replacesRole: 'Municipal Specialist',
    subAgents: [
      { id: 'ai-city-services-coordinator', uid: 'ktx-20-city-services-coordinator', name: 'AI City Services Coordinator', title: 'AI City Services Coordinator', route: '/ai-agent/government/city-services-coordinator' },
      { id: 'ai-local-policy-analyst', uid: 'ktx-20-local-policy-analyst', name: 'AI Local Policy Analyst', title: 'AI Local Policy Analyst', route: '/ai-agent/government/local-policy-analyst' },
      { id: 'ai-municipal-funding-specialist', uid: 'ktx-20-municipal-funding-specialist', name: 'AI Municipal Funding Specialist', title: 'AI Municipal Funding Specialist', route: '/ai-agent/government/municipal-funding-specialist' }
    ],
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3945',
      tasksAutomatedDaily: 198,
      responseTime: '2.0s',
      accuracyRate: '95.8%',
    },
    hierarchy: {
      department: 'Government & Public Sector',
      level: 'team_lead',
      departmentId: 20,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
