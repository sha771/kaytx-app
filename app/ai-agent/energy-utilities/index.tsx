import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-chief-energy-officer', uid: 'ktx-31-chief-energy-officer', title: 'AI Chief Energy Officer', route: '/ai-agent/energy-utilities/chief-energy-officer', color: '#F59E0B', level: 'c_level', efficiency: '83%' },
  { id: 'ai-vp-energy-efficiency', uid: 'ktx-31-vp-energy-efficiency', title: 'AI VP Energy Efficiency', route: '/ai-agent/energy-utilities/vp-energy-efficiency', color: '#F59E0B', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-energy-innovation', uid: 'ktx-31-vp-energy-innovation', title: 'AI VP Energy Innovation', route: '/ai-agent/energy-utilities/vp-energy-innovation', color: '#F59E0B', level: 'vp_director', efficiency: '88%' },
  { id: 'ai-vp-energy-trading', uid: 'ktx-31-vp-energy-trading', title: 'AI VP Energy Trading', route: '/ai-agent/energy-utilities/vp-energy-trading', color: '#F59E0B', level: 'vp_director', efficiency: '84%' },
  { id: 'ai-vp-grid-operations', uid: 'ktx-31-vp-grid-operations', title: 'AI VP Grid Operations', route: '/ai-agent/energy-utilities/vp-grid-operations', color: '#F59E0B', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-power-generation', uid: 'ktx-31-vp-power-generation', title: 'AI VP Power Generation', route: '/ai-agent/energy-utilities/vp-power-generation', color: '#F59E0B', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-regulatory-compliance', uid: 'ktx-31-vp-regulatory-compliance', title: 'AI VP Regulatory Compliance', route: '/ai-agent/energy-utilities/vp-regulatory-compliance', color: '#F59E0B', level: 'vp_director', efficiency: '82%' },
  { id: 'ai-vp-renewable-energy', uid: 'ktx-31-vp-renewable-energy', title: 'AI VP Renewable Energy', route: '/ai-agent/energy-utilities/vp-renewable-energy', color: '#F59E0B', level: 'vp_director', efficiency: '89%' },
  { id: 'ai-vp-sustainability', uid: 'ktx-31-vp-sustainability', title: 'AI VP Sustainability', route: '/ai-agent/energy-utilities/vp-sustainability', color: '#F59E0B', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-utilities-management', uid: 'ktx-31-vp-utilities-management', title: 'AI VP Utilities Management', route: '/ai-agent/energy-utilities/vp-utilities-management', color: '#F59E0B', level: 'vp_director', efficiency: '84%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="energy-utilities"
      agents={agents}
    />
  );
}
