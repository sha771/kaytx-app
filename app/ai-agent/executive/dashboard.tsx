import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { executiveDashboardConfig } from '@/constants/dashboardMetrics';

export default function ExecutiveDashboard() {
  return (
    <DepartmentDashboard 
      config={executiveDashboardConfig}
      mode="EXECUTIVE MODE"
    />
  );
}
