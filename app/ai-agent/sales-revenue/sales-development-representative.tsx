import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PhoneCall } from 'lucide-react-native';

export default function SalesDevelopmentRepresentativePage() {
  const agent = {
    id: 'sales-development-representative',
    name: 'AI Sales Development Representative',
    title: 'AI Sales Development Representative',
    description: 'The AI Sales Development Representative qualifies leads and schedules meetings for account executives through outbound prospecting.',
    capabilities: ["Task Automation","Data Processing","Lead Qualification","Meeting Scheduling","Outbound Prospecting","Communication","Analytics","Sales Intelligence"],
    icon: PhoneCall,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$55k/year',
    aiCost: '$3k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'sales-development-representative',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,300',
      tasksAutomatedDaily: 265,
      responseTime: '0.6s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'representative',
      reportsTo: 'sales-pipeline-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Lead Qualification',
      'Meeting Scheduling',
      'Outbound Prospecting',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'CRM Systems',
      'Scheduling Tools',
      'Prospecting Platforms',
      'Communication Platforms',
      'Lead Data',
      'Meeting Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Lead Qualification',
      'Meeting Scheduling',
      'Outbound Prospecting',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Qualified Leads',
      'Meetings Scheduled',
      'Prospecting Success',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      qualificationFocus: 'high',
      schedulingEfficiency: 'maximum',
      prospectingAccuracy: 'optimized',
      integrationLevel: 'comprehensive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'qualification', enabled: true, name: 'Lead Qualifier', description: 'Qualifies leads' },
      { id: 'scheduling', enabled: true, name: 'Meeting Scheduler', description: 'Schedules meetings' },
      { id: 'prospecting', enabled: true, name: 'Outbound Prospector', description: 'Prospects outbound' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Lead Qualification', category: 'Qualification', description: 'Qualify leads', level: 'expert' },
      { id: 'sales_2', name: 'Meeting Scheduling', category: 'Scheduling', description: 'Schedule meetings', level: 'expert' },
      { id: 'sales_3', name: 'Outbound Prospecting', category: 'Prospecting', description: 'Prospect outbound', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Qualification Expertise', value: 10, description: 'Qualification expertise' },
      { trait: 'Scheduling Focus', value: 10, description: 'Scheduling oriented' },
      { trait: 'Prospecting Skills', value: 10, description: 'Prospecting skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
