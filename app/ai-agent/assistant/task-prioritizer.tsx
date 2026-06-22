import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'task-prioritizer',
    name: 'AI Task Prioritizer',
    title: 'Task Priority Management AI',
    description: 'The AI Task Prioritizer intelligently organizes and prioritizes tasks, manages to-do lists, and optimizes your productivity through smart scheduling and workload balancing.',
    capabilities: ["Task Prioritization","To-Do Management","Productivity Optimization","Deadline Tracking","Workload Balancing","Goal Alignment","Focus Time Scheduling","Progress Tracking"],
    icon: Cpu,
    color: '#2196F3',
    type: 'agent' as const,
    humanCost: '$78k/year',
    aiCost: '$1k/year',
    efficiency: '78x efficiency improvement',
    replacesRole: 'Task Priority Management AI',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$5',
      tasksAutomatedDaily: 1135,
      responseTime: '0.4s',
      accuracyRate: '98.4%',
    },
    hierarchy: {
      department: 'Assistant',
    },

  };
  return <AgentPageWrapper agent={agent} />;
}
