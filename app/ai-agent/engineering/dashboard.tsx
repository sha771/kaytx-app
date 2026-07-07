import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { engineeringDashboardConfig } from '@/constants/dashboardMetrics';

export default function EngineeringDashboard() {
  return (
    <DepartmentDashboard 
      config={engineeringDashboardConfig}
      mode="ENGINEERING MODE"
    />
  );
}
