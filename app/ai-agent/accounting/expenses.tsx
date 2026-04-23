 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Briefcase,
  Building,
  ChevronLeft,
  Plus,
  Search,
  DollarSign,
  Receipt,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Wallet,
  Tag,
  ScanLine,
  PieChart,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Expense Types
interface Expense {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  receipt?: string;
  description?: string;
  employee?: string;
  paymentMethod: 'corporate_card' | 'personal' | 'cash' | 'check';
  tags: string[];
  policyViolation?: string;
}

interface ExpenseCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  icon: any;
  color: string;
}

// Mock Data
const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'travel', name: 'Travel', budget: 50000, spent: 42350, icon: Briefcase, color: '#3B82F6' },
  { id: 'meals', name: 'Meals & Entertainment', budget: 15000, spent: 12100, icon: User, color: '#F59E0B' },
  { id: 'office', name: 'Office Supplies', budget: 8000, spent: 6750, icon: Building, color: '#10B981' },
  { id: 'software', name: 'Software & Tools', budget: 25000, spent: 24800, icon: FileText, color: '#8B5CF6' },
  { id: 'marketing', name: 'Marketing', budget: 40000, spent: 38500, icon: Tag, color: '#EC4899' },
  { id: 'utilities', name: 'Utilities', budget: 12000, spent: 11000, icon: CreditCard, color: '#06B6D4' },
];

const EXPENSES: Expense[] = [
  {
    id: 'exp_001',
    merchant: 'United Airlines',
    amount: 485.50,
    currency: 'USD',
    category: 'Travel',
    date: '2026-03-01',
    status: 'approved',
    description: 'Flight to NYC for client meeting',
    employee: 'Sarah Johnson',
    paymentMethod: 'corporate_card',
    tags: ['client-trip', 'q1'],
  },
  {
    id: 'exp_002',
    merchant: 'Salesforce Tower Parking',
    amount: 45.00,
    currency: 'USD',
    category: 'Travel',
    date: '2026-03-01',
    status: 'approved',
    description: 'Parking at client location',
    employee: 'Sarah Johnson',
    paymentMethod: 'personal',
    tags: ['client-trip', 'parking'],
  },
  {
    id: 'exp_003',
    merchant: 'The Capital Grille',
    amount: 325.80,
    currency: 'USD',
    category: 'Meals & Entertainment',
    date: '2026-02-28',
    status: 'pending',
    description: 'Business dinner with Acme Corp team',
    employee: 'Michael Chen',
    paymentMethod: 'corporate_card',
    tags: ['client-entertainment', 'acme-corp'],
    policyViolation: 'Exceeds $300 meal limit per person',
  },
  {
    id: 'exp_004',
    merchant: 'Amazon Web Services',
    amount: 4500.00,
    currency: 'USD',
    category: 'Software & Tools',
    date: '2026-02-27',
    status: 'reimbursed',
    description: 'Monthly AWS infrastructure costs',
    employee: 'IT Department',
    paymentMethod: 'corporate_card',
    tags: ['infrastructure', 'recurring'],
  },
  {
    id: 'exp_005',
    merchant: 'Staples',
    amount: 127.43,
    currency: 'USD',
    category: 'Office Supplies',
    date: '2026-02-26',
    status: 'approved',
    description: 'Printer paper and office supplies',
    employee: 'Office Manager',
    paymentMethod: 'corporate_card',
    tags: ['office-supplies'],
  },
  {
    id: 'exp_006',
    merchant: 'Lyft',
    amount: 34.50,
    currency: 'USD',
    category: 'Travel',
    date: '2026-02-25',
    status: 'rejected',
    description: 'Ride to airport',
    employee: 'David Park',
    paymentMethod: 'personal',
    tags: ['transportation'],
    policyViolation: 'Missing receipt',
  },
  {
    id: 'exp_007',
    merchant: 'Google Ads',
    amount: 5200.00,
    currency: 'USD',
    category: 'Marketing',
    date: '2026-02-24',
    status: 'approved',
    description: 'February ad spend campaign',
    employee: 'Marketing Team',
    paymentMethod: 'corporate_card',
    tags: ['advertising', 'q1-campaign'],
  },
  {
    id: 'exp_008',
    merchant: 'WeWork',
    amount: 850.00,
    currency: 'USD',
    category: 'Office',
    date: '2026-02-23',
    status: 'reimbursed',
    description: 'Coworking space day passes',
    employee: 'Remote Team',
    paymentMethod: 'corporate_card',
    tags: ['workspace', 'remote'],
  },
];

const STATUS_FILTERS = [
  { id: 'all', label: 'All', count: EXPENSES.length },
  { id: 'pending', label: 'Pending', count: EXPENSES.filter(e => e.status === 'pending').length },
  { id: 'approved', label: 'Approved', count: EXPENSES.filter(e => e.status === 'approved').length },
  { id: 'rejected', label: 'Rejected', count: EXPENSES.filter(e => e.status === 'rejected').length },
  { id: 'reimbursed', label: 'Reimbursed', count: EXPENSES.filter(e => e.status === 'reimbursed').length },
];

