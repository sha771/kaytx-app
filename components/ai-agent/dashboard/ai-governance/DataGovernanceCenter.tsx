import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, GitBranch, CheckCircle, AlertTriangle, Shield, TrendingUp, Eye, Lock, FileText, Activity, Zap } from 'lucide-react-native';

interface Dataset {
  id: string;
  name: string;
  type: 'training' | 'validation' | 'test' | 'production';
  dataLineage: string[];
  qualityScore: number;
  sensitiveDataDetected: boolean;
  piiExposureRisk: 'low' | 'medium' | 'high';
  trustScore: number;
  lastUpdated: string;
}

interface DataGovernanceCenterProps {
  datasets: Dataset[];
}

export default function DataGovernanceCenter({ datasets }: DataGovernanceCenterProps) {
  const { theme } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'training': return '#06B6D4';
      case 'validation': return '#8B5CF6';
      case 'test': return '#F59E0B';
      case 'production': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeBackground = (type: string) => {
    const color = getTypeColor(type);
    return color + '15';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRiskBackground = (risk: string) => {
    const color = getRiskColor(risk);
    return color + '15';
  };

  const dataFlowMap = [
    { source: 'Raw Data', destination: 'Processed', flow: 85, color: '#06B6D4' },
    { source: 'Processed', destination: 'Feature Store', flow: 92, color: '#8B5CF6' },
    { source: 'Feature Store', destination: 'Training Pipeline', flow: 88, color: '#10B981' },
    { source: 'Training Pipeline', destination: 'Model Registry', flow: 95, color: '#F59E0B' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Database size={20} color="#06B6D4" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Data Governance Center
        </Text>
      </View>

      {/* Data Flow Map */}
      <View style={[styles.flowSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.flowHeader}>
          <GitBranch size={18} color="#8B5CF6" />
          <Text style={[styles.flowTitle, { color: theme.colors.text }]}>
            Data Flow Map
          </Text>
        </View>
        <View style={styles.flowGrid}>
          {dataFlowMap.map((flow, index) => (
            <View key={index} style={styles.flowItem}>
              <View style={styles.flowSource}>
                <Text style={[styles.flowText, { color: theme.colors.textSecondary }]}>
                  {flow.source}
                </Text>
              </View>
              <View style={[styles.flowArrow, { backgroundColor: flow.color + '30' }]}>
                <Activity size={16} color={flow.color} />
              </View>
              <View style={styles.flowDestination}>
                <Text style={[styles.flowText, { color: theme.colors.textSecondary }]}>
                  {flow.destination}
                </Text>
              </View>
              <View style={styles.flowMetric}>
                <Text style={[styles.flowValue, { color: flow.color }]}>
                  {flow.flow}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Dataset Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datasetsScroll}
      >
        {datasets.map((dataset) => {
          const typeColor = getTypeColor(dataset.type);
          const typeBackground = getTypeBackground(dataset.type);
          const riskColor = getRiskColor(dataset.piiExposureRisk);
          const riskBackground = getRiskBackground(dataset.piiExposureRisk);

          return (
            <View 
              key={dataset.id} 
              style={[
                styles.datasetCard, 
                { 
                  backgroundColor: typeBackground,
                  borderColor: typeColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.datasetHeader}>
                <View style={[styles.datasetIcon, { backgroundColor: typeColor + '20' }]}>
                  <Database size={24} color={typeColor} />
                </View>
                <View style={styles.datasetStatus}>
                  <View style={[styles.statusDot, { backgroundColor: typeColor }]} />
                  <Text style={[styles.statusText, { color: typeColor }]}>
                    {dataset.type.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.datasetName, { color: theme.colors.text }]}>
                {dataset.name}
              </Text>

              <View style={styles.datasetSection}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  Data Lineage
                </Text>
                <View style={styles.lineageList}>
                  {dataset.dataLineage.slice(0, 3).map((source, index) => (
                    <View key={index} style={styles.lineageItem}>
                      <GitBranch size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.lineageText, { color: theme.colors.text }]}>
                        {source}
                      </Text>
                    </View>
                  ))}
                  {dataset.dataLineage.length > 3 && (
                    <Text style={[styles.lineageMore, { color: theme.colors.textSecondary }]}>
                      +{dataset.dataLineage.length - 3} more sources
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.datasetMetrics}>
                <View style={styles.metricRow}>
                  <CheckCircle size={14} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Quality Score
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {dataset.qualityScore}%
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Shield size={14} color={riskColor} />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    PII Exposure Risk
                  </Text>
                  <View style={[
                    styles.riskBadge, 
                    { backgroundColor: riskBackground }
                  ]}>
                    <Text style={[styles.riskText, { color: riskColor }]}>
                      {dataset.piiExposureRisk.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.metricRow}>
                  <Eye size={14} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Trust Score
                  </Text>
                  <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                    {dataset.trustScore}%
                  </Text>
                </View>
              </View>

              <View style={styles.qualityBar}>
                <View style={styles.qualityBarTrack}>
                  <View 
                    style={[
                      styles.qualityBarFill, 
                      { 
                        backgroundColor: dataset.qualityScore >= 90 ? '#10B981' : dataset.qualityScore >= 70 ? '#F59E0B' : '#EF4444',
                        width: dataset.qualityScore + '%'
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.qualityText, { color: theme.colors.textSecondary }]}>
                  {dataset.qualityScore >= 90 ? 'High Quality' : dataset.qualityScore >= 70 ? 'Good Quality' : 'Needs Improvement'}
                </Text>
              </View>

              {dataset.sensitiveDataDetected && (
                <View style={[styles.alertBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <AlertTriangle size={12} color="#EF4444" />
                  <Text style={[styles.alertText, { color: '#EF4444' }]}>
                    Sensitive Data Detected
                  </Text>
                </View>
              )}

              <View style={styles.datasetFooter}>
                <FileText size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  Updated {dataset.lastUpdated}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Sensitivity Heatmap */}
      <View style={[styles.heatmapSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.heatmapHeader}>
          <Shield size={18} color="#EF4444" />
          <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>
            Data Sensitivity Heatmap
          </Text>
        </View>
        <View style={styles.heatmapGrid}>
          <View style={styles.heatmapRow}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.textSecondary }]}>
              PII Data
            </Text>
            <View style={[styles.heatmapBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <View style={[styles.heatmapFill, { backgroundColor: '#EF4444', width: '75%' }]} />
            </View>
            <Text style={[styles.heatmapValue, { color: '#EF4444' }]}>
              High
            </Text>
          </View>
          <View style={styles.heatmapRow}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.textSecondary }]}>
              Financial Data
            </Text>
            <View style={[styles.heatmapBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <View style={[styles.heatmapFill, { backgroundColor: '#F59E0B', width: '60%' }]} />
            </View>
            <Text style={[styles.heatmapValue, { color: '#F59E0B' }]}>
              Medium
            </Text>
          </View>
          <View style={styles.heatmapRow}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.textSecondary }]}>
              Health Data
            </Text>
            <View style={[styles.heatmapBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <View style={[styles.heatmapFill, { backgroundColor: '#EF4444', width: '85%' }]} />
            </View>
            <Text style={[styles.heatmapValue, { color: '#EF4444' }]}>
              High
            </Text>
          </View>
          <View style={styles.heatmapRow}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.textSecondary }]}>
              Behavioral Data
            </Text>
            <View style={[styles.heatmapBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.heatmapFill, { backgroundColor: '#10B981', width: '30%' }]} />
            </View>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>
              Low
            </Text>
          </View>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  flowSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  flowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  flowTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  flowGrid: {
    gap: 8,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flowSource: {
    flex: 1,
  },
  flowText: {
    fontSize: 12,
    fontWeight: '500',
  },
  flowArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowDestination: {
    flex: 1,
  },
  flowMetric: {
    minWidth: 40,
  },
  flowValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  datasetsScroll: {
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  datasetCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  datasetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  datasetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datasetStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  datasetName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  datasetSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  lineageList: {
    gap: 6,
  },
  lineageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lineageText: {
    fontSize: 12,
    fontWeight: '500',
  },
  lineageMore: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  datasetMetrics: {
    gap: 8,
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  qualityBar: {
    marginBottom: 12,
    gap: 6,
  },
  qualityBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  qualityBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  qualityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  alertText: {
    fontSize: 11,
    fontWeight: '600',
  },
  datasetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  heatmapSection: {
    borderRadius: 12,
    padding: 16,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapGrid: {
    gap: 10,
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heatmapLabel: {
    width: 100,
    fontSize: 12,
    fontWeight: '500',
  },
  heatmapBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  heatmapValue: {
    width: 50,
    fontSize: 12,
    fontWeight: '600',
  },
});