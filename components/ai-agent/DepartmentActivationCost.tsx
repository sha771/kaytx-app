import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Info, 
  Zap, 
  Crown, 
  Star,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Users,
  Activity
} from 'lucide-react-native';

interface DepartmentActivationCostProps {
  departmentId: string;
  departmentName: string;
  onActivate: (departmentId: string) => void;
  onDeactivate: (departmentId: string) => void;
}

interface PricingOption {
  tier: 'standard' | 'premium' | 'enterprise';
  name: string;
  baseFee: number;
  activationCost: number;
  monthlyMaintenance: number;
  features: string[];
  maxAgents: number;
  popular?: boolean;
}

export const DepartmentActivationCost: React.FC<DepartmentActivationCostProps> = ({
  departmentId,
  departmentName,
  onActivate,
  onDeactivate,
}) => {
  const { theme } = useTheme();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium' | 'enterprise'>('standard');
  const [isActive, setIsActive] = useState(false);

  // Department-specific pricing
  const departmentPricing: Record<string, {
    baseActivationCost: number;
    monthlyMaintenanceCost: number;
    agentMultiplier: number;
  }> = {
    'customer-experience': { baseActivationCost: 50, monthlyMaintenanceCost: 25, agentMultiplier: 1.0 },
    'sales-revenue': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
    'marketing-growth': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
    'operations-management': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
    'finance-accounting': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
    'technology-engineering': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
    'human-resources': { baseActivationCost: 75, monthlyMaintenanceCost: 35, agentMultiplier: 1.2 },
    'legal-compliance': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
    'data-intelligence': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
    'product-management': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
    'security-risk': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
    'research-development': { baseActivationCost: 175, monthlyMaintenanceCost: 85, agentMultiplier: 2.2 },
    'administrative': { baseActivationCost: 50, monthlyMaintenanceCost: 25, agentMultiplier: 1.0 },
    'trading-investments': { baseActivationCost: 200, monthlyMaintenanceCost: 100, agentMultiplier: 2.5 },
    'healthcare': { baseActivationCost: 175, monthlyMaintenanceCost: 85, agentMultiplier: 2.2 },
    'insurance': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
    'government': { baseActivationCost: 200, monthlyMaintenanceCost: 100, agentMultiplier: 2.5 },
    'manufacturing': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
    'real-estate': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
    'education': { baseActivationCost: 100, monthlyMaintenanceCost: 50, agentMultiplier: 1.5 },
    'gaming-esports': { baseActivationCost: 125, monthlyMaintenanceCost: 60, agentMultiplier: 1.8 },
    'supply-chain': { baseActivationCost: 150, monthlyMaintenanceCost: 75, agentMultiplier: 2.0 },
  };

  const pricing = departmentPricing[departmentId] || {
    baseActivationCost: 100,
    monthlyMaintenanceCost: 50,
    agentMultiplier: 1.5,
  };

  const pricingOptions: PricingOption[] = [
    {
      tier: 'standard',
      name: 'Standard',
      baseFee: 99,
      activationCost: pricing.baseActivationCost,
      monthlyMaintenance: pricing.monthlyMaintenanceCost,
      features: [
        'Up to 10 concurrent agents',
        '10M tokens/month',
        'Basic support',
        'Standard response time',
      ],
      maxAgents: 10,
    },
    {
      tier: 'premium',
      name: 'Premium',
      baseFee: 499,
      activationCost: pricing.baseActivationCost,
      monthlyMaintenance: pricing.monthlyMaintenanceCost,
      features: [
        'Up to 50 concurrent agents',
        '100M tokens/month',
        'Priority support',
        'Faster response time',
        'Advanced analytics',
      ],
      maxAgents: 50,
      popular: true,
    },
    {
      tier: 'enterprise',
      name: 'Enterprise',
      baseFee: 1999,
      activationCost: pricing.baseActivationCost,
      monthlyMaintenance: pricing.monthlyMaintenanceCost,
      features: [
        'Up to 200 concurrent agents',
        '1B tokens/month',
        'Dedicated support',
        'Fastest response time',
        'Advanced analytics',
        'Custom integrations',
        'SLA guarantees',
      ],
      maxAgents: 200,
    },
  ];

  const selectedOption = pricingOptions.find(o => o.tier === selectedTier);
  const estimatedFirstMonthCost = selectedOption 
    ? selectedOption.baseFee + selectedOption.activationCost + selectedOption.monthlyMaintenance
    : 0;
  const estimatedMonthlyCost = selectedOption
    ? selectedOption.baseFee + selectedOption.monthlyMaintenance
    : 0;

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  const handleActivate = () => {
    setIsActive(true);
    onActivate(departmentId);
    setShowPricingModal(false);
  };

  const handleDeactivate = () => {
    setIsActive(false);
    onDeactivate(departmentId);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <DollarSign size={24} color="#007AFF" />
          <View>
            <Text style={[styles.title, { color: theme.colors.text }]}>Cost Overview</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              {departmentName}
            </Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: isActive ? '#34C75920' : '#8E8E9320' }
        ]}>
          {isActive ? (
            <CheckCircle size={16} color="#34C759" />
          ) : (
            <XCircle size={16} color="#8E8E93" />
          )}
          <Text style={[
            styles.statusText,
            { color: isActive ? '#34C759' : '#8E8E93' }
          ]}>
            {isActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.costSummary}>
        <View style={styles.costItem}>
          <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>
            Activation Cost
          </Text>
          <Text style={[styles.costValue, { color: theme.colors.text }]}>
            {formatCurrency(pricing.baseActivationCost)}
          </Text>
        </View>
        <View style={styles.costItem}>
          <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>
            Monthly Maintenance
          </Text>
          <Text style={[styles.costValue, { color: theme.colors.text }]}>
            {formatCurrency(pricing.monthlyMaintenanceCost)}
          </Text>
        </View>
        <View style={styles.costItem}>
          <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>
            Agent Multiplier
          </Text>
          <Text style={[styles.costValue, { color: theme.colors.text }]}>
            {pricing.agentMultiplier}x
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: isActive ? '#FF3B30' : '#007AFF' }]}
        onPress={isActive ? handleDeactivate : () => setShowPricingModal(true)}
      >
        <Zap size={20} color="#fff" />
        <Text style={styles.actionButtonText}>
          {isActive ? 'Deactivate Department' : 'Activate Department'}
        </Text>
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>

      {/* Pricing Modal */}
      <Modal
        visible={showPricingModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowPricingModal(false)}>
              <XCircle size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Choose Your Plan
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.departmentInfo}>
              <Info size={20} color="#007AFF" />
              <Text style={[styles.departmentInfoText, { color: theme.colors.text }]}>
                Activating {departmentName} department
              </Text>
            </View>

            {pricingOptions.map((option) => (
              <TouchableOpacity
                key={option.tier}
                style={[
                  styles.pricingCard,
                  selectedTier === option.tier && { 
                    borderColor: '#007AFF',
                    borderWidth: 2,
                  },
                  { backgroundColor: theme.colors.cardBackground },
                  option.popular && { 
                    borderColor: '#FF9500',
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setSelectedTier(option.tier)}
              >
                {option.popular && (
                  <View style={styles.popularBadge}>
                    <Star size={12} color="#FF9500" />
                    <Text style={styles.popularBadgeText}>Most Popular</Text>
                  </View>
                )}

                <View style={styles.pricingHeader}>
                  <View style={styles.tierIcon}>
                    {option.tier === 'enterprise' && <Crown size={24} color="#AF52DE" />}
                    {option.tier === 'premium' && <Star size={24} color="#FF9500" />}
                    {option.tier === 'standard' && <CheckCircle size={24} color="#007AFF" />}
                  </View>
                  <View>
                    <Text style={[styles.tierName, { color: theme.colors.text }]}>
                      {option.name}
                    </Text>
                    <Text style={[styles.tierPrice, { color: theme.colors.text }]}>
                      {formatCurrency(option.baseFee)}/month
                    </Text>
                  </View>
                  {selectedTier === option.tier && (
                    <CheckCircle size={24} color="#34C759" />
                  )}
                </View>

                <View style={styles.pricingFeatures}>
                  {option.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <CheckCircle size={16} color="#34C759" />
                      <Text style={[styles.featureText, { color: theme.colors.text }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.pricingBreakdown}>
                  <View style={styles.breakdownRow}>
                    <Text style={[styles.breakdownLabel, { color: theme.colors.secondaryText }]}>
                      One-time activation
                    </Text>
                    <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                      {formatCurrency(option.activationCost)}
                    </Text>
                  </View>
                  <View style={styles.breakdownRow}>
                    <Text style={[styles.breakdownLabel, { color: theme.colors.secondaryText }]}>
                      Monthly maintenance
                    </Text>
                    <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                      {formatCurrency(option.monthlyMaintenance)}
                    </Text>
                  </View>
                  <View style={[styles.breakdownRow, styles.breakdownTotal]}>
                    <Text style={[styles.breakdownLabel, { color: theme.colors.text, fontWeight: '600' }]}>
                      First month total
                    </Text>
                    <Text style={[styles.breakdownValue, { color: '#007AFF', fontWeight: '700' }]}>
                      {formatCurrency(estimatedFirstMonthCost)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.costProjection}>
              <View style={styles.projectionHeader}>
                <TrendingUp size={20} color="#34C759" />
                <Text style={[styles.projectionTitle, { color: theme.colors.text }]}>
                  Cost Projection
                </Text>
              </View>
              <View style={styles.projectionItem}>
                <View style={styles.projectionItemLeft}>
                  <Calendar size={16} color="#007AFF" />
                  <Text style={[styles.projectionLabel, { color: theme.colors.secondaryText }]}>
                    First month
                  </Text>
                </View>
                <Text style={[styles.projectionValue, { color: theme.colors.text }]}>
                  {formatCurrency(estimatedFirstMonthCost)}
                </Text>
              </View>
              <View style={styles.projectionItem}>
                <View style={styles.projectionItemLeft}>
                  <Calendar size={16} color="#007AFF" />
                  <Text style={[styles.projectionLabel, { color: theme.colors.secondaryText }]}>
                    Monthly thereafter
                  </Text>
                </View>
                <Text style={[styles.projectionValue, { color: theme.colors.text }]}>
                  {formatCurrency(estimatedMonthlyCost)}
                </Text>
              </View>
              <View style={styles.projectionItem}>
                <View style={styles.projectionItemLeft}>
                  <Calendar size={16} color="#007AFF" />
                  <Text style={[styles.projectionLabel, { color: theme.colors.secondaryText }]}>
                    Annual (estimated)
                  </Text>
                </View>
                <Text style={[styles.projectionValue, { color: theme.colors.text }]}>
                  {formatCurrency(estimatedMonthlyCost * 12)}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.activateButton, { backgroundColor: '#007AFF' }]}
              onPress={handleActivate}
            >
              <Zap size={20} color="#fff" />
              <Text style={styles.activateButtonText}>
                Activate {departmentName} - {formatCurrency(estimatedFirstMonthCost)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  costSummary: {
    gap: 12,
    marginBottom: 16,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 14,
  },
  costValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  departmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#007AFF10',
    borderRadius: 12,
    marginBottom: 20,
  },
  departmentInfoText: {
    fontSize: 15,
    fontWeight: '500',
  },
  pricingCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FF9500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tierName: {
    fontSize: 18,
    fontWeight: '700',
  },
  tierPrice: {
    fontSize: 16,
    marginTop: 2,
  },
  pricingFeatures: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  pricingBreakdown: {
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  breakdownTotal: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  costProjection: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  projectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  projectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  projectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  projectionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectionLabel: {
    fontSize: 14,
  },
  projectionValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  activateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
