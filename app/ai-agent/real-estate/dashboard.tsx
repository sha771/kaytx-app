import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { realestateDashboardConfig } from '@/constants/dashboardMetrics';

export default function RealEstateDashboard() {
  return (
    <DepartmentDashboard 
      config={realestateDashboardConfig}
      mode="REAL ESTATE MODE"
    />
  );
}
