import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { healthcareDashboardConfig } from '@/constants/dashboardMetrics';

export default function HealthcareDashboard() {
  return (
    <DepartmentDashboard 
      config={healthcareDashboardConfig}
      mode="HEALTHCARE MODE"
    />
  );
}
