import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-chief-marketing-officer', uid: 'ktx-03-chief-marketing-officer', title: 'AI Chief Marketing Officer', route: '/ai-agent/marketing/chief-marketing-officer', color: '#E91E63', level: 'c_level', efficiency: '77%' },
  { id: 'ai-vp-marketing', uid: 'ktx-03-vp-marketing', title: 'AI VP Marketing', route: '/ai-agent/marketing/vp-marketing', color: '#E91E63', level: 'vp_director', efficiency: '80%' },
  { id: 'ai-vp-brand', uid: 'ktx-03-vp-brand', title: 'AI VP Brand', route: '/ai-agent/marketing/vp-brand', color: '#E91E63', level: 'vp_director', efficiency: '92%' },
  { id: 'ai-vp-growth', uid: 'ktx-03-vp-growth', title: 'AI VP Growth', route: '/ai-agent/marketing/vp-growth', color: '#E91E63', level: 'vp_director', efficiency: '79%' },
  { id: 'ai-vp-content', uid: 'ktx-03-vp-content', title: 'AI VP Content', route: '/ai-agent/marketing/vp-content', color: '#E91E63', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-digital', uid: 'ktx-03-vp-digital', title: 'AI VP Digital', route: '/ai-agent/marketing/vp-digital', color: '#E91E63', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-marketing-manager', uid: 'ktx-03-marketing-manager', title: 'AI Marketing Manager', route: '/ai-agent/marketing/marketing-manager', color: '#E91E63', level: 'manager', efficiency: '75%' },
  { id: 'ai-content-marketing-agent', uid: 'ktx-03-content-marketing-agent', title: 'AI Content Marketing Agent', route: '/ai-agent/marketing/content-marketing-agent', color: '#E91E63', level: 'team_lead', efficiency: '77%' },
  { id: 'ai-seo-specialist', uid: 'ktx-03-seo-specialist', title: 'AI SEO Specialist', route: '/ai-agent/marketing/seo-specialist', color: '#E91E63', level: 'team_lead', efficiency: '94%' },
  { id: 'ai-social-media-manager', uid: 'ktx-03-social-media-manager', title: 'AI Social Media Manager', route: '/ai-agent/marketing/social-media-manager', color: '#E91E63', level: 'manager', efficiency: '76%' },
  { id: 'ai-email-marketing-agent', uid: 'ktx-03-email-marketing-agent', title: 'AI Email Marketing Agent', route: '/ai-agent/marketing/email-marketing-agent', color: '#E91E63', level: 'team_lead', efficiency: '83%' },
  { id: 'ai-ad-campaign-manager', uid: 'ktx-03-ad-campaign-manager', title: 'AI Ad Campaign Manager', route: '/ai-agent/marketing/ad-campaign-manager', color: '#E91E63', level: 'manager', efficiency: '89%' },
  { id: 'ai-marketing-analytics-agent', uid: 'ktx-03-marketing-analytics-agent', title: 'AI Marketing Analytics Agent', route: '/ai-agent/marketing/marketing-analytics-agent', color: '#E91E63', level: 'team_lead', efficiency: '91%' },
  { id: 'ai-brand-manager', uid: 'ktx-03-brand-manager', title: 'AI Brand Manager', route: '/ai-agent/marketing/brand-manager', color: '#E91E63', level: 'manager', efficiency: '87%' },
  { id: 'ai-growth-hacker', uid: 'ktx-03-growth-hacker', title: 'AI Growth Hacker', route: '/ai-agent/marketing/growth-hacker', color: '#E91E63', level: 'team_lead', efficiency: '87%' },
  { id: 'ai-geo-marketing', uid: 'ktx-03-geo-marketing', title: 'AI Geographic Marketing', route: '/ai-agent/marketing/geo-marketing', color: '#E91E63', level: 'manager', efficiency: '82%' },
  { id: 'ai-aeo-marketing', uid: 'ktx-03-aeo-marketing', title: 'AI Answer Engine Optimization', route: '/ai-agent/marketing/aeo-marketing', color: '#E91E63', level: 'manager', efficiency: '84%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="marketing-growth"
      agents={agents}
    />
  );
}
