import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Zap, Bolt, Activity, Leaf, Cloud, Building2, CheckCircle, Clock,
  AlertTriangle, Wrench, Users, Gauge, Smile, MessageSquare, Timer,
  DollarSign, TrendingUp, ArrowDown, Minus, Percent, Brain, Bell,
  Bot, PiggyBank, Settings, Compass, Globe, Shield, Droplets, BarChart3
} from 'lucide-react-native';
import { 
  ENERGY_COLORS, ENERGY_KPI_METRICS, AI_ENERGY_AGENTS, 
  AI_INSIGHTS, REAL_TIME_ACTIVITIES 
} from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function EnergyExecutiveDashboard() {
  const renderKPICard = (metric: any, icon: any, color: string) => (
    <View style={[styles.kpiCard, { backgroundColor: color + '15', borderColor: color }]}>
      <icon size={24} color={color} />
      <Text style={styles.kpiValue}>{metric.value}</Text>
      <Text style={styles.kpiLabel}>{metric.label}</Text>
      <View style={styles.kpiTrend}>
        {metric.trendUp ? (
          <TrendingUp size={12} color="#10B981" />
        ) : (
          <Activity size={12} color="#EF4444" />
        )}
        <Text style={[styles.kpiTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>
          {metric.trend}
        </Text>
      </View>
    </View>
  );

  const renderKPISection = (title: string, metrics: any, color: string) => (
    <View style={styles.kpiSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.kpiGrid}>
        {Object.entries(metrics).map(([key, metric]: [string, any]) => {
          const IconComponent = getIconForMetric(key);
          return (
            <View key={key} style={styles.kpiCardWrapper}>
              {renderKPICard(metric, IconComponent, color)}
            </View>
          );
        })}
      </View>
    </View>
  );

  const getIconForMetric = (key: string) => {
    const iconMap: { [key: string]: any } = {
      totalEnergyGenerated: Zap,
      gridCapacity: Bolt,
      peakLoad: Activity,
      renewableShare: Leaf,
      carbonEmissions: Cloud,
      activePowerPlants: Building2,
      gridAvailability: CheckCircle,
      systemUptime: Clock,
      outageCount: AlertTriangle,
      maintenanceCompletion: Wrench,
      connectedCustomers: Users,
      smartMeterCoverage: Gauge,
      customerSatisfaction: Smile,
      serviceRequests: MessageSquare,
      avgRestorationTime: Timer,
      energyRevenue: DollarSign,
      tradingRevenue: TrendingUp,
      operationalCosts: ArrowDown,
      energyLosses: Minus,
      roi: Percent,
      demandForecastAccuracy: Brain,
      predictiveMaintenanceAlerts: Bell,
      gridOptimizations: Settings,
      aiAutomationRate: Bot,
      energySavings: PiggyBank,
    };
    return iconMap[key] || Activity;
  };

  const renderCommandCenter = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Chief Energy Officer Command Center</Text>
      <View style={styles.commandGrid}>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.emeraldGreen + '20', borderColor: ENERGY_COLORS.emeraldGreen }]}>
          <Zap size={32} color={ENERGY_COLORS.emeraldGreen} />
          <Text style={styles.commandValue}>845 GW</Text>
          <Text style={styles.commandLabel}>Total Energy Generated</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.emeraldGreen }]}>+8.4%</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.neonCyan + '20', borderColor: ENERGY_COLORS.neonCyan }]}>
          <Leaf size={32} color={ENERGY_COLORS.neonCyan} />
          <Text style={styles.commandValue}>48%</Text>
          <Text style={styles.commandLabel}>Renewable Share</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.neonCyan }]}>+18.4%</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.purple + '20', borderColor: ENERGY_COLORS.purple }]}>
          <Users size={32} color={ENERGY_COLORS.purple} />
          <Text style={styles.commandValue}>95M</Text>
          <Text style={styles.commandLabel}>Connected Customers</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.purple }]}>+12.4%</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.electricBlue + '20', borderColor: ENERGY_COLORS.electricBlue }]}>
          <CheckCircle size={32} color={ENERGY_COLORS.electricBlue} />
          <Text style={styles.commandValue}>99.98%</Text>
          <Text style={styles.commandLabel}>Grid Availability</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.electricBlue }]}>+0.2%</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.amber + '20', borderColor: ENERGY_COLORS.amber }]}>
          <Building2 size={32} color={ENERGY_COLORS.amber} />
          <Text style={styles.commandValue}>6,800</Text>
          <Text style={styles.commandLabel}>Active Facilities</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.amber }]}>+4.2%</Text>
        </View>
        <View style={[styles.commandCard, { backgroundColor: ENERGY_COLORS.magenta + '20', borderColor: ENERGY_COLORS.magenta }]}>
          <PiggyBank size={32} color={ENERGY_COLORS.magenta} />
          <Text style={styles.commandValue}>+$2.3B</Text>
          <Text style={styles.commandLabel}>AI Savings Impact</Text>
          <Text style={[styles.commandTrend, { color: ENERGY_COLORS.magenta }]}>+28.6%</Text>
        </View>
      </View>
    </View>
  );

  const renderAIAgents = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Energy Agents</Text>
      <View style={styles.agentsList}>
        {AI_ENERGY_AGENTS.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { backgroundColor: agent.color + '15', borderColor: agent.color }]}>
            <View style={styles.agentHeader}>
              <Compass size={24} color={agent.color} />
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{agent.name}</Text>
                <Text style={styles.agentTitle}>{agent.title}</Text>
              </View>
            </View>
            <Text style={styles.agentDescription}>{agent.description}</Text>
            <View style={styles.agentMetrics}>
              <View style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>Key Metric 1</Text>
                <Text style={styles.agentMetricValue}>{Object.values(agent.metrics)[0]}</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>Key Metric 2</Text>
                <Text style={styles.agentMetricValue}>{Object.values(agent.metrics)[1]}</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>Key Metric 3</Text>
                <Text style={styles.agentMetricValue}>{Object.values(agent.metrics)[2]}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAIInsights = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Insights Center</Text>
      {AI_INSIGHTS.map((insight, index) => (
        <View key={index} style={[styles.insightCard, { 
          backgroundColor: insight.type === 'alert' ? '#EF444415' : 
                       insight.type === 'revenue' ? '#10B98115' : 
                       insight.type === 'opportunity' ? '#3B82F615' : '#8B5CF615',
          borderLeftColor: insight.type === 'alert' ? '#EF4444' : 
                          insight.type === 'revenue' ? '#10B981' : 
                          insight.type === 'opportunity' ? '#3B82F6' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.insightHeader}>
            {insight.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {insight.type === 'revenue' && <DollarSign size={20} color="#10B981" />}
            {insight.type === 'opportunity' && <TrendingUp size={20} color="#3B82F6" />}
            {insight.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
            <Text style={styles.insightMessage}>{insight.message}</Text>
          </View>
          <View style={styles.insightFooter}>
            <View style={[styles.impactBadge, { backgroundColor: insight.impact === 'Critical' ? '#EF444420' : insight.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: insight.impact === 'Critical' ? '#EF4444' : insight.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{insight.impact}</Text>
            </View>
            <Text style={styles.insightAction}>{insight.action}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderActivityFeed = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Real-Time Energy Activity Feed</Text>
      <View style={styles.activityList}>
        {REAL_TIME_ACTIVITIES.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityEvent}>{activity.event}</Text>
              <Text style={styles.activityDetails}>
                {Object.entries(activity).filter(([k]) => k !== 'event' && k !== 'time').map(([k, v]) => `${k}: ${v}`).join(' • ')}
              </Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Zap size={32} color={ENERGY_COLORS.electricBlue} />
        <View>
          <Text style={styles.headerTitle}>Energy & Utilities AI Operating System</Text>
          <Text style={styles.headerSubtitle}>Enterprise-grade autonomous energy intelligence platform</Text>
        </View>
      </View>

      {renderKPISection('Energy KPIs', ENERGY_KPI_METRICS.energy, ENERGY_COLORS.electricBlue)}
      {renderKPISection('Operations KPIs', ENERGY_KPI_METRICS.operations, ENERGY_COLORS.amber)}
      {renderKPISection('Customer KPIs', ENERGY_KPI_METRICS.customer, ENERGY_COLORS.purple)}
      {renderKPISection('Financial KPIs', ENERGY_KPI_METRICS.financial, ENERGY_COLORS.emeraldGreen)}
      {renderKPISection('AI KPIs', ENERGY_KPI_METRICS.ai, ENERGY_COLORS.neonCyan)}
      
      {renderCommandCenter()}
      {renderAIAgents()}
      {renderAIInsights()}
      {renderActivityFeed()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENERGY_COLORS.deepSpaceBlack,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  kpiSection: {
    marginBottom: 8,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCardWrapper: {
    width: (width - 64) / 3 - 8,
  },
  kpiCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kpiLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandCard: {
    width: (width - 64) / 3 - 8,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  commandValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  commandLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  commandTrend: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentsList: {
    gap: 12,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  agentTitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  agentDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightAction: {
    flex: 1,
    fontSize: 12,
    color: '#9CA3AF',
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  activityList: {
    gap: 8,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    backgroundColor: '#0A0F1A',
    borderRadius: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ENERGY_COLORS.neonCyan,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityDetails: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  activityTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
