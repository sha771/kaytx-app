import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { operationsDashboardConfig } from '@/constants/dashboardMetrics';

export default function OperationsDashboard() {
  return (
    <DepartmentDashboard 
      config={operationsDashboardConfig}
      mode="OPERATIONS MODE"
    />
  );
}
