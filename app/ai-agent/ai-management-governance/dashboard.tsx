import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { aiGovernanceDashboardConfig } from '@/constants/dashboardMetrics';

export default function AiGovernanceDashboard() {
  return (
    <DepartmentDashboard 
      config={aiGovernanceDashboardConfig}
      mode="AI GOVERNANCE MODE"
    />
  );
}
