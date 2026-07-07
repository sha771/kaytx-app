import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { accountingDashboardConfig } from '@/constants/dashboardMetrics';

export default function AccountingDashboard() {
  return (
    <DepartmentDashboard 
      config={accountingDashboardConfig}
      mode="ACCOUNTING MODE"
    />
  );
}
