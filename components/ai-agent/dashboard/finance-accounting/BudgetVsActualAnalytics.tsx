import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Target, PieChart, Activity } from 'lucide-react-native';

interface DepartmentBudget {
  department: string;
  budget: string;
  actual: string;
  variance: number;
  utilization: number;
}

interface BudgetVsActualProps {
  departments: DepartmentBudget[];
  totalBudget: string;
  totalActual: string;
  totalVariance: number;
}

export default function BudgetVsActualAnalytics({ departments, totalBudget, totalActual, totalVariance }: BudgetVsActualProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
  };

  const getVarianceColor = (variance: number) => {
    if (variance <= -5) return '#10B981'; // Under budget is good
    if (variance <= 5) return '#3B82F6'; // On track
    if (variance <= 15) return '#F59E0B'; // Slightly over
    return '#EF4444'; // Significantly over
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization <= 80) return '#10B981';
    if (utilization <= 95) return '#3B82F6';
    if (utilization <= 105) return '#F59E0B';
    return '#EF4444';
  };

  const getVarianceIcon = (variance: number) => {
    if (variance < 0) return <TrendingDown size={12} color="#10B981" />;
    if (variance === 0) return <Activity size={12} color="#6B7280" />;
    return <TrendingUp size={12} color="#EF4444" />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Budget vs Actual Analytics
        </Text>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <Target size={16} color="#3B82F6" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Total Budget
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            {formatCurrency(totalBudget)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <PieChart size={16} color="#10B981" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Total Actual
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            {formatCurrency(totalActual)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Activity size={16} color={getVarianceColor(totalVariance)} />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Total Variance
          </Text>
          <Text style={[styles.summaryValue, { color: getVarianceColor(totalVariance) }]}>
            {totalVariance > 0 ? '+' : ''}{totalVariance.toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.departmentSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Department Budget Performance
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.departmentRow}>
            {departments.map((dept) => (
              <View 
                key={dept.department} 
                style={[
                  styles.departmentCard, 
                  { borderLeftColor: getVarianceColor(dept.variance) }
                ]}
              >
                <Text style={[styles.departmentName, { color: theme.colors.text }]}>
                  {dept.department}
                </Text>
                
                <View style={styles.budgetRow}>
                  <Text style={[styles.budgetLabel, { color: theme.colors.textSecondary }]}>
                    Budget
                  </Text>
                  <Text style={[styles.budgetValue, { color: theme.colors.text }]}>
                    {formatCurrency(dept.budget)}
                  </Text>
                </View>

                <View style={styles.budgetRow}>
                  <Text style={[styles.budgetLabel, { color: theme.colors.textSecondary }]}>
                    Actual
                  </Text>
                  <Text style={[styles.budgetValue, { color: theme.colors.text }]}>
                    {formatCurrency(dept.actual)}
                  </Text>
                </View>

                <View style={styles.varianceSection}>
                  <View style={styles.varianceHeader}>
                    {getVarianceIcon(dept.variance)}
                    <Text style={[styles.varianceLabel, { color: theme.colors.textSecondary }]}>
                      Variance
                    </Text>
                  </View>
                  <Text style={[styles.varianceValue, { color: getVarianceColor(dept.variance) }]}>
                    {dept.variance > 0 ? '+' : ''}{dept.variance.toFixed(1)}%
                  </Text>
                </View>

                <View style={styles.utilizationSection}>
                  <Text style={[styles.utilizationLabel, { color: theme.colors.textSecondary }]}>
                    Utilization
                  </Text>
                  <Text style={[styles.utilizationValue, { color: getUtilizationColor(dept.utilization) }]}>
                    {dept.utilization.toFixed(0)}%
                  </Text>
                  <View style={[styles.utilizationBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.utilizationFill, 
                        { 
                          backgroundColor: getUtilizationColor(dept.utilization),
                          width: `${Math.min(dept.utilization, 100)}%`
                        }
                      ]} 
                    />
                  </View>
                </View>

                {Math.abs(dept.variance) > 10 && (
                  <View style={[styles.alertBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                    <AlertTriangle size={10} color="#EF4444" />
                    <Text style={[styles.alertText, { color: '#EF4444' }]}>
                      High Variance
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.heatmapSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Variance Heatmap
        </Text>
        <View style={styles.heatmapGrid}>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Engineering</Text>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>-2.4%</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.4)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Marketing</Text>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>-8.1%</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(59, 130, 246, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Sales</Text>
            <Text style={[styles.heatmapValue, { color: '#3B82F6' }]}>+3.2%</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(245, 158, 11, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Operations</Text>
            <Text style={[styles.heatmapValue, { color: '#F59E0B' }]}>+12.5%</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(239, 68, 68, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>HR</Text>
            <Text style={[styles.heatmapValue, { color: '#EF4444' }]}>+18.2%</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Finance</Text>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>-5.3%</Text>
          </View>
        </View>
      </View>

      <View style={styles.insightsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Budget Insights
        </Text>
        <View style={styles.insightCard}>
          <TrendingUp size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Overall budget performance is strong with 4 departments under budget
          </Text>
        </View>
        <View style={styles.insightCard}>
          <AlertTriangle size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            HR department requires attention due to 18.2% overage
          </Text>
        </View>
        <View style={styles.insightCard}>
          <Activity size={14} color="#3B82F6" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Q3 forecast adjustment recommended for Operations department
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
  summarySection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  departmentSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
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
    minWidth: 160,
  },
  departmentName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  budgetLabel: {
    fontSize: 10,
  },
  budgetValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  varianceSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  varianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  varianceLabel: {
    fontSize: 10,
  },
  varianceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  utilizationSection: {
    marginTop: 8,
  },
  utilizationLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  utilizationValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  utilizationBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  utilizationFill: {
    height: '100%',
    borderRadius: 2,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    padding: 6,
    borderRadius: 6,
  },
  alertText: {
    fontSize: 10,
    fontWeight: '600',
  },
  heatmapSection: {
    marginBottom: 16,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heatmapCell: {
    flex: 1,
    minWidth: 100,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  heatmapLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  heatmapValue: {
    fontSize: 12,
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