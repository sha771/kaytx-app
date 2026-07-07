import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { retailDashboardConfig } from '@/constants/dashboardMetrics';

export default function RetailDashboard() {
  return (
    <DepartmentDashboard 
      config={retailDashboardConfig}
      mode="RETAIL MODE"
    />
  );
}
