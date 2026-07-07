import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import DashboardHeader from '../DashboardHeader';
import ExecutiveKPIBar from './ExecutiveKPIBar';
import AIAgentOverview from './AIAgentOverview';
import CSCCommandCenter from './CSCCommandCenter';
import GlobalControlTower from './GlobalControlTower';
import ProcurementSupplierHub from './ProcurementSupplierHub';
import InventoryOptimizationCenter from './InventoryOptimizationCenter';
import DemandPlanningEngine from './DemandPlanningEngine';
import CostEfficiency from './CostEfficiency';
import WarehouseDistribution from './WarehouseDistribution';
import LogisticsTransport from './LogisticsTransport';
import ManufacturingSync from './ManufacturingSync';
import RiskDisruption from './RiskDisruption';
import AISupplyChainInsights from './AISupplyChainInsights';
import RealTimeOperationsFeed from './RealTimeOperationsFeed';
import SystemHealthDataNetwork from './SystemHealthDataNetwork';

export default function SupplyChainCommandCenter() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <DashboardHeader 
        departmentName="Supply Chain & Logistics"
        timestamp={new Date().toLocaleString()}
        mode="AI Operations"
      />
      
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP EXECUTIVE BAR */}
        <ExecutiveKPIBar />
        
        {/* SECTION 1: AI SUPPLY CHAIN AGENTS */}
        <AIAgentOverview />
        
        {/* SECTION 2: CHIEF SUPPLY CHAIN OFFICER COMMAND CENTER */}
        <CSCCommandCenter />
        
        {/* SECTION 3: GLOBAL SUPPLY CHAIN CONTROL TOWER */}
        <GlobalControlTower />
        
        {/* SECTION 4: PROCUREMENT & SUPPLIER INTELLIGENCE HUB */}
        <ProcurementSupplierHub />
        
        {/* SECTION 5: INVENTORY OPTIMIZATION CENTER */}
        <InventoryOptimizationCenter />
        
        {/* SECTION 6: DEMAND PLANNING & FORECASTING ENGINE */}
        <DemandPlanningEngine />
        
        {/* SECTION 7: WAREHOUSE & DISTRIBUTION NETWORK HUB */}
        <WarehouseDistribution />
        
        {/* SECTION 8: LOGISTICS & TRANSPORT INTELLIGENCE */}
        <LogisticsTransport />
        
        {/* SECTION 9: MANUFACTURING SYNCHRONIZATION HUB */}
        <ManufacturingSync />
        
        {/* SECTION 10: RISK & DISRUPTION INTELLIGENCE */}
        <RiskDisruption />
        
        {/* SECTION 11: COST & EFFICIENCY OPTIMIZATION */}
        <CostEfficiency />
        
        {/* SECTION 12: AI SUPPLY CHAIN INSIGHTS */}
        <AISupplyChainInsights />
        
        {/* SECTION 13: REAL-TIME OPERATIONS FEED */}
        <RealTimeOperationsFeed />
        
        {/* SECTION 14: SYSTEM HEALTH & DATA NETWORK */}
        <SystemHealthDataNetwork />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});