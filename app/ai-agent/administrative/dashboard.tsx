import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { adminDashboardConfig } from '@/constants/dashboardMetrics';

export default function AdminDashboard() {
  return (
    <DepartmentDashboard 
      config={adminDashboardConfig}
      mode="ADMIN MODE"
    />
  );
}
