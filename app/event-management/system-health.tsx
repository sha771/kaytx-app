import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Activity, Server, Database, Shield, Zap, CheckCircle, AlertTriangle,
  TrendingUp, ArrowRight, BarChart3, Clock, Cpu, HardDrive, Wifi, Globe
} from 'lucide-react-native';

export default function SystemHealthAIInfrastructure() {
  const router = useRouter();

  const SYSTEM_STATS = [
    { label: 'Overall Health', value: '98%', icon: Activity, color: '#10B981', trend: '+2%' },
    { label: 'Uptime', value: '99.9%', icon: Server, color: '#06B6D4', trend: '+0.1%' },
    { label: 'Response Time', value: '45ms', icon: Zap, color: '#8B5CF6', trend: '-12%' },
    { label: 'Error Rate', value: '0.01%', icon: AlertTriangle, color: '#F59E0B', trend: '-25%' },
  ];

  const PLATFORM_SERVICES = [
    { service: 'Ticketing Platform', status: 'operational', health: 99, uptime: '99.9%', color: '#10B981' },
    { service: 'Event Mobile App', status: 'operational', health: 98, uptime: '99.8%', color: '#10B981' },
    { service: 'Payment Systems', status: 'operational', health: 100, uptime: '100%', color: '#10B981' },
    { service: 'AI Services', status: 'operational', health: 97, uptime: '99.7%', color: '#10B981' },
    { service: 'Live Streaming', status: 'operational', health: 96, uptime: '99.6%', color: '#10B981' },
    { service: 'Access Control', status: 'operational', health: 99, uptime: '99.9%', color: '#10B981' },
    { service: 'Database Cluster', status: 'operational', health: 98, uptime: '99.8%', color: '#10B981' },
    { service: 'CDN Network', status: 'degraded', health: 87, uptime: '98.5%', color: '#F59E0B' },
  ];

  const AI_AGENTS_HEALTH = [
    { agent: 'Agent Planner', status: 'active', tasks: 847, efficiency: 94, health: 98, color: '#06B6D4' },
    { agent: 'Agent Venue', status: 'active', tasks: 1240, efficiency: 91, health: 96, color: '#8B5CF6' },
    { agent: 'Agent Ticket', status: 'active', tasks: 9400, efficiency: 96, health: 99, color: '#10B981' },
    { agent: 'Agent Connect', status: 'active', tasks: 4200, efficiency: 92, health: 97, color: '#F59E0B' },
    { agent: 'Agent Sponsor', status: 'active', tasks: 3240, efficiency: 89, health: 95, color: '#FFD700' },
    { agent: 'Agent Guardian', status: 'active', tasks: 12847, efficiency: 97, health: 98, color: '#EC4899' },
  ];

  const INFRASTRUCTURE_METRICS = [
    { metric: 'CPU Usage', value: '67%', capacity: '80%', status: 'healthy', color: '#10B981' },
    { metric: 'Memory Usage', value: '72%', capacity: '85%', status: 'healthy', color: '#10B981' },
    { metric: 'Disk Usage', value: '58%', capacity: '90%', status: 'healthy', color: '#10B981' },
    { metric: 'Network I/O', value: '45%', capacity: '100%', status: 'healthy', color: '#10B981' },
    { metric: 'API Requests', value: '8.4K/s', capacity: '10K/s', status: 'healthy', color: '#10B981' },
    { metric: 'Database Connections', value: '847', capacity: '1000', status: 'healthy', color: '#10B981' },
  ];

  const RECENT_INCIDENTS = [
    { incident: 'CDN latency spike in EU region', severity: 'minor', time: '2h ago', status: 'resolved', icon: CheckCircle, color: '#10B981' },
    { incident: 'Payment gateway timeout', severity: 'minor', time: '5h ago', status: 'resolved', icon: CheckCircle, color: '#10B981' },
    { incident: 'AI service restart', severity: 'minor', time: '12h ago', status: 'resolved', icon: CheckCircle, color: '#10B981' },
    { incident: 'Database connection pool', severity: 'warning', time: '1d ago', status: 'resolved', icon: AlertTriangle, color: '#F59E0B' },
  ];

  const PERFORMANCE_METRICS = [
    { metric: 'Average Response Time', value: '45ms', target: '<100ms', status: 'optimal', color: '#10B981' },
    { metric: 'P95 Response Time', value: '120ms', target: '<200ms', status: 'optimal', color: '#10B981' },
    { metric: 'P99 Response Time', value: '340ms', target: '<500ms', status: 'optimal', color: '#10B981' },
    { metric: 'Throughput', value: '8.4K req/s', target: '>5K req/s', status: 'optimal', color: '#10B981' },
    { metric: 'Error Rate', value: '0.01%', target: '<0.1%', status: 'optimal', color: '#10B981' },
  ];

  const RESOURCE_TRENDS = [
    { period: '1h ago', cpu: '62%', memory: '68%', disk: '56%', network: '42%', color: '#06B6D4' },
    { period: '30m ago', cpu: '65%', memory: '70%', disk: '57%', network: '44%', color: '#8B5CF6' },
    { period: '15m ago', cpu: '67%', memory: '72%', disk: '58%', network: '45%', color: '#10B981' },
    { period: '5m ago', cpu: '66%', memory: '71%', disk: '58%', network: '44%', color: '#F59E0B' },
    { period: 'Now', cpu: '67%', memory: '72%', disk: '58%', network: '45%', color: '#FFD700' },
  ];

  const SERVICE_DEPENDENCIES = [
    { service: 'Ticketing Platform', dependsOn: ['Database Cluster', 'Payment Systems', 'AI Services'], health: 99, color: '#10B981' },
    { service: 'Event Mobile App', dependsOn: ['API Gateway', 'CDN Network', 'Authentication'], health: 98, color: '#10B981' },
    { service: 'AI Services', dependsOn: ['Database Cluster', 'Message Queue', 'GPU Cluster'], health: 97, color: '#10B981' },
    { service: 'Live Streaming', dependsOn: ['CDN Network', 'Video Encoder', 'Storage'], health: 96, color: '#10B981' },
  ];

  const AI_MODEL_METRICS = [
    { model: 'Revenue Prediction', accuracy: '94%', latency: '12ms', requests: '1.2K/min', health: 98, color: '#10B981' },
    { model: 'Capacity Forecasting', accuracy: '89%', latency: '8ms', requests: '890/min', health: 96, color: '#06B6D4' },
    { model: 'Risk Assessment', accuracy: '87%', latency: '15ms', requests: '456/min', health: 95, color: '#8B5CF6' },
    { model: 'Attendee Behavior', accuracy: '91%', latency: '10ms', requests: '2.3K/min', health: 97, color: '#F59E0B' },
  ];

  const SECURITY_STATUS = [
    { component: 'Authentication', status: 'secure', threats: 0, lastScan: '2m ago', color: '#10B981' },
    { component: 'API Gateway', status: 'secure', threats: 0, lastScan: '2m ago', color: '#10B981' },
    { component: 'Database', status: 'secure', threats: 0, lastScan: '5m ago', color: '#10B981' },
    { component: 'CDN Network', status: 'warning', threats: 2, lastScan: '10m ago', color: '#F59E0B' },
    { component: 'Storage', status: 'secure', threats: 0, lastScan: '15m ago', color: '#10B981' },
  ];

  const CAPACITY_PLANNING = [
    { resource: 'CPU', current: '67%', projected: '78%', threshold: '85%', action: 'Monitor', color: '#10B981' },
    { resource: 'Memory', current: '72%', projected: '84%', threshold: '90%', action: 'Monitor', color: '#F59E0B' },
    { resource: 'Storage', current: '58%', projected: '65%', threshold: '80%', action: 'No Action', color: '#10B981' },
    { resource: 'Network', current: '45%', projected: '52%', threshold: '70%', action: 'No Action', color: '#10B981' },
  ];

  const HEALTH_SCORECARD = [
    { category: 'Infrastructure', score: 98, weight: '30%', color: '#10B981' },
    { category: 'Services', score: 97, weight: '25%', color: '#10B981' },
    { category: 'AI Systems', score: 96, weight: '20%', color: '#10B981' },
    { category: 'Security', score: 94, weight: '15%', color: '#06B6D4' },
    { category: 'Performance', score: 95, weight: '10%', color: '#06B6D4' },
  ];

  const REALTIME_ALERTS = [
    { alert: 'High memory usage on API Gateway', severity: 'warning', time: '1m ago', source: 'System Monitor', color: '#F59E0B' },
    { alert: 'CDN latency spike in EU region', severity: 'warning', time: '2m ago', source: 'CDN Monitor', color: '#F59E0B' },
    { alert: 'Database connection pool at 85%', severity: 'info', time: '5m ago', source: 'DB Monitor', color: '#06B6D4' },
    { alert: 'AI model inference latency increased', severity: 'info', time: '8m ago', source: 'AI Monitor', color: '#06B6D4' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'healthy':
      case 'optimal':
        return '#10B981';
      case 'degraded':
      case 'warning':
      case 'at-risk':
        return '#F59E0B';
      case 'critical':
      case 'down':
        return '#EF4444';
      default:
        return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Activity size={48} color="#10B981" />
        </View>
        <View>
          <Text style={styles.headerTitle}>System Health & AI Infrastructure</Text>
          <Text style={styles.headerSubtitle}>Platform Monitoring & Agent Health</Text>
        </View>
      </View>

      {/* System Stats */}
      <View style={styles.statsContainer}>
        {SYSTEM_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Platform Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Services</Text>
        {PLATFORM_SERVICES.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.service}</Text>
              <View style={[styles.serviceStatus, { backgroundColor: getStatusColor(service.status) + '20' }]}>
                <Activity size={12} color={getStatusColor(service.status)} />
                <Text style={[styles.serviceStatusText, { color: getStatusColor(service.status) }]}>{service.status}</Text>
              </View>
            </View>
            <View style={styles.serviceBar}>
              <View 
                style={[
                  styles.serviceFill, 
                  { 
                    width: `${service.health}%`,
                    backgroundColor: service.health >= 95 ? '#10B981' : service.health >= 85 ? '#F59E0B' : '#EF4444'
                  } 
                ]} 
              />
            </View>
            <View style={styles.serviceStats}>
              <View style={styles.serviceStat}>
                <Activity size={12} color="#9CA3AF" />
                <Text style={styles.serviceStatLabel}>{service.health}% health</Text>
              </View>
              <View style={styles.serviceStat}>
                <Clock size={12} color="#9CA3AF" />
                <Text style={styles.serviceStatLabel}>{service.uptime} uptime</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Agents Health */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Agents Health</Text>
        {AI_AGENTS_HEALTH.map((agent, index) => (
          <View key={index} style={[styles.agentCard, { borderColor: agent.color + '40' }]}>
            <View style={styles.agentHeader}>
              <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
                <Zap size={20} color={agent.color} />
              </View>
              <View style={styles.agentInfo}>
                <Text style={styles.agentName}>{agent.agent}</Text>
                <View style={[styles.agentStatusBadge, { backgroundColor: getStatusColor(agent.status) + '20' }]}>
                  <Activity size={10} color={getStatusColor(agent.status)} />
                  <Text style={[styles.agentStatusText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
                </View>
              </View>
              <Text style={[styles.agentHealth, { color: agent.color }]}>{agent.health}%</Text>
            </View>
            <View style={styles.agentStats}>
              <View style={styles.agentStat}>
                <Text style={styles.agentStatLabel}>Tasks</Text>
                <Text style={styles.agentStatValue}>{agent.tasks.toLocaleString()}</Text>
              </View>
              <View style={styles.agentStat}>
                <Text style={styles.agentStatLabel}>Efficiency</Text>
                <Text style={styles.agentStatValue}>{agent.efficiency}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Infrastructure Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Infrastructure Metrics</Text>
        <View style={styles.infraGrid}>
          {INFRASTRUCTURE_METRICS.map((metric, index) => (
            <View key={index} style={[styles.infraCard, { borderColor: metric.color + '40' }]}>
              <View style={styles.infraIcon}>
                {index === 0 && <Cpu size={24} color={metric.color} />}
                {index === 1 && <HardDrive size={24} color={metric.color} />}
                {index === 2 && <Database size={24} color={metric.color} />}
                {index === 3 && <Wifi size={24} color={metric.color} />}
                {index === 4 && <Globe size={24} color={metric.color} />}
                {index === 5 && <Server size={24} color={metric.color} />}
              </View>
              <Text style={styles.infraValue}>{metric.value}</Text>
              <Text style={styles.infraLabel}>{metric.metric}</Text>
              <Text style={styles.infraCapacity}>Capacity: {metric.capacity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resource Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resource Utilization Trends</Text>
        <Text style={styles.sectionDescription}>Historical resource usage over time</Text>
        {RESOURCE_TRENDS.map((trend, index) => (
          <View key={index} style={styles.resourceTrendCard}>
            <View style={styles.resourceTrendHeader}>
              <Text style={styles.resourceTrendPeriod}>{trend.period}</Text>
            </View>
            <View style={styles.resourceTrendBars}>
              <View style={styles.resourceTrendBarContainer}>
                <Text style={styles.resourceTrendBarLabel}>CPU</Text>
                <View style={styles.resourceTrendBar}>
                  <View style={[styles.resourceTrendBarFill, { width: trend.cpu, backgroundColor: '#06B6D4' }]} />
                </View>
                <Text style={styles.resourceTrendBarValue}>{trend.cpu}</Text>
              </View>
              <View style={styles.resourceTrendBarContainer}>
                <Text style={styles.resourceTrendBarLabel}>Memory</Text>
                <View style={styles.resourceTrendBar}>
                  <View style={[styles.resourceTrendBarFill, { width: trend.memory, backgroundColor: '#8B5CF6' }]} />
                </View>
                <Text style={styles.resourceTrendBarValue}>{trend.memory}</Text>
              </View>
              <View style={styles.resourceTrendBarContainer}>
                <Text style={styles.resourceTrendBarLabel}>Disk</Text>
                <View style={styles.resourceTrendBar}>
                  <View style={[styles.resourceTrendBarFill, { width: trend.disk, backgroundColor: '#10B981' }]} />
                </View>
                <Text style={styles.resourceTrendBarValue}>{trend.disk}</Text>
              </View>
              <View style={styles.resourceTrendBarContainer}>
                <Text style={styles.resourceTrendBarLabel}>Network</Text>
                <View style={styles.resourceTrendBar}>
                  <View style={[styles.resourceTrendBarFill, { width: trend.network, backgroundColor: '#F59E0B' }]} />
                </View>
                <Text style={styles.resourceTrendBarValue}>{trend.network}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Service Dependencies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Dependencies</Text>
        <Text style={styles.sectionDescription}>Service interdependencies and health impact</Text>
        {SERVICE_DEPENDENCIES.map((dep, index) => (
          <View key={index} style={styles.depCard}>
            <View style={styles.depHeader}>
              <Text style={styles.depService}>{dep.service}</Text>
              <View style={styles.depHealth}>
                <Text style={styles.depHealthLabel}>Health</Text>
                <Text style={[styles.depHealthValue, { color: dep.color }]}>{dep.health}%</Text>
              </View>
            </View>
            <View style={styles.depDependencies}>
              <Text style={styles.depDependenciesLabel}>Depends On:</Text>
              <View style={styles.depTags}>
                {dep.dependsOn.map((d, i) => (
                  <View key={i} style={[styles.depTag, { backgroundColor: '#1F2937' }]}>
                    <Text style={styles.depTagText}>{d}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* AI Model Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Model Performance</Text>
        <Text style={styles.sectionDescription}>Real-time AI model metrics and health</Text>
        {AI_MODEL_METRICS.map((model, index) => (
          <View key={index} style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <Text style={styles.modelName}>{model.model}</Text>
              <View style={[styles.modelHealth, { backgroundColor: model.color + '20' }]}>
                <Activity size={12} color={model.color} />
                <Text style={[styles.modelHealthText, { color: model.color }]}>{model.health}%</Text>
              </View>
            </View>
            <View style={styles.modelMetrics}>
              <View style={styles.modelMetric}>
                <Text style={styles.modelMetricLabel}>Accuracy</Text>
                <Text style={styles.modelMetricValue}>{model.accuracy}</Text>
              </View>
              <View style={styles.modelMetric}>
                <Text style={styles.modelMetricLabel}>Latency</Text>
                <Text style={styles.modelMetricValue}>{model.latency}</Text>
              </View>
              <View style={styles.modelMetric}>
                <Text style={styles.modelMetricLabel}>Requests</Text>
                <Text style={styles.modelMetricValue}>{model.requests}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Security Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Status</Text>
        <Text style={styles.sectionDescription}>Security component health and threat monitoring</Text>
        {SECURITY_STATUS.map((sec, index) => (
          <View key={index} style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <View style={styles.securityHeaderLeft}>
                <Text style={styles.securityComponent}>{sec.component}</Text>
                <View style={[styles.securityStatus, { backgroundColor: sec.color + '20' }]}>
                  <Shield size={12} color={sec.color} />
                  <Text style={[styles.securityStatusText, { color: sec.color }]}>{sec.status}</Text>
                </View>
              </View>
              <View style={styles.securityThreats}>
                <Text style={styles.securityThreatsLabel}>Threats</Text>
                <Text style={[styles.securityThreatsValue, { color: sec.threats > 0 ? '#EF4444' : '#10B981' }]}>{sec.threats}</Text>
              </View>
            </View>
            <Text style={styles.securityLastScan}>Last scan: {sec.lastScan}</Text>
          </View>
        ))}
      </View>

      {/* Capacity Planning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capacity Planning</Text>
        <Text style={styles.sectionDescription}>Resource utilization projections and recommendations</Text>
        {CAPACITY_PLANNING.map((cap, index) => (
          <View key={index} style={styles.capacityCard}>
            <View style={styles.capacityHeader}>
              <Text style={styles.capacityResource}>{cap.resource}</Text>
              <View style={[styles.capacityAction, { backgroundColor: cap.color + '20' }]}>
                <Text style={[styles.capacityActionText, { color: cap.color }]}>{cap.action}</Text>
              </View>
            </View>
            <View style={styles.capacityBars}>
              <View style={styles.capacityBarContainer}>
                <Text style={styles.capacityBarLabel}>Current</Text>
                <View style={styles.capacityBar}>
                  <View style={[styles.capacityBarFill, { width: cap.current, backgroundColor: '#06B6D4' }]} />
                </View>
                <Text style={styles.capacityBarValue}>{cap.current}</Text>
              </View>
              <View style={styles.capacityBarContainer}>
                <Text style={styles.capacityBarLabel}>Projected</Text>
                <View style={styles.capacityBar}>
                  <View style={[styles.capacityBarFill, { width: cap.projected, backgroundColor: '#8B5CF6' }]} />
                </View>
                <Text style={styles.capacityBarValue}>{cap.projected}</Text>
              </View>
              <View style={styles.capacityBarContainer}>
                <Text style={styles.capacityBarLabel}>Threshold</Text>
                <View style={styles.capacityBar}>
                  <View style={[styles.capacityBarFill, { width: cap.projected, backgroundColor: '#F59E0B' }]} />
                </View>
                <Text style={styles.capacityBarValue}>{cap.threshold}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Health Scorecard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Health Scorecard</Text>
        <Text style={styles.sectionDescription}>Weighted health scores across system components</Text>
        <View style={styles.scorecardGrid}>
          {HEALTH_SCORECARD.map((score, index) => (
            <View key={index} style={[styles.scorecardCard, { borderColor: score.color + '40' }]}>
              <Text style={[styles.scorecardValue, { color: score.color }]}>{score.score}</Text>
              <Text style={styles.scorecardCategory}>{score.category}</Text>
              <Text style={styles.scorecardWeight}>Weight: {score.weight}</Text>
              <View style={[styles.scorecardIndicator, { backgroundColor: score.color + '20' }]}>
                <CheckCircle size={10} color={score.color} />
                <Text style={[styles.scorecardIndicatorText, { color: score.color }]}>{score.score >= 95 ? 'Excellent' : 'Good'}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Realtime Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Real-Time Alerts</Text>
        <Text style={styles.sectionDescription}>Live system alerts and notifications</Text>
        <View style={styles.alertsList}>
          {REALTIME_ALERTS.map((alert, index) => (
            <View key={index} style={styles.alertItem}>
              <View style={[styles.alertIcon, { backgroundColor: alert.color + '20' }]}>
                <AlertTriangle size={16} color={alert.color} />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertDescription}>{alert.alert}</Text>
                <View style={styles.alertMeta}>
                  <Text style={styles.alertSeverity}>{alert.severity}</Text>
                  <Text style={styles.alertSource}>• {alert.source}</Text>
                  <Text style={styles.alertTime}>• {alert.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        {PERFORMANCE_METRICS.map((metric, index) => (
          <View key={index} style={styles.perfCard}>
            <View style={styles.perfHeader}>
              <Text style={styles.perfMetric}>{metric.metric}</Text>
              <View style={[styles.perfStatus, { backgroundColor: getStatusColor(metric.status) + '20' }]}>
                <CheckCircle size={12} color={getStatusColor(metric.status)} />
                <Text style={[styles.perfStatusText, { color: getStatusColor(metric.status) }]}>{metric.status}</Text>
              </View>
            </View>
            <View style={styles.perfDetails}>
              <View style={styles.perfDetail}>
                <Text style={styles.perfDetailLabel}>Current</Text>
                <Text style={styles.perfDetailValue}>{metric.value}</Text>
              </View>
              <View style={styles.perfDetail}>
                <Text style={styles.perfDetailLabel}>Target</Text>
                <Text style={styles.perfDetailValue}>{metric.target}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Incidents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Incidents</Text>
        <View style={styles.incidentsList}>
          {RECENT_INCIDENTS.map((incident, index) => (
            <View key={index} style={styles.incidentItem}>
              <View style={[styles.incidentIcon, { backgroundColor: incident.color + '20' }]}>
                <incident.icon size={16} color={incident.color} />
              </View>
              <View style={styles.incidentContent}>
                <Text style={styles.incidentDescription}>{incident.incident}</Text>
                <Text style={styles.incidentMeta}>{incident.severity} • {incident.time}</Text>
              </View>
              <View style={[styles.incidentStatus, { backgroundColor: getStatusColor(incident.status) + '20' }]}>
                <Text style={[styles.incidentStatusText, { color: getStatusColor(incident.status) }]}>{incident.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <Activity size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Health Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Server size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Restart Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <BarChart3 size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Shield size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Security</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#10B98140',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  serviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  serviceStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  serviceBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  serviceFill: {
    height: '100%',
    borderRadius: 4,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serviceStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  agentCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  agentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  agentStatusBadge: {
    flexDirection: 'row',
    alignItems: '#center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  agentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentHealth: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  agentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  agentStat: {
    alignItems: 'center',
  },
  agentStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  agentStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infraGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infraCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  infraIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infraValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infraLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  infraCapacity: {
    fontSize: 11,
    color: '#6B7280',
  },
  perfCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  perfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  perfMetric: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  perfStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  perfStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  perfDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  perfDetail: {
    alignItems: 'center',
  },
  perfDetailLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  perfDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  incidentsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  incidentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  incidentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incidentContent: {
    flex: 1,
  },
  incidentDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  incidentMeta: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  incidentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  incidentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  resourceTrendCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  resourceTrendHeader: {
    marginBottom: 12,
  },
  resourceTrendPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resourceTrendBars: {
    gap: 12,
  },
  resourceTrendBarContainer: {
    gap: 6,
  },
  resourceTrendBarLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  resourceTrendBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resourceTrendBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  resourceTrendBarValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  depCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  depHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  depService: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  depHealth: {
    alignItems: 'flex-end',
  },
  depHealthLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  depHealthValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  depDependencies: {
    gap: 8,
  },
  depDependenciesLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  depTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  depTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  depTagText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  modelCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modelHealth: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  modelHealthText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modelMetric: {
    alignItems: 'center',
  },
  modelMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  modelMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  securityCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  securityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityHeaderLeft: {
    gap: 8,
  },
  securityComponent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  securityStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  securityStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  securityThreats: {
    alignItems: 'flex-end',
  },
  securityThreatsLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  securityThreatsValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  securityLastScan: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  capacityCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityResource: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityAction: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  capacityActionText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  capacityBars: {
    gap: 12,
  },
  capacityBarContainer: {
    gap: 6,
  },
  capacityBarLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  capacityBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  capacityBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  capacityBarValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scorecardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  scorecardCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  scorecardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scorecardCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  scorecardWeight: {
    fontSize: 10,
    color: '#6B7280',
  },
  scorecardIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  scorecardIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  alertsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertSeverity: {
    fontSize: 11,
    color: '#F59E0B',
  },
  alertSource: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  alertTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
