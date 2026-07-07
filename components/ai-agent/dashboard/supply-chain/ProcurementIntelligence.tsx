import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ShoppingCart, Building2, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react-native';

export default function ProcurementIntelligence() {
  const { theme } = useTheme();

  const supplierMetrics = [
    { label: 'Active Suppliers', value: '48,200', change: '+342', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Contract Compliance', value: '94.2%', change: '+2.1%', trend: 'up' as const, color: '#10B981' },
    { label: 'Procurement Spend', value: '$1.2B', change: '+$180M', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Avg Lead Time', value: '14 days', change: '-2 days', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Cost Savings', value: '$184M', change: '+$42M', trend: 'up' as const, color: '#F59E0B' },
  ];

  const topSuppliers = [
    { name: 'TechComponents Inc', region: 'North America', performance: 98, risk: 'low' as const, spend: '$42M' },
    { name: 'AsiaManufacturing Ltd', region: 'Asia Pacific', performance: 94, risk: 'low' as const, spend: '$38M' },
    { name: 'EuroParts GmbH', region: 'Europe', performance: 92, risk: 'medium' as const, spend: '$35M' },
    { name: 'GlobalMaterials Co', region: 'Latin America', performance: 89, risk: 'medium' as const, spend: '$28M' },
  ];

  const procurementRisks = [
    { supplier: 'TechComponents Inc', risk: 'Supply shortage', severity: 'high' as const, impact: '$2.4M' },
    { supplier: 'AsiaManufacturing Ltd', risk: 'Geopolitical tension', severity: 'medium' as const, impact: '$1.8M' },
    { supplier: 'EuroParts GmbH', risk: 'Currency fluctuation', severity: 'low' as const, impact: '$0.8M' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <ShoppingCart size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Procurement & Supplier Intelligence
        </Text>
      </View>

      {/* Supplier Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {supplierMetrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: `${metric.color}30` }]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricChange}>
              <Text style={[styles.changeText, { color: '#10B981' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Top Suppliers */}
      <View style={styles.suppliersSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Top Performing Suppliers
        </Text>
        <View style={styles.suppliersList}>
          {topSuppliers.map((supplier, index) => (
            <View 
              key={index}
              style={[styles.supplierCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.supplierHeader}>
                <View style={styles.supplierInfo}>
                  <View style={styles.supplierIconContainer}>
                    <Building2 size={16} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={[styles.supplierName, { color: theme.colors.text }]}>
                      {supplier.name}
                    </Text>
                    <Text style={[styles.supplierRegion, { color: theme.colors.textSecondary }]}>
                      {supplier.region}
                    </Text>
                  </View>
                </View>
                <View style={[styles.performanceBadge, { backgroundColor: getRiskColor(supplier.risk) + '20' }]}>
                  <Text style={[styles.performanceText, { color: getRiskColor(supplier.risk) }]}>
                    {supplier.performance}%
                  </Text>
                </View>
              </View>
              <View style={styles.supplierMetrics}>
                <View style={styles.supplierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Risk Level
                  </Text>
                  <View style={[styles.riskBadge, { backgroundColor: getRiskColor(supplier.risk) + '20' }]}>
                    <Text style={[styles.riskText, { color: getRiskColor(supplier.risk) }]}>
                      {supplier.risk.charAt(0).toUpperCase() + supplier.risk.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.supplierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Annual Spend
                  </Text>
                  <Text style={[styles.spendText, { color: '#8B5CF6' }]}>
                    {supplier.spend}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Procurement Risks */}
      <View style={styles.risksSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Procurement Risk Alerts
        </Text>
        <View style={styles.risksList}>
          {procurementRisks.map((risk, index) => (
            <View 
              key={index}
              style={[styles.riskCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(risk.severity)}30` }]}
            >
              <View style={styles.riskHeader}>
                <AlertTriangle size={16} color={getSeverityColor(risk.severity)} />
                <Text style={[styles.riskSupplier, { color: theme.colors.text }]}>
                  {risk.supplier}
                </Text>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(risk.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(risk.severity) }]}>
                    {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.riskDescription, { color: theme.colors.textSecondary }]}>
                {risk.risk}
              </Text>
              <View style={styles.riskImpact}>
                <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                  Potential Impact:
                </Text>
                <Text style={[styles.impactValue, { color: '#EF4444' }]}>
                  {risk.impact}
                </Text>
              </View>
            </View>
          ))}
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
  metricsScroll: {
    marginHorizontal: -8,
    marginBottom: 16,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 120,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    marginTop: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  suppliersSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  suppliersList: {
    gap: 8,
  },
  supplierCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  supplierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  supplierIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplierName: {
    fontSize: 13,
    fontWeight: '600',
  },
  supplierRegion: {
    fontSize: 11,
  },
  performanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  supplierMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  supplierMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 11,
    fontWeight: '600',
  },
  spendText: {
    fontSize: 14,
    fontWeight: '700',
  },
  risksSection: {
    marginBottom: 8,
  },
  risksList: {
    gap: 8,
  },
  riskCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  riskSupplier: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  riskImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  impactLabel: {
    fontSize: 11,
  },
  impactValue: {
    fontSize: 12,
    fontWeight: '700',
  },
});