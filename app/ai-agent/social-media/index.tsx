import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Share2 } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'brand-monitor', name: 'AI Brand Monitor', description: 'AI Brand Monitor AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'community-manager', name: 'AI Community Manager', description: 'AI Community Manager AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'content-creator', name: 'AI Content Creator', description: 'AI Content Creator AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'engagement-optimizer', name: 'AI Engagement Optimizer', description: 'AI Engagement Optimizer AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'influencer-outreach', name: 'AI Influencer Outreach', description: 'AI Influencer Outreach AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'post-scheduler', name: 'AI Post Scheduler', description: 'AI Post Scheduler AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'social-ad-manager', name: 'AI Social Ad Manager', description: 'AI Social Ad Manager AI Agent', icon: Share2, color: '#F57F17' },
  { id: 'social-analytics', name: 'AI Social Analytics Agent', description: 'AI Social Analytics Agent AI Agent', icon: Share2, color: '#F57F17' }
];

export default function SocialMediaIndex() {
  return (
    <DepartmentDashboardView
      departmentId="social-media"
      agents={DEPARTMENT_AGENTS}
    />
  );
}

