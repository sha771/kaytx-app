import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { technologyDashboardConfig } from '@/constants/dashboardMetrics';

export default function TechnologyDashboard() {
  return (
    <DepartmentDashboard 
      config={technologyDashboardConfig}
      mode="TECH MODE"
    />
  );
}
