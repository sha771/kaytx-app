import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { GraduationCap } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-learning-development-2',
    name: 'Director of Learning & Development - Technical Skills',
    title: 'AI Director of Learning & Development - Technical Skills',
    description: 'The AI Director of Learning & Development for Technical Skills oversees technical training programs, skill development, and certification initiatives across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Technical Training Strategy","Skill Development Programs","Certification Management","Technical Assessment","Learning Paths Design","Vendor Management","Team Leadership"],
    icon: GraduationCap,
    color: '#9C27B0',
    type: 'employee' as const,
    humanCost: '$165k/year',
    aiCost: '$3.5k/year',
    efficiency: '47x efficiency improvement',
    replacesRole: 'director-learning',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 870,
      responseTime: '1.6s',
      accuracyRate: '96.8%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'vp-learning',
      manages: ['technical-trainers', 'learning-administrators'],
    },
    specializedCapabilities: [
      'Technical Training',
      'Skill Gap Analysis',
      'Certification Programs',
      'Learning Path Design',
      'Vendor Management',
      'Technical Assessment',
      'Platform Management',
      'Skills Analytics'
    ],
    integrationOptions: [
      'Technical LMS',
      'Certification Platforms',
      'Learning Libraries',
      'Assessment Tools',
      'Vendor Systems',
      'Skills Platforms',
      'Analytics Suite',
      'Video Learning'
    ],
    automationFeatures: [
      'Skill Assessment',
      'Path Assignment',
      'Certification Tracking',
      'Progress Monitoring',
      'Vendor Coordination',
      'Reporting Automation',
      'Resource Management',
      'Communication Automation'
    ],
    kpiMetrics: [
      'Skill Coverage',
      'Certification Rate',
      'Training Completion',
      'Skill Acquisition Speed',
      'Platform Adoption',
      'Training Effectiveness',
      'Cost per Learner',
      'Satisfaction Score'
    ],
    customOptions: {
      focus: 'technical',
      programType: 'skills-based',
      certificationFocus: 'industry-standard',
      learningModel: 'adaptive',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts skill needs' },
      { id: 'skills', enabled: true, name: 'Skills Core', description: 'Manages skill development' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dld_1', name: 'Technical Training', category: 'Training', description: 'Train technical skills', level: 'expert' },
      { id: 'dld_2', name: 'Skill Analysis', category: 'Analytics', description: 'Analyze skill gaps', level: 'expert' },
      { id: 'dld_3', name: 'Certification', category: 'Programs', description: 'Manage certifications', level: 'expert' },
      { id: 'dld_4', name: 'Learning Design', category: 'Design', description: 'Design learning paths', level: 'expert' },
      { id: 'dld_5', name: 'Vendor Management', category: 'Operations', description: 'Manage learning vendors', level: 'expert' }
    ],
    personality: [
      { trait: 'Tech-savvy', value: 10, description: 'Understands technical skills' },
      { trait: 'Innovative', value: 9, description: 'Innovative in learning' },
      { trait: 'Organized', value: 9, description: 'Organized programs' },
      { trait: 'Analytical', value: 9, description: 'Analytical in assessment' },
      { trait: 'Collaborative', value: 8, description: 'Works with technical teams' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
