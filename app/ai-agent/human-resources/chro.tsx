import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Users } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'chro',
    name: 'chro',
    title: 'AI Chief Human Resources Officer',
    description: 'The AI Chief Human Resources Officer leads HR strategy, oversees talent management, drives organizational culture, and ensures workforce excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","HR Strategy","Talent Management","Culture Leadership","Workforce Planning","Employee Engagement","Performance Management","Team Leadership"],
    icon: Users,
    color: '#E91E63',
    type: 'employee' as const,
    humanCost: '$203k/year',
    aiCost: '$4k/year',
    efficiency: '50x efficiency improvement',
    replacesRole: 'chro',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15',
      tasksAutomatedDaily: 883,
      responseTime: '1.7s',
      accuracyRate: '96.2%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-talent', 'vp-learning', 'vp-compensation', 'vp-culture', 'vp-hr-ops'],
    },
    specializedCapabilities: [
      'Resume Screening',
      'Interview Scheduling',
      'Onboarding',
      'Performance Management',
      'Employee Engagement',
      'Policy Compliance',
      'Training Coordination',
      'Benefits Administration',
      'Workforce Planning',
      'Culture Analysis'
    ],
    integrationOptions: [
      'ATS Platforms',
      'HRIS Systems',
      'Payroll Systems',
      'Learning Management',
      'Performance Tools',
      'Survey Platforms',
      'Benefits Providers',
      'Background Check Services'
    ],
    automationFeatures: [
      'Resume Parsing',
      'Interview Coordination',
      'Onboarding Workflows',
      'Performance Reviews',
      'Training Assignments',
      'Benefits Enrollment',
      'Policy Acknowledgments',
      'Exit Interviews'
    ],
    kpiMetrics: [
      'Time to Hire',
      'Quality of Hire',
      'Employee Satisfaction',
      'Retention Rate',
      'Training Completion',
      'Engagement Score',
      'Diversity Metrics',
      'Cost per Hire'
    ],
    customOptions: {
      candidateExperience: 'high-touch',
      developmentFocus: 'continuous',
      cultureAlignment: 'priority',
      diversityInclusion: 'active',
      wellbeingSupport: true
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts workforce trends and hiring needs' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Analyzes employee sentiment and engagement' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'hr_1', name: 'Talent Acquisition', category: 'Operations', description: 'Acquire top talent', level: 'expert' },
      { id: 'hr_2', name: 'Performance Management', category: 'Operations', description: 'Manage employee performance', level: 'expert' },
      { id: 'hr_3', name: 'Culture Building', category: 'Strategy', description: 'Build organizational culture', level: 'expert' },
      { id: 'hr_4', name: 'Workforce Planning', category: 'Analytics', description: 'Plan workforce needs', level: 'expert' },
      { id: 'hr_5', name: 'Employee Relations', category: 'Operations', description: 'Manage employee relations', level: 'expert' }
    ],
    personality: [
      { trait: 'Empathy', value: 10, description: 'Shows understanding and emotional intelligence' },
      { trait: 'Professionalism', value: 9, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Proactivity', value: 9, description: 'Takes initiative in interactions' },
      { trait: 'Efficiency', value: 8, description: 'Delivers quick, concise responses' },
      { trait: 'Analytical', value: 8, description: 'Breaks down problems logically' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
