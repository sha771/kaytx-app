import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { governmentDashboardConfig } from '@/constants/dashboardMetrics';

export default function PublicSectorDashboard() {
  return (
    <DepartmentDashboard 
      config={governmentDashboardConfig}
      mode="GOVERNMENT MODE"
    />
  );
}
