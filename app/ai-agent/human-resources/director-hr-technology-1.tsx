import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Cpu } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'director-hr-technology-1',
    name: 'Director of HR Technology - Systems & Platforms',
    title: 'AI Director of HR Technology - Systems & Platforms',
    description: 'The AI Director of HR Technology for Systems & Platforms manages HR technology stack, system implementations, and platform strategy.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","HR Systems Management","Platform Strategy","Technology Implementation","System Integration","Vendor Management","Technology Roadmap","Team Leadership"],
    icon: Cpu,
    color: '#00BCD4',
    type: 'employee' as const,
    humanCost: '$180k/year',
    aiCost: '$4k/year',
    efficiency: '45x efficiency improvement',
    replacesRole: 'director-hr-tech',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13',
      tasksAutomatedDaily: 905,
      responseTime: '1.3s',
      accuracyRate: '97.7%',
    },
    hierarchy: {
      department: 'Hr',
      level: 'director',
      reportsTo: 'chro',
      manages: ['hr-systems-admins', 'platform-engineers'],
    },
    specializedCapabilities: [
      'HR Systems',
      'Platform Strategy',
      'Technology Implementation',
      'System Integration',
      'Vendor Management',
      'Technology Roadmap',
      'Innovation Management',
      'Architecture Design'
    ],
    integrationOptions: [
      'HRIS Platforms',
      'ATS Systems',
      'Learning Platforms',
      'Performance Systems',
      'Analytics Tools',
      'Integration Platforms',
      'Vendor Systems',
      'Cloud Infrastructure'
    ],
    automationFeatures: [
      'System Deployment',
      'Integration Automation',
      'Update Management',
      'Performance Monitoring',
      'Vendor Coordination',
      'Roadmap Execution',
      'Incident Response',
      'Report Generation'
    ],
    kpiMetrics: [
      'System Uptime',
      'User Adoption',
      'Integration Success',
      'Implementation Velocity',
      'Vendor Performance',
      'Innovation Rate',
      'Cost Efficiency',
      'User Satisfaction'
    ],
    customOptions: {
      techStack: 'modern-cloud',
      integrationLevel: 'enterprise',
      innovationPace: 'continuous',
      vendorStrategy: 'best-of-breed',
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
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts tech needs' },
      { id: 'technology', enabled: true, name: 'Technology Core', description: 'Manages HR technology' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'dht_1', name: 'HR Systems', category: 'Technology', description: 'Manage HR systems', level: 'expert' },
      { id: 'dht_2', name: 'Platform Strategy', category: 'Strategy', description: 'Develop platform strategy', level: 'expert' },
      { id: 'dht_3', name: 'Technology Implementation', category: 'Technology', description: 'Implement technology', level: 'expert' },
      { id: 'dht_4', name: 'System Integration', category: 'Technology', description: 'Integrate systems', level: 'expert' },
      { id: 'dht_5', name: 'Vendor Management', category: 'Operations', description: 'Manage vendors', level: 'expert' }
    ],
    personality: [
      { trait: 'Tech-savvy', value: 10, description: 'Technology expert' },
      { trait: 'Innovative', value: 9, description: 'Innovative mindset' },
      { trait: 'Strategic', value: 9, description: 'Strategic thinker' },
      { trait: 'Problem-solver', value: 9, description: 'Problem-solving skills' },
      { trait: 'Collaborative', value: 8, description: 'Collaborates with IT' }
    ]

  };
  return <AgentPageWrapper agent={agent} />;
}
