import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { transportationDashboardConfig } from '@/constants/dashboardMetrics';

export default function TransportationDashboard() {
  return (
    <DepartmentDashboard 
      config={transportationDashboardConfig}
      mode="TRANSPORTATION MODE"
    />
  );
}
