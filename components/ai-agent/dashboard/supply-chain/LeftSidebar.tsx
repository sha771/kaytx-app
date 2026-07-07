import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard, 
  Bot, 
  ShoppingCart, 
  Users, 
  Package, 
  Warehouse, 
  Factory, 
  Truck, 
  TrendingUp, 
  ShieldAlert, 
  BarChart3, 
  Settings 
} from 'lucide-react-native';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface LeftSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function LeftSidebar({ activeSection = 'dashboard', onSectionChange }: LeftSidebarProps) {
  const { theme } = useTheme();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} color="#3B82F6" />
    },
    {
      id: 'agents',
      label: 'AI Supply Chain Agents',
      icon: <Bot size={18} color="#10B981" />
    },
    {
      id: 'procurement',
      label: 'Procurement',
      icon: <ShoppingCart size={18} color="#8B5CF6" />
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: <Users size={18} color="#06B6D4" />
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <Package size={18} color="#F59E0B" />
    },
    {
      id: 'warehouses',
      label: 'Warehouses',
      icon: <Warehouse size={18} color="#EC4899" />
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing Sync',
      icon: <Factory size={18} color="#14B8A6" />
    },
    {
      id: 'logistics',
      label: 'Logistics & Transport',
      icon: <Truck size={18} color="#6366F1" />
    },
    {
      id: 'demand',
      label: 'Demand Planning',
      icon: <TrendingUp size={18} color="#F97316" />
    },
    {
      id: 'risk',
      label: 'Risk Management',
      icon: <ShieldAlert size={18} color="#EF4444" />,
      badge: 3
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={18} color="#84CC16" />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={18} color="#6B7280" />
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Warehouse size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Supply Chain
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            AI Command Center
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.navScroll}
        contentContainerStyle={styles.navContent}
        showsVerticalScrollIndicator={false}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              activeSection === item.id && {
                backgroundColor: '#3B82F615',
                borderLeftColor: '#3B82F6',
                borderLeftWidth: 3
              }
            ]}
            onPress={() => onSectionChange?.(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.navItemContent}>
              <View style={[
                styles.iconContainer,
                activeSection === item.id && { backgroundColor: '#3B82F620' }
              ]}>
                {item.icon}
              </View>
              <Text style={[
                styles.navLabel, 
                { color: activeSection === item.id ? '#3B82F6' : theme.colors.text }
              ]}>
                {item.label}
              </Text>
            </View>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
            All Systems Operational
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.1)',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  navScroll: {
    flex: 1,
  },
  navContent: {
    paddingBottom: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  badge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
});