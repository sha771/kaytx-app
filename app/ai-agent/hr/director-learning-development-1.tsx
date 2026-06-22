import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-learning-development-1',
    name: 'Director of Learning & Development - Leadership',
    title: 'AI Director of Learning & Development - Leadership',
    description: 'The AI Director of Learning & Development for Leadership oversees leadership development programs, executive coaching, and management training across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Leadership Development Strategy","Executive Coaching Design","Management Training","Succession Planning","Leadership Assessment","Program Evaluation","Team Leadership"],
    icon: GraduationCap,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$175k/year',
    aiCost: '$3.5k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'director-learning',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 890,
      responseTime: '1.5s',
      accuracyRate: '97.1%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-learning',
      manages: ['leadership-trainers', 'executive-coaches'],
    },
    specializedCapabilities: [
      'Leadership Strategy',
      'Executive Development',
      'Management Training',
      'Coaching Programs',
      'Succession Planning',
      'Leadership Assessment',
      'Mentorship Programs',
      'Leadership Analytics'
    ],
    integrationOptions: [
      'LMS Platforms',
      'Coaching Systems',
      'Assessment Tools',
      'Succession Planning',
      'Performance Systems',
      'Feedback Platforms',
      'Analytics Suite',
      'Video Learning'
    ],
    automationFeatures: [
      'Program Assignment',
      'Progress Tracking',
      'Assessment Scheduling',
      'Feedback Collection',
      'Reporting Automation',
      'Resource Allocation',
      'Communication Automation',
      'Evaluation Automation'
    ],
    kpiMetrics: [
      'Leadership Readiness',
      'Program Completion',
      'Leadership Quality',
      'Succession Coverage',
      'Coaching Impact',
      'Training Effectiveness',
      'Participant Satisfaction',
      'ROI of Programs'
    ],
    customOptions: {
      focus: 'leadership',
      programType: 'development',
      coachingLevel: 'executive',
      assessmentMethod: '360-degree',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts leadership needs' },
      { id: 'development', enabled: true, name: 'Development Core', description: 'Optimizes development programs' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dld_1', name: 'Leadership Development', category: 'Development', description: 'Develop leaders', level: 'expert' },
      { id: 'dld_2', name: 'Executive Coaching', category: 'Coaching', description: 'Coach executives', level: 'expert' },
      { id: 'dld_3', name: 'Management Training', category: 'Training', description: 'Train managers', level: 'expert' },
      { id: 'dld_4', name: 'Succession Planning', category: 'Strategy', description: 'Plan succession', level: 'expert' },
      { id: 'dld_5', name: 'Leadership Assessment', category: 'Assessment', description: 'Assess leadership', level: 'expert' }
    ],
    personality: [
      { trait: 'Leadership-focused', value: 10, description: 'Focuses on leadership' },
      { trait: 'Coaching-ability', value: 9, description: 'Strong coaching skills' },
      { trait: 'Strategic', value: 9, description: 'Strategic in development' },
      { trait: 'Empathetic', value: 9, description: 'Empathetic to leaders' },
      { trait: 'Results-driven', value: 8, description: 'Driven by results' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
