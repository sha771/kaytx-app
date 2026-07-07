import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Shield, 
  FileText, 
  AlertTriangle, 
  Building2, 
  Droplets, 
  Globe, 
  CreditCard, 
  BarChart3, 
  Settings 
} from 'lucide-react-native';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
}

interface BankingSidebarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'trading', label: 'AI Trading Agents', icon: TrendingUp, badge: '3' },
  { id: 'portfolio', label: 'Portfolio Management', icon: PieChart },
  { id: 'risk', label: 'Risk & Compliance', icon: Shield, badge: '12' },
  { id: 'credit', label: 'Credit Intelligence', icon: FileText },
  { id: 'fraud', label: 'Fraud Detection', icon: AlertTriangle, badge: '5' },
  { id: 'treasury', label: 'Treasury Operations', icon: Building2 },
  { id: 'liquidity', label: 'Liquidity Management', icon: Droplets },
  { id: 'market', label: 'Market Intelligence', icon: Globe },
  { id: 'payments', label: 'Payments & Settlements', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function BankingSidebar({ activeTab = 'dashboard', onTabChange }: BankingSidebarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TrendingUp size={24} color="#10B981" />
          <View style={styles.logoText}>
            <Text style={styles.logoTitle}>KAYTX</Text>
            <Text style={styles.logoSubtitle}>FINANCE</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>MAIN</Text>
          {navItems.slice(0, 1).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={() => onTabChange?.(item.id)}
            />
          ))}
        </View>

        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>TRADING & PORTFOLIO</Text>
          {navItems.slice(1, 3).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={() => onTabChange?.(item.id)}
            />
          ))}
        </View>

        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>RISK & COMPLIANCE</Text>
          {navItems.slice(3, 6).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={() => onTabChange?.(item.id)}
            />
          ))}
        </View>

        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>OPERATIONS</Text>
          {navItems.slice(6, 10).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={() => onTabChange?.(item.id)}
            />
          ))}
        </View>

        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>SYSTEM</Text>
          {navItems.slice(10).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onPress={() => onTabChange?.(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.statusText}>Systems Operational</Text>
        </View>
        <Text style={styles.footerText}>v2.4.1</Text>
      </View>
    </View>
  );
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  onPress: () => void;
}

function NavItem({ item, isActive, onPress }: NavItemProps) {
  const Icon = item.icon;
  return (
    <TouchableOpacity
      style={[styles.navItem, isActive && styles.navItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
        <Icon size={18} color={isActive ? '#10B981' : '#6B7280'} />
      </View>
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
      {item.badge && (
        <View style={[styles.badge, isActive && styles.badgeActive]}>
          <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05070A',
    width: 280,
    borderRightWidth: 1,
    borderRightColor: '#1F2937',
    height: '100%',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoText: {
    flex: 1,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  logoSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
    letterSpacing: 3,
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  navSection: {
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
    gap: 12,
  },
  navItemActive: {
    backgroundColor: '#10B98110',
    borderWidth: 1,
    borderColor: '#10B98130',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  iconContainerActive: {
    backgroundColor: '#10B98120',
  },
  navLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  navLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#EF444420',
    borderWidth: 1,
    borderColor: '#EF444440',
  },
  badgeActive: {
    backgroundColor: '#10B98120',
    borderColor: '#10B98140',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  badgeTextActive: {
    color: '#10B981',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
  footerText: {
    fontSize: 10,
    color: '#6B7280',
  },
});
