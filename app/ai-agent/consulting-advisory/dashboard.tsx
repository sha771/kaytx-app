import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { consultingDashboardConfig } from '@/constants/dashboardMetrics';

export default function ConsultingDashboard() {
  return (
    <DepartmentDashboard 
      config={consultingDashboardConfig}
      mode="PROFESSIONAL SERVICES MODE"
    />
  );
}
