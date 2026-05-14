import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity,
  Server,
  Database,
  Zap,
  Target,
  Shield,
  Code,
  Terminal,
  Monitor,
  BarChart2,
  PieChart,
  Layout,
  List,
  Clock,
} from 'lucide-react-native';

export default function AICommandVisualizationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },
    navButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    navButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    vizContainer: {
      flexDirection: 'row',
      margin: 16,
    },
    controlPanel: {
      flex: 0.4,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginRight: 12,
    },
    vizPanel: {
      flex: 0.6,
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 16,
      padding: 16,
    },
    panelTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },
    controlGroup: {
      marginBottom: 16,
    },
    controlLabel: {
      fontSize: 13,
      color: theme.colors.secondaryText,
      marginBottom: 6,
    },
    modeSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    modeButton: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    activeMode: {
      backgroundColor: '#007AFF20',
    },
    modeText: {
      fontSize: 12,
      color: theme.colors.text,
    },
    prioritySlider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    sliderTrack: {
      flex: 1,
      height: 4,
      backgroundColor: '#E0E0E0',
      borderRadius: 2,
      marginHorizontal: 12,
    },
    sliderFill: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '60%',
      backgroundColor: '#007AFF',
      borderRadius: 2,
    },
    sliderThumb: {
      width: 12,
      height: 12,
      backgroundColor: '#007AFF',
      borderRadius: 6,
    },
    priorityLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priorityLabel: {
      fontSize: 10,
      color: theme.colors.secondaryText,
    },
    resourceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    resourceItem: {
      alignItems: 'center',
    },
    resourceLabel: {
      fontSize: 11,
      color: theme.colors.secondaryText,
    },
    resourceValue: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },
    executeButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
    },
    executeButtonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '600',
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    metricCard: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.03)',
      borderRadius: 12,
      width: '30%',
    },
    metricLabel: {
      fontSize: 11,
      color: theme.colors.secondaryText,
      marginTop: 4,
    },
    metricValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
    },
    diagramContainer: {
      marginBottom: 16,
    },
    diagramHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    diagramTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    zoomButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    zoomText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    diagramContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    nodeGroup: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    node: {
      alignItems: 'center',
      marginRight: 24,
    },
    connection: {
      width: 2,
      height: 24,
      backgroundColor: '#E0E0E0',
      marginVertical: 4,
    },
    nodeLabel: {
      fontSize: 11,
      color: theme.colors.secondaryText,
      marginTop: 6,
      textAlign: 'center',
    },
    sideProcess: {
      alignItems: 'flex-end',
    },
    workflowList: {
      marginBottom: 16,
    },
    listTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    listItems: {
      gap: 8,
    },
    workflowItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderRadius: 10,
    },
    workflowInfo: {
      flex: 1,
    },
    workflowName: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },
    workflowStatus: {
      fontSize: 11,
      color: theme.colors.secondaryText,
    },
    workflowProgress: {
      width: 100,
    },
    bottomControls: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    controlRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    bottomButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },
    bottomButtonText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header with Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Activity size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>AI Command & Visualization</Text>
        <TouchableOpacity
          onPress={() => router.push('/ai-agent/command-center')}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>Command Center</Text>
        </TouchableOpacity>
      </View>

      {/* Main Visualization */}
      <View style={styles.vizContainer}>
        {/* Left Panel - Control */}
        <View style={styles.controlPanel}>
          <Text style={styles.panelTitle}>Command Controls</Text>
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Orchestration Mode</Text>
            <View style={styles.modeSelector}>
              {[ 'Auto', 'Manual', 'Hybrid' ].map((mode, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.modeButton, i === 0 && styles.activeMode]}
                >
                  <Text style={styles.modeText}>{mode}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Workflow Priority</Text>
            <View style={styles.prioritySlider}>
              <View style={styles.sliderTrack}>
                <View style={styles.sliderFill} />
              </View>
              <View style={styles.sliderThumb} />
            </View>
            <View style={styles.priorityLabels}>
              <Text style={styles.priorityLabel}>Low</Text>
              <Text style={styles.priorityLabel}>Medium</Text>
              <Text style={styles.priorityLabel}>High</Text>
            </View>
          </View>
          
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Resource Allocation</Text>
            <View style={styles.resourceRow}>
              <View style={styles.resourceItem}>
                <Text style={styles.resourceLabel}>Compute</Text>
                <Text style={styles.resourceValue}>65%</Text>
              </View>
              <View style={styles.resourceItem}>
                <Text style={styles.resourceLabel}>Memory</Text>
                <Text style={styles.resourceValue}>42%</Text>
              </View>
              <View style={styles.resourceItem}>
                <Text style={styles.resourceLabel}>Network</Text>
                <Text style={styles.resourceValue}>78%</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.executeButton}
            activeOpacity={0.7}
          >
            <Text style={styles.executeButtonText}>Execute Command</Text>
          </TouchableOpacity>
        </View>

        {/* Right Panel - Visualization */}
        <View style={styles.vizPanel}>
          <Text style={styles.panelTitle}>Live Workflow Visualization</Text>
          
          {/* Real-time Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Zap size={20} color="#007AFF" />
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Active Flows</Text>
                <Text style={styles.metricValue}>12</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <BarChart2 size={20} color="#34C759" />
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Tasks/Hour</Text>
                <Text style={styles.metricValue}>2.4K</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <Clock size={20} color="#FF9500" />
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Avg Latency</Text>
                <Text style={styles.metricValue}>142ms</Text>
              </View>
            </View>
          </View>

          {/* Workflow Diagram */}
          <View style={styles.diagramContainer}>
            <View style={styles.diagramHeader}>
              <Text style={styles.diagramTitle}>Enterprise AI Workflow</Text>
               <TouchableOpacity style={styles.zoomButton}>
                 <Text style={styles.zoomText}>+</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.diagramContent}>
              {/* Simplified workflow nodes */}
              <View style={styles.nodeGroup}>
                {/* Input Layer */}
                <View style={styles.node}>
                  <Database size={24} color="#2196F3" />
                  <Text style={styles.nodeLabel}>Data Ingestion</Text>
                </View>
                <View style={styles.connection} />
                
                {/* Processing Layer */}
                <View style={styles.node}>
                  <Activity size={24} color="#FF9800" />
                  <Text style={styles.nodeLabel}>Intelligence Processing</Text>
                </View>
                <View style={styles.connection} />
                
                {/* Decision Layer */}
                <View style={styles.node}>
                  <Shield size={24} color="#9C27B0" />
                  <Text style={styles.nodeLabel}>Command & Control</Text>
                </View>
                <View style={styles.connection} />
                
                {/* Output Layer */}
                <View style={styles.node}>
                  <Monitor size={24} color="#4CAF50" />
                  <Text style={styles.nodeLabel}>Results Delivery</Text>
                </View>
              </View>
              
              {/* Side processes */}
              <View style={styles.sideProcess}>
                <View style={styles.node}>
                  <Server size={20} color="#607D8B" />
                  <Text style={styles.nodeLabel}>Monitoring</Text>
                </View>
                <View style={styles.connection} />
                <View style={styles.node}>
                  <List size={20} color="#795548" />
                  <Text style={styles.nodeLabel}>Logging</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Workflow List */}
          <View style={styles.workflowList}>
            <Text style={styles.listTitle}>Active Workflows</Text>
            <View style={styles.listItems}>
              {[
                { id: 1, name: 'Customer Support Automation', status: 'Running', progress: 65 },
                { id: 2, name: 'Sales Forecasting Model', status: 'Queued', progress: 0 },
                { id: 3, name: 'Inventory Optimization', status: 'Running', progress: 82 },
                { id: 4, name: 'Fraud Detection Pipeline', status: 'Running', progress: 45 },
              ].map((wf) => (
                <View key={wf.id} style={styles.workflowItem}>
                  <View style={styles.workflowInfo}>
                    <Text style={styles.workflowName}>{wf.name}</Text>
                    <Text style={styles.workflowStatus}>
                      {wf.status} • {wf.progress}% Complete
                    </Text>
                  </View>
                  <View style={styles.workflowProgress}>
                    <View style={{ 
                      backgroundColor: '#E0E0E0', 
                      height: 4, 
                      borderRadius: 2,
                      overflow: 'hidden' 
                    }}>
                      <View style={{ 
                        width: `${wf.progress}%`, 
                        height: '100%', 
                        backgroundColor: '#007AFF',
                        borderRadius: 2 
                      }} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#007AFF20' }]}
            activeOpacity={0.7}
          >
            <Zap size={18} color="#007AFF" />
            <Text style={styles.bottomButtonText}>New Workflow</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#34C75920' }]}
            activeOpacity={0.7}
          >
            <Activity size={18} color="#34C759" />
            <Text style={styles.bottomButtonText}>Monitor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: '#FF950020' }]}
            activeOpacity={0.7}
          >
            <BarChart2 size={18} color="#FF9500" />
            <Text style={styles.bottomButtonText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
