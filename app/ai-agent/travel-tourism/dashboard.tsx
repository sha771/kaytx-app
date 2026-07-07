import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { travelDashboardConfig } from '@/constants/dashboardMetrics';

export default function TravelDashboard() {
  return (
    <DepartmentDashboard 
      config={travelDashboardConfig}
      mode="TRAVEL MODE"
    />
  );
}
