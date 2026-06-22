import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Video } from 'lucide-react-native';

export default function MeetingRoomBookerPage() {
  const agent = {
    id: 'meeting-room-booker',
    name: 'AI Meeting Room Booker',
    title: 'Facilities Sub-Agent',
    description: 'Handles meeting room reservations, equipment booking, and setup coordination with automated conflict detection.',
    capabilities: ["Task Automation","Data Processing","Workflow Coordination","Performance Reporting","Quality Assurance","Compliance Monitoring"],
    icon: Video,
    color: '#7C3AED',
    type: 'agent' as const,
    humanCost: '$50k/year',
    aiCost: '$1.0k/year',
    efficiency: '15x efficiency improvement',
    replacesRole: 'Meeting Room Booker',
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
