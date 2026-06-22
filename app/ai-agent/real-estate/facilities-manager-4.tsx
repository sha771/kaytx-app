import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Leaf } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'facilities-manager-4',
    uid: 'ktx-15-facilities-manager-4',
    name: 'Facilities Manager 4',
    title: 'Sustainability Manager',
    description: 'Sustainability Manager manages sustainability initiatives, green building operations, and environmental compliance.',
    capabilities: ['Sustainability Management', 'Green Building', 'Environmental Compliance', 'Sustainability Reporting', 'Green Certifications'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$120k/year',
    aiCost: '$2,400/mo',
    efficiency: '91% efficiency',
    replacesRole: 'Facilities Manager',
    infrastructure: {
      status: 'online',
      health: 93,
      uptime: '99.3%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,333',
      tasksAutomatedDaily: 478,
      responseTime: '2.4s',
      accuracyRate: '94.5%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
