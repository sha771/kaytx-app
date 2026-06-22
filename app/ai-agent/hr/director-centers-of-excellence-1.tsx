import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Star } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-centers-of-excellence-1',
    name: 'Director of Centers of Excellence - Talent & Culture',
    title: 'AI Director of Centers of Excellence - Talent & Culture',
    description: 'The AI Director of Centers of Excellence for Talent & Culture oversees specialized talent and culture programs, best practices development, and expertise sharing.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Talent COE','Culture COE','Best Practices','Expertise Development','Knowledge Sharing','Program Excellence','Team Leadership"],
    icon: Star,
    color: '#FFC107',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-coe',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 875,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['talent-coe-team', 'culture-coe-team'],
    },
    specializedCapabilities: [
      'Talent COE',
      'Culture COE',
      'Best Practices',
      'Expertise Development',
      'Knowledge Sharing',
      'Program Excellence',
      'Thought Leadership',
      'Innovation'
    ],
    integrationOptions: [
      'COE Platforms',
      'Knowledge Systems',
      'Best Practice Libraries',
      'Talent Systems',
      'Culture Platforms',
      'Analytics Suite',
      'Communication Tools',
      'Learning Systems'
    ],
    automationFeatures: [
      'Best Practice Capture',
      'Knowledge Sharing',
      'Expertise Mapping',
      'Program Standardization',
      'Innovation Tracking',
      'Thought Leadership',
      'Report Generation',
      'Insight Delivery'
    ],
    kpiMetrics: [
      'Best Practice Adoption',
      'Expertise Coverage',
      'Knowledge Sharing',
      'Program Excellence',
      'Innovation Rate',
      'Thought Leadership',
      'User Engagement',
      'Program ROI'
    ],
    customOptions: {
      coeFocus: 'talent-culture',
      bestPracticeModel: 'industry-leading',
      knowledgeStrategy: 'shared',
      innovationLevel: 'high',
      dataDriven: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts talent needs' },
      { id: 'excellence', enabled: true, name: 'Excellence Core', description: 'Drives excellence' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dcoe_1', name: 'Talent COE', category: 'Talent', description: 'Lead talent COE', level: 'expert' },
      { id: 'dcoe_2', name: 'Culture COE', category: 'Culture', description: 'Lead culture COE', level: 'expert' },
      { id: 'dcoe_3', name: 'Best Practices', category: 'Practices', description: 'Develop best practices', level: 'expert' },
      { id: 'dcoe_4', name: 'Expertise Development', category: 'Development', description: 'Develop expertise', level: 'expert' },
      { id: 'dcoe_5', name: 'Knowledge Sharing', category: 'Knowledge', description: 'Share knowledge', level: 'expert' }
    ],
    personality: [
      { trait: 'Excellence-driven', value: 10, description: 'Driven by excellence' },
      { trait: 'Innovative', value: 9, description: 'Innovative mindset' },
      { trait: 'Knowledge-focused', value: 9, description: 'Focuses on knowledge' },
      { trait: 'Thought-leader', value: 9, description: 'Thought leadership' },
      { trait: 'Collaborative', value: 8, description: 'Collaborates across org' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
