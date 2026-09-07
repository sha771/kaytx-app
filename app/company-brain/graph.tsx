/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Network, X, Filter, ZoomIn, ZoomOut, Download, Share2, Search, Layers, ArrowRight, User, FileText, Briefcase, Building2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svg, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import apiClient from '../../lib/api-client';

export default function CompanyBrainGraph() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [graphData, setGraphData] = useState<{ nodes: any[]; edges: any[] }>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGraphData();
  }, []);

  const loadGraphData = async () => {
    try {
      setLoading(true);
      const [vizResponse, statsResponse] = await Promise.all([
        apiClient.getGraphVisualization({ organizationId: 'default' }),
        apiClient.getGraphStatistics({ organizationId: 'default' }),
      ]);

      if (vizResponse?.success && vizResponse?.data) {
        const data = vizResponse.data;
        setGraphData({
          nodes: data.nodes || [],
          edges: data.edges || [],
        });
      }

      if (statsResponse?.success && statsResponse?.data) {
        console.log('Graph statistics:', statsResponse.data);
      }
    } catch (err) {
      console.error('Failed to load graph data:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadGraphData();
    setRefreshing(false);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'person':
        return User;
      case 'project':
        return Briefcase;
      case 'client':
        return Building2;
      default:
        return FileText;
    }
  };

  const handleNodePress = (node: any) => {
    setSelectedNode(node);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5));
  };

  const handleExport = () => {
    console.log('Export graph');
  };

  const handleShare = () => {
    console.log('Share graph');
  };

  if (loading && graphData.nodes.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Knowledge Graph</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleZoomOut}>
              <ZoomOut size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleZoomIn}>
              <ZoomIn size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilters(true)}>
              <Filter size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading knowledge graph...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Knowledge Graph</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleZoomOut}>
            <ZoomOut size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleZoomIn}>
            <ZoomIn size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilters(true)}>
            <Filter size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search nodes..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Graph Visualization */}
      <ScrollView
        style={styles.graphContainer}
        contentContainerStyle={styles.graphContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />}
      >
        <View style={[styles.graphWrapper, { transform: [{ scale: zoom }] }]}>
          <Svg width={600} height={600} viewBox="0 0 600 600">
            {/* Edges */}
            {graphData.edges.map((edge, index) => {
              const sourceNode = graphData.nodes.find((n: any) => n.id === edge.source);
              const targetNode = graphData.nodes.find((n: any) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              return (
                <Line
                  key={`edge-${index}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#334155"
                  strokeWidth={(edge.strength || 0.5) * 3}
                  opacity={0.6}
                />
              );
            })}

            {/* Nodes */}
            {graphData.nodes.map((node: any) => {
              const Icon = getNodeIcon(node.type);
              return (
                <G key={`node-${node.id}`} onPress={() => handleNodePress(node)}>
                  <Circle
                    cx={node.x}
                    cy={node.y}
                    r={30}
                    fill={node.color || '#6366f1'}
                    opacity={0.2}
                  />
                  <Circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={node.color || '#6366f1'}
                    strokeWidth={2}
                    stroke={node.color || '#6366f1'}
                  />
                  <SvgText
                    x={node.x}
                    y={node.y + 45}
                    fontSize={12}
                    fill="#ffffff"
                    textAnchor="middle"
                  >
                    {node.name || node.label}
                  </SvgText>
                  <SvgText
                    x={node.x}
                    y={node.y + 60}
                    fontSize={10}
                    fill="#94a3b8"
                    textAnchor="middle"
                  >
                    {node.type}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Node Types</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#6366f1' }]} />
              <Text style={styles.legendText}>Person</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.legendText}>Project</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
              <Text style={styles.legendText}>Document</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>Client</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ec4899' }]} />
              <Text style={styles.legendText}>Decision</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#06b6d4' }]} />
              <Text style={styles.legendText}>Process</Text>
            </View>
          </View>
        </View>

        {/* Path Tracing */}
        <View style={styles.pathTracing}>
          <Text style={styles.sectionTitle}>Path Tracing</Text>
          <View style={styles.pathInput}>
            <TextInput
              style={styles.pathInputField}
              placeholder="Enter two node names to trace path..."
              placeholderTextColor="#64748b"
            />
            <TouchableOpacity style={styles.pathButton}>
              <ArrowRight size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
            <Download size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Node Detail Modal */}
      <Modal
        visible={!!selectedNode}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedNode(null)}
      >
        {selectedNode && (
          <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Node Details</Text>
              <TouchableOpacity onPress={() => setSelectedNode(null)}>
                <X size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={[styles.nodeDetailHeader, { borderLeftColor: selectedNode.color || '#6366f1' }]}>
                <View style={[styles.nodeDetailIcon, { backgroundColor: `${selectedNode.color || '#6366f1'}20` }]}>
                  {React.createElement(getNodeIcon(selectedNode.type), { size: 32, color: selectedNode.color || '#6366f1' })}
                </View>
                <View style={styles.nodeDetailInfo}>
                  <Text style={styles.nodeDetailName}>{selectedNode.name || selectedNode.label}</Text>
                  <Text style={styles.nodeDetailType}>{selectedNode.type}</Text>
                </View>
              </View>

              <View style={styles.nodeDetailSection}>
                <Text style={styles.nodeDetailSectionTitle}>Properties</Text>
                {Object.entries(selectedNode).map(([key, value]) => {
                  if (['id', 'type', 'name', 'label', 'x', 'y', 'color'].includes(key)) return null;
                  return (
                    <View key={key} style={styles.nodeDetailRow}>
                      <Text style={styles.nodeDetailLabel}>{key}</Text>
                      <Text style={styles.nodeDetailValue}>{String(value)}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.nodeDetailSection}>
                <Text style={styles.nodeDetailSectionTitle}>Connections</Text>
                {graphData.edges
                  .filter((edge: any) => edge.source === selectedNode.id || edge.target === selectedNode.id)
                  .map((edge: any, index: number) => {
                    const connectedNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const connectedNode = graphData.nodes.find((n: any) => n.id === connectedNodeId);
                    if (!connectedNode) return null;
                    
                    return (
                      <TouchableOpacity key={index} style={styles.connectionItem}>
                        <View style={[styles.connectionDot, { backgroundColor: connectedNode.color || '#6366f1' }]} />
                        <Text style={styles.connectionName}>{connectedNode.name || connectedNode.label}</Text>
                        <Text style={styles.connectionType}>{edge.type}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
            <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>View Full Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Graph</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Node Types</Text>
              {['person', 'project', 'document', 'client', 'decision', 'process'].map((type) => (
                <TouchableOpacity key={type} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Relationship Types</Text>
              {['manages', 'leads', 'authored', 'documents', 'serves', 'informed', 'follows', 'impacts', 'supports'].map((type) => (
                <TouchableOpacity key={type} style={styles.filterOption}>
                  <View style={styles.filterCheckbox} />
                  <Text style={styles.filterOptionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Connection Strength</Text>
              <View style={styles.strengthSlider}>
                <Text style={styles.strengthLabel}>Min: 0.5</Text>
                <Text style={styles.strengthLabel}>Max: 1.0</Text>
              </View>
            </View>
          </ScrollView>
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity style={styles.clearFiltersButton}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyFiltersButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    margin: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 12,
  },
  graphContainer: {
    flex: 1,
  },
  graphContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  graphWrapper: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    margin: 20,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  loadingText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
  legend: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  pathTracing: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  pathInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pathInputField: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    padding: 12,
  },
  pathButton: {
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    margin: 20,
    marginTop: 0,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  nodeDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  nodeDetailIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nodeDetailInfo: {
    flex: 1,
  },
  nodeDetailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  nodeDetailType: {
    fontSize: 14,
    color: '#94a3b8',
  },
  nodeDetailSection: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nodeDetailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  nodeDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  nodeDetailLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  nodeDetailValue: {
    fontSize: 14,
    color: '#ffffff',
  },
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  connectionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  connectionName: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  connectionType: {
    fontSize: 12,
    color: '#94a3b8',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  filterCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#334155',
    marginRight: 12,
  },
  filterOptionText: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  strengthSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  strengthLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  clearFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  applyFiltersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
