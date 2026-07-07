import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { manufacturingDashboardConfig } from '@/constants/dashboardMetrics';

export default function ManufacturingDashboard() {
  return (
    <DepartmentDashboard 
      config={manufacturingDashboardConfig}
      mode="MANUFACTURING MODE"
    />
  );
}
