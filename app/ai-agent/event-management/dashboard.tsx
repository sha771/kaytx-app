import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { eventManagementDashboardConfig } from '@/constants/dashboardMetrics';

export default function EventManagementDashboard() {
  return (
    <DepartmentDashboard 
      config={eventManagementDashboardConfig}
      mode="EVENT MANAGEMENT MODE"
    />
  );
}
