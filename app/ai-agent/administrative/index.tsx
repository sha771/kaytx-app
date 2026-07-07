import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';
import { Briefcase, Calendar, FileText, Layout, MessageSquare, Users } from 'lucide-react-native';

const DEPARTMENT_AGENTS = [
  { id: 'neural-administrative-hub', name: 'AI Neural Administrative Hub', description: 'Central administrative coordination and management', icon: Briefcase, color: '#4A148C' },
  { id: 'predictive-schedule-optimizer', name: 'AI Predictive Schedule Optimizer', description: 'Intelligent scheduling and calendar management', icon: Calendar, color: '#4A148C' },
  { id: 'real-time-document-processor', name: 'AI Real-Time Document Processor', description: 'Automated document processing and organization', icon: FileText, color: '#4A148C' },
  { id: 'cognitive-task-manager', name: 'AI Cognitive Task Manager', description: 'Intelligent task prioritization and tracking', icon: Layout, color: '#4A148C' },
  { id: 'adaptive-communication-coordinator', name: 'AI Adaptive Communication Coordinator', description: 'Communication flow management and coordination', icon: MessageSquare, color: '#4A148C' },
  { id: 'intelligent-file-organizer', name: 'AI Intelligent File Organizer', description: 'Smart file organization and retrieval system', icon: FileText, color: '#4A148C' },
  { id: 'neural-meeting-assistant', name: 'AI Neural Meeting Assistant', description: 'Meeting preparation, scheduling, and follow-up', icon: Calendar, color: '#4A148C' },
  { id: 'predictive-resource-allocator', name: 'AI Predictive Resource Allocator', description: 'Resource allocation and optimization', icon: Users, color: '#4A148C' },
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="administrative"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