export default function ExpenseManagementScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expenses, setExpenses] = useState(EXPENSES);

  const filteredExpenses = expenses.filter(expense => {
    const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
    const matchesSearch = expense.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.employee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
  const approvedAmount = expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
  const reimbursedAmount = expenses.filter(e => e.status === 'reimbursed').reduce((sum, e) => sum + e.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={18} color="#10B981" />;
      case 'pending':
        return <Clock size={18} color="#F59E0B" />;
      case 'rejected':
        return <AlertCircle size={18} color="#EF4444" />;
      case 'reimbursed':
        return <DollarSign size={18} color="#3B82F6" />;
      default:
        return <Clock size={18} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      case 'reimbursed':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleApprove = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' as const } : e));
    Alert.alert('Approved', 'Expense has been approved');
  };

  const handleReject = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'rejected' as const } : e));
    Alert.alert('Rejected', 'Expense has been rejected');
  };

  const renderExpenseCard = (expense: Expense, index: number) => (
    <Animated.View
      key={expense.id}
      entering={FadeInUp.delay(index * 30)}
      style={[styles.expenseCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.expenseHeader}>
        <View style={styles.merchantInfo}>
          <View style={[styles.merchantIcon, { backgroundColor: getStatusColor(expense.status) + '15' }]}>
            <Receipt size={20} color={getStatusColor(expense.status)} />
          </View>
          <View>
            <Text style={[styles.merchantName, { color: colors.text }]}>
              {expense.merchant}
            </Text>
            <Text style={[styles.expenseDate, { color: colors.icon }]}>
              {expense.date} • {expense.employee}
            </Text>
          </View>
        </View>
        <Text style={[styles.expenseAmount, { color: colors.text }]}>
          {formatCurrency(expense.amount)}
        </Text>
      </View>

      <View style={[styles.expenseDetails, { borderTopColor: colors.border }]}>
        <View style={styles.detailRow}>
          {getStatusIcon(expense.status)}
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(expense.status) },
            ]}
          >
            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
          </Text>
          <View style={[styles.categoryBadge, { backgroundColor: colors.background }]}>
            <Text style={[styles.categoryText, { color: colors.icon }]}>
              {expense.category}
            </Text>
          </View>
        </View>

        {expense.description && (
          <Text style={[styles.description, { color: colors.icon }]}>
            {expense.description}
          </Text>
        )}

        {expense.policyViolation && (
          <View style={[styles.violationBanner, { backgroundColor: '#EF4444' + '10' }]}>
            <AlertCircle size={16} color="#EF4444" />
            <Text style={[styles.violationText, { color: '#EF4444' }]}>
              {expense.policyViolation}
            </Text>
          </View>
        )}

        {expense.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#EF4444' + '15' }]}
              onPress={() => handleReject(expense.id)}
            >
              <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#10B981' + '15' }]}
              onPress={() => handleApprove(expense.id)}
            >
              <Text style={[styles.actionBtnText, { color: '#10B981' }]}>Approve</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Expense Management
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            Expense Management AI Agent
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => {}}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
            <Wallet size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(totalAmount)}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.icon }]}>Total Expenses</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#F59E0B' + '15' }]}>
            <Clock size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
            {formatCurrency(pendingAmount)}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.icon }]}>Pending</Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10B981' + '15' }]}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {formatCurrency(approvedAmount)}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.icon }]}>Approved</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3B82F6' + '15' }]}>
            <DollarSign size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
            {formatCurrency(reimbursedAmount)}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.icon }]}>Reimbursed</Text>
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search expenses, merchants, employees..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <ScanLine size={20} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Status Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {STATUS_FILTERS.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              {
                backgroundColor: selectedStatus === filter.id ? colors.tint : colors.card,
              },
            ]}
            onPress={() => setSelectedStatus(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedStatus === filter.id ? 'white' : colors.text },
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                styles.filterBadge,
                {
                  backgroundColor:
                    selectedStatus === filter.id ? 'rgba(255,255,255,0.3)' : colors.background,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  { color: selectedStatus === filter.id ? 'white' : colors.icon },
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Budget Overview */}
      <View style={[styles.budgetSection, { backgroundColor: colors.card }]}>
        <View style={styles.budgetHeader}>
          <Text style={[styles.budgetTitle, { color: colors.text }]}>Budget Overview</Text>
          <TouchableOpacity>
            <PieChart size={20} color={colors.tint} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {EXPENSE_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const percentage = (category.spent / category.budget) * 100;
            return (
              <Animated.View
                key={category.id}
                entering={FadeInUp.delay(index * 50)}
                style={[styles.categoryCard, { backgroundColor: colors.background }]}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
                  <Icon size={20} color={category.color} />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryAmount, { color: colors.text }]}>
                  {formatCurrency(category.spent)}
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: percentage > 90 ? '#EF4444' : category.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.budgetText, { color: colors.icon }]}>
                  {percentage.toFixed(0)}% of {formatCurrency(category.budget)}
                </Text>
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>

      {/* Expenses List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Expenses
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.tint }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {filteredExpenses.map((expense, index) => renderExpenseCard(expense, index))}

        {filteredExpenses.length === 0 && (
          <View style={styles.emptyState}>
            <Receipt size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No expenses found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  budgetSection: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    width: 160,
    padding: 12,
    borderRadius: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  budgetText: {
    fontSize: 11,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  expenseCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  merchantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  merchantIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  expenseDate: {
    fontSize: 12,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  expenseDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
  },
  description: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  violationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  violationText: {
    fontSize: 12,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
