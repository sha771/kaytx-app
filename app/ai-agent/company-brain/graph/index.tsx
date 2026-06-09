import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, useSafeAreaInsets, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Network, ZoomIn, ZoomOut, RotateCcw, Filter, Share2, Download, Maximize2, Users, FileText, Briefcase, Target, Sparkles, Link2, Circle, Bot, Eye, X, Award, CheckCircle, Info } from 'lucide-react-native';

export default function KnowledgeGraphScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Core States
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Toggle filters
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    person: true,
    project: true,
    technical: true,
    client: true,
    process: true
  });

  // Shortest Path Finder state
  const [pathFrom, setPathFrom] = useState('');
  const [pathTo, setPathTo] = useState('');
  const [calculatedPath, setCalculatedPath] = useState<any>(null);
  const [isCalculatingPath, setIsCalculatingPath] = useState(false);

  const GRAPH_NODES = [
    { id: 'ceo', label: 'CEO (Incumbent)', type: 'person', connections: 12, color: '#7C3AED', author: 'Board of Directors', details: 'Institutional coordinator across strategic business pillars.' },
    { id: 'cto', label: 'CTO (Dev Division)', type: 'person', connections: 8, color: '#3B82F6', author: 'CEO', details: 'Oversees engineering practices, technical roadmap, and system scaling.' },
    { id: 'cfo', label: 'CFO (Finance)', type: 'person', connections: 6, color: '#10B981', author: 'CEO', details: 'Manages fiscal compliance, budgets, and enterprise client approvals.' },
    { id: 'vp-eng', label: 'VP Eng: Sarah Chen', type: 'person', connections: 15, color: '#3B82F6', author: 'CTO', details: 'Handles microservice architecture decisions and cloud resource allocation.' },
    { id: 'aws-migration', label: 'AWS Migration', type: 'project', connections: 8, color: '#F59E0B', author: 'Sarah Chen', details: 'Full lift-and-shift migration of databases to AWS multi-region infrastructure.' },
    { id: 'q4-launch', label: 'Q4 Product Launch', type: 'project', connections: 12, color: '#EC4899', author: 'Emily Davis', details: 'Go-to-market plan and phased pilot release strategy.' },
    { id: 'security', label: 'Security Audit', type: 'process', connections: 5, color: '#EF4444', author: 'James Wilson', details: 'Compliance validation checks and pen-test audit logs.' },
    { id: 'client-acme', label: 'Acme Corp Profile', type: 'client', connections: 9, color: '#06B6D4', author: 'Mike Johnson', details: 'Strategic enterprise client profile and historical preferences.' },
    { id: 'architecture', label: 'System Architecture', type: 'technical', connections: 10, color: '#8B5CF6', author: 'Sarah Chen', details: 'Microservices blueprints and serverless endpoint design.' },
    { id: 'api-design', label: 'API Design Rules', type: 'technical', connections: 7, color: '#8B5CF6', author: 'Sarah Chen', details: 'API gateway specs and OpenAPI standardization.' },
  ];

  const ENTITY_TYPES = [
    { id: 'person', type: 'People', count: 892, color: '#7C3AED', icon: Users },
    { id: 'project', type: 'Projects', count: 234, color: '#F59E0B', icon: Briefcase },
    { id: 'client', type: 'Clients', count: 156, color: '#06B6D4', icon: Target },
    { id: 'process', type: 'Processes', count: 345, color: '#10B981', icon: FileText },
    { id: 'technical', type: 'Technical', count: 189, color: '#8B5CF6', icon: Network },
  ];

  const CONNECTIONS = [
    { from: 'ceo', to: 'cto', label: 'Directs', strength: 'Strong' },
    { from: 'cto', to: 'vp-eng', label: 'Manages', strength: 'Strong' },
    { from: 'vp-eng', to: 'aws-migration', label: 'Owns', strength: 'Medium' },
    { from: 'vp-eng', to: 'architecture', label: 'Responsible for', strength: 'Strong' },
    { from: 'aws-migration', to: 'api-design', label: 'Requires', strength: 'Medium' },
    { from: 'q4-launch', to: 'client-acme', label: 'Targets', strength: 'Medium' },
    { from: 'ceo', to: 'cfo', label: 'Coordinates', strength: 'Strong' },
    { from: 'ceo', to: 'vp-eng', label: 'Indirectly oversees', strength: 'Medium' },
    { from: 'architecture', to: 'api-design', label: 'Governs', strength: 'Strong' },
    { from: 'aws-migration', to: 'security', label: 'Audited by', strength: 'Strong' },
    { from: 'cfo', to: 'client-acme', label: 'Billings', strength: 'Medium' }
  ];

  const PATH_FINDER_NODES = [
    { id: 'ceo', name: 'CEO' },
    { id: 'vp-eng', name: 'VP Eng (Sarah Chen)' },
    { id: 'cfo', name: 'CFO (Finance)' },
    { id: 'client-acme', name: 'Acme Corp' },
    { id: 'aws-migration', name: 'AWS Migration' },
    { id: 'security', name: 'Security Audit' }
  ];

  // Toggle filter logic
  const toggleFilter = (type: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Find relationships for selected node
  const getConnectionsForNode = (nodeId: string) => {
    return CONNECTIONS.filter(c => c.from === nodeId || c.to === nodeId).map(c => {
      const isFrom = c.from === nodeId;
      const targetId = isFrom ? c.to : c.from;
      const targetNode = GRAPH_NODES.find(n => n.id === targetId);
      return {
        id: targetId,
        label: targetNode?.label || targetId,
        relation: c.label,
        strength: c.strength,
        color: targetNode?.color || '#FFFFFF'
      };
    });
  };

  // Calculate shortest path tracing
  const handleCalculatePath = () => {
    if (!pathFrom || !pathTo) return;
    setIsCalculatingPath(true);
    setCalculatedPath(null);

    setTimeout(() => {
      setIsCalculatingPath(false);
      // Hardcoded path finding simulation for top interactive combos
      if (pathFrom === 'ceo' && pathTo === 'aws-migration') {
        setCalculatedPath({
          hops: 3,
          strength: 'Strong',
          chain: [
            { id: 'ceo', name: 'CEO', color: '#7C3AED' },
            { id: 'cto', name: 'CTO', color: '#3B82F6', relation: 'Directs' },
            { id: 'vp-eng', name: 'VP Eng (Sarah Chen)', color: '#3B82F6', relation: 'Manages' },
            { id: 'aws-migration', name: 'AWS Migration', color: '#F59E0B', relation: 'Owns' }
          ]
        });
      } else if (pathFrom === 'vp-eng' && pathTo === 'security') {
        setCalculatedPath({
          hops: 2,
          strength: 'Medium',
          chain: [
            { id: 'vp-eng', name: 'VP Eng (Sarah Chen)', color: '#3B82F6' },
            { id: 'aws-migration', name: 'AWS Migration', color: '#F59E0B', relation: 'Owns' },
            { id: 'security', name: 'Security Audit', color: '#EF4444', relation: 'Audited by' }
          ]
        });
      } else if (pathFrom === 'cfo' && pathTo === 'client-acme') {
        setCalculatedPath({
          hops: 1,
          strength: 'Strong',
          chain: [
            { id: 'cfo', name: 'CFO (Finance)', color: '#10B981' },
            { id: 'client-acme', name: 'Acme Corp', color: '#06B6D4', relation: 'Billings' }
          ]
        });
      } else {
        // Fallback generic hops
        const fromNode = GRAPH_NODES.find(n => n.id === pathFrom);
        const toNode = GRAPH_NODES.find(n => n.id === pathTo);
        setCalculatedPath({
          hops: 2,
          strength: 'Weak',
          chain: [
            { id: pathFrom, name: fromNode?.label || pathFrom, color: fromNode?.color || '#FFFFFF' },
            { id: 'vp-eng', name: 'VP Eng (Sarah Chen)', color: '#3B82F6', relation: 'Shared Context' },
            { id: pathTo, name: toNode?.label || pathTo, color: toNode?.color || '#FFFFFF', relation: 'Requires' }
          ]
        });
      }
    }, 600);
  };

  const selectedNode = GRAPH_NODES.find(n => n.id === selectedNodeId);

  return (
    <View style={{ flex: 1, backgroundColor: '#0F172A' }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Knowledge Graph</Text>
          <Text style={styles.headerSubtitle}>Visual representation of institutional relationships</Text>
        </View>
        <TouchableOpacity style={styles.headerAction} onPress={() => setSelectedNodeId('architecture')}>
          <Maximize2 size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Graph Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Network size={18} color="#7C3AED" />
            <Text style={styles.statValue}>2,847</Text>
            <Text style={styles.statLabel}>Mapped Nodes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Link2 size={18} color="#3B82F6" />
            <Text style={styles.statValue}>12,456</Text>
            <Text style={styles.statLabel}>Relations</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Eye size={18} color="#10B981" />
            <Text style={styles.statValue}>98.4%</Text>
            <Text style={styles.statLabel}>Sync Accuracy</Text>
          </View>
        </View>

        {/* Interactive Pathfinder / Chain tracer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shortest Relation Finder (AI Path Tracer)</Text>
          <View style={[styles.pathfinderCard, { backgroundColor: '#1E293B' }]}>
            <View style={styles.selectorRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectLabel}>From Node</Text>
                <View style={styles.customSelect}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {PATH_FINDER_NODES.map(n => (
                      <TouchableOpacity 
                        key={n.id}
                        style={[styles.nodeSelectBtn, { backgroundColor: pathFrom === n.id ? '#7C3AED' : '#37415140' }]}
                        onPress={() => setPathFrom(n.id)}
                      >
                        <Text style={styles.nodeSelectText}>{n.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.selectLabel}>To Target</Text>
                <View style={styles.customSelect}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {PATH_FINDER_NODES.map(n => (
                      <TouchableOpacity 
                        key={n.id}
                        style={[styles.nodeSelectBtn, { backgroundColor: pathTo === n.id ? '#10B981' : '#37415140' }]}
                        onPress={() => setPathTo(n.id)}
                      >
                        <Text style={styles.nodeSelectText}>{n.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btnCalculate, { backgroundColor: '#3B82F6' }]}
              onPress={handleCalculatePath}
              disabled={isCalculatingPath || !pathFrom || !pathTo}
            >
              {isCalculatingPath ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.btnCalculateText}>Trace Shortest Relation Chain</Text>
              )}
            </TouchableOpacity>

            {/* Calculated path representation */}
            {calculatedPath && (
              <View style={styles.pathResultCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Text style={styles.pathHops}>{calculatedPath.hops} Hop Relationship Chain</Text>
                  <Text style={styles.pathStrength}>{calculatedPath.strength} Connection</Text>
                </View>
                <View style={styles.chainRow}>
                  {calculatedPath.chain.map((step: any, idx: number) => (
                    <View key={step.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {idx > 0 && (
                        <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
                          <Link2 size={12} color="#9CA3AF" />
                          <Text style={styles.chainRelationText}>{step.relation}</Text>
                        </View>
                      )}
                      <TouchableOpacity 
                        style={[styles.chainNodeBadge, { backgroundColor: step.color }]}
                        onPress={() => setSelectedNodeId(step.id)}
                      >
                        <Text style={styles.chainNodeText}>{step.name}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Interactive Graph Representation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Knowledge Map (Click Nodes)</Text>
          <View style={[styles.graphPreview, { backgroundColor: '#1E293B' }]}>
            <View style={[styles.graphContainer, { transform: [{ scale: zoomLevel }] }]}>
              
              {/* CEO Node - top */}
              {activeFilters.person && (
                <TouchableOpacity 
                  style={[styles.graphNode, { backgroundColor: '#7C3AED', shadowColor: '#7C3AED', shadowOpacity: 0.3 }]}
                  onPress={() => setSelectedNodeId('ceo')}
                >
                  <Text style={styles.nodeText}>CEO</Text>
                </TouchableOpacity>
              )}

              {/* CTO & CFO Nodes */}
              <View style={styles.graphRow2}>
                {activeFilters.person && (
                  <TouchableOpacity 
                    style={[styles.graphNode, { backgroundColor: '#3B82F6' }]}
                    onPress={() => setSelectedNodeId('cto')}
                  >
                    <Text style={styles.nodeText}>CTO</Text>
                  </TouchableOpacity>
                )}
                {activeFilters.person && (
                  <TouchableOpacity 
                    style={[styles.graphNode, { backgroundColor: '#10B981' }]}
                    onPress={() => setSelectedNodeId('cfo')}
                  >
                    <Text style={styles.nodeText}>CFO</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* VP Engineering */}
              {activeFilters.person && (
                <TouchableOpacity 
                  style={[styles.graphNode, { backgroundColor: '#3B82F6', alignSelf: 'center' }]}
                  onPress={() => setSelectedNodeId('vp-eng')}
                >
                  <Text style={styles.nodeText}>VP Eng</Text>
                </TouchableOpacity>
              )}

              {/* Projects Row */}
              <View style={styles.graphRow3}>
                {activeFilters.project && (
                  <TouchableOpacity 
                    style={[styles.graphNodeSmall, { backgroundColor: '#F59E0B' }]}
                    onPress={() => setSelectedNodeId('aws-migration')}
                  >
                    <Text style={styles.nodeTextSmall}>AWS Mig</Text>
                  </TouchableOpacity>
                )}
                {activeFilters.project && (
                  <TouchableOpacity 
                    style={[styles.graphNodeSmall, { backgroundColor: '#EC4899' }]}
                    onPress={() => setSelectedNodeId('q4-launch')}
                  >
                    <Text style={styles.nodeTextSmall}>Q4 Launch</Text>
                  </TouchableOpacity>
                )}
                {activeFilters.process && (
                  <TouchableOpacity 
                    style={[styles.graphNodeSmall, { backgroundColor: '#EF4444' }]}
                    onPress={() => setSelectedNodeId('security')}
                  >
                    <Text style={styles.nodeTextSmall}>Security</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Technical & Clients */}
              <View style={styles.graphRow2}>
                {activeFilters.technical && (
                  <TouchableOpacity 
                    style={[styles.graphNodeSmall, { backgroundColor: '#8B5CF6' }]}
                    onPress={() => setSelectedNodeId('architecture')}
                  >
                    <Text style={styles.nodeTextSmall}>Arch blue</Text>
                  </TouchableOpacity>
                )}
                {activeFilters.client && (
                  <TouchableOpacity 
                    style={[styles.graphNodeSmall, { backgroundColor: '#06B6D4' }]}
                    onPress={() => setSelectedNodeId('client-acme')}
                  >
                    <Text style={styles.nodeTextSmall}>Acme</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Graph Controls */}
            <View style={styles.graphControls}>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(z => Math.min(z + 0.2, 1.8))}>
                <ZoomIn size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(z => Math.max(z - 0.2, 0.6))}>
                <ZoomOut size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={() => setZoomLevel(1)}>
                <RotateCcw size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Interactive Filters Legend */}
            <View style={styles.graphLegend}>
              {ENTITY_TYPES.map(f => (
                <TouchableOpacity 
                  key={f.id} 
                  style={[styles.legendItem, { opacity: activeFilters[f.id] ? 1 : 0.4 }]}
                  onPress={() => toggleFilter(f.id)}
                >
                  <View style={[styles.legendDot, { backgroundColor: f.color }]} />
                  <Text style={styles.legendText}>{f.type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Selected Node Drawer / Inspector */}
        {selectedNode && (
          <View style={styles.section}>
            <View style={[styles.nodeDetail, { backgroundColor: '#1E293B', borderWidth: 1, borderColor: selectedNode.color + '40' }]}>
              <View style={styles.nodeDetailHeader}>
                <View style={[styles.nodeDetailIcon, { backgroundColor: selectedNode.color + '20' }]}>
                  <Network size={22} color={selectedNode.color} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.nodeDetailLabel}>{selectedNode.label}</Text>
                  <Text style={[styles.nodeDetailType, { color: selectedNode.color }]}>{selectedNode.type.toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedNodeId(null)} style={styles.closeInspectorBtn}>
                  <X size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.nodeDetailsDesc}>{selectedNode.details}</Text>

              <View style={styles.nodeDetailMetaGrid}>
                <View>
                  <Text style={styles.metaLabel}>Authored By</Text>
                  <Text style={styles.metaValueText}>{selectedNode.author}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Interactions</Text>
                  <Text style={styles.metaValueText}>{selectedNode.connections} active links</Text>
                </View>
              </View>

              {/* Connected Hop Jumper */}
              <Text style={styles.connectedTitle}>Connected Adjacent Nodes (Jump to Node)</Text>
              <View style={styles.connectionsRow}>
                {getConnectionsForNode(selectedNode.id).map(conn => (
                  <TouchableOpacity 
                    key={conn.id} 
                    style={[styles.connBadge, { borderColor: conn.color + '50', borderWidth: 1 }]}
                    onPress={() => setSelectedNodeId(conn.id)}
                  >
                    <Text style={[styles.connBadgeText, { color: conn.color }]}>{conn.label}</Text>
                    <Text style={styles.connRelationTextInline}>{`(${conn.relation})`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Entity counts view */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Node Registry</Text>
          <View style={styles.entityGrid}>
            {ENTITY_TYPES.map((entity, index) => (
              <View key={index} style={[styles.entityCard, { backgroundColor: '#1E293B' }]}>
                <View style={[styles.entityIcon, { backgroundColor: entity.color + '20' }]}>
                  <entity.icon size={20} color={entity.color} />
                </View>
                <Text style={styles.entityLabel}>{entity.type}</Text>
                <Text style={styles.entityCount}>{entity.count.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Graph Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Graph Maintenance Utilities</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]} onPress={() => router.push('/ai-agent/company-brain/analytics')}>
              <Filter size={18} color="#3B82F6" />
              <Text style={styles.toolText}>Run Risk Audit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolCard, { backgroundColor: '#1E293B' }]} onPress={handleCalculatePath}>
              <Bot size={18} color="#F59E0B" />
              <Text style={styles.toolText}>Clean Orphans</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />
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
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginTop: 4 },
  statLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 12 },
  pathfinderCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#37415150'
  },
  selectorRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  selectLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 6,
    fontWeight: '600'
  },
  customSelect: {
    height: 40,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  nodeSelectBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
    justifyContent: 'center'
  },
  nodeSelectText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600'
  },
  btnCalculate: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  btnCalculateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold'
  },
  pathResultCard: {
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#37415180'
  },
  pathHops: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6'
  },
  pathStrength: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600'
  },
  chainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4
  },
  chainRelationText: {
    fontSize: 8,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 2
  },
  chainNodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6
  },
  chainNodeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  graphPreview: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#37415130',
    overflow: 'hidden'
  },
  graphContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  graphNode: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF20'
  },
  graphNodeSmall: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 1.5,
    borderColor: '#FFFFFF15'
  },
  nodeText: { fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' },
  nodeTextSmall: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  graphRow2: { flexDirection: 'row', gap: 60, marginBottom: 20, justifyContent: 'center' },
  graphRow3: { flexDirection: 'row', gap: 10, marginBottom: 20, justifyContent: 'center' },
  graphControls: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  controlButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  graphLegend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 20, borderTopWidth: 1, borderTopColor: '#37415140', paddingTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  nodeDetail: { padding: 14, borderRadius: 14 },
  nodeDetailHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#37415140', paddingBottom: 10 },
  nodeDetailIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  nodeDetailLabel: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' },
  nodeDetailType: { fontSize: 9, fontWeight: '700', marginTop: 2 },
  closeInspectorBtn: { padding: 6, backgroundColor: '#37415130', borderRadius: 8 },
  nodeDetailsDesc: { fontSize: 12, color: '#9CA3AF', marginTop: 12, lineHeight: 16 },
  nodeDetailMetaGrid: { flexDirection: 'row', gap: 24, marginVertical: 14, borderBottomWidth: 1, borderBottomColor: '#37415140', paddingBottom: 12 },
  metaLabel: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
  metaValueText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500', marginTop: 2 },
  connectedTitle: { fontSize: 11, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 },
  connectionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  connBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 6, backgroundColor: '#0F172A' },
  connBadgeText: { fontSize: 10, fontWeight: '700' },
  connRelationTextInline: { fontSize: 9, color: '#6B7280', marginLeft: 4, fontStyle: 'italic' },
  entityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  entityCard: { width: '31%', padding: 12, borderRadius: 10, alignItems: 'center' },
  entityIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  entityLabel: { fontSize: 10, color: '#9CA3AF' },
  entityCount: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF', marginTop: 2 },
  toolsGrid: { flexDirection: 'row', gap: 8 },
  toolCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 10, justifyContent: 'center' },
  toolText: { fontSize: 12, color: '#FFFFFF', fontWeight: '600' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000000BA', justifyContent: 'center', alignItems: 'center', padding: 16, zIndex: 999 },
  modalCard: { width: '100%', maxWidth: 400, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#374151' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#37415150', paddingBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  modalSubtitle: { fontSize: 12, color: '#9CA3AF', marginBottom: 10 },
  entityRowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', padding: 10, borderRadius: 8, marginBottom: 6, borderWidth: 1, borderColor: '#37415140' },
  entityRowTitle: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  entityRowSub: { fontSize: 9, color: '#6B7280', marginTop: 2 },
  entityTrashBtn: { padding: 6, backgroundColor: '#EF444415', borderRadius: 6 },
  btnCloseModal: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnCloseText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' }
};