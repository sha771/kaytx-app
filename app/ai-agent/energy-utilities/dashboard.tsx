import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { energyDashboardConfig } from '@/constants/dashboardMetrics';

export default function EnergyDashboard() {
  return (
    <DepartmentDashboard 
      config={energyDashboardConfig}
      mode="ENERGY MODE"
    />
  );
}
