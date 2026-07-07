import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { educationDashboardConfig } from '@/constants/dashboardMetrics';

export default function EducationDashboard() {
  return (
    <DepartmentDashboard 
      config={educationDashboardConfig}
      mode="EDUCATION MODE"
    />
  );
}
