import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { fashionDashboardConfig } from '@/constants/dashboardMetrics';

export default function FashionDashboard() {
  return (
    <DepartmentDashboard 
      config={fashionDashboardConfig}
      mode="FASHION MODE"
    />
  );
}
