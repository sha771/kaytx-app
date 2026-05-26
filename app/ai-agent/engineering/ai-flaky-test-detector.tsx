import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'ai-flaky-test-detector',
    name: 'AI Flaky Test Detector',
    title: 'Engineering',
    description: 'The AI Flaky Test Detector identifies, analyzes, and helps fix unreliable tests to improve CI/CD pipeline stability and reduce false failures.',
    capabilities: ["Flaky Test Detection","Root Cause Analysis","Timing Issue Diagnosis","Environment Stability Analysis","Retry Logic Optimization","Test Isolation Verification"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'agent' as const,
    humanCost: '$95k/year',
    aiCost: '$1k/year',
    efficiency: '95x efficiency improvement',
    replacesRole: 'Engineering',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$7',
      tasksAutomatedDaily: 597,
      responseTime: '1.3s',
      accuracyRate: '95.9%',
    },
    hierarchy: {
      department: 'Engineering',
    },
  };

  return <AgentPageWrapper agent={agent} />;
}
