import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HeartPulse } from 'lucide-react-native';

export default function StudentWellnessMonitorPage() {
  const agent = {
    id: 'student-wellness-monitor',
    name: 'AI Student Wellness Monitor',
    title: 'Education Agent',
    description: 'Automated Student Wellness Monitor agent specializing in student wellness tracking with advanced AI capabilities for mental health monitoring, wellness program management, and support resource connection.',
    capabilities: ["Mental Health Monitoring","Wellness Program Management","Support Resource Connection","Wellness Analytics","Crisis Detection","Preventive Care"],
    icon: HeartPulse,
    color: '#EC4899',
    type: 'agent' as const,
    humanCost: '$49k/year',
    aiCost: '$1.0k/year',
    efficiency: '13x efficiency improvement',
    replacesRole: 'Wellness Coordinator',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.5%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,200',
      tasksAutomatedDaily: 75,
      responseTime: '<2s',
      accuracyRate: '94%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}