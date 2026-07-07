import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const agents = [
  { id: 'ai-chief-event-officer', uid: 'ktx-33-chief-event-officer', title: 'AI Chief Event Officer', route: '/ai-agent/event-management/chief-event-officer', color: '#22c55e', level: 'c_level', efficiency: '84%' },
  { id: 'ai-event-coordinator', uid: 'ktx-33-event-coordinator', title: 'AI Event Coordinator', route: '/ai-agent/event-management/event-coordinator', color: '#22c55e', level: 'manager', efficiency: '86%' },
  { id: 'ai-event-manager', uid: 'ktx-33-event-manager', title: 'AI Event Manager', route: '/ai-agent/event-management/event-manager', color: '#22c55e', level: 'manager', efficiency: '87%' },
  { id: 'ai-event-marketing-specialist', uid: 'ktx-33-event-marketing-specialist', title: 'AI Event Marketing Specialist', route: '/ai-agent/event-management/event-marketing-specialist', color: '#22c55e', level: 'specialist', efficiency: '85%' },
  { id: 'ai-event-planner', uid: 'ktx-33-event-planner', title: 'AI Event Planner', route: '/ai-agent/event-management/event-planner', color: '#22c55e', level: 'manager', efficiency: '88%' },
  { id: 'ai-venue-manager', uid: 'ktx-33-venue-manager', title: 'AI Venue Manager', route: '/ai-agent/event-management/venue-manager', color: '#22c55e', level: 'manager', efficiency: '86%' },
  { id: 'ai-vp-event-logistics', uid: 'ktx-33-vp-event-logistics', title: 'AI VP Event Logistics', route: '/ai-agent/event-management/vp-event-logistics', color: '#22c55e', level: 'vp_director', efficiency: '85%' },
  { id: 'ai-vp-event-marketing', uid: 'ktx-33-vp-event-marketing', title: 'AI VP Event Marketing', route: '/ai-agent/event-management/vp-event-marketing', color: '#22c55e', level: 'vp_director', efficiency: '87%' },
  { id: 'ai-vp-event-operations', uid: 'ktx-33-vp-event-operations', title: 'AI VP Event Operations', route: '/ai-agent/event-management/vp-event-operations', color: '#22c55e', level: 'vp_director', efficiency: '86%' },
  { id: 'ai-vp-event-strategy', uid: 'ktx-33-vp-event-strategy', title: 'AI VP Event Strategy', route: '/ai-agent/event-management/vp-event-strategy', color: '#22c55e', level: 'vp_director', efficiency: '88%' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="event-management"
      agents={agents}
    />
  );
}
