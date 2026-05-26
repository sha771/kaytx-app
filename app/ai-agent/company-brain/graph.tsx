import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Network, ZoomIn, ZoomOut, RotateCcw, Filter, Share2, Download, Maximize2, Users, FileText, Briefcase, Target, Sparkles, Link2, Circle, Bot, Eye } from 'lucide-react-native';

export default function KnowledgeGraphScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sample graph nodes data
  const GRAPH_NODES = [
    { id: 'ceo', label: 'CEO', type: 'person', connections: 12, color: '#7C3AED' },
    { id: 'cto', label: 'CTO', type: 'person', connections: 8, color: '#3B82F6' },
    { id: 'cfo', label: 'CFO', type: 'person', connections: 6, color: '#10B981' },
    { id: 'vp-eng', label: 'VP Engineering', type: 'person', connections: 15, color: '#3B82F6' },
    { id: 'aws-migration', label: 'AWS Migration', type: 'project', connections: 8, color: '#F59E0B' },
    { id: 'q4-launch', label: 'Q4 Product Launch', type: 'project', connections: 12, color: '#EC4899' },
    { id: 'security', label: 'Security Audit', type: 'process', connections: 5, color: '#EF4444' },
    { id: 'client-acme', label: 'Acme Corp', type: 'client', connections: 9, color: '#06B6D4' },
    { id: 'architecture', label: 'System Architecture', type: 'technical', connections: 10, color: '#8B5CF6' },
    { id: 'api-design', label: 'API Design Standards', type: 'technical', connections: 7, color: '#8B5CF6' },
  ];

  const ENTITY_TYPES = [
    { type: 'People', count: 892, color: '#7C3AED', icon: Users },
    { type: 'Projects', count: 234, color: '#F59E0B', icon: Briefcase },
    { type: 'Clients', count: 156, color: '#06B6D4', icon: Target },
    { type: 'Processes', count: 345, color: '#10B981', icon: FileText },
    { type: 'Technical', count: 189, color: '#8B5CF6', icon: Network },
    { type: 'Decisions', count: 567, color: '#EC4899', icon: Sparkles },
  ];

  const CONNECTIONS = [
    { from: 'ceo', to: 'cto', label: 'Reports to', strength: 'strong' },
    { from: 'cto', to: 'vp-eng', label: 'Leads', strength: 'strong' },
    { from: 'vp-eng', to: 'aws-migration', label: 'Owns', strength: 'medium' },
    { from: 'vp-eng', to: 'architecture', label: 'Responsible for', strength: 'medium' },
    { from: 'aws-migration', to: 'api-design', label: 'Requires', strength: 'weak' },
    { from: 'q4-launch', to: 'client-acme', label: 'Target client', strength: 'medium' },
    { from: 'ceo', to: 'cfo', label: 'Works with', strength: 'strong' },
  ];

  const SAMPLE_PATHS = [
    { path: ['CEO', 'CTO', 'VP Engineering', 'AWS Migration'], length: 3 },
    { path: ['CEO', 'CFO', 'Budget Approval'], length: 2 },
    { path: ['VP Engineering', 'API Design', 'Security Audit'], length: 2 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Graph</Text>
          <Text style={styles.headerSubtitle}>Visual representation of information connections</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Maximize2 size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Graph Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Network size={20} color="#7C3AED" />
            <Text style={styles.statValue}>2,847</Text>
            <Text style={styles.statLabel}>Total Nodes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Link2 size={20} color="#3B82F6" />
            <Text style={styles.statValue}>12,456</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Eye size={20} color="#10B981" />
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Coverage</Text>
          </View>
        </View>

        {/* Interactive Graph Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Graph</Text>
          <View style={[styles.graphPreview, { backgroundColor: '#1E293B' }]}>
            {/* Node positions for visual representation */}
            <View style={[styles.graphContainer, { transform: [{ scale: zoomLevel }] }]}>
              {/* CEO Node - Center Top */}
              <TouchableOpacity 
                style={[styles.graphNode, styles.nodeCeo, { backgroundColor: '#7C3AED' }]}
                onPress={() => setSelectedNode('ceo')}
              >
                <Text style={styles.nodeText}>CEO</Text>
              </TouchableOpacity>

              {/* CTO & CFO Nodes */}
              <View style={styles.graphRow2}>
                <TouchableOpacity 
                  style={[styles.graphNode, { backgroundColor: '#3B82F6' }]}
                  onPress={() => setSelectedNode('cto')}
                >
                  <Text style={styles.nodeText}>CTO</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.graphNode, { backgroundColor: '#10B981' }]}
                  onPress={() => setSelectedNode('cfo')}
                >
                  <Text style={styles.nodeText}>CFO</Text>
                </TouchableOpacity>
              </View>

              {/* VP Engineering */}
              <TouchableOpacity 
                style={[styles.graphNode, { backgroundColor: '#3B82F6' }]}
                onPress={() => setSelectedNode('vp-eng')}
              >
                <Text style={styles.nodeText}>VP Eng</Text>
              </TouchableOpacity>

              {/* Projects Row */}
              <View style={styles.graphRow4}>
                <TouchableOpacity 
                  style={[styles.graphNodeSmall, { backgroundColor: '#F59E0B' }]}
                  onPress={() => setSelectedNode('aws-migration')}
                >
                  <Text style={styles.nodeTextSmall}>AWS</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.graphNodeSmall, { backgroundColor: '#EC4899' }]}
                  onPress={() => setSelectedNode('q4-launch')}
                >
                  <Text style={styles.nodeTextSmall}>Q4</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.graphNodeSmall, { backgroundColor: '#EF4444' }]}
                  onPress={() => setSelectedNode('security')}
                >
                  <Text style={styles.nodeTextSmall}>Sec</Text>
                </TouchableOpacity>
              </View>

              {/* Technical & Clients */}
              <View style={styles.graphRow4}>
                <TouchableOpacity 
                  style={[styles.graphNodeSmall, { backgroundColor: '#8B5CF6' }]}
                  onPress={() => setSelectedNode('architecture')}
                >
                  <Text style={styles.nodeTextSmall}>Arch</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.graphNodeSmall, { backgroundColor: '#06B6D4' }]}
                  onPress={() => setSelectedNode('client-acme')}
                >
                  <Text style={styles.nodeTextSmall}>Acme</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Graph Controls */}
            <View style={styles.graphControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(z => Math.min(z + 0.2, 2))}>
                <ZoomIn size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(z => Math.max(z - 0.2, 0.5))}>
                <ZoomOut size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(1)}>
                <RotateCcw size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Legend */}
            <View style={styles.graphLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#7C3AED' }]} />
                <Text style={styles.legendText}>People</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.legendText}>Projects</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
                <Text style={styles.legendText}>Technical</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Selected Node Details */}
        {selectedNode && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Node</Text>
            {(() => {
              const node = GRAPH_NODES.find(n => n.id === selectedNode);
              if (!node) return null;
              return (
                <View style={[styles.nodeDetail, { backgroundColor: '#1E293B' }]}>
                  <View style={[styles.nodeDetailIcon, { backgroundColor: node.color + '20' }]}>
                    <Network size={24} color={node.color} />
                  </View>
                  <View style={styles.nodeDetailInfo}>
                    <Text style={styles.nodeDetailLabel}>{node.label}</Text>
                    <Text style={styles.nodeDetailType}>{node.type}</Text>
                    <View style={styles.nodeDetailConnections}>
                      <Link2 size={12} color="#6B7280" />
                      <Text style={styles.nodeDetailConnectionsText}>{node.connections} connections</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedNode(null)}>
                    <Circle size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              );
            })()}
          </View>
        )}

        {/* Entity Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entity Types</Text>
          <View style={styles.entityGrid}>
            {ENTITY_TYPES.map((entity, index) => (
              <TouchableOpacity key={index} style={[styles.entityCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.entityIcon, { backgroundColor: entity.color + '20' }]}>
                  <entity.icon size={20} color={entity.color} />
                </View>
                <Text style={styles.entityLabel}>{entity.type}</Text>
                <Text style={styles.entityCount}>{entity.count.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Connection Paths */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Knowledge Paths</Text>
          {SAMPLE_PATHS.map((item, index) => (
            <View key={index} style={[styles.pathCard, { backgroundColor: '#1E293B' }]}>
              <View style={styles.pathNodes}>
                {item.path.map((node, i) => (
                  <React.Fragment key={i}>
                    <Text style={styles.pathNode}>{node}</Text>
                    {i < item.path.length - 1 && (
                      <ArrowLeft size={12} color="#6B7280" style={styles.pathArrow} />
                    )}
                  </React.Fragment>
                ))}
              </View>
              <Text style={styles.pathLength}>{item.length} hop{item.length > 1 ? 's' : ''}</Text>
            </View>
          ))}
        </View>

        {/* Graph Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Graph Tools</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]}>
              <Filter size={20} color="#3B82F6" />
              <Text style={styles.toolText}>Filter View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]}>
              <Share2 size={20} color="#7C3AED" />
              <Text style={styles.toolText}>Share Graph</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]}>
              <Download size={20} color="#10B981" />
              <Text style={styles.toolText}>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]}>
              <Bot size={20} color="#F59E0B" />
              <Text style={styles.toolText}>AI Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Graph AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Graph AI Agents</Text>
          <View style={styles.agentsRow}>
            {[
              { name: 'Path Finder', color: '#3B82F6' },
              { name: 'Influence Mapper', color: '#7C3AED' },
              { name: 'Anomaly Detector', color: '#EF4444' },
              { name: 'Cluster Analyzer', color: '#10B981' },
              { name: 'Relationship AI', color: '#F59E0B' },
              { name: 'Impact Calculator', color: '#EC4899' }
            ].map((agent, index) => (
              <View key={index} style={[styles.agentChip, { backgroundColor: agent.color + '20' }]}>
                <Bot size={14} color={agent.color} />
                <Text style={[styles.agentChipText, { color: agent.color }]}>{agent.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0F172A',
    gap: 12
  },
  backButton: { padding: 4 },
  headerTitle: { flex: 1 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF' },
  headerAction: { padding: 4 },
  content: { flex: 1, paddingHorizontal: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statCard: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 12 },
  graphPreview: { padding: 16, borderRadius: 16 },
  graphContainer: { alignItems: 'center', paddingVertical: 20 },
  graphNode: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  graphNodeSmall: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center', margin: 4 },
  nodeText: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' },
  nodeTextSmall: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' },
  nodeCeo: { alignSelf: 'center', marginBottom: 16 },
  graphRow2: { flexDirection: 'row', gap: 40, marginBottom: 12 },
  graphRow4: { flexDirection: 'row', gap: 8 },
  graphControls: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  controlButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  graphLegend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#9CA3AF' },
  nodeDetail: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 },
  nodeDetailIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  nodeDetailInfo: { flex: 1, marginLeft: 12 },
  nodeDetailLabel: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  nodeDetailType: { fontSize: 12, color: '#9CA3AF', textTransform: 'capitalize' },
  nodeDetailConnections: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  nodeDetailConnectionsText: { fontSize: 12, color: '#6B7280' },
  entityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  entityCard: { width: '31%', padding: 12, borderRadius: 10, alignItems: 'center' },
  entityIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  entityLabel: { fontSize: 11, color: '#9CA3AF' },
  entityCount: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginTop: 2 },
  pathCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 8 },
  pathNodes: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  pathNode: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
  pathArrow: { marginHorizontal: 6 },
  pathLength: { fontSize: 11, color: '#10B981', fontWeight: '600' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toolCard: { width: '48%', flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 10 },
  toolText: { fontSize: 13, color: '#FFFFFF' },
  agentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  agentChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  agentChipText: { fontSize: 12, fontWeight: '500' }
};