import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TrendingUp, TrendingDown, Activity, LucideIcon, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react-native';

interface KPIItem {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  forecast?: string;
  aiCommentary?: string;
  category: 'financial' | 'delivery' | 'resource' | 'customer' | 'ai';
}

interface ProfessionalServicesKPIBarProps {
  kpiData: KPIItem[];
}

export default function ProfessionalServicesKPIBar({ kpiData }: ProfessionalServicesKPIBarProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Activity;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'stable': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial': return '#10B981';
      case 'delivery': return '#06B6D4';
      case 'resource': return '#8B5CF6';
      case 'customer': return '#F59E0B';
      case 'ai': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const renderKPISection = (title: string, category: string, kpis: KPIItem[]) => {
    if (kpis.length === 0) return null;
    
    return (
      <View style={styles.kpiSection}>
        <Text style={[styles.sectionTitle, { color: getCategoryColor(category) }]}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sectionScroll}>
          {kpis.map((kpi, index) => {
            const TrendIcon = getTrendIcon(kpi.trend);
            const KpiIcon = kpi.icon;
            const trendColor = getTrendColor(kpi.trend);

            return (
              <View 
                key={kpi.id} 
                style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${kpi.color}30`, borderWidth: 1 }]}
              >
                <View style={styles.kpiHeader}>
                  <View style={[styles.kpiIconContainer, { backgroundColor: `${kpi.color}20` }]}>
                    <KpiIcon size={18} color={kpi.color} />
                  </View>
                  <View style={styles.trendContainer}>
                    <TrendIcon size={12} color={trendColor} />
                    <Text style={[styles.trendValue, { color: trendColor }]}>{kpi.trendValue}</Text>
                  </View>
                </View>
                
                <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
                <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>{kpi.label}</Text>
                {kpi.subtitle && (
                  <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>{kpi.subtitle}</Text>
                )}
                {kpi.forecast && (
                  <View style={styles.forecastBadge}>
                    <ArrowUpRight size={10} color="#8B5CF6" />
                    <Text style={[styles.forecastText, { color: '#8B5CF6' }]}>{kpi.forecast}</Text>
                  </View>
                )}
                {kpi.aiCommentary && (
                  <View style={styles.aiCommentary}>
                    <Sparkles size={10} color="#EC4899" />
                    <Text style={[styles.aiCommentaryText, { color: '#EC4899' }]}>{kpi.aiCommentary}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const financialKPIs = kpiData.filter(kpi => kpi.category === 'financial');
  const deliveryKPIs = kpiData.filter(kpi => kpi.category === 'delivery');
  const resourceKPIs = kpiData.filter(kpi => kpi.category === 'resource');
  const customerKPIs = kpiData.filter(kpi => kpi.category === 'customer');
  const aiKPIs = kpiData.filter(kpi => kpi.category === 'ai');

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(16, 185, 129, 0.2)', borderBottomWidth: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainScroll}>
        {renderKPISection('Financial KPIs', 'financial', financialKPIs)}
        {renderKPISection('Delivery KPIs', 'delivery', deliveryKPIs)}
        {renderKPISection('Resource KPIs', 'resource', resourceKPIs)}
        {renderKPISection('Customer KPIs', 'customer', customerKPIs)}
        {renderKPISection('AI KPIs', 'ai', aiKPIs)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginBottom: 16,
  },
  mainScroll: {
    paddingHorizontal: 16,
  },
  kpiSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  sectionScroll: {
    paddingHorizontal: 0,
  },
  kpiCard: {
    width: 180,
    padding: 14,
    borderRadius: 12,
    marginRight: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  kpiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  kpiSubtitle: {
    fontSize: 9,
    marginBottom: 4,
  },
  forecastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  forecastText: {
    fontSize: 9,
    fontWeight: '600',
  },
  aiCommentary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  aiCommentaryText: {
    fontSize: 9,
    fontWeight: '600',
  },
});