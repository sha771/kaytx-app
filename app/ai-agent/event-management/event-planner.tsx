import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Sparkles } from 'lucide-react-native';

export default function EventPlannerPage() {
  const agent = {
    id: 'event-planner',
    name: 'AI Event Planner',
    title: 'AI Event Planner',
    description: 'The AI Event Planner designs creative event concepts, develops event themes, creates detailed event plans, and ensures innovative and memorable event experiences.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Creative Design","Theme Development","Event Planning","Concept Creation","Experience Design","Trend Research","Innovation"],
    icon: Sparkles,
    color: '#FF4081',
    type: 'employee' as const,
    humanCost: '$95k/year',
    aiCost: '$2.5k/year',
    efficiency: '38x efficiency improvement',
    replacesRole: 'event-planner',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7,708',
      tasksAutomatedDaily: 700,
      responseTime: '1.7s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Event Management',
      level: 'specialist',
      reportsTo: 'vp-event-strategy',
      manages: ['design-specialist', 'theme-developer', 'creative-assistant'],
    },
    specializedCapabilities: [
      'Creative Design',
      'Theme Development',
      'Event Planning',
      'Concept Creation',
      'Experience Design',
      'Trend Research',
      'Innovation',
      'Visual Design',
      'Atmosphere Creation',
      'Guest Experience'
    ],
    integrationOptions: [
      'Design Tools',
      'Creative Software',
      'Trend Analysis Platforms',
      'Inspiration Resources',
      'Project Management Systems',
      'Collaboration Tools',
      'Presentation Software',
      'Image Libraries'
    ],
    automationFeatures: [
      'Concept Generation',
      'Theme Development',
      'Design Creation',
      'Trend Research',
      'Planning Documentation',
      'Presentation Creation',
      'Idea Organization',
      'Creative Briefing'
    ],
    kpiMetrics: [
      'Concept Innovation',
      'Client Satisfaction',
      'Theme Success',
      'Design Quality',
      'Trend Adoption',
      'Experience Rating',
      'Creative Efficiency',
      'Guest Feedback'
    ],
    customOptions: {
      creativityLevel: 'high',
      innovationFocus: 'high',
      trendAwareness: 'high',
      designQuality: 'premium',
      experienceFocus: 'immersive'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
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
      { id: 'creative', enabled: true, name: 'Creative Engine', description: 'Generates creative concepts' },
      { id: 'trend', enabled: true, name: 'Trend Analyzer', description: 'Analyzes event trends' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'ep_1', name: 'Creative Design', category: 'Creative', description: 'Design creative concepts', level: 'expert' },
      { id: 'ep_2', name: 'Theme Development', category: 'Theme', description: 'Develop event themes', level: 'expert' },
      { id: 'ep_3', name: 'Event Planning', category: 'Planning', description: 'Plan detailed events', level: 'expert' },
      { id: 'ep_4', name: 'Experience Design', category: 'Experience', description: 'Design guest experiences', level: 'advanced' },
      { id: 'ep_5', name: 'Trend Research', category: 'Research', description: 'Research event trends', level: 'advanced' }
    ],
    personality: [
      { trait: 'Creativity', value: 10, description: 'Highly creative' },
      { trait: 'Innovation', value: 10, description: 'Innovative thinker' },
      { trait: 'Artistic', value: 9, description: 'Strong artistic sense' },
      { trait: 'Trend Aware', value: 9, description: 'Aware of trends' },
      { trait: 'Detail Oriented', value: 8, description: 'Attention to design details' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
