import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { rdDashboardConfig } from '@/constants/dashboardMetrics';

export default function RDDashboard() {
  return (
    <DepartmentDashboard 
      config={rdDashboardConfig}
      mode="R&D MODE"
    />
  );
}
