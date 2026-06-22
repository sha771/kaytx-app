import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { BookOpen } from 'lucide-react-native';

export default function CourseDesignPlatformPage() {
  const agent = {
    id: 'course-design-platform',
    name: 'AI Course Design Platform',
    title: 'Education Agent',
    description: 'Automated Course Design Platform agent specializing in curriculum development with advanced AI capabilities for course structure design, content organization, and learning outcome alignment.',
    capabilities: ["Course Structure Design","Content Organization","Learning Outcome Alignment","Curriculum Mapping","Standard Compliance","Design Analytics"],
    icon: BookOpen,
    color: '#F59E0B',
    type: 'agent' as const,
    humanCost: '$52k/year',
    aiCost: '$1.0k/year',
    efficiency: '14x efficiency improvement',
    replacesRole: 'Course Designer',
    infrastructure: {
      status: 'online',
      health: 96,
      uptime: '99.6%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,400',
      tasksAutomatedDaily: 55,
      responseTime: '<3s',
      accuracyRate: '95%',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}