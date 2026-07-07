import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { insuranceDashboardConfig } from '@/constants/dashboardMetrics';

export default function InsuranceDashboard() {
  return (
    <DepartmentDashboard 
      config={insuranceDashboardConfig}
      mode="INSURANCE MODE"
    />
  );
}
