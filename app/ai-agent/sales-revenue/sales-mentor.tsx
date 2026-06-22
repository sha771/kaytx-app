import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function SalesMentorPage() {
  const agent = {
    id: 'sales-mentor',
    name: 'AI Sales Mentor',
    title: 'AI Sales Mentor',
    description: 'The AI Sales Mentor provides guidance and mentorship to sales team members to accelerate their growth and performance.',
    capabilities: ["Task Automation","Data Processing","Sales Mentoring","Performance Coaching","Skill Development","Communication","Analytics","Sales Intelligence"],
    icon: GraduationCap,
    color: '#10B981',
    type: 'agent' as const,
    humanCost: '$72k/year',
    aiCost: '$4k/year',
    efficiency: '18x efficiency improvement',
    replacesRole: 'sales-mentor',
    infrastructure: {
      status: 'online' as const,
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'standard' as const,
    },
    roiMetrics: {
      savingsPerMonth: '$5,700',
      tasksAutomatedDaily: 312,
      responseTime: '0.6s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Sales & Revenue',
      level: 'mentor',
      reportsTo: 'sales-training-manager',
      manages: [],
    },
    specializedCapabilities: [
      'Sales Mentoring',
      'Performance Coaching',
      'Skill Development',
      'Communication',
      'Analytics',
      'Sales Intelligence'
    ],
    integrationOptions: [
      'Mentoring Platforms',
      'Coaching Tools',
      'Training Systems',
      'Communication Platforms',
      'Mentorship Data',
      'Performance Data',
      'Sales Systems',
      'Performance Tracking'
    ],
    automationFeatures: [
      'Sales Mentoring',
      'Performance Coaching',
      'Skill Development',
      'Communication Automation',
      'Analytics Generation',
      'Performance Tracking',
      'Sales Intelligence'
    ],
    kpiMetrics: [
      'Mentorship Quality',
      'Coaching Impact',
      'Skill Growth',
      'Communication Effectiveness',
      'Sales Intelligence',
      'Cost Efficiency',
      'Performance Metrics'
    ],
    customOptions: {
      mentorshipFocus: 'high',
      coachingEfficiency: 'maximum',
      skillAccuracy: 'optimized',
      integrationLevel: 'comprehensive'
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
      { id: 'mentorship', enabled: true, name: 'Mentorship Engine', description: 'Provides mentorship' },
      { id: 'coaching', enabled: true, name: 'Performance Coach', description: 'Coaches performance' },
      { id: 'skill', enabled: true, name: 'Skill Developer', description: 'Develops skills' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'sales_1', name: 'Sales Mentoring', category: 'Mentoring', description: 'Mentor sales', level: 'expert' },
      { id: 'sales_2', name: 'Performance Coaching', category: 'Coaching', description: 'Coach performance', level: 'expert' },
      { id: 'sales_3', name: 'Skill Development', category: 'Skill', description: 'Develop skills', level: 'expert' },
      { id: 'sales_4', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'expert' },
      { id: 'sales_5', name: 'Analytics', category: 'Analytics', description: 'Analyze data', level: 'expert' }
    ],
    personality: [
      { trait: 'Mentorship Expertise', value: 10, description: 'Mentorship expertise' },
      { trait: 'Coaching Focus', value: 10, description: 'Coaching oriented' },
      { trait: 'Skill Skills', value: 10, description: 'Skill skilled' },
      { trait: 'Communication', value: 10, description: 'Excellent communication' },
      { trait: 'Professionalism', value: 9, description: 'Highly professional' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
