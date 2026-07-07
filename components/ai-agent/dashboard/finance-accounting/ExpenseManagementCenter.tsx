import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Building2, Plane, Coffee, Zap, AlertTriangle } from 'lucide-react-native';

interface ExpenseCategory {
  category: string;
  amount: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
}

interface DepartmentExpense {
  department: string;
  amount: string;
  budget: string;
  variance: number;
}

interface ExpenseManagementCenterProps {
  totalExpenses: string;
  expenseCategories: ExpenseCategory[];
  departmentExpenses: DepartmentExpense[];
  optimizationOpportunities: string;
}

export default function ExpenseManagementCenter({ 
  totalExpenses, 
  expenseCategories, 
  departmentExpenses,
  optimizationOpportunities 
}: ExpenseManagementCenterProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={12} color="#EF4444" />;
      case 'down':
        return <TrendingDown size={12} color="#10B981" />;
      case 'stable':
        return <TrendingUp size={12} color="#6B7280" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Payroll':
        return <Building2 size={16} color="#3B82F6" />;
      case 'Travel':
        return <Plane size={16} color="#8B5CF6" />;
      case 'Software':
        return <Zap size={16} color="#F59E0B" />;
      case 'Office':
        return <Coffee size={16} color="#10B981" />;
      default:
        return <DollarSign size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <PieChart size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Expense Management Center
        </Text>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalCard}>
          <DollarSign size={20} color="#EF4444" />
          <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
            Total Expenses
          </Text>
          <Text style={[styles.totalValue, { color: theme.colors.text }]}>
            {formatCurrency(totalExpenses)}
          </Text>
          <View style={styles.trendBadge}>
            <TrendingUp size={12} color="#EF4444" />
            <Text style={[styles.trendText, { color: '#EF4444' }]}>
              +8% vs last month
            </Text>
          </View>
        </View>

        <View style={styles.optimizationCard}>
          <Zap size={20} color="#10B981" />
          <Text style={[styles.optimizationLabel, { color: theme.colors.textSecondary }]}>
            Optimization Opportunities
          </Text>
          <Text style={[styles.optimizationValue, { color: '#10B981' }]}>
            {formatCurrency(optimizationOpportunities)}
          </Text>
          <Text style={[styles.optimizationSubtext, { color: theme.colors.textSecondary }]}>
            Annual savings potential
          </Text>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Expense Categories
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesRow}>
            {expenseCategories.map((category) => (
              <View 
                key={category.category} 
                style={styles.categoryCard}
              >
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIcon, { backgroundColor: '#3B82F6' + '20' }]}>
                    {getCategoryIcon(category.category)}
                  </View>
                  <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                    {category.category}
                  </Text>
                </View>
                
                <Text style={[styles.categoryAmount, { color: theme.colors.text }]}>
                  {formatCurrency(category.amount)}
                </Text>
                
                <View style={styles.categoryTrend}>
                  {getTrendIcon(category.trend)}
                  <Text style={[styles.categoryPercentage, { color: theme.colors.textSecondary }]}>
                    {category.percentage}%
                  </Text>
                </View>

                <View style={[styles.categoryBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View 
                    style={[
                      styles.categoryFill, 
                      { 
                        backgroundColor: category.trend === 'down' ? '#10B981' : 
                                     category.trend === 'stable' ? '#3B82F6' : '#EF4444',
                        width: `${category.percentage}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.departmentSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Department Spend
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.departmentRow}>
            {departmentExpenses.map((dept) => (
              <View 
                key={dept.department} 
                style={[
                  styles.departmentCard, 
                  { borderLeftColor: dept.variance > 0 ? '#EF4444' : '#10B981' }
                ]}
              >
                <Text style={[styles.departmentName, { color: theme.colors.text }]}>
                  {dept.department}
                </Text>
                
                <View style={styles.departmentMetric}>
                  <Text style={[styles.departmentMetricLabel, { color: theme.colors.textSecondary }]}>
                    Spend
                  </Text>
                  <Text style={[styles.departmentMetricValue, { color: theme.colors.text }]}>
                    {formatCurrency(dept.amount)}
                  </Text>
                </View>

                <View style={styles.departmentMetric}>
                  <Text style={[styles.departmentMetricLabel, { color: theme.colors.textSecondary }]}>
                    Budget
                  </Text>
                  <Text style={[styles.departmentMetricValue, { color: theme.colors.text }]}>
                    {formatCurrency(dept.budget)}
                  </Text>
                </View>

                <View style={styles.varianceSection}>
                  <Text style={[styles.varianceLabel, { color: theme.colors.textSecondary }]}>
                    Variance
                  </Text>
                  <Text style={[
                    styles.varianceValue, 
                    { color: dept.variance > 0 ? '#EF4444' : '#10B981' }
                  ]}>
                    {dept.variance > 0 ? '+' : ''}{dept.variance.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.insightsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Cost Optimization Insights
        </Text>
        
        <View style={styles.insightCard}>
          <AlertTriangle size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Travel expenses increased 15% - consider implementing travel policy
          </Text>
        </View>
        
        <View style={styles.insightCard}>
          <Zap size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Software subscription consolidation could save $120K annually
          </Text>
        </View>
        
        <View style={styles.insightCard}>
          <Building2 size={14} color="#3B82F6" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Office supplies within budget, 8% under spend year-to-date
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  totalCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  optimizationCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  optimizationLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  optimizationValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  optimizationSubtext: {
    fontSize: 10,
  },
  categoriesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minWidth: 120,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  categoryPercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryFill: {
    height: '100%',
    borderRadius: 2,
  },
  departmentSection: {
    marginBottom: 16,
  },
  departmentRow: {
    flexDirection: 'row',
    gap: 12,
  },
  departmentCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
    minWidth: 140,
  },
  departmentName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  departmentMetric: {
    marginBottom: 4,
  },
  departmentMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  departmentMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  varianceSection: {
    marginTop: 8,
  },
  varianceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  varianceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  insightsSection: {
    gap: 8,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  insightText: {
    flex: 1,
    fontSize: 11,
  }
});