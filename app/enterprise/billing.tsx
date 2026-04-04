import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Receipt,
  Package,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'trial' | 'cancelled' | 'past_due';
  amount: number;
  currency: string;
  billingCycle: string;
  nextBillingDate: string;
  features: string[];
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const subscription: Subscription = {
  id: '1',
  plan: 'Enterprise Plus',
  status: 'active',
  amount: 2499,
  currency: 'USD',
  billingCycle: 'monthly',
  nextBillingDate: '2025-01-15',
  features: [
    'Unlimited users',
    'Advanced analytics',
    '24/7 priority support',
    'Custom integrations',
    'Dedicated account manager',
    'SLA guarantee',
    'Advanced security features',
    'White-label options',
  ],
};

const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 2499,
    currency: 'USD',
    status: 'paid',
    dueDate: '2024-12-15',
    paidDate: '2024-12-10',
    items: [
      { description: 'Enterprise Plan - December 2024', quantity: 1, price: 1999 },
      { description: 'Additional Users (50)', quantity: 50, price: 10 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    amount: 2499,
    currency: 'USD',
    status: 'pending',
    dueDate: '2025-01-15',
    items: [
      { description: 'Enterprise Plan - January 2025', quantity: 1, price: 1999 },
      { description: 'Additional Users (50)', quantity: 50, price: 10 },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-12',
    amount: 2499,
    currency: 'USD',
    status: 'paid',
    dueDate: '2024-11-15',
    paidDate: '2024-11-12',
    items: [
      { description: 'Enterprise Plan - November 2024', quantity: 1, price: 1999 },
      { description: 'Additional Users (50)', quantity: 50, price: 10 },
    ],
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryDate: '12/2025',
    isDefault: true,
  },
  {
    id: '2',
    type: 'bank',
    last4: '1234',
    isDefault: false,
  },
];

export default function BillingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'subscription' | 'invoices' | 'payment'>('subscription');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'active':
        return '#34C759';
      case 'pending':
      case 'trial':
        return '#FF9500';
      case 'overdue':
      case 'past_due':
        return '#FF3B30';
      case 'cancelled':
        return theme.colors.secondaryText;
      default:
        return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'active':
        return CheckCircle;
      case 'pending':
      case 'trial':
        return Clock;
      case 'overdue':
      case 'past_due':
        return AlertCircle;
      default:
        return Receipt;
    }
  };

  const renderSubscription = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.subscriptionCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.subscriptionHeader}>
          <View>
            <Text style={[styles.subscriptionPlan, { color: theme.colors.text }]}>
              {subscription.plan}
            </Text>
            <View style={styles.statusContainer}>
              {React.createElement(getStatusIcon(subscription.status), {
                size: 16,
                color: getStatusColor(subscription.status),
              })}
              <Text style={[styles.subscriptionStatus, { color: getStatusColor(subscription.status) }]}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.subscriptionPricing}>
            <Text style={[styles.subscriptionAmount, { color: theme.colors.text }]}>
              ${subscription.amount}
            </Text>
            <Text style={[styles.subscriptionCycle, { color: theme.colors.secondaryText }]}>
              /{subscription.billingCycle}
            </Text>
          </View>
        </View>

        <View style={styles.subscriptionInfo}>
          <View style={styles.infoRow}>
            <Calendar size={18} color={theme.colors.secondaryText} />
            <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
              Next billing: {subscription.nextBillingDate}
            </Text>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={[styles.featuresTitle, { color: theme.colors.text }]}>Included Features</Text>
          {subscription.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <CheckCircle size={16} color={theme.colors.primary} />
              <Text style={[styles.featureText, { color: theme.colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.subscriptionActions}>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]}>
            <Package size={18} color="white" />
            <Text style={styles.buttonText}>Upgrade Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonOutline, { borderColor: theme.colors.primary }]}>
            <Text style={[styles.buttonOutlineText, { color: theme.colors.primary }]}>
              Manage Subscription
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.usageCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.usageTitle, { color: theme.colors.text }]}>Current Usage</Text>
        <View style={styles.usageStats}>
          <View style={styles.usageStat}>
            <Text style={[styles.usageValue, { color: theme.colors.text }]}>2,847</Text>
            <Text style={[styles.usageLabel, { color: theme.colors.secondaryText }]}>Active Users</Text>
          </View>
          <View style={styles.usageStat}>
            <Text style={[styles.usageValue, { color: theme.colors.text }]}>847K</Text>
            <Text style={[styles.usageLabel, { color: theme.colors.secondaryText }]}>API Calls</Text>
          </View>
          <View style={styles.usageStat}>
            <Text style={[styles.usageValue, { color: theme.colors.text }]}>1.2TB</Text>
            <Text style={[styles.usageLabel, { color: theme.colors.secondaryText }]}>Storage Used</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderInvoiceItem = ({ item }: { item: Invoice }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity
        style={[styles.invoiceCard, { backgroundColor: theme.colors.cardBackground }]}
      >
        <View style={styles.invoiceHeader}>
          <View style={styles.invoiceInfo}>
            <Text style={[styles.invoiceNumber, { color: theme.colors.text }]}>
              {item.invoiceNumber}
            </Text>
            <View style={[styles.invoiceStatusBadge, { backgroundColor: statusColor + '20' }]}>
              <StatusIcon size={12} color={statusColor} />
              <Text style={[styles.invoiceStatusText, { color: statusColor }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.invoiceAmount}>
            <Text style={[styles.invoiceTotal, { color: theme.colors.text }]}>
              ${item.amount}
            </Text>
            <Text style={[styles.invoiceCurrency, { color: theme.colors.secondaryText }]}>
              {item.currency}
            </Text>
          </View>
        </View>

        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceDetailRow}>
            <Text style={[styles.invoiceDetailLabel, { color: theme.colors.secondaryText }]}>
              Due Date:
            </Text>
            <Text style={[styles.invoiceDetailValue, { color: theme.colors.text }]}>
              {item.dueDate}
            </Text>
          </View>
          {item.paidDate && (
            <View style={styles.invoiceDetailRow}>
              <Text style={[styles.invoiceDetailLabel, { color: theme.colors.secondaryText }]}>
                Paid Date:
              </Text>
              <Text style={[styles.invoiceDetailValue, { color: theme.colors.text }]}>
                {item.paidDate}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.invoiceItems}>
          {item.items.map((lineItem, index) => (
            <View key={index} style={styles.invoiceLineItem}>
              <Text style={[styles.lineItemDescription, { color: theme.colors.text }]}>
                {lineItem.description}
              </Text>
              <Text style={[styles.lineItemPrice, { color: theme.colors.secondaryText }]}>
                {lineItem.quantity} × ${lineItem.price}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.downloadButton}>
          <Download size={16} color={theme.colors.primary} />
          <Text style={[styles.downloadText, { color: theme.colors.primary }]}>
            Download PDF
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderInvoices = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={invoices}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.invoicesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderPaymentMethodItem = ({ item }: { item: PaymentMethod }) => (
    <View style={[styles.paymentMethodCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.paymentMethodInfo}>
        <View style={[styles.paymentMethodIcon, { backgroundColor: theme.colors.primary + '20' }]}>
          <CreditCard size={24} color={theme.colors.primary} />
        </View>
        <View style={styles.paymentMethodDetails}>
          <Text style={[styles.paymentMethodType, { color: theme.colors.text }]}>
            {item.brand ? `${item.brand} ****` : 'Bank Account ****'}
            {item.last4}
          </Text>
          {item.expiryDate && (
            <Text style={[styles.paymentMethodExpiry, { color: theme.colors.secondaryText }]}>
              Expires {item.expiryDate}
            </Text>
          )}
          {item.isDefault && (
            <View style={[styles.defaultBadge, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.defaultText, { color: theme.colors.primary }]}>Default</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity>
        <Text style={[styles.editText, { color: theme.colors.primary }]}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPayment = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={[styles.addPaymentButton, { backgroundColor: theme.colors.primary }]}
      >
        <CreditCard size={20} color="white" />
        <Text style={styles.addPaymentText}>Add Payment Method</Text>
      </TouchableOpacity>

      <View style={styles.paymentMethodsList}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment Methods</Text>
        {paymentMethods.map((item) => (
          <View key={item.id}>{renderPaymentMethodItem({ item })}</View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Billing & Subscription</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabsContainer}>
        {(['subscription', 'invoices', 'payment'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === 'subscription' && renderSubscription()}
      {selectedTab === 'invoices' && renderInvoices()}
      {selectedTab === 'payment' && renderPayment()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subscriptionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  subscriptionPlan: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subscriptionStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  subscriptionPricing: {
    alignItems: 'flex-end',
  },
  subscriptionAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  subscriptionCycle: {
    fontSize: 16,
  },
  subscriptionInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
  },
  subscriptionActions: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  buttonOutlineText: {
    fontSize: 16,
    fontWeight: '600',
  },
  usageCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  usageStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usageStat: {
    alignItems: 'center',
  },
  usageValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  usageLabel: {
    fontSize: 12,
  },
  invoicesList: {
    gap: 12,
    paddingBottom: 20,
  },
  invoiceCard: {
    padding: 16,
    borderRadius: 12,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  invoiceStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    alignSelf: 'flex-start',
  },
  invoiceStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  invoiceTotal: {
    fontSize: 20,
    fontWeight: '700',
  },
  invoiceCurrency: {
    fontSize: 12,
  },
  invoiceDetails: {
    marginBottom: 12,
  },
  invoiceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  invoiceDetailLabel: {
    fontSize: 14,
  },
  invoiceDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  invoiceItems: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  invoiceLineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  lineItemDescription: {
    fontSize: 14,
    flex: 1,
  },
  lineItemPrice: {
    fontSize: 14,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  addPaymentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethodsList: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentMethodExpiry: {
    fontSize: 14,
    marginBottom: 4,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
