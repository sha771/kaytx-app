import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { HelpCircle } from 'lucide-react-native';

export default function BookingSupportPage() {
  const agent = {
    id: 'booking-support',
    name: 'AI Booking Support',
    title: 'AI Booking Support',
    description: 'The AI Booking Support provides booking assistance, resolves booking issues, answers customer inquiries, and ensures smooth booking experiences for all customers.",
    capabilities: ["Task Automation","Data Processing","Workflow Management","Booking Assistance","Issue Resolution","Customer Inquiry","Support Services","Problem Solving","Communication","Customer Satisfaction"],
    icon: HelpCircle,
    color: '#006064',
    type: 'employee' as const,
    humanCost: '$40k/year',
    aiCost: '$1k/year',
    efficiency: '40x efficiency improvement',
    replacesRole: 'booking-support',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.7%',
      lastActive: 'Now',
      processingPower: 'standard',
    },
    roiMetrics: {
      savingsPerMonth: '$3,300',
      tasksAutomatedDaily: 280,
      responseTime: '1.0s',
      accuracyRate: '98.0%',
    },
    hierarchy: {
      department: 'Travel & Tourism',
      level: 'support',
      reportsTo: 'vp-booking-reservations',
      manages: [],
    },
    specializedCapabilities: [
      'Booking Assistance',
      'Issue Resolution',
      'Customer Inquiry',
      'Support Services',
      'Problem Solving',
      'Communication',
      'Customer Satisfaction',
      'Service Excellence'
    ],
    integrationOptions: [
      'Support Platforms',
      'Booking Systems',
      'Communication Tools',
      'CRM Systems',
      'Knowledge Base',
      'Analytics Tools',
      'Ticketing Systems'
    ],
    automationFeatures: [
      'Booking Assistance',
      'Issue Resolution',
      'Customer Inquiry',
      'Support Services',
      'Problem Solving',
      'Communication',
      'Customer Satisfaction',
      'Service Excellence'
    ],
    kpiMetrics: [
      'Support Satisfaction',
      'Resolution Rate',
      'Response Time',
      'First Contact Resolution',
      'Customer Satisfaction',
      'Issue Volume',
      'Service Quality',
      'Communication Effectiveness'
    ],
    customOptions: {
      responseSpeed: 'fast',
      resolutionRate: 'high',
      customerSatisfaction: 'high',
      serviceQuality: 'premium',
      communication: 'high'
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
      { id: 'support', enabled: true, name: 'Support Assistant', description: 'Assists with booking support' },
      { id: 'resolve', enabled: true, name: 'Issue Resolver', description: 'Resolves booking issues' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'booking_support_1', name: 'Booking Assistance', category: 'Booking', description: 'Assist with bookings', level: 'expert' },
      { id: 'booking_support_2', name: 'Issue Resolution', category: 'Resolution', description: 'Resolve issues', level: 'expert' },
      { id: 'booking_support_3', name: 'Customer Inquiry', category: 'Inquiry', description: 'Handle inquiries', level: 'expert' },
      { id: 'booking_support_4', name: 'Problem Solving', category: 'Problem', description: 'Solve problems', level: 'advanced' },
      { id: 'booking_support_5', name: 'Communication', category: 'Communication', description: 'Communicate effectively', level: 'advanced' }
    ],
    personality: [
      { trait: 'Helpful', value: 10, description: 'Helpful support' },
      { trait: 'Patient', value: 10, description: 'Patient with customers' },
      { trait: 'Problem Solving', value: 9, description: 'Excellent problem solver' },
      { trait: 'Communication', value: 10, description: 'Clear communicator' },
      { trait: 'Customer Focus', value: 10, description: 'Customer-centric' }
    ]
  };
  return <AgentPageWrapper agent={agent} />;
}
