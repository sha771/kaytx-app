import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { gamingDashboardConfig } from '@/constants/dashboardMetrics';

export default function GamingDashboard() {
  return (
    <DepartmentDashboard 
      config={gamingDashboardConfig}
      mode="GAMING MODE"
    />
  );
}
