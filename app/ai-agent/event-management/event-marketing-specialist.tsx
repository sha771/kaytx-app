import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Target } from 'lucide-react-native';

export default function EventMarketingSpecialistPage() {
  const agent = {
    id: 'event-marketing-specialist',
    name: 'AI Event Marketing Specialist',
    title: 'AI Event Marketing Specialist',
    description: 'The AI Event Marketing Specialist executes event marketing campaigns, manages promotional activities, drives event attendance, and enhances event visibility through targeted marketing.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Campaign Execution","Social Media Marketing","Content Creation","Lead Generation","Event Promotion","Analytics Tracking","Brand Building"],
    icon: Target,
    color: '#3F51B5',
    type: 'employee' as const,
    humanCost: '$80k/year',
    aiCost: '$2.5k/year',
    efficiency: '32x efficiency improvement',
    replacesRole: 'event-marketing-specialist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6,458',
      tasksAutomatedDaily: 550,
      responseTime: '1.9s',
      accuracyRate: '96.0%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'specialist',
      reportsTo: 'vp-event-marketing',
      manages: ['social-media-coordinator', 'content-writer', 'promotions-assistant'],
    },
    specializedCapabilities: [
      'Campaign Execution',
      'Social Media Marketing',
      'Content Creation',
      'Lead Generation',
      'Event Promotion',
      'Analytics Tracking',
      'Brand Building',
      'Email Marketing',
      'Digital Advertising',
      'Audience Engagement'
    ],
    integrationOptions: [
      'Social Media Platforms',
      'Email Marketing Tools',
      'Content Management Systems',
      'Analytics Platforms',
      'Advertising Networks',
      'CRM Systems',
      'Design Tools',
      'Marketing Automation'
    ],
    automationFeatures: [
      'Social Media Posting',
      'Email Campaigns',
      'Content Scheduling',
      'Lead Capture',
      'Analytics Tracking',
      'Ad Management',
      'Report Generation',
      'Audience Targeting'
    ],
    kpiMetrics: [
      'Campaign Performance',
      'Event Attendance',
      'Social Engagement',
      'Lead Generation',
      'Conversion Rate',
      'Brand Awareness',
      'Content Performance',
      'ROI Achievement'
    ],
    customOptions: {
      marketingFocus: 'digital',
      creativityLevel: 'high',
      dataDriven: 'high',
      engagementFocus: 'high',
      brandConsistency: 'high'
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
      { id: 'marketing', enabled: true, name: 'Marketing Optimizer', description: 'Optimizes marketing campaigns' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes audience sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ems_1', name: 'Campaign Execution', category: 'Campaign', description: 'Execute marketing campaigns', level: 'expert' },
      { id: 'ems_2', name: 'Social Media Marketing', category: 'Social', description: 'Manage social media marketing', level: 'expert' },
      { id: 'ems_3', name: 'Content Creation', category: 'Content', description: 'Create marketing content', level: 'expert' },
      { id: 'ems_4', name: 'Lead Generation', category: 'Lead', description: 'Generate quality leads', level: 'advanced' },
      { id: 'ems_5', name: 'Analytics Tracking', category: 'Analytics', description: 'Track marketing analytics', level: 'advanced' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Creative marketer' },
      { trait: 'Data Driven', value: 9, description: 'Data-driven decisions' },
      { trait: 'Social Savvy', value: 10, description: 'Social media expertise' },
      { trait: 'Results Oriented', value: 9, description: 'Focus on results' },
      { trait: 'Adaptability', value: 8, description: 'Adaptable to trends' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
