import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'financial-communications-specialist',
    name: 'financial-communications-specialist',
    title: 'AI Financial Communications Specialist',
    description: 'The AI Financial Communications Specialist specializes in financial messaging, investor communications, earnings call preparation, and financial narrative development. This agent ensures clear and compelling financial communication across all stakeholders.',
    capabilities: ["Financial Communications","Investor Relations","Earnings Call Prep","Financial Storytelling","Press Release Writing","Shareholder Communications","Financial Disclosure","Message Development","Stakeholder Engagement","Crisis Communications"],
    icon: MessageSquare,
    color: '#00695C',
    type: 'agent' as const,
    humanCost: '$105k/year',
    aiCost: '$1.4k/year',
    efficiency: '75x efficiency improvement',
    replacesRole: 'financial-communications-specialist',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$8675',
      tasksAutomatedDaily: 318,
      responseTime: '0.9s',
      accuracyRate: '97.5%',
    },
    hierarchy: {
      department: 'Finance',
      level: 'specialist',
      reportsTo: 'vp-investor-relations',
      manages: [],
    },
    specializedCapabilities: [
      'Financial Messaging',
      'Investor Communications',
      'Earnings Preparation',
      'Financial Storytelling',
      'Press Release Writing',
      'Shareholder Engagement',
      'Disclosure Management',
      'Crisis Communication'
    ],
    integrationOptions: [
      'Communication Platforms',
      'Investor Relations Tools',
      'Content Management',
      'CRM Systems',
      'Analytics Platforms',
      'Social Media Tools',
      'Email Systems',
      'Distribution Services'
    ],
    automationFeatures: [
      'Message Drafting',
      'Press Release Automation',
      'Investor Q&A Preparation',
      'Content Generation',
      'Distribution Management',
      'Response Tracking',
      'Analytics Reporting',
      'Compliance Checking'
    ],
    kpiMetrics: [
      'Message Clarity',
      'Investor Engagement',
      'Media Coverage',
      'Response Rate',
      'Story Consistency',
      'Disclosure Accuracy',
      'Stakeholder Satisfaction',
      'Crisis Response Time'
    ],
    customOptions: {
      tone: 'professional',
      audience: 'investors',
      channel: 'multi-channel',
      complexity: 'balanced',
      frequency: 'regular'
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts communication impact' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects message inconsistencies' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Analyzer', description: 'Analyzes stakeholder sentiment' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'fc_1', name: 'Financial Writing', category: 'Communications', description: 'Write financial content', level: 'expert' },
      { id: 'fc_2', name: 'Investor Relations', category: 'Relations', description: 'Manage investor communications', level: 'expert' },
      { id: 'fc_3', name: 'Message Development', category: 'Strategy', description: 'Develop financial messages', level: 'expert' },
      { id: 'fc_4', name: 'Crisis Communication', category: 'Crisis', description: 'Handle financial crises', level: 'advanced' },
      { id: 'fc_5', name: 'Storytelling', category: 'Communications', description: 'Create financial narratives', level: 'expert' }
    ],
    personality: [
      { trait: 'Clarity', value: 10, description: 'Communicates complex concepts clearly' },
      { trait: 'Professionalism', value: 10, description: 'Maintains professional tone' },
      { trait: 'Persuasiveness', value: 9, description: 'Crafts compelling messages' },
      { trait: 'Responsiveness', value: 9, description: 'Responds quickly to inquiries' },
      { trait: 'Adaptability', value: 8, description: 'Adapts to different audiences' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
