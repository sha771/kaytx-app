import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Headset } from 'lucide-react-native';

export default function ITSupportPage() {
  const agent = {
    id: 'it-support',
    name: 'AI IT Support',
    title: 'AI IT Support',
    description: 'The AI IT Support provides technical assistance, resolves IT issues, maintains systems, and ensures technology infrastructure reliability across retail operations.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Technical Support","Issue Resolution","System Maintenance","Infrastructure Management","User Support","Troubleshooting","Documentation"],
    icon: Headset,
    color: '#004D40',
    type: 'employee' as const,
    humanCost: '$55k/year',
    aiCost: '$1.2k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'it-support',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,400',
      tasksAutomatedDaily: 350,
      responseTime: '1.0s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Retail & Stores',
      level: 'support',
      reportsTo: 'vp-retail-technology',
      manages: [],
    },
    specializedCapabilities: [
      'Technical Support',
      'Issue Resolution',
      'System Maintenance',
      'Infrastructure Management',
      'User Support',
      'Troubleshooting',
      'Documentation',
      'Preventive Maintenance'
    ],
    integrationOptions: [
      'Support Systems',
      'Monitoring Tools',
      'Ticketing Platforms',
      'Communication Systems',
      'Knowledge Base',
      'Remote Support',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Technical Support',
      'Issue Resolution',
      'System Maintenance',
      'Infrastructure Monitoring',
      'User Support',
      'Troubleshooting',
      'Documentation',
      'Preventive Maintenance'
    ],
    kpiMetrics: [
      'Response Time',
      'Resolution Rate',
      'System Uptime',
      'User Satisfaction',
      'Issue Volume',
      'First Contact Resolution',
      'Documentation Quality',
      'Preventive Maintenance'
    ],
    customOptions: {
      responseSpeed: 'fast',
      resolutionRate: 'high',
      userSatisfaction: 'high',
      systemReliability: 'high',
      documentationQuality: 'high'
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
      { id: 'support', enabled: true, name: 'Support Assistant', description: 'Assists with technical support' },
      { id: 'troubleshoot', enabled: true, name: 'Troubleshooter', description: 'Troubleshoots IT issues' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'it_1', name: 'Technical Support', category: 'Support', description: 'Provide technical support', level: 'expert' },
      { id: 'it_2', name: 'Issue Resolution', category: 'Resolution', description: 'Resolve IT issues', level: 'expert' },
      { id: 'it_3', name: 'System Maintenance', category: 'Maintenance', description: 'Maintain systems', level: 'expert' },
      { id: 'it_4', name: 'Troubleshooting', category: 'Troubleshooting', description: 'Troubleshoot issues', level: 'advanced' },
      { id: 'it_5', name: 'User Support', category: 'User', description: 'Support users', level: 'advanced' }
    ],
    personality: [
      { trait: 'Helpful', value: 10, description: 'Helpful support' },
      { trait: 'Technical Expertise', value: 10, description: 'Strong technical expertise' },
      { trait: 'Patient', value: 10, description: 'Patient with users' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' },
      { trait: 'Communication', value: 9, description: 'Clear communicator' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
