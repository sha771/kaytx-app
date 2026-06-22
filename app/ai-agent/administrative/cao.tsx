import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { FileText } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cao',
    name: 'cao',
    title: 'AI Chief Administrative Officer',
    description: 'The AI Chief Administrative Officer oversees all administrative operations, manages office and facilities coordination, handles travel and vendor management, and ensures administrative excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Office Management","Facilities Coordination","Travel Arrangements","Document Management","Meeting Coordination","Supply Management","Executive Support"],
    icon: FileText,
    color: '#5856D6',
    type: 'employee' as const,
    humanCost: '$193k/year',
    aiCost: '$3k/year',
    efficiency: '64x efficiency improvement',
    replacesRole: 'cao',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1064,
      responseTime: '0.4s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Administrative',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-admin-operations', 'vp-facilities', 'admin-manager', 'office-manager', 'executive-assistant'],
    },
    specializedCapabilities: [
      'Office Management',
      'Facilities Coordination',
      'Travel Arrangements',
      'Document Management',
      'Meeting Coordination',
      'Supply Management',
      'Vendor Management',
      'Event Planning',
      'Executive Support',
      'Policy Administration'
    ],
    integrationOptions: [
      'Calendar Systems',
      'Travel Platforms',
      'Document Management',
      'Facilities Management',
      'Vendor Systems',
      'Expense Management',
      'Communication Tools',
      'Project Management'
    ],
    automationFeatures: [
      'Meeting Scheduling',
      'Travel Booking',
      'Document Routing',
      'Supply Reordering',
      'Reminder Systems',
      'Report Generation',
      'Approval Workflows',
      'Notification Management'
    ],
    kpiMetrics: [
      'Response Time',
      'Service Quality',
      'Cost Savings',
      'Efficiency Metrics',
      'Stakeholder Satisfaction',
      'Process Compliance',
      'Resource Utilization',
      'Error Rate'
    ],
    customOptions: {
      serviceLevel: 'high',
      responsiveness: 'immediate',
      costConsciousness: 'high',
      stakeholderFocus: 'all',
      processEfficiency: 'optimized'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts administrative needs and resource requirements' }
    ],
    agentType: 'reactive',
    skills: [
      { id: 'admin_1', name: 'Office Management', category: 'Operations', description: 'Manage office operations', level: 'expert' },
      { id: 'admin_2', name: 'Document Management', category: 'Operations', description: 'Manage documents', level: 'expert' },
      { id: 'admin_3', name: 'Meeting Coordination', category: 'Operations', description: 'Coordinate meetings', level: 'expert' },
      { id: 'admin_4', name: 'Travel Management', category: 'Operations', description: 'Manage travel arrangements', level: 'expert' },
      { id: 'admin_5', name: 'Vendor Management', category: 'Operations', description: 'Manage vendor relationships', level: 'expert' }
    ],
    personality: [
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Efficiency', value: 10, description: 'Delivers quick, concise responses' },
      { trait: 'Proactivity', value: 9, description: 'Takes initiative in interactions' },
      { trait: 'Analytical', value: 8, description: 'Breaks down problems logically' },
      { trait: 'Assertiveness', value: 8, description: 'Confidently guides conversations' }
    ],

  };
  return <AgentPageWrapper agent={agent} />;
}
