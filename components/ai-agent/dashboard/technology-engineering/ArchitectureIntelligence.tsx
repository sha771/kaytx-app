import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Network, GitBranch, Database, Cpu, AlertTriangle, CheckCircle, Layers, Zap } from 'lucide-react-native';

interface ServiceDependency {
  id: string;
  name: string;
  type: string;
  dependencies: number;
  dependents: number;
  health: 'healthy' | 'warning' | 'critical';
  complexity: number;
}

interface ArchitectureIntelligenceProps {
  metrics: {
    serviceDependencies: number;
    technicalDebt: number;
    scalabilityScore: number;
    architectureHealth: string;
  };
  services: ServiceDependency[];
}

export default function ArchitectureIntelligence({ metrics, services }: ArchitectureIntelligenceProps) {
  const { theme } = useTheme();

  const architectureCards = [
    {
      label: 'Service Dependencies',
      value: metrics.serviceDependencies.toString(),
      icon: Network,
      color: '#3B82F6',
      subtitle: 'Total connections'
    },
    {
      label: 'Technical Debt',
      value: `${metrics.technicalDebt}%`,
      icon: AlertTriangle,
      color: '#F59E0B',
      subtitle: 'Code complexity'
    },
    {
      label: 'Scalability Score',
      value: `${metrics.scalabilityScore}%`,
      icon: Zap,
      color: '#10B981',
      subtitle: 'Growth capacity'
    },
    {
      label: 'Architecture Health',
      value: metrics.architectureHealth,
      icon: CheckCircle,
      color: '#8B5CF6',
      subtitle: 'System status'
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'critical':
        return AlertTriangle;
      default:
        return CheckCircle;
    }
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity >= 80) return '#EF4444';
    if (complexity >= 60) return '#F59E0B';
    if (complexity >= 40) return '#3B82F6';
    return '#10B981';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Architecture Intelligence
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          System Architecture & Dependencies
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {architectureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.servicesSection}>
        <View style={styles.servicesHeader}>
          <Text style={[styles.servicesTitle, { color: theme.colors.text }]}>
            Service Dependencies
          </Text>
          <Text style={[styles.servicesCount, { color: theme.colors.textSecondary }]}>
            {services.length} services
          </Text>
        </View>

        {services.map((service) => {
          const HealthIcon = getHealthIcon(service.health);
          const healthColor = getHealthColor(service.health);
          const complexityColor = getComplexityColor(service.complexity);
          
          return (
            <View key={service.id} style={[styles.serviceCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <View style={[styles.typeIcon, { backgroundColor: '#3B82F6' + '20' }]}>
                    <GitBranch size={18} color="#3B82F6" />
                  </View>
                  <View style={styles.serviceDetails}>
                    <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                      {service.name}
                    </Text>
                    <Text style={[styles.serviceType, { color: theme.colors.textSecondary }]}>
                      {service.type}
                    </Text>
                  </View>
                </View>
                <View style={[styles.healthBadge, { backgroundColor: healthColor + '20' }]}>
                  <HealthIcon size={14} color={healthColor} />
                  <Text style={[styles.healthText, { color: healthColor }]}>
                    {service.health.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.serviceMetrics}>
                <View style={styles.metricRow}>
                  <View style={styles.metricItem}>
                    <Network size={14} color="#8B5CF6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Dependencies
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.dependencies}
                    </Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Layers size={14} color="#06B6D4" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Dependents
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.dependents}
                    </Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Cpu size={14} color="#F59E0B" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Complexity
                    </Text>
                    <Text style={[styles.metricValue, { color: complexityColor }]}>
                      {service.complexity}%
                    </Text>
                  </View>
                </View>

                <View style={styles.complexityBar}>
                  <Text style={[styles.complexityLabel, { color: theme.colors.textSecondary }]}>
                    Complexity Score
                  </Text>
                  <View style={[styles.complexityTrack, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[styles.complexityFill, { 
                        backgroundColor: complexityColor,
                        width: `${service.complexity}%` 
                      }]} 
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.topologySection}>
        <Text style={[styles.topologyTitle, { color: theme.colors.text }]}>
          Architecture Overview
        </Text>

        <View style={styles.topologyGrid}>
          <View style={[styles.topologyCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
            <Database size={24} color="#3B82F6" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Data Layer
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              8 Databases
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' }]}>
            <GitBranch size={24} color="#8B5CF6" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Services
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              {services.length} Microservices
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <Network size={24} color="#10B981" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              API Gateway
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              REST & GraphQL
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' }]}>
            <Zap size={24} color="#06B6D4" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Event Bus
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              Kafka Streams
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.debtSection}>
        <Text style={[styles.debtTitle, { color: theme.colors.text }]}>
          Technical Debt Analysis
        </Text>

        <View style={[styles.debtCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
          <View style={styles.debtHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <View style={styles.debtInfo}>
              <Text style={[styles.debtLabel, { color: theme.colors.textSecondary }]}>
                Overall Technical Debt
              </Text>
              <Text style={[styles.debtValue, { color: theme.colors.text }]}>
                {metrics.technicalDebt}% - Moderate
              </Text>
            </View>
          </View>

          <View style={[styles.debtBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[styles.debtFill, { 
                backgroundColor: metrics.technicalDebt >= 70 ? '#EF4444' : metrics.technicalDebt >= 40 ? '#F59E0B' : '#10B981',
                width: `${metrics.technicalDebt}%` 
              }]} 
            />
          </View>

          <View style={styles.debtBreakdown}>
            <View style={styles.debtItem}>
              <View style={[styles.debtDot, { backgroundColor: '#EF4444' }]} />
              <Text style={[styles.debtItemText, { color: theme.colors.textSecondary }]}>
                Code Smells: 35%
              </Text>
            </View>
            <View style={styles.debtItem}>
              <View style={[styles.debtDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.debtItemText, { color: theme.colors.textSecondary }]}>
                Duplication: 28%
              </Text>
            </View>
            <View style={styles.debtItem}>
              <View style={[styles.debtDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.debtItemText, { color: theme.colors.textSecondary }]}>
                Complexity: 22%
              </Text>
            </View>
            <View style={styles.debtItem}>
              <View style={[styles.debtDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.debtItemText, { color: theme.colors.textSecondary }]}>
                Coverage: 15%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 130,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  servicesSection: {
    marginBottom: 20,
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  servicesCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  serviceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 11,
    opacity: 0.7,
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  healthText: {
    fontSize: 10,
    fontWeight: '600',
  },
  serviceMetrics: {
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  complexityBar: {
    marginTop: 8,
  },
  complexityLabel: {
    fontSize: 11,
    marginBottom: 6,
    opacity: 0.7,
  },
  complexityTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  complexityFill: {
    height: '100%',
    borderRadius: 3,
  },
  topologySection: {
    marginBottom: 20,
  },
  topologyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  topologyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topologyCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  topologyLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  topologyValue: {
    fontSize: 11,
    opacity: 0.7,
  },
  debtSection: {
    marginTop: 8,
  },
  debtTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  debtCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  debtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  debtInfo: {
    flex: 1,
  },
  debtLabel: {
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.7,
  },
  debtValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  debtBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  debtFill: {
    height: '100%',
    borderRadius: 5,
  },
  debtBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  debtItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  debtDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  debtItemText: {
    fontSize: 11,
    opacity: 0.8,
  }
});