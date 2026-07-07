import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { agricultureDashboardConfig } from '@/constants/dashboardMetrics';

export default function AgricultureDashboard() {
  return (
    <DepartmentDashboard 
      config={agricultureDashboardConfig}
      mode="AGRICULTURE MODE"
    />
  );
}
