import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard, 
  Bot, 
  TrendingUp, 
  Megaphone, 
  Package, 
  DollarSign, 
  Warehouse, 
  ShoppingCart, 
  Users, 
  Sparkles, 
  Shield, 
  BarChart3, 
  Settings 
} from 'lucide-react-native';

interface ECommerceLeftSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Commerce Agents', icon: Bot },
  { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
  { id: 'marketing', label: 'Marketing & Ads', icon: Megaphone },
  { id: 'products', label: 'Product Catalog', icon: Package },
  { id: 'pricing', label: 'Pricing Engine', icon: DollarSign },
  { id: 'inventory', label: 'Inventory', icon: Warehouse },
  { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart },
  { id: 'customers', label: 'Customer Intelligence', icon: Users },
  { id: 'personalization', label: 'Personalization', icon: Sparkles },
  { id: 'fraud', label: 'Fraud & Risk', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function ECommerceLeftSidebar({ activeSection, onSectionChange }: ECommerceLeftSidebarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#05070A', borderRightColor: '#1F2937' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: '#38BDF8' }]}>E-Commerce AI</Text>
        <Text style={[styles.headerSubtitle, { color: '#6B7280' }]}>Command Center</Text>
      </View>
      
      <ScrollView style={styles.navigation} showsVerticalScrollIndicator={false}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navigationItem,
                isActive && { backgroundColor: '#38BDF8' + '20', borderLeftColor: '#38BDF8' }
              ]}
              onPress={() => onSectionChange(item.id)}
            >
              <Icon 
                size={20} 
                color={isActive ? '#38BDF8' : '#6B7280'} 
              />
              <Text style={[
                styles.navigationItemText,
                { color: isActive ? '#38BDF8' : '#9CA3AF' }
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRightWidth: 1,
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  navigation: {
    flex: 1,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    marginBottom: 4,
  },
  navigationItemText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});