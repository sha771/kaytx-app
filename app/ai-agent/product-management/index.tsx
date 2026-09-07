import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, TrendingUp, Layout, Target, Users, BarChart3, Package, Rocket, Activity, Shield, RefreshCw, FileText, Calendar, Compass, MessageSquare } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-product-hub', name: 'AI Neural Product Hub', description: 'Central product management coordination system', icon: Briefcase, color: '#E65100' },
  { id: 'predictive-market-analyzer', name: 'AI Predictive Market Analyzer', description: 'Predictive market analysis and competitive intelligence', icon: TrendingUp, color: '#E65100' },
  { id: 'real-time-product-roadmap', name: 'AI Real-Time Product Roadmap', description: 'Real-time product roadmap management and planning', icon: Layout, color: '#E65100' },
  { id: 'cognitive-feature-prioritizer', name: 'AI Cognitive Feature Prioritizer', description: 'Intelligent feature prioritization and backlog management', icon: Target, color: '#E65100' },
  { id: 'adaptive-user-researcher', name: 'AI Adaptive User Researcher', description: 'Adaptive user research and customer insights', icon: Users, color: '#E65100' },
  { id: 'intelligent-product-analytics', name: 'AI Intelligent Product Analytics', description: 'Product analytics and performance metrics', icon: BarChart3, color: '#E65100' },
  { id: 'neural-prototype-validator', name: 'AI Neural Prototype Validator', description: 'Prototype validation and testing with neural AI', icon: Package, color: '#E65100' },
  { id: 'predictive-launch-coordinator', name: 'AI Predictive Launch Coordinator', description: 'Predictive product launch coordination and management', icon: Rocket, color: '#E65100' },
  { id: 'real-time-ab-testing', name: 'AI Real-Time A/B Testing', description: 'Real-time A/B testing and optimization platform', icon: Activity, color: '#E65100' },
  { id: 'cognitive-product-owner', name: 'AI Cognitive Product Owner', description: 'Intelligent product owner assistance and decision support', icon: Shield, color: '#E65100' },
  { id: 'automated-product-workflow', name: 'AI Automated Product Workflow', description: 'Automated product workflow orchestration', icon: RefreshCw, color: '#E65100' },
  { id: 'neural-backlog-manager', name: 'AI Neural Backlog Manager', description: 'Neural backlog management and prioritization', icon: FileText, color: '#E65100' },
  { id: 'adaptive-release-planner', name: 'AI Adaptive Release Planner', description: 'Adaptive release planning and scheduling', icon: Calendar, color: '#E65100' },
  { id: 'intelligent-product-strategy', name: 'AI Intelligent Product Strategy', description: 'Product strategy development and execution', icon: Compass, color: '#E65100' },
  { id: 'predictive-customer-insights', name: 'AI Predictive Customer Insights', description: 'Predictive customer insights and feedback analysis', icon: MessageSquare, color: '#E65100' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="product-management"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
