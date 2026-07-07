import React from 'react';
import DepartmentDashboard from '@/components/ai-agent/dashboard/DepartmentDashboard';
import { restaurantsDashboardConfig } from '@/constants/dashboardMetrics';

export default function RestaurantsDashboard() {
  return (
    <DepartmentDashboard 
      config={restaurantsDashboardConfig}
      mode="RESTAURANTS MODE"
    />
  );
}
