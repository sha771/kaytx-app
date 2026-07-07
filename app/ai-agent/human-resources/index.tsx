import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, UserPlus, Heart, Award, GraduationCap, DollarSign, Shield, Users, BarChart3, Activity, Layout, UserCheck, Star, Globe, Target } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-hr-hub', name: 'AI Neural HR Hub', description: 'Central HR coordination and management system', icon: Briefcase, color: '#AD1457' },
  { id: 'predictive-talent-acquisition', name: 'AI Predictive Talent Acquisition', description: 'Predictive talent acquisition and recruitment', icon: UserPlus, color: '#AD1457' },
  { id: 'real-time-employee-engagement', name: 'AI Real-Time Employee Engagement', description: 'Real-time employee engagement monitoring', icon: Heart, color: '#AD1457' },
  { id: 'cognitive-performance-manager', name: 'AI Cognitive Performance Manager', description: 'Intelligent performance management and reviews', icon: Award, color: '#AD1457' },
  { id: 'adaptive-learning-development', name: 'AI Adaptive Learning & Development', description: 'Adaptive learning and development programs', icon: GraduationCap, color: '#AD1457' },
  { id: 'intelligent-compensation-analyst', name: 'AI Intelligent Compensation Analyst', description: 'Compensation analysis and optimization', icon: DollarSign, color: '#AD1457' },
  { id: 'neural-benefits-administrator', name: 'AI Neural Benefits Administrator', description: 'Benefits administration and management', icon: Shield, color: '#AD1457' },
  { id: 'predictive-workforce-planner', name: 'AI Predictive Workforce Planner', description: 'Predictive workforce planning and analytics', icon: Users, color: '#AD1457' },
  { id: 'real-time-hr-analytics', name: 'AI Real-Time HR Analytics', description: 'Real-time HR analytics and insights', icon: BarChart3, color: '#AD1457' },
  { id: 'cognitive-culture-builder', name: 'AI Cognitive Culture Builder', description: 'Culture building and employee experience', icon: Activity, color: '#AD1457' },
  { id: 'automated-hr-workflow', name: 'AI Automated HR Workflow', description: 'Automated HR workflow orchestration', icon: Layout, color: '#AD1457' },
  { id: 'neural-onboarding-assistant', name: 'AI Neural Onboarding Assistant', description: 'Neural onboarding assistance and coordination', icon: UserCheck, color: '#AD1457' },
  { id: 'adaptive-retention-specialist', name: 'AI Adaptive Retention Specialist', description: 'Adaptive retention strategies and programs', icon: Star, color: '#AD1457' },
  { id: 'intelligent-diversity-inclusion', name: 'AI Intelligent Diversity & Inclusion', description: 'Diversity and inclusion analytics and programs', icon: Globe, color: '#AD1457' },
  { id: 'predictive-succession-planner', name: 'AI Predictive Succession Planner', description: 'Predictive succession planning and development', icon: Target, color: '#AD1457' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="human-resources"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
