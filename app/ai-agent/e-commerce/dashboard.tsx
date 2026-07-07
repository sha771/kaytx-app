import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { ecommerceDashboardConfig } from '@/constants/dashboardMetrics';

export default function EcommerceDashboard() {
  return (
    <DepartmentDashboard 
      config={ecommerceDashboardConfig}
      mode="E-COMMERCE MODE"
    />
  );
}
