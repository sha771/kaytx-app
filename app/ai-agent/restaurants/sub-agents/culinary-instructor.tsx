import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function CulinaryInstructorPage() {
  const agent = {
    id: 'culinary-instructor',
    name: 'AI Culinary Instructor',
    title: 'AI Culinary Instructor',
    description: 'The AI Culinary Instructor trains kitchen staff, develops culinary training programs, and ensures culinary skill development across the team.',
    capabilities: ["Culinary Training","Staff Development","Training Programs","Skill Assessment","Culinary Education","Technique Training","Kitchen Training","Performance Coaching","Culinary Standards","Training Excellence"],
    icon: GraduationCap,
    color: '#FF9800',
    type: 'employee' as const,
    humanCost: '$70k/year',
    aiCost: '$2.5k/year',
    efficiency: '28x efficiency improvement',
    replacesRole: 'culinary-instructor',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.8%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,600',
      tasksAutomatedDaily: 380,
      responseTime: '1.5s',
      accuracyRate: '97.0%',
    },
    hierarchy: {
      department: 'Restaurants',
      level: 'specialist',
      reportsTo: 'vp-culinary',
      manages: [],
    },
    specializedCapabilities: [
      'Culinary Training',
      'Staff Development',
      'Training Programs',
      'Skill Assessment',
      'Culinary Education',
      'Technique Training',
      'Kitchen Training',
      'Performance Coaching'
    ],
    integrationOptions: [
      'Training Platforms',
      'Assessment Tools',
      'Learning Management',
      'Skill Tracking',
      'Performance Systems',
      'Education Tools',
      'Coaching Platforms',
      'Training Analytics'
    ],
    automationFeatures: [
      'Training Delivery',
      'Skill Assessment',
      'Staff Development',
      'Performance Coaching',
      'Training Programs',
      'Culinary Education',
      'Technique Training',
      'Training Analytics'
    ],
    kpiMetrics: [
      'Training Effectiveness',
      'Skill Development',
      'Staff Competency',
      'Training Completion',
      'Performance Improvement',
      'Culinary Standards',
      'Coaching Success',
      'Training Excellence'
    ],
    customOptions: {
      trainingStyle: 'hands-on',
      developmentFocus: 'comprehensive',
      assessmentMethod: 'ongoing',
      coachingApproach: 'supportive',
      standardLevel: 'high'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: false,
      anomalyDetection: false,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'train', enabled: true, name: 'Trainer', description: 'Trains staff' },
      { id: 'assess', enabled: true, name: 'Skill Assessor', description: 'Assesses skills' },
      { id: 'coach', enabled: true, name: 'Performance Coach', description: 'Coaches performance' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'culinary_train_1', name: 'Culinary Training', category: 'Training', description: 'Train culinary staff', level: 'expert' },
      { id: 'culinary_train_2', name: 'Staff Development', category: 'Development', description: 'Develop staff', level: 'expert' },
      { id: 'culinary_train_3', name: 'Training Programs', category: 'Programs', description: 'Develop training programs', level: 'expert' },
      { id: 'culinary_train_4', name: 'Skill Assessment', category: 'Assessment', description: 'Assess skills', level: 'expert' },
      { id: 'culinary_train_5', name: 'Performance Coaching', category: 'Coaching', description: 'Coach performance', level: 'expert' }
    ],
    personality: [
      { trait: 'Teaching', value: 10, description: 'Excellent teaching skills' },
      { trait: 'Patience', value: 10, description: 'Highly patient' },
      { trait: 'Culinary Knowledge', value: 10, description: 'Deep culinary knowledge' },
      { trait: 'Coaching', value: 10, description: 'Excellent coaching skills' },
      { trait: 'Development', value: 10, description: 'Focused on development' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
