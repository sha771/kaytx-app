import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Bot } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'meeting-summarizer',
    name: 'AI Meeting Summarizer',
    title: 'Meeting Summary AI',
    description: 'The AI Meeting Summarizer attends meetings, creates comprehensive summaries, tracks action items, and ensures nothing falls through the cracks.',
    capabilities: ["Meeting Attendance","Summary Creation","Action Item Tracking","Transcription","Key Points Extraction","Decision Logging","Follow-up Reminders","Meeting Analytics"],
    icon: Bot,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$87k/year',
    aiCost: '$1k/year',
    efficiency: '87x efficiency improvement',
    replacesRole: 'Meeting Summary AI',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$6',
      tasksAutomatedDaily: 1150,
      responseTime: '0.5s',
      accuracyRate: '98.7%',
    },
    hierarchy: {
      department: 'Assistant',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
