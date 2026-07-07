import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import ChiefCommerceOfficerDashboard from '@/components/ai-agent/dashboard/e-commerce/ChiefCommerceOfficerDashboard';
import AICommerceAgents from '@/components/ai-agent/dashboard/e-commerce/AICommerceAgents';
import SalesConversionEngine from '@/components/ai-agent/dashboard/e-commerce/SalesConversionEngine';
import MarketingAdIntelligence from '@/components/ai-agent/dashboard/e-commerce/MarketingAdIntelligence';
import ProductCatalogIntelligence from '@/components/ai-agent/dashboard/e-commerce/ProductCatalogIntelligence';
import DynamicPricingEngine from '@/components/ai-agent/dashboard/e-commerce/DynamicPricingEngine';
import InventoryFulfillmentHub from '@/components/ai-agent/dashboard/e-commerce/InventoryFulfillmentHub';
import CustomerIntelligenceHub from '@/components/ai-agent/dashboard/e-commerce/CustomerIntelligenceHub';
import PersonalizationEngine from '@/components/ai-agent/dashboard/e-commerce/PersonalizationEngine';
import FraudPaymentSecurity from '@/components/ai-agent/dashboard/e-commerce/FraudPaymentSecurity';
import AIEcommerceInsights from '@/components/ai-agent/dashboard/e-commerce/AIEcommerceInsights';
import RealTimeCommerceActivityFeed from '@/components/ai-agent/dashboard/e-commerce/RealTimeCommerceActivityFeed';
import SystemHealthPlatformInfrastructure from '@/components/ai-agent/dashboard/e-commerce/SystemHealthPlatformInfrastructure';
import TopCommerceKPIBar from '@/components/ai-agent/dashboard/e-commerce/TopCommerceKPIBar';
import ECommerceLeftSidebar from '@/components/ai-agent/dashboard/e-commerce/ECommerceLeftSidebar';

export default function ECommerceCommandCenter() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ScrollView style={styles.content}>
            <TopCommerceKPIBar />
            <ChiefCommerceOfficerDashboard />
            <AICommerceAgents />
            <SalesConversionEngine />
            <MarketingAdIntelligence />
            <AIEcommerceInsights />
            <RealTimeCommerceActivityFeed />
          </ScrollView>
        );
      case 'agents':
        return <AICommerceAgents />;
      case 'sales':
        return <SalesConversionEngine />;
      case 'marketing':
        return <MarketingAdIntelligence />;
      case 'products':
        return <ProductCatalogIntelligence />;
      case 'pricing':
        return <DynamicPricingEngine />;
      case 'inventory':
        return <InventoryFulfillmentHub />;
      case 'orders':
        return <InventoryFulfillmentHub />;
      case 'customers':
        return <CustomerIntelligenceHub />;
      case 'personalization':
        return <PersonalizationEngine />;
      case 'fraud':
        return <FraudPaymentSecurity />;
      case 'analytics':
        return (
          <ScrollView style={styles.content}>
            <ChiefCommerceOfficerDashboard />
            <SalesConversionEngine />
            <MarketingAdIntelligence />
          </ScrollView>
        );
      case 'settings':
        return <SystemHealthPlatformInfrastructure />;
      default:
        return (
          <ScrollView style={styles.content}>
            <TopCommerceKPIBar />
            <ChiefCommerceOfficerDashboard />
            <AICommerceAgents />
            <SalesConversionEngine />
            <MarketingAdIntelligence />
            <AIEcommerceInsights />
            <RealTimeCommerceActivityFeed />
          </ScrollView>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ECommerceLeftSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <View style={[styles.mainContent, { backgroundColor: theme.colors.background }]}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});