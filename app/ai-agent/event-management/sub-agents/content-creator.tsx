import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { PenTool } from 'lucide-react-native';

export default function ContentCreatorPage() {
  const agent = {
    id: 'content-creator',
    name: 'AI Content Creator',
    title: 'AI Content Creator',
    description: 'The AI Content Creator creates engaging marketing content, writes promotional materials, and develops compelling event communications.',
    capabilities: ["Task Automation","Data Processing","Content Creation","Copywriting","Storytelling","Marketing Writing","Social Media Content","Blog Writing","Press Releases","Brand Voice"],
    icon: PenTool,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$60k/year',
    aiCost: '$2k/year',
    efficiency: '30x efficiency improvement',
    replacesRole: 'content-creator',
    infrastructure: {
      status: 'online' as const,
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$4,833',
      tasksAutomatedDaily: 425,
      responseTime: '2.1s',
      accuracyRate: '95.5%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'specialist',
      reportsTo: 'vp-event-marketing',
      manages: [],
    },
    specializedCapabilities: [
      'Content Creation',
      'Copywriting',
      'Storytelling',
      'Marketing Writing',
      'Social Media Content',
      'Blog Writing',
      'Press Releases',
      'Brand Voice',
      'SEO Writing',
      'Content Strategy'
    ],
    integrationOptions: [
      'Content Management Systems',
      'Social Media Platforms',
      'Blog Platforms',
      'Email Marketing Tools',
      'SEO Tools',
      'Design Software',
      'Analytics Platforms',
      'Publishing Tools'
    ],
    automationFeatures: [
      'Content Generation',
      'Social Media Posts',
      'Blog Articles',
      'Email Copy',
      'Press Releases',
      'Ad Copy',
      'Website Content',
      'Content Scheduling'
    ],
    kpiMetrics: [
      'Content Engagement',
      'Social Reach',
      'Blog Traffic',
      'Email Open Rate',
      'Press Coverage',
      'SEO Performance',
      'Brand Consistency',
      'Content ROI'
    ],
    customOptions: {
      writingStyle: 'engaging',
      brandVoice: 'consistent',
      seoOptimization: 'high',
      socialFocus: 'viral',
      contentQuality: 'premium'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: false,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: false,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'content', enabled: true, name: 'Content Generator', description: 'Generates engaging content' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes content sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cc_1', name: 'Content Creation', category: 'Content', description: 'Create compelling content', level: 'expert' },
      { id: 'cc_2', name: 'Copywriting', category: 'Copy', description: 'Write effective copy', level: 'expert' },
      { id: 'cc_3', name: 'Storytelling', category: 'Story', description: 'Tell engaging stories', level: 'expert' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Creative writer' },
      { trait: 'Writing', value: 10, description: 'Excellent writing skills' },
      { trait: 'Brand Voice', value: 9, description: 'Brand-conscious' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
