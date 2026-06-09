/**
 * =============================================================================
 * AGENT HIERARCHY MINDMAP - Tab Page
 * =============================================================================
 *
 * Integrated mindmap visualization for agent hierarchy management
 * with real-time builder integration.
 *
 * @version 1.0.0
 * @lastUpdated 2026-06-06
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Bot,
  Users,
  Building2,
  Layers,
  Settings,
  Plus,
  BarChart3,
  Activity,
  Zap,
  Brain,
  Network,
  TrendingUp,
  Shield,
  Crown,
  Target,
  Gauge,
  Award,
  DollarSign,
} from 'lucide-react-native';

import AgentHierarchyMindmap, {
  MindmapNode,
  MindmapConnection,
} from '../../components/mindmap/AgentHierarchyMindmap';

const { width, height } = Dimensions.get('window');

// ============================================
// SAMPLE HIERARCHY DATA
// ============================================

const sampleHierarchy: MindmapNode[] = [
  {
    id: 'root',
    label: 'KAYTX Enterprise',
    type: 'root',
    position: { x: width / 2 - 100, y: 50 },
    color: '#f59e0b',
    isExpanded: true,
    metadata: {
      status: 'active',
      lastUpdated: new Date().toISOString(),
    },
    children: [
      {
        id: 'c-suite',
        label: 'C-Suite',
        type: 'department',
        position: { x: 200, y: 200 },
        color: '#10b981',
        isExpanded: true,
        metadata: {
          status: 'active',
          lastUpdated: new Date().toISOString(),
        },
        children: [
          {
            id: 'ceo',
            label: 'CEO',
            type: 'employee',
            position: { x: 350, y: 150 },
            color: '#ec4899',
            metadata: {
              status: 'active',
              lastUpdated: new Date().toISOString(),
            },
          },
          {
            id: 'cto',
            label: 'CTO',
            type: 'employee',
            position: { x: 350, y: 250 },
            color: '#ec4899',
            metadata: {
              status: 'active',
              lastUpdated: new Date().toISOString(),
            },
          },
        ],
      },
      {
        id: 'technology',
        label: 'Technology',
        type: 'department',
        position: { x: 200, y: 350 },
        color: '#10b981',
        isExpanded: true,
        metadata: {
          status: 'active',
          lastUpdated: new Date().toISOString(),
        },
        children: [
          {
            id: 'devops-bot',
            label: 'DevOps Automator',
            type: 'agent',
            position: { x: 350, y: 320 },
            color: '#6366f1',
            metadata: {
              agentType: 'swarm',
              skills: ['System Monitoring', 'DevOps Automation', 'Security Audit'],
              tokenBudget: 60000,
              status: 'active',
              cost: '$110.00',
              performance: 92,
              lastUpdated: new Date().toISOString(),
            },
          },
          {
            id: 'code-review-bot',
            label: 'Code Review Bot',
            type: 'agent',
            position: { x: 350, y: 400 },
            color: '#6366f1',
            metadata: {
              agentType: 'learning',
              skills: ['Code Review', 'Bug Triage', 'API Integration'],
              tokenBudget: 35000,
              status: 'active',
              cost: '$85.00',
              performance: 88,
              lastUpdated: new Date().toISOString(),
            },
          },
        ],
      },
      {
        id: 'customer-experience',
        label: 'Customer Experience',
        type: 'department',
        position: { x: 200, y: 500 },
        color: '#10b981',
        isExpanded: true,
        metadata: {
          status: 'active',
          lastUpdated: new Date().toISOString(),
        },
        children: [
          {
            id: 'support-bot',
            label: 'Support Bot Alpha',
            type: 'agent',
            position: { x: 350, y: 470 },
            color: '#6366f1',
            metadata: {
              agentType: 'reactive',
              skills: ['Ticket Resolution', 'Complaint Handling', 'FAQ Management'],
              tokenBudget: 15000,
              status: 'active',
              cost: '$30.00',
              performance: 95,
              lastUpdated: new Date().toISOString(),
            },
          },
          {
            id: 'support-bot-beta',
            label: 'Support Bot Beta',
            type: 'agent',
            position: { x: 350, y: 550 },
            color: '#6366f1',
            metadata: {
              agentType: 'reactive',
              skills: ['Ticket Resolution', 'Complaint Handling', 'Escalation Routing'],
              tokenBudget: 20000,
              status: 'draft',
              cost: '$50.00',
              performance: 0,
              lastUpdated: new Date().toISOString(),
            },
          },
        ],
      },
      {
        id: 'sales',
        label: 'Sales',
        type: 'department',
        position: { x: 200, y: 650 },
        color: '#10b981',
        isExpanded: true,
        metadata: {
          status: 'active',
          lastUpdated: new Date().toISOString(),
        },
        children: [
          {
            id: 'sales-assistant',
            label: 'Sales Assistant',
            type: 'agent',
            position: { x: 350, y: 620 },
            color: '#6366f1',
            metadata: {
              agentType: 'learning',
              skills: ['Lead Qualification', 'Demo Scheduling', 'CRM Management'],
              tokenBudget: 30000,
              status: 'active',
              cost: '$80.00',
              performance: 91,
              lastUpdated: new Date().toISOString(),
            },
          },
        ],
      },
    ],
  },
];

const sampleConnections: MindmapConnection[] = [
  { from: 'root', to: 'c-suite', type: 'hierarchy' },
  { from: 'root', to: 'technology', type: 'hierarchy' },
  { from: 'root', to: 'customer-experience', type: 'hierarchy' },
  { from: 'root', to: 'sales', type: 'hierarchy' },
  { from: 'c-suite', to: 'ceo', type: 'hierarchy' },
  { from: 'c-suite', to: 'cto', type: 'hierarchy' },
  { from: 'technology', to: 'devops-bot', type: 'hierarchy' },
  { from: 'technology', to: 'code-review-bot', type: 'hierarchy' },
  { from: 'customer-experience', to: 'support-bot', type: 'hierarchy' },
  { from: 'customer-experience', to: 'support-bot-beta', type: 'hierarchy' },
  { from: 'sales', to: 'sales-assistant', type: 'hierarchy' },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function MindmapTab() {
  const [nodes, setNodes] = useState<MindmapNode[]>(sampleHierarchy);
  const [connections, setConnections] = useState<MindmapConnection[]>(sampleConnections);
  const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(null);
  const [showStats, setShowStats] = useState(true);

  // ============================================
  // STATISTICS CALCULATION
  // ============================================

  const stats = useMemo(() => {
    let totalAgents = 0;
    let totalEmployees = 0;
    let totalDepartments = 0;
    let activeAgents = 0;
    let totalCost = 0;
    let avgPerformance = 0;
    let performanceSum = 0;
    let performanceCount = 0;

    const traverse = (nodeList: MindmapNode[]) => {
      nodeList.forEach(node => {
        if (node.type === 'agent') {
          totalAgents++;
          if (node.metadata?.status === 'active') activeAgents++;
          if (node.metadata?.cost) totalCost += parseFloat(node.metadata.cost.replace('$', '').replace(',', ''));
          if (node.metadata?.performance) {
            performanceSum += node.metadata.performance;
            performanceCount++;
          }
        } else if (node.type === 'employee') {
          totalEmployees++;
        } else if (node.type === 'department') {
          totalDepartments++;
        }
        
        if (node.children) traverse(node.children);
      });
    };

    traverse(nodes);
    avgPerformance = performanceCount > 0 ? performanceSum / performanceCount : 0;

    return {
      totalAgents,
      totalEmployees,
      totalDepartments,
      activeAgents,
      inactiveAgents: totalAgents - activeAgents,
      totalCost,
      avgPerformance,
    };
  }, [nodes]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleNodePress = useCallback((node: MindmapNode) => {
    setSelectedNode(node);
  }, []);

  const handleNodeAdd = useCallback((parentId: string, newNode: MindmapNode) => {
    const addRecursive = (nodeList: MindmapNode[]): MindmapNode[] => {
      return nodeList.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        }
        if (node.children) {
          return { ...node, children: addRecursive(node.children) };
        }
        return node;
      });
    };
    
    setNodes(addRecursive(nodes));
    setConnections([...connections, { from: parentId, to: newNode.id, type: 'hierarchy' }]);
  }, [nodes, connections]);

  const handleNodeDelete = useCallback((nodeId: string) => {
    const deleteRecursive = (nodeList: MindmapNode[]): MindmapNode[] => {
      return nodeList
        .filter(n => n.id !== nodeId)
        .map(n => ({
          ...n,
          children: n.children ? deleteRecursive(n.children) : undefined,
        }));
    };
    
    setNodes(deleteRecursive(nodes));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  }, [nodes, connections]);

  const handleNodeUpdate = useCallback((nodeId: string, updates: Partial<MindmapNode>) => {
    const updateRecursive = (nodeList: MindmapNode[]): MindmapNode[] => {
      return nodeList.map(node => {
        if (node.id === nodeId) {
          return { ...node, ...updates };
        }
        if (node.children) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    
    setNodes(updateRecursive(nodes));
  }, [nodes]);

  const handleExport = useCallback((format: string) => {
    console.log(`Exporting mindmap as ${format}`);
  }, []);

  const handleImport = useCallback((data: any) => {
    console.log('Importing mindmap data:', data);
  }, []);

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const renderStats = () => (
    showStats && (
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Bot size={16} color="#6366f1" />
          <Text style={styles.statLabel}>Agents:</Text>
          <Text style={styles.statValue}>{stats.totalAgents}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Activity size={16} color="#10b981" />
          <Text style={styles.statLabel}>Active:</Text>
          <Text style={styles.statValue}>{stats.activeAgents}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Building2 size={16} color="#f59e0b" />
          <Text style={styles.statLabel}>Depts:</Text>
          <Text style={styles.statValue}>{stats.totalDepartments}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <DollarSign size={16} color="#10b981" />
          <Text style={styles.statLabel}>Cost:</Text>
          <Text style={styles.statValue}>${stats.totalCost.toLocaleString()}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Gauge size={16} color="#8b5cf6" />
          <Text style={styles.statLabel}>Perf:</Text>
          <Text style={styles.statValue}>{stats.avgPerformance.toFixed(0)}%</Text>
        </View>
      </View>
    )
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.quickActionButton}>
        <Plus size={20} color="#6366f1" />
        <Text style={styles.quickActionButtonText}>Add Agent</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.quickActionButton}>
        <Brain size={20} color="#10b981" />
        <Text style={styles.quickActionButtonText}>AI Suggest</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.quickActionButton}>
        <Activity size={20} color="#f59e0b" />
        <Text style={styles.quickActionButtonText}>Simulate</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.quickActionButton}
        onPress={() => setShowStats(!showStats)}
      >
        <BarChart3 size={20} color="#8b5cf6" />
        <Text style={styles.quickActionButtonText}>Stats</Text>
      </TouchableOpacity>
    </View>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <SafeAreaView style={styles.container}>
      {renderStats()}
      {renderQuickActions()}
      
      <View style={styles.content}>
        <AgentHierarchyMindmap
          nodes={nodes}
          connections={connections}
          onNodePress={handleNodePress}
          onNodeAdd={handleNodeAdd}
          onNodeDelete={handleNodeDelete}
          onNodeUpdate={handleNodeUpdate}
          onExport={handleExport}
          onImport={handleImport}
          editable={true}
          showToolbar={true}
          initialLayout="tree"
          theme="light"
        />
      </View>
    </SafeAreaView>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 6,
    marginRight: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickActionButtonText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  content: {
    flex: 1,
  },
});
