import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Database } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'database-architect-2',
    name: 'Database Architect',
    title: 'Database Architect',
    description: 'The Database Architect AI designs database schemas, optimizes database performance, and ensures data integrity and scalability.',
    capabilities: ["Database Design","Schema Optimization","Query Optimization","Data Modeling","Database Migration","Performance Tuning"],
    icon: Database,
    color: '#795548',
    type: 'employee' as const,
    humanCost: '$160k/year',
    aiCost: '$4k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'Database Architecture',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 810,
      responseTime: '1.4s',
      accuracyRate: '95.6%',
    },
    hierarchy: {
      department: 'Engineering',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
