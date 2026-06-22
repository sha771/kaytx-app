import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { ClipboardList } from 'lucide-react-native';

export default function EventCoordinatorPage() {
  const agent = {
    id: 'event-coordinator',
    name: 'AI Event Coordinator',
    title: 'AI Event Coordinator',
    description: 'The AI Event Coordinator manages day-to-day event coordination, handles scheduling, communicates with stakeholders, and ensures all event details are properly organized.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Event Coordination","Scheduling","Communication","Detail Management","Documentation","Follow-up","Support"],
    icon: ClipboardList,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$85k/year',
    aiCost: '$2.5k/year',
    efficiency: '34x efficiency improvement',
    replacesRole: 'event-coordinator',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6,875',
      tasksAutomatedDaily: 600,
      responseTime: '1.8s',
      accuracyRate: '96.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'coordinator',
      reportsTo: 'event-manager',
      manages: ['event-assistant', 'scheduler', 'communications-specialist'],
    },
    specializedCapabilities: [
      'Event Coordination',
      'Scheduling',
      'Communication',
      'Detail Management',
      'Documentation',
      'Follow-up',
      'Stakeholder Management',
      'Task Tracking',
      'Issue Resolution',
      'Event Support'
    ],
    integrationOptions: [
      'Scheduling Tools',
      'Communication Platforms',
      'Project Management Systems',
      'Document Management',
      'Task Tracking Software',
      'CRM Systems',
      'Email Platforms',
      'Calendar Systems'
    ],
    automationFeatures: [
      'Scheduling',
      'Communication',
      'Task Tracking',
      'Documentation',
      'Follow-up Reminders',
      'Status Updates',
      'Report Generation',
      'Issue Logging'
    ],
    kpiMetrics: [
      'Coordination Efficiency',
      'Response Time',
      'Task Completion',
      'Communication Quality',
      'Documentation Accuracy',
      'Stakeholder Satisfaction',
      'Issue Resolution',
      'Follow-up Rate'
    ],
    customOptions: {
      responsiveness: 'high',
      detailLevel: 'high',
      communicationStyle: 'clear',
      organizationLevel: 'high',
      supportLevel: 'proactive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'coord', enabled: true, name: 'Coordinator', description: 'Optimizes coordination workflows' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects coordination issues' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ec_1', name: 'Event Coordination', category: 'Coordination', description: 'Coordinate event activities', level: 'expert' },
      { id: 'ec_2', name: 'Scheduling', category: 'Schedule', description: 'Manage event schedules', level: 'expert' },
      { id: 'ec_3', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'ec_4', name: 'Detail Management', category: 'Detail', description: 'Manage event details', level: 'advanced' },
      { id: 'ec_5', name: 'Documentation', category: 'Documentation', description: 'Document event activities', level: 'advanced' }
    ],
    personality: [
      { trait: 'Organization', value: 10, description: 'Exceptionally organized' },
      { trait: 'Communication', value: 10, description: 'Excellent communicator' },
      { trait: 'Detail Oriented', value: 10, description: 'Meticulous attention to detail' },
      { trait: 'Responsiveness', value: 9, description: 'Quick to respond' },
      { trait: 'Support', value: 9, description: 'Supportive team member' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
