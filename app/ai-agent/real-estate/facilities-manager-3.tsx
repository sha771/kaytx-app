import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Shield } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'facilities-manager-3',
    uid: 'ktx-15-facilities-manager-3',
    name: 'Facilities Manager 3',
    title: 'Security Facilities Manager',
    description: 'Security Facilities Manager manages building security, access control, and security systems.',
    capabilities: ['Building Security', 'Access Control', 'Security Systems', 'Safety Management', 'Emergency Response'],
    color: '#8D6E63',
    type: 'agent' as const,
    humanCost: '$115k/year',
    aiCost: '$2,300/mo',
    efficiency: '90% efficiency',
    replacesRole: 'Facilities Manager',
    infrastructure: {
      status: 'online',
      health: 92,
      uptime: '99.2%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$9,133',
      tasksAutomatedDaily: 470,
      responseTime: '2.5s',
      accuracyRate: '94.0%',
    },
    hierarchy: {
      department: 'Real Estate & Property',
      level: 'manager',
      departmentId: 15,
    },
  };
  return <AgentPageWrapper agent={agent} />;
}
