import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-chief-restaurant-officer', uid: 'ktx-36-chief-restaurant-officer', title: 'AI Chief Restaurant Officer', route: '/ai-agent/restaurants/chief-restaurant-officer', color: '#F59E0B', level: 'c_level', efficiency: '82%' },
  { id: 'ai-head-chef', uid: 'ktx-36-head-chef', title: 'AI Head Chef', route: '/ai-agent/restaurants/head-chef', color: '#F59E0B', level: 'manager', efficiency: '88%' },
  { id: 'ai-kitchen-manager', uid: 'ktx-36-kitchen-manager', title: 'AI Kitchen Manager', route: '/ai-agent/restaurants/kitchen-manager', color: '#F59E0B', level: 'manager', efficiency: '86%' },
  { id: 'ai-restaurant-manager', uid: 'ktx-36-restaurant-manager', title: 'AI Restaurant Manager', route: '/ai-agent/restaurants/restaurant-manager', color: '#F59E0B', level: 'manager', efficiency: '87%' },
  { id: 'ai-service-manager', uid: 'ktx-36-service-manager', title: 'AI Service Manager', route: '/ai-agent/restaurants/service-manager', color: '#F59E0B', level: 'manager', efficiency: '85%' },
  { id: 'ai-sous-chef', uid: 'ktx-36-sous-chef', title: 'AI Sous Chef', route: '/ai-agent/restaurants/sous-chef', color: '#F59E0B', level: 'manager', efficiency: '86%' },
  { id: 'ai-vp-culinary', uid: 'ktx-36-vp-culinary', title: 'AI VP Culinary', route: '/ai-agent/restaurants/vp-culinary', color: '#F59E0B', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-finance', uid: 'ktx-36-vp-finance', title: 'AI VP Finance', route: '/ai-agent/restaurants/vp-finance', color: '#F59E0B', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-marketing', uid: 'ktx-36-vp-marketing', title: 'AI VP Marketing', route: '/ai-agent/restaurants/vp-marketing', color: '#F59E0B', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-operations', uid: 'ktx-36-vp-operations', title: 'AI VP Operations', route: '/ai-agent/restaurants/vp-operations', color: '#F59E0B', level: 'vp_director', efficiency: '87%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="restaurants-hospitality"
      agents={agents}
    />
  );
}
